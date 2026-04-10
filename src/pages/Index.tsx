import { useState } from "react";
import Icon from "@/components/ui/icon";

const UC_SM = "https://cdn.poehali.dev/projects/b4941e3b-06ef-4de7-b454-0bb496345cc8/files/4982bf10-d0d7-4dd8-8afd-3f79ce7d632c.jpg";
const UC_LG = "https://cdn.poehali.dev/projects/b4941e3b-06ef-4de7-b454-0bb496345cc8/files/f89753a3-6aa7-4279-b2f4-41b9d1012084.jpg";

interface UCPackage {
  id: number;
  uc: number;
  price: number;
  size: "sm" | "md" | "lg";
}

const ucPackages: UCPackage[] = [
  { id: 1, uc: 60, price: 79, size: "sm" },
  { id: 2, uc: 120, price: 158, size: "sm" },
  { id: 3, uc: 325, price: 399, size: "sm" },
  { id: 4, uc: 385, price: 489, size: "md" },
  { id: 5, uc: 660, price: 799, size: "md" },
  { id: 6, uc: 720, price: 899, size: "md" },
  { id: 7, uc: 985, price: 1198, size: "lg" },
  { id: 8, uc: 1320, price: 1598, size: "lg" },
  { id: 9, uc: 1800, price: 1990, size: "lg" },
  { id: 10, uc: 3850, price: 3999, size: "lg" },
  { id: 11, uc: 8100, price: 7999, size: "lg" },
];

type TabType = "uc" | "royalpass" | "items";
type FilterType = "all" | "cheap" | "mid" | "top";

const tabs = [
  { id: "uc" as TabType, label: "UC", emoji: "🪙" },
  { id: "royalpass" as TabType, label: "Royal Pass", emoji: "👑" },
  { id: "items" as TabType, label: "Анонсы", emoji: "🎁" },
];

const banners = [
  "Снижение комиссии PUBG до 2% 🎮",
  "Бонус +10% UC на первую покупку 🎁",
  "Мгновенное зачисление на аккаунт ⚡",
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>("uc");
  const [filter, setFilter] = useState<FilterType>("all");
  const [bannerIdx, setBannerIdx] = useState(0);
  const [maxPrice, setMaxPrice] = useState(8000);

  const filtered = ucPackages.filter((p) => {
    if (filter === "cheap") return p.price <= 400;
    if (filter === "mid") return p.price > 400 && p.price <= 1500;
    if (filter === "top") return p.price > 1500;
    return p.price <= maxPrice;
  });

  return (
    <div className="min-h-screen bg-[#1a0a2e] font-oswald text-white overflow-x-hidden">
      {/* Purple gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#6b21a8_0%,_#1a0a2e_60%)]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C27B0' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="px-3 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <button className="flex items-center gap-1.5 text-white/60 text-sm hover:text-white transition-colors">
              <Icon name="X" size={16} />
              <span>Закрыть</span>
            </button>
            <span className="text-xl font-black tracking-widest text-white uppercase">
              PUBG<span className="text-[#c026d3]">STORE</span>
            </span>
            <div className="flex items-center gap-3 text-white/60">
              <Icon name="ChevronDown" size={18} />
              <Icon name="MoreVertical" size={18} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-xs font-bold uppercase tracking-wide transition-all ${
                  activeTab === tab.id
                    ? "bg-[#7e22ce]/60 border-[#c026d3] text-white shadow-[0_0_14px_#c026d340]"
                    : "bg-black/30 border-[#4a1a6e] text-white/50 hover:border-[#7e22ce]"
                }`}
              >
                <span className="text-xl">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Promo Banner */}
          <div className="relative bg-gradient-to-r from-[#7e22ce] to-[#c026d3] rounded-2xl px-4 py-3 mb-1 overflow-hidden cursor-pointer">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background:
                  "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
              }}
            />
            <p className="relative text-white font-bold text-sm text-center">
              {banners[bannerIdx]}
            </p>
            <div className="flex justify-center gap-1.5 mt-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBannerIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === bannerIdx ? "w-4 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </header>

        {/* FILTER CHIPS */}
        <div className="px-3 py-2 flex gap-2 overflow-x-auto">
          {[
            { id: "all" as FilterType, label: "Все" },
            { id: "cheap" as FilterType, label: "до 400 ₽" },
            { id: "mid" as FilterType, label: "400–1500 ₽" },
            { id: "top" as FilterType, label: "от 1500 ₽" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold uppercase border transition-all ${
                filter === f.id
                  ? "bg-[#c026d3] border-[#c026d3] text-white"
                  : "bg-black/30 border-[#4a1a6e] text-white/50 hover:border-[#c026d3]"
              }`}
            >
              {f.label}
            </button>
          ))}
          {filter === "all" && (
            <div className="shrink-0 flex items-center gap-2 ml-1">
              <span className="text-[11px] text-white/40 whitespace-nowrap">
                до {maxPrice.toLocaleString()} ₽
              </span>
              <input
                type="range"
                min={100}
                max={8000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                className="w-20 accent-[#c026d3]"
              />
            </div>
          )}
        </div>

        {/* CONTENT */}
        <main className="flex-1 px-3 pb-24">
          {activeTab === "uc" ? (
            filtered.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-white/30">
                <Icon name="PackageX" size={40} className="mb-3" />
                <p className="text-sm uppercase tracking-wider">Не найдено</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {filtered.map((pkg) => (
                  <UCCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center py-20 text-white/30">
              <span className="text-5xl mb-4">
                {activeTab === "royalpass" ? "👑" : "🎁"}
              </span>
              <p className="text-sm uppercase tracking-wider">Скоро</p>
            </div>
          )}
        </main>

        {/* BOTTOM NAVIGATION */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#0f0520]/95 backdrop-blur border-t border-[#4a1a6e] px-3 py-2 flex items-center justify-around z-20">
          {[
            { icon: "🪙", label: "UC", tab: "uc" as TabType },
            { icon: "👑", label: "Pass", tab: "royalpass" as TabType },
            { icon: "🎁", label: "Анонсы", tab: "items" as TabType },
          ].map((b) => (
            <button
              key={b.tab}
              onClick={() => setActiveTab(b.tab)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-all ${
                activeTab === b.tab ? "opacity-100" : "opacity-40"
              }`}
            >
              <span className="text-xl">{b.icon}</span>
              <span className="text-[10px] uppercase tracking-wide text-white">
                {b.label}
              </span>
              {activeTab === b.tab && (
                <span className="w-1 h-1 rounded-full bg-[#c026d3]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function UCCard({ pkg }: { pkg: UCPackage }) {
  const img = pkg.size === "sm" ? UC_SM : UC_LG;

  return (
    <button className="group flex flex-col items-center bg-[#2d1052]/70 border border-[#4a1a6e] rounded-2xl p-2 hover:border-[#c026d3] hover:bg-[#3b1468]/80 transition-all active:scale-95 hover:shadow-[0_0_16px_#c026d330]">
      <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 bg-black/30">
        <img
          src={img}
          alt={`${pkg.uc} UC`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="text-white font-black text-[11px] text-center leading-tight">
        {pkg.uc} UC — {pkg.price} ₽
      </span>
    </button>
  );
}
