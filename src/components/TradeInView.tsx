import React, { useState, useMemo } from 'react';
import { Smartphone, Tablet, Laptop, Check, HelpCircle, ArrowRight, RefreshCw, Send, AlertCircle } from 'lucide-react';

export const TradeInView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [deviceType, setDeviceType] = useState<'Phone' | 'Tablet' | 'Laptop'>('Phone');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [storage, setStorage] = useState('128GB');
  
  // Assessment flags
  const [screenCracked, setScreenCracked] = useState<boolean>(false);
  const [batteryHigh, setBatteryHigh] = useState<boolean>(true);
  const [devicePower, setDevicePower] = useState<boolean>(true);

  // Dynamic Valuation logic
  const calculatedValue = useMemo(() => {
    if (!model.trim()) return 0;

    let baseEstimate = 150000; // standard middle base
    const lowerModel = model.toLowerCase();

    if (lowerModel.includes('11') || lowerModel.includes('x')) baseEstimate = 120000;
    else if (lowerModel.includes('12')) baseEstimate = 180000;
    else if (lowerModel.includes('13')) baseEstimate = 280000;
    else if (lowerModel.includes('14')) baseEstimate = 420000;
    else if (lowerModel.includes('15')) baseEstimate = 650000;
    else if (lowerModel.includes('16')) baseEstimate = 850000;
    else if (lowerModel.includes('s23') || lowerModel.includes('s24')) baseEstimate = 450000;

    // device type factors
    if (deviceType === 'Tablet') baseEstimate = baseEstimate * 0.85;
    if (deviceType === 'Laptop') baseEstimate = baseEstimate * 1.5;

    // storage multipliers
    if (storage === '256GB') baseEstimate += 30000;
    if (storage === '512GB') baseEstimate += 70000;
    if (storage === '1TB') baseEstimate += 120000;

    // deductions
    if (!devicePower) return 0; // dead phone is basically ₦0 swap value
    if (screenCracked) baseEstimate -= 60000;
    if (!batteryHigh) baseEstimate -= 25000;

    return Math.max(15000, Math.round(baseEstimate));
  }, [model, deviceType, brand, storage, screenCracked, batteryHigh, devicePower]);

  const handleWhatsappTradeIn = () => {
    if (!model.trim()) return;
    window.open('https://wa.link/eo0ixx', '_blank');
  };

  const stepsDetails = [
    { num: 1, label: 'Device' },
    { num: 2, label: 'Condition' },
    { num: 3, label: 'Evaluation' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in font-sans">
      
      {/* Intro Header Banner info */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-[2rem] shadow-md space-y-2">
        <span className="bg-white/20 uppercase tracking-widest text-[9px] font-display font-black px-3 py-1 rounded-full text-white w-max block">
          Swap Desk Portal
        </span>
        <h2 className="font-display font-[900] text-xl md:text-2xl leading-tight">Upgrade Simplified</h2>
        <p className="text-xs text-blue-100 leading-relaxed font-light">
          Get the best premium monetary value for your old device and switch to the latest tech structures instantly here in Nigeria.
        </p>
      </div>

      {/* Multi-Step Horizontal Progress Tracker */}
      <section className="flex items-center justify-between px-6 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-850 h-16 rounded-2xl shadow-sm">
        {stepsDetails.map((st, i) => (
          <React.Fragment key={st.num}>
            <button
              onClick={() => {
                if (st.num === 3 && !model.trim()) return; // block going to evaluation without a model
                setActiveStep(st.num);
              }}
              className="flex items-center gap-2"
              disabled={st.num === 3 && !model.trim()}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ring-4 transition-all duration-300 ${
                activeStep === st.num
                  ? 'bg-blue-600 text-white ring-blue-105'
                  : activeStep > st.num
                  ? 'bg-emerald-500 text-white ring-emerald-50'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 ring-transparent'
              }`}>
                {activeStep > st.num ? <Check className="w-3.5 h-3.5" /> : st.num}
              </div>
              <span className={`text-[11px] font-bold tracking-wide leading-none ${activeStep === st.num ? 'text-slate-800 dark:text-slate-250' : 'text-slate-400'}`}>
                {st.label}
              </span>
            </button>
            {i < stepsDetails.length - 1 && (
              <div className="flex-1 h-[2px] bg-slate-100 dark:bg-slate-800 mx-2" />
            )}
          </React.Fragment>
        ))}
      </section>

      {/* STEP 1: DEVICE SPECIFIC DETAILS SCREEN */}
      {activeStep === 1 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm space-y-6">
          <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white pb-3 border-b border-slate-50 dark:border-slate-850">
            Step 1: Your Device specs
          </h4>
          
          {/* Device type buttons selection */}
          <div className="space-y-3">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-1">Category Type</span>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setDeviceType('Phone')}
                className={`py-4 border-2 rounded-2xl flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                  deviceType === 'Phone' ? 'border-blue-600 bg-blue-50/10 text-blue-600' : 'border-slate-150 dark:border-slate-800 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="font-bold text-[11px]">Phone</span>
              </button>
              <button
                onClick={() => setDeviceType('Tablet')}
                className={`py-4 border-2 rounded-2xl flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                  deviceType === 'Tablet' ? 'border-blue-600 bg-blue-50/10 text-blue-600' : 'border-slate-150 dark:border-slate-800 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Tablet className="w-5 h-5" />
                <span className="font-bold text-[11px]">Tablet</span>
              </button>
              <button
                onClick={() => setDeviceType('Laptop')}
                className={`py-4 border-2 rounded-2xl flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                  deviceType === 'Laptop' ? 'border-blue-600 bg-blue-50/10 text-blue-600' : 'border-slate-150 dark:border-slate-800 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Laptop className="w-5 h-5" />
                <span className="font-bold text-[11px]">Laptop</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Brand Manufacturer</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full h-12 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs text-slate-700 dark:text-slate-300 px-3 cursor-pointer"
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Google">Google Pixel</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Infinix">Infinix</option>
                <option value="Tecno">Tecno Mobile</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Enter Model Name</label>
              <input
                id="trade-model-input"
                type="text"
                placeholder="e.g. iPhone 13 Pro, Galaxy S22"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs text-slate-800 dark:text-slate-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Storage Capacity</label>
            <div className="flex gap-2 flex-wrap">
              {['64GB', '128GB', '256GB', '512GB', '1TB'].map(size => (
                <button
                  key={size}
                  onClick={() => setStorage(size)}
                  className={`px-4 py-2 border rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                    storage === size
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-250 dark:border-slate-850 dark:text-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            id="trade-in-whatsapp-btn"
            onClick={handleWhatsappTradeIn}
            disabled={!model.trim()}
            className="w-full h-12 bg-[#25D366] hover:bg-[#20ba56] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="w-4 h-4 fill-white" />
            Trade-In / Swap via WhatsApp
          </button>
        </section>
      )}

      {/* STEP 2: CONDITION ASSESSMENT SPECIFICS */}
      {activeStep === 2 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm space-y-6">
          <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white pb-3 border-b border-slate-50 dark:border-slate-850">
            Step 2: Condition Assessment
          </h4>

          {/* Assessment Questions panels list */}
          <div className="space-y-4">
            
            {/* Q1: Power Status */}
            <div className="flex justify-between items-center p-4 bg-slate-55 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-850/50">
              <div className="space-y-0.5 max-w-[70%]">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-205">Does the device boot and power on?</span>
                <p className="text-[10px] text-slate-400">Must be fully functional and run standard stock applications.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDevicePower(true)}
                  className={`w-12 h-9 rounded-lg font-bold text-xs cursor-pointer ${
                    devicePower ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setDevicePower(false)}
                  className={`w-12 h-9 rounded-lg font-bold text-xs cursor-pointer ${
                    !devicePower ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Q2: Crack Status */}
            <div className="flex justify-between items-center p-4 bg-slate-55 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-850/50">
              <div className="space-y-0.5 max-w-[70%]">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-205">Is the screen display cracked or bleeding?</span>
                <p className="text-[10px] text-slate-400">Any visible body cracks, lines/spots across the display area.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setScreenCracked(true)}
                  className={`w-12 h-9 rounded-lg font-bold text-xs cursor-pointer ${
                    screenCracked ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setScreenCracked(false)}
                  className={`w-12 h-9 rounded-lg font-bold text-xs cursor-pointer ${
                    !screenCracked ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Q3: Battery Health */}
            <div className="flex justify-between items-center p-4 bg-slate-55 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-850/50">
              <div className="space-y-0.5 max-w-[70%]">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-205">Is the Battery health rating above 80%?</span>
                <p className="text-[10px] text-slate-400">Usually visible inside settings section for premium models.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setBatteryHigh(true)}
                  className={`w-12 h-9 rounded-lg font-bold text-xs cursor-pointer ${
                    batteryHigh ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setBatteryHigh(false)}
                  className={`w-12 h-9 rounded-lg font-bold text-xs cursor-pointer ${
                    !batteryHigh ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

          </div>

          <div className="flex gap-3 pt-3">
            <button
              onClick={() => setActiveStep(1)}
              className="flex-1 h-12 bg-slate-50 dark:bg-slate-850 text-slate-705 dark:text-slate-350 font-semibold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="flex-1 h-12 bg-blue-600 text-white font-semibold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              Get Evaluation
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: VALUATION EVALUATION REPORT */}
      {activeStep === 3 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm space-y-6">
          <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white pb-3 border-b border-slate-50 dark:border-slate-850">
            Step 3: Swap Valuation Result
          </h4>

          {/* Core Valuation summary output */}
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2.5xl text-center space-y-4 border border-slate-100 dark:border-slate-850">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <RefreshCw className="w-5 h-5 animate-spin duration-3000" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Estimated Trade-In credit</span>
              <span className="font-display font-[900] text-2.5xl md:text-3xl text-slate-900 dark:text-white block leading-none">
                ₦{calculatedValue.toLocaleString()}
              </span>
              <p className="text-[9px] text-slate-400">Valid at our Benin City Osawaru Complex Showroom.</p>
            </div>
            
            {!devicePower && (
              <div className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-950/20 text-red-500 text-[10px] font-bold p-2 px-3 rounded-lg border border-red-101 shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
                Dead/unpowered devices have low valuation
              </div>
            )}
          </div>

          {/* Breakdown summary lists */}
          <div className="border border-slate-100 dark:border-slate-850 rounded-2xl p-4 space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between font-medium">
              <span>Device Model</span>
              <span className="font-bold text-slate-900 dark:text-slate-205">{brand} {model}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Memory Segment</span>
              <span className="font-bold text-slate-900 dark:text-slate-205">{storage}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Screen Integrity</span>
              <span className={`font-bold ${screenCracked ? 'text-red-500' : 'text-emerald-600'}`}>{screenCracked ? 'Cracked (-₦60,000)' : 'Perfect / Clean'}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Battery Fitness</span>
              <span className={`font-bold ${batteryHigh ? 'text-emerald-600' : 'text-red-500'}`}>{batteryHigh ? 'Excellent' : 'Aged (-₦25,000)'}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveStep(2)}
              className="flex-1 h-12 bg-slate-50 dark:bg-slate-850 text-slate-705 dark:text-slate-350 font-semibold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              id="whatsapp-trade-in-btn"
              onClick={handleWhatsappTradeIn}
              className="flex-1 h-12 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5 fill-white" />
              Chat on WhatsApp
            </button>
          </div>
        </section>
      )}

      {/* Static scrollable standard workflow timeline block from user screenshots */}
      <section className="space-y-4">
        <h3 className="font-display font-[900] text-sm text-slate-400 uppercase tracking-widest pl-1">Simple 3-Step Swap</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-4 rounded-2xl w-48 shrink-0 space-y-2">
            <span className="text-xl font-display font-black text-blue-600">01</span>
            <h5 className="font-bold text-xs text-slate-900 dark:text-white">Run Diagnosis</h5>
            <p className="text-[10px] text-slate-400 leading-normal">Enter device details online to fetch immediate monetary estimates.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-4 rounded-2xl w-48 shrink-0 space-y-2">
            <span className="text-xl font-display font-black text-blue-600">02</span>
            <h5 className="font-bold text-xs text-slate-900 dark:text-white">In-Store Verify</h5>
            <p className="text-[10px] text-slate-400 leading-normal">Walk-in or courier old device to Benin hub showroom for speedy matching check.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-4 rounded-2xl w-48 shrink-0 space-y-2">
            <span className="text-xl font-display font-black text-blue-600">03</span>
            <h5 className="font-bold text-xs text-slate-900 dark:text-white">Instant Swap</h5>
            <p className="text-[10px] text-slate-400 leading-normal">Upgrade instantly, cash out trade-in credit, get modern warranties.</p>
          </div>

        </div>
      </section>

    </div>
  );
};
