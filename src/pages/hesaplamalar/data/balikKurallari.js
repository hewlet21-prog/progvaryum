// src/pages/balikRehberi/data/balikKurallari.js
// Balık Stok Hesaplama Kuralları - akvaryum.com araştırmasına dayalı

const balikKurallari = {
  // ==================== CANLI DOĞURANLAR ====================
  'lepistes': {
    pisinkoloji: 'Sürü balığı, 1 erkek 3 dişi oranı ideal. Erkekler arası rekabet olabilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 20; // İlk balık için
      const ekstra = Math.max(0, adet - 1) * 3; // Her ek balık için 3L
      return baz + ekstra;
    }
  },
  
  'molly': {
    pisinkoloji: 'Topluluk balığı, tuzlu su toleransı var. 1 erkek 2-3 dişi oranı önerilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 30;
      const ekstra = Math.max(0, adet - 1) * 5;
      return baz + ekstra;
    }
  },
  
  'platy': {
    pisinkoloji: 'Barışçıl topluluk balığı. Kolay ürer.',
    hesapla: (adet, erkek, disi) => {
      const baz = 20;
      const ekstra = Math.max(0, adet - 1) * 3;
      return baz + ekstra;
    }
  },
  
  'kilickuyruk': {
    pisinkoloji: 'Aktif yüzücü, atlama eğilimi var. Erkekler kavgacı olabilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 30;
      const ekstra = Math.max(0, adet - 1) * 5;
      return baz + ekstra;
    }
  },
  
  'endler': {
    pisinkoloji: 'Nano balık, sürü halinde daha güzel. Lepistes ile melezlenebilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 15;
      const ekstra = Math.max(0, adet - 1) * 2;
      return baz + ekstra;
    }
  },

  // ==================== MALAWİ CİKLETLERİ - MBUNA ====================
  'yellow-lab': {
    pisinkoloji: 'En barışçıl Mbuna. Aşırı stoklama agresyonu azaltır.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 15;
      return baz + ekstra;
    }
  },
  
  'demasoni': {
    pisinkoloji: 'ÇOK AGRESİF! Minimum 12 adet şart. Aşırı kalabalık gerekli.',
    hesapla: (adet, erkek, disi) => {
      const baz = 150;
      const ekstra = Math.max(0, adet - 1) * 10;
      return baz + ekstra;
    }
  },
  
  'zebra': {
    pisinkoloji: 'Tipik Mbuna agresyonu. Tek erkek çok dişi oranı şart.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 15;
      return baz + ekstra;
    }
  },
  
  'auratus': {
    pisinkoloji: 'EN AGRESİF MBUNA! Genellikle önerilmez. Tank arkadaşlarını öldürebilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 150;
      const ekstra = Math.max(0, adet - 1) * 20;
      return baz + ekstra;
    }
  },
  
  'acei': {
    pisinkoloji: 'Barışçıl Mbuna. Peacock/Hap tankına eklenebilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 12;
      return baz + ekstra;
    }
  },
  
  'socolofi': {
    pisinkoloji: 'Orta seviye agresif Mbuna.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 15;
      return baz + ekstra;
    }
  },
  
  'rusty': {
    pisinkoloji: 'Barışçıl Mbuna. Peacock tankına uygun.',
    hesapla: (adet, erkek, disi) => {
      const baz = 80;
      const ekstra = Math.max(0, adet - 1) * 12;
      return baz + ekstra;
    }
  },
  
  'kenyi': {
    pisinkoloji: 'Agresif Mbuna. Dişiler sarı, erkekler mavi.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 15;
      return baz + ekstra;
    }
  },
  
  'bumblebee': {
    pisinkoloji: 'Büyük ve agresif. 20cm+ büyür.',
    hesapla: (adet, erkek, disi) => {
      const baz = 150;
      const ekstra = Math.max(0, adet - 1) * 25;
      return baz + ekstra;
    }
  },
  
  'saulosi': {
    pisinkoloji: 'Erkek mavi, dişi sarı. Nispeten barışçıl.',
    hesapla: (adet, erkek, disi) => {
      const baz = 80;
      const ekstra = Math.max(0, adet - 1) * 10;
      return baz + ekstra;
    }
  },

  // ==================== MALAWİ CİKLETLERİ - PEACOCK ====================
  'german-red': {
    pisinkoloji: 'Çekingen peacock. Agresif türlerle strese girer.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 20;
      return baz + ekstra;
    }
  },
  
  'ob-peacock': {
    pisinkoloji: 'Hibrit peacock. Daha dayanıklı.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 20;
      return baz + ekstra;
    }
  },
  
  'eureka-red': {
    pisinkoloji: 'German Red den daha cesur.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 20;
      return baz + ekstra;
    }
  },
  
  'yellow-benga': {
    pisinkoloji: 'Hassas peacock. Sakin tanklarda renklenir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 20;
      return baz + ekstra;
    }
  },

  // ==================== MALAWİ CİKLETLERİ - HAP ====================
  'taiwan-reef': {
    pisinkoloji: 'Dominant olabilir. Güzel renkler.',
    hesapla: (adet, erkek, disi) => {
      const baz = 150;
      const ekstra = Math.max(0, adet - 1) * 25;
      return baz + ekstra;
    }
  },
  
  'venustus': {
    pisinkoloji: 'YIRTICI! 25cm+ büyür. Küçük balıkları yer.',
    hesapla: (adet, erkek, disi) => {
      const baz = 200;
      const ekstra = Math.max(0, adet - 1) * 40;
      return baz + ekstra;
    }
  },
  
  'electric-blue-ahli': {
    pisinkoloji: 'Yırtıcı hap. Benzer türlere agresif.',
    hesapla: (adet, erkek, disi) => {
      const baz = 150;
      const ekstra = Math.max(0, adet - 1) * 30;
      return baz + ekstra;
    }
  },
  
  'moori': {
    pisinkoloji: 'Barışçıl hap. Delfin kafa.',
    hesapla: (adet, erkek, disi) => {
      const baz = 150;
      const ekstra = Math.max(0, adet - 1) * 25;
      return baz + ekstra;
    }
  },

  // ==================== AMERİKA CİKLETLERİ ====================
  'oscar': {
    pisinkoloji: 'YIRTICI DEV! 35cm büyür. Çok zeki, sahiplerine bağlanır.',
    hesapla: (adet, erkek, disi) => {
      const baz = 300;
      const ekstra = Math.max(0, adet - 1) * 100;
      return baz + ekstra;
    }
  },
  
  'severum': {
    pisinkoloji: 'Nispeten barışçıl SA ciklet. 20cm büyür.',
    hesapla: (adet, erkek, disi) => {
      const baz = 150;
      const ekstra = Math.max(0, adet - 1) * 40;
      return baz + ekstra;
    }
  },
  
  'ates-agiz': {
    pisinkoloji: 'Orta agresif. Karma tanklara uygun olabilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 120;
      const ekstra = Math.max(0, adet - 1) * 30;
      return baz + ekstra;
    }
  },
  
  'texas': {
    pisinkoloji: 'AŞIRI AGRESİF! Genellikle tek bakılmalı.',
    hesapla: (adet, erkek, disi) => {
      const baz = 250;
      const ekstra = Math.max(0, adet - 1) * 80;
      return baz + ekstra;
    }
  },
  
  'jack-dempsey': {
    pisinkoloji: 'Agresif. 25cm büyür.',
    hesapla: (adet, erkek, disi) => {
      const baz = 200;
      const ekstra = Math.max(0, adet - 1) * 50;
      return baz + ekstra;
    }
  },
  
  'convict': {
    pisinkoloji: 'Küçük ama ÇOK agresif! Üreme döneminde tehlikeli.',
    hesapla: (adet, erkek, disi) => {
      const baz = 80;
      const ekstra = Math.max(0, adet - 1) * 20;
      return baz + ekstra;
    }
  },
  
  'discus': {
    pisinkoloji: 'AKVARYUM KRALI! Çok hassas. 6+ adet şart.',
    hesapla: (adet, erkek, disi) => {
      const baz = 200;
      const ekstra = Math.max(0, adet - 1) * 40;
      return baz + ekstra;
    }
  },
  
  'melek': {
    pisinkoloji: 'Zarif ama yırtıcı. Küçük tetraları yiyebilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 80;
      const ekstra = Math.max(0, adet - 1) * 25;
      return baz + ekstra;
    }
  },

  // ==================== CÜCE CİKLETLER ====================
  'ram': {
    pisinkoloji: 'Hassas cüce ciklet. Sıcak su ve yumuşak su sever.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 15;
      return baz + ekstra;
    }
  },
  
  'apistogramma': {
    pisinkoloji: 'Bölgeci ama küçük. Mağara lazım.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 15;
      return baz + ekstra;
    }
  },
  
  'kribensis': {
    pisinkoloji: 'Dayanıklı. Üreme döneminde agresif.',
    hesapla: (adet, erkek, disi) => {
      const baz = 50;
      const ekstra = Math.max(0, adet - 1) * 20;
      return baz + ekstra;
    }
  },

  // ==================== LABİRENTLİLER ====================
  'betta': {
    pisinkoloji: 'ERKEKLER BİRLİKTE OLMAZ! Tek erkek kuralı.',
    hesapla: (adet, erkek, disi) => {
      if (erkek > 1) return 9999; // İmkansız
      const baz = 20;
      const ekstra = Math.max(0, disi) * 10;
      return baz + ekstra;
    }
  },
  
  'gurami-mavicuce': {
    pisinkoloji: 'Çok barışçıl gurami.',
    hesapla: (adet, erkek, disi) => {
      const baz = 30;
      const ekstra = Math.max(0, adet - 1) * 8;
      return baz + ekstra;
    }
  },
  
  'gurami-inci': {
    pisinkoloji: 'Güzel, nispeten barışçıl.',
    hesapla: (adet, erkek, disi) => {
      const baz = 60;
      const ekstra = Math.max(0, adet - 1) * 15;
      return baz + ekstra;
    }
  },
  
  'gurami-altin': {
    pisinkoloji: '15cm büyür. Erkekler kavga edebilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 80;
      const ekstra = Math.max(0, adet - 1) * 20;
      return baz + ekstra;
    }
  },
  
  'gurami-dev': {
    pisinkoloji: '60cm+ büyür! Dev tank lazım.',
    hesapla: (adet, erkek, disi) => {
      const baz = 500;
      const ekstra = Math.max(0, adet - 1) * 150;
      return baz + ekstra;
    }
  },

  // ==================== TETRALAR ====================
  'neon-tetra': {
    pisinkoloji: 'Klasik sürü balığı. 10+ adet şart.',
    hesapla: (adet, erkek, disi) => {
      const baz = 30;
      const ekstra = Math.max(0, adet - 1) * 2;
      return baz + ekstra;
    }
  },
  
  'cardinal-tetra': {
    pisinkoloji: 'Neondan daha hassas. Discus tankı için ideal.',
    hesapla: (adet, erkek, disi) => {
      const baz = 30;
      const ekstra = Math.max(0, adet - 1) * 2;
      return baz + ekstra;
    }
  },
  
  'rummy-nose': {
    pisinkoloji: 'Su kalitesi göstergesi. Kırmızı burun solgunsa stresli.',
    hesapla: (adet, erkek, disi) => {
      const baz = 30;
      const ekstra = Math.max(0, adet - 1) * 2;
      return baz + ekstra;
    }
  },
  
  'serpae-tetra': {
    pisinkoloji: 'YÜZGEÇ ISIRICI! Uzun yüzgeçli balıklardan uzak tutun.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 3;
      return baz + ekstra;
    }
  },
  
  'buenos-aires': {
    pisinkoloji: 'BİTKİ YER! Bitkili akvaryum için uygun değil.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 4;
      return baz + ekstra;
    }
  },
  
  'congo-tetra': {
    pisinkoloji: 'Büyük tetra (8cm). Güzel yüzgeçler.',
    hesapla: (adet, erkek, disi) => {
      const baz = 60;
      const ekstra = Math.max(0, adet - 1) * 8;
      return baz + ekstra;
    }
  },
  
  'black-skirt': {
    pisinkoloji: 'Dayanıklı başlangıç tetrası.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 4;
      return baz + ekstra;
    }
  },

  // ==================== SAZANGİLLER ====================
  'tiger-barb': {
    pisinkoloji: 'YÜZGEÇ ISIRICI! 8+ adet şart. Melek, betta ile OLMAZ!',
    hesapla: (adet, erkek, disi) => {
      const baz = 60;
      const ekstra = Math.max(0, adet - 1) * 5;
      return baz + ekstra;
    }
  },
  
  'cherry-barb': {
    pisinkoloji: 'Barışçıl barbus. Erkekler parlak kırmızı.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 4;
      return baz + ekstra;
    }
  },
  
  'odessa-barb': {
    pisinkoloji: 'Tiger barb kadar agresif değil.',
    hesapla: (adet, erkek, disi) => {
      const baz = 50;
      const ekstra = Math.max(0, adet - 1) * 5;
      return baz + ekstra;
    }
  },
  
  'tinfoil-barb': {
    pisinkoloji: '35cm BÜYÜR! Çok büyük tank lazım.',
    hesapla: (adet, erkek, disi) => {
      const baz = 300;
      const ekstra = Math.max(0, adet - 1) * 50;
      return baz + ekstra;
    }
  },
  
  'zebra-danio': {
    pisinkoloji: 'Çok dayanıklı ve hızlı. Yavaş balıkları rahatsız edebilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 30;
      const ekstra = Math.max(0, adet - 1) * 3;
      return baz + ekstra;
    }
  },
  
  'giant-danio': {
    pisinkoloji: '10cm büyür. Hızlı yüzücü.',
    hesapla: (adet, erkek, disi) => {
      const baz = 60;
      const ekstra = Math.max(0, adet - 1) * 8;
      return baz + ekstra;
    }
  },

  // ==================== KORİDORAS ====================
  'corydoras-bronze': {
    pisinkoloji: 'Mükemmel topluluk balığı. Yumuşak kum tercih eder.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 5;
      return baz + ekstra;
    }
  },
  
  'corydoras-panda': {
    pisinkoloji: 'Sevimli ama biraz hassas. Serin su sever.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 5;
      return baz + ekstra;
    }
  },
  
  'corydoras-sterbai': {
    pisinkoloji: 'Sıcak suya dayanıklı. Discus tankı için ideal.',
    hesapla: (adet, erkek, disi) => {
      const baz = 40;
      const ekstra = Math.max(0, adet - 1) * 5;
      return baz + ekstra;
    }
  },
  
  'corydoras-pygmy': {
    pisinkoloji: 'Nano cory (2cm). Sadece küçük balıklarla.',
    hesapla: (adet, erkek, disi) => {
      const baz = 20;
      const ekstra = Math.max(0, adet - 1) * 2;
      return baz + ekstra;
    }
  },

  // ==================== VATOZ & KATFİSH ====================
  'plecos-common': {
    pisinkoloji: '45cm BÜYÜR! Çoğu akvaryum için uygun değil.',
    hesapla: (adet, erkek, disi) => {
      const baz = 300;
      const ekstra = Math.max(0, adet - 1) * 100;
      return baz + ekstra;
    }
  },
  
  'bristlenose': {
    pisinkoloji: 'İdeal topluluk vatoz. Max 15cm.',
    hesapla: (adet, erkek, disi) => {
      const baz = 80;
      const ekstra = Math.max(0, adet - 1) * 30;
      return baz + ekstra;
    }
  },
  
  'otocinclus': {
    pisinkoloji: 'Harika yosun yiyici ama hassas. Tecrübe gerektirir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 30;
      const ekstra = Math.max(0, adet - 1) * 3;
      return baz + ekstra;
    }
  },
  
  'synodontis': {
    pisinkoloji: 'Afrika tankları için ideal. Gece aktif.',
    hesapla: (adet, erkek, disi) => {
      const baz = 100;
      const ekstra = Math.max(0, adet - 1) * 30;
      return baz + ekstra;
    }
  },
  
  'clown-loach': {
    pisinkoloji: '30cm BÜYÜR! 400L+ tank gerekli.',
    hesapla: (adet, erkek, disi) => {
      const baz = 200;
      const ekstra = Math.max(0, adet - 1) * 40;
      return baz + ekstra;
    }
  },

  // ==================== GÖKKUŞAĞI BALIKLARI ====================
  'boesemani': {
    pisinkoloji: 'Harika renk, barışçıl sürü balığı.',
    hesapla: (adet, erkek, disi) => {
      const baz = 80;
      const ekstra = Math.max(0, adet - 1) * 12;
      return baz + ekstra;
    }
  },
  
  'turquoise': {
    pisinkoloji: 'Aktif, renkli gökkuşağı.',
    hesapla: (adet, erkek, disi) => {
      const baz = 80;
      const ekstra = Math.max(0, adet - 1) * 12;
      return baz + ekstra;
    }
  },

  // ==================== JAPON BALIKLARI ====================
  'japon-fantail': {
    pisinkoloji: 'SOĞUK SU BALIGI! Tropikal ile OLMAZ!',
    hesapla: (adet, erkek, disi) => {
      const baz = 75;
      const ekstra = Math.max(0, adet - 1) * 40;
      return baz + ekstra;
    }
  },
  
  'japon-oranda': {
    pisinkoloji: 'Yavaş, sadece benzer yavaş japonlarla.',
    hesapla: (adet, erkek, disi) => {
      const baz = 75;
      const ekstra = Math.max(0, adet - 1) * 40;
      return baz + ekstra;
    }
  },
  
  'japon-commet': {
    pisinkoloji: 'HAVUZ BALIGI! 30cm+ büyür.',
    hesapla: (adet, erkek, disi) => {
      const baz = 150;
      const ekstra = Math.max(0, adet - 1) * 75;
      return baz + ekstra;
    }
  },

  // ==================== KARİDESLER ====================
  'cherry-shrimp': {
    pisinkoloji: 'Balıklar tarafından yenir. Türe özgü tank önerilir.',
    hesapla: (adet, erkek, disi) => {
      const baz = 10;
      const ekstra = Math.max(0, adet - 1) * 0.5;
      return baz + ekstra;
    }
  },
  
  'amano-shrimp': {
    pisinkoloji: 'Yosun yeme şampiyonu. Cherry den büyük.',
    hesapla: (adet, erkek, disi) => {
      const baz = 15;
      const ekstra = Math.max(0, adet - 1) * 2;
      return baz + ekstra;
    }
  }
};

export default balikKurallari;