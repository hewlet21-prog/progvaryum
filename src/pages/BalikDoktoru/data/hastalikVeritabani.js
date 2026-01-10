// hastalikVeritabani.js - 20 Hastalık + Tedavi + Detaylı Bilgi

export const hastaliklar = [
  // ========== PARAZİT HASTALIKLARI ==========
  {
    id: 'ich',
    isim: 'Ich (Beyaz Benek)',
    latinIsim: 'Ichthyophthirius multifiliis',
    kategori: 'parazit',
    emoji: '⚪',
    tehlikeSeviyesi: 'orta',
    belirtiler: [
      'Tuz serpilmiş gibi beyaz noktalar',
      'Dekorlara/camlara sürtünme',
      'İştahsızlık',
      'Hızlı soluma',
      'Yüzgeçler vücuda yapışık'
    ],
    ayirtEdici: 'Beyaz noktalar tek tek ve yuvarlak, tuz tanesi gibi',
    pipiSorular: [
      { soru: 'Beyaz noktalar tuz tanesi gibi mi?', puan: 30 },
      { soru: 'Balık dekorlara sürtünüyor mu?', puan: 25 },
      { soru: 'Noktalar her gün artıyor mu?', puan: 20 }
    ],
    nedenOlusur: 'Ich, balığın derisi altına yerleşen tek hücreli bir parazittir. Stres, ani sıcaklık değişimi veya yeni balık eklenmesiyle tetiklenir.',
    tedavi: {
      adimlar: [
        'Sıcaklığı günde 1°C artırarak 28-30°C\'ye çıkar',
        'Formalin + Malachite Green içeren ilaç kullan',
        'Aktif karbonu filtreden çıkar',
        'Akvaryum tuzu ekle (1-2 g/L, tür uygunsa)',
        'Tedaviyi benekler kaybolsa bile 5-7 gün sürdür'
      ],
      ilaclar: ['Formalin + Malachite Green', 'Akvaryum tuzu', 'Ich-X', 'Sera Costapur'],
      sure: '5-7 gün',
      pipiNot: 'Sıcaklık artışı parazitin yaşam döngüsünü hızlandırır, böylece ilaç daha etkili olur!'
    }
  },
  {
    id: 'velvet',
    isim: 'Velvet (Altın Toz)',
    latinIsim: 'Oodinium',
    kategori: 'parazit',
    emoji: '✨',
    tehlikeSeviyesi: 'yuksek',
    belirtiler: [
      'Sarımsı/altın tozu gibi kaplama',
      'Işığa tutunca parlama',
      'Halsizlik',
      'Solungaçta hasar',
      'Hızlı soluma'
    ],
    ayirtEdici: 'Ich\'ten çok daha ince, altın tozu gibi parıltılı',
    pipiSorular: [
      { soru: 'Işıkta altın/sarı parıltı görüyor musun?', puan: 35 },
      { soru: 'Toz Ich\'ten daha ince mi?', puan: 25 },
      { soru: 'Balık çok halsiz mi?', puan: 15 }
    ],
    nedenOlusur: 'Velvet fotosentetik bir parazittir, yani ışıktan enerji alır. Bu yüzden tedavide ışık kapatılır.',
    tedavi: {
      adimlar: [
        'Akvaryumu tamamen karart (parazit fotosentetik)',
        'Bakır veya Malachite Green bazlı ilaç kullan',
        'Güçlü havalandırma sağla',
        'Karantina tankına al',
        'Tuz banyosu uygula (kısa süreli)'
      ],
      ilaclar: ['Copper Safe', 'Malachite Green', 'Seachem Cupramine'],
      sure: '10-14 gün',
      pipiNot: 'Işığı kapatmak çok önemli! Parazit karanlıkta zayıflar.'
    }
  },
  {
    id: 'solungac_parazit',
    isim: 'Solungaç Parazitleri',
    latinIsim: 'Gill Flukes (Dactylogyrus)',
    kategori: 'parazit',
    emoji: '🫁',
    tehlikeSeviyesi: 'orta',
    belirtiler: [
      'Tek taraflı solungaç hareketi',
      'Hızlı nefes alma',
      'Yüzeye çıkma',
      'Kızarık solungaçlar',
      'Solungaç kapağı açık durma'
    ],
    ayirtEdici: 'Tek solungaç hareket ediyorsa parazit o tarafa yerleşmiş demektir',
    pipiSorular: [
      { soru: 'Solungaçlar tek taraflı mı hareket ediyor?', puan: 35 },
      { soru: 'Balık sürekli yüzeyde mi?', puan: 20 },
      { soru: 'Solungaçlar kızarık mı?', puan: 20 }
    ],
    nedenOlusur: 'Solungaçlara tutunan mikroskobik kurtçuklardır. Oksijen alımını ciddi şekilde bozarlar.',
    tedavi: {
      adimlar: [
        'Praziquantel içeren ilaç kullan',
        'Tuz banyosu uygula (kısa süre)',
        'Güçlü havalandırma sağla',
        'Su değişimi yap (%30)'
      ],
      ilaclar: ['Praziquantel', 'PraziPro', 'API General Cure'],
      sure: '5-7 gün',
      pipiNot: 'Oksijen çok önemli! Hava taşı mutlaka ekle.'
    }
  },
  {
    id: 'deri_parazit',
    isim: 'Deri Parazitleri',
    latinIsim: 'Skin Flukes (Gyrodactylus)',
    kategori: 'parazit',
    emoji: '🦠',
    tehlikeSeviyesi: 'orta',
    belirtiler: [
      'Sürekli sürtünme',
      'Mukus artışı (balık kaygan görünür)',
      'Donuk renk',
      'Yüzgeç sıkma',
      'Huzursuzluk'
    ],
    ayirtEdici: 'Aşırı mukus üretimi ve sürekli kaşınma',
    pipiSorular: [
      { soru: 'Balık aşırı kaygan/mukuslu mu?', puan: 30 },
      { soru: 'Sürekli bir yerlere sürtünüyor mu?', puan: 30 },
      { soru: 'Rengi soluk mu?', puan: 15 }
    ],
    nedenOlusur: 'Balığın mukus tabakasına yerleşen parazitlerdir. Stres ve kötü su kalitesiyle artar.',
    tedavi: {
      adimlar: [
        'Formalin bazlı ilaç kullan',
        'Düşük doz tuz tedavisi',
        'Dip çekimi + %30 su değişimi',
        'Karantina önerilir'
      ],
      ilaclar: ['Formalin', 'Sera Tremazol', 'Praziquantel'],
      sure: '5-7 gün',
      pipiNot: 'Dip çekimi önemli, parazit yumurtaları dipte birikir!'
    }
  },
  {
    id: 'ic_parazit',
    isim: 'İç Parazitler',
    latinIsim: 'Internal Parasites',
    kategori: 'parazit',
    emoji: '🪱',
    tehlikeSeviyesi: 'orta',
    belirtiler: [
      'Beyaz ip gibi dışkı',
      'Yem yiyor ama kilo almıyor',
      'Zayıflama',
      'Şiş karın (bazen)',
      'Halsizlik'
    ],
    ayirtEdici: 'Beyaz, uzun, ip gibi dışkı en belirgin işaret',
    pipiSorular: [
      { soru: 'Dışkı beyaz ve ip gibi mi?', puan: 40 },
      { soru: 'Balık yiyor ama zayıflıyor mu?', puan: 30 },
      { soru: 'Karın şiş mi?', puan: 15 }
    ],
    nedenOlusur: 'Bağırsakta yaşayan protozoa veya kurtlardır. Canlı yem veya yeni balıklardan bulaşır.',
    tedavi: {
      adimlar: [
        'Metronidazole yemle veya suya ekle',
        'Sarımsak emdirilmiş yem ver (iştah açıcı)',
        'Karantina tankına al',
        '2-3 hafta tedavi sürdür'
      ],
      ilaclar: ['Metronidazole', 'API General Cure', 'Seachem Metroplex'],
      sure: '2-3 hafta',
      pipiNot: 'İlacı yemle vermek çok daha etkili!'
    }
  },

  // ========== MANTAR HASTALIKLARI ==========
  {
    id: 'mantar',
    isim: 'Pamuksu Mantar',
    latinIsim: 'Saprolegnia',
    kategori: 'mantar',
    emoji: '🍄',
    tehlikeSeviyesi: 'orta',
    belirtiler: [
      'Pamuk gibi beyaz oluşum',
      'Genelde yaraların üstünde',
      'Yüzgeçlerde tüylü yapı',
      'Gri-beyaz renk',
      'Yayılma eğilimi'
    ],
    ayirtEdici: 'Pamuk gibi kabarık, tüylü görünüm (bakteriden farklı)',
    pipiSorular: [
      { soru: 'Oluşum pamuk gibi kabarık mı?', puan: 35 },
      { soru: 'Yara veya çizik üzerinde mi?', puan: 25 },
      { soru: 'Tüylü/lifli görünüyor mu?', puan: 20 }
    ],
    nedenOlusur: 'Genelde yaralı dokuda gelişen fırsatçı mantardır. Sağlıklı balığın derisi mantara izin vermez.',
    tedavi: {
      adimlar: [
        'Methylene Blue kullan',
        'Antifungal akvaryum ilacı uygula',
        'Tuz banyosu (destek)',
        'Yaralı balığı izole et',
        'Su kalitesini düzelt'
      ],
      ilaclar: ['Methylene Blue', 'Pimafix', 'API Fungus Cure', 'Sera Mycopur'],
      sure: '7-10 gün',
      pipiNot: 'Önce yaranın sebebini bul! Mantar fırsatçıdır.'
    }
  },

  // ========== BAKTERİYEL HASTALIKLAR ==========
  {
    id: 'fin_rot',
    isim: 'Yüzgeç Erimesi',
    latinIsim: 'Fin Rot',
    kategori: 'bakteri',
    emoji: '🩹',
    tehlikeSeviyesi: 'orta',
    belirtiler: [
      'Yüzgeç uçları beyazlaşır',
      'Yüzgeçler zamanla kısalır',
      'Yırtık/parçalı görünüm',
      'Kızarık kenarlar',
      'İleri evrede kemik görünür'
    ],
    ayirtEdici: 'Yüzgeç kenarları beyaz, sonra erime başlar',
    pipiSorular: [
      { soru: 'Yüzgeç uçları beyaz mı?', puan: 30 },
      { soru: 'Yüzgeçler kısalmış mı?', puan: 30 },
      { soru: 'Yırtık/parçalı görünüyor mu?', puan: 20 }
    ],
    nedenOlusur: 'Kötü su şartlarında çoğalan bakteriler yüzgeci eritir. Amonyak ve nitrit tetikler.',
    tedavi: {
      adimlar: [
        '%30-50 su değişimi yap',
        'Nitrofurazone veya Erythromycin kullan',
        'Stres faktörlerini azalt',
        'Aşırı yemlemeyi kes',
        'Su parametrelerini kontrol et'
      ],
      ilaclar: ['Nitrofurazone', 'Erythromycin', 'API Fin & Body Cure', 'Melafix'],
      sure: '7-14 gün',
      pipiNot: 'Su kalitesi düzelmeden antibiyotik tek başına işe yaramaz!'
    }
  },
  {
    id: 'columnaris',
    isim: 'Columnaris',
    latinIsim: 'Flavobacterium columnare',
    kategori: 'bakteri',
    emoji: '⚠️',
    tehlikeSeviyesi: 'kritik',
    belirtiler: [
      'Ağız çevresinde beyazlık',
      'Sırt bölgesinde beyaz leke',
      'Hızlı ilerleme',
      'Yüzgeç erimesi',
      'Pamuksu görünüm (ama bakteri!)'
    ],
    ayirtEdici: 'Mantar sanılır ama ÇOK HIZLI ilerler ve öldürür!',
    pipiSorular: [
      { soru: 'Ağız çevresinde beyazlık var mı?', puan: 30 },
      { soru: 'Hastalık çok hızlı mı ilerledi?', puan: 35 },
      { soru: 'Sırt bölgesinde leke var mı?', puan: 20 }
    ],
    nedenOlusur: 'Hızlı yayılan bakteriyel enfeksiyon. Yüksek sıcaklıkta daha hızlı ilerler!',
    tedavi: {
      adimlar: [
        '⚠️ ACİL: Sıcaklığı 22-24°C\'ye DÜŞÜR',
        'Antibiyotik başla (Nitrofurazone)',
        'Güçlü havalandırma sağla',
        'Karantinaya al',
        'Diğer balıkları izle'
      ],
      ilaclar: ['Nitrofurazone', 'Kanamycin', 'API Furan-2'],
      sure: '7-10 gün',
      pipiNot: '⚠️ Ich sanıp sıcaklık artırırsan ölüm hızlanır! Sıcaklığı DÜŞÜR!'
    }
  },
  {
    id: 'dropsy',
    isim: 'Dropsy (Karın Şişmesi)',
    latinIsim: 'Dropsy / Ascites',
    kategori: 'bakteri',
    emoji: '🎈',
    tehlikeSeviyesi: 'kritik',
    belirtiler: [
      'Karın aşırı şiş',
      'Pullar çam kozalağı gibi kabarık',
      'Hareketsizlik',
      'İştahsızlık',
      'Soluk renk'
    ],
    ayirtEdici: 'Pulların kabarması (çam kozalağı görünümü) kesin işaret',
    pipiSorular: [
      { soru: 'Pullar dışa doğru kabarık mı?', puan: 40 },
      { soru: 'Karın anormal şiş mi?', puan: 30 },
      { soru: 'Balık çok hareketsiz mi?', puan: 15 }
    ],
    nedenOlusur: 'Aslında hastalık değil, iç organ yetmezliği belirtisi. İçeride sıvı birikir, deri gerilir.',
    tedavi: {
      adimlar: [
        'Antibiyotik başla (erken evre)',
        'Epsom tuzu banyosu (osmotik destek)',
        'Karantinaya al',
        'Kaliteli, sindirimi kolay yem ver',
        'Su kalitesini mükemmel tut'
      ],
      ilaclar: ['Kanamycin', 'Epsom tuzu', 'Maracyn 2'],
      sure: '14+ gün',
      pipiNot: '⚠️ İleri evrede kurtulma şansı çok düşük. Erken müdahale şart!'
    }
  },
  {
    id: 'popeye',
    isim: 'Popeye (Göz Şişmesi)',
    latinIsim: 'Exophthalmia',
    kategori: 'bakteri',
    emoji: '👁️',
    tehlikeSeviyesi: 'orta',
    belirtiler: [
      'Tek veya çift göz şişkin',
      'Bulanık göz',
      'Göz çevresi kızarık',
      'Göz patlak görünümü',
      'İştahsızlık'
    ],
    ayirtEdici: 'Tek gözse genelde travma, iki gözse enfeksiyon',
    pipiSorular: [
      { soru: 'Göz belirgin şekilde şişmiş mi?', puan: 40 },
      { soru: 'Tek göz mü yoksa iki göz mü?', puan: 20 },
      { soru: 'Göz bulanık mı?', puan: 20 }
    ],
    nedenOlusur: 'Göz arkasında sıvı veya enfeksiyon birikimi. Travma veya kötü su kalitesi sebep olabilir.',
    tedavi: {
      adimlar: [
        'Su kalitesini düzelt',
        'Antibakteriyel ilaç kullan',
        'Tek gözse bekle (travma iyileşir)',
        'İki gözse antibiyotik şart',
        'Epsom tuzu banyosu yardımcı olabilir'
      ],
      ilaclar: ['Kanamycin', 'Maracyn', 'Epsom tuzu'],
      sure: '7-14 gün',
      pipiNot: 'Tek göz = muhtemelen çarpmış. İki göz = su kalitesi veya enfeksiyon.'
    }
  },
  {
    id: 'kizariklik',
    isim: 'Kızarıklık Hastalığı',
    latinIsim: 'Hemorrhagic Septicemia',
    kategori: 'bakteri',
    emoji: '🔴',
    tehlikeSeviyesi: 'yuksek',
    belirtiler: [
      'Vücutta kanlı çizgiler',
      'Yüzgeç diplerinde kızarıklık',
      'Ani ölümler',
      'Şişkin karın',
      'Soluk solungaçlar'
    ],
    ayirtEdici: 'Kanlı çizgiler ve kızarık noktalar vücutta',
    pipiSorular: [
      { soru: 'Vücutta kırmızı çizgiler var mı?', puan: 35 },
      { soru: 'Yüzgeç diplerinde kızarıklık var mı?', puan: 30 },
      { soru: 'Ani ölümler oldu mu?', puan: 20 }
    ],
    nedenOlusur: 'Damar sistemini etkileyen ciddi bakteriyel enfeksiyon.',
    tedavi: {
      adimlar: [
        'Geniş spektrum antibiyotik başla',
        '%50 acil su değişimi',
        'Karantinaya al',
        'Diğer balıkları yakından izle',
        'Stres faktörlerini ortadan kaldır'
      ],
      ilaclar: ['Kanamycin', 'Nitrofurazone', 'API Triple Sulfa'],
      sure: '10-14 gün',
      pipiNot: 'Bulaşıcı! Hasta balığı hemen ayır!'
    }
  },

  // ========== VİRAL HASTALIKLAR ==========
  {
    id: 'lymphocystis',
    isim: 'Lymphocystis',
    latinIsim: 'Lymphocystis disease virus',
    kategori: 'viral',
    emoji: '🫧',
    tehlikeSeviyesi: 'dusuk',
    belirtiler: [
      'Karnabahar gibi beyaz çıkıntılar',
      'Yavaş ilerleme',
      'Yüzgeçlerde nodüller',
      'Genel sağlık iyi',
      'İştah normal'
    ],
    ayirtEdici: 'Karnabahar benzeri yapı, ama balık sağlıklı görünür',
    pipiSorular: [
      { soru: 'Karnabahar gibi çıkıntılar var mı?', puan: 40 },
      { soru: 'Çok yavaş mı ilerledi?', puan: 25 },
      { soru: 'Balık genel olarak sağlıklı mı?', puan: 20 }
    ],
    nedenOlusur: 'Viral, iyi huylu tümör benzeri yapı. Virüsler antibiyotikle tedavi edilemez.',
    tedavi: {
      adimlar: [
        'İlaç tedavisi YOK (viral)',
        'Stresi azalt',
        'Bağışıklığı güçlendir (kaliteli yem)',
        'Sabırlı ol, genelde kendiliğinden geriler',
        'Su kalitesini mükemmel tut'
      ],
      ilaclar: ['İlaç yok - destekleyici bakım'],
      sure: 'Haftalar-aylar (kendiliğinden)',
      pipiNot: 'Panik yapma! Genelde ölümcül değil ve kendiliğinden iyileşir.'
    }
  },

  // ========== ORTAM KAYNAKLI ==========
  {
    id: 'amonyak',
    isim: 'Amonyak Zehirlenmesi',
    latinIsim: 'Ammonia Poisoning',
    kategori: 'ortam',
    emoji: '☠️',
    tehlikeSeviyesi: 'kritik',
    belirtiler: [
      'Kızarık solungaçlar',
      'Yüzeye çıkma (nefes almaya çalışma)',
      'Ani ölümler',
      'Hareketsizlik',
      'Renk kararması'
    ],
    ayirtEdici: 'Solungaçlar kıpkırmızı yanık gibi görünür',
    pipiSorular: [
      { soru: 'Solungaçlar çok kırmızı mı?', puan: 35 },
      { soru: 'Balıklar yüzeyde nefes almaya mı çalışıyor?', puan: 30 },
      { soru: 'Son zamanlarda ani ölüm oldu mu?', puan: 20 }
    ],
    nedenOlusur: 'Amonyak balığın solungaçlarını yakar. Yeni kurulum, aşırı yemleme veya filtre arızası sebep olur.',
    tedavi: {
      adimlar: [
        'ACİL %50 su değişimi!',
        'Filtre kontrolü yap',
        'Yemi tamamen kes (2-3 gün)',
        'Zeolit veya amonyak bağlayıcı ekle',
        'Prime gibi su düzenleyici kullan'
      ],
      ilaclar: ['Seachem Prime', 'Zeolit', 'API Ammo Lock'],
      sure: 'Acil müdahale',
      pipiNot: 'Test kiti ile amonyak ölç! 0 olmalı!'
    }
  },
  {
    id: 'nitrit',
    isim: 'Nitrit Zehirlenmesi',
    latinIsim: 'Nitrite Poisoning',
    kategori: 'ortam',
    emoji: '🧪',
    tehlikeSeviyesi: 'yuksek',
    belirtiler: [
      'Hızlı nefes alma',
      'Donuk renk',
      'Hareketsizlik',
      'Solungaçlar kahverengi',
      'Yüzeyde toplanma'
    ],
    ayirtEdici: 'Solungaçlar kahverengimsi (nitrit kanı etkiler)',
    pipiSorular: [
      { soru: 'Solungaçlar kahverengi mi?', puan: 35 },
      { soru: 'Balıklar çok hızlı nefes alıyor mu?', puan: 30 },
      { soru: 'Yeni akvaryum mu (2 ay altı)?', puan: 20 }
    ],
    nedenOlusur: 'Nitrit kanın oksijen taşıma kapasitesini engeller. Yeni akvaryumlarda sık görülür.',
    tedavi: {
      adimlar: [
        'Tuz ekle (1g/L) - klorür nitriti bloke eder',
        '%50 su değişimi',
        'Filtrasyon iyileştir',
        'Yemi azalt',
        'Bakteri takviyesi ekle'
      ],
      ilaclar: ['Akvaryum tuzu', 'Seachem Prime', 'Bakteri kültürü'],
      sure: '3-7 gün',
      pipiNot: 'TUZ çok önemli! Klorür iyonu nitriti bloke eder.'
    }
  },
  {
    id: 'oksijen',
    isim: 'Oksijen Eksikliği',
    latinIsim: 'Hypoxia',
    kategori: 'ortam',
    emoji: '💨',
    tehlikeSeviyesi: 'orta',
    belirtiler: [
      'Sürekli yüzeyde soluma',
      'Filtre çıkışında toplanma',
      'Ağız açık hızlı soluma',
      'Hareketsizlik',
      'Solungaç kapakları hızlı açılıp kapanır'
    ],
    ayirtEdici: 'TÜM balıklar yüzeyde toplanır',
    pipiSorular: [
      { soru: 'Balıklar yüzeyde nefes almaya mı çalışıyor?', puan: 35 },
      { soru: 'Filtre çıkışında mı toplanıyorlar?', puan: 30 },
      { soru: 'Hava taşı veya yüzey hareketi var mı?', puan: 20 }
    ],
    nedenOlusur: 'Suda çözünmüş oksijen yetersizliği. Aşırı stok, sıcaklık artışı veya havalandırma eksikliği.',
    tedavi: {
      adimlar: [
        'Hava taşı ekle',
        'Filtre çıkışını yüzeye yönlendir',
        'Sıcaklığı kontrol et (düşük = daha çok O2)',
        'Balık sayısını gözden geçir',
        'Bitkiler gece oksijen tüketir, dikkat!'
      ],
      ilaclar: ['Hava pompası', 'Hava taşı'],
      sure: 'Anında iyileşme',
      pipiNot: 'Yüzey hareketi = oksijen girişi. Durgun su kötü!'
    }
  },
  {
    id: 'isi_sok',
    isim: 'Isı Şoku',
    latinIsim: 'Temperature Shock',
    kategori: 'ortam',
    emoji: '🌡️',
    tehlikeSeviyesi: 'yuksek',
    belirtiler: [
      'Ani renk solması',
      'Dengesiz yüzme',
      'Yan yatma',
      'Panik hareketler',
      'Dibe çökme'
    ],
    ayirtEdici: 'Su değişimi veya yeni ekleme sonrası ani başlangıç',
    pipiSorular: [
      { soru: 'Son zamanlarda su değişimi yaptın mı?', puan: 30 },
      { soru: 'Belirtiler ani mi başladı?', puan: 35 },
      { soru: 'Isıtıcı arızası oldu mu?', puan: 20 }
    ],
    nedenOlusur: 'Ani sıcaklık değişimi hücre stresine yol açar. 2-3°C bile ani değişim şok yaratabilir.',
    tedavi: {
      adimlar: [
        'Sıcaklığı YAVAŞÇA ideal seviyeye çek',
        'Ani müdahale YAPMA',
        'Balıkları karanlıkta dinlendir',
        'Stres azaltıcı (Prime vb) ekle',
        'Su değişimlerinde sıcaklık eşitle'
      ],
      ilaclar: ['Seachem Prime', 'Stres Guard'],
      sure: '24-48 saat',
      pipiNot: 'Su değişiminde her zaman sıcaklığı eşitle!'
    }
  },
  {
    id: 'ph_sok',
    isim: 'pH Şoku',
    latinIsim: 'pH Shock',
    kategori: 'ortam',
    emoji: '⚗️',
    tehlikeSeviyesi: 'yuksek',
    belirtiler: [
      'Panik yüzme',
      'Zıplama',
      'Ani ölümler',
      'Mukus artışı',
      'Solungaç hasarı'
    ],
    ayirtEdici: 'Su değişimi sonrası panik ve zıplama',
    pipiSorular: [
      { soru: 'Su değişimi sonrası mı başladı?', puan: 35 },
      { soru: 'Balıklar panik içinde mi?', puan: 30 },
      { soru: 'Musluk suyu ile akvaryum pH\'ı farklı mı?', puan: 20 }
    ],
    nedenOlusur: 'Hızlı pH değişimi osmotik şok yaratır. Musluk suyu ile akvaryum pH farkı tehlikeli.',
    tedavi: {
      adimlar: [
        'pH\'ı kademeli düzelt (günde max 0.2)',
        'Ani tampon ürünlerinden kaçın',
        'Su değişimlerini küçük tut (%10-15)',
        'Musluk suyunu dinlendir',
        'Doğal tamponlar kullan (almond leaf vb)'
      ],
      ilaclar: ['Seachem Prime', 'Indian Almond Leaf'],
      sure: '24-72 saat',
      pipiNot: 'pH\'ı ani değiştirme! Yavaş adaptasyon şart.'
    }
  },

  // ========== DAVRANIŞ/BESLENME KAYNAKLI ==========
  {
    id: 'kabizlik',
    isim: 'Kabızlık',
    latinIsim: 'Constipation',
    kategori: 'beslenme',
    emoji: '🫄',
    tehlikeSeviyesi: 'dusuk',
    belirtiler: [
      'Şiş karın',
      'Dışkı çıkmaması',
      'Dipte durma',
      'İştahsızlık',
      'Az hareket'
    ],
    ayirtEdici: 'Karın şiş ama pullar normal (Dropsy\'den farkı)',
    pipiSorular: [
      { soru: 'Karın şiş ama pullar normal mi?', puan: 35 },
      { soru: 'Dışkı çıkmıyor mu?', puan: 35 },
      { soru: 'Protein ağırlıklı besleniyor mu?', puan: 15 }
    ],
    nedenOlusur: 'Protein ağırlıklı yem + lif eksikliği. Özellikle japon balıklarında sık.',
    tedavi: {
      adimlar: [
        '24-48 saat aç bırak',
        'Haşlanmış, kabuğu soyulmuş bezelye ver',
        'Canlı yemi geçici kes',
        'Daphnia ver (doğal laksatif)',
        'Sıcaklığı hafif artır (sindirimi hızlandırır)'
      ],
      ilaclar: ['Bezelye', 'Daphnia'],
      sure: '2-3 gün',
      pipiNot: 'Bezelye mucize! Kabuğunu soy ve ez.'
    }
  },
  {
    id: 'asiri_yem',
    isim: 'Aşırı Yemleme',
    latinIsim: 'Overfeeding',
    kategori: 'beslenme',
    emoji: '🍽️',
    tehlikeSeviyesi: 'dusuk',
    belirtiler: [
      'Su bulanıklığı',
      'Dipte yem birikimi',
      'Balıklar halsiz',
      'Amonyak/nitrit yükselir',
      'Alg patlaması'
    ],
    ayirtEdici: 'Dipte yem kalıntısı görülür, su bulanık',
    pipiSorular: [
      { soru: 'Dipte yem kalıntısı var mı?', puan: 35 },
      { soru: 'Su bulanık mı?', puan: 30 },
      { soru: 'Günde 1\'den fazla yemleme yapıyor musun?', puan: 20 }
    ],
    nedenOlusur: 'Fazla yem su kalitesini bozar, dolaylı olarak hastalıklara zemin hazırlar.',
    tedavi: {
      adimlar: [
        'Yemlemeyi günde 1 kez, 2 dakikada bitecek kadar azalt',
        'Dip çekimi yap',
        '%30 su değişimi',
        'Filtreyi kontrol et',
        'NO3 test et ve düşür'
      ],
      ilaclar: ['Yok - bakım gerekli'],
      sure: '3-5 gün',
      pipiNot: 'Balıklar aç kalmaz! 2 dakikada yemeli.'
    }
  },
  {
    id: 'stres',
    isim: 'Stres',
    latinIsim: 'Chronic Stress',
    kategori: 'beslenme',
    emoji: '😰',
    tehlikeSeviyesi: 'dusuk',
    belirtiler: [
      'Renk kararması/solması',
      'Saklanma',
      'İştahsızlık',
      'Yüzgeç sıkma',
      'Köşelerde durma'
    ],
    ayirtEdici: 'Görünür hastalık yok ama balık mutsuz',
    pipiSorular: [
      { soru: 'Balık sürekli saklanan mı?', puan: 30 },
      { soru: 'Rengi soluk mu?', puan: 25 },
      { soru: 'Akvaryumda agresif balık var mı?', puan: 25 }
    ],
    nedenOlusur: 'Stres bağışıklık sistemini çökertir. Uyumsuz türler, az saklanma alanı, aşırı ışık sebep olur.',
    tedavi: {
      adimlar: [
        'Saklanma alanı ekle (mağara, bitki)',
        'Uyumsuz/agresif balığı ayır',
        'Işık süresini 8 saate düşür',
        'Ani hareketlerden kaçın',
        'Su kalitesini optimize et'
      ],
      ilaclar: ['Stres Guard', 'Indian Almond Leaf'],
      sure: '1-2 hafta',
      pipiNot: 'Stres tüm hastalıkların kapısını açar!'
    }
  }
];

// Kategori bilgileri
export const kategoriler = {
  parazit: { isim: 'Parazit Hastalıkları', emoji: '🦠', renk: '#e74c3c' },
  mantar: { isim: 'Mantar Hastalıkları', emoji: '🍄', renk: '#9b59b6' },
  bakteri: { isim: 'Bakteriyel Hastalıklar', emoji: '🧫', renk: '#e67e22' },
  viral: { isim: 'Viral Hastalıklar', emoji: '🧬', renk: '#3498db' },
  ortam: { isim: 'Ortam Kaynaklı', emoji: '🌡️', renk: '#1abc9c' },
  beslenme: { isim: 'Beslenme/Davranış', emoji: '🍽️', renk: '#f39c12' }
};

// Tehlike seviyeleri
export const tehlikeSeviyeleri = {
  dusuk: { isim: 'Düşük', renk: '#27ae60', emoji: '🟢' },
  orta: { isim: 'Orta', renk: '#f39c12', emoji: '🟡' },
  yuksek: { isim: 'Yüksek', renk: '#e67e22', emoji: '🟠' },
  kritik: { isim: 'Kritik', renk: '#e74c3c', emoji: '🔴' }
};

export default hastaliklar;
