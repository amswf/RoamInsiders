"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./compare.module.css";

type Product = "hotels" | "flights";
type Sheet = "destination" | "origin" | "flightDestination" | "dates" | "guests" | "menu" | null;

type City = {
  name: string;
  detail: string;
  country: string;
  iata: string;
  tripCityId: number;
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

const AFFILIATE = {
  allianceid: "6184613",
  SID: "246187838",
  trip_sub3: "D18651047",
};

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

function shortDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function sameDay(a: Date | null, b: Date | null) {
  return Boolean(a && b && isoDate(a) === isoDate(b));
}

function parseCity(value: string | null) {
  if (!value) return null;
  const normalized = value.toLowerCase().replace(/\b(hotels?|flights?|cheap|deals?)\b/g, " ").trim();
  return CITIES.find((city) => normalized.includes(city.name.toLowerCase()) || normalized.includes(city.iata.toLowerCase())) || null;
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
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
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

function CalendarSheet({ start, end, onCancel, onConfirm }: { start: Date; end: Date; onCancel: () => void; onConfirm: (start: Date, end: Date) => void }) {
  const today = startOfDay(new Date());
  const [month, setMonth] = useState(new Date(start.getFullYear(), start.getMonth(), 1));
  const [draftStart, setDraftStart] = useState<Date | null>(start);
  const [draftEnd, setDraftEnd] = useState<Date | null>(end);
  const firstWeekday = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, index) => index - firstWeekday + 1);
  const nights = draftStart && draftEnd ? Math.round((startOfDay(draftEnd).getTime() - startOfDay(draftStart).getTime()) / 86400000) : 0;

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

  return (
    <div className={styles.calendarContent}>
      <div className={styles.sheetTitleRow}>
        <div><span className={styles.sheetEyebrow}>{draftStart && !draftEnd ? "Selecting check-out" : "Select dates"}</span><h2>When are you travelling?</h2></div>
        <button className={styles.iconButton} type="button" onClick={onCancel} aria-label="Close date picker"><Icon name="close" /></button>
      </div>
      <div className={styles.dateSummary}>
        <div className={draftStart && !draftEnd ? styles.activeSummary : ""}><span>Check-in</span><strong>{draftStart ? shortDate(draftStart) : "Select"}</strong></div>
        <Icon name="arrow" size={18} />
        <div className={draftStart && !draftEnd ? styles.activeSummary : ""}><span>Check-out</span><strong>{draftEnd ? shortDate(draftEnd) : "Select"}</strong></div>
      </div>
      <div className={styles.calendarNav}>
        <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} disabled={monthIsCurrent} aria-label="Previous month">←</button>
        <strong>{new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(month)}</strong>
        <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Next month">→</button>
      </div>
      <div className={styles.calendarGrid}>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => <span className={styles.weekday} key={day}>{day}</span>)}
        {cells.map((day, index) => {
          if (day < 1 || day > daysInMonth) return <span key={index} />;
          const date = new Date(month.getFullYear(), month.getMonth(), day);
          const disabled = date < today;
          const selectedStart = sameDay(date, draftStart);
          const selectedEnd = sameDay(date, draftEnd);
          const inRange = Boolean(draftStart && draftEnd && date > draftStart && date < draftEnd);
          return <button type="button" key={index} className={`${selectedStart || selectedEnd ? styles.selectedDay : ""} ${inRange ? styles.rangeDay : ""}`} disabled={disabled} onClick={() => chooseDate(day)} aria-label={shortDate(date)}>{day}</button>;
        })}
      </div>
      <div className={styles.sheetActions}>
        <span>{nights > 0 ? `${nights} ${nights === 1 ? "night" : "nights"}` : "Choose a check-in and check-out date"}</span>
        <div><button type="button" className={styles.secondaryButton} onClick={onCancel}>Cancel</button><button type="button" className={styles.primaryButton} disabled={!draftStart || !draftEnd} onClick={() => draftStart && draftEnd && onConfirm(draftStart, draftEnd)}>Confirm</button></div>
      </div>
    </div>
  );
}

export function TravelCompareExperience() {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [subId, setSubId] = useState("");

  useEffect(() => {
    const initializeFromAdParams = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const keywordCity = parseCity(params.get("destination") || params.get("dest") || params.get("keyword"));
      const fromCity = parseCity(params.get("from") || params.get("origin") || params.get("acity"));
      const toCity = parseCity(params.get("to") || params.get("dcity") || params.get("keyword"));
      if (keywordCity) setDestination(keywordCity);
      if (fromCity) setOrigin(fromCity);
      if (toCity) setFlightDestination(toCity);
      if ((params.get("type") || params.get("product")) === "flights") setProduct("flights");
      setSubId(params.get("trip_sub1") || params.get("gclid") || params.get("utm_campaign") || "");
    }, 0);
    return () => window.clearTimeout(initializeFromAdParams);
  }, []);

  useEffect(() => {
    if (!sheet) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSheet(null); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", handleKey); };
  }, [sheet]);

  const cityResults = useMemo(() => {
    const query = cityQuery.trim().toLowerCase();
    if (!query) return CITIES;
    return CITIES.filter((city) => `${city.name} ${city.detail} ${city.iata}`.toLowerCase().includes(query));
  }, [cityQuery]);

  function openCitySheet(next: Sheet) {
    setCityQuery("");
    setSheet(next);
  }

  function chooseCity(city: City) {
    if (sheet === "destination") setDestination(city);
    if (sheet === "origin") setOrigin(city);
    if (sheet === "flightDestination") setFlightDestination(city);
    setSheet(null);
  }

  function buildTripUrl() {
    const attribution = { ...AFFILIATE, ...(subId ? { trip_sub1: subId } : {}) };
    if (product === "hotels") {
      const params = new URLSearchParams({
        city: String(destination.tripCityId), destName: destination.name, checkin: isoDate(startDate), checkout: isoDate(endDate), crn: String(rooms), adult: String(adults), curr: "USD",
        flexType: "1", searchType: "CT", optionId: "2", old: "1", ...attribution,
      });
      return `https://www.trip.com/hotels/list?${params.toString()}`;
    }
    const params = new URLSearchParams({
      triptype: "rt", class: "y", lowpricesource: "searchform", quantity: "1", searchboxarg: "t", nonstoponly: "off",
      acity: origin.iata, dcity: flightDestination.iata, ddate: isoDate(startDate), rdate: isoDate(endDate), curr: "USD", ...attribution,
    });
    return `https://www.trip.com/flights/showfarefirst?${params.toString()}`;
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    if (endDate <= startDate) {
      setError("Check-out or return must be after your start date.");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => window.location.assign(buildTripUrl()), 800);
  }

  const locationSheetOpen = sheet === "destination" || sheet === "origin" || sheet === "flightDestination";
  const sheetTitle = sheet === "origin" ? "Where are you flying from?" : sheet === "flightDestination" ? "Where are you flying to?" : "Where do you want to stay?";

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="TravelGoGuide home">
          {/* A relative public-asset URL stays valid for both the custom domain and a future GitHub Pages base path. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="../favicon.svg" alt="" width="40" height="40" />
          <span><b>TRAVELGO</b><em>COMPARE</em></span>
        </Link>
        <div className={styles.headerTools}>
          <button className={styles.languageButton} type="button" aria-label="Language: English"><Icon name="globe" /><span>EN</span><Icon name="chevron" size={16} /></button>
          <button className={styles.menuButton} type="button" onClick={() => setSheet("menu")} aria-label="Open menu"><Icon name="menu" size={28} /></button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroTint} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.heroEyebrow}>ONE SEARCH · TRUSTED TRAVEL PARTNERS</span>
            <h1>Find the Best<br />Travel Deals</h1>
            <p>Compare prices from trusted travel partners in seconds.</p>
          </div>

          <form className={styles.searchCard} onSubmit={submitSearch}>
            <div className={styles.tabs} role="tablist" aria-label="Compare product">
              <button type="button" role="tab" aria-selected={product === "hotels"} className={product === "hotels" ? styles.activeTab : ""} onClick={() => { setProduct("hotels"); setError(""); }}><Icon name="hotel" /><span>Hotels</span></button>
              <button type="button" role="tab" aria-selected={product === "flights"} className={product === "flights" ? styles.activeTab : ""} onClick={() => { setProduct("flights"); setError(""); }}><Icon name="plane" /><span>Flights</span></button>
            </div>

            <div className={styles.formBody}>
              {product === "hotels" ? (
                <FieldButton wide label="Destination" value={`${destination.name}, ${destination.country}`} icon="pin" onClick={() => openCitySheet("destination")} trailing="close" />
              ) : (
                <>
                  <FieldButton label="From" value={`${origin.name} (${origin.iata})`} icon="plane" onClick={() => openCitySheet("origin")} />
                  <FieldButton label="To" value={`${flightDestination.name} (${flightDestination.iata})`} icon="pin" onClick={() => openCitySheet("flightDestination")} />
                </>
              )}
              <FieldButton label={product === "hotels" ? "Check-in" : "Departure"} value={shortDate(startDate)} icon="calendar" onClick={() => setSheet("dates")} trailing="none" />
              <FieldButton label={product === "hotels" ? "Check-out" : "Return"} value={shortDate(endDate)} icon="calendar" onClick={() => setSheet("dates")} trailing="none" />
              {product === "hotels" && <FieldButton wide label="Guests & Rooms" value={`${adults} ${adults === 1 ? "Adult" : "Adults"} · ${rooms} ${rooms === 1 ? "Room" : "Rooms"}`} icon="user" onClick={() => setSheet("guests")} />}
              {error && <p className={styles.formError} role="alert">{error}</p>}
              <button className={styles.compareButton} type="submit" disabled={loading}>
                {loading ? <span className={styles.spinner} /> : <Icon name="search" size={25} />}
                <span>{loading ? "Finding Best Deals..." : "Compare Prices"}</span>
              </button>
              <div className={styles.microTrust}>
                <span><Icon name="check" size={17} />No booking fees</span><i />
                <span><Icon name="shield" size={17} />Secure booking</span><i />
                <span><Icon name="tag" size={17} />Transparent prices</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="why-compare">
        <h2 id="why-compare" className={styles.srOnly}>Why compare with TravelGoGuide</h2>
        <div className={styles.trustGrid}>
          <div><span><Icon name="percent" /></span><strong>Best Prices</strong><p>Compare available deals in one simple search.</p></div>
          <div><span><Icon name="shield" /></span><strong>Trusted & Secure</strong><p>Continue your booking with an established partner.</p></div>
          <div><span><Icon name="tag" /></span><strong>No Hidden Fees</strong><p>Review the full price and terms before paying.</p></div>
          <div><span><Icon name="bolt" /></span><strong>Instant Results</strong><p>Your search details travel with you.</p></div>
        </div>
        <div className={styles.partners}>
          <p>Search powered by leading travel partners</p>
          <div><span className={styles.tripLogo}>Trip.com</span><span className={styles.bookingLogo}>Booking</span><span className={styles.travelokaLogo}>traveloka</span><span className={styles.agodaLogo}>agoda<i><b /><b /><b /><b /><b /></i></span></div>
        </div>
      </section>

      <footer className={styles.privacyFooter}><Icon name="lock" size={18} /><span>We respect your privacy. Your search is protected.</span><Link href="/about/">About TravelGoGuide</Link></footer>

      {sheet && <div className={styles.sheetLayer} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSheet(null); }}>
        <section className={`${styles.sheet} ${sheet === "dates" ? styles.calendarSheet : ""} ${sheet === "menu" ? styles.menuSheet : ""}`} role="dialog" aria-modal="true" aria-label={sheet === "dates" ? "Select dates" : sheetTitle}>
          <div className={styles.sheetHandle} />
          {locationSheetOpen && <>
            <div className={styles.sheetTitleRow}><div><span className={styles.sheetEyebrow}>Search destinations</span><h2>{sheetTitle}</h2></div><button className={styles.iconButton} type="button" onClick={() => setSheet(null)} aria-label="Close"><Icon name="close" /></button></div>
            <label className={styles.sheetSearch}><Icon name="search" /><input autoFocus value={cityQuery} onChange={(event) => setCityQuery(event.target.value)} placeholder="City or airport code" /></label>
            <div className={styles.cityList}>{cityResults.length ? cityResults.map((city) => <button type="button" key={`${city.name}-${city.iata}`} onClick={() => chooseCity(city)}><span><Icon name={sheet === "origin" || sheet === "flightDestination" ? "plane" : "pin"} /></span><div><strong>{city.name}</strong><small>{city.detail}</small></div><b>{city.iata}</b></button>) : <p>No destinations found. Try another city.</p>}</div>
          </>}
          {sheet === "dates" && <CalendarSheet start={startDate} end={endDate} onCancel={() => setSheet(null)} onConfirm={(start, end) => { setStartDate(start); setEndDate(end); setSheet(null); }} />}
          {sheet === "guests" && <>
            <div className={styles.sheetTitleRow}><div><span className={styles.sheetEyebrow}>Guests & rooms</span><h2>Who is travelling?</h2></div><button className={styles.iconButton} type="button" onClick={() => setSheet(null)} aria-label="Close"><Icon name="close" /></button></div>
            <div className={styles.counterList}><Counter label="Adults" hint="Ages 18 or above" value={adults} min={1} max={8} onChange={setAdults} /><Counter label="Rooms" hint="Up to 5 rooms" value={rooms} min={1} max={5} onChange={setRooms} /></div>
            <div className={styles.sheetActions}><span>{adults} {adults === 1 ? "adult" : "adults"} in {rooms} {rooms === 1 ? "room" : "rooms"}</span><button type="button" className={styles.primaryButton} onClick={() => setSheet(null)}>Confirm</button></div>
          </>}
          {sheet === "menu" && <>
            <div className={styles.sheetTitleRow}><div><span className={styles.sheetEyebrow}>TravelGoGuide</span><h2>Explore</h2></div><button className={styles.iconButton} type="button" onClick={() => setSheet(null)} aria-label="Close"><Icon name="close" /></button></div>
            <nav className={styles.menuNav}><Link href="/">Travel stories <Icon name="arrow" /></Link><Link href="/guides/">All guides <Icon name="arrow" /></Link><Link href="/about/">About us <Icon name="arrow" /></Link></nav>
          </>}
        </section>
      </div>}
    </main>
  );
}
