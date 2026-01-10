import React, { useRef, useEffect, useState } from "react";

// PNG dosyası olan balıklar - dosya adı eşleştirmesi
const PNG_FILES = {
  // === CANLI DOĞURANLAR (23 balık) ===
  "Lepistes (Guppy)": "guppy.png",
  "Guppy": "guppy.png",
  "Siyah Molly": "molly-siyah.png",
  "Molly": "molly-siyah.png",
  "Balloon Molly": "molly-balloon.png",
  "Sailfin Molly": "molly-sailfin.png",
  "Dalmaçyalı Molly": "molly-dalmatian.png",
  "Plati": "plati.png",
  "Mickey Mouse Plati": "plati-mickey.png",
  "Kılıçkuyruk": "kilickuyruk.png",
  "Swordtail": "kilickuyruk.png",
  "Kırmızı Kılıçkuyruk": "kilickuyruk-kirmizi.png",
  "Endler": "endler.png",
  "Sivrisinek Balığı (Gambusya)": "gambusya.png",
  "Gambusya": "gambusya.png",
  "Cüce Canlı Doğuran": "heterandria-formosa.png",
  "Heterandria Formosa": "heterandria-formosa.png",
  "Çizgili Limia": "limia-nigrofasciata.png",
  "Limia": "limia-nigrofasciata.png",
  "Blue-eye Livebearer": "priapella-intermedia.png",
  "Priapella": "priapella-intermedia.png",
  "Red-tail Goodeid": "xenotoca-eiseni.png",
  "Xenotoca": "xenotoca-eiseni.png",
  "Metalik Girardinus": "girardinus-metallicus.png",
  "Girardinus": "girardinus-metallicus.png",
  "Knife Livebearer": "alfaro-cultratus.png",
  "Alfaro": "alfaro-cultratus.png",
  "Yucatan Molly": "poecilia-velifera.png",
  "Poecilia Velifera": "poecilia-velifera.png",
  "Cobra Guppy": "guppy-cobra.png",
  "Tuxedo Guppy": "guppy-tuxedo.png",
  "Dumbo Ear Guppy": "guppy-dumbo.png",
  "Dumbo Guppy": "guppy-dumbo.png",
  "Swamp Guppy": "micropoecilia-picta.png",
  "Micropoecilia": "micropoecilia-picta.png",
  "Değişken Plati": "xiphophorus-variatus.png",
  "Variatus Plati": "xiphophorus-variatus.png",

  // === MALAWİ CİKLETLERİ ===
  "Yellow Lab (Sarı Prenses)": "yellow-lab.png",
  "Sarı Prenses": "yellow-lab.png",
  "Demasoni": "demasoni.png",
  "Red Zebra": "red-zebra.png",
  "Electric Blue Hap": "electric-blue-hap.png",

  // === AMERİKA CİKLETLERİ ===
  "Oscar": "oscar.png",
  "Angel (Melek Balığı)": "angelfish.png",
  "Melek Balığı": "angelfish.png",
  "Angelfish": "angelfish.png",
  "Discus": "discus.png",
  "Severum": "severum.png",
  "Flowerhorn": "flowerhorn.png",
  "Blood Parrot": "blood-parrot.png",

  // === CÜCE CİKLETLER ===
  "German Blue Ram": "ram-cichlid.png",
  "Bolivian Ram": "ram-cichlid.png",
  "Electric Blue Ram": "ram-cichlid.png",
  "Ram Cichlid": "ram-cichlid.png",
  "Alman Mavi Ram": "ram-cichlid.png",
  "Cockatoo Apisto": "apistogramma-cacatuoides.png",
  "Apistogramma": "apistogramma-cacatuoides.png",
  "Kribensis": "kribensis.png",

  // === LABİRENTLİLER ===
  "Betta (Kavgacı Balık)": "betta.png",
  "Betta": "betta.png",
  "Beta": "betta.png",
  "Kavgacı Balık": "betta.png",
  "Cüce Gurami": "dwarf-gourami.png",
  "Dwarf Gourami": "dwarf-gourami.png",
  "Bal Gurami": "honey-gourami.png",
  "Honey Gourami": "honey-gourami.png",
  "İnci Gurami": "pearl-gourami.png",
  "Pearl Gourami": "pearl-gourami.png",
  "Mavi Gurami (Three-Spot)": "blue-gourami.png",
  "Blue Gourami": "blue-gourami.png",

  // === TETRALAR ===
  "Neon Tetra": "neon-tetra.png",
  "Cardinal Tetra": "cardinal-tetra.png",
  "Rummy Nose Tetra": "rummy-nose-tetra.png",
  "Black Neon Tetra": "black-neon-tetra.png",
  "Ember Tetra": "ember-tetra.png",
  "Serpae Tetra": "serpae-tetra.png",
  "Congo Tetra": "congo-tetra.png",
  "Harlequin Rasbora": "harlequin-rasbora.png",

  // === SAZANSİGİLLER ===
  "Kaplan Barb": "tiger-barb.png",
  "Tiger Barb": "tiger-barb.png",
  "Cherry Barb": "cherry-barb.png",
  "Kiraz Barb": "cherry-barb.png",
  "Zebra Danio": "zebra-danio.png",
  "Zebra": "zebra-danio.png",
  "Bala Köpekbalığı": "bala-shark.png",
  "Rainbow Shark": "rainbow-shark.png",

  // === KEDİ BALIKLARI ===
  "Panda Corydoras": "corydoras.png",
  "Sterbai Corydoras": "corydoras.png",
  "Bronz Corydoras": "corydoras.png",
  "Corydoras": "corydoras.png",
  "Kori": "corydoras.png",
  "Bristlenose Pleco": "bristlenose-pleco.png",
  "Pleco": "bristlenose-pleco.png",
  "Otocinclus (Oto)": "otocinclus.png",
  "Otocinclus": "otocinclus.png",

  // === GÖKKUŞAĞI BALIKLARI ===
  "Boesemani Gökkuşağı": "boesemani-rainbow.png",
  "Gökkuşağı Balığı": "boesemani-rainbow.png",

  // === DİĞER ===
  "Japon Balığı (Goldfish)": "japon-baligi.png",
  "Goldfish": "japon-baligi.png",
  "Kuhli Yılanbalığı": "kuhli-loach.png",
  "Dwarfi": "dwarfi.png",
};

const FISH_DB = {
  // === CANLI DOĞURANLAR (23 balık) ===
  "Lepistes (Guppy)": { w: 50, h: 35, speed: 0.3, depth: "top", color: "#ff9800" },
  "Guppy": { w: 50, h: 35, speed: 0.3, depth: "top", color: "#ff9800" },
  "Siyah Molly": { w: 55, h: 35, speed: 0.22, depth: "mid", color: "#1a1a1a" },
  "Molly": { w: 55, h: 35, speed: 0.22, depth: "mid", color: "#333" },
  "Balloon Molly": { w: 50, h: 45, speed: 0.18, depth: "mid", color: "#ffa726" },
  "Sailfin Molly": { w: 65, h: 40, speed: 0.2, depth: "mid", color: "#78909c" },
  "Dalmaçyalı Molly": { w: 55, h: 35, speed: 0.22, depth: "mid", color: "#eeeeee" },
  "Plati": { w: 50, h: 35, speed: 0.25, depth: "mid", color: "#ff5722" },
  "Mickey Mouse Plati": { w: 50, h: 35, speed: 0.25, depth: "mid", color: "#ffeb3b" },
  "Kılıçkuyruk": { w: 70, h: 35, speed: 0.25, depth: "mid", color: "#f44336" },
  "Swordtail": { w: 70, h: 35, speed: 0.25, depth: "mid", color: "#f44336" },
  "Kırmızı Kılıçkuyruk": { w: 70, h: 35, speed: 0.25, depth: "mid", color: "#d32f2f" },
  "Endler": { w: 40, h: 25, speed: 0.32, depth: "top", color: "#76ff03" },
  "Sivrisinek Balığı (Gambusya)": { w: 45, h: 28, speed: 0.28, depth: "top", color: "#90a4ae" },
  "Gambusya": { w: 45, h: 28, speed: 0.28, depth: "top", color: "#90a4ae" },
  "Cüce Canlı Doğuran": { w: 35, h: 20, speed: 0.25, depth: "mid", color: "#8d6e63" },
  "Heterandria Formosa": { w: 35, h: 20, speed: 0.25, depth: "mid", color: "#8d6e63" },
  "Çizgili Limia": { w: 50, h: 32, speed: 0.24, depth: "mid", color: "#ffd54f" },
  "Limia": { w: 50, h: 32, speed: 0.24, depth: "mid", color: "#ffd54f" },
  "Blue-eye Livebearer": { w: 50, h: 30, speed: 0.26, depth: "mid", color: "#90caf9" },
  "Priapella": { w: 50, h: 30, speed: 0.26, depth: "mid", color: "#90caf9" },
  "Red-tail Goodeid": { w: 55, h: 35, speed: 0.22, depth: "mid", color: "#5c6bc0" },
  "Xenotoca": { w: 55, h: 35, speed: 0.22, depth: "mid", color: "#5c6bc0" },
  "Metalik Girardinus": { w: 45, h: 28, speed: 0.26, depth: "mid", color: "#4db6ac" },
  "Girardinus": { w: 45, h: 28, speed: 0.26, depth: "mid", color: "#4db6ac" },
  "Knife Livebearer": { w: 55, h: 30, speed: 0.28, depth: "top", color: "#a5d6a7" },
  "Alfaro": { w: 55, h: 30, speed: 0.28, depth: "top", color: "#a5d6a7" },
  "Yucatan Molly": { w: 75, h: 50, speed: 0.18, depth: "mid", color: "#26a69a" },
  "Poecilia Velifera": { w: 75, h: 50, speed: 0.18, depth: "mid", color: "#26a69a" },
  "Cobra Guppy": { w: 50, h: 35, speed: 0.3, depth: "top", color: "#ffd700" },
  "Tuxedo Guppy": { w: 50, h: 35, speed: 0.3, depth: "top", color: "#e0e0e0" },
  "Dumbo Ear Guppy": { w: 55, h: 40, speed: 0.25, depth: "top", color: "#e91e63" },
  "Dumbo Guppy": { w: 55, h: 40, speed: 0.25, depth: "top", color: "#e91e63" },
  "Swamp Guppy": { w: 38, h: 22, speed: 0.32, depth: "top", color: "#ff5722" },
  "Micropoecilia": { w: 38, h: 22, speed: 0.32, depth: "top", color: "#ff5722" },
  "Değişken Plati": { w: 50, h: 35, speed: 0.25, depth: "mid", color: "#ff9800" },
  "Variatus Plati": { w: 50, h: 35, speed: 0.25, depth: "mid", color: "#ff9800" },

  // === MALAWİ CİKLETLERİ ===
  "Yellow Lab (Sarı Prenses)": { w: 60, h: 40, speed: 0.2, depth: "mid", color: "#fdd835" },
  "Sarı Prenses": { w: 60, h: 40, speed: 0.2, depth: "mid", color: "#fdd835" },
  "Demasoni": { w: 55, h: 35, speed: 0.22, depth: "mid", color: "#1565c0" },
  "Red Zebra": { w: 60, h: 40, speed: 0.2, depth: "mid", color: "#ff7043" },
  "Electric Blue Hap": { w: 70, h: 45, speed: 0.18, depth: "mid", color: "#00b0ff" },

  // === AMERİKA CİKLETLERİ ===
  "Oscar": { w: 100, h: 70, speed: 0.12, depth: "mid", color: "#ff6d00" },
  "Angel (Melek Balığı)": { w: 70, h: 90, speed: 0.15, depth: "mid", color: "#e0e0e0" },
  "Melek Balığı": { w: 70, h: 90, speed: 0.15, depth: "mid", color: "#e0e0e0" },
  "Angelfish": { w: 70, h: 90, speed: 0.15, depth: "mid", color: "#c0c0c0" },
  "Discus": { w: 80, h: 80, speed: 0.12, depth: "mid", color: "#ff6b35" },
  "Severum": { w: 85, h: 70, speed: 0.15, depth: "mid", color: "#81c784" },
  "Flowerhorn": { w: 100, h: 70, speed: 0.12, depth: "mid", color: "#f4511e" },
  "Blood Parrot": { w: 75, h: 65, speed: 0.15, depth: "mid", color: "#ff7043" },

  // === CÜCE CİKLETLER ===
  "German Blue Ram": { w: 50, h: 40, speed: 0.18, depth: "bottom", color: "#42a5f5" },
  "Bolivian Ram": { w: 50, h: 40, speed: 0.18, depth: "bottom", color: "#ffb74d" },
  "Electric Blue Ram": { w: 50, h: 40, speed: 0.18, depth: "bottom", color: "#00b0ff" },
  "Ram Cichlid": { w: 50, h: 40, speed: 0.18, depth: "bottom", color: "#42a5f5" },
  "Alman Mavi Ram": { w: 50, h: 40, speed: 0.18, depth: "bottom", color: "#42a5f5" },
  "Cockatoo Apisto": { w: 50, h: 35, speed: 0.2, depth: "bottom", color: "#ff8a65" },
  "Apistogramma": { w: 50, h: 35, speed: 0.2, depth: "bottom", color: "#ff8a65" },
  "Kribensis": { w: 55, h: 35, speed: 0.2, depth: "bottom", color: "#ce93d8" },

  // === LABİRENTLİLER ===
  "Betta (Kavgacı Balık)": { w: 60, h: 50, speed: 0.12, depth: "top", color: "#e91e63" },
  "Betta": { w: 60, h: 50, speed: 0.12, depth: "top", color: "#e91e63" },
  "Beta": { w: 60, h: 50, speed: 0.12, depth: "top", color: "#e91e63" },
  "Kavgacı Balık": { w: 60, h: 50, speed: 0.12, depth: "top", color: "#e91e63" },
  "Cüce Gurami": { w: 55, h: 45, speed: 0.18, depth: "top", color: "#ff5722" },
  "Dwarf Gourami": { w: 55, h: 45, speed: 0.18, depth: "top", color: "#ff5722" },
  "Bal Gurami": { w: 50, h: 40, speed: 0.18, depth: "top", color: "#ffb300" },
  "Honey Gourami": { w: 50, h: 40, speed: 0.18, depth: "top", color: "#ffb300" },
  "İnci Gurami": { w: 70, h: 50, speed: 0.15, depth: "top", color: "#b39ddb" },
  "Pearl Gourami": { w: 70, h: 50, speed: 0.15, depth: "top", color: "#b39ddb" },
  "Mavi Gurami (Three-Spot)": { w: 70, h: 55, speed: 0.15, depth: "top", color: "#42a5f5" },
  "Blue Gourami": { w: 70, h: 55, speed: 0.15, depth: "top", color: "#42a5f5" },

  // === TETRALAR ===
  "Neon Tetra": { w: 45, h: 25, speed: 0.28, depth: "mid", color: "#00d4ff" },
  "Cardinal Tetra": { w: 45, h: 25, speed: 0.28, depth: "mid", color: "#ff3333" },
  "Rummy Nose Tetra": { w: 50, h: 28, speed: 0.28, depth: "mid", color: "#e0e0e0" },
  "Black Neon Tetra": { w: 45, h: 25, speed: 0.26, depth: "mid", color: "#37474f" },
  "Ember Tetra": { w: 35, h: 20, speed: 0.28, depth: "mid", color: "#ff6d00" },
  "Serpae Tetra": { w: 45, h: 28, speed: 0.28, depth: "mid", color: "#d32f2f" },
  "Congo Tetra": { w: 60, h: 35, speed: 0.24, depth: "mid", color: "#4fc3f7" },
  "Tetra": { w: 45, h: 25, speed: 0.26, depth: "mid", color: "#00bcd4" },
  "Harlequin Rasbora": { w: 45, h: 28, speed: 0.28, depth: "mid", color: "#ffab91" },

  // === SAZANSİGİLLER ===
  "Kaplan Barb": { w: 50, h: 35, speed: 0.35, depth: "mid", color: "#ffa726" },
  "Tiger Barb": { w: 50, h: 35, speed: 0.35, depth: "mid", color: "#ffa726" },
  "Cherry Barb": { w: 45, h: 28, speed: 0.3, depth: "mid", color: "#c62828" },
  "Kiraz Barb": { w: 45, h: 28, speed: 0.3, depth: "mid", color: "#c62828" },
  "Zebra Danio": { w: 50, h: 25, speed: 0.35, depth: "top", color: "#5c6bc0" },
  "Zebra": { w: 50, h: 25, speed: 0.35, depth: "top", color: "#5c6bc0" },
  "Rasbora": { w: 45, h: 25, speed: 0.28, depth: "mid", color: "#ffab91" },
  "Bala Köpekbalığı": { w: 100, h: 35, speed: 0.25, depth: "mid", color: "#b0bec5" },
  "Rainbow Shark": { w: 68, h: 28, speed: 0.25, depth: "bottom", color: "#37474f" },

  // === KEDİ BALIKLARI ===
  "Panda Corydoras": { w: 50, h: 30, speed: 0.2, depth: "bottom", color: "#fff8e1" },
  "Sterbai Corydoras": { w: 55, h: 32, speed: 0.2, depth: "bottom", color: "#8d6e63" },
  "Bronz Corydoras": { w: 55, h: 32, speed: 0.2, depth: "bottom", color: "#cd7f32" },
  "Corydoras": { w: 50, h: 30, speed: 0.2, depth: "bottom", color: "#cd7f32" },
  "Kori": { w: 50, h: 30, speed: 0.2, depth: "bottom", color: "#cd7f32" },
  "Bristlenose Pleco": { w: 70, h: 35, speed: 0.1, depth: "bottom", color: "#4e342e" },
  "Pleco": { w: 70, h: 35, speed: 0.1, depth: "bottom", color: "#4e342e" },
  "Otocinclus (Oto)": { w: 40, h: 20, speed: 0.15, depth: "bottom", color: "#9e9d24" },
  "Otocinclus": { w: 40, h: 20, speed: 0.15, depth: "bottom", color: "#9e9d24" },

  // === GÖKKUŞAĞI BALIKLARI ===
  "Boesemani Gökkuşağı": { w: 60, h: 35, speed: 0.25, depth: "mid", color: "#ff9800" },
  "Gökkuşağı Balığı": { w: 60, h: 35, speed: 0.25, depth: "mid", color: "#ff9800" },

  // === DİĞER ===
  "Japon Balığı (Goldfish)": { w: 80, h: 60, speed: 0.15, depth: "mid", color: "#ff9800" },
  "Goldfish": { w: 80, h: 60, speed: 0.15, depth: "mid", color: "#ff9800" },
  "Kuhli Yılanbalığı": { w: 65, h: 18, speed: 0.18, depth: "bottom", color: "#ff9800" },
  "Dwarfi": { w: 45, h: 35, speed: 0.2, depth: "mid", color: "#4fc3f7" },
};

export default function AquariumVideoCanvas({ akvaryumBilgi, balikEnvanteri, toplamBalik, litreBasinaBalik, yemZamani, kapasite, amonyakVar, nitritVar }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const fishRef = useRef([]);
  const animRef = useRef(null);
  const imagesRef = useRef({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // PNG'leri yükle
  useEffect(() => {
    const uniqueFiles = [...new Set(Object.values(PNG_FILES))];
    let loaded = 0;
    
    uniqueFiles.forEach(file => {
      const img = new Image();
      img.onload = () => {
        imagesRef.current[file] = img;
        loaded++;
        if (loaded >= uniqueFiles.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= uniqueFiles.length) {
          setImagesLoaded(true);
        }
      };
      img.src = `/images/fish/${file}`;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // Canvas ile balık çizimi (PNG yoksa)
    const drawCanvasFish = (x, y, w, h, color, direction, phase) => {
      ctx.save();
      ctx.translate(x, y);
      if (direction < 0) ctx.scale(-1, 1);
      
      const tailWave = Math.sin(phase * 5) * 0.15;
      
      // Gövde
      ctx.beginPath();
      ctx.ellipse(0, 0, w * 0.4, h * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Parlak üst
      ctx.beginPath();
      ctx.ellipse(0, -h * 0.1, w * 0.3, h * 0.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fill();
      
      // Kuyruk
      ctx.beginPath();
      ctx.moveTo(-w * 0.3, 0);
      ctx.lineTo(-w * 0.55, -h * 0.3 + tailWave * h);
      ctx.lineTo(-w * 0.55, h * 0.3 + tailWave * h);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      
      // Üst yüzgeç
      ctx.beginPath();
      ctx.moveTo(-w * 0.1, -h * 0.35);
      ctx.lineTo(w * 0.05, -h * 0.5);
      ctx.lineTo(w * 0.15, -h * 0.3);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      
      // Göz
      ctx.beginPath();
      ctx.arc(w * 0.2, -h * 0.05, h * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w * 0.22, -h * 0.05, h * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
      
      ctx.restore();
    };

    // Balık sınıfı
    class Fish {
      constructor(data, x, y, pngFile) {
        this.data = data;
        this.pngFile = pngFile;
        this.x = x;
        this.y = y;
        this.w = data.w * (0.8 + Math.random() * 0.4);
        this.h = data.h * (0.8 + Math.random() * 0.4);
        this.speed = data.speed * (0.8 + Math.random() * 0.4);
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.phase = Math.random() * Math.PI * 2;
        this.yOffset = 0;
      }
      
      update(cw, ch) {
        this.x += this.speed * this.direction;
        this.phase += 0.02;
        this.yOffset = Math.sin(this.phase) * 8;
        
        if (this.x < 50) { this.direction = 1; }
        if (this.x > cw - 50) { this.direction = -1; }
        
        let minY = 80, maxY = ch - 80;
        if (this.data.depth === "top") maxY = ch * 0.4;
        else if (this.data.depth === "bottom") minY = ch * 0.6;
        
        if (this.y < minY) this.y = minY;
        if (this.y > maxY) this.y = maxY;
      }
      
      draw(ctx) {
        const img = this.pngFile ? imagesRef.current[this.pngFile] : null;
        
        if (img) {
          // PNG ile çiz
          ctx.save();
          ctx.translate(this.x, this.y + this.yOffset);
          if (this.direction < 0) ctx.scale(-1, 1);
          ctx.drawImage(img, -this.w / 2, -this.h / 2, this.w, this.h);
          ctx.restore();
        } else {
          // Canvas ile çiz
          drawCanvasFish(this.x, this.y + this.yOffset, this.w, this.h, this.data.color, this.direction, this.phase);
        }
      }
    }

    // Balıkları oluştur
    const createFish = () => {
      fishRef.current = [];
      console.log("🐟 balikEnvanteri:", balikEnvanteri);
      
      if (balikEnvanteri && balikEnvanteri.length > 0) {
        balikEnvanteri.forEach(b => {
          const name = b.tur || b.isim || b.name;
          const total = (parseInt(b.erkek)||0) + (parseInt(b.disi)||0) + (parseInt(b.belirsiz)||0) + (parseInt(b.adet)||0);
          
          console.log(`  → Balık: "${name}", Toplam: ${total}`);
          
          if (!name || total <= 0) return;
          
          const data = FISH_DB[name];
          if (!data) {
            console.warn(`  ❌ "${name}" bulunamadı`);
            return;
          }
          
          const pngFile = PNG_FILES[name] || null;
          console.log(`  ✅ "${name}" bulundu! PNG: ${pngFile || "YOK (canvas çizim)"}`);
          
          let minY = 100, maxY = 380;
          if (data.depth === "top") { minY = 80; maxY = 200; }
          else if (data.depth === "bottom") { minY = 280; maxY = 400; }
          
          for (let i = 0; i < Math.min(total, 10); i++) {
            const x = 100 + Math.random() * 760;
            const y = minY + Math.random() * (maxY - minY);
            fishRef.current.push(new Fish(data, x, y, pngFile));
          }
        });
      }
      
      // Varsayılan balıklar
      if (fishRef.current.length === 0) {
        console.log("⚠️ Varsayılan balıklar ekleniyor...");
        const defaults = [
          { n: "Neon Tetra", c: 5 },
          { n: "Guppy", c: 3 },
          { n: "Corydoras", c: 2 }
        ];
        defaults.forEach(d => {
          const data = FISH_DB[d.n];
          const pngFile = PNG_FILES[d.n] || null;
          if (data) {
            for (let i = 0; i < d.c; i++) {
              fishRef.current.push(new Fish(data, 100 + Math.random() * 760, 100 + Math.random() * 280, pngFile));
            }
          }
        });
      }
      
      console.log(`📊 Toplam ${fishRef.current.length} balık oluşturuldu`);
    };

    // Animasyon
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      fishRef.current.forEach(fish => {
        fish.update(canvas.width, canvas.height);
        fish.draw(ctx);
      });
      
      // Uyarılar
      let y = 60;
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      
      if (amonyakVar || nitritVar) {
        ctx.fillStyle = "rgba(200, 0, 0, 0.9)";
        ctx.fillRect(canvas.width/2 - 120, y, 240, 30);
        ctx.fillStyle = "#fff";
        ctx.fillText("☠️ SU KALİTESİ TEHLİKELİ!", canvas.width/2, y + 20);
        y += 35;
      }
      
      if (yemZamani) {
        ctx.fillStyle = "rgba(200, 50, 50, 0.9)";
        ctx.fillRect(canvas.width/2 - 100, y, 200, 30);
        ctx.fillStyle = "#fff";
        ctx.fillText("🍽️ YEMLEME ZAMANI!", canvas.width/2, y + 20);
        y += 35;
      }
      
      if (kapasite) {
        ctx.fillStyle = "rgba(230, 120, 0, 0.9)";
        ctx.fillRect(canvas.width/2 - 110, y, 220, 30);
        ctx.fillStyle = "#fff";
        ctx.fillText("⚠️ KAPASİTE YETERSİZ!", canvas.width/2, y + 20);
      }
      
      animRef.current = requestAnimationFrame(animate);
    };

    createFish();
    animate();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [balikEnvanteri, yemZamani, kapasite, amonyakVar, nitritVar, imagesLoaded]);

  return (
    <div style={{ 
      position: "relative", 
      width: "100%",
      borderRadius: "16px",
      overflow: "hidden"
    }}>
      {/* Ana Akvaryum Container - Çerçevesiz */}
      <div style={{ 
        position: "relative", 
        height: "480px", 
        background: "linear-gradient(180deg, #1a3a4a 0%, #0d2030 50%, #1a2a35 100%)",
        overflow: "hidden"
      }}>
        {/* Video Arkaplan */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            opacity: 0.9
          }}
        >
          <source src="/videos/Airbrush-video-watermark-remover-1767539265410.mp4" type="video/mp4" />
        </video>
        
        {/* Balık Canvas */}
        <canvas
          ref={canvasRef}
          width={960}
          height={480}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10
          }}
        />
        
        {/* Bilgi Bandı */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "12px 16px",
          background: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent)",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          zIndex: 20
        }}>
          <span style={{ 
            background: "rgba(45, 125, 210, 0.3)", 
            backdropFilter: "blur(8px)",
            padding: "6px 14px", 
            borderRadius: "20px", 
            fontSize: "12px", 
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)"
          }}>
            📏 {akvaryumBilgi?.boy || 0}×{akvaryumBilgi?.en || 0}×{akvaryumBilgi?.yukseklik || 0} cm
          </span>
          <span style={{ 
            background: "rgba(26, 188, 156, 0.3)", 
            backdropFilter: "blur(8px)",
            padding: "6px 14px", 
            borderRadius: "20px", 
            fontSize: "12px", 
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)"
          }}>
            💧 {akvaryumBilgi?.hacim || 0}L
          </span>
          <span style={{ 
            background: "rgba(255, 152, 0, 0.3)", 
            backdropFilter: "blur(8px)",
            padding: "6px 14px", 
            borderRadius: "20px", 
            fontSize: "12px", 
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)"
          }}>
            🐟 {toplamBalik || 0} Balık
          </span>
          <span style={{ 
            background: "rgba(156, 39, 176, 0.3)", 
            backdropFilter: "blur(8px)",
            padding: "6px 14px", 
            borderRadius: "20px", 
            fontSize: "12px", 
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)"
          }}>
            📊 {litreBasinaBalik || 0}L / Balık
          </span>
        </div>
      </div>
    </div>
  );
}
