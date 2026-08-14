export type CompareProduct = "hotels" | "flights";

export type CompareAttribution = {
  allianceid: string;
  SID: string;
  trip_sub3: string;
  trip_sub1: string;
};

export const DEFAULT_COMPARE_ATTRIBUTION: CompareAttribution = {
  allianceid: "6184613",
  SID: "246187838",
  trip_sub3: "D18651047",
  trip_sub1: "",
};

function cleanAttributionValue(value: string | null) {
  return value?.trim().slice(0, 500) || "";
}

export function parseCompareAttribution(search: string): CompareAttribution {
  const params = new URLSearchParams(search);
  const tripSub1 = cleanAttributionValue(params.get("trip_sub1"));
  const gclid = cleanAttributionValue(params.get("gclid"));
  return {
    allianceid: cleanAttributionValue(params.get("Allianceid") || params.get("allianceid")) || DEFAULT_COMPARE_ATTRIBUTION.allianceid,
    SID: cleanAttributionValue(params.get("SID") || params.get("sid")) || DEFAULT_COMPARE_ATTRIBUTION.SID,
    trip_sub3: cleanAttributionValue(params.get("trip_sub3")) || DEFAULT_COMPARE_ATTRIBUTION.trip_sub3,
    trip_sub1: tripSub1 || cleanAttributionValue(gclid ? `jtzjy-${gclid}` : null),
  };
}

export function tripAttributionParams(attribution: CompareAttribution) {
  return {
    allianceid: attribution.allianceid,
    SID: attribution.SID,
    trip_sub3: attribution.trip_sub3,
    ...(attribution.trip_sub1 ? { trip_sub1: attribution.trip_sub1 } : {}),
  };
}

export function buildClickTrackingUrl(product: CompareProduct, attribution: CompareAttribution) {
  const params = new URLSearchParams({
    jtp: "clk2",
    jtadv: product === "hotels" ? "trip_h" : "trip_l",
    jtpub: `gg${attribution.SID}`,
    devid: "",
    cid: attribution.trip_sub1,
    crid: attribution.trip_sub3,
    adgid: attribution.allianceid,
    camid: attribution.trip_sub3,
  });
  return `https://insg.jiatoutrade.com/lzd_pb?${params.toString()}`;
}

/** Measurement endpoint used exclusively by the featured Trip.com campaign carousel. */
export function buildHeroClickTrackingUrl(attribution: CompareAttribution) {
  const encode = (value: string) => encodeURIComponent(value);
  return `https://insg.jiatoutrade.com/lzd_pb?*jtp*=clk&jtadv=trip_j&jtpub=gg${encode(attribution.SID)}&devid=cid=${encode(attribution.trip_sub1)}&crid=${encode(attribution.trip_sub3)}&adgid=${encode(attribution.allianceid)}&camid=${encode(attribution.trip_sub3)}`;
}
