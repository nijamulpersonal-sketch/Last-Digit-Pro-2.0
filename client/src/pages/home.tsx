import { useEffect, useMemo, useState } from "react";
import {
  ShieldCheck,
  Clock,
  Search,
  TrendingUp,
  FileText,
  Settings,
  Lock,
  Users,
  Home as HomeIcon,
  Send,
  ArrowRight,
  CheckCircle,
  Dices,
  Youtube,
  Wallet,
  Plus,
  Minus,
  X,
  Sparkles,
  CreditCard,
  Copy,
  Check,
} from "lucide-react";
import { useLocation } from "wouter";

import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

const COINS_PER_QUANTITY = 11;

export default function Home() {
  const [, setLocation] = useLocation();

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [showOneFigure, setShowOneFigure] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const [activeUsers, setActiveUsers] = useState(29);
  const [balance, setBalance] = useState(0);

  const [redeemCode, setRedeemCode] = useState("");
  const [redeemMessage, setRedeemMessage] = useState("");

  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateActiveUsers = () => {
      const min = 20;
      const max = 45;

      setActiveUsers(
        Math.floor(Math.random() * (max - min + 1)) + min
      );
    };

    updateActiveUsers();

    const interval = setInterval(updateActiveUsers, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const totalCoins = totalQuantity * COINS_PER_QUANTITY;

  const remainingCoins = balance - totalCoins;

  const handleSettingsOpen = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handlePrivacyOpen = () => {
    setShowSettings(false);

    setTimeout(() => {
      setShowPrivacy(true);
    }, 100);
  };

  const handlePrivacyClose = () => {
    setShowPrivacy(false);
  };

  const openSupport = () => {
    window.open(
      "https://t.me/NskNijamul",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openYouTube = () => {
    window.open(
      "https://youtube.com/@dearlottery?si=3bykwvdIrwnBFyXh",
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

  const addQuantity = (digit: number) => {
    setQuantities((current) => ({
      ...current,
      [digit]: (current[digit] || 0) + 1,
    }));
  };

  const removeQuantity = (digit: number) => {
    setQuantities((current) => {
      const next = { ...current };
      const currentValue = next[digit] || 0;

      if (currentValue <= 1) {
        delete next[digit];
      } else {
        next[digit] = currentValue - 1;
      }

      return next;
    });
  };

  const redeemDemoCode = () => {
    const normalized = redeemCode.trim();

    const match = normalized.match(/^OneFigure(100|[1-9][0-9]?)$/i);

    if (!match) {
      setRedeemMessage(
        "Invalid code. Use OneFigure1 to OneFigure100."
      );
      return;
    }

    const codeNumber = Number(match[1]);

    if (codeNumber < 1 || codeNumber > 100) {
      setRedeemMessage("Invalid demo code.");
      return;
    }

    const coinsToAdd = codeNumber * 1000;

    setBalance((current) => current + coinsToAdd);
    setRedeemCode("");

    setRedeemMessage(
      `${coinsToAdd.toLocaleString()} demo coins added successfully.`
    );
  };

  const continueToTelegram = () => {
    if (totalQuantity <= 0) {
      return;
    }

    if (totalCoins > balance) {
      return;
    }

    setShowSummary(true);
  };

  const telegramSummary = useMemo(() => {
    const lines = selectedDigits.map(
      (digit) =>
        `Digit ${digit}: ${quantities[digit]} × ${COINS_PER_QUANTITY} coins`
    );

    return [
      "ONE FIGURE SELECTION",
      "",
      ...lines,
      "",
      `Total Quantity: ${totalQuantity}`,
      `Total Coins: ${totalCoins}`,
      `Remaining Balance: ${remainingCoins}`,
    ].join("\n");
  }, [
    selectedDigits,
    quantities,
    totalQuantity,
    totalCoins,
    remainingCoins,
  ]);

  const sendToTelegram = () => {
    const encoded = encodeURIComponent(telegramSummary);

    window.open(
      `https://t.me/NskNijamul?text=${encoded}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(telegramSummary);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-white selection:bg-amber-500/30 pb-24">

      {/* Background ambience */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-amber-500/[0.035] blur-[100px]" />

        <div className="absolute top-[38%] -right-40 h-80 w-80 rounded-full bg-indigo-500/[0.035] blur-[110px]" />

        <div className="absolute bottom-0 left-[30%] h-72 w-72 rounded-full bg-emerald-500/[0.025] blur-[100px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-md px-3.5 pt-4">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="mb-4">

          <div className="flex items-center justify-between gap-2">

            <div className="min-w-0">
              <p className="mb-1 text-[7px] font-semibold uppercase tracking-[0.25em] text-white/30">
                Premium Analytics
              </p>

              <h1 className="text-[19px] font-black leading-none tracking-[-0.045em] bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                LAST DIGIT PRO
              </h1>
            </div>

            {/* Balance */}

            <button
              type="button"
              onClick={() => setShowBalance(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-amber-400/[0.12] bg-white/[0.035] px-2 py-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition active:scale-95"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 to-orange-600">
                <Wallet className="h-3.5 w-3.5 text-slate-950" />
              </div>

              <div className="text-left">
                <p className="text-[6px] font-bold uppercase tracking-wider text-white/30">
                  Balance
                </p>

                <p className="text-[10px] font-black text-white">
                  {balance.toLocaleString()} C
                </p>
              </div>

              <Plus className="h-3 w-3 text-amber-400" />
            </button>

          </div>

          <div className="mt-2.5 flex justify-end">
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-400/[0.09] bg-emerald-400/[0.035] px-2.5 py-1.5">

              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>

              <Users className="h-3 w-3 text-emerald-400" />

              <span className="text-[8px] font-bold tracking-wide text-emerald-300">
                {activeUsers} LIVE
              </span>

            </div>
          </div>

        </header>


        {/* =====================================================
            STATUS STRIP
        ====================================================== */}

        <section className="mb-3.5">

          <div className="rounded-[18px] border border-white/[0.065] bg-white/[0.022] px-3.5 py-2.5 backdrop-blur-xl">

            <div className="flex items-center justify-center gap-2.5">

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />

                <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">
                  Secure
                </span>
              </div>

              <span className="h-0.5 w-0.5 rounded-full bg-white/20" />

              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-400" />

                <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/45">
                  Live Updates
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            DASHBOARD
        ====================================================== */}

        <section className="mb-3.5">

          <div className="relative overflow-hidden rounded-[22px] border border-white/[0.075] bg-gradient-to-br from-white/[0.045] via-white/[0.018] to-transparent p-3.5 shadow-[0_15px_45px_rgba(0,0,0,0.18)]">

            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-amber-400/[0.055] blur-[55px]" />

            <div className="relative">

              <div className="mb-3 flex items-center justify-between">

                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                    Dashboard
                  </p>

                  <h2 className="mt-0.5 text-[17px] font-bold tracking-tight text-white">
                    Premium Tools
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500">
                  <CheckCircle className="h-4 w-4 text-slate-950" />
                </div>

              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-black/20 px-3 py-2.5">

                <div>
                  <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-white/25">
                    System Status
                  </p>

                  <p className="mt-0.5 text-[11px] font-semibold text-white/80">
                    All systems operational
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.5)]" />

                  <span className="text-[7px] font-bold text-emerald-400">
                    ONLINE
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FEATURE GRID
        ====================================================== */}

        <section className="mb-3.5">

          <div className="grid grid-cols-2 gap-2.5">

            {/* Lucky Search */}

            <button
              type="button"
              onClick={() => setLocation("/lucky-search")}
              className="group relative min-h-[137px] overflow-hidden rounded-[20px] border border-violet-400/[0.11] bg-gradient-to-br from-violet-500/[0.065] via-white/[0.02] to-transparent p-3 text-left transition active:scale-[0.98]"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-violet-500 to-purple-700 shadow-[0_8px_22px_rgba(139,92,246,0.18)]">
                  <Search className="h-5 w-5 text-white" />
                </div>

                <Lock className="h-3.5 w-3.5 text-amber-400/65" />

              </div>

              <div className="mt-5">
                <h3 className="text-[13px] font-bold text-white">
                  Lucky Search
                </h3>

                <p className="mt-1 text-[9px] text-white/35">
                  VIP prediction tool
                </p>
              </div>

              <div className="mt-2.5 flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.12em] text-violet-300/65">
                Explore
                <ArrowRight className="h-2.5 w-2.5" />
              </div>

            </button>


            {/* Dear Digits */}

            <button
              type="button"
              onClick={() => setLocation("/dear-digits")}
              className="group relative min-h-[137px] overflow-hidden rounded-[20px] border border-blue-400/[0.11] bg-gradient-to-br from-blue-500/[0.065] via-white/[0.02] to-transparent p-3 text-left transition active:scale-[0.98]"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_8px_22px_rgba(14,165,233,0.18)]">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>

                <span className="text-[7px] font-bold uppercase tracking-wider text-blue-300/55">
                  60 Days
                </span>

              </div>

              <div className="mt-5">
                <h3 className="text-[13px] font-bold text-white">
                  Dear Digits
                </h3>

                <p className="mt-1 text-[9px] text-white/35">
                  60-day chart analysis
                </p>
              </div>

              <div className="mt-2.5 flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.12em] text-blue-300/65">
                Analyze
                <ArrowRight className="h-2.5 w-2.5" />
              </div>

            </button>


            {/* One Figure */}

            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className="group relative min-h-[137px] overflow-hidden rounded-[20px] border border-amber-400/[0.13] bg-gradient-to-br from-amber-500/[0.075] via-white/[0.02] to-transparent p-3 text-left transition active:scale-[0.98]"
            >

              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-amber-400/[0.07] blur-[35px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-amber-300 via-orange-500 to-amber-700 shadow-[0_8px_22px_rgba(245,158,11,0.2)]">
                    <Dices className="h-5 w-5 text-slate-950" />
                  </div>

                  <span className="rounded-full border border-amber-400/[0.1] bg-amber-400/[0.05] px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wider text-amber-300">
                    Premium
                  </span>

                </div>

                <div className="mt-5">

                  <h3 className="text-[13px] font-bold text-white">
                    One Figure
                  </h3>

                  <p className="mt-1 text-[9px] text-white/35">
                    Single figure tool
                  </p>

                </div>

                <div className="mt-2.5 flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.12em] text-amber-300/70">
                  Open Tool
                  <ArrowRight className="h-2.5 w-2.5" />
                </div>

              </div>

            </button>


            {/* Lottery Fax */}

            <button
              type="button"
              onClick={openLotteryFax}
              className="group relative min-h-[137px] overflow-hidden rounded-[20px] border border-pink-400/[0.11] bg-gradient-to-br from-pink-500/[0.06] via-white/[0.02] to-transparent p-3 text-left transition active:scale-[0.98]"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_8px_22px_rgba(236,72,153,0.17)]">
                <FileText className="h-5 w-5 text-white" />
              </div>

              <div className="mt-5">

                <h3 className="text-[13px] font-bold text-white">
                  Lottery Fax
                </h3>

                <p className="mt-1 text-[9px] text-white/35">
                  Official results archive
                </p>

              </div>

              <div className="mt-2.5 flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.12em] text-pink-300/65">
                View Archive
                <ArrowRight className="h-2.5 w-2.5" />
              </div>

            </button>


            {/* YouTube */}

            <button
              type="button"
              onClick={openYouTube}
              className="group relative min-h-[137px] overflow-hidden rounded-[20px] border border-red-400/[0.11] bg-gradient-to-br from-red-500/[0.06] via-white/[0.02] to-transparent p-3 text-left transition active:scale-[0.98]"
            >

              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-red-500/[0.06] blur-[35px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-red-500 to-red-700 shadow-[0_8px_22px_rgba(239,68,68,0.17)]">
                    <Youtube className="h-5 w-5 text-white" />
                  </div>

                  <span className="text-[6px] font-bold uppercase tracking-wider text-red-300/60">
                    Official
                  </span>

                </div>

                <div className="mt-5">

                  <h3 className="text-[13px] font-bold text-white">
                    YouTube
                  </h3>

                  <p className="mt-1 text-[9px] text-white/35">
                    Dear Lottery channel
                  </p>

                </div>

                <div className="mt-2.5 flex items-center gap-1 text-[7px] font-bold uppercase tracking-[0.12em] text-red-300/65">
                  Watch Channel
                  <ArrowRight className="h-2.5 w-2.5" />
                </div>

              </div>

            </button>

          </div>

        </section>


        {/* =====================================================
            REFUND GUARANTEE
        ====================================================== */}

        <section className="mb-3.5">

          <div className="relative overflow-hidden rounded-[20px] border border-emerald-400/[0.09] bg-emerald-400/[0.025] p-3.5">

            <div className="flex items-center gap-2.5">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/[0.06]">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
              </div>

              <div className="min-w-0">
                <h3 className="text-[11px] font-bold text-white">
                  100% Refund Guarantee
                </h3>

                <p className="mt-0.5 text-[8px] text-white/35">
                  Predictions miss, payment refunded.
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          BOTTOM NAVIGATION
      ====================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-50">

        <div className="mx-auto max-w-md px-3 pb-2">

          <div className="flex items-center justify-around rounded-[22px] border border-white/[0.07] bg-[#0b101a]/96 px-2 py-1.5 backdrop-blur-2xl shadow-[0_-12px_40px_rgba(0,0,0,0.35)]">

            {/* Home */}

            <button
              type="button"
              className="flex min-w-[65px] flex-col items-center justify-center py-1"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-600 shadow-[0_6px_18px_rgba(245,158,11,0.18)]">
                <HomeIcon className="h-4 w-4 text-slate-950" />
              </div>

              <span className="mt-0.5 text-[7px] font-black uppercase tracking-wider text-amber-400">
                Home
              </span>

            </button>


            {/* Support */}

            <button
              type="button"
              onClick={openSupport}
              className="flex min-w-[65px] flex-col items-center justify-center py-1"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-[0_6px_18px_rgba(59,130,246,0.18)]">
                <Send className="h-4 w-4 text-white" />
              </div>

              <span className="mt-0.5 text-[7px] font-black uppercase tracking-wider text-blue-300/75">
                Support
              </span>

            </button>


            {/* Settings */}

            <button
              type="button"
              onClick={handleSettingsOpen}
              className="flex min-w-[65px] flex-col items-center justify-center py-1"
            >

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 shadow-[0_6px_18px_rgba(100,116,139,0.12)]">
                <Settings className="h-4 w-4 text-white" />
              </div>

              <span className="mt-0.5 text-[7px] font-black uppercase tracking-wider text-white/40">
                Settings
              </span>

            </button>

          </div>

        </div>

      </nav>


      {/* =====================================================
          ONE FIGURE MODAL
      ====================================================== */}

      {showOneFigure && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-2.5 backdrop-blur-md sm:items-center">

          <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[26px] border border-white/[0.08] bg-[#0b101b] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">

            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-400/[0.07] blur-[65px]" />

            <div className="relative p-4">

              {/* Modal header */}

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-orange-500 to-amber-700 shadow-[0_8px_24px_rgba(245,158,11,0.2)]">
                    <Dices className="h-5 w-5 text-slate-950" />
                  </div>

                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-amber-400/60">
                      Premium Tool
                    </p>

                    <h2 className="text-[17px] font-bold text-white">
                      One Figure
                    </h2>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowOneFigure(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]"
                >
                  <X className="h-3.5 w-3.5 text-white/60" />
                </button>

              </div>


              {/* Coin requirement */}

              <div className="mb-3 flex items-center justify-between rounded-xl border border-amber-400/[0.08] bg-amber-400/[0.035] px-3 py-2.5">

                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />

                  <span className="text-[9px] font-semibold text-white/50">
                    Cost per quantity
                  </span>
                </div>

                <span className="text-[11px] font-black text-amber-300">
                  {COINS_PER_QUANTITY} Coins
                </span>

              </div>


              {/* Digit selection */}

              <div className="mb-3 rounded-[20px] border border-white/[0.06] bg-white/[0.018] p-3">

                <div className="mb-2.5 flex items-center justify-between">

                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/30">
                      Select Figures
                    </p>

                    <p className="mt-0.5 text-[9px] text-white/25">
                      Choose one or multiple digits
                    </p>
                  </div>

                  <span className="rounded-full bg-white/[0.04] px-2 py-1 text-[7px] font-bold text-white/35">
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
                        className={`rounded-xl border p-2 transition-all ${
                          selected
                            ? "border-amber-400/[0.25] bg-amber-400/[0.06]"
                            : "border-white/[0.05] bg-white/[0.025]"
                        }`}
                      >

                        <button
                          type="button"
                          onClick={() => addQuantity(digit)}
                          className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black transition active:scale-90 ${
                            selected
                              ? "bg-gradient-to-br from-amber-300 to-orange-600 text-slate-950"
                              : "bg-white/[0.055] text-white/80"
                          }`}
                        >
                          {digit}
                        </button>

                        <div className="mt-1.5 flex items-center justify-between gap-1">

                          <button
                            type="button"
                            onClick={() => removeQuantity(digit)}
                            disabled={!selected}
                            className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05] disabled:opacity-20"
                          >
                            <Minus className="h-2.5 w-2.5 text-white/60" />
                          </button>

                          <span className="min-w-[12px] text-center text-[9px] font-bold text-white/70">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => addQuantity(digit)}
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


              {/* Selected summary */}

              <div className="mb-3 rounded-[20px] border border-white/[0.06] bg-white/[0.018] p-3">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/30">
                    Selection Summary
                  </span>

                  <span className="text-[8px] font-bold text-white/35">
                    {selectedDigits.length} Figures
                  </span>

                </div>

                {selectedDigits.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">

                    {selectedDigits.map((digit) => (
                      <div
                        key={digit}
                        className="flex items-center gap-1 rounded-lg border border-amber-400/[0.12] bg-amber-400/[0.045] px-2 py-1"
                      >
                        <span className="text-[9px] font-black text-amber-300">
                          {digit}
                        </span>

                        <span className="text-[7px] text-white/35">
                          × {quantities[digit]}
                        </span>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p className="py-2 text-center text-[9px] text-white/20">
                    No figure selected
                  </p>
                )}

              </div>


              {/* Total */}

              <div className="mb-3 rounded-[20px] border border-white/[0.07] bg-gradient-to-r from-white/[0.04] to-transparent p-3">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.16em] text-white/25">
                      Total Quantity
                    </p>

                    <p className="mt-0.5 text-xl font-black text-white">
                      {totalQuantity}
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="text-[7px] font-bold uppercase tracking-[0.16em] text-white/25">
                      Total Coins
                    </p>

                    <p className="mt-0.5 text-xl font-black text-amber-300">
                      {totalCoins}
                    </p>

                  </div>

                </div>

                <div className="mt-2 flex items-center justify-between border-t border-white/[0.05] pt-2">

                  <span className="text-[8px] text-white/30">
                    Available balance
                  </span>

                  <span
                    className={`text-[9px] font-bold ${
                      remainingCoins >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {balance} Coins
                  </span>

                </div>

              </div>


              {/* Continue */}

              <button
                type="button"
                onClick={continueToTelegram}
                disabled={
                  totalQuantity === 0 || totalCoins > balance
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_8px_25px_rgba(245,158,11,0.16)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
              >
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              {totalQuantity > 0 && totalCoins > balance && (
                <p className="mt-2 text-center text-[8px] font-semibold text-red-400/80">
                  Not enough demo coins. Add balance to continue.
                </p>
              )}

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          BALANCE MODAL
      ====================================================== */}

      {showBalance && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-2.5 backdrop-blur-md sm:items-center">

          <div className="relative w-full max-w-md overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#0b101b] shadow-[0_30px_100px_rgba(0,0,0,0.65)]">

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/[0.06] blur-[55px]" />

            <div className="relative p-4">

              <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-600">
                    <Wallet className="h-5 w-5 text-slate-950" />
                  </div>

                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/30">
                      Account Wallet
                    </p>

                    <h2 className="text-[17px] font-bold text-white">
                      Add Balance
                    </h2>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowBalance(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]"
                >
                  <X className="h-3.5 w-3.5 text-white/60" />
                </button>

              </div>


              {/* Current balance */}

              <div className="mb-3 rounded-[20px] border border-amber-400/[0.09] bg-amber-400/[0.035] p-3.5">

                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/25">
                  Current Balance
                </p>

                <p className="mt-1 text-2xl font-black text-white">
                  {balance.toLocaleString()} Coins
                </p>

              </div>


              {/* Redeem code */}

              <div className="mb-3 rounded-[20px] border border-white/[0.06] bg-white/[0.018] p-3">

                <div className="mb-2 flex items-center gap-2">
                  <CreditCard className="h-3.5 w-3.5 text-amber-400" />

                  <span className="text-[9px] font-bold text-white/55">
                    Redeem Demo Code
                  </span>
                </div>

                <div className="flex gap-2">

                  <input
                    value={redeemCode}
                    onChange={(event) => {
                      setRedeemCode(event.target.value);
                      setRedeemMessage("");
                    }}
                    placeholder="OneFigure1"
                    className="min-w-0 flex-1 rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2.5 text-[10px] font-semibold text-white outline-none placeholder:text-white/20 focus:border-amber-400/25"
                  />

                  <button
                    type="button"
                    onClick={redeemDemoCode}
                    className="rounded-xl bg-gradient-to-r from-amber-300 to-orange-500 px-3 text-[8px] font-black uppercase tracking-wider text-slate-950"
                  >
                    Add
                  </button>

                </div>

                <p className="mt-2 text-[7px] text-white/20">
                  Demo codes: OneFigure1 — OneFigure100
                </p>

                {redeemMessage && (
                  <p className="mt-2 text-[8px] font-semibold text-emerald-400">
                    {redeemMessage}
                  </p>
                )}

              </div>


              {/* Quick demo amounts */}

              <div>

                <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.16em] text-white/25">
                  Quick Demo Credits
                </p>

                <div className="grid grid-cols-3 gap-2">

                  {[100, 500, 1000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setBalance((current) => current + amount)}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.025] py-2.5 transition active:scale-95"
                    >
                      <span className="text-[10px] font-black text-white">
                        +{amount}
                      </span>

                      <span className="mt-0.5 block text-[6px] uppercase tracking-wider text-white/25">
                        Demo Coins
                      </span>
                    </button>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          FINAL SUMMARY
      ====================================================== */}

      {showSummary && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/80 p-2.5 backdrop-blur-md sm:items-center">

          <div className="w-full max-w-md rounded-[26px] border border-white/[0.08] bg-[#0b101b] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.65)]">

            <div className="mb-4 flex items-center justify-between">

              <div>
                <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-amber-400/60">
                  Selection Ready
                </p>

                <h2 className="mt-0.5 text-[17px] font-bold text-white">
                  Review Selection
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowSummary(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]"
              >
                <X className="h-3.5 w-3.5 text-white/60" />
              </button>

            </div>


            <div className="mb-3 rounded-[20px] border border-white/[0.06] bg-black/20 p-3">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-[8px] font-bold uppercase tracking-wider text-white/25">
                  Selected Figures
                </span>

                <span className="text-[9px] font-bold text-amber-300">
                  {totalQuantity} Total
                </span>

              </div>

              <div className="flex flex-wrap gap-1.5">

                {selectedDigits.map((digit) => (
                  <div
                    key={digit}
                    className="rounded-lg bg-amber-400/[0.06] px-2 py-1"
                  >
                    <span className="text-[9px] font-black text-amber-300">
                      {digit}
                    </span>

                    <span className="ml-1 text-[7px] text-white/35">
                      ×{quantities[digit]}
                    </span>
                  </div>
                ))}

              </div>

            </div>


            <div className="mb-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5">

              <span className="text-[9px] text-white/35">
                Total Coins
              </span>

              <span className="text-sm font-black text-amber-300">
                {totalCoins}
              </span>

            </div>


            <div className="mb-3 flex gap-2">

              <button
                type="button"
                onClick={copySummary}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.035] py-3 text-[8px] font-bold uppercase tracking-wider text-white/55"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={sendToTelegram}
                className="flex flex-[1.5] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 py-3 text-[8px] font-black uppercase tracking-wider text-white shadow-[0_8px_22px_rgba(59,130,246,0.18)]"
              >
                <Send className="h-3.5 w-3.5" />
                Open Telegram
              </button>

            </div>

            <p className="text-center text-[7px] leading-relaxed text-white/20">
              Telegram will open with the selection summary prepared for review.
            </p>

          </div>

        </div>
      )}


      {/* Existing settings */}

      <SettingsModal
        isOpen={showSettings}
        onClose={handleSettingsClose}
        onOpenPrivacy={handlePrivacyOpen}
      />

      {/* Existing privacy */}

      <PrivacyPolicyModal
        isOpen={showPrivacy}
        onClose={handlePrivacyClose}
      />

    </div>
  );
}
