import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Dices,
  Gift,
  Home as HomeIcon,
  Lock,
  Minus,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
  Youtube,
  FileText,
} from "lucide-react";
import { useLocation } from "wouter";

import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

const COINS_PER_QUANTITY = 11;

const PACKAGES = [
  { amount: 110, coins: 110, label: "Starter" },
  { amount: 300, coins: 300, label: "Popular" },
  { amount: 500, coins: 500, label: "Value" },
  { amount: 1000, coins: 1000, label: "Premium" },
  { amount: 2000, coins: 2000, label: "Pro" },
  { amount: 5000, coins: 5000, label: "Elite" },
  { amount: 10000, coins: 10000, label: "Ultimate" },
];

export default function Home() {
  const [, setLocation] = useLocation();

  /* -------------------------------------------------------
     GENERAL UI STATE (UNTOUCHED)
  ------------------------------------------------------- */

  const [showBalance, setShowBalance] = useState(false);
  const [showOneFigure, setShowOneFigure] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const [activeUsers, setActiveUsers] = useState(37);

  /* -------------------------------------------------------
     VIRTUAL COIN BALANCE (UNTOUCHED)
     ------------------------------------------------------- */

  const [coins, setCoins] = useState(0);

  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoUsed, setPromoUsed] = useState(false);

  /* -------------------------------------------------------
     ONE FIGURE (UNTOUCHED)
  ------------------------------------------------------- */

  const [quantities, setQuantities] = useState<Record<number, number>>(
    {}
  );

  /* -------------------------------------------------------
     WITHDRAW UI STATE (UNTOUCHED)
     ------------------------------------------------------- */

  const [withdrawMethod, setWithdrawMethod] = useState<
    "upi" | "bank"
  >("upi");

  /* -------------------------------------------------------
     ACTIVE USER ANIMATION (UNTOUCHED)
  ------------------------------------------------------- */

  useEffect(() => {
    const updateUsers = () => {
      const min = 24;
      const max = 58;

      setActiveUsers(
        Math.floor(Math.random() * (max - min + 1)) + min
      );
    };

    updateUsers();

    const interval = setInterval(updateUsers, 5000);

    return () => clearInterval(interval);
  }, []);

  /* -------------------------------------------------------
     ONE FIGURE CALCULATIONS (UNTOUCHED)
  ------------------------------------------------------- */

  const selectedDigits = useMemo(() => {
    return Object.keys(quantities)
      .map(Number)
      .filter((digit) => (quantities[digit] || 0) > 0)
      .sort((a, b) => a - b);
  }, [quantities]);

  const totalQuantity = useMemo(() => {
    return selectedDigits.reduce(
      (total, digit) => total + (quantities[digit] || 0),
      0
    );
  }, [selectedDigits, quantities]);

  const totalFigureCoins = totalQuantity * COINS_PER_QUANTITY;

  /* -------------------------------------------------------
     PROMO CODE (UNTOUCHED)
  ------------------------------------------------------- */

  const activatePromo = () => {
    const code = promoCode.trim().toUpperCase();

    if (promoUsed) {
      setPromoMessage("Promo code already used.");
      return;
    }

    if (code === "1000NSK") {
      setCoins((current) => current + 1000);
      setPromoUsed(true);
      setPromoCode("");
      setPromoMessage("1,000 virtual coins added.");
      return;
    }

    setPromoMessage("Invalid promo code.");
  };

  /* -------------------------------------------------------
     QUANTITY (UNTOUCHED)
  ------------------------------------------------------- */

  const increaseQuantity = (digit: number) => {
    setQuantities((current) => ({
      ...current,
      [digit]: (current[digit] || 0) + 1,
    }));
  };

  const decreaseQuantity = (digit: number) => {
    setQuantities((current) => {
      const next = { ...current };

      const value = next[digit] || 0;

      if (value <= 1) {
        delete next[digit];
      } else {
        next[digit] = value - 1;
      }

      return next;
    });
  };

  /* -------------------------------------------------------
     OPEN EXTERNAL PAGES (UNTOUCHED)
  ------------------------------------------------------- */

  const openYouTube = () => {
    window.open(
      "https://youtube.com/@dearlottery?si=3bykwvdIrwnBFyXh",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openSupport = () => {
    window.open(
      "https://t.me/NskNijamul",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openLotteryFax = () => {
    window.open(
      "https://lotterysambad.one/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* -------------------------------------------------------
     SETTINGS (UNTOUCHED)
  ------------------------------------------------------- */

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const openPrivacy = () => {
    setShowSettings(false);

    setTimeout(() => {
      setShowPrivacy(true);
    }, 120);
  };

  /* -------------------------------------------------------
     SHARED UI (ONLY VISUAL CLASSES CHANGED)
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05050a] pb-28 text-white selection:bg-cyan-400/40 selection:text-[#05050a]">

      {/* =====================================================
          NEO-CYBERPUNK AMBIENT BACKDROP (8K NEON)
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Cyan Neon Blob */}
        <div className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.25] blur-[130px]" />
        {/* Magenta Neon Blob */}
        <div className="absolute right-[-200px] top-[5%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/[0.20] blur-[150px]" />
        {/* Lime Green Blob */}
        <div className="absolute bottom-[-150px] left-[10%] h-[400px] w-[400px] rounded-full bg-lime-500/[0.15] blur-[140px]" />
        {/* Orange Blob */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-orange-500/[0.10] blur-[180px]" />
        {/* Grid overlay for gaming texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0wIDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')] opacity-[0.04] mix-blend-overlay" />
      </div>


      {/* =====================================================
          MAIN CONTAINER (3D PERSPECTIVE)
      ====================================================== */}

      <main className="relative z-10 mx-auto w-full max-w-md px-4 pt-5 perspective-1000 transform-style-3d">

        {/* ===================================================
            TOP BAR - NEON DICE LOGO
        ================================================== */}

        <header className="mb-6">

          <div className="flex items-center justify-between">

            {/* Brand Logo - 3D Neon Dice */}

            <div className="flex items-center gap-3 transform-gpu rotate-y-[-5deg]">

              <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-cyan-400 via-blue-600 to-fuchsia-600 shadow-[0_0_40px_rgba(0,255,255,0.4),0_0_80px_rgba(255,0,255,0.2)] border-[1px] border-white/20 transform translate-z-8">

                <Dices className="h-7 w-7 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />

                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-[2px] border-[#05050a] bg-gradient-to-br from-yellow-400 to-orange-500 text-[8px] font-black text-[#05050a] shadow-[0_0_20px_rgba(255,200,0,0.6)]">
                  ✦
                </span>

              </div>

              <div>

                <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-cyan-400/60 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                  Cyber Gaming
                </p>

                <h1 className="text-[26px] font-black leading-none tracking-[-0.03em] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                  LAST DIGIT
                  <span className="ml-2 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    PRO
                  </span>
                </h1>

              </div>

            </div>


            {/* Balance Button - Neon Pill */}

            <button
              type="button"
              onClick={() => setShowBalance(true)}
              className="group flex items-center gap-2 rounded-[20px] bg-black/40 border-[1.5px] border-cyan-400/50 px-4 py-2.5 shadow-[0_0_30px_rgba(0,255,255,0.2),inset_0_0_30px_rgba(0,255,255,0.05)] backdrop-blur-xl transition active:scale-95 hover:border-cyan-300/80"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                <Wallet className="h-4.5 w-4.5 text-white" />
              </div>

              <div className="text-left">

                <p className="text-[6px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Coins
                </p>

                <p className="text-[15px] font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  {coins.toLocaleString()}
                </p>

              </div>

              <Plus className="h-4 w-4 text-cyan-400 transition group-active:rotate-90 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]" />

            </button>

          </div>


          {/* Live Status Bar - Neon Glow */}

          <div className="mt-4 flex items-center justify-between rounded-[18px] border border-white/[0.08] bg-black/30 px-4 py-3 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.6)]">

            <div className="flex items-center gap-3">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute h-full w-full animate-ping rounded-full bg-lime-400 opacity-80" />

                <span className="relative h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.8)]" />

              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-lime-300 drop-shadow-[0_0_20px_rgba(163,230,53,0.5)]">
                Server Live
              </span>

            </div>

            <div className="flex items-center gap-2">

              <Users className="h-4 w-4 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]" />

              <span className="text-[9px] font-bold text-white/60">
                {activeUsers} Active
              </span>

            </div>

          </div>

        </header>


        {/* ===================================================
            HERO PANEL - 3D CASINO SLOT
        ================================================== */}

        <section className="mb-5 transform-gpu perspective-1000">

          <div className="relative overflow-hidden rounded-[32px] border-[2px] border-white/10 bg-gradient-to-br from-[#120f1f] via-[#0a0a1a] to-[#05050a] p-5 shadow-[0_30px_80px_rgba(0,255,255,0.15),0_0_60px_rgba(255,0,255,0.1)] transform-gpu rotate-y-[-5deg] rotate-x-[2deg] transition hover:rotate-y-0 hover:rotate-x-0">

            {/* 3D Inner Lighting */}
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-cyan-400/[0.20] blur-[70px]" />
            <div className="absolute -bottom-12 left-1/2 h-56 w-56 rounded-full bg-fuchsia-500/[0.15] blur-[80px]" />
            <div className="absolute right-1/2 top-1/2 h-64 w-64 rounded-full bg-orange-500/[0.08] blur-[90px]" />


            <div className="relative">

              <div className="flex items-start justify-between">

                <div className="transform translate-z-8">

                  <div className="mb-2.5 flex items-center gap-2.5">

                    <Sparkles className="h-5 w-5 text-yellow-400 drop-shadow-[0_0_20px_rgba(255,200,0,0.6)]" />

                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-yellow-400 drop-shadow-[0_0_15px_rgba(255,200,0,0.4)]">
                      Roll the Dice
                    </span>

                  </div>

                  <h2 className="text-[32px] font-black leading-tight tracking-[-0.03em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    ARENA
                    <br />
                    <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">ELITE</span>
                  </h2>

                  <p className="mt-2 max-w-[220px] text-[9px] leading-relaxed text-white/40 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    Experience the thrill of premium cyber gaming.
                  </p>

                </div>


                <div className="rounded-[16px] border-2 border-fuchsia-400/30 bg-black/40 px-4 py-3 text-center backdrop-blur-md shadow-[0_0_40px_rgba(255,0,255,0.2)] transform translate-z-4">

                  <p className="text-[5px] font-bold uppercase tracking-wider text-white/40">
                    Status
                  </p>

                  <div className="mt-1.5 flex items-center justify-center gap-2">

                    <span className="h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.8)]" />

                    <span className="text-[9px] font-black text-lime-300 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                      LIVE
                    </span>

                  </div>

                </div>

              </div>


              {/* 3D Mini Stats */}

              <div className="mt-6 grid grid-cols-3 gap-3 transform translate-z-4">

                <div className="rounded-[18px] border-[1.5px] border-cyan-400/20 bg-black/50 px-3.5 py-3.5 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,255,0.05)] transform transition hover:scale-105 hover:border-cyan-400/40">

                  <p className="text-[6px] uppercase tracking-wider text-cyan-400/60">
                    Tools
                  </p>

                  <p className="mt-0.5 text-[16px] font-black text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                    04
                  </p>

                </div>

                <div className="rounded-[18px] border-[1.5px] border-fuchsia-400/20 bg-black/50 px-3.5 py-3.5 backdrop-blur-sm shadow-[0_0_30px_rgba(255,0,255,0.05)] transform transition hover:scale-105 hover:border-fuchsia-400/40">

                  <p className="text-[6px] uppercase tracking-wider text-fuchsia-400/60">
                    Figures
                  </p>

                  <p className="mt-0.5 text-[16px] font-black text-white drop-shadow-[0_0_10px_rgba(255,0,255,0.3)]">
                    10
                  </p>

                </div>

                <div className="rounded-[18px] border-[1.5px] border-lime-400/20 bg-black/50 px-3.5 py-3.5 backdrop-blur-sm shadow-[0_0_30px_rgba(163,230,53,0.05)] transform transition hover:scale-105 hover:border-lime-400/40">

                  <p className="text-[6px] uppercase tracking-wider text-lime-400/60">
                    Live
                  </p>

                  <p className="mt-0.5 text-[16px] font-black text-lime-300 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                    ON
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            FEATURE GRID - 3D NEON CARDS
        ================================================== */}

        <section className="mb-5">

          <div className="mb-4 flex items-center justify-between px-1">

            <div>

              <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/30">
                Game Center
              </p>

              <h2 className="text-[19px] font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Premium Features
              </h2>

            </div>

            <span className="rounded-full border-2 border-cyan-400/30 bg-black/40 px-3.5 py-1.5 text-[7px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,255,0.2)]">
              Neo
            </span>

          </div>


          <div className="grid grid-cols-2 gap-3.5 perspective-1000 transform-style-3d">

            {/* Lucky Search - Cyan Neon */}

            <button
              type="button"
              onClick={() => setLocation("/lucky-search")}
              className="group relative min-h-[150px] overflow-hidden rounded-[26px] border-[2px] border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.15] via-[#0a0a1a] to-[#05050a] p-4 text-left transition active:scale-[0.96] transform-gpu rotate-y-[10deg] hover:rotate-y-0 hover:border-cyan-400/60 shadow-[0_10px_40px_rgba(0,255,255,0.1)]"
            >

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.20] blur-[60px]" />

              <div className="relative transform translate-z-6">

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_40px_rgba(0,255,255,0.4)]">
                    <Search className="h-5.5 w-5.5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                  </div>

                  <Lock className="h-4 w-4 text-cyan-400/60 drop-shadow-[0_0_15px_rgba(0,255,255,0.2)]" />

                </div>

                <div className="mt-4">

                  <h3 className="text-[15px] font-black text-white">
                    Lucky Search
                  </h3>

                  <p className="mt-1 text-[8px] text-white/40 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    Premium prediction tool
                  </p>

                </div>

                <div className="mt-3.5 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-wider text-cyan-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  Open
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>

              </div>

            </button>


            {/* Dear Digits - Magenta Neon */}

            <button
              type="button"
              onClick={() => setLocation("/dear-digits")}
              className="group relative min-h-[150px] overflow-hidden rounded-[26px] border-[2px] border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/[0.15] via-[#0a0a1a] to-[#05050a] p-4 text-left transition active:scale-[0.96] transform-gpu rotate-y-[-10deg] hover:rotate-y-0 hover:border-fuchsia-400/60 shadow-[0_10px_40px_rgba(255,0,255,0.1)]"
            >

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-fuchsia-400/[0.20] blur-[60px]" />

              <div className="relative transform translate-z-6">

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-[0_0_40px_rgba(255,0,255,0.4)]">
                    <TrendingUp className="h-5.5 w-5.5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                  </div>

                  <span className="rounded-full bg-black/40 border-[1px] border-fuchsia-400/30 px-3 py-1 text-[7px] font-black text-fuchsia-300 backdrop-blur-sm shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                    LIVE
                  </span>

                </div>

                <div className="mt-4">

                  <h3 className="text-[15px] font-black text-white">
                    Dear Digits
                  </h3>

                  <p className="mt-1 text-[8px] text-white/40 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    60-day chart analysis
                  </p>

                </div>

                <div className="mt-3.5 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-wider text-fuchsia-300 drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                  Analyze
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>

              </div>

            </button>


            {/* One Figure - Orange Neon */}

            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className="group relative min-h-[150px] overflow-hidden rounded-[26px] border-[2px] border-orange-400/20 bg-gradient-to-br from-orange-500/[0.15] via-[#0a0a1a] to-[#05050a] p-4 text-left transition active:scale-[0.96] transform-gpu rotate-y-[10deg] hover:rotate-y-0 hover:border-orange-400/60 shadow-[0_10px_40px_rgba(255,165,0,0.1)]"
            >

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-400/[0.20] blur-[60px]" />

              <div className="relative transform translate-z-6">

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-orange-400 via-amber-500 to-red-600 shadow-[0_0_40px_rgba(255,165,0,0.4)]">
                    <Dices className="h-5.5 w-5.5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                  </div>

                  <span className="rounded-full border-[1px] border-orange-400/30 bg-black/40 px-3 py-1 text-[7px] font-black uppercase text-orange-300 backdrop-blur-sm shadow-[0_0_20px_rgba(255,165,0,0.3)]">
                    Premium
                  </span>

                </div>

                <div className="mt-4">

                  <h3 className="text-[15px] font-black text-white">
                    One Figure
                  </h3>

                  <p className="mt-1 text-[8px] text-white/40 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    Select your figures
                  </p>

                </div>

                <div className="mt-3.5 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-wider text-orange-300 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                  Play
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>

              </div>

            </button>


            {/* Lottery Fax - Lime Neon */}

            <button
              type="button"
              onClick={openLotteryFax}
              className="group relative min-h-[150px] overflow-hidden rounded-[26px] border-[2px] border-lime-400/20 bg-gradient-to-br from-lime-500/[0.15] via-[#0a0a1a] to-[#05050a] p-4 text-left transition active:scale-[0.96] transform-gpu rotate-y-[-10deg] hover:rotate-y-0 hover:border-lime-400/60 shadow-[0_10px_40px_rgba(163,230,53,0.1)]"
            >

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-lime-400/[0.20] blur-[60px]" />

              <div className="relative transform translate-z-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-lime-400 to-green-600 shadow-[0_0_40px_rgba(163,230,53,0.4)]">
                  <FileText className="h-5.5 w-5.5 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                </div>

                <div className="mt-4">

                  <h3 className="text-[15px] font-black text-white">
                    Lottery Fax
                  </h3>

                  <p className="mt-1 text-[8px] text-white/40 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    Results archive
                  </p>

                </div>

                <div className="mt-3.5 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-wider text-lime-300 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                  View
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>

              </div>

            </button>

          </div>

        </section>


        {/* ===================================================
            YOUTUBE - NEON PILL
        ================================================== */}

        <section className="mb-5">

          <button
            type="button"
            onClick={openYouTube}
            className="group relative flex w-full items-center gap-3.5 overflow-hidden rounded-[28px] border-[2px] border-red-500/30 bg-gradient-to-r from-red-500/[0.15] via-black/40 to-transparent p-4.5 text-left transition active:scale-[0.98] shadow-[0_0_40px_rgba(255,0,0,0.15)] hover:border-red-500/60"
          >

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/[0.20] blur-[60px]" />

            <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_40px_rgba(255,0,0,0.4)]">
              <Youtube className="h-6.5 w-6.5 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
            </div>

            <div className="relative min-w-0 flex-1 transform translate-z-4">

              <div className="flex items-center gap-2.5">

                <h3 className="text-[15px] font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Dear Lottery
                </h3>

                <span className="rounded-full bg-red-500/20 border-[1px] border-red-400/40 px-3 py-1 text-[6px] font-black uppercase text-red-300 backdrop-blur-sm shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                  Official
                </span>

              </div>

              <p className="mt-1.5 truncate text-[8px] text-white/40 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                YouTube Channel • Watch latest content
              </p>

            </div>

            <ArrowRight className="relative h-5 w-5 text-red-300/70 transition group-active:translate-x-1 drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]" />

          </button>

        </section>


        {/* ===================================================
            BALANCE / PACKAGES - NEON CASINO
        ================================================== */}

        <section className="mb-5">

          <div className="relative overflow-hidden rounded-[32px] border-[2px] border-yellow-400/20 bg-gradient-to-br from-[#1a1505] via-[#0c0d12] to-[#05050a] p-5 shadow-[0_20px_60px_rgba(255,200,0,0.1)]">

            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yellow-400/[0.15] blur-[70px]" />

            <div className="relative">

              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_40px_rgba(255,200,0,0.4)]">
                    <Wallet className="h-5.5 w-5.5 text-[#05050a]" />
                  </div>

                  <div>

                    <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-yellow-400/60 drop-shadow-[0_0_15px_rgba(255,200,0,0.3)]">
                      Virtual Wallet
                    </p>

                    <h2 className="text-[18px] font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      Add Coins
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowBalance(true)}
                  className="rounded-[14px] border-2 border-yellow-400/30 bg-black/50 px-4 py-2 text-[7px] font-black uppercase tracking-wider text-yellow-300 backdrop-blur-md shadow-[0_0_30px_rgba(255,200,0,0.2)] hover:border-yellow-400/60"
                >
                  Promo
                </button>

              </div>


              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">

                {PACKAGES.map((item) => (

                  <button
                    key={item.amount}
                    type="button"
                    disabled
                    className="relative overflow-hidden rounded-[18px] border-[1.5px] border-white/[0.06] bg-black/40 px-3 py-3.5 text-left opacity-70 transition hover:opacity-90 hover:border-white/20"
                  >

                    <div className="flex items-center justify-between">

                      <span className="text-[7px] font-bold uppercase tracking-wider text-white/40">
                        {item.label}
                      </span>

                      <Lock className="h-4 w-4 text-white/30" />

                    </div>

                    <p className="mt-1.5 text-[14px] font-black text-white/85">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </p>

                    <p className="mt-0.5 text-[6px] text-yellow-400/70 drop-shadow-[0_0_10px_rgba(255,200,0,0.3)]">
                      {item.coins.toLocaleString()} Coins
                    </p>

                    <div className="mt-3 text-[5.5px] font-bold uppercase tracking-wider text-white/20">
                      Disabled
                    </div>

                  </button>

                ))}

              </div>


              <div className="mt-4 flex items-center gap-3 rounded-[18px] border-[1.5px] border-cyan-400/20 bg-black/50 px-4 py-3 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,255,0.1)]">

                <Gift className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]" />

                <p className="text-[8px] text-white/50">
                  Active Code:
                  <span className="ml-2 font-black text-cyan-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                    1000NSK
                  </span>
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            WITHDRAW - MASSIVE NEON BUTTON
        ================================================== */}

        <section className="mb-5">

          <button
            type="button"
            onClick={() => setShowWithdraw(true)}
            className="group flex w-full items-center gap-3.5 rounded-[28px] border-[2px] border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/[0.15] via-black/40 to-transparent p-4.5 text-left transition active:scale-[0.98] shadow-[0_0_50px_rgba(255,0,255,0.15)] hover:border-fuchsia-400/60"
          >

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-400/[0.20] blur-[60px]" />

            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-[0_0_40px_rgba(255,0,255,0.4)]">
              <ArrowDownToLine className="h-5.5 w-5.5 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
            </div>

            <div className="min-w-0 flex-1 transform translate-z-4">

              <div className="flex items-center gap-2.5">

                <h3 className="text-[15px] font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Withdraw
                </h3>

                <span className="rounded-full bg-black/60 border-[1px] border-white/20 px-3 py-1 text-[6px] font-black uppercase tracking-wider text-white/40 backdrop-blur-sm">
                  Soon
                </span>

              </div>

              <p className="mt-1.5 text-[8px] text-white/40 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                UPI & Bank Card options
              </p>

            </div>

            <ChevronRight className="relative h-5 w-5 text-fuchsia-300/70 transition group-active:translate-x-1 drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]" />

          </button>

        </section>


        {/* ===================================================
            SECURITY - NEON SHIELD
        ================================================== */}

        <section>

          <div className="flex items-center gap-3.5 rounded-[24px] border-[2px] border-emerald-400/20 bg-emerald-400/[0.05] px-5 py-4 backdrop-blur-md shadow-[0_0_40px_rgba(16,185,129,0.1)]">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-emerald-400/[0.15] shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="h-5.5 w-5.5 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
            </div>

            <div className="min-w-0">

              <h3 className="text-[11px] font-bold text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                Secure Environment
              </h3>

              <p className="mt-0.5 text-[7.5px] text-white/35 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                Virtual coin balance • UI demo
              </p>

            </div>

            <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-400/80 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]" />

          </div>

        </section>

      </main>


      {/* =====================================================
          BOTTOM NAVIGATION - 3D FLOATING NEON (POSITION & COLOR UPDATED)
          Home, Figure, Support, Withdraw (Added as per request), Settings
      ====================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-50">

        <div className="mx-auto max-w-md px-3 pb-4">

          <div className="flex items-center justify-between rounded-[34px] border-[2px] border-white/10 bg-black/70 px-3 py-2.5 shadow-[0_-20px_60px_rgba(0,255,255,0.1),0_0_40px_rgba(255,0,255,0.05)] backdrop-blur-2xl transform-gpu translate-z-10">

            {/* Home - Gold Neon */}

            <button
              type="button"
              className="flex min-w-[55px] flex-col items-center py-1.5 transition hover:scale-110"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_30px_rgba(255,200,0,0.4)]">
                <HomeIcon className="h-5 w-5 text-[#05050a]" />
              </div>

              <span className="mt-1.5 text-[7px] font-black uppercase tracking-wider text-yellow-400 drop-shadow-[0_0_15px_rgba(255,200,0,0.4)]">
                Home
              </span>

            </button>


            {/* Figure - Cyan Neon */}

            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className="flex min-w-[55px] flex-col items-center py-1.5 transition hover:scale-110"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_30px_rgba(0,255,255,0.4)]">
                <Dices className="h-5 w-5 text-white" />
              </div>

              <span className="mt-1.5 text-[7px] font-black uppercase tracking-wider text-cyan-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                Figure
              </span>

            </button>


            {/* Support - Blue Neon */}

            <button
              type="button"
              onClick={openSupport}
              className="flex min-w-[55px] flex-col items-center py-1.5 transition hover:scale-110"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-400 to-indigo-600 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                <Send className="h-5 w-5 text-white" />
              </div>

              <span className="mt-1.5 text-[7px] font-black uppercase tracking-wider text-blue-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                Support
              </span>

            </button>


            {/* Withdraw - Magenta Neon (NEW POSITION ADDED) */}

            <button
              type="button"
              onClick={() => setShowWithdraw(true)}
              className="flex min-w-[55px] flex-col items-center py-1.5 transition hover:scale-110"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-[0_0_30px_rgba(255,0,255,0.4)]">
                <ArrowDownToLine className="h-5 w-5 text-white" />
              </div>

              <span className="mt-1.5 text-[7px] font-black uppercase tracking-wider text-fuchsia-300 drop-shadow-[0_0_15px_rgba(255,0,255,0.4)]">
                Withdraw
              </span>

            </button>


            {/* Settings - Silver/White Neon */}

            <button
              type="button"
              onClick={openSettings}
              className="flex min-w-[55px] flex-col items-center py-1.5 transition hover:scale-110"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-slate-500 to-slate-800 shadow-[0_0_30px_rgba(148,163,184,0.3)]">
                <Settings className="h-5 w-5 text-white" />
              </div>

              <span className="mt-1.5 text-[7px] font-black uppercase tracking-wider text-white/40 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                Settings
              </span>

            </button>

          </div>

        </div>

      </nav>


      {/* =====================================================
          BALANCE MODAL - NEON CASINO
      ====================================================== */}

      {showBalance && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/90 p-4 backdrop-blur-xl sm:items-center">

          <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border-[2px] border-cyan-400/30 bg-[#05050a] shadow-[0_0_80px_rgba(0,255,255,0.2),0_0_120px_rgba(255,0,255,0.1)]">

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.15] blur-[100px]" />

            <div className="relative p-6">

              {/* Header */}

              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_40px_rgba(0,255,255,0.4)]">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>

                  <div>

                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-cyan-400/60 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                      Virtual Wallet
                    </p>

                    <h2 className="text-[22px] font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      Balance Center
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowBalance(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-black/60 border-[1px] border-white/10 transition hover:bg-black/80"
                >
                  <X className="h-5 w-5 text-white/70" />
                </button>

              </div>


              {/* Balance */}

              <div className="mb-5 rounded-[28px] border-[2px] border-yellow-400/20 bg-gradient-to-r from-yellow-400/[0.10] to-transparent p-5 backdrop-blur-sm shadow-[0_0_40px_rgba(255,200,0,0.1)]">

                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Current Virtual Coins
                </p>

                <div className="mt-2 flex items-end justify-between">

                  <p className="text-6xl font-black tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                    {coins.toLocaleString()}
                  </p>

                  <span className="pb-1.5 text-[10px] font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,200,0,0.4)]">
                    COINS
                  </span>

                </div>

              </div>


              {/* Promo */}

              <div className="rounded-[28px] border-[2px] border-fuchsia-400/20 bg-black/40 p-5 backdrop-blur-sm shadow-[0_0_40px_rgba(255,0,255,0.1)]">

                <div className="mb-3.5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-fuchsia-400/[0.15] shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                    <Gift className="h-5 w-5 text-fuchsia-400" />
                  </div>

                  <div>

                    <h3 className="text-[11px] font-bold text-white/90">
                      Promotional Code
                    </h3>

                    <p className="text-[7px] text-white/30">
                      Only one promotional code is active
                    </p>

                  </div>

                </div>


                <div className="flex gap-2.5">

                  <input
                    value={promoCode}
                    onChange={(event) => {
                      setPromoCode(event.target.value);
                      setPromoMessage("");
                    }}
                    placeholder="Enter promo code"
                    className="min-w-0 flex-1 rounded-[16px] border-[2px] border-white/10 bg-black/60 px-4.5 py-3.5 text-[11px] font-bold text-white outline-none placeholder:text-white/30 focus:border-cyan-400/50 shadow-[0_0_20px_rgba(0,255,255,0.05)]"
                  />

                  <button
                    type="button"
                    onClick={activatePromo}
                    disabled={promoUsed}
                    className="rounded-[16px] bg-gradient-to-r from-cyan-400 to-blue-600 px-5 text-[8px] font-black uppercase tracking-wider text-white shadow-[0_0_40px_rgba(0,255,255,0.3)] disabled:opacity-30"
                  >
                    Activate
                  </button>

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-[7px] text-white/30">
                    Active code
                  </span>

                  <span className="rounded-lg bg-black/60 border-[1px] border-cyan-400/30 px-3 py-1.5 text-[8px] font-black text-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                    1000NSK
                  </span>

                </div>

                {promoMessage && (

                  <p
                    className={`mt-3 text-[8.5px] font-semibold drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                      promoMessage.includes("added")
                        ? "text-lime-400"
                        : "text-red-400"
                    }`}
                  >
                    {promoMessage}
                  </p>

                )}

              </div>


              {/* Package preview */}

              <div className="mt-5">

                <p className="mb-2.5 text-[7px] font-bold uppercase tracking-[0.18em] text-white/30">
                  Available Packages
                </p>

                <div className="grid grid-cols-3 gap-2.5">

                  {PACKAGES.slice(0, 6).map((item) => (

                    <div
                      key={item.amount}
                      className="rounded-[18px] border-[2px] border-white/[0.06] bg-black/40 p-3 opacity-60"
                    >

                      <div className="flex items-center justify-between">

                        <span className="text-[5px] uppercase tracking-wider text-white/30">
                          {item.label}
                        </span>

                        <Lock className="h-4 w-4 text-white/30" />

                      </div>

                      <p className="mt-1.5 text-[12px] font-black text-white/70">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </p>

                      <p className="mt-0.5 text-[6px] text-white/30">
                        Buy disabled
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          ONE FIGURE MODAL - 3D NEON
      ====================================================== */}

      {showOneFigure && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/90 p-4 backdrop-blur-xl sm:items-center">

          <div className="relative max-h-[94vh] w-full max-w-md overflow-y-auto rounded-[36px] border-[2px] border-orange-400/30 bg-[#05050a] shadow-[0_0_80px_rgba(255,165,0,0.2),0_0_120px_rgba(255,0,0,0.1)]">

            <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-orange-400/[0.15] blur-[100px]" />

            <div className="relative p-6">

              {/* Header */}

              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-gradient-to-br from-orange-400 via-amber-500 to-red-600 shadow-[0_0_40px_rgba(255,165,0,0.4)]">
                    <Dices className="h-6 w-6 text-white" />
                  </div>

                  <div>

                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-orange-400/60 drop-shadow-[0_0_15px_rgba(255,165,0,0.3)]">
                      Game Center
                    </p>

                    <h2 className="text-[22px] font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      One Figure
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowOneFigure(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-black/60 border-[1px] border-white/10 transition hover:bg-black/80"
                >
                  <X className="h-5 w-5 text-white/70" />
                </button>

              </div>


              {/* Cost */}

              <div className="mb-5 flex items-center justify-between rounded-[20px] border-[2px] border-orange-400/20 bg-orange-400/[0.05] px-5 py-3.5 backdrop-blur-sm shadow-[0_0_30px_rgba(255,165,0,0.1)]">

                <div className="flex items-center gap-2.5">

                  <Sparkles className="h-4.5 w-4.5 text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]" />

                  <span className="text-[8.5px] font-bold uppercase tracking-wider text-white/40">
                    Virtual Cost / Quantity
                  </span>

                </div>

                <span className="text-[12px] font-black text-orange-300 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                  {COINS_PER_QUANTITY} Coins
                </span>

              </div>


              {/* Digits */}

              <div className="mb-5 rounded-[28px] border-[2px] border-white/[0.06] bg-black/40 p-5 backdrop-blur-sm">

                <div className="mb-4 flex items-center justify-between">

                  <div>

                    <p className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-white/35">
                      Select Figures
                    </p>

                    <p className="mt-0.5 text-[7.5px] text-white/30">
                      Choose any available figure
                    </p>

                  </div>

                  <span className="rounded-full bg-black/60 border-[1px] border-white/10 px-4 py-1.5 text-[7.5px] font-black text-white/40">
                    0 — 9
                  </span>

                </div>


                <div className="grid grid-cols-5 gap-2.5">

                  {Array.from({ length: 10 }, (_, digit) => {

                    const quantity = quantities[digit] || 0;

                    const selected = quantity > 0;

                    return (

                      <div
                        key={digit}
                        className={`rounded-[18px] border-[2px] p-3 transition ${
                          selected
                            ? "border-orange-400/40 bg-orange-400/[0.10] shadow-[0_0_30px_rgba(255,165,0,0.1)]"
                            : "border-white/[0.06] bg-white/[0.03]"
                        }`}
                      >

                        <button
                          type="button"
                          onClick={() => increaseQuantity(digit)}
                          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-[18px] text-[18px] font-black transition active:scale-90 ${
                            selected
                              ? "bg-gradient-to-br from-orange-400 to-red-600 text-white shadow-[0_0_30px_rgba(255,165,0,0.4)]"
                              : "bg-white/[0.06] text-white/80"
                          }`}
                        >
                          {digit}
                        </button>


                        <div className="mt-3 flex items-center justify-between gap-1.5">

                          <button
                            type="button"
                            disabled={!selected}
                            onClick={() => decreaseQuantity(digit)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition disabled:opacity-20 hover:bg-white/[0.15]"
                          >
                            <Minus className="h-4 w-4 text-white/70" />
                          </button>

                          <span className="text-[12px] font-black text-white/80">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(digit)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition hover:bg-white/[0.15]"
                          >
                            <Plus className="h-4 w-4 text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.3)]" />
                          </button>

                        </div>

                      </div>

                    );
                  })}

                </div>

              </div>


              {/* Selected */}

              <div className="mb-5 rounded-[28px] border-[2px] border-white/[0.06] bg-black/40 p-5 backdrop-blur-sm">

                <div className="mb-3.5 flex items-center justify-between">

                  <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/35">
                    Current Selection
                  </span>

                  <span className="text-[8.5px] font-bold text-white/35">
                    {selectedDigits.length} selected
                  </span>

                </div>


                {selectedDigits.length === 0 ? (

                  <div className="rounded-[18px] border-[2px] border-dashed border-white/[0.06] py-7 text-center">

                    <Dices className="mx-auto h-8 w-8 text-white/20" />

                    <p className="mt-2 text-[8.5px] text-white/30">
                      Select a figure to begin
                    </p>

                  </div>

                ) : (

                  <div className="flex flex-wrap gap-3">

                    {selectedDigits.map((digit) => (

                      <div
                        key={digit}
                        className="flex items-center gap-2.5 rounded-lg border-[2px] border-orange-400/30 bg-orange-400/[0.10] px-4 py-3 shadow-[0_0_20px_rgba(255,165,0,0.15)]"
                      >

                        <span className="text-[14px] font-black text-orange-300 drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                          {digit}
                        </span>

                        <span className="text-[8px] text-white/50">
                          ×{quantities[digit]}
                        </span>

                      </div>

                    ))}

                  </div>

                )}

              </div>


              {/* Total */}

              <div className="mb-5 rounded-[28px] border-[2px] border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.05] to-transparent p-5 backdrop-blur-sm shadow-[0_0_30px_rgba(0,255,255,0.1)]">

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <p className="text-[7px] font-bold uppercase tracking-wider text-white/30">
                      Total Quantity
                    </p>

                    <p className="mt-1 text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      {totalQuantity}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-[7px] font-bold uppercase tracking-wider text-white/30">
                      Virtual Coins
                    </p>

                    <p className="mt-1 text-4xl font-black text-cyan-300 drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                      {totalFigureCoins}
                    </p>

                  </div>

                </div>

              </div>


              {/* Disabled action */}

              <button
                type="button"
                disabled
                className="flex w-full items-center justify-center gap-3 rounded-[20px] bg-gradient-to-r from-cyan-400 to-fuchsia-400 py-4.5 text-[9px] font-black uppercase tracking-[0.15em] text-white opacity-50 shadow-[0_0_50px_rgba(0,255,255,0.3)]"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="mt-4 text-center text-[7.5px] text-white/25">
                Game action is currently disabled in this UI build.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          WITHDRAW MODAL - NEON
      ====================================================== */}

      {showWithdraw && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/90 p-4 backdrop-blur-xl sm:items-center">

          <div className="relative w-full max-w-md overflow-hidden rounded-[36px] border-[2px] border-fuchsia-400/30 bg-[#05050a] shadow-[0_0_80px_rgba(255,0,255,0.2),0_0_120px_rgba(0,255,255,0.1)]">

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-400/[0.15] blur-[100px]" />

            <div className="relative p-6">

              {/* Header */}

              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-[0_0_40px_rgba(255,0,255,0.4)]">
                    <ArrowDownToLine className="h-6 w-6 text-white" />
                  </div>

                  <div>

                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Wallet
                    </p>

                    <h2 className="text-[22px] font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      Withdraw
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowWithdraw(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-black/60 border-[1px] border-white/10 transition hover:bg-black/80"
                >
                  <X className="h-5 w-5 text-white/70" />
                </button>

              </div>


              {/* Disabled banner */}

              <div className="mb-5 flex items-start gap-3.5 rounded-[24px] border-[2px] border-yellow-400/20 bg-yellow-400/[0.05] p-5 backdrop-blur-sm shadow-[0_0_30px_rgba(255,200,0,0.1)]">

                <Clock3 className="mt-0.5 h-5.5 w-5.5 shrink-0 text-yellow-400 drop-shadow-[0_0_20px_rgba(255,200,0,0.4)]" />

                <div>

                  <h3 className="text-[11px] font-bold text-yellow-300/90 drop-shadow-[0_0_15px_rgba(255,200,0,0.2)]">
                    Withdrawal Coming Soon
                  </h3>

                  <p className="mt-1.5 text-[8px] leading-relaxed text-white/35 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    UPI and Bank Card withdrawal are currently disabled in this UI build.
                  </p>

                </div>

              </div>


              {/* Methods */}

              <div className="mb-5 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  disabled
                  onClick={() => setWithdrawMethod("upi")}
                  className={`rounded-[24px] border-[2px] p-5 text-left opacity-50 ${
                    withdrawMethod === "upi"
                      ? "border-cyan-400/40 bg-cyan-400/[0.05] shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                      : "border-white/[0.06] bg-black/40"
                  }`}
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                    <CreditCard className="h-5.5 w-5.5 text-white" />
                  </div>

                  <h3 className="mt-3.5 text-[11px] font-black text-white">
                    UPI
                  </h3>

                  <p className="mt-0.5 text-[7px] text-white/30">
                    Coming Soon
                  </p>

                </button>


                <button
                  type="button"
                  disabled
                  onClick={() => setWithdrawMethod("bank")}
                  className={`rounded-[24px] border-[2px] p-5 text-left opacity-50 ${
                    withdrawMethod === "bank"
                      ? "border-lime-400/40 bg-lime-400/[0.05] shadow-[0_0_30px_rgba(163,230,53,0.1)]"
                      : "border-white/[0.06] bg-black/40"
                  }`}
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-lime-400 to-green-600 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
                    <Banknote className="h-5.5 w-5.5 text-white" />
                  </div>

                  <h3 className="mt-3.5 text-[11px] font-black text-white">
                    Bank Card
                  </h3>

                  <p className="mt-0.5 text-[7px] text-white/30">
                    Coming Soon
                  </p>

                </button>

              </div>


              {/* Disabled form preview */}

              <div className="space-y-3.5 rounded-[28px] border-[2px] border-white/[0.06] bg-black/40 p-5 opacity-50 backdrop-blur-sm">

                <div>

                  <label className="mb-1.5 block text-[7px] font-bold uppercase tracking-wider text-white/35">
                    Account Details
                  </label>

                  <input
                    disabled
                    placeholder="Available when withdrawal launches"
                    className="w-full rounded-[16px] border-[2px] border-white/[0.06] bg-black/60 px-5 py-3.5 text-[9px] text-white outline-none placeholder:text-white/25"
                  />

                </div>

                <div>

                  <label className="mb-1.5 block text-[7px] font-bold uppercase tracking-wider text-white/35">
                    Coins to Withdraw
                  </label>

                  <input
                    disabled
                    placeholder="0"
                    className="w-full rounded-[16px] border-[2px] border-white/[0.06] bg-black/60 px-5 py-3.5 text-[9px] text-white outline-none placeholder:text-white/25"
                  />

                </div>

                <button
                  type="button"
                  disabled
                  className="w-full rounded-[20px] bg-white/[0.08] py-4.5 text-[8px] font-black uppercase tracking-wider text-white/40"
                >
                  Withdraw Disabled
                </button>

              </div>


              <p className="mt-5 text-center text-[7.5px] leading-relaxed text-white/25">
                No bank or payment information is collected by this UI.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          EXISTING MODALS (UNTOUCHED)
      ====================================================== */}

      <SettingsModal
        isOpen={showSettings}
        onClose={closeSettings}
        onOpenPrivacy={openPrivacy}
      />

      <PrivacyPolicyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />

    </div>
  );
}
