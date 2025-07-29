import { useEffect } from 'react';

const AnalyticConnect: React.FC = () => {
  useEffect(() => {
    const threshold = 400;
    let prevDebugOpen: boolean | null = null; // null means “not checked yet”

    const checkDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const isOpen =
        (widthDiff > threshold && widthDiff < 500) ||
        (heightDiff > threshold && heightDiff < 500);

      if (isOpen) {
        console.clear();
        (window as any).debugOpen = true;
        console.error('Please close inspect element to use the site.');
      } else {
        (window as any).debugOpen = false;
      }

      if (prevDebugOpen !== null && prevDebugOpen !== isOpen) {
        // Not first check and devtools state changed — reload
        window.location.reload();
      }

      prevDebugOpen = isOpen;
    };

    checkDevTools();
    window.addEventListener('resize', checkDevTools);
    const intervalId = setInterval(checkDevTools, 500);

    return () => {
      window.removeEventListener('resize', checkDevTools);
      clearInterval(intervalId);
    };
  }, []);

  return null;
};

export default AnalyticConnect;
