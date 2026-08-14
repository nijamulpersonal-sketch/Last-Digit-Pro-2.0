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
    <div className="min-h-screen overflow-x-hidden bg-[#050812] pb-24 text-white">

      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-cyan-500/[0.055] blur-[100px]" />

        <div className="absolute right-[-120px] top-[18%] h-80 w-80 rounded-full bg-violet-600/[0.06] blur-[110px]" />

        <div className="absolute bottom-[-100px] left-[15%] h-72 w-72 rounded-full bg-amber-500/[0.04] blur-[100px]" />

      </div>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 mx-auto w-full max-w-md px-3 pt-3">

        {/* ===================================================
            TOP BAR
        ================================================== */}

        <header className="mb-3">

          <div className="flex items-center justify-between">

            {/* Brand */}

            <div className="flex items-center gap-2">

              <div className="relative flex h-10 w-10 items-center justify-center rounded-[14px] border border-amber-300/20 bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 shadow-[0_7px_25px_rgba(245,158,11,0.22)]">

                <Dices className="h-5 w-5 text-slate-950" />

                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#050812] bg-emerald-400 text-[6px] font-black text-slate-950">
                  +
                </span>

              </div>

              <div>

                <p className="text-[6px] font-bold uppercase tracking-[0.25em] text-cyan-300/50">
                  Premium Gaming
                </p>

                <h1 className="text-[18px] font-black leading-none tracking-[-0.045em]">
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
              className="group flex items-center gap-1.5 rounded-[14px] border border-amber-300/15 bg-white/[0.035] px-2 py-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.2)] backdrop-blur-xl transition active:scale-95"
            >

              <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-gradient-to-br from-amber-300 to-orange-600">
                <Wallet className="h-3.5 w-3.5 text-slate-950" />
              </div>

              <div className="text-left">

                <p className="text-[5.5px] font-bold uppercase tracking-[0.18em] text-white/30">
                  Coins
                </p>

                <p className="text-[10px] font-black text-white">
                  {coins.toLocaleString()}
                </p>

              </div>

              <Plus className="h-3 w-3 text-amber-400 transition group-active:rotate-90" />

            </button>

          </div>


          {/* Live bar */}

          <div className="mt-2 flex items-center justify-between rounded-[13px] border border-white/[0.055] bg-white/[0.018] px-2.5 py-1.5">

            <div className="flex items-center gap-1.5">

              <span className="relative flex h-1.5 w-1.5">

                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />

              </span>

              <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-emerald-300/70">
                Server Online
              </span>

            </div>

            <div className="flex items-center gap-1">

              <Users className="h-2.5 w-2.5 text-cyan-400/70" />

              <span className="text-[7px] font-bold text-white/35">
                {activeUsers} Players Active
              </span>

            </div>

          </div>

        </header>


        {/* ===================================================
            HERO GAME PANEL
        ================================================== */}

        <section className="mb-3">

          <div className="relative overflow-hidden rounded-[22px] border border-cyan-300/[0.12] bg-gradient-to-br from-[#082c34] via-[#07131e] to-[#110a25] p-3.5 shadow-[0_18px_55px_rgba(0,0,0,0.3)]">

            {/* Decorative lights */}

            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/[0.09] blur-[40px]" />

            <div className="absolute -bottom-16 left-20 h-32 w-32 rounded-full bg-violet-500/[0.08] blur-[45px]" />

            <div className="absolute right-5 top-5 opacity-[0.035]">
              <Dices className="h-28 w-28" />
            </div>


            <div className="relative">

              <div className="flex items-start justify-between">

                <div>

                  <div className="mb-1 flex items-center gap-1.5">

                    <Sparkles className="h-3 w-3 text-amber-300" />

                    <span className="text-[7px] font-black uppercase tracking-[0.22em] text-amber-300/70">
                      Welcome to the Arena
                    </span>

                  </div>

                  <h2 className="text-[21px] font-black leading-tight tracking-[-0.04em]">
                    PLAY • SELECT • ENJOY
                  </h2>

                  <p className="mt-1 max-w-[245px] text-[8px] leading-relaxed text-white/35">
                    Explore premium tools inside your compact gaming dashboard.
                  </p>

                </div>


                <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.045] px-2 py-1.5 text-center">

                  <p className="text-[5px] font-bold uppercase tracking-wider text-white/25">
                    Status
                  </p>

                  <div className="mt-0.5 flex items-center gap-1">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[7px] font-black text-emerald-300">
                      LIVE
                    </span>

                  </div>

                </div>

              </div>


              {/* Mini stats */}

              <div className="mt-3 grid grid-cols-3 gap-1.5">

                <div className="rounded-xl border border-white/[0.05] bg-black/20 px-2 py-2">

                  <p className="text-[5.5px] uppercase tracking-wider text-white/25">
                    Tools
                  </p>

                  <p className="mt-0.5 text-[11px] font-black">
                    04
                  </p>

                </div>

                <div className="rounded-xl border border-white/[0.05] bg-black/20 px-2 py-2">

                  <p className="text-[5.5px] uppercase tracking-wider text-white/25">
                    Figures
                  </p>

                  <p className="mt-0.5 text-[11px] font-black">
                    10
                  </p>

                </div>

                <div className="rounded-xl border border-white/[0.05] bg-black/20 px-2 py-2">

                  <p className="text-[5.5px] uppercase tracking-wider text-white/25">
                    Live
                  </p>

                  <p className="mt-0.5 text-[11px] font-black text-emerald-400">
                    ON
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            FEATURE GRID
        ================================================== */}

        <section className="mb-3">

          <div className="mb-2 flex items-center justify-between px-0.5">

            <div>

              <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-white/25">
                Game Center
              </p>

              <h2 className="text-[14px] font-black text-white">
                Featured Tools
              </h2>

            </div>

            <span className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.035] px-2 py-1 text-[6px] font-bold uppercase tracking-wider text-cyan-300/60">
              Explore
            </span>

          </div>


          <div className="grid grid-cols-2 gap-2">

            {/* Lucky Search */}

            <button
              type="button"
              onClick={() => setLocation("/lucky-search")}
              className="group relative min-h-[125px] overflow-hidden rounded-[19px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[0.08] via-[#0b0d19] to-[#070a11] p-3 text-left transition active:scale-[0.98]"
            >

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-violet-500/[0.08] blur-[30px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-violet-500 to-indigo-700 shadow-[0_7px_18px_rgba(124,58,237,0.2)]">
                    <Search className="h-4 w-4 text-white" />
                  </div>

                  <Lock className="h-3 w-3 text-amber-400/60" />

                </div>

                <div className="mt-4">

                  <h3 className="text-[12px] font-black text-white">
                    Lucky Search
                  </h3>

                  <p className="mt-1 text-[7px] text-white/30">
                    Premium prediction tool
                  </p>

                </div>

                <div className="mt-2 flex items-center gap-1 text-[6px] font-black uppercase tracking-wider text-violet-300/65">
                  Open
                  <ChevronRight className="h-2.5 w-2.5" />
                </div>

              </div>

            </button>


            {/* Dear Digits */}

            <button
              type="button"
              onClick={() => setLocation("/dear-digits")}
              className="group relative min-h-[125px] overflow-hidden rounded-[19px] border border-cyan-400/10 bg-gradient-to-br from-cyan-500/[0.075] via-[#071219] to-[#070a11] p-3 text-left transition active:scale-[0.98]"
            >

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-400/[0.08] blur-[30px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-cyan-400 to-blue-700 shadow-[0_7px_18px_rgba(14,165,233,0.18)]">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>

                  <span className="rounded-full bg-cyan-400/[0.06] px-1.5 py-1 text-[5.5px] font-black text-cyan-300/60">
                    LIVE
                  </span>

                </div>

                <div className="mt-4">

                  <h3 className="text-[12px] font-black text-white">
                    Dear Digits
                  </h3>

                  <p className="mt-1 text-[7px] text-white/30">
                    60-day chart analysis
                  </p>

                </div>

                <div className="mt-2 flex items-center gap-1 text-[6px] font-black uppercase tracking-wider text-cyan-300/65">
                  Analyze
                  <ChevronRight className="h-2.5 w-2.5" />
                </div>

              </div>

            </button>


            {/* One Figure */}

            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className="group relative min-h-[125px] overflow-hidden rounded-[19px] border border-amber-400/15 bg-gradient-to-br from-amber-500/[0.10] via-[#171108] to-[#090a0d] p-3 text-left transition active:scale-[0.98]"
            >

              <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-amber-400/[0.11] blur-[32px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700 shadow-[0_7px_20px_rgba(245,158,11,0.22)]">
                    <Dices className="h-4 w-4 text-slate-950" />
                  </div>

                  <span className="rounded-full border border-amber-400/15 bg-amber-400/[0.06] px-1.5 py-1 text-[5.5px] font-black uppercase text-amber-300">
                    Premium
                  </span>

                </div>

                <div className="mt-4">

                  <h3 className="text-[12px] font-black text-white">
                    One Figure
                  </h3>

                  <p className="mt-1 text-[7px] text-white/30">
                    Select your figures
                  </p>

                </div>

                <div className="mt-2 flex items-center gap-1 text-[6px] font-black uppercase tracking-wider text-amber-300/70">
                  Play
                  <ChevronRight className="h-2.5 w-2.5" />
                </div>

              </div>

            </button>


            {/* Lottery Fax */}

            <button
              type="button"
              onClick={openLotteryFax}
              className="group relative min-h-[125px] overflow-hidden rounded-[19px] border border-pink-400/10 bg-gradient-to-br from-pink-500/[0.075] via-[#160b13] to-[#080a10] p-3 text-left transition active:scale-[0.98]"
            >

              <div className="relative">

                <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-br from-pink-500 to-rose-700 shadow-[0_7px_18px_rgba(236,72,153,0.18)]">
                  <FileText className="h-4 w-4 text-white" />
                </div>

                <div className="mt-4">

                  <h3 className="text-[12px] font-black text-white">
                    Lottery Fax
                  </h3>

                  <p className="mt-1 text-[7px] text-white/30">
                    Results archive
                  </p>

                </div>

                <div className="mt-2 flex items-center gap-1 text-[6px] font-black uppercase tracking-wider text-pink-300/65">
                  View
                  <ChevronRight className="h-2.5 w-2.5" />
                </div>

              </div>

            </button>

          </div>

        </section>


        {/* ===================================================
            YOUTUBE CHANNEL
        ================================================== */}

        <section className="mb-3">

          <button
            type="button"
            onClick={openYouTube}
            className="group relative flex w-full items-center gap-3 overflow-hidden rounded-[19px] border border-red-400/[0.11] bg-gradient-to-r from-red-500/[0.07] via-white/[0.025] to-transparent p-3 text-left transition active:scale-[0.985]"
          >

            <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-red-500/[0.07] blur-[35px]" />

            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br from-red-500 to-red-700 shadow-[0_7px_20px_rgba(239,68,68,0.2)]">
              <Youtube className="h-5 w-5 text-white" />
            </div>

            <div className="relative min-w-0 flex-1">

              <div className="flex items-center gap-1.5">

                <h3 className="text-[12px] font-black text-white">
                  Dear Lottery
                </h3>

                <span className="rounded-full bg-red-400/[0.07] px-1.5 py-0.5 text-[5px] font-black uppercase text-red-300">
                  Official
                </span>

              </div>

              <p className="mt-1 truncate text-[7px] text-white/30">
                YouTube Channel • Watch latest content
              </p>

            </div>

            <ArrowRight className="relative h-4 w-4 text-red-300/60 transition group-active:translate-x-1" />

          </button>

        </section>


        {/* ===================================================
            BALANCE / PACKAGES
        ================================================== */}

        <section className="mb-3">

          <div className="relative overflow-hidden rounded-[21px] border border-amber-400/[0.11] bg-gradient-to-br from-[#171205] via-[#0c0d12] to-[#080a0f] p-3.5">

            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-400/[0.075] blur-[40px]" />

            <div className="relative">

              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-600">
                    <Wallet className="h-4 w-4 text-slate-950" />
                  </div>

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-[0.18em] text-amber-300/50">
                      Virtual Wallet
                    </p>

                    <h2 className="text-[14px] font-black">
                      Add Coins
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowBalance(true)}
                  className="rounded-lg border border-amber-400/10 bg-amber-400/[0.045] px-2 py-1 text-[6px] font-black uppercase tracking-wider text-amber-300"
                >
                  Promo
                </button>

              </div>


              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">

                {PACKAGES.map((item) => (

                  <button
                    key={item.amount}
                    type="button"
                    disabled
                    className="relative overflow-hidden rounded-xl border border-white/[0.055] bg-white/[0.025] px-2 py-2.5 text-left opacity-75"
                  >

                    <div className="flex items-center justify-between">

                      <span className="text-[6px] font-bold uppercase tracking-wider text-white/25">
                        {item.label}
                      </span>

                      <Lock className="h-2.5 w-2.5 text-white/15" />

                    </div>

                    <p className="mt-1 text-[11px] font-black text-white/75">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </p>

                    <p className="mt-0.5 text-[6px] text-amber-300/45">
                      {item.coins.toLocaleString()} Coins
                    </p>

                    <div className="mt-1.5 text-[5.5px] font-bold uppercase tracking-wider text-white/15">
                      Buy unavailable
                    </div>

                  </button>

                ))}

              </div>


              <div className="mt-2 flex items-center gap-1.5 rounded-xl border border-white/[0.045] bg-black/20 px-2.5 py-2">

                <Gift className="h-3 w-3 text-amber-400" />

                <p className="text-[7px] text-white/30">
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
            WITHDRAW UI
        ================================================== */}

        <section className="mb-3">

          <button
            type="button"
            onClick={() => setShowWithdraw(true)}
            className="group flex w-full items-center gap-3 rounded-[19px] border border-white/[0.065] bg-gradient-to-r from-white/[0.035] to-transparent p-3 text-left transition active:scale-[0.985]"
          >

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br from-slate-600 to-slate-800">
              <ArrowDownToLine className="h-4.5 w-4.5 text-white/80" />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-center gap-1.5">

                <h3 className="text-[12px] font-black">
                  Withdraw
                </h3>

                <span className="rounded-full bg-white/[0.05] px-1.5 py-0.5 text-[5px] font-black uppercase tracking-wider text-white/30">
                  Coming Soon
                </span>

              </div>

              <p className="mt-1 text-[7px] text-white/25">
                UPI & Bank Card options
              </p>

            </div>

            <ChevronRight className="h-4 w-4 text-white/20 transition group-active:translate-x-1" />

          </button>

        </section>


        {/* ===================================================
            SECURITY
        ================================================== */}

        <section>

          <div className="flex items-center gap-2.5 rounded-[18px] border border-emerald-400/[0.08] bg-emerald-400/[0.025] px-3 py-2.5">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/[0.06]">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>

            <div className="min-w-0">

              <h3 className="text-[9px] font-bold text-white/80">
                Secure Gaming Environment
              </h3>

              <p className="mt-0.5 text-[6.5px] text-white/25">
                Virtual coin balance • UI demo environment
              </p>

            </div>

            <CheckCircle2 className="ml-auto h-3.5 w-3.5 shrink-0 text-emerald-400/60" />

          </div>

        </section>

      </main>


      {/* =====================================================
          BOTTOM NAVIGATION
      ====================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-50">

        <div className="mx-auto max-w-md px-3 pb-2">

          <div className="flex items-center justify-around rounded-[21px] border border-white/[0.07] bg-[#080d17]/95 px-2 py-1.5 shadow-[0_-15px_45px_rgba(0,0,0,0.4)] backdrop-blur-2xl">

            {/* Home */}

            <button
              type="button"
              className="flex min-w-[62px] flex-col items-center py-1"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-600 shadow-[0_6px_18px_rgba(245,158,11,0.2)]">
                <HomeIcon className="h-4 w-4 text-slate-950" />
              </div>

              <span className="mt-0.5 text-[6px] font-black uppercase tracking-wider text-amber-400">
                Home
              </span>

            </button>


            {/* One Figure */}

            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className="flex min-w-[62px] flex-col items-center py-1"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-400/10 bg-amber-400/[0.05]">
                <Dices className="h-4 w-4 text-amber-300" />
              </div>

              <span className="mt-0.5 text-[6px] font-black uppercase tracking-wider text-white/35">
                Figure
              </span>

            </button>


            {/* Support */}

            <button
              type="button"
              onClick={openSupport}
              className="flex min-w-[62px] flex-col items-center py-1"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-[0_6px_18px_rgba(59,130,246,0.18)]">
                <Send className="h-4 w-4 text-white" />
              </div>

              <span className="mt-0.5 text-[6px] font-black uppercase tracking-wider text-blue-300/70">
                Support
              </span>

            </button>


            {/* Settings */}

            <button
              type="button"
              onClick={openSettings}
              className="flex min-w-[62px] flex-col items-center py-1"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-700">
                <Settings className="h-4 w-4 text-white" />
              </div>

              <span className="mt-0.5 text-[6px] font-black uppercase tracking-wider text-white/35">
                Settings
              </span>

            </button>

          </div>

        </div>

      </nav>


      {/* =====================================================
          BALANCE MODAL
      ====================================================== */}

      {showBalance && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-2.5 backdrop-blur-md sm:items-center">

          <div className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#080d17] shadow-[0_30px_100px_rgba(0,0,0,0.7)]">

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/[0.07] blur-[55px]" />

            <div className="relative p-4">

              {/* Header */}

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-600">
                    <Wallet className="h-5 w-5 text-slate-950" />
                  </div>

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-amber-300/50">
                      Virtual Wallet
                    </p>

                    <h2 className="text-[17px] font-black">
                      Balance Center
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowBalance(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]"
                >
                  <X className="h-3.5 w-3.5 text-white/50" />
                </button>

              </div>


              {/* Balance */}

              <div className="mb-3 rounded-[20px] border border-amber-400/[0.10] bg-gradient-to-r from-amber-400/[0.06] to-transparent p-3.5">

                <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-white/25">
                  Current Virtual Coins
                </p>

                <div className="mt-1 flex items-end justify-between">

                  <p className="text-3xl font-black tracking-tight">
                    {coins.toLocaleString()}
                  </p>

                  <span className="pb-1 text-[8px] font-bold text-amber-300/60">
                    COINS
                  </span>

                </div>

              </div>


              {/* Promo */}

              <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.018] p-3">

                <div className="mb-2.5 flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/[0.06]">
                    <Gift className="h-3.5 w-3.5 text-amber-400" />
                  </div>

                  <div>

                    <h3 className="text-[9px] font-bold text-white/70">
                      Promotional Code
                    </h3>

                    <p className="text-[6px] text-white/20">
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
                    className="min-w-0 flex-1 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2.5 text-[9px] font-bold text-white outline-none placeholder:text-white/15 focus:border-amber-400/20"
                  />

                  <button
                    type="button"
                    onClick={activatePromo}
                    disabled={promoUsed}
                    className="rounded-xl bg-gradient-to-r from-amber-300 to-orange-500 px-3 text-[7px] font-black uppercase tracking-wider text-slate-950 disabled:opacity-30"
                  >
                    Activate
                  </button>

                </div>

                <div className="mt-2 flex items-center justify-between">

                  <span className="text-[6px] text-white/20">
                    Active code
                  </span>

                  <span className="rounded-md bg-amber-400/[0.06] px-1.5 py-1 text-[6px] font-black text-amber-300">
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

              <div className="mt-3">

                <p className="mb-2 text-[6px] font-bold uppercase tracking-[0.18em] text-white/20">
                  Available Packages
                </p>

                <div className="grid grid-cols-3 gap-1.5">

                  {PACKAGES.slice(0, 6).map((item) => (

                    <div
                      key={item.amount}
                      className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-2 opacity-55"
                    >

                      <div className="flex items-center justify-between">

                        <span className="text-[5px] uppercase tracking-wider text-white/20">
                          {item.label}
                        </span>

                        <Lock className="h-2.5 w-2.5 text-white/15" />

                      </div>

                      <p className="mt-1 text-[9px] font-black text-white/65">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </p>

                      <p className="mt-0.5 text-[5.5px] text-white/20">
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
          ONE FIGURE MODAL
      ====================================================== */}

      {showOneFigure && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-2.5 backdrop-blur-md sm:items-center">

          <div className="relative max-h-[94vh] w-full max-w-md overflow-y-auto rounded-[26px] border border-amber-400/[0.10] bg-[#080d17] shadow-[0_30px_100px_rgba(0,0,0,0.7)]">

            <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-amber-400/[0.075] blur-[60px]" />

            <div className="relative p-4">

              {/* Header */}

              <div className="mb-3.5 flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-orange-500 to-orange-700">
                    <Dices className="h-5 w-5 text-slate-950" />
                  </div>

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-amber-300/50">
                      Game Center
                    </p>

                    <h2 className="text-[17px] font-black">
                      One Figure
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowOneFigure(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]"
                >
                  <X className="h-3.5 w-3.5 text-white/50" />
                </button>

              </div>


              {/* Cost */}

              <div className="mb-3 flex items-center justify-between rounded-xl border border-amber-400/[0.08] bg-amber-400/[0.035] px-3 py-2.5">

                <div className="flex items-center gap-1.5">

                  <Sparkles className="h-3 w-3 text-amber-400" />

                  <span className="text-[7px] font-bold uppercase tracking-wider text-white/30">
                    Virtual Cost / Quantity
                  </span>

                </div>

                <span className="text-[10px] font-black text-amber-300">
                  {COINS_PER_QUANTITY} Coins
                </span>

              </div>


              {/* Digits */}

              <div className="mb-3 rounded-[20px] border border-white/[0.06] bg-white/[0.018] p-3">

                <div className="mb-2.5 flex items-center justify-between">

                  <div>

                    <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/25">
                      Select Figures
                    </p>

                    <p className="mt-0.5 text-[6.5px] text-white/20">
                      Choose any available figure
                    </p>

                  </div>

                  <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[6px] font-black text-white/25">
                    0 — 9
                  </span>

                </div>


                <div className="grid grid-cols-5 gap-1.5">

                  {Array.from({ length: 10 }, (_, digit) => {

                    const quantity = quantities[digit] || 0;

                    const selected = quantity > 0;

                    return (

                      <div
                        key={digit}
                        className={`rounded-xl border p-1.5 transition ${
                          selected
                            ? "border-amber-400/20 bg-amber-400/[0.055]"
                            : "border-white/[0.05] bg-white/[0.018]"
                        }`}
                      >

                        <button
                          type="button"
                          onClick={() => increaseQuantity(digit)}
                          className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-[13px] font-black transition active:scale-90 ${
                            selected
                              ? "bg-gradient-to-br from-amber-300 to-orange-600 text-slate-950 shadow-[0_5px_14px_rgba(245,158,11,0.18)]"
                              : "bg-white/[0.055] text-white/75"
                          }`}
                        >
                          {digit}
                        </button>


                        <div className="mt-1.5 flex items-center justify-between gap-1">

                          <button
                            type="button"
                            disabled={!selected}
                            onClick={() => decreaseQuantity(digit)}
                            className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05] disabled:opacity-20"
                          >
                            <Minus className="h-2.5 w-2.5 text-white/55" />
                          </button>

                          <span className="text-[8px] font-black text-white/65">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(digit)}
                            className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05]"
                          >
                            <Plus className="h-2.5 w-2.5 text-amber-400" />
                          </button>

                        </div>

                      </div>

                    );
                  })}

                </div>

              </div>


              {/* Selected */}

              <div className="mb-3 rounded-[20px] border border-white/[0.06] bg-white/[0.018] p-3">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-[6px] font-bold uppercase tracking-[0.18em] text-white/25">
                    Current Selection
                  </span>

                  <span className="text-[7px] font-bold text-white/25">
                    {selectedDigits.length} selected
                  </span>

                </div>


                {selectedDigits.length === 0 ? (

                  <div className="rounded-xl border border-dashed border-white/[0.06] py-4 text-center">

                    <Dices className="mx-auto h-5 w-5 text-white/10" />

                    <p className="mt-1 text-[7px] text-white/20">
                      Select a figure to begin
                    </p>

                  </div>

                ) : (

                  <div className="flex flex-wrap gap-1.5">

                    {selectedDigits.map((digit) => (

                      <div
                        key={digit}
                        className="flex items-center gap-1 rounded-lg border border-amber-400/[0.12] bg-amber-400/[0.04] px-2 py-1.5"
                      >

                        <span className="text-[9px] font-black text-amber-300">
                          {digit}
                        </span>

                        <span className="text-[6px] text-white/30">
                          ×{quantities[digit]}
                        </span>

                      </div>

                    ))}

                  </div>

                )}

              </div>


              {/* Total */}

              <div className="mb-3 rounded-[19px] border border-white/[0.07] bg-gradient-to-r from-white/[0.04] to-transparent p-3">

                <div className="grid grid-cols-2 gap-3">

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-wider text-white/20">
                      Total Quantity
                    </p>

                    <p className="mt-0.5 text-xl font-black">
                      {totalQuantity}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-[6px] font-bold uppercase tracking-wider text-white/20">
                      Virtual Coins
                    </p>

                    <p className="mt-0.5 text-xl font-black text-amber-300">
                      {totalFigureCoins}
                    </p>

                  </div>

                </div>

              </div>


              {/* Disabled action */}

              <button
                type="button"
                disabled
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-orange-500 py-3 text-[8px] font-black uppercase tracking-[0.15em] text-slate-950 opacity-45"
              >
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <p className="mt-2 text-center text-[6px] text-white/15">
                Game action is currently disabled in this UI build.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          WITHDRAW MODAL
      ====================================================== */}

      {showWithdraw && (

        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-2.5 backdrop-blur-md sm:items-center">

          <div className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#080d17] shadow-[0_30px_100px_rgba(0,0,0,0.7)]">

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-slate-400/[0.045] blur-[55px]" />

            <div className="relative p-4">

              {/* Header */}

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-800">
                    <ArrowDownToLine className="h-5 w-5 text-white" />
                  </div>

                  <div>

                    <p className="text-[6px] font-bold uppercase tracking-[0.2em] text-white/25">
                      Wallet
                    </p>

                    <h2 className="text-[17px] font-black">
                      Withdraw
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowWithdraw(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]"
                >
                  <X className="h-3.5 w-3.5 text-white/50" />
                </button>

              </div>


              {/* Disabled banner */}

              <div className="mb-3 flex items-start gap-2.5 rounded-[18px] border border-amber-400/[0.08] bg-amber-400/[0.025] p-3">

                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/70" />

                <div>

                  <h3 className="text-[9px] font-bold text-amber-300/80">
                    Withdrawal Coming Soon
                  </h3>

                  <p className="mt-1 text-[7px] leading-relaxed text-white/25">
                    UPI and Bank Card withdrawal are currently disabled in this UI build.
                  </p>

                </div>

              </div>


              {/* Methods */}

              <div className="mb-3 grid grid-cols-2 gap-2">

                <button
                  type="button"
                  disabled
                  onClick={() => setWithdrawMethod("upi")}
                  className={`rounded-[18px] border p-3 text-left opacity-50 ${
                    withdrawMethod === "upi"
                      ? "border-cyan-400/20 bg-cyan-400/[0.04]"
                      : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>

                  <h3 className="mt-2 text-[9px] font-black">
                    UPI
                  </h3>

                  <p className="mt-0.5 text-[6px] text-white/20">
                    Coming Soon
                  </p>

                </button>


                <button
                  type="button"
                  disabled
                  onClick={() => setWithdrawMethod("bank")}
                  className={`rounded-[18px] border p-3 text-left opacity-50 ${
                    withdrawMethod === "bank"
                      ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                      : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-700">
                    <Banknote className="h-4 w-4 text-white" />
                  </div>

                  <h3 className="mt-2 text-[9px] font-black">
                    Bank Card
                  </h3>

                  <p className="mt-0.5 text-[6px] text-white/20">
                    Coming Soon
                  </p>

                </button>

              </div>


              {/* Disabled form preview */}

              <div className="space-y-2 rounded-[20px] border border-white/[0.06] bg-white/[0.018] p-3 opacity-45">

                <div>

                  <label className="mb-1 block text-[6px] font-bold uppercase tracking-wider text-white/25">
                    Account Details
                  </label>

                  <input
                    disabled
                    placeholder="Available when withdrawal launches"
                    className="w-full rounded-xl border border-white/[0.05] bg-black/20 px-3 py-2.5 text-[8px] text-white outline-none placeholder:text-white/15"
                  />

                </div>

                <div>

                  <label className="mb-1 block text-[6px] font-bold uppercase tracking-wider text-white/25">
                    Coins to Withdraw
                  </label>

                  <input
                    disabled
                    placeholder="0"
                    className="w-full rounded-xl border border-white/[0.05] bg-black/20 px-3 py-2.5 text-[8px] text-white outline-none placeholder:text-white/15"
                  />

                </div>

                <button
                  type="button"
                  disabled
                  className="w-full rounded-xl bg-white/[0.06] py-3 text-[7px] font-black uppercase tracking-wider text-white/25"
                >
                  Withdraw Disabled
                </button>

              </div>


              <p className="mt-3 text-center text-[6px] leading-relaxed text-white/15">
                No bank or payment information is collected by this UI.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          EXISTING SETTINGS
      ====================================================== */}

      <SettingsModal
        isOpen={showSettings}
        onClose={closeSettings}
        onOpenPrivacy={openPrivacy}
      />


      {/* =====================================================
          PRIVACY
      ====================================================== */}

      <PrivacyPolicyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />

    </div>
  );
}
