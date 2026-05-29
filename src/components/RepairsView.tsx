import React, { useState } from 'react';
import { ShieldCheck, Clock, Award, Hammer, Wrench, Send, AlertCircle, Sparkles } from 'lucide-react';
import { RepairQuote } from '../types';

export const RepairsView: React.FC = () => {
  const [model, setModel] = useState('');
  const [issueType, setIssueType] = useState('Screen Replacement');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [activeBookings, setActiveBookings] = useState<RepairQuote[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [latestReceipt, setLatestReceipt] = useState<RepairQuote | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic estimate generator
  const getDynamicEstimate = (modelName: string, issue: string) => {
    let base = 25000; // default base charge
    const normalized = modelName.toLowerCase();
    
    if (normalized.includes('15') || normalized.includes('14')) {
      base = 45000;
    } else if (normalized.includes('16') || normalized.includes('17')) {
      base = 85000;
    } else if (normalized.includes('macbook')) {
      base = 120000;
    }

    let multiplier = 1;
    if (issue === 'Screen Replacement') multiplier = 1.8;
    if (issue === 'Battery Replacement') multiplier = 0.8;
    if (issue === 'Water Damage Recovery') multiplier = 1.5;
    if (issue === 'Software Restore') multiplier = 0.5;

    return Math.round(base * multiplier);
  };

  const activeEstimate = getDynamicEstimate(model, issueType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim()) {
      setFormError('Please enter your device model');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `ABP-${Math.floor(Math.random() * 90000) + 10000}`;
      const newQuote: RepairQuote = {
        model,
        issueType,
        message: message || 'N/A',
        estimate: activeEstimate,
        date: new Date().toLocaleDateString(),
        bookingId: generatedId
      };

      setActiveBookings(prev => [newQuote, ...prev]);
      setLatestReceipt(newQuote);
      setShowReceipt(true);
      setIsSubmitting(false);

      // Reset form fields
      setModel('');
      setIssueType('Screen Replacement');
      setMessage('');
    }, 800);
  };

  const handleWhatsappReceipt = (receipt: RepairQuote) => {
    window.open('https://wa.link/eo0ixx', '_blank');
  };

  const services = [
    { name: 'Screen Replacement', icon: 'screenshot_monitor', price: 'From ₦45,000', desc: 'Shattered or unresponsive glass displays replaced with premium grade original specifications.' },
    { name: 'Battery Replacement', icon: 'battery_very_low', price: 'From ₦25,000', desc: 'Revive performance with a premium zero-cycle lithium replacement battery cell.' },
    { name: 'Liquid Damage Repair', icon: 'water_drop', price: 'From ₦40,050', desc: 'Comprehensive chemical board cleaning and component reflowing services.' },
    { name: 'Software Diagnostics', icon: 'terminal', price: 'From ₦10,000', desc: 'Stuck in boot loops, iCloud recovery questions, system overrides or clean flashes.' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in font-sans">
      
      {/* Repair Banner Image */}
      <section className="relative rounded-[2rem] overflow-hidden shadow-md group">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent z-10"></div>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQgBPcC08PWweadORKh4vM6Ppnr8ilbriDISPeODevgoE307IPEVwc3quUdYD5JK_Tqtc3iMspvawJfblHQ7khxxeF_NJzp4T2sjQAQLHzHE8_i2dp6vD-AtrWkvlzOlfPE78nc56hU_ubBTMR-b0P9HhK8Xgkr07HfxbOl5YCGamJfhfVQYg1siX4f87R-ec3ZBqF6vnkno7GEUjCmk-L-a89k-g6icXaMnM0x-iYiYqBpcxTr3oyr1VxRx_qJJNj9kLsouWQwrY"
          alt="Certified Tech Repairs"
          className="w-full h-48 md:h-64 object-cover group-hover:scale-102 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 space-y-2">
          <span className="bg-blue-600 text-white font-display font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest align-self-start max-w-max">
            Benin Flagship Hub
          </span>
          <h2 className="font-display font-extrabold text-xl md:text-3xl text-white tracking-tight">
            Certified Tech Repairs
          </h2>
          <p className="text-xs md:text-sm text-slate-200 mt-1 max-w-md leading-relaxed font-light">
            Precision repairs for your high-performance devices at our flagship hub in Benin City.
          </p>
        </div>
      </section>

      {/* Value Pillars List */}
      <section className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 flex flex-col items-center text-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-blue-600 text-2.5xl">security</span>
          <span className="font-bold text-[10px] text-slate-800 dark:text-slate-100 uppercase tracking-tight">Original Parts Only</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 flex flex-col items-center text-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-blue-600 text-2.5xl">history</span>
          <span className="font-bold text-[10px] text-slate-800 dark:text-slate-100 uppercase tracking-tight">Same Day Return</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 flex flex-col items-center text-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-blue-600 text-2.5xl">verified</span>
          <span className="font-bold text-[10px] text-slate-800 dark:text-slate-100 uppercase tracking-tight">Certified Techs</span>
        </div>
      </section>

      {/* Services Grid items */}
      <section className="space-y-4">
        <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2 pl-1">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Our Main Specialties
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-2.5xl border border-slate-100 dark:border-slate-850 flex gap-4 shadow-sm group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 shrink-0">
                <span className="material-symbols-outlined text-2xl">{svc.icon}</span>
              </div>
              <div className="space-y-1 my-auto">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{svc.name}</h4>
                  <span className="font-black text-xs text-blue-600 shrink-0">{svc.price}</span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 leading-normal">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Form for Repair Request Quote */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm space-y-6">
        <div>
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
            Instant Diagnostics Quote
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Specify your smartphone or technical device model to reveal an interactive assessment estimate directly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Phone / Device Model</label>
            <input
              id="model-input"
              type="text"
              placeholder="e.g. iPhone 15 Pro Max, Galaxy S24 Ultra"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs text-slate-800 dark:text-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            {formError && <span className="text-red-500 font-semibold text-[10px] mt-1 block pl-1">{formError}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Issue Category</label>
              <select
                id="issue-select"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full h-12 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs text-slate-700 dark:text-slate-300 px-3 cursor-pointer"
              >
                <option value="Screen Replacement">Screen Replacement</option>
                <option value="Battery Replacement">Battery Replacement</option>
                <option value="Water Damage Recovery">Water Damage Recovery</option>
                <option value="Software Restore">Software Restore</option>
                <option value="Charging Port Repair">Charging Port Repair</option>
              </select>
            </div>

            {/* Simulated Live estimate layout preview */}
            <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col justify-center">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Estimated charges price</span>
              <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-none">
                {model.trim() ? `₦${activeEstimate.toLocaleString()}` : 'Enter Model'}
              </span>
              <span className="text-[8px] text-slate-400 leading-none mt-1.5">Includes parts & precision diagnostics workmanship.</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Additional Details (Optional)</label>
            <textarea
              id="details-textarea"
              placeholder="e.g. My screen turned black after standard drops..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs text-slate-800 dark:text-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
            />
          </div>

          <button
            id="repair-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Calculating Diagnostics...' : (
              <>
                <Send className="w-3.5 h-3.5" />
                Submit Reservation & Get Receipt
              </>
            )}
          </button>
        </form>
      </section>

      {/* Bookings Submission History log */}
      {activeBookings.length > 0 && (
        <section className="space-y-4">
          <h3 className="font-display font-extrabold text-sm text-slate-400 uppercase tracking-widest pl-1">Active Booking Reciepts ({activeBookings.length})</h3>
          <div className="space-y-3">
            {activeBookings.map((bk) => (
              <div 
                key={bk.bookingId} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2.5xl p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start border-b border-slate-50 dark:border-slate-850 pb-3">
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">{bk.model}</h5>
                    <span className="text-[10px] text-slate-400 font-medium">Issue: {bk.issueType}</span>
                  </div>
                  <span className="font-mono text-xs text-blue-600 font-black">{bk.bookingId}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-bold">Estimated Cost</span>
                    <span className="font-display font-extrabold text-sm text-slate-900 dark:text-white">₦{bk.estimate.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleWhatsappReceipt(bk)}
                    className="p-2.5 px-4 bg-[#25D366] text-white font-bold text-[10px] rounded-lg active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    Confirm via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Beautiful Modal Receipt Receipt Overlay popup dialog */}
      {showReceipt && latestReceipt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 w-full max-w-sm overflow-hidden p-6 relative animate-scale-up space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="font-display font-black text-lg text-slate-900 dark:text-white">Repairs Quote Prepared</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Diagnosis token generated successfully for Benin City Hub.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl space-y-3 border border-slate-100 dark:border-slate-850">
              <div className="flex justify-between items-center text-[11px] font-mono border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-400">BOOKING ID</span>
                <span className="font-bold text-blue-600">{latestReceipt.bookingId}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">DEVICE MODEL</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{latestReceipt.model}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-400">ISSUE SPEC</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{latestReceipt.issueType}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] border-t border-slate-200 dark:border-slate-800 pt-2 font-display">
                <span className="text-slate-400 font-bold">ESTIMATED PRICE</span>
                <span className="font-black text-sm text-slate-900 dark:text-white">₦{latestReceipt.estimate.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowReceipt(false)}
                className="flex-1 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close Receipt
              </button>
              <button
                onClick={() => {
                  handleWhatsappReceipt(latestReceipt);
                  setShowReceipt(false);
                }}
                className="flex-1 h-11 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                Send to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
