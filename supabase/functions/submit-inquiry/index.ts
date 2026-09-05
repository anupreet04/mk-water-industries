import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^[+]?[0-9]{10,15}$/.test(cleaned);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const body: InquiryBody = await req.json();

    if (!body.name || !body.name.trim()) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!body.phone || !validatePhone(body.phone)) {
      return new Response(
        JSON.stringify({ error: "A valid phone number is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!body.city || !body.city.trim()) {
      return new Response(
        JSON.stringify({ error: "City is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!body.message || !body.message.trim()) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { error: insertError } = await supabase
      .from("inquiries")
      .insert({
        name: body.name.trim(),
        phone: body.phone.trim(),
        email: body.email?.trim() || null,
        company: body.company?.trim() || null,
        city: body.city.trim(),
        state: body.state?.trim() || null,
        product: body.product?.trim() || null,
        quantity: body.quantity?.trim() || null,
        message: body.message.trim(),
        status: "new",
      });

    if (insertError) {
      console.error("Failed to save inquiry:", insertError.message);
      return new Response(
        JSON.stringify({ error: "We could not submit your inquiry right now. Please try again or contact us directly." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you! Your inquiry has been submitted successfully. MK Water Industries will contact you shortly.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "We could not submit your inquiry right now. Please try again or contact us directly." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
