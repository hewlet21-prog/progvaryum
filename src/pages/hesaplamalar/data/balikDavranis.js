// src/pages/hesaplamalar/data/balikDavranis.js
// Balık Davranış ve Uyumluluk Veritabanı
// Simülasyon Motorunun Çekirdeği

export const balikDavranisVeritabani = {
  // ==================== CANLI DOĞURANLAR ====================
  'lepistes': {
    agresiflik: 2,
    bolgecilik: 1,
    yirticilik: 2,
    stresHassasiyeti: 4,
    suruIhtiyaci: 3,
    minGrup: 3,
    idealGrup: '1E:3D',
    erkekOran: 0.25,
    yasayisKatmani: 'üst',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['canlı doğuranlar', 'küçük tetralar', 'corydoras', 'küçük gökkuşağı', 'barışçıl labirentliler'],
    uyumsuzGruplar: ['büyük cikletler', 'agresif türler', 'oscar', 'yırtıcılar'],
    ozelUyarilar: ['Erkekler arası kavga olabilir', 'Aşırı ürerler, popülasyon kontrolü gerekli'],
    davranisNotu: 'Barışçıl, hareketli sürü balığı. Erkekler arası hafif rekabet olabilir.'
  },
  
  'molly': {
    agresiflik: 3,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 5,
    suruIhtiyaci: 4,
    minGrup: 4,
    idealGrup: '1E:3D',
    erkekOran: 0.25,
    yasayisKatmani: 'orta-üst',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['canlı doğuranlar', 'barışçıl cikletler', 'corydoras', 'küçük tetralar'],
    uyumsuzGruplar: ['agresif cikletler', 'yırtıcılar'],
    ozelUyarilar: ['Tuzlu su toleransı yüksek', 'Erkekler dişileri strese sokabilir'],
    davranisNotu: 'Barışçıl ama erkekler bazen aşırı ısrarcı olabilir.'
  },
  
  'platy': {
    agresiflik: 2,
    bolgecilik: 1,
    yirticilik: 2,
    stresHassasiyeti: 3,
    suruIhtiyaci: 3,
    minGrup: 3,
    idealGrup: '1E:2D',
    erkekOran: 0.33,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['canlı doğuranlar', 'tetralar', 'corydoras', 'barışçıl türler'],
    uyumsuzGruplar: ['agresif türler', 'yırtıcılar'],
    ozelUyarilar: [],
    davranisNotu: 'Çok barışçıl, başlangıç için ideal.'
  },
  
  'kilickuyruk': {
    agresiflik: 4,
    bolgecilik: 3,
    yirticilik: 2,
    stresHassasiyeti: 3,
    suruIhtiyaci: 3,
    minGrup: 3,
    idealGrup: '1E:3D',
    erkekOran: 0.25,
    yasayisKatmani: 'orta-üst',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['canlı doğuranlar', 'barışçıl cikletler', 'corydoras'],
    uyumsuzGruplar: ['uzun yüzgeçli balıklar', 'agresif türler'],
    ozelUyarilar: ['Erkekler birbirine saldırabilir', 'Uzun yüzgeçleri ısırabilir'],
    davranisNotu: 'Erkekler arası kavga yaygın. Tek erkek önerilir.'
  },
  
  'endler': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 3,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '2E:4D',
    erkekOran: 0.33,
    yasayisKatmani: 'üst',
    aktiviteSeviyesi: 9,
    uyumluGruplar: ['küçük barışçıl türler', 'karides', 'nano balıklar'],
    uyumsuzGruplar: ['büyük balıklar', 'yırtıcılar'],
    ozelUyarilar: ['Çok küçük, büyük balıklar tarafından yenir', 'Lepistes ile melezlenebilir'],
    davranisNotu: 'Çok barışçıl nano balık. Sadece küçük türlerle.'
  },

  // ==================== MALAWİ CİKLETLERİ - MBUNA ====================
  'yellow-lab': {
    agresiflik: 4,
    bolgecilik: 5,
    yirticilik: 3,
    stresHassasiyeti: 3,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '1E:4D',
    erkekOran: 0.2,
    yasayisKatmani: 'orta-alt',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['barışçıl mbuna', 'peacock', 'hap', 'synodontis'],
    uyumsuzGruplar: ['benzer sarı renkli türler', 'çok agresif mbuna'],
    ozelUyarilar: ['En barışçıl Mbuna türlerinden', 'Peacock/Hap tankına eklenebilir'],
    davranisNotu: 'Mbuna içinde en barışçıl olanlardan. Karma tanklara uygun.'
  },
  
  'demasoni': {
    agresiflik: 9,
    bolgecilik: 9,
    yirticilik: 3,
    stresHassasiyeti: 3,
    suruIhtiyaci: 12,
    minGrup: 12,
    idealGrup: '3E:9D',
    erkekOran: 0.25,
    yasayisKatmani: 'orta-alt',
    aktiviteSeviyesi: 9,
    uyumluGruplar: ['diğer agresif mbuna'],
    uyumsuzGruplar: ['barışçıl türler', 'peacock', 'hap', 'benzer desenli türler'],
    ozelUyarilar: ['ÇOK AGRESİF!', 'Minimum 12 adet şart', 'Aşırı kalabalık gerekli'],
    davranisNotu: 'Çok agresif, sadece kendi türü ve agresif mbuna ile. 12+ adet zorunlu!'
  },
  
  'zebra': {
    agresiflik: 7,
    bolgecilik: 7,
    yirticilik: 3,
    stresHassasiyeti: 3,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '1E:5D',
    erkekOran: 0.17,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['mbuna', 'synodontis'],
    uyumsuzGruplar: ['peacock', 'hap', 'barışçıl türler'],
    ozelUyarilar: ['Agresif mbuna', 'Sadece mbuna tankına'],
    davranisNotu: 'Tipik agresif Mbuna davranışı.'
  },
  
  'auratus': {
    agresiflik: 10,
    bolgecilik: 10,
    yirticilik: 4,
    stresHassasiyeti: 2,
    suruIhtiyaci: 8,
    minGrup: 8,
    idealGrup: '1E:7D',
    erkekOran: 0.125,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['çok agresif mbuna'],
    uyumsuzGruplar: ['barışçıl türler', 'peacock', 'hap', 'hemen hemen her şey'],
    ozelUyarilar: ['EN AGRESİF MBUNA!', 'Genellikle önerilmez', 'Tank arkadaşlarını öldürebilir'],
    davranisNotu: 'Aşırı agresif, çoğu hobici için uygun değil. SADECE TEK ERKEK!'
  },
  
  'acei': {
    agresiflik: 4,
    bolgecilik: 3,
    yirticilik: 2,
    stresHassasiyeti: 4,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '2E:4D',
    erkekOran: 0.33,
    yasayisKatmani: 'üst-orta',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['barışçıl mbuna', 'peacock', 'hap', 'synodontis'],
    uyumsuzGruplar: ['çok agresif mbuna'],
    ozelUyarilar: ['Barışçıl Mbuna', 'Peacock/Hap tankına uygun'],
    davranisNotu: 'Yellow Lab gibi barışçıl. Karma tanklara ideal.'
  },
  
  'socolofi': {
    agresiflik: 6,
    bolgecilik: 6,
    yirticilik: 3,
    stresHassasiyeti: 3,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '1E:5D',
    erkekOran: 0.17,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['mbuna'],
    uyumsuzGruplar: ['benzer mavi türler', 'peacock', 'barışçıl türler'],
    ozelUyarilar: ['Orta agresif mbuna'],
    davranisNotu: 'Tipik mbuna, sadece mbuna tankına.'
  },
  
  'rusty': {
    agresiflik: 3,
    bolgecilik: 4,
    yirticilik: 2,
    stresHassasiyeti: 4,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '2E:4D',
    erkekOran: 0.33,
    yasayisKatmani: 'orta-alt',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['barışçıl mbuna', 'peacock', 'hap'],
    uyumsuzGruplar: ['çok agresif türler'],
    ozelUyarilar: ['Barışçıl mbuna', 'Peacock tankına uygun'],
    davranisNotu: 'En barışçıl Mbuna türlerinden.'
  },
  
  'kenyi': {
    agresiflik: 8,
    bolgecilik: 8,
    yirticilik: 3,
    stresHassasiyeti: 2,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '1E:5D',
    erkekOran: 0.17,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['agresif mbuna'],
    uyumsuzGruplar: ['barışçıl türler', 'peacock', 'hap'],
    ozelUyarilar: ['Agresif mbuna', 'Tek erkek şart'],
    davranisNotu: 'Agresif, sadece mbuna tankı için.'
  },
  
  'bumblebee': {
    agresiflik: 8,
    bolgecilik: 8,
    yirticilik: 5,
    stresHassasiyeti: 3,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E:0D veya 1E:3D',
    erkekOran: 0.25,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['büyük agresif cikletler'],
    uyumsuzGruplar: ['küçük balıklar', 'barışçıl türler', 'peacock'],
    ozelUyarilar: ['Aşırı büyür (20cm+)', 'Küçük balıkları yer', 'Çok agresif'],
    davranisNotu: 'Büyük ve agresif. Deneyimli hobiciler için.'
  },
  
  'saulosi': {
    agresiflik: 5,
    bolgecilik: 5,
    yirticilik: 2,
    stresHassasiyeti: 4,
    suruIhtiyaci: 8,
    minGrup: 8,
    idealGrup: '2E:6D',
    erkekOran: 0.25,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['barışçıl mbuna', 'peacock'],
    uyumsuzGruplar: ['çok agresif türler'],
    ozelUyarilar: ['Erkek mavi, dişi sarı - iki renk bir tür!', 'Nispeten barışçıl'],
    davranisNotu: 'Orta agresif, karma tanklara uygun olabilir.'
  },

  // ==================== MALAWİ CİKLETLERİ - PEACOCK ====================
  'german-red': {
    agresiflik: 3,
    bolgecilik: 4,
    yirticilik: 3,
    stresHassasiyeti: 8,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E:0D veya 1E:3D',
    erkekOran: 1,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['diğer peacock', 'hap', 'barışçıl mbuna'],
    uyumsuzGruplar: ['agresif mbuna', 'benzer kırmızı türler'],
    ozelUyarilar: ['Çok çekingen', 'Agresif türlerle strese girer', 'Rengini kaybedebilir'],
    davranisNotu: 'Çekingen peacock. Sakin tanklar için.'
  },
  
  'ob-peacock': {
    agresiflik: 5,
    bolgecilik: 5,
    yirticilik: 3,
    stresHassasiyeti: 5,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E',
    erkekOran: 1,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['peacock', 'hap', 'barışçıl mbuna'],
    uyumsuzGruplar: ['agresif mbuna'],
    ozelUyarilar: ['Melez tür', 'Daha dayanıklı'],
    davranisNotu: 'Hibrit, diğer peacocklardan daha sert.'
  },
  
  'eureka-red': {
    agresiflik: 5,
    bolgecilik: 5,
    yirticilik: 3,
    stresHassasiyeti: 5,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E:3D',
    erkekOran: 0.25,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['peacock', 'hap', 'barışçıl mbuna'],
    uyumsuzGruplar: ['agresif mbuna', 'benzer kırmızı türler'],
    ozelUyarilar: ['German Red\'den daha cesur'],
    davranisNotu: 'Orta seviye peacock, iyi renklenir.'
  },
  
  'yellow-benga': {
    agresiflik: 3,
    bolgecilik: 4,
    yirticilik: 3,
    stresHassasiyeti: 7,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E:3D',
    erkekOran: 0.25,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['peacock', 'hap'],
    uyumsuzGruplar: ['mbuna', 'agresif türler'],
    ozelUyarilar: ['Çekingen', 'Sadece sakin tanklarda renklenir'],
    davranisNotu: 'Hassas, sadece peacock/hap tankı için.'
  },

  // ==================== MALAWİ CİKLETLERİ - HAP ====================
  'taiwan-reef': {
    agresiflik: 6,
    bolgecilik: 6,
    yirticilik: 4,
    stresHassasiyeti: 4,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E:2D',
    erkekOran: 0.33,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['hap', 'peacock', 'barışçıl mbuna'],
    uyumsuzGruplar: ['çok agresif türler'],
    ozelUyarilar: ['Dominant olabilir', 'Güzel renkler'],
    davranisNotu: 'Orta agresif hap, tankın patronu olabilir.'
  },
  
  'venustus': {
    agresiflik: 7,
    bolgecilik: 7,
    yirticilik: 8,
    stresHassasiyeti: 3,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E:2D',
    erkekOran: 0.33,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['büyük hap', 'büyük peacock'],
    uyumsuzGruplar: ['küçük balıklar', 'mbuna', 'peacock (küçük)'],
    ozelUyarilar: ['YIRTICI!', '25cm+ büyür', 'Küçük balıkları yer'],
    davranisNotu: 'Predator hap, sadece büyük türlerle.'
  },
  
  'electric-blue-ahli': {
    agresiflik: 6,
    bolgecilik: 7,
    yirticilik: 6,
    stresHassasiyeti: 4,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E:2D',
    erkekOran: 0.33,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['hap', 'büyük peacock'],
    uyumsuzGruplar: ['küçük balıklar', 'benzer mavi türler'],
    ozelUyarilar: ['Yırtıcı', 'Benzer türlere agresif'],
    davranisNotu: 'Yırtıcı hap, küçük balıkları yer.'
  },
  
  'moori': {
    agresiflik: 4,
    bolgecilik: 4,
    yirticilik: 3,
    stresHassasiyeti: 5,
    suruIhtiyaci: 3,
    minGrup: 3,
    idealGrup: '1E:2D',
    erkekOran: 0.33,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['hap', 'peacock', 'barışçıl mbuna'],
    uyumsuzGruplar: ['çok agresif türler'],
    ozelUyarilar: ['Delfin kafa', 'Barışçıl hap'],
    davranisNotu: 'Barışçıl hap, karma tanklara uygun.'
  },

  // ==================== AMERİKA CİKLETLERİ ====================
  'oscar': {
    agresiflik: 7,
    bolgecilik: 8,
    yirticilik: 9,
    stresHassasiyeti: 3,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'Tek veya çift',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['büyük cikletler', 'büyük vatoz', 'büyük kedi balıkları'],
    uyumsuzGruplar: ['küçük balıklar', 'barışçıl türler', 'yavaş balıklar'],
    ozelUyarilar: ['35cm+ büyür!', 'YIRTICI - Küçük her şeyi yer', 'Min 300L tank', 'Çok zeki'],
    davranisNotu: 'Yırtıcı dev. Ağzına sığan her şeyi yer. Çok zeki ve sahiplerine bağlanır.'
  },
  
  'severum': {
    agresiflik: 5,
    bolgecilik: 6,
    yirticilik: 4,
    stresHassasiyeti: 4,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'Tek veya çift',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['orta boy cikletler', 'büyük tetralar', 'vatoz'],
    uyumsuzGruplar: ['küçük balıklar', 'çok agresif türler'],
    ozelUyarilar: ['20cm büyür', 'Nispeten barışçıl SA ciklet'],
    davranisNotu: 'Amerika cikletleri içinde nispeten sakin.'
  },
  
  'ates-agiz': {
    agresiflik: 5,
    bolgecilik: 6,
    yirticilik: 5,
    stresHassasiyeti: 4,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'Tek veya çift',
    erkekOran: 0.5,
    yasayisKatmani: 'orta-alt',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['orta boy cikletler', 'büyük tetralar'],
    uyumsuzGruplar: ['küçük balıklar'],
    ozelUyarilar: ['Nispeten barışçıl'],
    davranisNotu: 'Orta agresif, karma tanklara uygun olabilir.'
  },
  
  'texas': {
    agresiflik: 9,
    bolgecilik: 9,
    yirticilik: 7,
    stresHassasiyeti: 2,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'TEK BALIK',
    erkekOran: 1,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['sadece büyük agresif türler'],
    uyumsuzGruplar: ['hemen hemen her şey'],
    ozelUyarilar: ['AŞIRI AGRESİF!', '30cm büyür', 'Genellikle tek bakılmalı'],
    davranisNotu: 'Çok agresif, tank arkadaşlarını öldürebilir.'
  },
  
  'jack-dempsey': {
    agresiflik: 8,
    bolgecilik: 8,
    yirticilik: 6,
    stresHassasiyeti: 3,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'Tek veya çift',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['büyük cikletler', 'büyük vatoz'],
    uyumsuzGruplar: ['küçük balıklar', 'barışçıl türler'],
    ozelUyarilar: ['Agresif', '25cm büyür'],
    davranisNotu: 'Agresif SA ciklet, deneyimli hobiciler için.'
  },
  
  'convict': {
    agresiflik: 8,
    bolgecilik: 9,
    yirticilik: 4,
    stresHassasiyeti: 2,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'Tek veya çift',
    erkekOran: 0.5,
    yasayisKatmani: 'orta-alt',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['orta boy agresif cikletler'],
    uyumsuzGruplar: ['barışçıl türler', 'küçük balıklar'],
    ozelUyarilar: ['Küçük ama ÇOK agresif!', 'Özellikle üreme döneminde tehlikeli'],
    davranisNotu: 'Boyuna göre çok agresif. Üreme döneminde tank arkadaşlarına saldırır.'
  },
  
  'discus': {
    agresiflik: 2,
    bolgecilik: 3,
    yirticilik: 2,
    stresHassasiyeti: 10,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 4,
    uyumluGruplar: ['cardinal tetra', 'corydoras sterbai', 'barışçıl türler'],
    uyumsuzGruplar: ['agresif türler', 'hızlı yiyici türler', 'parametre farklı türler'],
    ozelUyarilar: ['ÇOK HASSAS!', 'Yüksek sıcaklık (28-30°C)', 'Yumuşak asidik su', 'Pahalı'],
    davranisNotu: 'Akvaryum kralı ama çok hassas. Sadece deneyimliler için.'
  },
  
  'melek': {
    agresiflik: 5,
    bolgecilik: 6,
    yirticilik: 5,
    stresHassasiyeti: 5,
    suruIhtiyaci: 4,
    minGrup: 4,
    idealGrup: '4-6 adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta-üst',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['orta boy tetralar', 'corydoras', 'barışçıl türler'],
    uyumsuzGruplar: ['neon tetra (yenir)', 'çok küçük balıklar', 'yüzgeç düşkünü türler'],
    ozelUyarilar: ['Yetişkin melek küçük neonları yer!', 'Uzun yüzgeçler saldırıya açık'],
    davranisNotu: 'Zarif ama yırtıcı yanı var. Küçük tetraları yiyebilir.'
  },

  // ==================== CÜCE CİKLETLER ====================
  'ram': {
    agresiflik: 3,
    bolgecilik: 4,
    yirticilik: 2,
    stresHassasiyeti: 8,
    suruIhtiyaci: 2,
    minGrup: 2,
    idealGrup: '1E:1D',
    erkekOran: 0.5,
    yasayisKatmani: 'alt-orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['küçük tetralar', 'corydoras', 'barışçıl türler'],
    uyumsuzGruplar: ['agresif türler', 'soğuk su balıkları'],
    ozelUyarilar: ['Hassas', 'Sıcak su sever (27-30°C)', 'Yumuşak asidik su'],
    davranisNotu: 'Güzel ama hassas cüce ciklet.'
  },
  
  'apistogramma': {
    agresiflik: 4,
    bolgecilik: 6,
    yirticilik: 2,
    stresHassasiyeti: 6,
    suruIhtiyaci: 2,
    minGrup: 2,
    idealGrup: '1E:2D',
    erkekOran: 0.33,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['küçük tetralar', 'corydoras', 'otocinclus'],
    uyumsuzGruplar: ['diğer dip balıkları', 'agresif türler'],
    ozelUyarilar: ['Bölgeci ama küçük', 'Mağara lazım'],
    davranisNotu: 'Küçük ama bölgeci. Diğer dip balıklarıyla dikkat.'
  },
  
  'kribensis': {
    agresiflik: 5,
    bolgecilik: 7,
    yirticilik: 3,
    stresHassasiyeti: 3,
    suruIhtiyaci: 2,
    minGrup: 2,
    idealGrup: '1E:1D',
    erkekOran: 0.5,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['orta katman balıkları', 'büyük tetralar'],
    uyumsuzGruplar: ['diğer dip balıkları', 'küçük balıklar (üreme döneminde)'],
    ozelUyarilar: ['Üreme döneminde çok agresif', 'Mağara koruması'],
    davranisNotu: 'Dayanıklı ama üreme döneminde dikkat.'
  },

  // ==================== LABİRENTLİLER ====================
  'betta': {
    agresiflik: 8,
    bolgecilik: 9,
    yirticilik: 3,
    stresHassasiyeti: 5,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'TEK ERKEK',
    erkekOran: 1,
    yasayisKatmani: 'üst',
    aktiviteSeviyesi: 4,
    uyumluGruplar: ['corydoras', 'otocinclus', 'karides (dikkatli)'],
    uyumsuzGruplar: ['diğer betta erkekleri', 'uzun yüzgeçli balıklar', 'yüzgeç düşkünleri', 'parlak renkli balıklar'],
    ozelUyarilar: ['ERKEKLER BİRLİKTE OLMAZ!', 'Lepistes ile OLMAZ (yüzgeç benzerliği)', 'Tek erkek kuralı'],
    davranisNotu: 'Erkekler arası ölümcül kavga. Tek erkek şart.'
  },
  
  'gurami-mavicuce': {
    agresiflik: 2,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 6,
    suruIhtiyaci: 4,
    minGrup: 4,
    idealGrup: '2E:4D',
    erkekOran: 0.33,
    yasayisKatmani: 'üst-orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['barışçıl türler', 'tetralar', 'corydoras'],
    uyumsuzGruplar: ['agresif türler'],
    ozelUyarilar: ['Hassas', 'Çok barışçıl'],
    davranisNotu: 'Çok barışçıl gurami.'
  },
  
  'gurami-inci': {
    agresiflik: 3,
    bolgecilik: 4,
    yirticilik: 2,
    stresHassasiyeti: 5,
    suruIhtiyaci: 3,
    minGrup: 3,
    idealGrup: '1E:2D',
    erkekOran: 0.33,
    yasayisKatmani: 'üst-orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['barışçıl türler', 'tetralar', 'corydoras'],
    uyumsuzGruplar: ['agresif türler', 'diğer gurami erkekleri'],
    ozelUyarilar: ['Erkekler arası hafif rekabet'],
    davranisNotu: 'Güzel, nispeten barışçıl.'
  },
  
  'gurami-altin': {
    agresiflik: 5,
    bolgecilik: 5,
    yirticilik: 3,
    stresHassasiyeti: 4,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1E:2D',
    erkekOran: 0.33,
    yasayisKatmani: 'üst-orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['orta boy barışçıl türler'],
    uyumsuzGruplar: ['diğer gurami erkekleri', 'küçük balıklar'],
    ozelUyarilar: ['15cm büyür', 'Erkekler kavga eder'],
    davranisNotu: 'Daha büyük ve hafif agresif gurami.'
  },
  
  'gurami-dev': {
    agresiflik: 6,
    bolgecilik: 7,
    yirticilik: 5,
    stresHassasiyeti: 3,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'TEK veya çift',
    erkekOran: 0.5,
    yasayisKatmani: 'üst-orta',
    aktiviteSeviyesi: 4,
    uyumluGruplar: ['büyük barışçıl balıklar'],
    uyumsuzGruplar: ['küçük balıklar', 'diğer gurami'],
    ozelUyarilar: ['60cm+ büyür!', 'DEV akvaryum lazım'],
    davranisNotu: 'Dev balık, çok büyük tank gerekli.'
  },

  // ==================== TETRALAR ====================
  'neon-tetra': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 5,
    suruIhtiyaci: 10,
    minGrup: 10,
    idealGrup: '10+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['küçük barışçıl türler', 'corydoras', 'otocinclus', 'karides'],
    uyumsuzGruplar: ['büyük balıklar', 'yırtıcılar', 'melek (yetişkin)'],
    ozelUyarilar: ['Sürü halinde bakılmalı', 'Yetişkin melek onları yer!', 'Hassas'],
    davranisNotu: 'Klasik sürü balığı. 10+ adet şart.'
  },
  
  'cardinal-tetra': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 6,
    suruIhtiyaci: 10,
    minGrup: 10,
    idealGrup: '10+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['discus', 'küçük barışçıl türler', 'corydoras'],
    uyumsuzGruplar: ['büyük balıklar', 'yırtıcılar'],
    ozelUyarilar: ['Neondan daha hassas', 'Discus tankı için ideal'],
    davranisNotu: 'Neon tetraya benzer ama daha parlak ve hassas.'
  },
  
  'rummy-nose': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 7,
    suruIhtiyaci: 10,
    minGrup: 10,
    idealGrup: '10+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['discus', 'küçük barışçıl türler', 'corydoras'],
    uyumsuzGruplar: ['büyük balıklar', 'yırtıcılar'],
    ozelUyarilar: ['Su kalitesi göstergesi', 'Kırmızı burun solgunsa stresli'],
    davranisNotu: 'Mükemmel sürü davranışı. Su kalitesi göstergesi.'
  },
  
  'serpae-tetra': {
    agresiflik: 5,
    bolgecilik: 3,
    yirticilik: 3,
    stresHassasiyeti: 3,
    suruIhtiyaci: 8,
    minGrup: 8,
    idealGrup: '8+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['hızlı balıklar', 'benzer boyda türler'],
    uyumsuzGruplar: ['uzun yüzgeçli balıklar', 'yavaş balıklar', 'melek', 'betta'],
    ozelUyarilar: ['YÜZGEÇLERİ ISIRIR!', 'Betta, melek ile OLMAZ'],
    davranisNotu: 'Yüzgeç düşkünü! Uzun yüzgeçli balıklardan uzak tutun.'
  },
  
  'buenos-aires': {
    agresiflik: 4,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 2,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['dayanıklı türler', 'orta boy balıklar'],
    uyumsuzGruplar: ['bitkiler', 'yavaş balıklar'],
    ozelUyarilar: ['BİTKİ YER!', 'Bitkili akvaryum için UYGUN DEĞİL'],
    davranisNotu: 'Dayanıklı ama bitki düşmanı.'
  },
  
  'congo-tetra': {
    agresiflik: 2,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 5,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['barışçıl orta boy türler', 'corydoras'],
    uyumsuzGruplar: ['yüzgeç düşkünü türler', 'agresif türler'],
    ozelUyarilar: ['Büyük tetra (8cm)', 'Güzel yüzgeçler'],
    davranisNotu: 'Büyük, zarif, barışçıl tetra.'
  },
  
  'black-skirt': {
    agresiflik: 3,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 3,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['barışçıl türler', 'corydoras'],
    uyumsuzGruplar: ['uzun yüzgeçli türler'],
    ozelUyarilar: ['Hafif yüzgeç düşkünü olabilir'],
    davranisNotu: 'Dayanıklı, iyi başlangıç tetrası.'
  },

  // ==================== SAZANGİLLER ====================
  'tiger-barb': {
    agresiflik: 6,
    bolgecilik: 3,
    yirticilik: 3,
    stresHassasiyeti: 2,
    suruIhtiyaci: 8,
    minGrup: 8,
    idealGrup: '8+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 9,
    uyumluGruplar: ['diğer barbus', 'hızlı dayanıklı türler'],
    uyumsuzGruplar: ['uzun yüzgeçli balıklar', 'melek', 'betta', 'gurami', 'lepistes'],
    ozelUyarilar: ['KÖTÜ ŞÖHRET: YÜZGEÇ ISIRICI!', 'Melek, betta, gurami ile KESİNLİKLE OLMAZ!', '8+ adet şart'],
    davranisNotu: 'Yüzgeç ısırıcı olarak ünlü. Sadece kendi türüyle veya hızlı balıklarla.'
  },
  
  'cherry-barb': {
    agresiflik: 2,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 4,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '3E:5D',
    erkekOran: 0.375,
    yasayisKatmani: 'orta-alt',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['barışçıl türler', 'tetralar', 'corydoras'],
    uyumsuzGruplar: ['agresif türler'],
    ozelUyarilar: ['Barışçıl barbus', 'Erkekler parlak kırmızı'],
    davranisNotu: 'Barbus ailesinin barışçıl üyesi.'
  },
  
  'odessa-barb': {
    agresiflik: 3,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 3,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['barışçıl türler', 'diğer barbus'],
    uyumsuzGruplar: ['uzun yüzgeçli türler'],
    ozelUyarilar: ['Tiger barb kadar agresif değil'],
    davranisNotu: 'Orta huylu barbus.'
  },
  
  'tinfoil-barb': {
    agresiflik: 3,
    bolgecilik: 2,
    yirticilik: 3,
    stresHassasiyeti: 2,
    suruIhtiyaci: 5,
    minGrup: 5,
    idealGrup: '5+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['büyük barışçıl türler'],
    uyumsuzGruplar: ['küçük balıklar'],
    ozelUyarilar: ['35cm BÜYÜR!', 'Çok büyük tank lazım (500L+)'],
    davranisNotu: 'Dev barbus. Çoğu hobici için uygun değil.'
  },
  
  'zebra-danio': {
    agresiflik: 2,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 2,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'üst',
    aktiviteSeviyesi: 10,
    uyumluGruplar: ['barışçıl türler', 'topluluk balıkları'],
    uyumsuzGruplar: ['yavaş balıklar', 'uzun yüzgeçli türler'],
    ozelUyarilar: ['ÇOK HIZLI', 'Yavaş balıkları strese sokabilir'],
    davranisNotu: 'Çok dayanıklı ve hızlı. Yavaş balıkları rahatsız edebilir.'
  },
  
  'giant-danio': {
    agresiflik: 3,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 2,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'üst-orta',
    aktiviteSeviyesi: 9,
    uyumluGruplar: ['orta-büyük barışçıl türler'],
    uyumsuzGruplar: ['küçük balıklar', 'yavaş türler'],
    ozelUyarilar: ['10cm büyür', 'Hızlı yüzücü'],
    davranisNotu: 'Büyük danio, hızlı ve aktif.'
  },

  // ==================== KORİDORAS ====================
  'corydoras-bronze': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 3,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['hemen hemen her barışçıl tür'],
    uyumsuzGruplar: ['agresif dip balıkları', 'keskin substrat'],
    ozelUyarilar: ['Yumuşak kum tercih eder', 'Topluluk tankı için ideal'],
    davranisNotu: 'Mükemmel topluluk balığı. Dip temizlikçisi.'
  },
  
  'corydoras-panda': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 5,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['barışçıl türler'],
    uyumsuzGruplar: ['agresif türler', 'sıcak su balıkları'],
    ozelUyarilar: ['Serin su sever', 'Bronze kadar dayanıklı değil'],
    davranisNotu: 'Sevimli ama biraz hassas cory.'
  },
  
  'corydoras-sterbai': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 4,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['discus', 'sıcak su balıkları', 'barışçıl türler'],
    uyumsuzGruplar: ['agresif türler'],
    ozelUyarilar: ['Sıcak suya dayanıklı', 'Discus tankı için ideal'],
    davranisNotu: 'Sıcak su toleransı sayesinde discus ile gider.'
  },
  
  'corydoras-pygmy': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 6,
    suruIhtiyaci: 10,
    minGrup: 10,
    idealGrup: '10+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'alt-orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['küçük barışçıl türler', 'karides'],
    uyumsuzGruplar: ['büyük balıklar'],
    ozelUyarilar: ['ÇOK KÜÇÜK (2cm)', 'Büyük balıklar tarafından yenebilir'],
    davranisNotu: 'Nano cory. Sadece küçük balıklarla.'
  },

  // ==================== VATOZ & KATFİSH ====================
  'plecos-common': {
    agresiflik: 3,
    bolgecilik: 5,
    yirticilik: 2,
    stresHassasiyeti: 2,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: 'TEK',
    erkekOran: 1,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 3,
    uyumluGruplar: ['çoğu tür'],
    uyumsuzGruplar: ['diğer pleco', 'yassı balıklar (disk yapışabilir)'],
    ozelUyarilar: ['45cm BÜYÜR!', 'Discus a yapışabilir', 'Çok pisletir'],
    davranisNotu: 'Dev olur, çoğu akvaryum için uygun değil.'
  },
  
  'bristlenose': {
    agresiflik: 2,
    bolgecilik: 4,
    yirticilik: 1,
    stresHassasiyeti: 3,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1-2',
    erkekOran: 0.5,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 4,
    uyumluGruplar: ['çoğu barışçıl tür'],
    uyumsuzGruplar: ['diğer bristlenose erkekleri'],
    ozelUyarilar: ['Max 15cm', 'Common pleco alternatifi', 'Erkekler kavga edebilir'],
    davranisNotu: 'İdeal topluluk vatoz. Boyutu makul.'
  },
  
  'otocinclus': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 8,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'alt-cam',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['barışçıl türler', 'bitkili tanklar'],
    uyumsuzGruplar: ['agresif türler'],
    ozelUyarilar: ['Hassas', 'Yosun dışında beslenmesi zor', 'Açlıktan ölebilir'],
    davranisNotu: 'Harika yosun yiyici ama hassas. Tecrübe gerektirir.'
  },
  
  'synodontis': {
    agresiflik: 3,
    bolgecilik: 4,
    yirticilik: 3,
    stresHassasiyeti: 3,
    suruIhtiyaci: 1,
    minGrup: 1,
    idealGrup: '1-3',
    erkekOran: 0.5,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 4,
    uyumluGruplar: ['Afrika cikletleri', 'orta-büyük balıklar'],
    uyumsuzGruplar: ['küçük balıklar'],
    ozelUyarilar: ['Gece aktif', 'Afrika tankları için ideal'],
    davranisNotu: 'Malawi/Tanganyika tankları için ideal eşlikçi.'
  },
  
  'clown-loach': {
    agresiflik: 2,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 6,
    suruIhtiyaci: 5,
    minGrup: 5,
    idealGrup: '5+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'alt',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['barışçıl orta-büyük türler'],
    uyumsuzGruplar: ['agresif türler', 'küçük tanklar'],
    ozelUyarilar: ['30cm BÜYÜR!', 'Hastalığa yatkın', 'Sürü halinde bakılmalı'],
    davranisNotu: 'Sevimli ama dev olur. 400L+ tank gerekli.'
  },

  // ==================== GÖKKUŞAĞI BALIKLARI ====================
  'boesemani': {
    agresiflik: 2,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 4,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '3E:3D',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['diğer gökkuşağı', 'barışçıl türler', 'corydoras'],
    uyumsuzGruplar: ['çok yavaş türler'],
    ozelUyarilar: ['Hızlı yüzücü', 'Uzun tank tercih eder'],
    davranisNotu: 'Harika renk, barışçıl sürü balığı.'
  },
  
  'turquoise': {
    agresiflik: 2,
    bolgecilik: 2,
    yirticilik: 2,
    stresHassasiyeti: 4,
    suruIhtiyaci: 6,
    minGrup: 6,
    idealGrup: '6+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['diğer gökkuşağı', 'barışçıl türler'],
    uyumsuzGruplar: ['çok yavaş türler'],
    ozelUyarilar: ['Hızlı', 'Geniş tank lazım'],
    davranisNotu: 'Aktif, renkli gökkuşağı.'
  },

  // ==================== JAPON BALIKLARI ====================
  'japon-fantail': {
    agresiflik: 2,
    bolgecilik: 1,
    yirticilik: 2,
    stresHassasiyeti: 4,
    suruIhtiyaci: 2,
    minGrup: 2,
    idealGrup: '2+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 5,
    uyumluGruplar: ['diğer japon balıkları', 'soğuk su balıkları'],
    uyumsuzGruplar: ['tropikal balıklar', 'hızlı yüzgeçli japonlar', 'yırtıcılar'],
    ozelUyarilar: ['SOĞUK SU BALIGI!', 'Tropikal ile OLMAZ!', 'Güçlü filtrasyon şart'],
    davranisNotu: 'Barışçıl ama sadece soğuk su tankına.'
  },
  
  'japon-oranda': {
    agresiflik: 2,
    bolgecilik: 1,
    yirticilik: 2,
    stresHassasiyeti: 5,
    suruIhtiyaci: 2,
    minGrup: 2,
    idealGrup: '2+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'orta',
    aktiviteSeviyesi: 4,
    uyumluGruplar: ['yavaş yüzgeçli japonlar'],
    uyumsuzGruplar: ['hızlı yüzgeçli japonlar', 'tropikal balıklar'],
    ozelUyarilar: ['Wen (kafa büyümesi) hassas', 'Hızlı japonlarla yem alamaz'],
    davranisNotu: 'Yavaş, sadece benzer yavaş japonlarla.'
  },
  
  'japon-commet': {
    agresiflik: 2,
    bolgecilik: 1,
    yirticilik: 3,
    stresHassasiyeti: 2,
    suruIhtiyaci: 2,
    minGrup: 2,
    idealGrup: '2+ adet',
    erkekOran: 0.5,
    yasayisKatmani: 'tüm katmanlar',
    aktiviteSeviyesi: 8,
    uyumluGruplar: ['hızlı yüzgeçli japonlar', 'havuz balıkları'],
    uyumsuzGruplar: ['yavaş yüzgeçli japonlar', 'tropikal balıklar'],
    ozelUyarilar: ['HAVUZ BALIGI!', '30cm+ büyür', 'Yavaş japonların yemini çalar'],
    davranisNotu: 'Hızlı, büyük. Havuz için daha uygun.'
  },

  // ==================== KARİDESLER ====================
  'cherry-shrimp': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 6,
    suruIhtiyaci: 10,
    minGrup: 10,
    idealGrup: '10+ adet',
    erkekOran: 0.3,
    yasayisKatmani: 'alt-cam',
    aktiviteSeviyesi: 6,
    uyumluGruplar: ['nano balıklar', 'otocinclus', 'küçük tetralar'],
    uyumsuzGruplar: ['hemen hemen tüm balıklar (yenir)'],
    ozelUyarilar: ['BALIKLAR TARAFINDAN YENİR!', 'Türe özgü tank önerilir'],
    davranisNotu: 'Çoğu balık tarafından yem olarak görülür.'
  },
  
  'amano-shrimp': {
    agresiflik: 1,
    bolgecilik: 1,
    yirticilik: 1,
    stresHassasiyeti: 4,
    suruIhtiyaci: 5,
    minGrup: 5,
    idealGrup: '5+ adet',
    erkekOran: 0.4,
    yasayisKatmani: 'alt-cam',
    aktiviteSeviyesi: 7,
    uyumluGruplar: ['küçük-orta barışçıl balıklar'],
    uyumsuzGruplar: ['büyük balıklar', 'yırtıcılar'],
    ozelUyarilar: ['Cherry den büyük', 'Yosun yeme şampiyonu'],
    davranisNotu: 'Harika yosun temizleyici. Büyük balıklarla dikkat.'
  }
};

// ==================== UYUMLULUK KONTROL FONKSİYONLARI ====================

export function uyumlulukKontrol(balik1Id, balik2Id) {
  const b1 = balikDavranisVeritabani[balik1Id];
  const b2 = balikDavranisVeritabani[balik2Id];
  
  if (!b1 || !b2) {
    return { uyumlu: null, seviye: 'bilinmiyor', uyarilar: ['Balık verisi bulunamadı'] };
  }
  
  const uyarilar = [];
  let skor = 100;
  
  // Agresiflik farkı kontrolü
  const agresiflikFarki = Math.abs(b1.agresiflik - b2.agresiflik);
  if (agresiflikFarki >= 5) {
    uyarilar.push('Agresiflik farkı çok yüksek - zayıf olan zarar görebilir');
    skor -= 30;
  } else if (agresiflikFarki >= 3) {
    uyarilar.push('Agresiflik farkı var - dikkatli olun');
    skor -= 15;
  }
  
  // Yırtıcılık kontrolü
  if (b1.yirticilik >= 7 || b2.yirticilik >= 7) {
    if (b1.yirticilik >= 7 && b2.stresHassasiyeti >= 6) {
      uyarilar.push(`Yırtıcı tür hassas türü strese sokabilir`);
      skor -= 25;
    }
    if (b2.yirticilik >= 7 && b1.stresHassasiyeti >= 6) {
      uyarilar.push(`Yırtıcı tür hassas türü strese sokabilir`);
      skor -= 25;
    }
  }
  
  // Yaşayış katmanı çakışması
  if (b1.yasayisKatmani === b2.yasayisKatmani && 
      (b1.bolgecilik >= 7 || b2.bolgecilik >= 7)) {
    uyarilar.push('Aynı katmanda bölgeci iki tür - kavga riski');
    skor -= 20;
  }
  
  // Sonuç
  let seviye;
  if (skor >= 70) {
    seviye = 'uyumlu';
  } else if (skor >= 40) {
    seviye = 'dikkat';
  } else {
    seviye = 'uyumsuz';
  }
  
  return { uyumlu: skor >= 40, seviye, skor, uyarilar };
}

export function stokUyarilari(balikId, adet, erkek = 0, disi = 0) {
  const balik = balikDavranisVeritabani[balikId];
  if (!balik) return [];
  
  const uyarilar = [];
  
  if (balik.minGrup > 1 && adet < balik.minGrup) {
    uyarilar.push(`⚠️ Minimum ${balik.minGrup} adet önerilir (${adet} var) - Stres riski!`);
  }
  
  if (erkek > 0 && disi > 0 && balik.erkekOran) {
    const mevcutOran = erkek / (erkek + disi);
    if (mevcutOran > balik.erkekOran + 0.15) {
      uyarilar.push(`⚠️ Erkek fazla! Önerilen oran: ${balik.idealGrup}`);
    }
  }
  
  if (balik.idealGrup === 'TEK ERKEK' && erkek > 1) {
    uyarilar.push(`🔴 SADECE 1 ERKEK! Birden fazla erkek kavga eder!`);
  }
  
  return uyarilar;
}

export function tankRiskAnalizi(baliklar, tankLitre) {
  const sonuc = {
    toplamRisk: 0,
    riskSeviyesi: 'düşük',
    uyumlulukSorunlari: [],
    stokSorunlari: [],
    genelUyarilar: [],
    oneriler: []
  };
  
  for (let i = 0; i < baliklar.length; i++) {
    for (let j = i + 1; j < baliklar.length; j++) {
      const kontrol = uyumlulukKontrol(baliklar[i].balikId, baliklar[j].balikId);
      if (kontrol.seviye === 'uyumsuz') {
        sonuc.uyumlulukSorunlari.push({
          balik1: baliklar[i].balikId,
          balik2: baliklar[j].balikId,
          uyarilar: kontrol.uyarilar
        });
        sonuc.toplamRisk += 30;
      } else if (kontrol.seviye === 'dikkat') {
        sonuc.genelUyarilar.push(...kontrol.uyarilar);
        sonuc.toplamRisk += 10;
      }
    }
  }
  
  baliklar.forEach(b => {
    const uyarilar = stokUyarilari(b.balikId, b.adet, b.erkek, b.disi);
    if (uyarilar.length > 0) {
      sonuc.stokSorunlari.push({ balikId: b.balikId, uyarilar });
      sonuc.toplamRisk += uyarilar.length * 5;
    }
  });
  
  if (sonuc.toplamRisk >= 50) {
    sonuc.riskSeviyesi = 'yüksek';
  } else if (sonuc.toplamRisk >= 25) {
    sonuc.riskSeviyesi = 'orta';
  }
  
  return sonuc;
}

export default balikDavranisVeritabani;