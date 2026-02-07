import { useState, useCallback, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface UsePWAInstallReturn {
  isInstallable: boolean;
  installApp: () => Promise<void>;
  isInstalled: boolean;
}

export const usePWAInstall = (): UsePWAInstallReturn => {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const handleInstall = useCallback(async () => {
    if (!installEvent) return;

    try {
      await installEvent.prompt();
      const choiceResult = await installEvent.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installed successfully');
        setIsInstalled(true);
      } else {
        console.log('PWA installation declined');
      }
      
      setInstallEvent(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('Error installing PWA:', error);
    }
  }, [installEvent]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setInstallEvent(event);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallEvent(null);
    };

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone) {
      setIsInstalled(true);
      setIsInstallable(false);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return {
    isInstallable,
    installApp: handleInstall,
    isInstalled
  };
};
