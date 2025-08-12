import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TimeRestrictedGuard = ({ children }) => {
  const navigate = useNavigate();

  // Get current Scotland time as HH:mm format
  const now = new Date();
  const scotlandTimeString = now.toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const [hourStr, minuteStr] = scotlandTimeString.split(":");
  const hour = parseInt(hourStr, 10);

  // Allowed between 16:00 and 22:00 (16:00 inclusive, 22:00 exclusive)
  const isAllowed = hour >= 16 && hour < 22;

  useEffect(() => {
    if (!isAllowed) {
      alert("Checkout is only available between 4 PM and 10 PM Scotland time.");
      navigate(-1);
    }
  }, [isAllowed, navigate]);

  if (!isAllowed) {
    return null; // Don't render children if not allowed
  }

  return children;
};

export default TimeRestrictedGuard;
