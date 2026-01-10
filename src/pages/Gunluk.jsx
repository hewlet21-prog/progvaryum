import React, { useState } from "react";
import "./Gunluk.css";
import AkvaryumProfili from "./gunluk/AkvaryumProfili";
import Yemleme from "./gunluk/Yemleme";
import SuDegisimi from "./gunluk/SuDegisimi";
import Gozlem from "./gunluk/Gozlem";
import IlacTedavi from "./gunluk/IlacTedavi";
import BitkiBudama from "./gunluk/BitkiBudama";
import TestKiti from "./gunluk/TestKiti";
import StokTakip from "./gunluk/StokTakip";
import ArtemiaTakip from "./gunluk/ArtemiaTakip";
import SumpTemizlik from "./gunluk/SumpTemizlik";
import Gubreleme from "./gunluk/Gubreleme";

export default function Gunluk() {
  const [activeTab, setActiveTab] = useState("profil");

  const tabs = [
    { id: "profil", icon: "📊", label: "Akvaryum Profili" },
    { id: "yemleme", icon: "🍽️", label: "Yemleme" },
    { id: "su-degisimi", icon: "💧", label: "Su Değişimi" },
    { id: "gozlem", icon: "👁️", label: "Gözlem" },
    { id: "ilac-tedavi", icon: "💊", label: "İlaç/Tedavi" },
    { id: "bitki-budama", icon: "🌱", label: "Bitki Budama" },
    { id: "test-kiti", icon: "🧪", label: "Test Kiti" },
    { id: "stok", icon: "📦", label: "Stok" },
    { id: "artemia", icon: "🦐", label: "Artemia Takip" },
    { id: "sump", icon: "🔧", label: "Sump Temizlik" },
    { id: "gubreleme", icon: "🌿", label: "Gübreleme" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profil":
        return <AkvaryumProfili />;
      case "yemleme":
        return <Yemleme />;
      case "su-degisimi":
        return <SuDegisimi />;
      case "gozlem":
        return <Gozlem />;
      case "ilac-tedavi":
        return <IlacTedavi />;
      case "bitki-budama":
        return <BitkiBudama />;
      case "test-kiti":
        return <TestKiti />;
      case "stok":
        return <StokTakip />;
      case "artemia":
        return <ArtemiaTakip />;
      case "sump":
        return <SumpTemizlik />;
      case "gubreleme":
        return <Gubreleme />;
      default:
        return <AkvaryumProfili />;
    }
  };

  return (
    <div className="gunluk-container">
      <div className="gunluk-header">
        <h1>📋 Günlük İşlemler</h1>
        <p className="gunluk-subtitle">
          Akvaryum bakım ve takip merkezi
        </p>
      </div>

      {/* TABS */}
      <div className="tabs-wrapper">
        <div className="tabs-scroll">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="gunluk-content">{renderContent()}</div>
    </div>
  );
}