import { useState } from "react";

// UC images by stack size
const UC_XS = "https://cdn.poehali.dev/projects/b4941e3b-06ef-4de7-b454-0bb496345cc8/files/60de9188-9ae6-404f-841a-622c6419b5b5.jpg";
const UC_SM = "https://cdn.poehali.dev/projects/b4941e3b-06ef-4de7-b454-0bb496345cc8/files/13e08495-aa3c-478b-a4c6-acff8007f028.jpg";
const UC_MD = "https://cdn.poehali.dev/projects/b4941e3b-06ef-4de7-b454-0bb496345cc8/files/6eaa095e-079d-486d-95da-850025854d21.jpg";
const UC_LG = "https://cdn.poehali.dev/projects/b4941e3b-06ef-4de7-b454-0bb496345cc8/files/3e5b3369-c236-49f4-b3fe-7f37648013ee.jpg";

type TabId = "uc" | "lob" | "son";

interface UCPkg {
  id: number;
  uc: number;
  price: number;
  img: string;
}

const ALL_PACKAGES: UCPkg[] = [
  { id: 1,  uc: 60,    price: 79,    img: UC_XS },
  { id: 2,  uc: 120,   price: 158,   img: UC_XS },
  { id: 3,  uc: 325,   price: 399,   img: UC_SM },
  { id: 4,  uc: 385,   price: 489,   img: UC_SM },
  { id: 5,  uc: 660,   price: 799,   img: UC_SM },
  { id: 6,  uc: 720,   price: 899,   img: UC_SM },
  { id: 7,  uc: 985,   price: 1198,  img: UC_MD },
  { id: 8,  uc: 1320,  price: 1598,  img: UC_MD },
  { id: 9,  uc: 1800,  price: 1990,  img: UC_MD },
  { id: 10, uc: 2125,  price: 2390,  img: UC_MD },
  { id: 11, uc: 2460,  price: 2790,  img: UC_MD },
  { id: 12, uc: 3850,  price: 3990,  img: UC_LG },
  { id: 13, uc: 4510,  price: 4890,  img: UC_LG },
  { id: 14, uc: 5650,  price: 5990,  img: UC_LG },
  { id: 15, uc: 8100,  price: 7949,  img: UC_LG },
  { id: 16, uc: 9900,  price: 9990,  img: UC_LG },
  { id: 17, uc: 11950, price: 12190, img: UC_LG },
  { id: 18, uc: 16200, price: 15898, img: UC_LG },
  { id: 19, uc: 24300, price: 23847, img: UC_LG },
  { id: 20, uc: 32400, price: 31796, img: UC_LG },
  { id: 21, uc: 40500, price: 39745, img: UC_LG },
  { id: 22, uc: 81000, price: 79490, img: UC_LG },
];

const BANNERS = [
  "Снижение комиссии STEAM до 2% 🎮",
  "Бонус +10% UC на первую покупку 🎁",
  "Мгновенное зачисление на аккаунт ⚡",
];

// Bottom nav icons from original screenshots
const BOTTOM_TABS = [
  { id: "uc" as TabId,  label: "UC",    emoji: "🪙" },
  { id: "lob" as TabId, label: "Лобби", emoji: "🎟️" },
  { id: "son" as TabId, label: "СОН",   emoji: "🐤" },
  { id: "pass" as never, label: "Пасс", emoji: "🎫" },
];

export default function Index() {
  const [tab, setTab] = useState<TabId>("uc");
  const [bannerIdx, setBannerIdx] = useState(0);

  return (
    <div className="min-h-screen bg-[#0d0015] font-roboto text-white overflow-x-hidden select-none">
      {/* BG purple glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_#5b1a8a_0%,_#0d0015_70%)]" />
        {/* watermark text like cohuc */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none overflow-hidden">
          <span className="text-[22vw] font-black uppercase tracking-tighter text-white leading-none">
            AGUSHA<br/>UC БОТ
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto flex flex-col min-h-screen">

        {/* TOP TABS */}
        <div className="px-3 pt-4 pb-3 grid grid-cols-3 gap-2">
          {[
            { id: "all", label: "Все игры", emoji: "🎮" },
            { id: "son", label: "СОН",      emoji: null },
            { id: "lob", label: "Лобби",    emoji: "⊞" },
          ].map((t, i) => (
            <button
              key={t.id}
              onClick={() => i === 2 && setTab("lob")}
              className={`flex flex-col items-center justify-center gap-1 py-3 rounded-2xl border-2 font-bold text-sm transition-all
                ${i === 2
                  ? "border-[#00ff88] bg-black/60 text-white shadow-[0_0_12px_#00ff8855]"
                  : i === 0
                  ? "border-[#8b2fc9] bg-black/50 text-white"
                  : "border-[#8b2fc9] bg-black/50 text-white"
                }`}
            >
              {t.emoji && <span className="text-xl">{t.emoji}</span>}
              <span className={`${t.emoji ? "text-xs" : "text-base font-black"}`}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* BANNER */}
        <div className="px-3 mb-3">
          <div className="relative bg-gradient-to-r from-[#8b2fc9] to-[#c026d3] rounded-2xl px-5 py-3.5 overflow-hidden cursor-pointer"
            onClick={() => setBannerIdx((bannerIdx + 1) % BANNERS.length)}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: "repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(255,255,255,.08) 8px,rgba(255,255,255,.08) 16px)" }} />
            <p className="relative text-white font-bold text-sm text-center">{BANNERS[bannerIdx]}</p>
            <div className="flex justify-center gap-1.5 mt-2">
              {BANNERS.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setBannerIdx(i); }}
                  className={`h-1.5 rounded-full transition-all ${i === bannerIdx ? "w-4 bg-white" : "w-1.5 bg-white/30"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <main className="flex-1 px-3 pb-24">
          {tab === "uc" && <UCSection />}
          {tab === "lob" && <LobbySection />}
          {tab === "son" && <SonSection />}
        </main>

        {/* BOTTOM NAV */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50
          bg-[#0d0015]/95 backdrop-blur-md border-t border-[#3a1060]
          flex items-center justify-around px-2 py-2">
          {BOTTOM_TABS.map((b) => (
            <button key={b.id} onClick={() => setTab(b.id as TabId)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all
                ${tab === b.id ? "bg-[#2a0a4a]" : ""}`}>
              <span className="text-xl">{b.emoji}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wide
                ${tab === b.id ? "text-[#c084fc]" : "text-white/40"}`}>{b.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── UC SECTION ── */
function UCSection() {
  return (
    <div>
      {/* Featured row: История, Prime, APOLLO */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {[
          { label: "История",  bg: "bg-gradient-to-br from-[#c0392b] to-[#1a0a2e]", emoji: "🏎️" },
          { label: "Prime",    bg: "bg-gradient-to-br from-[#6b21a8] to-[#1a0a2e]", emoji: "📖" },
          { label: "APOLLO",   bg: "bg-gradient-to-br from-[#4a1a6e] to-[#0d0015]", emoji: "🚗" },
        ].map((c) => (
          <button key={c.label}
            className={`${c.bg} rounded-2xl aspect-[3/3.5] flex flex-col items-center justify-end pb-3 border border-[#3a1060] hover:border-[#8b2fc9] transition-all active:scale-95`}>
            <span className="text-3xl mb-1">{c.emoji}</span>
            <span className="text-xs font-bold text-white/90">{c.label}</span>
          </button>
        ))}
      </div>

      {/* X-Костюм + first UC packages */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <button className="bg-gradient-to-br from-[#6b21a8] to-[#0d0015] rounded-2xl border border-[#3a1060] hover:border-[#8b2fc9] transition-all active:scale-95 flex flex-col items-end justify-end pb-2 pr-2 aspect-square row-span-1">
          <span className="text-3xl">👘</span>
          <span className="text-xs font-bold text-white/80 mt-1">Х-Костюм</span>
        </button>
        {ALL_PACKAGES.slice(0, 2).map((pkg) => (
          <UCCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {/* All UC packages grid */}
      <div className="grid grid-cols-3 gap-2">
        {ALL_PACKAGES.slice(2).map((pkg) => (
          <UCCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {/* Footer links */}
      <div className="mt-8 text-center space-y-2 pb-4">
        <button className="block w-full text-[#9b59b6] text-sm underline">Пользовательское соглашение</button>
        <button className="block w-full text-[#9b59b6] text-sm underline">Политика конфиденциальности</button>
      </div>
    </div>
  );
}

function UCCard({ pkg }: { pkg: UCPkg }) {
  return (
    <div className="bg-[#12002a] border border-[#2a0a4a] rounded-2xl overflow-hidden hover:border-[#8b2fc9] transition-all active:scale-95 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-3 min-h-[90px]">
        <img src={pkg.img} alt={`${pkg.uc} UC`}
          className="w-full h-[72px] object-contain" />
      </div>
      <div className="px-2 pb-1 text-center">
        <p className="text-white font-bold text-[11px] leading-tight">
          {pkg.uc.toLocaleString()} UC — {pkg.price.toLocaleString()} ₽
        </p>
      </div>
      <div className="px-2 pb-2 pt-1">
        <button className="w-full bg-[#8b2fc9] hover:bg-[#a855f7] text-white font-bold text-xs py-2 rounded-xl transition-all active:scale-95">
          Выбрать
        </button>
      </div>
    </div>
  );
}

/* ── LOBBY SECTION ── */
function LobbySection() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "БИЛЕТЫ ДОМА",               emoji: "👍", bg: "from-[#1a0a3e] to-[#0d0015]" },
        { label: "КУПИТЬ СВОЕ КОЛИЧЕСТВО",     emoji: "🐤", bg: "from-[#3a1060] to-[#1a0a3e]" },
        { label: "ПРАВИЛА БИТВЫ ПОПУЛЯРНОСТИ", emoji: "❓", bg: "from-[#1a0a3e] to-[#0d0015]" },
        { label: "ВЫБРАТЬ ВРЕМЯ ЗАЧИСЛЕНИЯ",   emoji: "⏱️", bg: "from-[#3a1060] to-[#1a0a3e]" },
      ].map((c) => (
        <button key={c.label}
          className={`bg-gradient-to-br ${c.bg} border border-[#3a1060] rounded-2xl p-4 flex items-end justify-between aspect-[4/3] hover:border-[#8b2fc9] transition-all active:scale-95`}>
          <span className="text-left text-white font-black text-xs uppercase leading-tight max-w-[65%]">{c.label}</span>
          <span className="text-3xl">{c.emoji}</span>
        </button>
      ))}

      {/* ПП пакеты */}
      {[
        { pp: 10000,  old: 249,  price: 199,  emoji: "🐤" },
        { pp: 20000,  old: 559,  price: 399,  emoji: "🐔" },
        { pp: 30000,  old: 789,  price: 599,  emoji: "🍗" },
        { pp: 40000,  old: 989,  price: 799,  emoji: "🏍️" },
        { pp: 50000,  old: 1189, price: 999,  emoji: "🐓" },
        { pp: 100000, old: 2190, price: 1799, emoji: "🦃" },
      ].map((p) => (
        <div key={p.pp} className="bg-[#12002a] border border-[#2a0a4a] rounded-2xl overflow-hidden hover:border-[#8b2fc9] transition-all flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4 min-h-[90px]">
            <span className="text-5xl">{p.emoji}</span>
          </div>
          <div className="px-3 pb-1 text-center">
            <p className="text-white/40 text-[10px] line-through">{p.pp.toLocaleString()} ПП — {p.old} ₽</p>
            <p className="text-white font-bold text-xs">{p.pp.toLocaleString()} ПП — {p.price} ₽</p>
          </div>
          <div className="px-2 pb-2 pt-1">
            <button className="w-full bg-[#8b2fc9] hover:bg-[#a855f7] text-white font-bold text-xs py-2 rounded-xl transition-all active:scale-95">
              Выбрать
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── SON SECTION ── */
function SonSection() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-white/30">
      <span className="text-6xl mb-4">😴</span>
      <p className="text-sm uppercase tracking-wider font-bold">СОН — скоро</p>
    </div>
  );
}
