"use client";

import { useState } from "react";
import type { GuidePost, LocalizedPost, Locale } from "@/lib/content";
import { safeExternalUrl } from "@/lib/content";

type AirportRow = [string, string, string, string, number, number];

const airportBySlug: Record<string, string> = {
  "bali-slow-five-days": "DPS",
  "busan-coast-three-days-2026": "PUS",
  "chiang-mai-slow-city": "CNX",
  "da-nang-four-nights-split-2026": "DAD",
  "fukuoka-kanmon-fireworks-2026": "FUK",
  "hanoi-national-day-2026": "HAN",
  "hong-kong-asia-plus-ticket-choice-2026": "HKG",
  "japan-obon-shinkansen-2026": "TYO",
  "koenji-awa-odori-2026": "TYO",
  "kyoto-first-morning": "KIX",
  "mount-fuji-yoshida-september-2026": "TYO",
  "nha-trang-island-day-2026": "CXR",
  "putrajaya-national-day-stay-or-fly-2026": "KUL",
  "seoul-chuseok-stay-put-2026": "SEL",
  "singapore-national-day-weekend-2026": "SIN",
  "singapore-rainforest-wild-adventure-2026": "SIN",
  "singapore-weekend-stays": "SIN",
  "taipei-drill-fireworks-2026": "TPE",
  "traveloka-coupon-checklist": "SIN",
};

const labels: Record<Locale, { title: string; note: string; hotel: string; flight: string; ticket: string; locating: string }> = {
  "zh-CN": { title: "开始安排这趟旅程", note: "酒店与机票将带入当前目的地；机票会请求位置权限以识别附近出发机场。", hotel: "订酒店", flight: "订机票", ticket: "买门票", locating: "正在识别出发机场…" },
  "zh-TW": { title: "開始安排這趟旅程", note: "飯店與機票會帶入目前目的地；機票會要求位置權限以辨識附近出發機場。", hotel: "訂飯店", flight: "訂機票", ticket: "買門票", locating: "正在辨識出發機場…" },
  en: { title: "Plan this trip", note: "Hotel and flight searches use this destination. Flight search asks for your location to find a nearby departure airport.", hotel: "Book a hotel", flight: "Book flights", ticket: "Buy tickets", locating: "Finding your departure airport…" },
  id: { title: "Rencanakan perjalanan ini", note: "Pencarian hotel dan penerbangan memakai tujuan ini. Penerbangan meminta lokasi untuk mencari bandara keberangkatan terdekat.", hotel: "Pesan hotel", flight: "Pesan penerbangan", ticket: "Beli tiket", locating: "Mencari bandara keberangkatan…" },
  th: { title: "วางแผนทริปนี้", note: "การค้นหาโรงแรมและเที่ยวบินใช้จุดหมายนี้ และจะขอสิทธิ์ตำแหน่งเพื่อหาสนามบินต้นทางใกล้คุณ", hotel: "จองโรงแรม", flight: "จองเที่ยวบิน", ticket: "ซื้อตั๋ว", locating: "กำลังค้นหาสนามบินต้นทาง…" },
  vi: { title: "Lên kế hoạch cho chuyến đi", note: "Tìm khách sạn và chuyến bay theo điểm đến này. Chuyến bay sẽ hỏi vị trí để tìm sân bay khởi hành gần bạn.", hotel: "Đặt khách sạn", flight: "Đặt chuyến bay", ticket: "Mua vé", locating: "Đang tìm sân bay khởi hành…" },
  ms: { title: "Rancang perjalanan ini", note: "Carian hotel dan penerbangan menggunakan destinasi ini. Carian penerbangan meminta lokasi untuk mencari lapangan terbang berlepas terdekat.", hotel: "Tempah hotel", flight: "Tempah penerbangan", ticket: "Beli tiket", locating: "Mencari lapangan terbang berlepas…" },
  fil: { title: "Planuhin ang biyahe", note: "Gagamitin ang destinasyong ito sa hotel at flight search. Hihingi ng lokasyon ang flight search upang mahanap ang malapit na departure airport.", hotel: "Mag-book ng hotel", flight: "Mag-book ng flight", ticket: "Bumili ng ticket", locating: "Hinahanap ang departure airport…" },
  km: { title: "រៀបចំដំណើរកម្សាន្តនេះ", note: "ការស្វែងរកសណ្ឋាគារ និងជើងហោះហើរ ប្រើគោលដៅនេះ។ ជើងហោះហើរនឹងស្នើទីតាំង ដើម្បីរកព្រលានចេញដំណើរដែលនៅជិត។", hotel: "កក់សណ្ឋាគារ", flight: "កក់ជើងហោះហើរ", ticket: "ទិញសំបុត្រ", locating: "កំពុងរកព្រលានចេញដំណើរ…" },
  lo: { title: "ວາງແຜນທ່ຽວນີ້", note: "ການຄົ້ນຫາໂຮງແຮມ ແລະ ຖ້ຽວບິນໃຊ້ປາຍທາງນີ້. ຖ້ຽວບິນຈະຂໍຕຳແໜ່ງເພື່ອຫາສະໜາມບິນຕົ້ນທາງໃກ້ສຸດ.", hotel: "ຈອງໂຮງແຮມ", flight: "ຈອງຖ້ຽວບິນ", ticket: "ຊື້ປີ້", locating: "ກຳລັງຫາສະໜາມບິນຕົ້ນທາງ…" },
  my: { title: "ဒီခရီးစဉ်ကို စီစဉ်ပါ", note: "ဟိုတယ်နှင့် လေယာဉ်ရှာဖွေမှုတွင် ဤခရီးဆုံးကို သုံးပါသည်။ အနီးဆုံးထွက်ခွာလေဆိပ်ကို ရှာရန် တည်နေရာခွင့်ပြုချက် တောင်းပါမည်။", hotel: "ဟိုတယ်ဘွတ်ကင်", flight: "လေယာဉ်ဘွတ်ကင်", ticket: "လက်မှတ်ဝယ်ရန်", locating: "ထွက်ခွာလေဆိပ် ရှာနေသည်…" },
};

function dateAfter(days: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function nearestAirport(airports: AirportRow[], latitude: number, longitude: number) {
  const radians = Math.PI / 180;
  return airports.reduce<AirportRow | null>((closest, airport) => {
    if (!closest) return airport;
    const distance = (candidate: AirportRow) => {
      const lat = (candidate[4] - latitude) * radians;
      const lng = (candidate[5] - longitude) * radians;
      const a = Math.sin(lat / 2) ** 2 + Math.cos(latitude * radians) * Math.cos(candidate[4] * radians) * Math.sin(lng / 2) ** 2;
      return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };
    return distance(airport) < distance(closest) ? airport : closest;
  }, null);
}

function hotelUrl(destination: string) {
  return `https://www.trip.com/hotels/list?${new URLSearchParams({ destName: destination, checkin: dateAfter(30), checkout: dateAfter(33), adult: "2", crn: "1", curr: "USD" })}`;
}

function flightUrl(origin: string, destination: string) {
  return `https://www.trip.com/flights/showfarefirst?${new URLSearchParams({ triptype: "rt", class: "y", quantity: "1", acity: origin, dcity: destination, ddate: dateAfter(30), rdate: dateAfter(33), curr: "USD" })}`;
}

export function ArticleBookingActions({ locale, post, localized }: { locale: Locale; post: GuidePost; localized: LocalizedPost }) {
  const [locating, setLocating] = useState(false);
  const copy = labels[locale];
  const english = post.locales.en;
  const destination = english?.destination || localized.destination;
  const destinationAirport = localized.airportCode || english?.airportCode || airportBySlug[post.slug] || "";
  const configuredTicketUrl = localized.ticketUrl || english?.ticketUrl || (localized.ctaPlatform === "custom" ? localized.ctaUrl : "");
  const ticketUrl = safeExternalUrl(configuredTicketUrl || `https://www.trip.com/things-to-do/?${new URLSearchParams({ searchWord: destination })}`);

  function openFlightSearch() {
    if (locating) return;
    const fallback = () => window.location.assign(destinationAirport ? flightUrl("", destinationAirport) : "https://www.trip.com/flights/");
    if (!navigator.geolocation || !destinationAirport) {
      fallback();
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch("/data/airports.json", { cache: "force-cache" });
          const payload = await response.json() as { airports: AirportRow[] };
          const origin = nearestAirport(payload.airports, coords.latitude, coords.longitude);
          window.location.assign(flightUrl(origin?.[0] || "", destinationAirport));
        } catch {
          fallback();
        }
      },
      fallback,
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 8000 },
    );
  }

  return (
    <section className="article-actions" aria-label={copy.title}>
      <div className="article-actions-copy"><span>TRAVELGO / NEXT STEP</span><h2>{copy.title}</h2><p>{copy.note}</p></div>
      <div className="article-actions-links">
        <a href={hotelUrl(destination)} target="_blank" rel="noopener noreferrer"><small>01</small><span>{copy.hotel}</span><b>↗</b></a>
        <button type="button" onClick={openFlightSearch} disabled={locating}><small>02</small><span>{locating ? copy.locating : copy.flight}</span><b>↗</b></button>
        <a href={ticketUrl} target="_blank" rel="noopener noreferrer"><small>03</small><span>{copy.ticket}</span><b>↗</b></a>
      </div>
    </section>
  );
}
