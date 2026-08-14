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
     GENERAL UI STATE
  ------------------------------------------------------- */

  const [showBalance, setShowBalance] = useState(false);
  const [showOneFigure, setShowOneFigure] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const [activeUsers, setActiveUsers] = useState(37);

  /* -------------------------------------------------------
     VIRTUAL COIN BALANCE
     ------------------------------------------------------- */

  const [coins, setCoins] = useState(0);

  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoUsed, setPromoUsed] = useState(false);

  /* -------------------------------------------------------
     ONE FIGURE
  ------------------------------------------------------- */

  const [quantities, setQuantities] = useState<Record<number, number>>(
    {}
  );

  /* -------------------------------------------------------
     WITHDRAW UI STATE
     ------------------------------------------------------- */

  const [withdrawMethod, setWithdrawMethod] = useState<
    "upi" | "bank"
  >("upi");

  /* -------------------------------------------------------
     ACTIVE USER ANIMATION
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
     ONE FIGURE CALCULATIONS
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
     PROMO CODE
     Only active demo code:
     1000NSK => 1000 virtual coins
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
     QUANTITY
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
     OPEN EXTERNAL PAGES
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
     SETTINGS
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
     SHARED UI
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050812] pb-24 text-white selection:bg-amber-400/30 selection:text-white">

      {/* =====================================================
          AMBIENT BACKGROUND (enhanced)
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-cyan-500/[0.07] blur-[100px]" />
        <div className="absolute right-[-120px] top-[18%] h-80 w-80 rounded-full bg-violet-600/[0.08] blur-[110px]" />
        <div className="absolute bottom-[-100px] left-[15%] h-72 w-72 rounded-full bg-amber-500/[0.06] blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 mx-auto w-full max-w-md px-4 pt-4">

        {/* ===================================================
            TOP BAR (refined)
        ================================================== */}

        <header className="mb-4">

          <div className="flex items-center justify-between">

            {/* Brand */}

            <div className="flex items-center gap-2.5">

              <div className="relative flex h-11 w-11 items-center justify-center rounded-[16px] border border-amber-300/30 bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 shadow-[0_7px_25px_rgba(245,158,11,0.25)]">

                <Dices className="h-5 w-5 text-slate-950" />

                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-[#050812] bg-emerald-400 text-[7px] font-black text-slate-950 shadow-lg">
                  +
                </span>

              </div>

              <div>

                <p className="text-[6px] font-bold uppercase tracking-[0.25em] text-cyan-300/60">
                  Premium Gaming
                </p>

                <h1 className="text-[20px] font-black leading-none tracking-[-0.045em]">
                  LAST DIGIT
                  <span className="ml-1 bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent">
                    PRO
                  </span>
                </h1>

              </div>

            </div>


            {/* Balance */}

            <button
              type="button"
              onClick={() => setShowBalance(true)}
              className="group flex items-center gap-1.5 rounded-[16px] border border-amber-300/20 bg-white/[0.04] px-3 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.25)] backdrop-blur-xl transition active:scale-95"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-gradient-to-br from-amber-300 to-orange-600 shadow-inner">
                <Wallet className="h-3.5 w-3.5 text-slate-950" />
              </div>

              <div className="text-left">

                <p className="text-[5.5px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Coins
                </p>

                <p className="text-[12px] font-black text-white">
                  {coins.toLocaleString()}
                </p>

              </div>

              <Plus className="h-3.5 w-3.5 text-amber-400 transition group-active:rotate-90" />

            </button>

          </div>


          {/* Live bar */}

          <div className="mt-3 flex items-center justify-between rounded-[14px] border border-white/[0.06] bg-white/[0.025] px-3 py-2 backdrop-blur-sm">

            <div className="flex items-center gap-2">

              <span className="relative flex h-2 w-2">

                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />

              </span>

              <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-emerald-300/80">
                Server Online
              </span>

            </div>

            <div className="flex items-center gap-1.5">

              <Users className="h-3 w-3 text-cyan-400/60" />

              <span className="text-[7px] font-bold text-white/40">
                {activeUsers} Players Active
              </span>

            </div>

          </div>

        </header>


        {/* ===================================================
            HERO GAME PANEL (premium polish)
        ================================================== */}

        <section className="mb-4">

          <div className="relative overflow-hidden rounded-[24px] border border-cyan-300/[0.15] bg-gradient-to-br from-[#082c34] via-[#07131e] to-[#110a25] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.4)]">

            {/* Decorative lights */}

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/[0.12] blur-[50px]" />

            <div className="absolute -bottom-16 left-20 h-36 w-36 rounded-full bg-violet-500/[0.1] blur-[55px]" />

            <div className="absolute right-5 top-5 opacity-[0.04]">
              <Dices className="h-32 w-32" />
            </div>


            <div className="relative">

              <div className="flex items-start justify-between">

                <div>

                  <div className="mb-1.5 flex items-center gap-2">

                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />

                    <span className="text-[7px] font-black uppercase tracking-[0.22em] text-amber-300/80">
                      Welcome to the Arena
                    </span>

                  </div>

                  <h2 className="text-[24px] font-black leading-tight tracking-[-0.04em]">
                    PLAY • SELECT • ENJOY
                  </h2>

                  <p className="mt-1.5 max-w-[245px] text-[8.5px] leading-relaxed text-white/40">
                    Explore premium tools inside your compact gaming dashboard.
                  </p>

                </div>


                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] px-2.5 py-2 text-center backdrop-blur-sm">

                  <p className="text-[5px] font-bold uppercase tracking-wider text-white/30">
                    Status
                  </p>

                  <div className="mt-0.5 flex items-center gap-1.5">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[7px] font-black text-emerald-300">
                      LIVE
                    </span>

                  </div>

                </div>

              </div>


              {/* Mini stats */}

              <div className="mt-4 grid grid-cols-3 gap-2">

                <div className="rounded-xl border border-white/[0.06] bg-black/30 px-3 py-2.5 backdrop-blur-sm">

                  <p className="text-[5.5px] uppercase tracking-wider text-white/30">
                    Tools
                  </p>

                  <p className="mt-0.5 text-[12px] font-black">
                    04
                  </p>

                </div>

                <div className="rounded-xl border border-white/[0.06] bg-black/30 px-3 py-2.5 backdrop-blur-sm">

                  <p className="text-[5.5px] uppercase tracking-wider text-white/30">
                    Figures
                  </p>

                  <p className="mt-0.5 text-[12px] font-black">
                    10
                  </p>

                </div>

                <div className="rounded-xl border border-white/[0.06] bg-black/30 px-3 py-2.5 backdrop-blur-sm">

                  <p className="text-[5.5px] uppercase tracking-wider text-white/30">
                    Live
                  </p>

                  <p className="mt-0.5 text-[12px] font-black text-emerald-400">
                    ON
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            FEATURE GRID (polished cards)
        ================================================== */}

        <section className="mb-4">

          <div className="mb-3 flex items-center justify-between px-1">

            <div>

              <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-white/30">
                Game Center
              </p>

              <h2 className="text-[16px] font-black text-white">
                Featured Tools
              </h2>

            </div>

            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1.5 text-[6px] font-bold uppercase tracking-wider text-cyan-300/70 backdrop-blur-sm">
              Explore
            </span>

          </div>


          <div className="grid grid-cols-2 gap-3">

            {/* Lucky Search */}

            <button
              type="button"
              onClick={() => setLocation("/lucky-search")}
              className="group relative min-h-[130px] overflow-hidden rounded-[22px] border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] via-[#0b0d19] to-[#070a11] p-4 text-left transition active:scale-[0.97]"
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/[0.12] blur-[40px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-violet-500 to-indigo-700 shadow-[0_7px_18px_rgba(124,58,237,0.25)]">
                    <Search className="h-4.5 w-4.5 text-white" />
                  </div>

                  <Lock className="h-3.5 w-3.5 text-amber-400/60" />

                </div>

                <div className="mt-4">

                  <h3 className="text-[13px] font-black text-white">
                    Lucky Search
                  </h3>

                  <p className="mt-1 text-[7px] text-white/35">
                    Premium prediction tool
                  </p>

                </div>

                <div className="mt-2.5 flex items-center gap-1 text-[6px] font-black uppercase tracking-wider text-violet-300/70">
                  Open
                  <ChevronRight className="h-2.5 w-2.5 transition group-hover:translate-x-1" />
                </div>

              </div>

            </button>


            {/* Dear Digits */}

            <button
              type="button"
              onClick={() => setLocation("/dear-digits")}
              className="group relative min-h-[130px] overflow-hidden rounded-[22px] border border-cyan-400/15 bg-gradient-to-br from-cyan-500/[0.10] via-[#071219] to-[#070a11] p-4 text-left transition active:scale-[0.97]"
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/[0.12] blur-[40px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-cyan-400 to-blue-700 shadow-[0_7px_18px_rgba(14,165,233,0.2)]">
                    <TrendingUp className="h-4.5 w-4.5 text-white" />
                  </div>

                  <span className="rounded-full bg-cyan-400/[0.08] px-2 py-1 text-[5.5px] font-black text-cyan-300/70">
                    LIVE
                  </span>

                </div>

                <div className="mt-4">

                  <h3 className="text-[13px] font-black text-white">
                    Dear Digits
                  </h3>

                  <p className="mt-1 text-[7px] text-white/35">
                    60-day chart analysis
                  </p>

                </div>

                <div className="mt-2.5 flex items-center gap-1 text-[6px] font-black uppercase tracking-wider text-cyan-300/70">
                  Analyze
                  <ChevronRight className="h-2.5 w-2.5 transition group-hover:translate-x-1" />
                </div>

              </div>

            </button>


            {/* One Figure */}

            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className="group relative min-h-[130px] overflow-hidden rounded-[22px] border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.12] via-[#171108] to-[#090a0d] p-4 text-left transition active:scale-[0.97]"
            >

              <div className="absolute -right-7 -top-7 h-28 w-28 rounded-full bg-amber-400/[0.15] blur-[40px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 shadow-[0_7px_20px_rgba(245,158,11,0.25)]">
                    <Dices className="h-4.5 w-4.5 text-slate-950" />
                  </div>

                  <span className="rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-2 py-1 text-[5.5px] font-black uppercase text-amber-300">
                    Premium
                  </span>

                </div>

                <div className="mt-4">

                  <h3 className="text-[13px] font-black text-white">
                    One Figure
                  </h3>

                  <p className="mt-1 text-[7px] text-white/35">
                    Select your figures
                  </p>

                </div>

                <div className="mt-2.5 flex items-center gap-1 text-[6px] font-black uppercase tracking-wider text-amber-300/75">
                  Play
                  <ChevronRight className="h-2.5 w-2.5 transition group-hover:translate-x-1" />
                </div>

              </div>

            </button>


            {/* Lottery Fax */}

            <button
              type="button"
              onClick={openLotteryFax}
              className="group relative min-h-[130px] overflow-hidden rounded-[22px] border border-pink-400/15 bg-gradient-to-br from-pink-500/[0.10] via-[#160b13] to-[#080a10] p-4 text-left transition active:scale-[0.97]"
            >

              <div className="relative">

                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-pink-500 to-rose-700 shadow-[0_7px_18px_rgba(236,72,153,0.2)]">
                  <FileText className="h-4.5 w-4.5 text-white" />
                </div>

                <div className="mt-4">

                  <h3 className="text-[13px] font-black text-white">
                    Lottery Fax
                  </h3>

                  <p className="mt-1 text-[7px] text-white/35">
                    Results archive
                  </p>

                </div>

                <div className="mt-2.5 flex items-center gap-1 text-[6px] font-black uppercase tracking-wider text-pink-300/70">
                  View
                  <ChevronRight className="h-2.5 w-2.5 transition group-hover:translate-x-1" />
                </div>

              </div>

            </button>

          </div>

        </section>


        {/* ===================================================
            YOUTUBE CHANNEL (refined)
        ================================================== */}

        <section className="mb-4">

          <button
            type="button"
            onClick={openYouTube}
            className="group relative flex w-full items-center gap-3 overflow-hidden rounded-[22px] border border-red-400/[0.15] bg-gradient-to-r from-red-500/[0.10] via-white/[0.03] to-transparent p-4 text-left transition active:scale-[0.985]"
          >

            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-red-500/[0.10] blur-[40px]" />

            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-red-500 to-red-700 shadow-[0_7px_20px_rgba(239,68,68,0.25)]">
              <Youtube className="h-5 w-5 text-white" />
            </div>

            <div className="relative min-w-0 flex-1">

              <div className="flex items-center gap-2">

                <h3 className="text-[13px] font-black text-white">
                  Dear Lottery
                </h3>

                <span className="rounded-full bg-red-400/[0.10] px-2 py-0.5 text-[5px] font-black uppercase text-red-300">
                  Official
                </span>

              </div>

              <p className="mt-1 truncate text-[7px] text-white/35">
                YouTube Channel • Watch latest content
              </p>

            </div>

            <ArrowRight className="relative h-4 w-4 text-red-300/60 transition group-active:translate-x-1" />

          </button>

        </section>


        {/* ===================================================
            BALANCE / PACKAGES (enhanced)
        ================================================== */}

        <section className="mb-4">

          <div className="relative overflow-hidden rounded-[24px] border border-amber-400/[0.15] bg-gradient-to-br from-[#171205] via-[#0c0d12] to-[#080a0f] p-4">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/[0.10] blur-[50px]" />

            <div className="relative">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-amber-300 to-orange-600 shadow-[0_7px_18px_rgba(245,158,11,0.2)]">
                    <Wallet className="h-4.5 w-4.5 text-slate-950" />
                  </div>

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-[0.18em] text-amber-300/60">
                      Virtual Wallet
                    </p>

                    <h2 className="text-[15px] font-black">
                      Add Coins
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowBalance(true)}
                  className="rounded-lg border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1.5 text-[6px] font-black uppercase tracking-wider text-amber-300 backdrop-blur-sm"
                >
                  Promo
                </button>

              </div>


              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                {PACKAGES.map((item) => (

                  <button
                    key={item.amount}
                    type="button"
                    disabled
                    className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-3 text-left opacity-70 transition hover:opacity-80"
                  >

                    <div className="flex items-center justify-between">

                      <span className="text-[6px] font-bold uppercase tracking-wider text-white/30">
                        {item.label}
                      </span>

                      <Lock className="h-3 w-3 text-white/20" />

                    </div>

                    <p className="mt-1 text-[12px] font-black text-white/80">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </p>

                    <p className="mt-0.5 text-[6px] text-amber-300/50">
                      {item.coins.toLocaleString()} Coins
                    </p>

                    <div className="mt-2 text-[5.5px] font-bold uppercase tracking-wider text-white/20">
                      Buy unavailable
                    </div>

                  </button>

                ))}

              </div>


              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/30 px-3 py-2.5 backdrop-blur-sm">

                <Gift className="h-4 w-4 text-amber-400" />

                <p className="text-[7px] text-white/35">
                  Only active promotional credit:
                  <span className="ml-1 font-black text-amber-300">
                    1000NSK
                  </span>
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            WITHDRAW UI (refined)
        ================================================== */}

        <section className="mb-4">

          <button
            type="button"
            onClick={() => setShowWithdraw(true)}
            className="group flex w-full items-center gap-3 rounded-[22px] border border-white/[0.08] bg-gradient-to-r from-white/[0.04] to-transparent p-4 text-left transition active:scale-[0.985]"
          >

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-slate-600 to-slate-800 shadow-[0_7px_18px_rgba(0,0,0,0.3)]">
              <ArrowDownToLine className="h-4.5 w-4.5 text-white/80" />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-center gap-2">

                <h3 className="text-[13px] font-black">
                  Withdraw
                </h3>

                <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[5px] font-black uppercase tracking-wider text-white/30">
                  Coming Soon
                </span>

              </div>

              <p className="mt-1 text-[7px] text-white/30">
                UPI & Bank Card options
              </p>

            </div>

            <ChevronRight className="h-4 w-4 text-white/30 transition group-active:translate-x-1" />

          </button>

        </section>


        {/* ===================================================
            SECURITY (enhanced)
        ================================================== */}

        <section>

          <div className="flex items-center gap-3 rounded-[20px] border border-emerald-400/[0.12] bg-emerald-400/[0.04] px-4 py-3 backdrop-blur-sm">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-emerald-400/[0.10]">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
            </div>

            <div className="min-w-0">

              <h3 className="text-[9px] font-bold text-white/85">
                Secure Gaming Environment
              </h3>

              <p className="mt-0.5 text-[6.5px] text-white/30">
                Virtual coin balance • UI demo environment
              </p>

            </div>

            <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-400/70" />

          </div>

        </section>

      </main>


      {/* =====================================================
          BOTTOM NAVIGATION (premium)
      ====================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-50">

        <div className="mx-auto max-w-md px-3 pb-3">

          <div className="flex items-center justify-around rounded-[24px] border border-white/[0.08] bg-[#080d17]/95 px-2 py-2 shadow-[0_-15px_45px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

            {/* Home */}

            <button
              type="button"
              className="flex min-w-[62px] flex-col items-center py-1.5 transition hover:scale-105"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-gradient-to-br from-amber-300 to-orange-600 shadow-[0_6px_18px_rgba(245,158,11,0.25)]">
                <HomeIcon className="h-4.5 w-4.5 text-slate-950" />
              </div>

              <span className="mt-1 text-[6px] font-black uppercase tracking-wider text-amber-400">
                Home
              </span>

            </button>


            {/* One Figure */}

            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className="flex min-w-[62px] flex-col items-center py-1.5 transition hover:scale-105"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-amber-400/15 bg-amber-400/[0.08]">
                <Dices className="h-4.5 w-4.5 text-amber-300" />
              </div>

              <span className="mt-1 text-[6px] font-black uppercase tracking-wider text-white/40">
                Figure
              </span>

            </button>


            {/* Support */}

            <button
              type="button"
              onClick={openSupport}
              className="flex min-w-[62px] flex-col items-center py-1.5 transition hover:scale-105"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-[0_6px_18px_rgba(59,130,246,0.25)]">
                <Send className="h-4.5 w-4.5 text-white" />
              </div>

              <span className="mt-1 text-[6px] font-black uppercase tracking-wider text-blue-300/70">
                Support
              </span>

            </button>


            {/* Settings */}

            <button
              type="button"
              onClick={openSettings}
              className="flex min-w-[62px] flex-col items-center py-1.5 transition hover:scale-105"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-gradient-to-br from-slate-500 to-slate-800">
                <Settings className="h-4.5 w-4.5 text-white" />
              </div>

              <span className="mt-1 text-[6px] font-black uppercase tracking-wider text-white/40">
                Settings
              </span>

            </button>

          </div>

        </div>

      </nav>


      {/* =====================================================
          BALANCE MODAL (elegant)
      ====================================================== */}

      {showBalance && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-3 backdrop-blur-md sm:items-center">

          <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#080d17] shadow-[0_30px_100px_rgba(0,0,0,0.8)]">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/[0.08] blur-[60px]" />

            <div className="relative p-5">

              {/* Header */}

              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-amber-300 to-orange-600 shadow-[0_7px_20px_rgba(245,158,11,0.2)]">
                    <Wallet className="h-5 w-5 text-slate-950" />
                  </div>

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-amber-300/60">
                      Virtual Wallet
                    </p>

                    <h2 className="text-[18px] font-black">
                      Balance Center
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowBalance(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/[0.05] transition hover:bg-white/[0.1]"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>

              </div>


              {/* Balance */}

              <div className="mb-4 rounded-[22px] border border-amber-400/[0.12] bg-gradient-to-r from-amber-400/[0.08] to-transparent p-4 backdrop-blur-sm">

                <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-white/30">
                  Current Virtual Coins
                </p>

                <div className="mt-1.5 flex items-end justify-between">

                  <p className="text-4xl font-black tracking-tight">
                    {coins.toLocaleString()}
                  </p>

                  <span className="pb-1 text-[8px] font-bold text-amber-300/70">
                    COINS
                  </span>

                </div>

              </div>


              {/* Promo */}

              <div className="rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">

                <div className="mb-3 flex items-center gap-2.5">

                  <div className="flex h-8 w-8 items-center justify-center rounded-[12px] bg-amber-400/[0.08]">
                    <Gift className="h-4 w-4 text-amber-400" />
                  </div>

                  <div>

                    <h3 className="text-[9px] font-bold text-white/80">
                      Promotional Code
                    </h3>

                    <p className="text-[6px] text-white/25">
                      Only one promotional code is active
                    </p>

                  </div>

                </div>


                <div className="flex gap-2">

                  <input
                    value={promoCode}
                    onChange={(event) => {
                      setPromoCode(event.target.value);
                      setPromoMessage("");
                    }}
                    placeholder="Enter promo code"
                    className="min-w-0 flex-1 rounded-[12px] border border-white/[0.08] bg-black/30 px-4 py-3 text-[9px] font-bold text-white outline-none placeholder:text-white/20 focus:border-amber-400/30"
                  />

                  <button
                    type="button"
                    onClick={activatePromo}
                    disabled={promoUsed}
                    className="rounded-[12px] bg-gradient-to-r from-amber-300 to-orange-500 px-4 text-[7px] font-black uppercase tracking-wider text-slate-950 shadow-[0_4px_14px_rgba(245,158,11,0.25)] disabled:opacity-30"
                  >
                    Activate
                  </button>

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[6px] text-white/25">
                    Active code
                  </span>

                  <span className="rounded-md bg-amber-400/[0.08] px-2 py-1 text-[6px] font-black text-amber-300">
                    1000NSK
                  </span>

                </div>

                {promoMessage && (

                  <p
                    className={`mt-2 text-[7px] font-semibold ${
                      promoMessage.includes("added")
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {promoMessage}
                  </p>

                )}

              </div>


              {/* Package preview */}

              <div className="mt-4">

                <p className="mb-2 text-[6px] font-bold uppercase tracking-[0.18em] text-white/25">
                  Available Packages
                </p>

                <div className="grid grid-cols-3 gap-2">

                  {PACKAGES.slice(0, 6).map((item) => (

                    <div
                      key={item.amount}
                      className="rounded-[14px] border border-white/[0.06] bg-white/[0.03] p-2.5 opacity-60"
                    >

                      <div className="flex items-center justify-between">

                        <span className="text-[5px] uppercase tracking-wider text-white/25">
                          {item.label}
                        </span>

                        <Lock className="h-3 w-3 text-white/20" />

                      </div>

                      <p className="mt-1 text-[10px] font-black text-white/70">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </p>

                      <p className="mt-0.5 text-[5.5px] text-white/25">
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
          ONE FIGURE MODAL (polished)
      ====================================================== */}

      {showOneFigure && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-3 backdrop-blur-md sm:items-center">

          <div className="relative max-h-[94vh] w-full max-w-md overflow-y-auto rounded-[28px] border border-amber-400/[0.12] bg-[#080d17] shadow-[0_30px_100px_rgba(0,0,0,0.8)]">

            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-400/[0.10] blur-[70px]" />

            <div className="relative p-5">

              {/* Header */}

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 shadow-[0_7px_20px_rgba(245,158,11,0.25)]">
                    <Dices className="h-5 w-5 text-slate-950" />
                  </div>

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-amber-300/60">
                      Game Center
                    </p>

                    <h2 className="text-[18px] font-black">
                      One Figure
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowOneFigure(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/[0.05] transition hover:bg-white/[0.1]"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>

              </div>


              {/* Cost */}

              <div className="mb-4 flex items-center justify-between rounded-[14px] border border-amber-400/[0.10] bg-amber-400/[0.04] px-4 py-3 backdrop-blur-sm">

                <div className="flex items-center gap-2">

                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />

                  <span className="text-[7px] font-bold uppercase tracking-wider text-white/35">
                    Virtual Cost / Quantity
                  </span>

                </div>

                <span className="text-[10px] font-black text-amber-300">
                  {COINS_PER_QUANTITY} Coins
                </span>

              </div>


              {/* Digits */}

              <div className="mb-4 rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">

                <div className="mb-3 flex items-center justify-between">

                  <div>

                    <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/30">
                      Select Figures
                    </p>

                    <p className="mt-0.5 text-[6.5px] text-white/25">
                      Choose any available figure
                    </p>

                  </div>

                  <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[6px] font-black text-white/30">
                    0 — 9
                  </span>

                </div>


                <div className="grid grid-cols-5 gap-2">

                  {Array.from({ length: 10 }, (_, digit) => {

                    const quantity = quantities[digit] || 0;

                    const selected = quantity > 0;

                    return (

                      <div
                        key={digit}
                        className={`rounded-[14px] border p-2 transition ${
                          selected
                            ? "border-amber-400/25 bg-amber-400/[0.07]"
                            : "border-white/[0.06] bg-white/[0.03]"
                        }`}
                      >

                        <button
                          type="button"
                          onClick={() => increaseQuantity(digit)}
                          className={`mx-auto flex h-10 w-10 items-center justify-center rounded-[14px] text-[14px] font-black transition active:scale-90 ${
                            selected
                              ? "bg-gradient-to-br from-amber-300 to-orange-600 text-slate-950 shadow-[0_5px_14px_rgba(245,158,11,0.2)]"
                              : "bg-white/[0.06] text-white/80"
                          }`}
                        >
                          {digit}
                        </button>


                        <div className="mt-2 flex items-center justify-between gap-1">

                          <button
                            type="button"
                            disabled={!selected}
                            onClick={() => decreaseQuantity(digit)}
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] transition disabled:opacity-20 hover:bg-white/[0.1]"
                          >
                            <Minus className="h-3 w-3 text-white/60" />
                          </button>

                          <span className="text-[9px] font-black text-white/70">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(digit)}
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] transition hover:bg-white/[0.1]"
                          >
                            <Plus className="h-3 w-3 text-amber-400" />
                          </button>

                        </div>

                      </div>

                    );
                  })}

                </div>

              </div>


              {/* Selected */}

              <div className="mb-4 rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">

                <div className="mb-2.5 flex items-center justify-between">

                  <span className="text-[6px] font-bold uppercase tracking-[0.18em] text-white/30">
                    Current Selection
                  </span>

                  <span className="text-[7px] font-bold text-white/30">
                    {selectedDigits.length} selected
                  </span>

                </div>


                {selectedDigits.length === 0 ? (

                  <div className="rounded-[14px] border border-dashed border-white/[0.06] py-5 text-center">

                    <Dices className="mx-auto h-6 w-6 text-white/15" />

                    <p className="mt-1.5 text-[7px] text-white/25">
                      Select a figure to begin
                    </p>

                  </div>

                ) : (

                  <div className="flex flex-wrap gap-2">

                    {selectedDigits.map((digit) => (

                      <div
                        key={digit}
                        className="flex items-center gap-1.5 rounded-lg border border-amber-400/[0.15] bg-amber-400/[0.06] px-3 py-2"
                      >

                        <span className="text-[10px] font-black text-amber-300">
                          {digit}
                        </span>

                        <span className="text-[6px] text-white/35">
                          ×{quantities[digit]}
                        </span>

                      </div>

                    ))}

                  </div>

                )}

              </div>


              {/* Total */}

              <div className="mb-4 rounded-[22px] border border-white/[0.07] bg-gradient-to-r from-white/[0.05] to-transparent p-4 backdrop-blur-sm">

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-wider text-white/25">
                      Total Quantity
                    </p>

                    <p className="mt-0.5 text-2xl font-black">
                      {totalQuantity}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-[6px] font-bold uppercase tracking-wider text-white/25">
                      Virtual Coins
                    </p>

                    <p className="mt-0.5 text-2xl font-black text-amber-300">
                      {totalFigureCoins}
                    </p>

                  </div>

                </div>

              </div>


              {/* Disabled action */}

              <button
                type="button"
                disabled
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-amber-300 to-orange-500 py-3.5 text-[8px] font-black uppercase tracking-[0.15em] text-slate-950 opacity-50 shadow-[0_7px_18px_rgba(245,158,11,0.2)]"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-[6px] text-white/20">
                Game action is currently disabled in this UI build.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          WITHDRAW MODAL (refined)
      ====================================================== */}

      {showWithdraw && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-3 backdrop-blur-md sm:items-center">

          <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#080d17] shadow-[0_30px_100px_rgba(0,0,0,0.8)]">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-slate-400/[0.06] blur-[60px]" />

            <div className="relative p-5">

              {/* Header */}

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br from-slate-500 to-slate-800 shadow-[0_7px_18px_rgba(0,0,0,0.3)]">
                    <ArrowDownToLine className="h-5 w-5 text-white" />
                  </div>

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Wallet
                    </p>

                    <h2 className="text-[18px] font-black">
                      Withdraw
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowWithdraw(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/[0.05] transition hover:bg-white/[0.1]"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>

              </div>


              {/* Disabled banner */}

              <div className="mb-4 flex items-start gap-3 rounded-[20px] border border-amber-400/[0.10] bg-amber-400/[0.04] p-4 backdrop-blur-sm">

                <Clock3 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-amber-400/80" />

                <div>

                  <h3 className="text-[9px] font-bold text-amber-300/85">
                    Withdrawal Coming Soon
                  </h3>

                  <p className="mt-1 text-[7px] leading-relaxed text-white/30">
                    UPI and Bank Card withdrawal are currently disabled in this UI build.
                  </p>

                </div>

              </div>


              {/* Methods */}

              <div className="mb-4 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  disabled
                  onClick={() => setWithdrawMethod("upi")}
                  className={`rounded-[20px] border p-4 text-left opacity-50 ${
                    withdrawMethod === "upi"
                      ? "border-cyan-400/25 bg-cyan-400/[0.06]"
                      : "border-white/[0.06] bg-white/[0.03]"
                  }`}
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-cyan-400 to-blue-600">
                    <CreditCard className="h-4.5 w-4.5 text-white" />
                  </div>

                  <h3 className="mt-2.5 text-[9px] font-black">
                    UPI
                  </h3>

                  <p className="mt-0.5 text-[6px] text-white/25">
                    Coming Soon
                  </p>

                </button>


                <button
                  type="button"
                  disabled
                  onClick={() => setWithdrawMethod("bank")}
                  className={`rounded-[20px] border p-4 text-left opacity-50 ${
                    withdrawMethod === "bank"
                      ? "border-emerald-400/25 bg-emerald-400/[0.06]"
                      : "border-white/[0.06] bg-white/[0.03]"
                  }`}
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-emerald-400 to-teal-700">
                    <Banknote className="h-4.5 w-4.5 text-white" />
                  </div>

                  <h3 className="mt-2.5 text-[9px] font-black">
                    Bank Card
                  </h3>

                  <p className="mt-0.5 text-[6px] text-white/25">
                    Coming Soon
                  </p>

                </button>

              </div>


              {/* Disabled form preview */}

              <div className="space-y-3 rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-4 opacity-50 backdrop-blur-sm">

                <div>

                  <label className="mb-1 block text-[6px] font-bold uppercase tracking-wider text-white/30">
                    Account Details
                  </label>

                  <input
                    disabled
                    placeholder="Available when withdrawal launches"
                    className="w-full rounded-[12px] border border-white/[0.06] bg-black/30 px-4 py-3 text-[8px] text-white outline-none placeholder:text-white/20"
                  />

                </div>

                <div>

                  <label className="mb-1 block text-[6px] font-bold uppercase tracking-wider text-white/30">
                    Coins to Withdraw
                  </label>

                  <input
                    disabled
                    placeholder="0"
                    className="w-full rounded-[12px] border border-white/[0.06] bg-black/30 px-4 py-3 text-[8px] text-white outline-none placeholder:text-white/20"
                  />

                </div>

                <button
                  type="button"
                  disabled
                  className="w-full rounded-[14px] bg-white/[0.08] py-3.5 text-[7px] font-black uppercase tracking-wider text-white/30"
                >
                  Withdraw Disabled
                </button>

              </div>


              <p className="mt-4 text-center text-[6px] leading-relaxed text-white/20">
                No bank or payment information is collected by this UI.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          EXISTING SETTINGS & PRIVACY MODALS
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
