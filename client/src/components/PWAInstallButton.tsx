import React from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download } from 'lucide-react'; // Optional: install lucide-react for icons

const PWAInstallButton: React.FC = () => {
  const { isInstallable, installApp } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <button
      onClick={installApp}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50
                 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                 py-3 px-6 rounded-full shadow-lg transition-all duration-300
                 flex items-center gap-2 animate-fade-in-up
                 hover:shadow-xl active:scale-95"
      aria-label="Install app"
    >
      <Download size={20} />
      <span>Install App</span>
    </button>
  );
};

export default PWAInstallButton;
