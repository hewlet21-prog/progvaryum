// BALIK RESİMLERİ - resimler.js
// Lokal resimler + Emoji fallback

// Lokal resim path'i
export const getBalikResmi = (balikId) => {
  return `/images/baliklar/${balikId}.jpg`;
};

// Varsayılan resim
export const DEFAULT_RESIM = '/images/baliklar/default.png';

// Kategori emojileri (fallback için)
export const kategoriEmojileri = {
  'canli-doguranlar': '🐟',
  'malawi-cikletleri': '🐠',
  'tanganyika-cikletleri': '🐡',
  'amerika-cikletleri': '🎣',
  'cuce-cikletler': '💎',
  'labirentliler': '🌸',
  'tetralar': '✨',
  'sazansigiller': '⚡',
  'kedi-baliklari': '🐱',
  'gokkusagi-baliklari': '🌈',
  'killifish': '🔥',
  'diger-turler': '🐟'
};

export const getKategoriEmoji = (kategoriId) => {
  return kategoriEmojileri[kategoriId] || '🐟';
};

export default { getBalikResmi, DEFAULT_RESIM, getKategoriEmoji };