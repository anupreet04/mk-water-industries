'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Trash2, X, Phone, Mail, MessageCircle, Loader as Loader2, LogOut, Droplet, Inbox, Clock, CircleCheck as CheckCircle, Calendar, ChevronRight, User, Building, MapPin, Package, ShoppingCart } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  city: string;
  state: string | null;
  product: string | null;
  quantity: string | null;
  message: string;
  status: string;
  created_at: string;
}

type StatusFilter = 'all' | 'new' | 'contacted' | 'completed';

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: 'New', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  contacted: { label: 'Contacted', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  completed: { label: 'Completed', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function whatsappUrl(phone: string): string {
  const cleaned = phone.replace(/[\s\-()+]/g, '');
  const num = cleaned.startsWith('91') ? cleaned : `91${cleaned}`;
  return `https://wa.me/${num}`;
}

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, completed: 0 });

  const fetchInquiries = useCallback(async () => {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load inquiries:', error.message);
      return;
    }
    const all = (data || []) as Inquiry[];
    setInquiries(all);
    setStats({
      total: all.length,
      new: all.filter((i) => i.status === 'new').length,
      contacted: all.filter((i) => i.status === 'contacted').length,
      completed: all.filter((i) => i.status === 'completed').length,
    });
  }, []);

  useEffect(() => {
    fetchInquiries().then(() => setLoading(false));
  }, [fetchInquiries]);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (!error) {
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      if (selectedInquiry?.id === id) setSelectedInquiry((prev) => (prev ? { ...prev, status } : prev));
      setStats((prev) => {
        const old = inquiries.find((i) => i.id === id);
        if (!old) return prev;
        const decKey = old.status as keyof typeof prev;
        const incKey = status as keyof typeof prev;
        return {
          ...prev,
          [decKey]: Math.max(0, prev[decKey] - 1),
          [incKey]: (prev[incKey as 'total' | 'new' | 'contacted' | 'completed'] || 0) + 1,
        };
      });
    }
    setUpdatingId(null);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    setDeleting(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from('inquiries').delete().eq('id', deleteConfirmId);
    if (!error) {
      const deleted = inquiries.find((i) => i.id === deleteConfirmId);
      setInquiries((prev) => prev.filter((i) => i.id !== deleteConfirmId));
      if (selectedInquiry?.id === deleteConfirmId) setSelectedInquiry(null);
      if (deleted) {
        setStats((prev) => {
          const decKey = deleted.status as keyof typeof prev;
          return { ...prev, total: Math.max(0, prev.total - 1), [decKey]: Math.max(0, prev[decKey] - 1) };
        });
      }
    }
    setDeleting(false);
    setDeleteConfirmId(null);
  };

  const filtered = inquiries.filter((i) => {
    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      i.name.toLowerCase().includes(q) ||
      i.phone.toLowerCase().includes(q) ||
      (i.email || '').toLowerCase().includes(q) ||
      (i.company || '').toLowerCase().includes(q) ||
      i.city.toLowerCase().includes(q) ||
      i.message.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const statCards = [
    { label: 'Total Inquiries', value: stats.total, icon: Inbox, iconBg: 'bg-blue-50', iconColor: 'text-mk-blue' },
    { label: 'New', value: stats.new, icon: Clock, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'Contacted', value: stats.contacted, icon: MessageCircle, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, iconBg: 'bg-green-50', iconColor: 'text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <header className="sticky top-0 z-30 bg-mk-navy shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mk-sky to-mk-blue flex items-center justify-center shadow-md">
                <Droplet size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-sm leading-tight">MK Water Industries</h1>
                <p className="text-white/50 text-xs">Inquiry Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl shadow-card p-5 border border-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center shrink-0`}>
                  <stat.icon size={18} className={stat.iconColor} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-mk-navy">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, email, city, message..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-mk-blue/30 focus:border-mk-blue transition-all"
            />
          </div>
          <div className="relative">
            <Filter size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="pl-11 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mk-blue/30 focus:border-mk-blue transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-mk-blue" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Inbox size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 font-medium">No inquiries found</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((inquiry, i) => {
              const sc = statusConfig[inquiry.status] || statusConfig.new;
              return (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.4) }}
                  className="bg-white rounded-2xl shadow-card border border-gray-50 hover:shadow-card-hover transition-all cursor-pointer group"
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="p-4 sm:p-5 flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-mk-navy text-sm">{inquiry.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1"><Phone size={12} /> {inquiry.phone}</span>
                        {inquiry.email && <span className="flex items-center gap-1"><Mail size={12} /> {inquiry.email}</span>}
                        <span className="flex items-center gap-1"><MapPin size={12} /> {inquiry.city}{inquiry.state ? `, ${inquiry.state}` : ''}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{inquiry.message}</p>
                      <p className="text-xs text-gray-300 mt-1 flex items-center gap-1"><Calendar size={11} /> {formatDate(inquiry.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`tel:${inquiry.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-mk-blue hover:bg-blue-100 transition-colors"
                        title="Call"
                      >
                        <Phone size={14} />
                      </a>
                      <a
                        href={whatsappUrl(inquiry.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"
                        title="WhatsApp"
                      >
                        <WhatsAppIcon size={14} />
                      </a>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-mk-blue transition-colors" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedInquiry && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedInquiry(null)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-mk-navy px-5 py-4 flex items-center justify-between z-10">
                <h2 className="text-white font-bold text-base">Inquiry Details</h2>
                <button onClick={() => setSelectedInquiry(null)} className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${statusConfig[selectedInquiry.status]?.bg} ${statusConfig[selectedInquiry.status]?.text}`}>
                    <span className={`w-2 h-2 rounded-full ${statusConfig[selectedInquiry.status]?.dot}`} />
                    {statusConfig[selectedInquiry.status]?.label}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(selectedInquiry.created_at)}</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Information</h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    <DetailRow icon={User} label="Name" value={selectedInquiry.name} />
                    <DetailRow icon={Phone} label="Phone" value={selectedInquiry.phone} />
                    {selectedInquiry.email && <DetailRow icon={Mail} label="Email" value={selectedInquiry.email} />}
                    {selectedInquiry.company && <DetailRow icon={Building} label="Company" value={selectedInquiry.company} />}
                    <DetailRow icon={MapPin} label="City" value={selectedInquiry.city} />
                    {selectedInquiry.state && <DetailRow icon={MapPin} label="State" value={selectedInquiry.state} />}
                    {selectedInquiry.product && <DetailRow icon={Package} label="Product" value={selectedInquiry.product} />}
                    {selectedInquiry.quantity && <DetailRow icon={ShoppingCart} label="Quantity" value={selectedInquiry.quantity} />}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message</h3>
                  <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedInquiry.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <a href={`tel:${selectedInquiry.phone}`} className="flex flex-col items-center gap-1 py-3 rounded-xl bg-blue-50 text-mk-blue hover:bg-blue-100 transition-colors">
                    <Phone size={18} />
                    <span className="text-xs font-semibold">Call</span>
                  </a>
                  {selectedInquiry.email && (
                    <a href={`mailto:${selectedInquiry.email}`} className="flex flex-col items-center gap-1 py-3 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
                      <Mail size={18} />
                      <span className="text-xs font-semibold">Email</span>
                    </a>
                  )}
                  <a href={whatsappUrl(selectedInquiry.phone)} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-3 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                    <WhatsAppIcon size={18} />
                    <span className="text-xs font-semibold">WhatsApp</span>
                  </a>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Update Status</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(['new', 'contacted', 'completed'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedInquiry.id, s)}
                        disabled={updatingId === selectedInquiry.id || selectedInquiry.status === s}
                        className={`py-2.5 rounded-xl text-xs font-semibold border transition-all disabled:opacity-50 ${
                          selectedInquiry.status === s
                            ? `${statusConfig[s].bg} ${statusConfig[s].text} border-current`
                            : 'bg-white text-gray-600 border-gray-200 hover:border-mk-blue hover:text-mk-blue'
                        }`}
                      >
                        {updatingId === selectedInquiry.id ? <Loader2 size={14} className="animate-spin mx-auto" /> : statusConfig[s].label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setDeleteConfirmId(selectedInquiry.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-sm font-semibold"
                >
                  <Trash2 size={16} /> Delete Inquiry
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => !deleting && setDeleteConfirmId(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-mk-navy text-center mb-2">Delete this inquiry?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">This action cannot be undone. The inquiry will be permanently removed.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-60"
                >
                  {deleting ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={13} className="text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm text-gray-700 font-medium break-words">{value}</p>
      </div>
    </div>
  );
}
