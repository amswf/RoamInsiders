"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { normalizeLocale, type Locale } from "@/lib/content";

function subscribeLocale(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("travelgoguide:locale", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("travelgoguide:locale", callback);
  };
}

function getLocaleSnapshot(): Locale {
  return normalizeLocale(new URLSearchParams(window.location.search).get("lang"));
}

function getServerLocaleSnapshot(): Locale {
  return "zh-CN";
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribeLocale, getLocaleSnapshot, getServerLocaleSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLocale = useCallback((next: Locale) => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
    document.documentElement.lang = next;
    window.dispatchEvent(new Event("travelgoguide:locale"));
  }, []);

  return [locale, changeLocale] as const;
}
