// hooks/useTimeAgo.js
import { useState, useEffect } from "react";

const useTimeAgo = (date) => {
  const compute = () => {
    if (!date) return null;

    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

    if (seconds < 60) return "active just now";
    if (seconds < 3600) return `active ${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `active ${Math.floor(seconds / 3600)}h ago`;
    return `active ${Math.floor(seconds / 86400)}d ago`;
  };

  const [timeAgo, setTimeAgo] = useState(compute);

  useEffect(() => {
    if (!date) return;

    //recompute when date changes
    setTimeAgo(compute());

    //tick every minute
    const interval = setInterval(() => {
      setTimeAgo(compute());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [date]);

  return timeAgo;
};

export default useTimeAgo;
