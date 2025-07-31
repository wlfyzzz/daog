import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      if (!newTime) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        setTimeLeft(newTime);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className="text-lg font-semibold text-red-500">Event ended</div>;
  }

  const timeDisplay = [
    { label: "D", value: timeLeft.days },
    { label: "H", value: timeLeft.hours },
    { label: "M", value: timeLeft.minutes },
    { label: "S", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-6 text-white font-bold text-xl sm:text-2xl mb-8">
      {timeDisplay.map(({ label, value }) => (
        <div key={label} className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-[hsl(var(--gaming-yellow))] text-3xl sm:text-4xl font-extrabold"
            >
              {value.toString().padStart(2, "0")}
            </motion.div>
          </AnimatePresence>
          <div className="text-sm text-muted-foreground tracking-wide">{label}</div>
        </div>
      ))}
    </div>
  );
};
