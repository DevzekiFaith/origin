"use client";

import { useState, useEffect, useCallback } from "react";
import {
  EventSeatStats,
  LiveRegistration,
  getAllEventsStats,
  getEventStats,
  getAllBaselineEventsStats,
  getBaselineEventStats,
  recordUserEventRegistration,
  UserEventRegistration,
  getUserEventRegistrations,
} from "../data/event-registrations";

export function useEventRegistrations(selectedEventId: number = 22) {
  const [allStats, setAllStats] = useState<Record<number, EventSeatStats>>(() => getAllBaselineEventsStats());
  const [currentEventStats, setCurrentEventStats] = useState<EventSeatStats>(() => getBaselineEventStats(selectedEventId));
  const [latestRegistration, setLatestRegistration] = useState<LiveRegistration | null>(null);
  const [userRegistrations, setUserRegistrations] = useState<UserEventRegistration[]>([]);
  const [mounted, setMounted] = useState(false);

  // Sync state whenever selectedEventId changes
  useEffect(() => {
    if (mounted) {
      setCurrentEventStats(getEventStats(selectedEventId));
    }
  }, [selectedEventId, mounted]);

  useEffect(() => {
    setMounted(true);
    setAllStats(getAllEventsStats());
    setCurrentEventStats(getEventStats(selectedEventId));
    setUserRegistrations(getUserEventRegistrations());

    // Listen for seat updates dispatched anywhere in app
    const handleSeatUpdate = () => {
      setAllStats(getAllEventsStats());
      setCurrentEventStats(getEventStats(selectedEventId));
    };

    // Listen for live registration alert pulses
    const handleLiveAlert = (e: Event) => {
      const customEvent = e as CustomEvent<LiveRegistration>;
      if (customEvent.detail) {
        setLatestRegistration(customEvent.detail);
      }
      handleSeatUpdate();
    };

    window.addEventListener("origin_event_seat_update", handleSeatUpdate);
    window.addEventListener("origin_live_registration_alert", handleLiveAlert);
    window.addEventListener("storage", handleSeatUpdate);

    return () => {
      window.removeEventListener("origin_event_seat_update", handleSeatUpdate);
      window.removeEventListener("origin_live_registration_alert", handleLiveAlert);
      window.removeEventListener("storage", handleSeatUpdate);
    };
  }, [selectedEventId]);

  const registerForEvent = useCallback(
    (
      eventId: number,
      attendee: {
        name: string;
        email: string;
        phone?: string;
        mode?: "Virtual HD Stream" | "Onsite Hub (Lagos)" | "Onsite Hub (Abuja)";
        ticketType?: "Solo Executive Pass" | "Co-Founder Dual Pass";
      }
    ) => {
      const res = recordUserEventRegistration(eventId, attendee);
      setAllStats(getAllEventsStats());
      setCurrentEventStats(res.stats);
      setUserRegistrations(getUserEventRegistrations());
      return res;
    },
    []
  );

  return {
    allStats,
    stats: currentEventStats,
    latestRegistration,
    userRegistrations,
    registerForEvent,
    mounted,
  };
}
