// BALIK VERİTABANI INDEX - Tüm kategorileri birleştirir
// index.js

import { canliDoguranlar } from './balikVeritabani1.js';
import { malawiCikletleri, tanganyikaCikletleri } from './balikVeritabani2.js';
import { amerikaCikletleri, cuceCikletler } from './balikVeritabani3.js';
import { labirentliler, tetralar } from './balikVeritabani4.js';
import { sazansigiller, kediBaliklari, gokkusagiBaliklari, killifish, digerTurler } from './balikVeritabani5.js';

// Tüm kategoriler
export const kategoriler = [
  canliDoguranlar.kategori,
  malawiCikletleri.kategori,
  tanganyikaCikletleri.kategori,
  amerikaCikletleri.kategori,
  cuceCikletler.kategori,
  labirentliler.kategori,
  tetralar.kategori,
  sazansigiller.kategori,
  kediBaliklari.kategori,
  gokkusagiBaliklari.kategori,
  killifish.kategori,
  digerTurler.kategori
];

// Tüm balıklar (kategori ID'ye göre gruplandırılmış)
export const baliklar = {
  'canli-doguranlar': canliDoguranlar.baliklar,
  'malawi-cikletleri': malawiCikletleri.baliklar,
  'tanganyika-cikletleri': tanganyikaCikletleri.baliklar,
  'amerika-cikletleri': amerikaCikletleri.baliklar,
  'cuce-cikletler': cuceCikletler.baliklar,
  'labirentliler': labirentliler.baliklar,
  'tetralar': tetralar.baliklar,
  'sazansigiller': sazansigiller.baliklar,
  'kedi-baliklari': kediBaliklari.baliklar,
  'gokkusagi-baliklari': gokkusagiBaliklari.baliklar,
  'killifish': killifish.baliklar,
  'diger-turler': digerTurler.baliklar
};

// Her balığa kategoriId ekle
const baliklerWithKategori = {};
Object.keys(baliklar).forEach(kategoriId => {
  baliklerWithKategori[kategoriId] = baliklar[kategoriId].map(balik => ({
    ...balik,
    kategoriId: kategoriId
  }));
});

// Tüm balıkları düz liste olarak al (kategoriId eklenmiş)
export const tumBaliklar = Object.values(baliklerWithKategori).flat();

// Kategori ID'ye göre balık listesi getir
export const getBaliklar = (kategoriId) => {
  return baliklerWithKategori[kategoriId] || [];
};

// Kategori ID'ye göre kategori bilgisi getir
export const getKategori = (kategoriId) => {
  return kategoriler.find(k => k.id === kategoriId);
};

// Balık ID'ye göre balık getir (kategoriId dahil)
export const getBalik = (balikId) => {
  return tumBaliklar.find(b => b.id === balikId);
};

// Arama fonksiyonu
export const araBalik = (aramaMetni) => {
  const aranan = aramaMetni.toLowerCase();
  return tumBaliklar.filter(balik => 
    balik.isim.toLowerCase().includes(aranan) ||
    balik.latince.toLowerCase().includes(aranan)
  );
};

// İstatistikler
export const istatistikler = {
  toplamKategori: kategoriler.length,
  toplamBalik: tumBaliklar.length
};

export default {
  kategoriler,
  baliklar,
  tumBaliklar,
  getBaliklar,
  getKategori,
  getBalik,
  araBalik,
  istatistikler
};