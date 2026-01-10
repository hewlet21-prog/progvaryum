// BalikUyumluluk.jsx - PART 1: Grup Tanımları ve Balık Veritabanı
// Bu dosyayı Part 2 ve Part 3 ile birleştirin

import React, { useState } from 'react';
import './BalikUyumluluk.css';

// ==================== GRUP TANIMLARI ====================
const GRUP_ISIMLERI = {
  malawi: 'Malawi Cichlidleri',
  tanganyika: 'Tanganyika Cichlidleri',
  diger_afrika: 'Diğer Afrika Cichlidleri',
  amerikan_cichlid: 'Amerikan Cichlidleri',
  melek: 'Melek Balığı',
  barblar: 'Barblar',
  beta: 'Beta',
  copculer: 'Çöpçüler (Corydoras)',
  daniolar: 'Daniolar',
  discus: 'Discus',
  japon: 'Japon Balığı',
  gurami: 'Guramiler',
  lepistes: 'Lepistes',
  balta: 'Balta Balıkları',
  killifish: 'Killifishler',
  buyuk_kedi: 'Büyük Kedibalıkları',
  loachlar: 'Loachlar',
  moli: 'Moli',
  plati: 'Plati',
  vatozlar: 'Vatozlar',
  gokkusagi: 'Gökkuşağı Balıkları',
  rasbora: 'Rasboralar',
  kopekbaligi_kedi: 'Köpekbalığı Kedibalıkları',
  vantuzlu_kedi: 'Vantuzlu Kedibalıkları',
  kilickuyruk: 'Kılıçkuyruk',
  tetralar: 'Tetralar',
  diger_baliklar: 'Diğer Balıklar',
  omurgasizlar: 'Omurgasızlar',
  aci_su: 'Acı Su Balıkları',
  havuz: 'Havuz Balıkları',
  su_bitkileri: 'Su Bitkileri',
  cuce_cichlid: 'Cüce Cichlidler'
};

// ==================== BALIK VERİTABANI (150+ TÜR) ====================
const balikVeritabani = [
  // === CANLI DOĞURANLAR ===
  { id: 'lepistes', isim: 'Lepistes', grup: 'lepistes', aliases: ['guppy', 'guppi'] },
  { id: 'endler', isim: 'Endler', grup: 'lepistes', aliases: ['endler guppy'] },
  { id: 'moli', isim: 'Moli', grup: 'moli', aliases: ['molly', 'black molly', 'siyah moli'] },
  { id: 'balon_moli', isim: 'Balon Moli', grup: 'moli', aliases: ['balloon molly'] },
  { id: 'yelken_moli', isim: 'Yelken Kuyruklu Moli', grup: 'moli', aliases: ['sailfin molly'] },
  { id: 'plati', isim: 'Plati', grup: 'plati', aliases: ['platy'] },
  { id: 'mickey_plati', isim: 'Mickey Mouse Plati', grup: 'plati', aliases: ['mickey platy'] },
  { id: 'kilickuyruk', isim: 'Kılıçkuyruk', grup: 'kilickuyruk', aliases: ['swordtail'] },

  // === TETRALAR ===
  { id: 'neon', isim: 'Neon Tetra', grup: 'tetralar', aliases: ['neon', 'neon balığı'] },
  { id: 'kardinal', isim: 'Kardinal Tetra', grup: 'tetralar', aliases: ['cardinal'] },
  { id: 'yesil_neon', isim: 'Yeşil Neon', grup: 'tetralar', aliases: ['green neon'] },
  { id: 'ember', isim: 'Ember Tetra', grup: 'tetralar', aliases: ['ember', 'ateş tetra'] },
  { id: 'siyah_tetra', isim: 'Siyah Tetra', grup: 'tetralar', aliases: ['black tetra', 'black skirt'] },
  { id: 'siyah_neon', isim: 'Siyah Neon', grup: 'tetralar', aliases: ['black neon'] },
  { id: 'kirmizi_burun', isim: 'Kırmızı Burun Tetra', grup: 'tetralar', aliases: ['rummy nose'] },
  { id: 'kongo', isim: 'Kongo Tetra', grup: 'tetralar', aliases: ['congo'] },
  { id: 'imparator_tetra', isim: 'İmparator Tetra', grup: 'tetralar', aliases: ['emperor tetra'] },
  { id: 'penguen', isim: 'Penguen Tetra', grup: 'tetralar', aliases: ['penguin tetra'] },
  { id: 'serpae', isim: 'Serpae Tetra', grup: 'tetralar', aliases: ['serpae', 'jewel tetra'] },
  { id: 'limon_tetra', isim: 'Limon Tetra', grup: 'tetralar', aliases: ['lemon tetra'] },
  { id: 'elmas_tetra', isim: 'Elmas Tetra', grup: 'tetralar', aliases: ['diamond tetra'] },
  { id: 'siyah_fantom', isim: 'Siyah Fantom', grup: 'tetralar', aliases: ['black phantom'] },
  { id: 'kirmizi_fantom', isim: 'Kırmızı Fantom', grup: 'tetralar', aliases: ['red phantom'] },
  { id: 'piranha', isim: 'Piranha', grup: 'tetralar', aliases: ['pirana', 'piranya', 'kırmızı piranha'] },
  { id: 'silver_dolar', isim: 'Silver Dolar', grup: 'tetralar', aliases: ['gümüş dolar'] },
  { id: 'pacu', isim: 'Pacu', grup: 'tetralar', aliases: ['black pacu', 'red pacu'] },

  // === BARBLAR ===
  { id: 'kaplan_barb', isim: 'Kaplan Barb', grup: 'barblar', aliases: ['tiger barb', 'tetrazon', 'sumatra barb'] },
  { id: 'kiraz_barb', isim: 'Kiraz Barb', grup: 'barblar', aliases: ['cherry barb'] },
  { id: 'gul_barb', isim: 'Gül Barb', grup: 'barblar', aliases: ['rosy barb'] },
  { id: 'altin_barb', isim: 'Altın Barb', grup: 'barblar', aliases: ['gold barb'] },
  { id: 'denisoni', isim: 'Denisoni Barb', grup: 'barblar', aliases: ['torpedo barb', 'red flash'] },
  { id: 'tinfoil', isim: 'Tinfoil Barb', grup: 'barblar', aliases: ['tinfoil'] },
  { id: 'odessa', isim: 'Odessa Barb', grup: 'barblar', aliases: ['odessa'] },
  { id: 'labio', isim: 'Labio', grup: 'barblar', aliases: ['red tail shark', 'kırmızı kuyruklu köpekbalığı'] },
  { id: 'rainbow_shark', isim: 'Rainbow Shark', grup: 'barblar', aliases: ['frenatus', 'gökkuşağı köpekbalığı'] },
  { id: 'bala_shark', isim: 'Bala Shark', grup: 'barblar', aliases: ['silver shark', 'gümüş köpekbalığı'] },

  // === DANİOLAR & RASBORA ===
  { id: 'zebra_danio', isim: 'Zebra Danio', grup: 'daniolar', aliases: ['zebra', 'zebrafish'] },
  { id: 'leopar_danio', isim: 'Leopar Danio', grup: 'daniolar', aliases: ['leopard danio'] },
  { id: 'dev_danio', isim: 'Dev Danio', grup: 'daniolar', aliases: ['giant danio'] },
  { id: 'galaxy', isim: 'Galaxy Rasbora', grup: 'daniolar', aliases: ['celestial pearl danio', 'cpd'] },
  { id: 'glofish', isim: 'Glofish', grup: 'daniolar', aliases: ['glo danio'] },
  { id: 'harlequin', isim: 'Harlequin Rasbora', grup: 'rasbora', aliases: ['harlequin'] },
  { id: 'chili', isim: 'Chili Rasbora', grup: 'rasbora', aliases: ['mosquito rasbora'] },
  { id: 'scissortail', isim: 'Makaskuyruk Rasbora', grup: 'rasbora', aliases: ['scissortail'] },

  // === ÇÖPÇÜLER (CORYDORAS) ===
  { id: 'corydoras', isim: 'Corydoras', grup: 'copculer', aliases: ['cory', 'kory'] },
  { id: 'panda_cory', isim: 'Panda Cory', grup: 'copculer', aliases: ['panda corydoras'] },
  { id: 'sterbai', isim: 'Sterbai Cory', grup: 'copculer', aliases: ['sterbai'] },
  { id: 'julii', isim: 'Julii Cory', grup: 'copculer', aliases: ['leopar cory', 'trilineatus'] },
  { id: 'pigme_cory', isim: 'Pigme Cory', grup: 'copculer', aliases: ['pygmy cory'] },
  { id: 'bronz_cory', isim: 'Bronz Cory', grup: 'copculer', aliases: ['bronze cory', 'aeneus'] },
  { id: 'albino_cory', isim: 'Albino Cory', grup: 'copculer', aliases: ['albino corydoras'] },
  { id: 'adolfoi', isim: 'Adolfoi Cory', grup: 'copculer', aliases: ['adolfo cory'] },
  { id: 'synodontis', isim: 'Synodontis', grup: 'copculer', aliases: ['ters yüzen', 'upside down catfish'] },
  { id: 'petricola', isim: 'Petricola', grup: 'copculer', aliases: ['synodontis petricola'] },

  // === LOACHLAR ===
  { id: 'palyaco_loach', isim: 'Palyaço Loach', grup: 'loachlar', aliases: ['clown loach', 'makrakanta'] },
  { id: 'kuhli', isim: 'Kuhli Loach', grup: 'loachlar', aliases: ['kuhli', 'coolie loach'] },
  { id: 'yoyo', isim: 'Yoyo Loach', grup: 'loachlar', aliases: ['yoyo', 'pakistani loach'] },
  { id: 'zebra_loach', isim: 'Zebra Loach', grup: 'loachlar', aliases: ['striata'] },
  { id: 'dojo', isim: 'Dojo Loach', grup: 'loachlar', aliases: ['weather loach', 'hava durumu loach'] },
  { id: 'hillstream', isim: 'Hillstream Loach', grup: 'loachlar', aliases: ['butterfly loach', 'borneo sucker'] },

  // === LABİRENT BALIKLARI (BETA & GURAMİ) ===
  { id: 'betta', isim: 'Beta', grup: 'beta', aliases: ['betta', 'kavga balığı', 'siamese fighting fish'] },
  { id: 'cuce_gurami', isim: 'Cüce Gurami', grup: 'gurami', aliases: ['dwarf gourami'] },
  { id: 'inci_gurami', isim: 'İnci Gurami', grup: 'gurami', aliases: ['pearl gourami'] },
  { id: 'bal_gurami', isim: 'Bal Gurami', grup: 'gurami', aliases: ['honey gourami'] },
  { id: 'uc_nokta', isim: 'Üç Noktalı Gurami', grup: 'gurami', aliases: ['blue gourami', 'opaline', 'gold gourami'] },
  { id: 'ayisigi', isim: 'Ayışığı Gurami', grup: 'gurami', aliases: ['moonlight gourami'] },
  { id: 'opusen', isim: 'Öpüşen Gurami', grup: 'gurami', aliases: ['kissing gourami'] },
  { id: 'dev_gurami', isim: 'Dev Gurami', grup: 'gurami', aliases: ['giant gourami'] },
  { id: 'cennet', isim: 'Cennet Balığı', grup: 'gurami', aliases: ['paradise fish'] },
  { id: 'cikolata_gurami', isim: 'Çikolata Gurami', grup: 'gurami', aliases: ['chocolate gourami'] },

  // === MELEK & DISCUS ===
  { id: 'melek', isim: 'Melek Balığı', grup: 'melek', aliases: ['angelfish', 'angel'] },
  { id: 'altum', isim: 'Altum Melek', grup: 'melek', aliases: ['altum angel'] },
  { id: 'koi_melek', isim: 'Koi Melek', grup: 'melek', aliases: ['koi angel'] },
  { id: 'zebra_melek', isim: 'Zebra Melek', grup: 'melek', aliases: ['zebra angel'] },
  { id: 'siyah_melek', isim: 'Siyah Melek', grup: 'melek', aliases: ['black angel'] },
  { id: 'discus', isim: 'Discus', grup: 'discus', aliases: ['diskus'] },
  { id: 'blue_discus', isim: 'Blue Diamond Discus', grup: 'discus', aliases: ['cobalt discus'] },
  { id: 'red_discus', isim: 'Red Melon Discus', grup: 'discus', aliases: ['marlboro red'] },
  { id: 'turquoise_discus', isim: 'Turquoise Discus', grup: 'discus', aliases: ['turkuaz discus'] },
  { id: 'pigeon_discus', isim: 'Pigeon Blood Discus', grup: 'discus', aliases: ['pigeon discus'] }
];

// Part 2'de devam ediyor...
// BalikUyumluluk.jsx - PART 2: Balık Veritabanı Devamı + Uyumluluk Matrisi

// === GÜNEY AMERİKA CİKLETLERİ ===
const balikVeritabaniPart2 = [
  { id: 'oscar', isim: 'Oscar', grup: 'amerikan_cichlid', aliases: ['astronot', 'tiger oscar', 'red oscar'] },
  { id: 'severum', isim: 'Severum', grup: 'amerikan_cichlid', aliases: ['hero', 'green severum'] },
  { id: 'gold_severum', isim: 'Gold Severum', grup: 'amerikan_cichlid', aliases: ['golden severum'] },
  { id: 'green_terror', isim: 'Green Terror', grup: 'amerikan_cichlid', aliases: ['yeşil terör'] },
  { id: 'jack_dempsey', isim: 'Jack Dempsey', grup: 'amerikan_cichlid', aliases: ['jd', 'electric blue jack dempsey'] },
  { id: 'texas', isim: 'Texas Cichlid', grup: 'amerikan_cichlid', aliases: ['texas'] },
  { id: 'convict', isim: 'Zebra Cichlid', grup: 'amerikan_cichlid', aliases: ['convict', 'mahkum'] },
  { id: 'firemouth', isim: 'Ateş Ağız', grup: 'amerikan_cichlid', aliases: ['firemouth', 'meeki'] },
  { id: 'jaguar', isim: 'Jaguar Cichlid', grup: 'amerikan_cichlid', aliases: ['jaguar', 'managuense'] },
  { id: 'dovii', isim: 'Dovii', grup: 'amerikan_cichlid', aliases: ['wolf cichlid'] },
  { id: 'midas', isim: 'Midas Cichlid', grup: 'amerikan_cichlid', aliases: ['midas'] },
  { id: 'red_devil', isim: 'Red Devil', grup: 'amerikan_cichlid', aliases: ['labiatus'] },
  { id: 'flowerhorn', isim: 'Flowerhorn', grup: 'amerikan_cichlid', aliases: ['flower horn', 'louhan'] },
  { id: 'papagan', isim: 'Papağan Cichlid', grup: 'amerikan_cichlid', aliases: ['blood parrot'] },
  { id: 'red_terror', isim: 'Red Terror', grup: 'amerikan_cichlid', aliases: ['festae'] },
  { id: 'geophagus', isim: 'Geophagus', grup: 'amerikan_cichlid', aliases: ['eartheater', 'toprak yiyen'] },
  { id: 'uaru', isim: 'Uaru', grup: 'amerikan_cichlid', aliases: ['triangle cichlid'] },

  // === CÜCE CİKLETLER ===
  { id: 'ramirezi', isim: 'Ramirezi', grup: 'cuce_cichlid', aliases: ['ram', 'german blue ram', 'electric blue ram'] },
  { id: 'bolivian_ram', isim: 'Bolivian Ram', grup: 'cuce_cichlid', aliases: ['bolivya ram'] },
  { id: 'apisto', isim: 'Apistogramma', grup: 'cuce_cichlid', aliases: ['apisto'] },
  { id: 'kakadu', isim: 'Kakadu Apisto', grup: 'cuce_cichlid', aliases: ['cacatuoides', 'cockatoo'] },
  { id: 'agassizi', isim: 'Agassizi', grup: 'cuce_cichlid', aliases: ['agassizii'] },
  { id: 'kribensis', isim: 'Kribensis', grup: 'cuce_cichlid', aliases: ['krib', 'pulcher'] },

  // === MALAWİ CİKLETLERİ ===
  { id: 'sari_prenses', isim: 'Sarı Prenses', grup: 'malawi', aliases: ['yellow lab', 'labidochromis', 'electric yellow'] },
  { id: 'mavi_prenses', isim: 'Mavi Prenses', grup: 'malawi', aliases: ['socolofi', 'powder blue'] },
  { id: 'demasoni', isim: 'Demasoni', grup: 'malawi', aliases: ['demasoni'] },
  { id: 'auratus', isim: 'Auratus', grup: 'malawi', aliases: ['auratus', 'golden mbuna'] },
  { id: 'kenyi', isim: 'Kenyi', grup: 'malawi', aliases: ['lombardoi'] },
  { id: 'red_zebra', isim: 'Red Zebra', grup: 'malawi', aliases: ['estherae'] },
  { id: 'acei', isim: 'Acei', grup: 'malawi', aliases: ['iceman', 'yellow tail acei'] },
  { id: 'ahli', isim: 'Electric Blue Ahli', grup: 'malawi', aliases: ['ahli', 'fryeri'] },
  { id: 'venustus', isim: 'Venüstüs', grup: 'malawi', aliases: ['venustus', 'giraffe cichlid'] },
  { id: 'peacock', isim: 'Peacock', grup: 'malawi', aliases: ['aulonocara', 'imparator'] },
  { id: 'mbuna', isim: 'Mbuna', grup: 'malawi', aliases: ['mbuna'] },
  { id: 'yunus_cichlid', isim: 'Yunus Cichlid', grup: 'malawi', aliases: ['moorii', 'blue dolphin'] },
  { id: 'livingston', isim: 'Livingston', grup: 'malawi', aliases: ['livingstonii', 'sleeper'] },

  // === TANGANYİKA CİKLETLERİ ===
  { id: 'frontosa', isim: 'Frontosa', grup: 'tanganyika', aliases: ['frontoza', 'front', 'cyphotilapia'] },
  { id: 'tropheus', isim: 'Tropheus', grup: 'tanganyika', aliases: ['tropheus moorii'] },
  { id: 'duboisi', isim: 'Tropheus Duboisi', grup: 'tanganyika', aliases: ['duboisi'] },
  { id: 'leleupi', isim: 'Leleupi', grup: 'tanganyika', aliases: ['limon cichlid', 'lemon cichlid'] },
  { id: 'brichardi', isim: 'Brichardi', grup: 'tanganyika', aliases: ['princess of burundi', 'fairy cichlid'] },
  { id: 'calvus', isim: 'Calvus', grup: 'tanganyika', aliases: ['calvus', 'altolamprologus'] },
  { id: 'compressiceps', isim: 'Compressiceps', grup: 'tanganyika', aliases: ['comp'] },
  { id: 'julidochromis', isim: 'Julidochromis', grup: 'tanganyika', aliases: ['julie', 'marlieri'] },
  { id: 'multifasciatus', isim: 'Multifasciatus', grup: 'tanganyika', aliases: ['multies', 'shell dweller'] },
  { id: 'cyprichromis', isim: 'Cyprichromis', grup: 'tanganyika', aliases: ['leptosoma'] },
  { id: 'xenotilapia', isim: 'Xenotilapia', grup: 'tanganyika', aliases: ['sand cichlid'] },

  // === PLECO & VANTUZLU ===
  { id: 'bristlenose', isim: 'Bristlenose', grup: 'vantuzlu_kedi', aliases: ['ancistrus', 'cüce vatoz', 'bushy nose'] },
  { id: 'pleco', isim: 'Pleco', grup: 'vantuzlu_kedi', aliases: ['common pleco', 'vatoz'] },
  { id: 'leopar_vatoz', isim: 'Leopar Vatoz', grup: 'vantuzlu_kedi', aliases: ['gibbiceps', 'sailfin pleco'] },
  { id: 'zebra_pleco', isim: 'Zebra Pleco', grup: 'vantuzlu_kedi', aliases: ['l046', 'hypancistrus zebra'] },
  { id: 'otocinclus', isim: 'Otocinclus', grup: 'vantuzlu_kedi', aliases: ['oto', 'dwarf sucker'] },
  { id: 'clown_pleco', isim: 'Clown Pleco', grup: 'vantuzlu_kedi', aliases: ['l104', 'palyaço pleco'] },
  { id: 'gold_nugget', isim: 'Gold Nugget', grup: 'vantuzlu_kedi', aliases: ['l018', 'l177'] },
  { id: 'royal_pleco', isim: 'Royal Pleco', grup: 'vantuzlu_kedi', aliases: ['l190', 'kral vatoz'] },
  { id: 'sae', isim: 'SAE', grup: 'vantuzlu_kedi', aliases: ['siamese algae eater'] },
  { id: 'cae', isim: 'Çinli Alg Yiyici', grup: 'vantuzlu_kedi', aliases: ['chinese algae eater'] },

  // === BÜYÜK KEDİBALIKLARI ===
  { id: 'pictus', isim: 'Pictus', grup: 'buyuk_kedi', aliases: ['pictus catfish'] },
  { id: 'red_tail', isim: 'Kırmızı Kuyruk', grup: 'buyuk_kedi', aliases: ['red tail catfish', 'rtc'] },
  { id: 'tiger_shovelnose', isim: 'Tiger Shovelnose', grup: 'buyuk_kedi', aliases: ['tsn'] },
  { id: 'pangasius', isim: 'Pangasius', grup: 'kopekbaligi_kedi', aliases: ['iridescent shark', 'yanardöner'] },

  // === GÖKKUŞAĞI ===
  { id: 'boesemani', isim: 'Boesemani', grup: 'gokkusagi', aliases: ['boesemani rainbow'] },
  { id: 'praecox', isim: 'Cüce Gökkuşağı', grup: 'gokkusagi', aliases: ['praecox', 'dwarf rainbow', 'neon rainbow'] },
  { id: 'turkuaz', isim: 'Turkuaz Gökkuşağı', grup: 'gokkusagi', aliases: ['lacustris'] },
  { id: 'red_rainbow', isim: 'Kırmızı Gökkuşağı', grup: 'gokkusagi', aliases: ['glossolepis incisus'] },

  // === KİLLİFİSH ===
  { id: 'gardneri', isim: 'Gardneri', grup: 'killifish', aliases: ['fundulopanchax gardneri'] },
  { id: 'australe', isim: 'Lirkuyruk', grup: 'killifish', aliases: ['lyretail killifish', 'aphyosemion'] },
  { id: 'panchax', isim: 'Panchax', grup: 'killifish', aliases: ['golden wonder', 'striped panchax'] },
  { id: 'medaka', isim: 'Medaka', grup: 'killifish', aliases: ['rice fish', 'japanese rice fish'] },
  { id: 'clown_killifish', isim: 'Palyaço Killifish', grup: 'killifish', aliases: ['rocket killifish'] },

  // === BALTA ===
  { id: 'balta', isim: 'Balta Balığı', grup: 'balta', aliases: ['hatchetfish', 'marbled hatchet'] },
  { id: 'gumus_balta', isim: 'Gümüş Balta', grup: 'balta', aliases: ['silver hatchet'] },

  // === JAPON & SOĞUK SU ===
  { id: 'japon', isim: 'Japon Balığı', grup: 'japon', aliases: ['goldfish', 'gold fish'] },
  { id: 'oranda', isim: 'Oranda', grup: 'japon', aliases: ['red cap oranda'] },
  { id: 'ranchu', isim: 'Ranchu', grup: 'japon', aliases: ['lionhead'] },
  { id: 'teleskop', isim: 'Teleskop Göz', grup: 'japon', aliases: ['black moor', 'telescope eye'] },
  { id: 'shubunkin', isim: 'Shubunkin', grup: 'japon', aliases: ['calico goldfish'] },
  { id: 'koi', isim: 'Koi', grup: 'havuz', aliases: ['koi carp', 'nishikigoi'] },
  { id: 'white_cloud', isim: 'White Cloud', grup: 'japon', aliases: ['kardinal balığı', 'wcmm'] },

  // === OMURGASIZLAR ===
  { id: 'kiraz_karides', isim: 'Kiraz Karides', grup: 'omurgasizlar', aliases: ['cherry shrimp', 'red cherry', 'rcs'] },
  { id: 'amano', isim: 'Amano Karides', grup: 'omurgasizlar', aliases: ['amano shrimp', 'yamato'] },
  { id: 'crystal_red', isim: 'Crystal Red', grup: 'omurgasizlar', aliases: ['crs', 'bee shrimp'] },
  { id: 'blue_bolt', isim: 'Blue Bolt', grup: 'omurgasizlar', aliases: ['taiwan bee'] },
  { id: 'blue_dream', isim: 'Mavi Karides', grup: 'omurgasizlar', aliases: ['blue velvet', 'blue dream'] },
  { id: 'nerite', isim: 'Nerite Salyangoz', grup: 'omurgasizlar', aliases: ['nerite snail', 'zebra nerite'] },
  { id: 'elma_salyangoz', isim: 'Elma Salyangozu', grup: 'omurgasizlar', aliases: ['mystery snail', 'apple snail'] },
  { id: 'ramshorn', isim: 'Ramshorn', grup: 'omurgasizlar', aliases: ['rams horn'] },
  { id: 'katil_salyangoz', isim: 'Katil Salyangoz', grup: 'omurgasizlar', aliases: ['assassin snail', 'helena'] },
  { id: 'mavi_kerevit', isim: 'Mavi Kerevit', grup: 'omurgasizlar', aliases: ['blue crayfish'] },
  { id: 'cpo', isim: 'CPO', grup: 'omurgasizlar', aliases: ['mexican dwarf crayfish', 'cambarellus'] },

  // === DİĞER BALIKLAR ===
  { id: 'arowana', isim: 'Arowana', grup: 'diger_baliklar', aliases: ['silver arowana'] },
  { id: 'bichir', isim: 'Bişir', grup: 'diger_baliklar', aliases: ['bichir', 'polypterus', 'senegal bichir'] },
  { id: 'kaval', isim: 'Kaval Balığı', grup: 'diger_baliklar', aliases: ['rope fish', 'reed fish'] },
  { id: 'hayalet', isim: 'Hayalet Bıçak', grup: 'diger_baliklar', aliases: ['black ghost knife'] },
  { id: 'palyaco_bicak', isim: 'Palyaço Bıçak', grup: 'diger_baliklar', aliases: ['clown knife'] },
  { id: 'fil_baligi', isim: 'Fil Balığı', grup: 'diger_baliklar', aliases: ['elephant nose'] },
  { id: 'puffer', isim: 'Pigme Puffer', grup: 'diger_baliklar', aliases: ['pea puffer', 'dwarf puffer'] },
  { id: 'fahaka', isim: 'Fahaka Puffer', grup: 'diger_baliklar', aliases: ['fahaka', 'nile puffer'] },
  { id: 'scarlet_badis', isim: 'Scarlet Badis', grup: 'diger_baliklar', aliases: ['dario dario'] },
  { id: 'yilanbas', isim: 'Yılanbaş', grup: 'diger_baliklar', aliases: ['snakehead', 'channa'] },
  { id: 'motoro', isim: 'Motoro Vatoz', grup: 'vatozlar', aliases: ['motoro stingray', 'freshwater stingray'] }
];

// Tüm balıkları birleştir (Part 1'den gelen balikVeritabani ile)
// const tumBaliklar = [...balikVeritabani, ...balikVeritabaniPart2];

// ==================== 32x32 UYUMLULUK MATRİSİ ====================
// E = Uygun (Uyumlu), H = Uygun Değil (Uyumsuz), D = Dikkat Edilmeli
const uyumlulukMatrisi = {
  malawi: { malawi: 'E', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'H', barblar: 'D', beta: 'H', copculer: 'D', daniolar: 'H', discus: 'H', japon: 'H', gurami: 'H', lepistes: 'H', balta: 'H', killifish: 'H', buyuk_kedi: 'D', loachlar: 'D', moli: 'H', plati: 'H', vatozlar: 'E', gokkusagi: 'H', rasbora: 'H', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'H', tetralar: 'H', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'H' },
  tanganyika: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'H', barblar: 'D', beta: 'H', copculer: 'D', daniolar: 'H', discus: 'H', japon: 'H', gurami: 'H', lepistes: 'H', balta: 'H', killifish: 'H', buyuk_kedi: 'D', loachlar: 'D', moli: 'H', plati: 'H', vatozlar: 'E', gokkusagi: 'H', rasbora: 'H', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'H', tetralar: 'H', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'H' },
  diger_afrika: { malawi: 'D', tanganyika: 'D', diger_afrika: 'E', amerikan_cichlid: 'D', melek: 'H', barblar: 'D', beta: 'H', copculer: 'D', daniolar: 'H', discus: 'H', japon: 'H', gurami: 'H', lepistes: 'H', balta: 'H', killifish: 'H', buyuk_kedi: 'D', loachlar: 'D', moli: 'H', plati: 'H', vatozlar: 'E', gokkusagi: 'H', rasbora: 'H', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'H', tetralar: 'H', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'H' },
  amerikan_cichlid: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'D', barblar: 'D', beta: 'H', copculer: 'D', daniolar: 'D', discus: 'D', japon: 'H', gurami: 'D', lepistes: 'H', balta: 'D', killifish: 'D', buyuk_kedi: 'D', loachlar: 'D', moli: 'D', plati: 'D', vatozlar: 'E', gokkusagi: 'D', rasbora: 'D', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'D', tetralar: 'D', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'D' },
  melek: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'D', beta: 'D', copculer: 'E', daniolar: 'E', discus: 'D', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'E', tetralar: 'D', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  barblar: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'D', barblar: 'E', beta: 'H', copculer: 'E', daniolar: 'E', discus: 'D', japon: 'H', gurami: 'E', lepistes: 'D', balta: 'D', killifish: 'D', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'D', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'E', vantuzlu_kedi: 'E', kilickuyruk: 'D', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  beta: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'H', melek: 'D', barblar: 'H', beta: 'H', copculer: 'E', daniolar: 'E', discus: 'D', japon: 'H', gurami: 'D', lepistes: 'D', balta: 'E', killifish: 'D', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'D', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'E', kilickuyruk: 'D', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  copculer: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'E', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  daniolar: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'E', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  discus: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'D', barblar: 'D', beta: 'D', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'D', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'D', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  japon: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'H', melek: 'H', barblar: 'H', beta: 'H', copculer: 'E', daniolar: 'H', discus: 'H', japon: 'E', gurami: 'H', lepistes: 'H', balta: 'H', killifish: 'H', buyuk_kedi: 'H', loachlar: 'D', moli: 'H', plati: 'H', vatozlar: 'E', gokkusagi: 'H', rasbora: 'H', kopekbaligi_kedi: 'E', vantuzlu_kedi: 'E', kilickuyruk: 'H', tetralar: 'H', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'D', su_bitkileri: 'D', cuce_cichlid: 'H' },
  gurami: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'D', copculer: 'E', daniolar: 'E', discus: 'D', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'E', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'D', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  lepistes: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'H', melek: 'E', barblar: 'D', beta: 'D', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'D', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  balta: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'D', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'D', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  killifish: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'D', beta: 'D', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'D', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  buyuk_kedi: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'D', barblar: 'D', beta: 'D', copculer: 'D', daniolar: 'D', discus: 'D', japon: 'H', gurami: 'D', lepistes: 'D', balta: 'D', killifish: 'D', buyuk_kedi: 'D', loachlar: 'D', moli: 'D', plati: 'D', vatozlar: 'D', gokkusagi: 'D', rasbora: 'D', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'D', tetralar: 'H', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'H' }
};

// Part 3'te devam ediyor (Matrisin geri kalanı + React Komponenti)
// BalikUyumluluk.jsx - PART 3: Matris Devamı + Açıklama Üretici + React Komponenti

// Matrisin devamı (Part 2'den devam)
const uyumlulukMatrisiDevam = {
  loachlar: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'D', gurami: 'E', lepistes: 'D', balta: 'E', killifish: 'D', buyuk_kedi: 'D', loachlar: 'E', moli: 'D', plati: 'D', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'E', vantuzlu_kedi: 'E', kilickuyruk: 'D', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  moli: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'D', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'E', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  plati: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'D', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'D', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  vatozlar: { malawi: 'E', tanganyika: 'E', diger_afrika: 'E', amerikan_cichlid: 'E', melek: 'E', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'D', japon: 'E', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'E', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'E' },
  gokkusagi: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'D', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'D', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'E', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  rasbora: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  kopekbaligi_kedi: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'D', barblar: 'E', beta: 'D', copculer: 'D', daniolar: 'E', discus: 'D', japon: 'E', gurami: 'E', lepistes: 'D', balta: 'D', killifish: 'D', buyuk_kedi: 'D', loachlar: 'E', moli: 'D', plati: 'D', vatozlar: 'E', gokkusagi: 'E', rasbora: 'D', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'D', tetralar: 'D', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'D' },
  vantuzlu_kedi: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'D', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'D', japon: 'E', gurami: 'E', lepistes: 'D', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'D', plati: 'D', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'E', kilickuyruk: 'D', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'E' },
  kilickuyruk: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'D', beta: 'D', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'D', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  tetralar: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'D', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'D', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'H', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' },
  diger_baliklar: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'D', barblar: 'D', beta: 'D', copculer: 'D', daniolar: 'D', discus: 'D', japon: 'D', gurami: 'D', lepistes: 'D', balta: 'D', killifish: 'D', buyuk_kedi: 'D', loachlar: 'D', moli: 'D', plati: 'D', vatozlar: 'D', gokkusagi: 'D', rasbora: 'D', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'D', tetralar: 'D', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'D' },
  omurgasizlar: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'D', barblar: 'D', beta: 'D', copculer: 'D', daniolar: 'D', discus: 'D', japon: 'D', gurami: 'D', lepistes: 'D', balta: 'D', killifish: 'D', buyuk_kedi: 'D', loachlar: 'D', moli: 'D', plati: 'D', vatozlar: 'D', gokkusagi: 'D', rasbora: 'D', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'D', tetralar: 'D', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'D', havuz: 'D', su_bitkileri: 'E', cuce_cichlid: 'D' },
  aci_su: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'H', barblar: 'D', beta: 'H', copculer: 'H', daniolar: 'D', discus: 'H', japon: 'H', gurami: 'H', lepistes: 'H', balta: 'H', killifish: 'H', buyuk_kedi: 'D', loachlar: 'D', moli: 'E', plati: 'H', vatozlar: 'D', gokkusagi: 'D', rasbora: 'H', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'D', kilickuyruk: 'H', tetralar: 'H', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'E', havuz: 'H', su_bitkileri: 'D', cuce_cichlid: 'H' },
  havuz: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'H', melek: 'H', barblar: 'H', beta: 'H', copculer: 'H', daniolar: 'H', discus: 'H', japon: 'D', gurami: 'H', lepistes: 'H', balta: 'H', killifish: 'H', buyuk_kedi: 'H', loachlar: 'H', moli: 'H', plati: 'H', vatozlar: 'H', gokkusagi: 'H', rasbora: 'H', kopekbaligi_kedi: 'H', vantuzlu_kedi: 'H', kilickuyruk: 'H', tetralar: 'H', diger_baliklar: 'H', omurgasizlar: 'D', aci_su: 'H', havuz: 'E', su_bitkileri: 'D', cuce_cichlid: 'H' },
  su_bitkileri: { malawi: 'D', tanganyika: 'D', diger_afrika: 'D', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'D', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'D', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'D', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'E', vantuzlu_kedi: 'D', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'E', aci_su: 'D', havuz: 'D', su_bitkileri: 'E', cuce_cichlid: 'E' },
  cuce_cichlid: { malawi: 'H', tanganyika: 'H', diger_afrika: 'H', amerikan_cichlid: 'D', melek: 'E', barblar: 'E', beta: 'E', copculer: 'E', daniolar: 'E', discus: 'E', japon: 'H', gurami: 'E', lepistes: 'E', balta: 'E', killifish: 'E', buyuk_kedi: 'H', loachlar: 'E', moli: 'E', plati: 'E', vatozlar: 'E', gokkusagi: 'E', rasbora: 'E', kopekbaligi_kedi: 'D', vantuzlu_kedi: 'E', kilickuyruk: 'E', tetralar: 'E', diger_baliklar: 'D', omurgasizlar: 'D', aci_su: 'H', havuz: 'H', su_bitkileri: 'E', cuce_cichlid: 'E' }
};

// ==================== AÇIKLAMA ÜRETİCİ ====================
const aciklamaUret = (grup1, grup2, uyum, balik1Isim, balik2Isim) => {
  // Uyumlu
  if (uyum === 'E') {
    return `${balik1Isim} ve ${balik2Isim} genellikle uyumludur. Yeterli alan sağlandığında sorunsuz bir şekilde birlikte yaşayabilirler.`;
  }
  
  // Uyumsuz - özel durumlar
  if (uyum === 'H') {
    // Cichlid + küçük balık
    if ((grup1 === 'malawi' || grup1 === 'tanganyika' || grup2 === 'malawi' || grup2 === 'tanganyika') && 
        (grup1 === 'tetralar' || grup2 === 'tetralar' || grup1 === 'lepistes' || grup2 === 'lepistes' || grup1 === 'rasbora' || grup2 === 'rasbora')) {
      return `${balik1Isim} ve ${balik2Isim} birlikte beslenemez! Afrika cikletleri agresif ve büyük balıklardır, küçük balıkları avlarlar.`;
    }
    // Oscar/büyük cichlid + küçük balık
    if ((grup1 === 'amerikan_cichlid' || grup2 === 'amerikan_cichlid') && 
        (grup1 === 'lepistes' || grup2 === 'lepistes' || grup1 === 'tetralar' || grup2 === 'tetralar')) {
      return `${balik1Isim} ve ${balik2Isim} birlikte beslenemez! Büyük Amerika cikletleri küçük balıkları avlar.`;
    }
    // Beta + Beta
    if (grup1 === 'beta' && grup2 === 'beta') {
      return `İki Beta kesinlikle bir arada tutulamaz! Erkek betalar ölümüne kavga ederler.`;
    }
    // Beta + Barb
    if ((grup1 === 'beta' || grup2 === 'beta') && (grup1 === 'barblar' || grup2 === 'barblar')) {
      return `${balik1Isim} ve ${balik2Isim} uyumsuz! Kaplan barb gibi türler betanın yüzgeçlerini ısırır ve strese sokar.`;
    }
    // Japon + Tropik
    if ((grup1 === 'japon' || grup2 === 'japon') && grup1 !== grup2) {
      return `${balik1Isim} ve ${balik2Isim} sıcaklık uyumsuzluğu var! Japon balıkları soğuk su (18-22°C), tropik balıklar sıcak su (24-28°C) ister.`;
    }
    // Havuz balıkları
    if (grup1 === 'havuz' || grup2 === 'havuz') {
      return `${balik1Isim} ve ${balik2Isim} birlikte beslenemez! Havuz balıkları açık havuz ortamı gerektirirken diğeri kapalı akvaryum balığıdır.`;
    }
    // Büyük kedi + küçük balık
    if ((grup1 === 'buyuk_kedi' || grup2 === 'buyuk_kedi') && (grup1 === 'tetralar' || grup2 === 'tetralar' || grup1 === 'cuce_cichlid' || grup2 === 'cuce_cichlid')) {
      return `${balik1Isim} ve ${balik2Isim} birlikte beslenemez! Büyük kedibalıkları gece avlanır ve küçük balıkları yer.`;
    }
    // Genel uyumsuz
    return `${balik1Isim} ve ${balik2Isim} birlikte beslenmemelidir! Agresyon, avlanma veya su parametresi uyumsuzluğu ciddi sorunlara yol açar.`;
  }
  
  // Dikkat - özel durumlar
  if (uyum === 'D') {
    // Melek + küçük tetra
    if ((grup1 === 'melek' || grup2 === 'melek') && (grup1 === 'tetralar' || grup2 === 'tetralar')) {
      return `${balik1Isim} ve ${balik2Isim} dikkatli izleme gerektirir. Melek balıkları büyüdükçe neon gibi çok küçük tetraları avlayabilir.`;
    }
    // Beta + Gurami
    if ((grup1 === 'beta' || grup2 === 'beta') && (grup1 === 'gurami' || grup2 === 'gurami')) {
      return `${balik1Isim} ve ${balik2Isim} dikkatli olunmalı. Her ikisi de labirent balığı, erkekler rekabet edebilir.`;
    }
    // Loach + Omurgasız
    if ((grup1 === 'loachlar' || grup2 === 'loachlar') && (grup1 === 'omurgasizlar' || grup2 === 'omurgasizlar')) {
      return `${balik1Isim} ve ${balik2Isim} dikkat gerektirir. Bazı loach türleri küçük karidesleri ve salyangozları avlayabilir.`;
    }
    // Omurgasız + Balık
    if (grup1 === 'omurgasizlar' || grup2 === 'omurgasizlar') {
      return `${balik1Isim} ve ${balik2Isim} dikkat gerektirir. Çoğu balık karidesleri ve küçük salyangozları yiyebilir.`;
    }
    // Genel dikkat
    return `${balik1Isim} ve ${balik2Isim} dikkatli izleme gerektirir. Yeterli alan ve saklanma yerleri ile bir arada tutulabilirler.`;
  }
  
  return 'Bu kombinasyon hakkında bilgi bulunamadı.';
};

// ==================== REACT KOMPONENTİ ====================
const BalikUyumluluk = () => {
  const [balik1, setBalik1] = useState('');
  const [balik2, setBalik2] = useState('');
  const [sonuc, setSonuc] = useState(null);
  const [aramaSonuclari1, setAramaSonuclari1] = useState([]);
  const [aramaSonuclari2, setAramaSonuclari2] = useState([]);
  const [seciliBalik1, setSeciliBalik1] = useState(null);
  const [seciliBalik2, setSeciliBalik2] = useState(null);

  // Tüm balıkları birleştir (Part 1 + Part 2)
  const tumBaliklar = [...balikVeritabani, ...balikVeritabaniPart2];
  
  // Tüm matrisi birleştir
  const tumMatris = { ...uyumlulukMatrisi, ...uyumlulukMatrisiDevam };

  // Balık arama
  const balikAra = (aranan) => {
    if (!aranan || aranan.length < 2) return [];
    const metin = aranan.toLowerCase().trim();
    return tumBaliklar.filter(b => 
      b.isim.toLowerCase().includes(metin) || 
      b.aliases?.some(a => a.toLowerCase().includes(metin))
    ).slice(0, 8);
  };

  const handleArama1 = (e) => {
    const d = e.target.value;
    setBalik1(d);
    setAramaSonuclari1(balikAra(d));
    setSeciliBalik1(null);
    setSonuc(null);
  };

  const handleArama2 = (e) => {
    const d = e.target.value;
    setBalik2(d);
    setAramaSonuclari2(balikAra(d));
    setSeciliBalik2(null);
    setSonuc(null);
  };

  const handleSecim1 = (b) => { setBalik1(b.isim); setSeciliBalik1(b); setAramaSonuclari1([]); };
  const handleSecim2 = (b) => { setBalik2(b.isim); setSeciliBalik2(b); setAramaSonuclari2([]); };

  const uyumlulukSorgula = () => {
    if (!seciliBalik1 || !seciliBalik2) {
      setSonuc({ hata: 'Lütfen her iki balığı da listeden seçin.' });
      return;
    }
    const g1 = seciliBalik1.grup;
    const g2 = seciliBalik2.grup;
    const uyum = tumMatris[g1]?.[g2] || 'D';
    const aciklama = aciklamaUret(g1, g2, uyum, seciliBalik1.isim, seciliBalik2.isim);
    setSonuc({ uyum, aciklama, balik1: seciliBalik1, balik2: seciliBalik2 });
  };

  return (
    <div className="balik-uyumluluk-sayfa">
      <div className="uyumluluk-header">
        <h1>🐠 Balığım Uyumlu Mu?</h1>
        <p>İki balık türü seçin, uyumluluk analizi yapayım</p>
      </div>

      <div className="uyumluluk-container">
        <div className="secim-alani">
          <div className="balik-secim">
            <label>1. Balık</label>
            <div className="arama-wrapper">
              <input type="text" value={balik1} onChange={handleArama1} placeholder="Balık adı yazın..." className={seciliBalik1 ? 'secildi' : ''} />
              {seciliBalik1 && <span className="secim-tick">✓</span>}
            </div>
            {aramaSonuclari1.length > 0 && (
              <ul className="arama-sonuclari">
                {aramaSonuclari1.map(b => (
                  <li key={b.id} onClick={() => handleSecim1(b)}>
                    <span className="balik-isim">{b.isim}</span>
                    <span className="balik-grup">{GRUP_ISIMLERI[b.grup]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="vs-badge">VS</div>

          <div className="balik-secim">
            <label>2. Balık</label>
            <div className="arama-wrapper">
              <input type="text" value={balik2} onChange={handleArama2} placeholder="Balık adı yazın..." className={seciliBalik2 ? 'secildi' : ''} />
              {seciliBalik2 && <span className="secim-tick">✓</span>}
            </div>
            {aramaSonuclari2.length > 0 && (
              <ul className="arama-sonuclari">
                {aramaSonuclari2.map(b => (
                  <li key={b.id} onClick={() => handleSecim2(b)}>
                    <span className="balik-isim">{b.isim}</span>
                    <span className="balik-grup">{GRUP_ISIMLERI[b.grup]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button className="sorgula-btn" onClick={uyumlulukSorgula} disabled={!seciliBalik1 || !seciliBalik2}>
          🔍 UYUMLULUK SORGULA
        </button>

        {sonuc && (
          <div className={`sonuc-panel ${sonuc.hata ? 'hata' : sonuc.uyum === 'E' ? 'uyumlu' : sonuc.uyum === 'H' ? 'uyumsuz' : 'dikkat'}`}>
            {sonuc.hata ? (
              <p className="hata-mesaj">⚠️ {sonuc.hata}</p>
            ) : (
              <>
                <div className="sonuc-header">
                  <span className="balik1-isim">{sonuc.balik1.isim}</span>
                  <span className="sonuc-icon">{sonuc.uyum === 'E' ? '✅' : sonuc.uyum === 'H' ? '❌' : '⚠️'}</span>
                  <span className="balik2-isim">{sonuc.balik2.isim}</span>
                </div>
                <div className="sonuc-durum">
                  {sonuc.uyum === 'E' && <span className="durum uyumlu">UYUMLU!</span>}
                  {sonuc.uyum === 'H' && <span className="durum uyumsuz">UYUMSUZ!</span>}
                  {sonuc.uyum === 'D' && <span className="durum dikkat">DİKKAT!</span>}
                </div>
                <p className="sonuc-aciklama">{sonuc.aciklama}</p>
                <div className="sonuc-gruplar">
                  <span>{GRUP_ISIMLERI[sonuc.balik1.grup]}</span>
                  <span>×</span>
                  <span>{GRUP_ISIMLERI[sonuc.balik2.grup]}</span>
                </div>
              </>
            )}
          </div>
        )}

        <div className="ai-uyari">
          <p>⚠️ Bu veritabanı öğrenme odaklıdır. Geliştiricim zaman buldukça öğrenmemi sağlıyor! Doğruluk oranı %80 üzerinde fakat yine de hata yapabilirim.</p>
        </div>
      </div>
    </div>
  );
};

export default BalikUyumluluk;

// NOT: Bu 3 Part'ı tek dosyada birleştirin!
// 1. Part1'den: import, GRUP_ISIMLERI, balikVeritabani
// 2. Part2'den: balikVeritabaniPart2, uyumlulukMatrisi (ilk yarı)
// 3. Part3'ten: uyumlulukMatrisiDevam, aciklamaUret, BalikUyumluluk komponenti
