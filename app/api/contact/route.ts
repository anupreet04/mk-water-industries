import { NextResponse } from 'next/server';

interface InquiryBody {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city: string;
  state?: string;
  product?: string;
  quantity?: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()+]/g, '');
  return /^\d{10,15}$/.test(cleaned);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryBody;

    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!body.phone?.trim() || !validatePhone(body.phone)) {
      return NextResponse.json({ error: 'A valid phone number is required' }, { status: 400 });
    }
    if (!body.city?.trim()) {
      return NextResponse.json({ error: 'City is required' }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (body.email && !validateEmail(body.email)) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjaoaccecurgodhkjcki.supabase.co';
    const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqYW9hY2NlY3VyZ29kaGtqY2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODkzMjIsImV4cCI6MjEwMTg2NTMyMn0.vtHCT0Jf4QWcAO9eAK92a0t2ER3AWGRyKWHtP68o6RM';

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/submit-inquiry`;
    const edgeResponse = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
      },
      body: JSON.stringify(body),
    });

    if (!edgeResponse.ok) {
      const errorData = await edgeResponse.json().catch(() => ({}));
      console.error('Edge function rejected inquiry:', edgeResponse.status, errorData);
      return NextResponse.json(
        { error: errorData.error || 'We could not submit your inquiry right now. Please try again or contact us directly.' },
        { status: edgeResponse.status },
      );
    }

    const edgeData = await edgeResponse.json();

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const adminEmail = process.env.ADMIN_EMAIL || 'mkindustries0013@gmail.com';
        const fromAddress = process.env.EMAIL_FROM || 'MK Water Industries <onboarding@resend.dev>';

        const name = escapeHtml(body.name.trim());
        const phone = escapeHtml(body.phone.trim());
        const email = escapeHtml(body.email?.trim() || 'N/A');
        const company = escapeHtml(body.company?.trim() || 'N/A');
        const city = escapeHtml(body.city.trim());
        const state = escapeHtml(body.state?.trim() || 'N/A');
        const product = escapeHtml(body.product?.trim() || 'N/A');
        const quantity = escapeHtml(body.quantity?.trim() || 'N/A');
        const message = escapeHtml(body.message.trim()).replace(/\n/g, '<br />');
        const submittedAt = escapeHtml(new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }));
        const emailHtml = `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#002B5B;padding:24px;border-radius:12px 12px 0 0;">
              <h1 style="color:#fff;font-size:22px;margin:0;">New Inquiry Received</h1>
              <p style="color:#4DAFFF;font-size:13px;margin:4px 0 0;">MK Water Industries — Website Contact Form</p>
            </div>
            <div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
              <table style="width:100%;font-size:14px;border-collapse:collapse;">
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;width:160px;">Name:</td><td style="padding:6px 0;color:#333;">${name}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;">Phone:</td><td style="padding:6px 0;color:#333;">${phone}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;">Email:</td><td style="padding:6px 0;color:#333;">${email}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;">Company:</td><td style="padding:6px 0;color:#333;">${company}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;">City:</td><td style="padding:6px 0;color:#333;">${city}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;">State:</td><td style="padding:6px 0;color:#333;">${state}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;">Product Required:</td><td style="padding:6px 0;color:#333;">${product}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;">Quantity:</td><td style="padding:6px 0;color:#333;">${quantity}</td></tr>
                <tr><td style="padding:6px 0;font-weight:bold;color:#002B5B;">Submitted At:</td><td style="padding:6px 0;color:#333;">${submittedAt}</td></tr>
              </table>
              <h3 style="color:#002B5B;font-size:15px;margin:20px 0 8px;">Message:</h3>
              <div style="background:#fff;padding:14px;border-radius:8px;border:1px solid #e2e8f0;">
                <p style="margin:0;color:#333;line-height:1.6;">${message}</p>
              </div>
              <hr style="margin:20px 0;border:none;border-top:1px solid #e2e8f0;" />
              <p style="font-size:12px;color:#94a3b8;margin:0;">This inquiry was submitted via the MK Water Industries website contact form. View all inquiries in the admin dashboard at /admin/inquiries.</p>
            </div>
          </div>
        `;

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [adminEmail],
            subject: 'New Inquiry \u2013 MK Water Industries',
            html: emailHtml,
          }),
        });

        if (!emailResponse.ok) {
          const emailError = await emailResponse.text();
          console.error('Email notification was rejected:', emailError);
        }
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: edgeData.message || 'Thank you! Your inquiry has been submitted successfully. MK Water Industries will contact you shortly.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'We could not submit your inquiry right now. Please try again or contact us directly.' }, { status: 500 });
  }
}
