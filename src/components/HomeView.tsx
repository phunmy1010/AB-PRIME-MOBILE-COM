import React from 'react';
import { MapPin, Navigation, Wrench, RefreshCw, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import starlinkImage from '../assets/images/starlink_kit_prime_1780065221470.png';

interface HomeViewProps {
  onAddToCart: (item: CartItem) => void;
  onNavigateToTab: (tab: 'home' | 'shop' | 'repairs' | 'contact' | 'trade-in', category?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateToTab }) => {
  return (
    <div className="space-y-8 pb-12 animate-fade-in font-sans">
      
      {/* Category Section Header */}
      <div className="space-y-1">
        <span className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] block">
          OUR COLLECTION
        </span>
        <h2 className="font-display font-[900] text-2.5xl md:text-3.5xl text-slate-900 dark:text-white tracking-tight leading-none">
          Browse by Category
        </h2>
      </div>

      {/* Bento Grid layout as shown in the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Tall Left Column Container: iPhones Category */}
        <button
          id="category-card-iphone"
          onClick={() => onNavigateToTab('shop', 'iPhone')}
          className="relative w-full rounded-2xl md:rounded-[2rem] h-[340px] md:h-[460px] overflow-hidden group border border-slate-100/50 dark:border-slate-800 text-left bg-gradient-to-b from-[#2a2e2a]/40 to-[#121412] shadow-sm transition-transform duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
        >
          {/* Background image of iPhones standing */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80"
              alt="Real camera capture of latest Titanium iPhone"
              className="w-full h-full object-cover object-center scale-102 group-hover:scale-105 transition-transform duration-700 opacity-90"
              referrerPolicy="no-referrer"
            />
            {/* Subtle gradient dark overlay focused at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
          </div>

          {/* Headline details on bottom corner overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-0.5">
            <h3 className="font-display font-[900] text-xl md:text-2xl tracking-tight leading-none text-white">
              iPhones
            </h3>
            <p className="text-[10px] md:text-[11px] font-sans font-medium text-slate-300 opacity-90 leading-tight">
              Latest 15 & 16 Series Available
            </p>
          </div>
        </button>

        {/* Right Columns nested Bento Grid elements */}
        <div className="flex flex-col gap-4">
          
          {/* Top Cell: Android Phones */}
          <button
            id="category-card-android"
            onClick={() => onNavigateToTab('shop', 'Android')}
            className="relative w-full rounded-2xl md:rounded-3xl h-[160px] md:h-[222px] overflow-hidden group border border-slate-100/50 dark:border-slate-800 text-left bg-gradient-to-r from-slate-950 to-slate-800 shadow-sm transition-transform duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
          >
            {/* Image background represented as beautiful floating smartphone screens */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80"
                alt="Samsung Galaxy phone on desk"
                className="w-full h-full object-cover object-center scale-102 group-hover:scale-105 transition-transform duration-700 opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
            </div>

            {/* Bottom details label */}
            <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-0.5">
              <h3 className="font-display font-[900] text-lg md:text-xl tracking-tight leading-none text-white">
                Android Phones
              </h3>
              <p className="text-[10px] md:text-[11px] font-sans font-medium text-slate-300 opacity-95 leading-tight">
                Tecno, Infinix, Samsung
              </p>
            </div>
          </button>

          {/* Bottom Row Splitted: Laptops and Starlink */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            
            {/* Laptops category cell */}
            <button
              id="category-card-laptops"
              onClick={() => onNavigateToTab('shop', 'Laptops')}
              className="relative rounded-2xl md:rounded-3xl min-h-[160px] overflow-hidden group border border-slate-100/50 dark:border-slate-800 text-left bg-gradient-to-b from-slate-900 to-slate-950 shadow-sm transition-transform duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
                  alt="MacBook Pro Laptop on wooden desk"
                  className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700 opacity-75"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                <h3 className="font-display font-[900] text-sm md:text-base tracking-tight leading-none text-white">
                  Laptops
                </h3>
              </div>
            </button>

            {/* Starlink category cell */}
            <button
              id="category-card-starlink"
              onClick={() => onNavigateToTab('shop', 'Starlink')}
              className="relative rounded-2xl md:rounded-3xl min-h-[160px] overflow-hidden group border border-slate-100/50 dark:border-slate-800 text-left bg-[#051121] shadow-sm transition-transform duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={starlinkImage}
                  alt="Starlink kit satellite dish antenna with retailer box and router content"
                  className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-700 opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020a16]/95 via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 text-white space-y-1">
                <h3 className="font-display font-[900] text-sm md:text-base tracking-tight leading-none text-white">
                  Starlink
                </h3>
                <span className="inline-block bg-[#00E575]/20 text-[#00E575] border border-[#00E575]/30 font-display font-black text-[7.5px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  IN STOCK
                </span>
              </div>
            </button>

          </div>

        </div>

      </div>

      {/* PREMIUM SERVICES: Repairs & Swaps */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1">
          <span className="text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] block">
            PREMIUM SERVICES
          </span>
          <h2 className="font-display font-[900] text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight leading-none">
            Repairs & Device Swaps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Repairs */}
          <button
            id="home-service-repairs"
            onClick={() => onNavigateToTab('repairs')}
            className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-left hover:shadow-md transition-all duration-300 group cursor-pointer w-full"
          >
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <h3 className="font-display font-extrabold text-sm md:text-base text-slate-900 dark:text-white block truncate">
                Professional Device Repair
              </h3>
              <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                Expert screen replacements, battery swaps, and diagnosis updates at our showroom hub.
              </p>
            </div>
            <div className="text-slate-300 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          {/* Card 2: Trade-In/Swap Upgrade */}
          <button
            id="home-service-swap"
            onClick={() => onNavigateToTab('trade-in')}
            className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-left hover:shadow-md transition-all duration-300 group cursor-pointer w-full"
          >
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <RefreshCw className="w-6 h-6 animate-hover-spin" />
            </div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <h3 className="font-display font-extrabold text-sm md:text-base text-slate-900 dark:text-white block truncate">
                Upgrade & Swap Device
              </h3>
              <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                Trade in your old UK used or brand new smartphone for a pristine flagship upgrade instantly.
              </p>
            </div>
            <div className="text-slate-300 dark:text-slate-700 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>

      {/* PHYSICAL STORE Highlight section */}
      <div className="space-y-4 pt-4">
        
        {/* Physical Store sub-header with map icon */}
        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em]">
          <MapPin className="w-3.5 h-3.5" />
          <span>PHYSICAL STORE</span>
        </div>

        {/* Beautiful layout card of physical store with responsive side-by-side splits */}
        <div 
          onClick={() => onNavigateToTab('contact')}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-805 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col md:grid md:grid-cols-12"
        >
          {/* Left Text Block */}
          <div className="p-6 md:p-8 md:col-span-12 lg:col-span-7 flex flex-col justify-center space-y-4 text-left">
            <h3 className="font-display font-[900] text-2xl text-slate-900 dark:text-white tracking-tight leading-none">
              Visit us in Benin City
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
              Find us at <span className="font-bold text-slate-800 dark:text-slate-100">OSAWARU COMPLEX , OPPOSIT OBA MARKET BESIDE BOB IZUA PARK RING ROAD BENIN CITY EDO STATE</span> for personalized expert advice, device testing, and same-day repair services.
            </p>
          </div>

          {/* Right Map Image mockup overlay */}
          <div className="relative h-48 md:h-64 md:col-span-12 lg:col-span-5 bg-slate-50 dark:bg-slate-950 overflow-hidden group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD3CrhNDNDCW0nofZ2bos4oS6lK_nI7Tf0WGfWzDpPEPZXipS39JeEGKirrX1KMf41VhET8vhW_J4CZoX9o6V5gJ5dDxxClraF7SMUEq7VdiQASLB8JuGxKZtzB0njMYkkPmRriQOOHna1a_SAIz-UkRjsYfu-0rmTnDkCepB04D66acDoFNQd7wbxI07rzum1r5N4r4KqD5mTBpXXtmhv7EmBVV_I_OPgLIs1hHGtLIn0KE9JCEqjWHAWYCkJF-otsn8RjM-xw" 
              alt="Road navigation map around Osawaru Complex Benin City" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Dynamic floating navigation tag badges */}
            <div className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-white font-mono z-10 flex items-center gap-1 shadow-sm border border-white/5">
              <Navigation className="w-2.5 h-2.5 text-blue-400 rotate-45" />
              <span>Map Navigation Link</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
