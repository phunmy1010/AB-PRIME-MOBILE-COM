import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Navigation, Clock, ShieldCheck, ExternalLink } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [directionsMessage, setDirectionsMessage] = useState(false);

  const contactOptions = [
    { name: 'Call Showroom', icon: <Phone className="w-4 h-4" />, action: 'tel:+2347068565103', color: 'bg-blue-600 text-white hover:bg-blue-700' },
    { name: 'WhatsApp Live Chat', icon: <MessageSquare className="w-4 h-4" />, action: 'https://wa.link/eo0ixx', color: 'bg-[#25D366] text-white hover:bg-[#20ba56]' },
    { name: 'Email Sales Desk', icon: <Mail className="w-4 h-4" />, action: 'mailto:abprimecomp@gmail.com', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200' }
  ];

  const handleDirections = () => {
    setDirectionsMessage(true);
    setTimeout(() => {
      window.open('https://maps.google.com/?q=OSAWARU+COMPLEX,+OPPOSIT+OBA+MARKET+BESIDE+BOB+IZUA+PARK+RING+ROAD+BENIN+CITY+EDO+STATE', '_blank');
      setDirectionsMessage(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in font-sans">
      
      {/* Title Intro detail */}
      <div className="text-center space-y-2 py-4">
        <h2 className="font-display font-[900] text-2.5xl text-slate-900 dark:text-white tracking-tight">
          Find Us in Benin City
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          The heartbeat of Edo State. Experience premium mobile tech at our flagship showroom hub at Osawaru Complex, Ring Road.
        </p>
      </div>

      {/* Flagship Showroom Map with embedded Pointer card */}
      <section className="relative rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md group">
        
        {/* Real map hotlinked image representation */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD3CrhNDNDCW0nofZ2bos4oS6lK_nI7Tf0WGfWzDpPEPZXipS39JeEGKirrX1KMf41VhET8vhW_J4CZoX9o6V5gJ5dDxxClraF7SMUEq7VdiQASLB8JuGxKZtzB0njMYkkPmRriQOOHna1a_SAIz-UkRjsYfu-0rmTnDkCepB04D66acDoFNQd7wbxI07rzum1r5N4r4KqD5mTBpXXtmhv7EmBVV_I_OPgLIs1hHGtLIn0KE9JCEqjWHAWYCkJF-otsn8RjM-xw"
          alt="Benin City Osawaru Complex showroom"
          className="w-full h-64 object-cover group-hover:scale-102 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Pointer card floating overlay top elements */}
        <div className="absolute top-4 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-805 space-y-2">
          <div className="flex gap-2.5">
            <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 shrink-0">
              <MapPin className="w-4 h-4 flex-shrink" />
            </span>
            <div className="space-y-0.5">
              <h5 className="font-display font-extrabold text-sm text-slate-900 dark:text-white">Flagship Showroom</h5>
              <p className="text-[10px] text-slate-500 leading-normal">OSAWARU COMPLEX, OPPOSIT OBA MARKET BESIDE BOB IZUA PARK RING ROAD BENIN CITY EDO STATE</p>
            </div>
          </div>
        </div>

        {/* Bottom map coordinates flag */}
        <div className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-white font-mono z-10 flex items-center gap-1">
          <Navigation className="w-2.5 h-2.5 text-blue-400 rotate-45" />
          Benin Osawaru Complex Flagship
        </div>
      </section>

      {/* Opening hours & Dot status Indicator */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-[2rem] shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2.5 border-b border-slate-50 dark:border-slate-850">
          <span className="font-display font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            Business Hours
          </span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[9px] font-display font-black uppercase px-2.5 py-1 rounded-full tracking-wider border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Store Open Now
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between font-medium">
            <span className="text-slate-500">Monday - Friday</span>
            <span className="text-slate-800 dark:text-slate-200">8:00 AM - 6:30 PM</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-500">Saturday Showroom</span>
            <span className="text-slate-800 dark:text-slate-200">9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-slate-400">Sunday</span>
            <span className="text-red-500 uppercase tracking-widest text-[10px]">Closed</span>
          </div>
        </div>
      </section>

      {/* Clean quick response action triggers list */}
      <section className="space-y-3">
        <h4 className="font-display font-black text-xs text-slate-400 uppercase tracking-widest pl-1">Get in Touch</h4>
        
        <div className="flex flex-col gap-2">
          {contactOptions.map((opt, idx) => (
            <a
              key={idx}
              href={opt.action}
              target={opt.action.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`w-full h-13 px-4 rounded-xl flex items-center justify-between text-xs font-semibold shadow-sm transition-all active:scale-[0.99] ${opt.color}`}
            >
              <div className="flex items-center gap-3">
                {opt.icon}
                <span>{opt.name}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          ))}
        </div>
      </section>

      {/* Directions Primary CTA base */}
      <section>
        <button
          id="get-directions-btn"
          onClick={handleDirections}
          disabled={directionsMessage}
          className="w-full h-14 bg-black dark:bg-white text-white dark:text-black font-semibold text-sm rounded-xl active:scale-95 transition-all shadow-md hover:opacity-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4 fill-transparent" />
          {directionsMessage ? 'Opening Google Maps Navigation...' : 'Launch Showroom GPS Directions'}
        </button>
      </section>

    </div>
  );
};
