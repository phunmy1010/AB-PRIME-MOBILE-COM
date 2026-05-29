import { Product } from './types';
import starlinkImage from './assets/images/starlink_kit_prime_1780065221470.png';
import iphone15ProMaxImage from './assets/images/iphone_15_pro_max_natural_1780065510831.png';
import onyxStudio9Image from './assets/images/onyx_studio_9_speaker_1780065777174.png';
import iphone13BlueImage from './assets/images/iphone_13_blue_1780065898261.png';
import iphone15ProBlueImage from './assets/images/iphone_15_pro_blue_1780066016503.png';
import iphone17ProMaxImage from './assets/images/iphone_17_pro_max_black_orange_1780066125407.png';

export const productsData: Product[] = [
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    category: 'iPhone',
    price: 2450000,
    priceBrandNew: 2450000,
    priceUKUsed: 1980000,
    subTitle: 'The Future of Mobile Power',
    description: 'Featuring the innovative A19 Pro Bionic processor, standard-setting triple 48MP lenses, and a state-of-the-art titanium frame, the iPhone 17 Pro Max stands as a supreme retail powerhouse.',
    image: iphone17ProMaxImage,
    imagesList: [
      iphone17ProMaxImage,
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    ],
    storageOptions: ['256GB', '512GB', '1TB'],
    condition: 'Both',
    badge: 'New Arrival',
    gradeBadge: 'Original Parts Guaranteed',
    colorOptions: [
      { name: 'Space Black', class: 'bg-slate-950' },
      { name: 'Sunset Orange', class: 'bg-orange-600' },
      { name: 'Titanium Gray', class: 'bg-stone-400' }
    ],
    specs: {
      display: '6.9" Super Retina XDR',
      camera: '48MP Triple Lens',
      battery: '33 hrs playback',
      processor: 'A19 Pro Bionic'
    }
  },
  {
    id: 'iphone-15-pro-max-used',
    name: 'iPhone 15 Pro Max',
    category: 'iPhone',
    price: 900000,
    subTitle: 'Premium pre-owned quality',
    description: 'Expertly fully tested Grade A+ pre-owned flagship. True dynamic island, flawless responsiveness, with comprehensive warranty.',
    image: iphone15ProMaxImage,
    storageOptions: ['128GB', '256GB', '512GB'],
    condition: 'UK Used',
    colorOptions: [{ name: 'Titanium', class: 'bg-stone-300' }],
    badge: 'UK Used',
    gradeBadge: 'Grade A+',
    specs: {
      display: '6.7" Super Retina XDR',
      camera: '48MP + 12MP + 12MP',
      battery: '29 hrs playback',
      processor: 'A17 Pro Chip'
    }
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    category: 'iPhone',
    price: 1450000,
    priceBrandNew: 1450000,
    priceUKUsed: 1150000,
    subTitle: 'Titanium strength, flawless size',
    description: 'Beautifully crafted in Blue Titanium. Exceptional performance with pristine ergonomics and industry-leading cameras.',
    image: iphone15ProBlueImage,
    storageOptions: ['128GB', '256GB', '512GB'],
    condition: 'Both',
    badge: 'New',
    gradeBadge: 'Grade A+',
    colorOptions: [{ name: 'Blue Titanium', class: 'bg-slate-700' }],
    specs: {
      display: '6.1" Super Retina',
      camera: '48MP Main System',
      battery: '23 hrs playback',
      processor: 'A17 Pro Bionic'
    }
  },
  {
    id: 'iphone-14-pro-max',
    name: 'iPhone 14 Pro Max',
    category: 'iPhone',
    price: 750000,
    subTitle: 'Immersive power and screen',
    description: 'Immaculately preserved Deep Purple iPhone containing excellent battery health and high pixel-density pro display.',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    storageOptions: ['128GB', '256GB', '512GB'],
    condition: 'UK Used',
    badge: 'UK Used',
    gradeBadge: 'Grade A',
    colorOptions: [{ name: 'Deep Purple', class: 'bg-purple-900' }],
    specs: {
      display: '6.7" Pro XDR OLED',
      camera: '48MP Triple Lens',
      battery: '29 hrs playback',
      processor: 'A16 Bionic'
    }
  },
  {
    id: 'samsung-galaxy-a55',
    name: 'Samsung Galaxy A55',
    category: 'Android',
    price: 485000,
    subTitle: 'Sleek, fluid, and hyper-connected',
    description: 'Outstanding design and performance with magnificent screen-to-body ratios, exceptional dual camera, and long active charge cycle.',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    condition: 'Brand New',
    colorOptions: [{ name: 'Ice Blue', class: 'bg-indigo-200' }],
    specs: {
      display: '6.6" Super AMOLED',
      camera: '50MP + 12MP + 50MP',
      battery: '5000 mAh Powerhouse',
      processor: 'Exynos 1480 Octa'
    }
  },
  {
    id: 'macbook-pro-m3',
    name: 'MacBook Pro M3',
    category: 'Laptops',
    price: 2100000,
    subTitle: 'Ultimate developer capability',
    description: 'Pure performance with M3 speed, premium liquid retina panel, outstanding dual fans system, and spectacular battery coverage.',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    badge: 'Pro Choice',
    condition: 'Brand New',
    specs: {
      display: '14" Liquid Retina XDR',
      camera: '1080p FaceTime HD',
      battery: '22 hrs longevity',
      processor: 'Apple M3 chip'
    }
  },
  {
    id: 'starlink-kit',
    name: 'Starlink Kit',
    category: 'Starlink',
    price: 550000,
    subTitle: 'High-speed satellite internet',
    description: 'Perfect for homes, enterprises, and remote locations across Nigeria, giving reliable broadband speed directly.',
    image: starlinkImage,
    badge: 'In Stock',
    condition: 'Brand New',
    specs: {
      display: 'Auto-aligning Stand',
      camera: 'Wi-Fi 5 Dual Band',
      battery: '100-240V Power Specs',
      processor: 'Weatherproof IP56'
    }
  },
  {
    id: 'tecno-camon-30',
    name: 'Tecno Camon 30',
    category: 'Android',
    price: 295000,
    subTitle: 'Elegance met with high definition',
    description: 'Stunning back texture, ultra-high resolution photography, dual speakers system, and fast battery replenishing.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    condition: 'Brand New',
    specs: {
      display: '6.78" FHD+ AMOLED',
      camera: '50MP OIS Ultra Steady',
      battery: '5000 mAh, 70W Fast',
      processor: 'MediaTek Helio G99 Ultimate'
    }
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    category: 'iPhone',
    price: 450000,
    subTitle: 'Everyday flagship performance',
    description: 'Meticulously validated Grade A UK Used device. Brilliant super retina display, robust frame, and great dual camera layout.',
    image: iphone13BlueImage,
    storageOptions: ['128GB', '256GB'],
    condition: 'UK Used',
    badge: 'UK Used',
    gradeBadge: 'Grade A+',
    colorOptions: [{ name: 'Blue', class: 'bg-blue-600' }],
    specs: {
      display: '6.1" Super Retina OLED',
      camera: 'Dual 12MP Premium',
      battery: '19 hrs longevity',
      processor: 'A15 Bionic'
    }
  },
  {
    id: 'iphone-12',
    name: 'iPhone 12',
    category: 'iPhone',
    price: 320000,
    subTitle: 'Sleek and classic utility',
    description: 'Expertly certified UK used model featuring crisp bezels, clear color reproduction, and full functional battery standards.',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80',
    storageOptions: ['64GB', '128GB'],
    condition: 'UK Used',
    badge: 'UK Used',
    gradeBadge: 'Grade A',
    colorOptions: [{ name: 'White', class: 'bg-stone-100' }],
    specs: {
      display: '6.1" OLED Liquid',
      camera: 'Dual 12MP Ultra-wide',
      battery: '17 hrs play',
      processor: 'A14 Bionic'
    }
  },
  {
    id: 'iphone-11',
    name: 'iPhone 11',
    category: 'iPhone',
    price: 240000,
    subTitle: 'Unbeatable value pre-owned',
    description: 'Verified UK Used classic. Superb battery health, solid computing speed, and robust drop proof engineering.',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    storageOptions: ['64GB', '128GB'],
    condition: 'UK Used',
    badge: 'UK Used',
    gradeBadge: 'Grade A',
    colorOptions: [{ name: 'Black', class: 'bg-black' }],
    specs: {
      display: '6.1" Liquid Retina IPS',
      camera: 'Dual 12MP System',
      battery: '17 hrs play',
      processor: 'A13 Bionic'
    }
  },
  {
    id: 'jbl-flip-6',
    name: 'JBL Flip 6',
    category: 'Accessories',
    price: 145000,
    subTitle: 'IP67 Waterproof portable speaker',
    description: 'Robust two-way speaker system delivering powerful bass, waterproof design, and 12-hour continuous music life.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    condition: 'Brand New',
    specs: {
      display: 'Wireless Bluetooth 5.1',
      camera: 'Type-C Charging Protection',
      battery: '12 hrs runtime',
      processor: 'IP67 Dust & Water'
    }
  },
  {
    id: 'onyx-studio-9',
    name: 'Harman Kardon Onyx Studio 9',
    category: 'Accessories',
    price: 250000,
    subTitle: 'Superior room-filling sound',
    description: 'Modern art-piece aesthetic combined with legendary Harman Kardon acoustic power. Features dynamic self-tuning audio calibration, multi-directional dual-tweeters, premium fabric finish, and sleek premium aluminum handle.',
    image: onyxStudio9Image,
    condition: 'Brand New',
    badge: 'Premium Audio',
    specs: {
      display: 'Bluetooth 5.3 Multi-Connect',
      camera: 'Brushed Aluminum Built-in Handle',
      battery: '8 hrs wireless playback',
      processor: 'Continuous Acoustic Self-Calibrating'
    }
  }
];

export const formatPrice = (value: number) => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(2).replace(/\.00$/, '')}M`;
  }
  return `₦${value.toLocaleString()}`;
};

export const formatPriceFull = (value: number) => {
  return `₦${value.toLocaleString()}`;
};
