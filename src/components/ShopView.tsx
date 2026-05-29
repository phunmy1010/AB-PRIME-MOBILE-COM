import React, { useState, useMemo, useEffect } from 'react';
import { productsData, formatPriceFull } from '../data';
import { Product, CartItem } from '../types';
import { Search, ShoppingBag, Send, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

interface ShopViewProps {
  onAddToCart: (item: CartItem) => void;
  initialCategory?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({ onAddToCart, initialCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);
  const [selectedCapacity, setSelectedCapacity] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [activeItemLimit, setActiveItemLimit] = useState<number>(6);

  // Active filter chips
  const [filterStorageChipActive, setFilterStorageChipActive] = useState(true);
  const [filterConditionChipActive, setFilterConditionChipActive] = useState(true);

  // Category tags definitions
  const categories = ['All', 'iPhone', 'Android', 'Laptops', 'Starlink', 'Accessories'];

  // Filter dynamic logic
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      // 1. Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      // 2. Search query filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 3. Storage query filter (if chip is active, we check if product has the option. For simplicity, if chip active we showcase 128GB-related or pass)
      let matchesStorage = true;
      if (filterStorageChipActive && selectedCategory === 'iPhone') {
        matchesStorage = product.storageOptions?.includes('128GB') || product.id === 'iphone-17-pro-max';
      }
      if (selectedCapacity !== 'All') {
        matchesStorage = product.storageOptions?.includes(selectedCapacity) ?? false;
      }
      
      // 4. Condition query filter
      let matchesCondition = true;
      if (filterConditionChipActive && selectedCondition === 'All') {
        // simulation for grade A+ filter chip
        matchesCondition = product.gradeBadge === 'Grade A+' || product.condition === 'Brand New' || product.id === 'iphone-17-pro-max';
      } else if (selectedCondition !== 'All') {
        matchesCondition = product.condition === selectedCondition || product.condition === 'Both';
      }

      return matchesCategory && matchesSearch && matchesStorage && matchesCondition;
    });
  }, [searchQuery, selectedCategory, selectedCapacity, selectedCondition, filterStorageChipActive, filterConditionChipActive]);

  const handleAddToCart = (product: Product) => {
    const storageOption = product.storageOptions?.[0] || '128GB';
    const finalPrice = product.price;
    onAddToCart({
      id: `${product.id}-${product.condition}-${storageOption}`,
      name: product.name,
      price: finalPrice,
      quantity: 1,
      condition: product.condition === 'Both' ? 'Brand New' : (product.condition as 'Brand New' | 'UK Used'),
      storage: storageOption,
      image: product.image
    });
  };

  const handleWhatsappLink = (product: Product) => {
    window.open('https://wa.link/eo0ixx', '_blank');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in font-sans">
      
      {/* Dynamic Filter Categories Showcase */}
      <section className="space-y-4">
        {/* Horizontal scroll section of main tags */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(category => (
            <button
              key={category}
              id={`cat-chip-${category}`}
              onClick={() => {
                setSelectedCategory(category);
                setActiveItemLimit(6); // reset limit on category change
              }}
              className={`px-5 py-3 rounded-xl font-display font-bold text-[13px] tracking-wide shrink-0 transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Live Filters list */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl space-y-4 shadow-sm">
        
        {/* Primary Row: Search Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 animate-pulse h-4 text-slate-400" />
            <input
              id="shop-search-input"
              type="text"
              placeholder="Search catalog models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-950 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
            />
          </div>
          
          <button 
            id="all-filters-btn"
            onClick={() => {
              // Reset all states elegantly
              setSelectedCapacity('All');
              setSelectedCondition('All');
              setFilterStorageChipActive(false);
              setFilterConditionChipActive(false);
              setSearchQuery('');
            }}
            className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:bg-slate-100 rounded-xl transition-all block cursor-pointer"
            title="Reset Filters"
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Multi Custom Filters Row (Capacity, Condition) */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Capacity</label>
            <select
              id="capacity-select"
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
              className="w-full h-11 bg-slate-50 dark:bg-slate-950 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300 px-3 cursor-pointer select-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Sizes</option>
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 pl-1">Condition</label>
            <select
              id="condition-select"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full h-11 bg-slate-50 dark:bg-slate-950 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300 px-3 cursor-pointer select-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Conditions</option>
              <option value="Brand New">Brand New</option>
              <option value="UK Used">UK Used</option>
            </select>
          </div>
        </div>

        {/* Active Chip Triggers list from user guidelines */}
        {(filterStorageChipActive || filterConditionChipActive) && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-50 dark:border-slate-850">
            {filterStorageChipActive && (
              <span id="active-chip-storage" className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[11px] font-bold px-3 py-1.5 rounded-full border border-blue-105">
                Storage: 128GB
                <button onClick={() => setFilterStorageChipActive(false)} className="hover:text-blue-800 hover:scale-110 font-bold ml-1 shrink-0">×</button>
              </span>
            )}
            
            {filterConditionChipActive && (
              <span id="active-chip-grade" className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[11px] font-bold px-3 py-1.5 rounded-full border border-blue-105">
                Condition: Grade A+
                <button onClick={() => setFilterConditionChipActive(false)} className="hover:text-blue-800 hover:scale-110 font-bold ml-1 shrink-0">×</button>
              </span>
            )}
          </div>
        )}
      </section>

      {/* Product Results Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-1">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Showing <span className="text-slate-900 dark:text-white font-black">{Math.min(filteredProducts.length, activeItemLimit)}</span> of <span className="text-slate-500">{filteredProducts.length}</span> Results
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 rounded-3xl p-6 text-center shadow-sm border border-slate-100 dark:border-slate-850">
            <span className="material-symbols-outlined text-[60px] text-slate-300 mb-3 select-none">search_off</span>
            <h4 className="font-display font-extrabold text-base text-slate-800 dark:text-slate-200">No Devices Found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">No items in active filters match your query. Try resetting or selecting another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProducts.slice(0, activeItemLimit).map(product => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white dark:bg-slate-900 rounded-2.5xl overflow-hidden border border-slate-100 dark:border-slate-850 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Visual Image Header */}
                <div className="aspect-square bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-3 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {product.badge && (
                      <span className="bg-emerald-500 text-white font-display font-black text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                        {product.badge}
                      </span>
                    )}
                    {product.gradeBadge && (
                      <span className="bg-blue-600 text-white font-bold text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
                        {product.gradeBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-bold text-[8.5px] uppercase tracking-widest text-slate-400 block">{product.category}</span>
                    <h4 className="font-display font-black text-sm text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-50 dark:border-slate-850">
                    {/* Price structure */}
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-base text-slate-900 dark:text-white leading-none">
                        {formatPriceFull(product.price)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        id={`add-to-cart-${product.id}`}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white transition-all flex items-center justify-center active:scale-90 cursor-pointer"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick Buy via WhatsApp CTA */}
                    <button
                      id={`buy-whatsapp-${product.id}`}
                      onClick={() => handleWhatsappLink(product)}
                      className="w-full py-2 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow-emerald-500/10"
                    >
                      <Send className="w-3 h-3 fill-white" />
                      WhatsApp Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load more interaction */}
        {filteredProducts.length > activeItemLimit && (
          <div className="text-center pt-4">
            <button
              id="load-more-btn"
              onClick={() => setActiveItemLimit(prev => prev + 6)}
              className="px-6 h-12 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 active:scale-95 transition-all cursor-pointer shadow-sm block mx-auto"
            >
              Load More Models
            </button>
            <p className="text-[10px] text-slate-400 font-medium mt-2">
              Viewing {Math.min(filteredProducts.length, activeItemLimit)} of {filteredProducts.length} Models
            </p>
          </div>
        )}
      </section>

      {/* Pricing Notice */}
      <div className="p-4 rounded-xl border-2 border-amber-500 bg-amber-500/10 text-center animate-pulse">
        <p className="text-xs text-amber-800 dark:text-amber-300 font-mono tracking-wider font-extrabold uppercase leading-relaxed">
          ⚠️ WARNING: All prices are susceptible to changes according to price inflation or market price
        </p>
      </div>

    </div>
  );
};
