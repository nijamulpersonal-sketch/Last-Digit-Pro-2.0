import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Clock,
  Crown,
  Search,
  TrendingUp,
  FileText,
  Settings,
  Lock,
  UserCircle,
  MessageSquare,
  Users,
  Home as HomeIcon,
  History,
  CheckCircle,
  Send // টেলিগ্রাম আইকন যোগ করা হয়েছে
} from "lucide-react";
import { useLocation } from "wouter";
import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import { ProfileModal } from "@/components/modals/profile-modal";
import { ChatBotModal } from "@/components/modals/chatbot-modal";
import { HistoryModal } from "@/components/modals/history-modal";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'first-time' | 'regular' | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState(124);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('is_logged_in') === 'true';
    if (!isLoggedIn) {
      setLocation("/login");
      return;
    }

    const userData = JSON.parse(localStorage.getItem('user_profile') || '{}');  
    setUser({  
      uid: userData.uid || 'guest-123',  
      name: userData.name || "Guest User",  
      email: userData.email || "guest@example.com",  
      balance: 0,  
      createdAt: new Date().toISOString()  
    });  

    const updateActiveUsers = () => {    
      const now = new Date();    
      const hour = now.getHours();    
      const minute = now.getMinutes();    
      let min = 10, max = 150;    

      if (hour === 12 && minute <= 56) {    
        min = 350; max = 500;    
      } else if ((hour === 17 && minute >= 30) || (hour >= 18 && hour < 20)) {    
        min = 350; max = 500;    
      } else if (hour >= 20 || hour < 12) {    
        min = 10; max = 40;    
      } else {    
        min = 50; max = 200;    
      }    

      const randomUsers = Math.floor(Math.random() * (max - min + 1)) + min;    
      setActiveUsers(randomUsers);    
    };    

    updateActiveUsers();    
    const interval = setInterval(updateActiveUsers, 5000);   
    return () => clearInterval(interval);

  }, [location, setLocation]);

  const handlePlanSelect = (plan: 'first-time' | 'regular') => {
    setSelectedPlan(plan);
    setShowSubscription(true);
  };

  const handleSettingsOpen = () => setShowSettings(true);
  const handleSettingsClose = () => setShowSettings(false);

  const handlePrivacyOpen = () => {
    setShowSettings(false);
    setTimeout(() => setShowPrivacy(true), 100);
  };
  const handlePrivacyClose = () => setShowPrivacy(false);

  const handleProfileUpdate = (updatedUser: any) => {
    setUser(updatedUser);
    localStorage.setItem('user_profile', JSON.stringify(updatedUser));
  };

  return (
    <div className="min-h-screen pb-16 bg-slate-900 selection:bg-amber-500/30">
      <div className="max-w-md mx-auto px-4 pt-4">    
        <div className="text-center mb-6">    
          <div className="flex justify-between items-center mb-4">    
            <div className="flex items-center gap-2">    
              <h1 className="text-xl font-black bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent tracking-tighter">    
                LAST DIGIT PRO    
              </h1>    
            </div>    

            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full animate-pulse">    
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />    
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">    
                <Users className="w-3 h-3" />    
                {activeUsers} Live    
              </span>    
            </div>    

            <button     
              onClick={() => setShowProfile(true)}    
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"    
            >    
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 overflow-hidden">    
                <UserCircle className="w-5 h-5 text-white" />    
              </div>    
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-amber-400 transition-colors">Profile</span>    
            </button>    
          </div>    

          <div className="glass rounded-2xl px-4 py-3 mb-2 gold-glow border-amber-400/20">    
            <div className="flex justify-center items-center gap-2">    
              <div className="flex items-center">    
                <ShieldCheck className="w-3 h-3 text-emerald-400 mr-1" />    
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Secure</span>    
              </div>    
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>    
              <div className="flex items-center">    
                <Clock className="w-3 h-3 text-amber-400 mr-1" />    
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Live Updates</span>    
              </div>    
            </div>    
          </div>    
        </div>    

        <div className="relative overflow-hidden glass-dark rounded-[1.5rem] p-4 mb-6 border border-white/10 shadow-[0_0_20px_rgba(251,191,36,0.1)]">    
          <div className="absolute -inset-full h-[300%] w-[300%] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] animate-[shimmer_5s_infinite] pointer-events-none"></div>    
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[40px] -z-10"></div>    
          <div className="flex items-center gap-2 mb-4 relative z-10">    
            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg shadow-amber-500/20">    
              <Crown className="w-5 h-5 text-white" />    
            </div>    
            <div>    
              <h2 className="text-lg font-bold text-white tracking-tight leading-none mb-0.5">Subscription Plans</h2>    
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Choose your plan</p>    
            </div>    
          </div>    
          <div className="flex flex-col gap-3 mb-6 relative z-10 px-2">    
            <div     
              onClick={() => handlePlanSelect('regular')}    
              className="relative overflow-hidden bg-slate-950 border border-amber-500/30 rounded-[1.5rem] p-4 cursor-pointer hover:border-amber-400/60 transition-all duration-500 text-center group shadow-xl"    
            >    
              {/* Subtle Ambient Glow */}  
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>  
                
              <div className="absolute top-3 right-3">  
                <div className="bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-md">  
                  Best Seller  
                </div>  
              </div>  

              <div className="relative z-10 flex items-center justify-between gap-4">  
                <div className="text-left">  
                  <div className="flex items-center gap-1.5 mb-1">  
                    <Crown className="w-3 h-3 text-amber-500" />  
                    <span className="text-[9px] text-amber-400 font-black uppercase tracking-widest">VIP Access</span>  
                  </div>  
                  <div className="flex items-center gap-2">  
                    <span className="text-[10px] text-gray-500 line-through">₹899</span>  
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-500">₹99</span>  
                  </div>  
                </div>  

                <div className="flex flex-col items-end gap-1">  
                  <div className="px-2 py-0.5 bg-emerald-500/10 rounded-md border border-emerald-500/20">  
                    <span className="text-[8px] text-emerald-400 font-black uppercase tracking-tighter">90% OFF</span>  
                  </div>  
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tight italic">30 Days Valid</span>  
                </div>  
              </div>  

              {/* Shimmer Effect */}  
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>  
            </div>    
          </div>    
          <div className="flex gap-1.5 mb-3 relative z-10">    
            {['01:00 PM', '06:00 PM', '08:00 PM'].map((time) => (    
              <div key={time} className="flex-1 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-emerald-400 font-bold text-[9px] text-center shadow-inner">    
                {time}    
              </div>    
            ))}    
          </div>    
          <button     
            onClick={() => handlePlanSelect('first-time')}    
            className="relative w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-slate-900 font-black text-xs shadow-[0_4px_15_rgba(251,191,36,0.2)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.4)] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest overflow-hidden group"    
          >    
            <span className="relative z-10">Unlock VIP Access</span>    
          </button>    
        </div>    

        <div className="grid grid-cols-2 gap-4 mb-8">    
          <div onClick={() => setLocation('/lucky-search')} className="glass card-hover rounded-2xl p-4 cursor-pointer relative group">    
            <div className="absolute top-3 right-3"><Lock className="w-4 h-4 text-amber-400" /></div>    
            <div className="flex items-center gap-3 mb-2">    
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-2 rounded-lg"><Search className="w-5 h-5 text-white" /></div>    
              <h3 className="font-semibold text-white">Lucky Search</h3>    
            </div>    
            <p className="text-xs text-gray-400">VIP prediction tool</p>    
          </div>    
          <div onClick={() => setLocation('/dear-digits')} className="glass card-hover rounded-2xl p-4 cursor-pointer">    
            <div className="flex items-center gap-3 mb-2">    
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-white" /></div>    
              <h3 className="font-semibold text-white">Dear Digits</h3>    
            </div>    
            <p className="text-xs text-gray-400">60-day chart analysis</p>    
          </div>    
          <div     
            onClick={() => window.open('https://lotterysambad.one/', '_blank')}    
            className="glass card-hover rounded-2xl p-4 cursor-pointer"    
          >    
            <div className="flex items-center gap-3 mb-2">    
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-lg shadow-lg shadow-rose-500/20">    
                <FileText className="w-5 h-5 text-white" />    
              </div>    
              <h3 className="font-semibold text-white">Lottery Fax</h3>    
            </div>    
            <p className="text-xs text-gray-400">Official results archive</p>    
          </div>    
          <div onClick={handleSettingsOpen} className="glass card-hover rounded-2xl p-4 cursor-pointer">    
            <div className="flex items-center gap-3 mb-2">    
              <div className="bg-gradient-to-br from-gray-500 to-gray-700 p-2 rounded-lg">    
                <Settings className="w-5 h-5 text-white" />    
              </div>    
              <h3 className="font-semibold text-white">Settings</h3>    
            </div>    
            <p className="text-xs text-gray-400">App preferences</p>    
          </div>    
        </div>    

        <div className="glass rounded-2xl p-5 mb-6 border border-rose-500/30">    
          <div className="flex items-start gap-3">    
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-2 rounded-full"><ShieldCheck className="w-5 h-5 text-white" /></div>    
            <div>    
              <h3 className="font-bold text-white mb-1">100% Refund Guarantee</h3>    
              <p className="text-sm text-gray-300">Predictions miss, payment refunded.</p>    
            </div>    
          </div>    
        </div>    
      </div>    

      {/* ফ্ল্যাট বটম নেভিগেশন বার - ডার্ক নেভি ব্লু গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-t border-white/10">
        <div className="flex items-center justify-around py-3">
          {/* ১ম বাটন: হোম - গোল্ডেন এম্বার */}
          <button className="flex flex-col items-center justify-center gap-1 py-1 group/nav relative transition-all active:scale-90">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 text-white shadow-[0_8px_25px_-4px_rgba(245,158,11,0.7)] transform transition-transform group-hover/nav:-translate-y-1 group-hover/nav:scale-110 duration-300">
              <HomeIcon className="w-5 h-5 drop-shadow-lg" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Home</span>
          </button>

          {/* ২য় বাটন: হিস্টরি - রয়্যাল পার্পল */}
          <button 
            onClick={() => setShowHistory(true)}
            className="flex flex-col items-center justify-center gap-1 py-1 opacity-90 hover:opacity-100 transition-all active:scale-90 group/history"
          >
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 text-white shadow-[0_8px_25px_-4px_rgba(124,58,237,0.7)] transform transition-transform group-hover/history:-translate-y-1 group-hover/history:scale-110 duration-300">
              <History className="w-5 h-5 drop-shadow-lg" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">History</span>
          </button>

          {/* ৩য় বাটন: টেলিগ্রাম - ওশান ব্লু */}
          <button
            onClick={() => window.open("https://t.me/NijamulMal", "_blank")}
            className="flex flex-col items-center justify-center gap-1 py-1 opacity-90 hover:opacity-100 transition-all active:scale-90 group/telegram"
          >
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-sky-600 text-white shadow-[0_8px_25px_-4px_rgba(56,189,248,0.7)] transform transition-transform group-hover/telegram:-translate-y-1 group-hover/telegram:scale-110 duration-300">
              <Send className="w-5 h-5 drop-shadow-lg" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Support</span>
          </button>

          {/* ৪র্থ বাটন: সেটিংস - ডার্ম মেটালিক */}
          <button 
            onClick={handleSettingsOpen}
            className="flex flex-col items-center justify-center gap-1 py-1 opacity-90 hover:opacity-100 transition-all active:scale-90 group/settings"
          >
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-gray-700 via-slate-600 to-gray-800 text-white shadow-[0_8px_25px_-4px_rgba(148,163,184,0.5)] transform transition-transform group-hover/settings:-translate-y-1 group-hover/settings:scale-110 duration-300">
              <Settings className="w-5 h-5 drop-shadow-lg" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter bg-gradient-to-r from-slate-400 to-gray-500 bg-clip-text text-transparent">Settings</span>
          </button>
        </div>
      </nav>

      <SettingsModal isOpen={showSettings} onClose={handleSettingsClose} onOpenPrivacy={handlePrivacyOpen} />    
      <PrivacyPolicyModal isOpen={showPrivacy} onClose={handlePrivacyClose} />    
      <SubscriptionModal isOpen={showSubscription} onClose={() => setShowSubscription(false)} planType={selectedPlan} />    
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} onUpdate={handleProfileUpdate} />    
      <ChatBotModal isOpen={showChatBot} onClose={() => setShowChatBot(false)} />    
      <HistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} />  
    </div>
  );
}
