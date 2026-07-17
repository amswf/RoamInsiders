"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { preconnect, prefetchDNS } from "react-dom";
import Link from "next/link";
import {
  buildClickTrackingUrl,
  DEFAULT_COMPARE_ATTRIBUTION,
  parseCompareAttribution,
  tripAttributionParams,
  type CompareProduct,
} from "@/lib/compare-attribution";
import type { Locale } from "@/lib/content";
import { compareCopy, compareLocationCopy, type CompareCopy } from "@/lib/compare-i18n";
import styles from "./compare.module.css";

type Product = CompareProduct;
type Sheet = "destination" | "origin" | "flightDestination" | "dates" | "guests" | null;
type LocationStatus = "idle" | "detecting" | "approximate" | "precise" | "failed";

type City = {
  name: string;
  detail: string;
  country: string;
  iata: string;
  tripCityId: number;
  latitude?: number;
  longitude?: number;
  freeText?: boolean;
};

type AirportPayload = {
  airports: [string, string, string, string, number, number][];
};

const CITIES: City[] = [
  { name: "Tokyo", detail: "Tokyo, Japan", country: "Japan", iata: "TYO", tripCityId: 2 },
  { name: "Hong Kong", detail: "Hong Kong, China", country: "Hong Kong", iata: "HKG", tripCityId: 58 },
  { name: "Singapore", detail: "Singapore", country: "Singapore", iata: "SIN", tripCityId: 73 },
  { name: "Bangkok", detail: "Bangkok, Thailand", country: "Thailand", iata: "BKK", tripCityId: 359 },
  { name: "Bali", detail: "Bali, Indonesia", country: "Indonesia", iata: "DPS", tripCityId: 723 },
  { name: "Osaka", detail: "Osaka, Japan", country: "Japan", iata: "OSA", tripCityId: 219 },
  { name: "Seoul", detail: "Seoul, South Korea", country: "South Korea", iata: "SEL", tripCityId: 274 },
  { name: "Kyoto", detail: "Kyoto, Japan", country: "Japan", iata: "UKY", tripCityId: 734 },
  { name: "Kuala Lumpur", detail: "Kuala Lumpur, Malaysia", country: "Malaysia", iata: "KUL", tripCityId: 315 },
];

const CURRENT_HERO_IMAGE = "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=88";

const HERO_SLIDES = [
  {
    id: "hotels",
    eyebrow: "HOTEL DEALS",
    title: "Curated hotel offers",
    offer: "Save up to 15%",
    subtitle: "Discover handpicked stays for city breaks, beach escapes, and more.",
    image: CURRENT_HERO_IMAGE,
  },
  {
    id: "flights",
    eyebrow: "FLIGHT OFFERS",
    title: "Fly once. Enjoy twice.",
    offer: "More value for every journey",
    subtitle: "Search flexible flight options and plan your next trip with confidence.",
    image: CURRENT_HERO_IMAGE,
  },
] as const;

const BOOKING_FLOWS = {
  hotels: {
    eyebrow: "HOTEL BOOKING, SIMPLIFIED",
    title: "From destination to check-in",
    summary: "Carry your stay details into a complete hotel search, then review the information that matters before booking.",
    steps: [
      { icon: "pin", number: "01", title: "Set your stay", body: "Choose a destination, dates, guests, and rooms." },
      { icon: "hotel", number: "02", title: "Review available rooms", body: "Compare room types, inclusions, and stay policies." },
      { icon: "shield", number: "03", title: "Confirm with clarity", body: "Check the final price and booking terms before payment." },
    ],
    details: ["Room choices", "Cancellation policies", "Taxes and fees"],
  },
  flights: {
    eyebrow: "FLIGHT BOOKING, SIMPLIFIED",
    title: "From route search to take-off",
    summary: "Carry your route and dates into a complete flight search, then review the fare details that shape your trip.",
    steps: [
      { icon: "plane", number: "01", title: "Set your route", body: "Choose departure, destination, and travel dates." },
      { icon: "search", number: "02", title: "Review flight options", body: "Compare schedules, connections, and fare choices." },
      { icon: "shield", number: "03", title: "Confirm with clarity", body: "Check baggage, fare rules, and the final price before payment." },
    ],
    details: ["Flight schedules", "Baggage and fare rules", "Full price breakdown"],
  },
} satisfies Record<Product, {
  eyebrow: string;
  title: string;
  summary: string;
  steps: Array<{ icon: string; number: string; title: string; body: string }>;
  details: string[];
}>;

let airportRequest: Promise<City[]> | null = null;

function loadAirportCities() {
  if (!airportRequest) {
    airportRequest = fetch("../data/airports.json")
      .then((response) => {
        if (!response.ok) throw new Error("Airport data unavailable");
        return response.json() as Promise<AirportPayload>;
      })
      .then(({ airports }) => airports.map(([iata, municipality, airport, country, latitude, longitude]) => ({
        name: municipality || airport,
        detail: `${airport}${country ? `, ${country}` : ""}`,
        country,
        iata,
        tripCityId: 0,
        latitude,
        longitude,
      })));
  }
  return airportRequest;
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setHours(12, 0, 0, 0);
  next.setDate(next.getDate() + amount);
  return next;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function isoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shortDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function compactDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(date);
}

function sameDay(a: Date | null, b: Date | null) {
  return Boolean(a && b && isoDate(a) === isoDate(b));
}

function cleanedDestination(value: string) {
  return value.replace(/\b(hotels?|flights?|cheap|deals?|best|prices?)\b/gi, " ").replace(/\s+/g, " ").trim();
}

function parseCity(value: string | null, cities: City[] = CITIES) {
  if (!value) return null;
  const normalized = cleanedDestination(value).toLowerCase();
  return cities.find((city) => normalized === city.iata.toLowerCase())
    || cities.find((city) => normalized.includes(city.name.toLowerCase()) || normalized.includes(city.iata.toLowerCase()))
    || null;
}

function toRadians(value: number) {
  return value * Math.PI / 180;
}

function nearestAirport(cities: City[], latitude: number, longitude: number) {
  let closest: City | null = null;
  let shortest = Number.POSITIVE_INFINITY;
  for (const city of cities) {
    if (city.latitude === undefined || city.longitude === undefined) continue;
    const deltaLatitude = toRadians(city.latitude - latitude);
    const deltaLongitude = toRadians(city.longitude - longitude);
    const a = Math.sin(deltaLatitude / 2) ** 2
      + Math.cos(toRadians(latitude)) * Math.cos(toRadians(city.latitude)) * Math.sin(deltaLongitude / 2) ** 2;
    const distance = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    if (distance < shortest) {
      shortest = distance;
      closest = city;
    }
  }
  return closest;
}

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    hotel: <><path d="M4 20V6.5A2.5 2.5 0 0 1 6.5 4h8A2.5 2.5 0 0 1 17 6.5V20"/><path d="M2 20h20M8 8h2m3 0h2m-7 4h2m3 0h2"/></>,
    plane: <path d="m3 11 18-8-7 18-3-7-8-3Zm8 3 3-3"/>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    calendar: <><path d="M6 2v3m12-3v3M3 9h18M5 4h14a2 2 0 0 1 2 2v15H3V6a2 2 0 0 1 2-2Z"/><path d="M7 13h3m4 0h3m-10 4h3"/></>,
    user: <><circle cx="12" cy="7" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    chevron: <path d="m8 10 4 4 4-4"/>,
    shield: <path d="M12 22s8-3.7 8-10V5l-8-3-8 3v7c0 6.3 8 10 8 10Z"/>,
    tag: <><path d="m20 13-7 7L3 10V3h7l10 10Z"/><circle cx="7.5" cy="7.5" r="1"/></>,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>,
    percent: <><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/><path d="m19 5-14 14"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
    locate: <><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></>,
    pause: <path d="M8 5v14m8-14v14"/>,
    play: <path d="m8 5 11 7-11 7V5Z"/>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function OutboundResourceHints() {
  prefetchDNS("https://www.trip.com");
  preconnect("https://www.trip.com");
  prefetchDNS("https://insg.jiatoutrade.com");
  preconnect("https://insg.jiatoutrade.com");
  return null;
}

function FieldButton({ label, value, icon, onClick, trailing = "chevron", wide }: { label: string; value: string; icon: string; onClick: () => void; trailing?: "chevron" | "close" | "none"; wide?: boolean }) {
  return (
    <div className={`${styles.fieldGroup} ${wide ? styles.wideField : ""}`}>
      <span className={styles.fieldLabel}>{label}</span>
      <button type="button" className={styles.fieldButton} onClick={onClick}>
        <span className={styles.fieldIcon}><Icon name={icon} /></span>
        <span className={styles.fieldValue}>{value}</span>
        {trailing !== "none" && <span className={styles.fieldTrailing}><Icon name={trailing} size={20} /></span>}
      </button>
    </div>
  );
}

function Counter({ label, hint, value, min, max, onChange }: { label: string; hint: string; value: number; min: number; max: number; onChange: (next: number) => void }) {
  return (
    <div className={styles.counterRow}>
      <div><strong>{label}</strong><span>{hint}</span></div>
      <div className={styles.counterControl}>
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Decrease ${label}`}>−</button>
        <b>{value}</b>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Increase ${label}`}>+</button>
      </div>
    </div>
  );
}

function CalendarSheet({ start, end, product, locale, t, onCancel, onConfirm }: { start: Date; end: Date; product: Product; locale: Locale; t: CompareCopy; onCancel: () => void; onConfirm: (start: Date, end: Date) => void }) {
  const today = startOfDay(new Date());
  const [month, setMonth] = useState(new Date(start.getFullYear(), start.getMonth(), 1));
  const [draftStart, setDraftStart] = useState<Date | null>(start);
  const [draftEnd, setDraftEnd] = useState<Date | null>(end);
  const firstWeekday = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, index) => index - firstWeekday + 1);
  const nights = draftStart && draftEnd ? Math.round((startOfDay(draftEnd).getTime() - startOfDay(draftStart).getTime()) / 86400000) : 0;
  const weekdays = Array.from({ length: 7 }, (_, index) => new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(new Date(2024, 0, index + 1)));

  function chooseDate(day: number) {
    const chosen = new Date(month.getFullYear(), month.getMonth(), day);
    if (chosen < today) return;
    if (!draftStart || draftEnd || chosen <= draftStart) {
      setDraftStart(chosen);
      setDraftEnd(null);
      return;
    }
    setDraftEnd(chosen);
  }

  const monthIsCurrent = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();
  const startLabel = product === "hotels" ? t.checkIn : t.departure;
  const endLabel = product === "hotels" ? t.checkOut : t.returnDate;

  return (
    <div className={styles.calendarContent}>
      <div className={styles.sheetTitleRow}>
        <div><span className={styles.sheetEyebrow}>{draftStart && !draftEnd ? t.selectingCheckout : t.selectDates}</span><h2>{t.whenTravel}</h2></div>
        <button className={styles.iconButton} type="button" onClick={onCancel} aria-label={t.cancel}><Icon name="close" /></button>
      </div>
      <div className={styles.dateSummary}>
        <div className={draftStart && !draftEnd ? styles.activeSummary : ""}><span>{startLabel}</span><strong>{draftStart ? compactDate(draftStart, locale) : t.select}</strong></div>
        <Icon name="arrow" size={18} />
        <div className={draftStart && !draftEnd ? styles.activeSummary : ""}><span>{endLabel}</span><strong>{draftEnd ? compactDate(draftEnd, locale) : t.select}</strong></div>
      </div>
      <div className={styles.calendarNav}>
        <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} disabled={monthIsCurrent} aria-label="Previous month">←</button>
        <strong>{new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month)}</strong>
        <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Next month">→</button>
      </div>
      <div className={styles.calendarGrid}>
        {weekdays.map((day, index) => <span className={styles.weekday} key={`${day}-${index}`}>{day}</span>)}
        {cells.map((day, index) => {
          if (day < 1 || day > daysInMonth) return <span key={index} />;
          const date = new Date(month.getFullYear(), month.getMonth(), day);
          const disabled = date < today;
          const selectedStart = sameDay(date, draftStart);
          const selectedEnd = sameDay(date, draftEnd);
          const inRange = Boolean(draftStart && draftEnd && date > draftStart && date < draftEnd);
          return <button type="button" key={index} className={`${selectedStart || selectedEnd ? styles.selectedDay : ""} ${inRange ? styles.rangeDay : ""}`} disabled={disabled} onClick={() => chooseDate(day)} aria-label={shortDate(date, locale)}>{day}</button>;
        })}
      </div>
      <div className={styles.sheetActions}>
        <span>{nights > 0 ? `${nights} ${nights === 1 ? t.night : t.nights}` : t.chooseRange}</span>
        <div><button type="button" className={styles.secondaryButton} onClick={onCancel}>{t.cancel}</button><button type="button" className={styles.primaryButton} disabled={!draftStart || !draftEnd} onClick={() => draftStart && draftEnd && onConfirm(draftStart, draftEnd)}>{t.confirm}</button></div>
      </div>
    </div>
  );
}

export function TravelCompareExperience() {
  const locale: Locale = "en";
  const t = compareCopy[locale];
  const locationCopy = compareLocationCopy[locale];
  const defaultStart = useMemo(() => addDays(new Date(), 14), []);
  const defaultEnd = useMemo(() => addDays(new Date(), 16), []);
  const [product, setProduct] = useState<Product>("hotels");
  const [sheet, setSheet] = useState<Sheet>(null);
  const [destination, setDestination] = useState<City>(CITIES[0]);
  const [origin, setOrigin] = useState<City>(CITIES[1]);
  const [flightDestination, setFlightDestination] = useState<City>(CITIES[0]);
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [cityQuery, setCityQuery] = useState("");
  const [airports, setAirports] = useState<City[]>([]);
  const [airportLoading, setAirportLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [error, setError] = useState("");
  const [attribution, setAttribution] = useState(DEFAULT_COMPARE_ATTRIBUTION);
  const [heroSlide, setHeroSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const explicitOrigin = useRef(false);
  const requestedOriginCode = useRef("");
  const attemptedApproximateLocation = useRef(false);

  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  useEffect(() => {
    if (carouselPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setHeroSlide((current) => (current + 1) % HERO_SLIDES.length), 3000);
    return () => window.clearInterval(interval);
  }, [carouselPaused]);

  useEffect(() => {
    const initialize = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const keyword = params.get("destination") || params.get("dest") || params.get("keyword");
      const keywordCity = parseCity(keyword);
      const originValue = params.get("from") || params.get("origin") || params.get("acity");
      const fromCity = parseCity(originValue);
      const toValue = params.get("to") || params.get("dcity") || params.get("keyword");
      const toCity = parseCity(toValue);
      if (keywordCity) setDestination(keywordCity);
      else if (keyword && cleanedDestination(keyword)) setDestination({ name: cleanedDestination(keyword), detail: cleanedDestination(keyword), country: "", iata: "", tripCityId: 0, freeText: true });
      if (originValue) {
        explicitOrigin.current = true;
        requestedOriginCode.current = cleanedDestination(originValue).toUpperCase();
        setOrigin(fromCity || { name: requestedOriginCode.current, detail: requestedOriginCode.current, country: "", iata: requestedOriginCode.current, tripCityId: 0 });
      }
      if (toCity) setFlightDestination(toCity);
      else if (toValue && /^[a-z]{3}$/i.test(toValue)) setFlightDestination({ name: toValue.toUpperCase(), detail: toValue.toUpperCase(), country: "", iata: toValue.toUpperCase(), tripCityId: 0 });
      if ((params.get("type") || params.get("product")) === "flights") setProduct("flights");
      setAttribution(parseCompareAttribution(window.location.search));
    }, 0);
    return () => window.clearTimeout(initialize);
  }, []);

  useEffect(() => {
    let active = true;
    loadAirportCities()
      .then((loaded) => {
        if (!active) return;
        setAirports(loaded);
        if (requestedOriginCode.current) {
          const match = parseCity(requestedOriginCode.current, loaded);
          if (match) setOrigin(match);
        }
      })
      .catch(() => undefined)
      .finally(() => { if (active) setAirportLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!airports.length || explicitOrigin.current || attemptedApproximateLocation.current) return;
    attemptedApproximateLocation.current = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4500);
    setLocationStatus("detecting");
    fetch("https://ipwho.is/", { signal: controller.signal })
      .then((response) => response.json() as Promise<{ success?: boolean; latitude?: number; longitude?: number }>)
      .then((result) => {
        if (result.success === false || typeof result.latitude !== "number" || typeof result.longitude !== "number") throw new Error("No location");
        const nearby = nearestAirport(airports, result.latitude, result.longitude);
        if (!nearby) throw new Error("No nearby airport");
        setOrigin(nearby);
        setLocationStatus("approximate");
      })
      .catch(() => { if (!controller.signal.aborted) setLocationStatus("failed"); })
      .finally(() => window.clearTimeout(timeout));
    return () => { controller.abort(); window.clearTimeout(timeout); };
  }, [airports]);

  useEffect(() => {
    if (!sheet) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSheet(null); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", handleKey); };
  }, [sheet]);

  const cityResults = useMemo(() => {
    const query = cityQuery.trim();
    if (!query) return CITIES;
    const normalized = query.toLowerCase();
    const matches = [...CITIES, ...airports]
      .filter((city) => `${city.name} ${city.detail} ${city.country} ${city.iata}`.toLowerCase().includes(normalized))
      .sort((a, b) => {
        const aExact = a.iata.toLowerCase() === normalized ? 0 : a.name.toLowerCase().startsWith(normalized) ? 1 : 2;
        const bExact = b.iata.toLowerCase() === normalized ? 0 : b.name.toLowerCase().startsWith(normalized) ? 1 : 2;
        return aExact - bExact || a.name.localeCompare(b.name);
      });
    if (sheet !== "destination") return matches.slice(0, 40);
    const seen = new Set<string>();
    const hotelCities = matches.filter((city) => {
      const key = `${city.name.toLowerCase()}|${city.country.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 39);
    return [{ name: query, detail: locationCopy.globalDestination, country: "", iata: "", tripCityId: 0, freeText: true }, ...hotelCities];
  }, [airports, cityQuery, locationCopy.globalDestination, sheet]);

  function openCitySheet(next: Sheet) {
    setCityQuery("");
    setSheet(next);
  }

  function chooseCity(city: City) {
    if (sheet === "destination") setDestination(city);
    if (sheet === "origin") {
      explicitOrigin.current = true;
      setLocationStatus("idle");
      setOrigin(city);
    }
    if (sheet === "flightDestination") setFlightDestination(city);
    setSheet(null);
  }

  function usePreciseLocation() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("failed");
      return;
    }
    setLocationStatus("detecting");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearby = nearestAirport(airports, position.coords.latitude, position.coords.longitude);
        if (!nearby) {
          setLocationStatus("failed");
          return;
        }
        explicitOrigin.current = true;
        setOrigin(nearby);
        setLocationStatus("precise");
      },
      () => setLocationStatus("failed"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 },
    );
  }

  function buildTripUrl() {
    const tripAttribution = tripAttributionParams(attribution);
    if (product === "hotels") {
      const params = new URLSearchParams({
        destName: destination.name,
        checkin: isoDate(startDate),
        checkout: isoDate(endDate),
        crn: String(rooms),
        adult: String(adults),
        curr: "USD",
        flexType: "1",
        searchType: "CT",
        old: "1",
        ...tripAttribution,
      });
      if (destination.tripCityId) {
        params.set("city", String(destination.tripCityId));
        params.set("optionId", String(destination.tripCityId));
      }
      return `https://www.trip.com/hotels/list?${params.toString()}`;
    }
    const params = new URLSearchParams({
      triptype: "rt",
      class: "y",
      lowpricesource: "searchform",
      quantity: "1",
      searchboxarg: "t",
      nonstoponly: "off",
      acity: origin.iata,
      dcity: flightDestination.iata,
      ddate: isoDate(startDate),
      rdate: isoDate(endDate),
      curr: "USD",
      ...tripAttribution,
    });
    return `https://www.trip.com/flights/showfarefirst?${params.toString()}`;
  }

  function trackComparisonClick() {
    void fetch(buildClickTrackingUrl(product, attribution), {
      method: "GET",
      mode: "no-cors",
      credentials: "omit",
      cache: "no-store",
      keepalive: true,
    }).catch(() => undefined);
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    if (endDate <= startDate) {
      setError(t.afterStart);
      return;
    }
    setError("");
    trackComparisonClick();
    window.location.assign(buildTripUrl());
  }

  const locationSheetOpen = sheet === "destination" || sheet === "origin" || sheet === "flightDestination";
  const sheetTitle = sheet === "origin" ? t.whereFrom : sheet === "flightDestination" ? t.whereTo : t.whereStay;
  const locationMessage = locationStatus === "detecting" ? locationCopy.detectingLocation
    : locationStatus === "approximate" ? locationCopy.approximateLocation
      : locationStatus === "precise" ? locationCopy.preciseLocation
        : locationStatus === "failed" ? locationCopy.locationFailed : "";
  const hotelDestinationValue = destination.country ? `${destination.name}, ${destination.country}` : destination.name;
  const activeHero = HERO_SLIDES[heroSlide];
  const bookingFlow = BOOKING_FLOWS[product];

  return (
    <main className={styles.page} lang="en">
      <OutboundResourceHints />
      <header className={styles.header}>
        <p>Curated Global Hotel &amp; Flight Deals</p>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroTint} />
        <div className={styles.heroInner}>
          <section className={styles.focusCarousel} aria-label="Featured hotel and flight offers" aria-roledescription="carousel">
            <div className={styles.focusBackdrop} key={`image-${activeHero.id}`} style={{ backgroundImage: `url(${activeHero.image})` }} />
            <div className={styles.focusShade} />
            <div className={styles.focusCopy} key={activeHero.id}>
              <span>{activeHero.eyebrow}</span>
              <h1>{activeHero.title}</h1>
              <strong>{activeHero.offer}</strong>
              <p>{activeHero.subtitle}</p>
            </div>
            <div className={styles.carouselControls}>
              <div className={styles.carouselDots}>
                {HERO_SLIDES.map((slide, index) => (
                  <button key={slide.id} type="button" className={index === heroSlide ? styles.activeDot : ""} onClick={() => setHeroSlide(index)} aria-label={`Show ${slide.eyebrow.toLowerCase()}`} aria-current={index === heroSlide ? "true" : undefined} />
                ))}
              </div>
              <button className={styles.carouselPause} type="button" onClick={() => setCarouselPaused((paused) => !paused)} aria-label={carouselPaused ? "Resume carousel" : "Pause carousel"}>
                <Icon name={carouselPaused ? "play" : "pause"} size={15} />
              </button>
            </div>
          </section>

          <form className={styles.searchCard} onSubmit={submitSearch}>
            <div className={styles.tabs} role="tablist" aria-label="Compare product">
              <button type="button" role="tab" aria-selected={product === "hotels"} className={product === "hotels" ? styles.activeTab : ""} onClick={() => { setProduct("hotels"); setError(""); }}><Icon name="hotel" /><span>{t.hotels}</span></button>
              <button type="button" role="tab" aria-selected={product === "flights"} className={product === "flights" ? styles.activeTab : ""} onClick={() => { setProduct("flights"); setError(""); }}><Icon name="plane" /><span>{t.flights}</span></button>
            </div>

            <div className={styles.formBody}>
              {product === "hotels" ? (
                <FieldButton wide label={t.destination} value={hotelDestinationValue} icon="pin" onClick={() => openCitySheet("destination")} trailing="close" />
              ) : (
                <>
                  <FieldButton label={t.from} value={`${origin.name} (${origin.iata})`} icon="plane" onClick={() => openCitySheet("origin")} />
                  <FieldButton label={t.to} value={`${flightDestination.name} (${flightDestination.iata})`} icon="pin" onClick={() => openCitySheet("flightDestination")} />
                </>
              )}
              <FieldButton label={product === "hotels" ? t.checkIn : t.departure} value={shortDate(startDate, locale)} icon="calendar" onClick={() => setSheet("dates")} trailing="none" />
              <FieldButton label={product === "hotels" ? t.checkOut : t.returnDate} value={shortDate(endDate, locale)} icon="calendar" onClick={() => setSheet("dates")} trailing="none" />
              {product === "hotels" && <FieldButton wide label={t.guestsRooms} value={`${adults} ${adults === 1 ? t.adult : t.adults} · ${rooms} ${rooms === 1 ? t.room : t.rooms}`} icon="user" onClick={() => setSheet("guests")} />}
              {error && <p className={styles.formError} role="alert">{error}</p>}
              <button className={styles.compareButton} type="submit">
                <Icon name="search" size={25} />
                <span>{t.comparePrices}</span>
              </button>
              <div className={styles.microTrust}>
                <span><Icon name="check" size={17} />{t.noBookingFees}</span><i />
                <span><Icon name="shield" size={17} />{t.secureBooking}</span><i />
                <span><Icon name="tag" size={17} />{t.transparentPrices}</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.bookingFlowSection} aria-labelledby="booking-flow-title">
        <div className={styles.bookingFlowIntro}>
          <span>{bookingFlow.eyebrow}</span>
          <h2 id="booking-flow-title">{bookingFlow.title}</h2>
          <p>{bookingFlow.summary}</p>
        </div>
        <div className={styles.bookingSteps}>
          {bookingFlow.steps.map((step) => (
            <article key={step.number}>
              <div><span><Icon name={step.icon} /></span><small>{step.number}</small></div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <div className={styles.bookingDetails}>
          <strong>Review before you book</strong>
          <div>{bookingFlow.details.map((detail) => <span key={detail}><Icon name="check" size={16} />{detail}</span>)}</div>
        </div>
      </section>

      <footer className={styles.privacyFooter}>
        <Icon name="lock" size={18} /><span>{t.privacyNote}</span>
        <Link href="/privacy/?lang=en">{t.privacy}</Link>
        <Link href="/terms/?lang=en">{t.terms}</Link>
      </footer>

      {sheet && <div className={styles.sheetLayer} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSheet(null); }}>
        <section className={`${styles.sheet} ${sheet === "dates" ? styles.calendarSheet : ""}`} role="dialog" aria-modal="true" aria-label={sheet === "dates" ? t.selectDates : sheetTitle}>
          <div className={styles.sheetHandle} />
          {locationSheetOpen && <>
            <div className={styles.sheetTitleRow}><div><span className={styles.sheetEyebrow}>{t.searchDestinations}</span><h2>{sheetTitle}</h2></div><button className={styles.iconButton} type="button" onClick={() => setSheet(null)} aria-label={t.cancel}><Icon name="close" /></button></div>
            {sheet === "origin" && <button className={styles.locationAction} type="button" onClick={usePreciseLocation} disabled={airportLoading || locationStatus === "detecting"}><Icon name="locate" size={18} />{locationCopy.useMyLocation}</button>}
            {sheet === "origin" && locationMessage && <p className={`${styles.locationStatus} ${locationStatus === "failed" ? styles.locationError : ""}`}>{locationMessage}</p>}
            <label className={styles.sheetSearch}><Icon name="search" /><input autoFocus value={cityQuery} onChange={(event) => setCityQuery(event.target.value)} placeholder={t.cityAirport} /></label>
            <p className={styles.coverageNote}>{airportLoading ? locationCopy.loadingAirports : locationCopy.airportCoverage}</p>
            <div className={styles.cityList}>{cityResults.length ? cityResults.map((city, index) => <button type="button" className={city.freeText ? styles.tripSearchResult : ""} key={`${city.name}-${city.iata}-${index}`} onClick={() => chooseCity(city)}><span><Icon name={sheet === "origin" || sheet === "flightDestination" ? "plane" : "pin"} /></span><div><strong>{city.freeText ? `${locationCopy.searchTripFor} “${city.name}”` : city.name}</strong><small>{city.detail}</small></div><b>{city.iata}</b></button>) : <p>{t.noDestinations}</p>}</div>
          </>}
          {sheet === "dates" && <CalendarSheet start={startDate} end={endDate} product={product} locale={locale} t={t} onCancel={() => setSheet(null)} onConfirm={(start, end) => { setStartDate(start); setEndDate(end); setSheet(null); }} />}
          {sheet === "guests" && <>
            <div className={styles.sheetTitleRow}><div><span className={styles.sheetEyebrow}>{t.guestsRooms}</span><h2>{t.whoTravels}</h2></div><button className={styles.iconButton} type="button" onClick={() => setSheet(null)} aria-label={t.cancel}><Icon name="close" /></button></div>
            <div className={styles.counterList}><Counter label={t.adults} hint={t.adultHint} value={adults} min={1} max={8} onChange={setAdults} /><Counter label={t.rooms} hint={t.roomHint} value={rooms} min={1} max={5} onChange={setRooms} /></div>
            <div className={styles.sheetActions}><span>{adults} {adults === 1 ? t.adult : t.adults} · {rooms} {rooms === 1 ? t.room : t.rooms}</span><button type="button" className={styles.primaryButton} onClick={() => setSheet(null)}>{t.confirm}</button></div>
          </>}
        </section>
      </div>}
    </main>
  );
}
