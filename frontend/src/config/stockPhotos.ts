export interface StockPhoto {
  id: string;
  title: string;
  category: 'heritage' | 'festivals' | 'food' | 'nature' | 'business' | 'people';
  url: string;
  thumbnailUrl: string;
  tags: string[];
  width: number;
  height: number;
}

export const STOCK_PHOTOS: StockPhoto[] = [
  // --- 1. HERITAGE & FORTS ---
  {
    id: 'photo-raigad',
    title: 'Raigad Fort — Capital of Chhatrapati Shivaji Maharaj',
    category: 'heritage',
    url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=400&q=70',
    tags: ['fort', 'raigad', 'heritage', 'shivaji', 'maharashtra', 'history', 'sahyadri'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-gateway',
    title: 'Gateway of India — Mumbai Historic Landmark',
    category: 'heritage',
    url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=70',
    tags: ['mumbai', 'gateway of india', 'sea', 'coast', 'heritage', 'architecture'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-shaniwarwada',
    title: 'Shaniwar Wada — Historic Peshwa Fortification Pune',
    category: 'heritage',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=70',
    tags: ['pune', 'shaniwar wada', 'peshwa', 'heritage', 'fort', 'history'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-cst-mumbai',
    title: 'Chhatrapati Shivaji Maharaj Terminus (CST)',
    category: 'heritage',
    url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=400&q=70',
    tags: ['mumbai', 'cst', 'station', 'unesco', 'night', 'lights', 'heritage'],
    width: 1200,
    height: 800,
  },

  // --- 2. FESTIVALS & CELEBRATIONS ---
  {
    id: 'photo-ganesh-utsav',
    title: 'Ganeshotsav — Divine Ganpati Bappa Idol',
    category: 'festivals',
    url: 'https://images.unsplash.com/photo-1567591414240-e2b26090c29f?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1567591414240-e2b26090c29f?auto=format&fit=crop&w=400&q=70',
    tags: ['ganesh', 'ganpati', 'festival', 'utsav', 'puja', 'devotional', 'bappa'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-diwali-diyas',
    title: 'Deepavali — Festive Glowing Clay Diyas',
    category: 'festivals',
    url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=400&q=70',
    tags: ['diwali', 'diya', 'lights', 'deepotsav', 'flame', 'celebration', 'festival'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-rangoli',
    title: 'Traditional Colorful Festive Rangoli',
    category: 'festivals',
    url: 'https://images.unsplash.com/photo-1605487760446-86085a86a60e?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605487760446-86085a86a60e?auto=format&fit=crop&w=400&q=70',
    tags: ['rangoli', 'colors', 'art', 'diwali', 'gudipadwa', 'traditional', 'welcome'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-marigold-flowers',
    title: 'Zendu (Marigold) Garland Flowers for Puja & Toran',
    category: 'festivals',
    url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=400&q=70',
    tags: ['marigold', 'zendu', 'flowers', 'yellow', 'orange', 'puja', 'garland', 'toran'],
    width: 1200,
    height: 800,
  },

  // --- 3. FOOD & DELICACIES ---
  {
    id: 'photo-misal-pav',
    title: 'Authentic Kolhapuri / Puneri Spicy Misal Pav',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=70',
    tags: ['misal', 'pav', 'food', 'spicy', 'kolhapur', 'pune', 'breakfast', 'marathi food'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-alphonso-mango',
    title: 'Konkan Ratnagiri Alphonso Mangoes (Hapus)',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=70',
    tags: ['mango', 'alphonso', 'hapus', 'konkan', 'ratnagiri', 'fruit', 'summer', 'sweet'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-indian-sweets',
    title: 'Festive Mithai & Traditional Sweets Platter',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=70',
    tags: ['sweets', 'mithai', 'modak', 'laddu', 'peda', 'dessert', 'festival'],
    width: 1200,
    height: 800,
  },

  // --- 4. NATURE & SCENERY ---
  {
    id: 'photo-sahyadri-monsoon',
    title: 'Sahyadri Western Ghats Mountain Greenery & Mist',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=70',
    tags: ['sahyadri', 'mountains', 'monsoon', 'greenery', 'western ghats', 'nature', 'landscape'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-konkan-beach',
    title: 'Konkan Coastline Golden Hour Sunset Beach',
    category: 'nature',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=70',
    tags: ['konkan', 'beach', 'sunset', 'ocean', 'sand', 'tropical', 'sea'],
    width: 1200,
    height: 800,
  },

  // --- 5. BUSINESS & PROFESSIONAL ---
  {
    id: 'photo-modern-office',
    title: 'Modern Corporate Office & Technology Workspace',
    category: 'business',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=70',
    tags: ['office', 'business', 'workspace', 'corporate', 'meeting', 'technology'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-handshake-deal',
    title: 'Professional Business Partnership & Agreement',
    category: 'business',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70',
    tags: ['partnership', 'handshake', 'deal', 'agreement', 'business', 'success'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-retail-store',
    title: 'Shopping Mall & Retail Boutique Display',
    category: 'business',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=70',
    tags: ['shop', 'retail', 'store', 'boutique', 'fashion', 'sale', 'market'],
    width: 1200,
    height: 800,
  },

  // --- 6. PEOPLE & CULTURE ---
  {
    id: 'photo-traditional-attire',
    title: 'Indian Traditional Silk & Festive Attire',
    category: 'people',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=70',
    tags: ['paithani', 'saree', 'traditional', 'culture', 'marathi', 'wedding', 'attire'],
    width: 1200,
    height: 800,
  },
  {
    id: 'photo-students-learning',
    title: 'Students Studying & Learning in Modern Classroom',
    category: 'people',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=70',
    tags: ['students', 'education', 'learning', 'classroom', 'school', 'college', 'youth'],
    width: 1200,
    height: 800,
  }
];
