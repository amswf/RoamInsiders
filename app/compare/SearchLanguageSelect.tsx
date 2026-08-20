"use client";

import { useEffect, useState } from "react";
import {
  detectSearchPageLocale,
  normalizeSearchPageLocale,
  searchPageLocaleLabels,
  searchPageLocales,
  type SearchPageLocale,
} from "@/lib/search-page-i18n";

const STORAGE_KEY = "travelgoguide.search-language";

export function useSearchPageLocale() {
  const [locale, setLocale] = useState<SearchPageLocale>("en");

  useEffect(() => {
    const initialize = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const queryLocale = normalizeSearchPageLocale(params.get("lang"));
      const storedLocale = normalizeSearchPageLocale(window.localStorage.getItem(STORAGE_KEY));
      const browserLocale = detectSearchPageLocale(navigator.languages?.length ? navigator.languages : [navigator.language]);
      const initialLocale = queryLocale || storedLocale || browserLocale;
      setLocale(initialLocale);
      document.documentElement.lang = initialLocale;
    }, 0);
    return () => window.clearTimeout(initialize);
  }, []);

  function changeLocale(nextLocale: SearchPageLocale) {
    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.history.replaceState(window.history.state, "", url);
  }

  return { locale, changeLocale };
}

export function SearchLanguageSelect({
  locale,
  onChange,
  className,
  label,
}: {
  locale: SearchPageLocale;
  onChange: (locale: SearchPageLocale) => void;
  className?: string;
  label: string;
}) {
  return (
    <label className={className}>
      <span className="sr-only">{label}</span>
      <select value={locale} onChange={(event) => onChange(event.target.value as SearchPageLocale)} aria-label={label}>
        {searchPageLocales.map((option) => <option value={option} key={option}>{searchPageLocaleLabels[option]}</option>)}
      </select>
    </label>
  );
}
