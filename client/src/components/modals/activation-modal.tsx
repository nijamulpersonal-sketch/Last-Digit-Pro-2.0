import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ActivationModal({ isOpen, onClose, onSuccess }: ActivationModalProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      activateSubscription();
    }
  }, [isOpen]);

  const activateSubscription = () => {
    const days = 30; // subscription duration

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);

    localStorage.setItem('vip_activated', 'true');
    localStorage.setItem('vip_expiry', expiryDate.toISOString());

    onSuccess();

    toast({
      title: "Subscription Activated 🎉",
      description: `Premium unlocked for ${days} days. Expiry: ${expiryDate.toLocaleDateString()}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f172a] border-slate-800 text-white max-w-sm p-8 rounded-[2.5rem] gap-0 shadow-2xl overflow-hidden">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">Payment Successful!</h2>
            <p className="text-slate-400 text-sm leading-relaxed px-4">
              Your subscription is now active. Enjoy premium features.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-black text-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
