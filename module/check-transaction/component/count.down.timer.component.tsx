"use client";

import { useEffect, useState } from "react";

type Props = {
  targetTime: Date; // waktu akhir countdown
};

export default function CountDownTimerComponent({ targetTime }: Props) {
  const calculateTimeLeft = () => {
    const difference = +targetTime - +new Date();
    const timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return difference > 0 ? timeLeft : { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  return (
    <div className="bg-red-900 border border-red-600 px-4 py-2 rounded-lg inline-flex space-x-3 text-white font-semibold text-lg items-center justify-center">
      <span>{timeLeft.hours} Hour</span>
      <span>{timeLeft.minutes} Minute</span>
      <span>{timeLeft.seconds} Second</span>
    </div>
  );
}
