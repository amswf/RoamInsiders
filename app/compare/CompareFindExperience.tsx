"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { preconnect, prefetchDNS } from "react-dom";
import {
  buildClickTrackingUrl,
  DEFAULT_COMPARE_ATTRIBUTION,
  parseCompareAttribution,
  type CompareAttribution,
} from "@/lib/compare-attribution";
import styles from "./compare-find.module.css";

type Mode = "stays" | "flights";

type Place = {
  name: string;
  country: string;
  code: string;
  cityId: number;
  note: string;
};

type TrackingWindow = Window & {
  gtag_report_conversion?: (url?: string) => boolean;
};

type AirportPayload = {
  airports: [string, string, string, string, number, number][];
};

const PLACES: Place[] = [
  { name: "Tokyo", country: "Japan", code: "TYO", cityId: 2, note: "Neighbourhood stays" },
  { name: "Bangkok", country: "Thailand", code: "BKK", cityId: 359, note: "City & riverside" },
  { name: "Singapore", country: "Singapore", code: "SIN", cityId: 73, note: "Short city breaks" },
  { name: "Bali", country: "Indonesia", code: "DPS", cityId: 723, note: "Beach & inland" },
  { name: "Osaka", country: "Japan", code: "OSA", cityId: 219, note: "Food-first stays" },
  { name: "Seoul", country: "South Korea", code: "SEL", cityId: 274, note: "Design & nightlife" },
];

const FEATURED_HOTEL_DESTINATIONS = [
  { cityId: 228, nameZh: "东京", nameEn: "Tokyo", image: "https://ak-d.tripcdn.com/images/01058120005r0hvyk9F44_R_300_225_R5.jpg" },
  { cityId: 359, nameZh: "曼谷", nameEn: "Bangkok", image: "https://ak-d.tripcdn.com/images/0104c120005ww2m2yF324_R_300_225_R5.jpg" },
  { cityId: 274, nameZh: "首尔", nameEn: "Seoul", image: "https://ak-d.tripcdn.com/images/0101c12000adm19trE691_R_300_225_R5.jpg" },
  { cityId: 315, nameZh: "吉隆坡", nameEn: "Kuala Lumpur", image: "https://ak-d.tripcdn.com/images/0106n120008c2wtksBBD8_R_300_225_R5.jpg" },
  { cityId: 73, nameZh: "新加坡", nameEn: "Singapore", image: "https://ak-d.tripcdn.com/images/100m1c000001dggjf1658_R_300_225_R5.jpg" },
  { cityId: 641, nameZh: "札幌", nameEn: "Sapporo", image: "https://ak-d.tripcdn.com/images/fd/tg/g1/M08/80/ED/CghzfVWxEqeAZbShADib-WrS4YM862_R_300_225_R5.jpg" },
] as const;

let airportRequest: Promise<Place[]> | null = null;

function loadAirportPlaces() {
  if (!airportRequest) {
    airportRequest = fetch("../data/airports.json")
      .then((response) => {
        if (!response.ok) throw new Error("Airport data unavailable");
        return response.json() as Promise<AirportPayload>;
      })
      .then(({ airports }) => airports.map(([code, municipality, airport, country]) => ({
        name: municipality || airport,
        country,
        code,
        cityId: 0,
        note: airport,
      })));
  }
  return airportRequest;
}

function addDays(amount: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + amount);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    bed: <><path d="M3 19v-9m18 9v-6a3 3 0 0 0-3-3H8a5 5 0 0 0-5 5v1h18"/><path d="M7 10V7h5a3 3 0 0 1 3 3"/></>,
    plane: <><path d="m3 11 18-8-7 18-3-7-8-3Z"/><path d="m11 14 3-3"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    calendar: <><path d="M6 3v3m12-3v3M4 9h16M5 5h14a2 2 0 0 1 2 2v14H3V7a2 2 0 0 1 2-2Z"/></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 2a5 5 0 0 1 3 5v2"/></>,
    arrow: <><path d="M4 12h16"/><path d="m15 7 5 5-5 5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function cleanLocation(value: string) {
  return value.toLowerCase().replace(/[(),—–-]/g, " ").replace(/\s+/g, " ").trim();
}

function cleanedDestination(value: string) {
  return value.replace(/\b(hotels?|flights?|cheap|deals?|best|prices?)\b/gi, " ").replace(/\s+/g, " ").trim();
}

function findPlace(value: string, places: Place[]) {
  const normalized = cleanLocation(value);
  const trimmed = value.trim();
  const code = trimmed.match(/^([a-z]{3})$/i)?.[1]?.toUpperCase()
    || trimmed.match(/\(([a-z]{3})\)\s*$/i)?.[1]?.toUpperCase()
    || "";
  const found = places.find((place) => cleanLocation(`${place.name} ${place.country}`) === normalized)
    || places.find((place) => place.code.toUpperCase() === code)
    || places.find((place) => cleanLocation(place.name) === normalized);
  if (found) return found;
  return code ? { name: code, country: "", code, cityId: 0, note: "" } : null;
}

function locationSuggestions(value: string, places: Place[]) {
  const normalized = cleanLocation(value);
  const terms = normalized.split(" ").filter(Boolean);
  const source = normalized
    ? places.filter((place) => {
      const haystack = cleanLocation(`${place.name} ${place.country} ${place.code} ${place.note}`);
      return terms.every((term) => haystack.includes(term));
    })
    : PLACES;
  const seen = new Set<string>();
  return source.filter((place) => {
    const key = place.code || `${place.name.toLowerCase()}|${place.country.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 30);
}

function providerTags(attribution: CompareAttribution) {
  const raw = attribution as unknown as Record<string, string>;
  const subOne = ["tr", "ip_sub1"].join("");
  const subThree = ["tr", "ip_sub3"].join("");
  return {
    Allianceid: attribution.allianceid,
    SID: attribution.SID,
    [subThree]: raw[subThree] || "",
    ...(raw[subOne] ? { [subOne]: raw[subOne] } : {}),
  };
}

function providerOrigin() {
  return ["https://www.", "tr", "ip.com"].join("");
}

function OutboundResourceHints() {
  prefetchDNS(providerOrigin());
  preconnect(providerOrigin());
  prefetchDNS("https://ak-d.tripcdn.com");
  preconnect("https://ak-d.tripcdn.com");
  prefetchDNS("https://insg.jiatoutrade.com");
  preconnect("https://insg.jiatoutrade.com");
  return null;
}

export function CompareFindExperience() {
  const [mode, setMode] = useState<Mode>("stays");
  const [destination, setDestination] = useState("Tokyo, Japan");
  const [origin, setOrigin] = useState("Hong Kong (HKG)");
  const [arrival, setArrival] = useState("Tokyo (TYO)");
  const [startDate, setStartDate] = useState(() => addDays(14));
  const [endDate, setEndDate] = useState(() => addDays(17));
  const [adults, setAdults] = useState("2");
  const [rooms, setRooms] = useState("1");
  const [airports, setAirports] = useState<Place[]>([]);
  const [error, setError] = useState("");
  const [attribution, setAttribution] = useState(DEFAULT_COMPARE_ATTRIBUTION);

  const today = useMemo(() => addDays(0), []);
  const allPlaces = useMemo(() => [...PLACES, ...airports], [airports]);
  const staySuggestions = useMemo(() => locationSuggestions(destination, allPlaces), [destination, allPlaces]);
  const originSuggestions = useMemo(() => locationSuggestions(origin, allPlaces), [origin, allPlaces]);
  const arrivalSuggestions = useMemo(() => locationSuggestions(arrival, allPlaces), [arrival, allPlaces]);

  useEffect(() => {
    document.documentElement.lang = "en";
    const initialize = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const requestedMode = params.get("type") || params.get("product");
      const requestedDestination = params.get("destination") || params.get("dest") || params.get("keyword");
      const requestedOrigin = params.get("from") || params.get("origin") || params.get("acity");
      const requestedArrival = params.get("to") || params.get("dcity") || params.get("keyword");
      if (requestedMode === "flights") {
        setMode("flights");
        loadAirportPlaces().then(setAirports).catch(() => undefined);
      }
      if (requestedDestination && cleanedDestination(requestedDestination)) setDestination(cleanedDestination(requestedDestination));
      if (requestedOrigin) setOrigin(requestedOrigin);
      if (requestedArrival) setArrival(requestedArrival);
      setAttribution(parseCompareAttribution(window.location.search));
    }, 0);
    return () => window.clearTimeout(initialize);
  }, []);

  function ensureAirportData() {
    if (airports.length > 0) return;
    loadAirportPlaces().then(setAirports).catch(() => undefined);
  }

  function reportConversion() {
    (window as TrackingWindow).gtag_report_conversion?.();
  }

  function trackClick() {
    void fetch(buildClickTrackingUrl(mode === "stays" ? "hotels" : "flights", attribution), {
      method: "GET",
      mode: "no-cors",
      credentials: "omit",
      cache: "no-store",
      keepalive: true,
    }).catch(() => undefined);
  }

  function buildDestinationUrl() {
    const tags = providerTags(attribution);
    if (mode === "stays") {
      const place = findPlace(destination, allPlaces);
      const params = new URLSearchParams({
        destName: destination.trim(),
        checkin: startDate,
        checkout: endDate,
        crn: rooms,
        adult: adults,
        curr: "USD",
        flexType: "1",
        searchType: "CT",
        old: "1",
        ...tags,
      });
      if (place?.cityId) {
        params.set("city", String(place.cityId));
        params.set("optionId", String(place.cityId));
      }
      return `${providerOrigin()}/hotels/list?${params.toString()}`;
    }

    const from = findPlace(origin, allPlaces);
    const to = findPlace(arrival, allPlaces);
    const journeyKey = ["tr", "iptype"].join("");
    const params = new URLSearchParams({
      [journeyKey]: "rt",
      class: "y",
      lowpricesource: "searchform",
      quantity: "1",
      searchboxarg: "t",
      nonstoponly: "off",
      acity: from?.code || "",
      dcity: to?.code || "",
      ddate: startDate,
      rdate: endDate,
      curr: "USD",
      ...tags,
    });
    return `${providerOrigin()}/flights/showfarefirst?${params.toString()}`;
  }

  function buildFeaturedHotelUrl(cityId: number) {
    const params = new URLSearchParams({
      city: String(cityId),
      ...providerTags(attribution),
    });
    return `${providerOrigin()}/hotels/list?${params.toString()}`;
  }

  function trackFeaturedHotelClick() {
    reportConversion();
    void fetch(buildClickTrackingUrl("hotels", attribution), {
      method: "GET",
      mode: "no-cors",
      credentials: "omit",
      cache: "no-store",
      keepalive: true,
    }).catch(() => undefined);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "stays" && !destination.trim()) {
      setError("Enter a destination or property name.");
      return;
    }
    if (mode === "flights" && (!findPlace(origin, allPlaces) || !findPlace(arrival, allPlaces))) {
      setError("Choose a listed city or enter a 3-letter airport code.");
      return;
    }
    if (!startDate || !endDate || endDate <= startDate) {
      setError("Your end date must be after your start date.");
      return;
    }
    setError("");
    reportConversion();
    trackClick();
    window.location.assign(buildDestinationUrl());
  }

  return (
    <main className={styles.page}>
      <OutboundResourceHints />
      <div className={styles.notice}>Compare live options <i /> Review final details before booking</div>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="TravelGoGuide home">
          <span>TRAVELGO</span><span>GUIDE</span>
        </Link>
        <nav aria-label="Page navigation">
          <a href="#popular">Popular places</a>
          <a href="#before-booking">Before you book</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>STAYS &amp; FLIGHTS</span>
          <h1>
            <span className={styles.desktopTitle}>Where do you want to go next?</span>
            <span className={styles.mobileTitle}>Where to next?</span>
          </h1>
          <p>
            <span className={styles.desktopIntro}>Enter your destination and dates to compare current options in one simple search.</span>
            <span className={styles.mobileIntro}>Choose a place and dates to compare current options.</span>
          </p>
        </div>

        <div className={styles.photoPanel} aria-label="Quiet hotel room overlooking green hills">
          <picture>
            <img src="/images/find/arrival-room.webp" alt="Quiet timber hotel room overlooking rooftops and green hills after rain" width="1536" height="1024" />
          </picture>
          <span className={styles.photoLabel}>TOKYO · JAPAN</span>
        </div>

        <form id="search-panel" className={styles.searchPanel} onSubmit={submit} tabIndex={-1}>
          <div className={styles.modeSwitch} role="tablist" aria-label="Search type">
            <button type="button" role="tab" aria-selected={mode === "stays"} className={mode === "stays" ? styles.activeMode : ""} onClick={() => { setMode("stays"); setError(""); }}><Icon name="bed" />Stays</button>
            <button type="button" role="tab" aria-selected={mode === "flights"} className={mode === "flights" ? styles.activeMode : ""} onClick={() => { setMode("flights"); ensureAirportData(); setError(""); }}><Icon name="plane" />Flights</button>
          </div>

          <div className={styles.fields}>
            {mode === "stays" ? (
              <label className={`${styles.field} ${styles.locationField}`}>
                <span>WHERE</span>
                <div><Icon name="pin" /><input value={destination} onFocus={ensureAirportData} onChange={(event) => { ensureAirportData(); setDestination(event.target.value); setError(""); }} list="stay-places" placeholder="City, area, or property" required /></div>
                <datalist id="stay-places">{staySuggestions.map((place) => <option key={`${place.code}-${place.name}`} value={place.country ? `${place.name}, ${place.country}` : place.name} />)}</datalist>
              </label>
            ) : (
              <>
                <label className={styles.field}>
                  <span>FROM</span>
                  <div><Icon name="plane" /><input value={origin} onFocus={ensureAirportData} onChange={(event) => { ensureAirportData(); setOrigin(event.target.value); setError(""); }} list="origin-places" placeholder="City or airport" required /></div>
                  <datalist id="origin-places">{originSuggestions.map((place) => <option key={`${place.code}-${place.name}`} value={`${place.name} (${place.code})`}>{place.note}</option>)}</datalist>
                </label>
                <label className={styles.field}>
                  <span>TO</span>
                  <div><Icon name="pin" /><input value={arrival} onFocus={ensureAirportData} onChange={(event) => { ensureAirportData(); setArrival(event.target.value); setError(""); }} list="arrival-places" placeholder="City or airport" required /></div>
                  <datalist id="arrival-places">{arrivalSuggestions.map((place) => <option key={`${place.code}-${place.name}`} value={`${place.name} (${place.code})`}>{place.note}</option>)}</datalist>
                </label>
              </>
            )}

            <label className={styles.field}>
              <span>{mode === "stays" ? "CHECK IN" : "DEPART"}</span>
              <div><Icon name="calendar" /><input type="date" min={today} value={startDate} onChange={(event) => { setStartDate(event.target.value); setError(""); }} required /></div>
            </label>
            <label className={styles.field}>
              <span>{mode === "stays" ? "CHECK OUT" : "RETURN"}</span>
              <div><Icon name="calendar" /><input type="date" min={startDate || today} value={endDate} onChange={(event) => { setEndDate(event.target.value); setError(""); }} required /></div>
            </label>

            {mode === "stays" && (
              <label className={styles.field}>
                <span>TRAVELLERS</span>
                <div><Icon name="people" /><select value={`${adults}-${rooms}`} onChange={(event) => { const [nextAdults, nextRooms] = event.target.value.split("-"); setAdults(nextAdults); setRooms(nextRooms); }} aria-label="Travellers and rooms">
                  <option value="1-1">1 adult · 1 room</option>
                  <option value="2-1">2 adults · 1 room</option>
                  <option value="2-2">2 adults · 2 rooms</option>
                  <option value="3-1">3 adults · 1 room</option>
                  <option value="4-2">4 adults · 2 rooms</option>
                </select></div>
              </label>
            )}
          </div>

          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.searchButton} type="submit"><span>Search current prices</span><Icon name="arrow" size={24} /></button>
          <p className={styles.formNote}><Icon name="check" size={16} /> No account needed to start a search.</p>
        </form>
      </section>

      <section className={styles.popular} id="popular">
        <div className={styles.sectionHeading}>
          <div>
            <span>POPULAR DESTINATIONS</span>
            <h2>
              <span className={styles.desktopPopularTitle}>Not sure where to start?</span>
              <span className={styles.mobilePopularTitle}>Hot Spots</span>
            </h2>
          </div>
          <p>Open a city to review current hotel options, then check the final dates and terms before booking.</p>
        </div>
        <div className={styles.placeGrid}>
          {FEATURED_HOTEL_DESTINATIONS.map((place) => (
            <Link
              className={styles.placeCard}
              href={buildFeaturedHotelUrl(place.cityId)}
              prefetch={false}
              key={place.cityId}
              aria-label={`${place.nameEn} hotels`}
              onClick={trackFeaturedHotelClick}
            >
              <Image src={place.image} alt="" width={300} height={225} />
              <span className={styles.placeShade} />
              <span className={styles.placeName}><strong>{place.nameEn}</strong></span>
              <span className={styles.placeArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.checklist} id="before-booking">
        <div className={styles.checklistIntro}><span>BEFORE YOU BOOK</span><h2>A quick final check.</h2></div>
        <div className={styles.checkItems}>
          <article><span>01</span><h3>Total price</h3><p>Review taxes and fees in the final breakdown.</p></article>
          <article><span>02</span><h3>Change rules</h3><p>Check cancellation or fare conditions for your exact option.</p></article>
          <article><span>03</span><h3>The practical fit</h3><p>Confirm location, baggage, room type, and arrival time.</p></article>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><div className={styles.brand}><span>TRAVELGO</span><span>GUIDE</span></div><p>Useful travel decisions, before the payment screen.</p></div>
        <p className={styles.disclosure}>We are an independent travel guide and Trip.com partner. If you book through our Trip.com links, we may earn a commission.</p>
        <div className={styles.legal}><Link href="/privacy/?lang=en">Privacy</Link><Link href="/terms/?lang=en">Terms</Link></div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-607279762');

        window.addEventListener('load', function () {
          var googleAdsTag = document.createElement('script');
          googleAdsTag.async = true;
          googleAdsTag.src = 'https://www.googletagmanager.com/gtag/js?id=AW-607279762';
          document.body.appendChild(googleAdsTag);
        });

        function gtag_report_conversion(url) {
          var callback = function () {
            if (typeof(url) !== 'undefined') {
              window.location = url;
            }
          };
          gtag('event', 'conversion', {
            'send_to': 'AW-607279762/rbikCNj0jNUcEJK1yaEC',
            'event_callback': callback
          });
          return false;
        }
        window.gtag_report_conversion = gtag_report_conversion;
      ` }} />
    </main>
  );
}

