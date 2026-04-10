import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG =
  "https://cdn.poehali.dev/projects/b4941e3b-06ef-4de7-b454-0bb496345cc8/files/1d077ddf-8eaf-4677-ab73-53f67d702720.jpg";

interface Package {
  id: number;
  name: string;
  coins: number;
  bonus: number;
  price: number;
  popular?: boolean;
  tag?: string;
}

const packages: Package[] = [
  { id: 1, name: "Стартовый", coins: 300, bonus: 0, price: 149 },
  { id: 2, name: "Боевой", coins: 600, bonus: 60, price: 279, tag: "ХИТ" },
  { id: 3, name: "Элитный", coins: 1200, bonus: 180, price: 499, popular: true },
  { id: 4, name: "Легенда", coins: 2500, bonus: 500, price: 949 },
  { id: 5, name: "Командный", coins: 5000, bonus: 1500, price: 1799, tag: "ВЫГОДА" },
  { id: 6, name: "Генерал", coins: 10000, bonus: 4000, price: 3299 },
];

type SortType = "default" | "price_asc" | "price_desc" | "coins_asc" | "coins_desc";

const sortOptions: { value: SortType; label: string }[] = [
  { value: "default", label: "По умолчанию" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "coins_asc", label: "Монеты: меньше" },
  { value: "coins_desc", label: "Монеты: больше" },
];

export default function Index() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3500]);
  const [coinsMin, setCoinsMin] = useState(0);
  const [sort, setSort] = useState<SortType>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = packages
    .filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        p.coins + p.bonus >= coinsMin
    )
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "coins_asc") return a.coins - b.coins;
      if (sort === "coins_desc") return b.coins - a.coins;
      return a.id - b.id;
    });

  return (
    <div className="min-h-screen bg-[#0a0c10] font-oswald text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-[#c8902a]/30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-2xl font-black tracking-widest text-[#f5c842] uppercase">
            PUBG<span className="text-white">STORE</span>
          </span>
          <div className="flex items-center gap-4">
            <a
              href="#catalog"
              className="text-sm text-gray-300 hover:text-[#f5c842] transition-colors uppercase tracking-wider"
            >
              Каталог
            </a>
            <button className="bg-[#f5c842] hover:bg-[#e0b030] text-black font-black px-5 py-2 text-sm uppercase tracking-wider transition-all hover:scale-105">
              Войти
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-16 h-[520px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="PUBG Store"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0a0c10]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10]/80 via-transparent to-[#0a0c10]/60" />

        <div className="relative max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-[#f5c842]" />
              <span className="text-[#f5c842] text-xs uppercase tracking-[0.3em] font-bold">
                Официальный магазин
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase leading-none mb-4">
              <span className="text-white">ПОПОЛНИ</span>
              <br />
              <span className="text-[#f5c842]">G-COINS</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 font-light">
              Лучшие пакеты игровой валюты для PUBG. Мгновенное зачисление на аккаунт.
            </p>
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 bg-[#f5c842] hover:bg-[#e0b030] text-black font-black px-8 py-3 uppercase tracking-wider text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_#f5c84250]"
            >
              <Icon name="ShoppingCart" size={18} />
              Выбрать пакет
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm border-t border-[#f5c842]/20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-around">
            {[
              { icon: "Zap", val: "Мгновенно", label: "Зачисление" },
              { icon: "Shield", val: "100%", label: "Безопасно" },
              { icon: "Users", val: "50 000+", label: "Игроков" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <Icon name={s.icon as any} size={18} className="text-[#f5c842]" />
                <div className="text-left">
                  <div className="text-[#f5c842] font-black text-sm leading-none">{s.val}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wide">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-black uppercase text-white">
            Каталог <span className="text-[#f5c842]">пакетов</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Найдено: {filtered.length} пакетов</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTERS SIDEBAR */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-[#111318] border border-[#f5c842]/20 p-5">
              <button
                className="lg:hidden w-full flex items-center justify-between text-[#f5c842] font-bold uppercase text-sm mb-3"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <span className="flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={16} />
                  Фильтры
                </span>
                <Icon name={filtersOpen ? "ChevronUp" : "ChevronDown"} size={16} />
              </button>

              <div className={`${filtersOpen ? "block" : "hidden"} lg:block space-y-6`}>
                {/* Sort */}
                <div>
                  <label className="block text-xs text-[#f5c842] uppercase tracking-widest font-bold mb-3">
                    Сортировка
                  </label>
                  <div className="space-y-1">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
                        className={`w-full text-left px-3 py-2 text-sm transition-all ${
                          sort === opt.value
                            ? "bg-[#f5c842] text-black font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div>
                  <label className="block text-xs text-[#f5c842] uppercase tracking-widest font-bold mb-3">
                    Цена (₽)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-full bg-black border border-[#333] text-white px-2 py-1.5 text-sm focus:outline-none focus:border-[#f5c842]"
                      placeholder="от"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full bg-black border border-[#333] text-white px-2 py-1.5 text-sm focus:outline-none focus:border-[#f5c842]"
                      placeholder="до"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={3500}
                    step={50}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full accent-[#f5c842]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 ₽</span>
                    <span>3 500 ₽</span>
                  </div>
                </div>

                {/* Min coins */}
                <div>
                  <label className="block text-xs text-[#f5c842] uppercase tracking-widest font-bold mb-3">
                    Монет от
                  </label>
                  <div className="space-y-1">
                    {[0, 500, 1000, 2000, 5000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setCoinsMin(v)}
                        className={`w-full text-left px-3 py-2 text-sm transition-all ${
                          coinsMin === v
                            ? "bg-[#f5c842] text-black font-bold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {v === 0 ? "Любое кол-во" : `${v.toLocaleString()}+ монет`}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPriceRange([0, 3500]);
                    setCoinsMin(0);
                    setSort("default");
                  }}
                  className="w-full border border-[#f5c842]/40 text-[#f5c842] hover:bg-[#f5c842]/10 py-2 text-sm uppercase tracking-wider font-bold transition-all"
                >
                  Сбросить
                </button>
              </div>
            </div>
          </aside>

          {/* PACKAGES GRID */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-500">
                <Icon name="PackageX" size={48} className="mb-4 opacity-30" />
                <p className="text-lg uppercase tracking-wider">Пакеты не найдены</p>
                <p className="text-sm mt-2">Попробуйте изменить фильтры</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((pkg, i) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#f5c842]/10 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-2xl font-black tracking-widest text-[#f5c842] uppercase">
            PUBG<span className="text-white">STORE</span>
          </span>
          <p className="text-gray-600 text-sm">
            © 2026 PUBGStore — неофициальный магазин игровой валюты
          </p>
        </div>
      </footer>
    </div>
  );
}

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const totalCoins = pkg.coins + pkg.bonus;

  return (
    <div
      className={`relative group bg-[#111318] border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_#f5c84222] ${
        pkg.popular
          ? "border-[#f5c842]"
          : "border-[#1e2128] hover:border-[#f5c842]/50"
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f5c842] text-black text-xs font-black px-4 py-1 uppercase tracking-wider whitespace-nowrap">
          ХИТ ПРОДАЖ
        </div>
      )}
      {pkg.tag && !pkg.popular && (
        <div className="absolute -top-3 left-4 bg-[#e84040] text-white text-xs font-black px-3 py-1 uppercase tracking-wider">
          {pkg.tag}
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#f5c842]/10 border border-[#f5c842]/30 flex items-center justify-center">
              <span className="text-xl">🪙</span>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Пакет</div>
              <div className="text-white font-black uppercase tracking-wide">{pkg.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-[#f5c842]">
              {pkg.price.toLocaleString()} ₽
            </div>
          </div>
        </div>

        <div className="bg-black/40 p-3 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Основные монеты</span>
            <span className="text-white font-bold">{pkg.coins.toLocaleString()}</span>
          </div>
          {pkg.bonus > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-400">+ Бонус</span>
              <span className="text-green-400 font-bold">+{pkg.bonus.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-[#333] pt-2 flex justify-between">
            <span className="text-[#f5c842] text-xs uppercase tracking-wide font-bold">Итого монет</span>
            <span className="text-[#f5c842] font-black">{totalCoins.toLocaleString()}</span>
          </div>
        </div>

        <div className="text-xs text-gray-600 mb-4 text-right">
          {(pkg.price / totalCoins).toFixed(2)} ₽ за монету
        </div>

        <button
          className={`w-full py-3 font-black uppercase tracking-wider text-sm transition-all ${
            pkg.popular
              ? "bg-[#f5c842] text-black hover:bg-[#e0b030] hover:shadow-[0_0_20px_#f5c84240]"
              : "bg-[#1e2128] text-white hover:bg-[#f5c842] hover:text-black"
          }`}
        >
          Купить сейчас
        </button>
      </div>
    </div>
  );
}
