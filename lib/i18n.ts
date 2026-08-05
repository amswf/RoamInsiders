import type { ContentType, Locale } from "./content";

export const localeOptions: Array<{ code: Locale; label: string }> = [
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "en", label: "English" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "th", label: "ไทย" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ms", label: "Bahasa Melayu" },
  { code: "fil", label: "Filipino" },
  { code: "km", label: "ខ្មែរ" },
  { code: "lo", label: "ລາວ" },
  { code: "my", label: "မြန်မာ" },
];

type Copy = {
  discover: string; routes: string; deals: string; about: string; admin: string;
  feedEyebrow: string; feedTitle: string; feedIntro: string; all: string;
  route: string; deal: string; coupon: string; guide: string; read: string;
  latest: string; bookingVia: string; back: string; duration: string;
  season: string; budget: string; couponCode: string; terms: string;
  disclosure: string; fallback: string; openTrip: string; openTraveloka: string;
  openCustom: string; footer: string; editorial: string; exploreAll: string;
  guidesTitle: string; guidesIntro: string; aboutTitle: string; aboutLead: string;
  aboutBody: string; language: string;
  sources: string; verifiedOn: string;
};

const en: Copy = {
  discover: "Discover", routes: "Routes", deals: "Deals", about: "About", admin: "Content studio",
  feedEyebrow: "THE ASIA TRAVEL EDIT", feedTitle: "Read what is worth the trip. Then decide what to book.",
  feedIntro: "A practical stream of routes, hotel ideas and promotion notes for travelling across Asia with less noise.",
  all: "All", route: "Routes", deal: "Deals", coupon: "Coupons", guide: "Guides", read: "Read story",
  latest: "Updated weekly", bookingVia: "Book with", back: "Back to the feed", duration: "Time",
  season: "Best season", budget: "Budget", couponCode: "Code", terms: "Check current terms",
  disclosure: "Prices, availability and promotion rules can change. Confirm the latest terms on the booking platform before paying.",
  fallback: "This story is currently shown in English while its translation is being prepared.",
  openTrip: "Check options on Trip.com", openTraveloka: "Check options on Traveloka", openCustom: "Open booking page",
  footer: "Useful travel stories, followed by a clear next step.", editorial: "Independent travel editorial",
  exploreAll: "Explore all stories", guidesTitle: "Every story, one stream.",
  guidesIntro: "Routes, deals, coupon notes and booking guides for Asia.",
  aboutTitle: "Travel advice should reduce hesitation, not add tabs.",
  aboutLead: "TravelGoGuide connects useful editorial content with the moment you are ready to act.",
  aboutBody: "We publish practical routes and promotion notes, explain the important limits, then offer one clear link to the relevant booking platform.",
  language: "Language", sources: "Sources", verifiedOn: "Facts checked",
};

export const copy: Record<Locale, Copy> = {
  "zh-CN": {
    discover: "发现", routes: "路线", deals: "优惠", about: "关于", admin: "内容后台",
    feedEyebrow: "亚洲旅行内容流", feedTitle: "先看什么值得出发，再决定订什么。",
    feedIntro: "路线、酒店灵感和优惠说明，持续更新。少一点信息噪音，多一个清楚的下一步。",
    all: "全部", route: "路线", deal: "优惠", coupon: "优惠券", guide: "指南", read: "打开内容",
    latest: "每周更新", bookingVia: "预订平台", back: "返回内容流", duration: "建议时间",
    season: "适合季节", budget: "预算参考", couponCode: "优惠码", terms: "查看最新规则",
    disclosure: "价格、库存和活动规则可能变化，付款前请以预订平台显示的最新信息为准。",
    fallback: "这篇内容的当前语言版本正在准备中，暂时显示英文原文。",
    openTrip: "在 Trip.com 查看选择", openTraveloka: "在 Traveloka 查看选择", openCustom: "打开预订页面",
    footer: "有用的旅行内容，以及一个清楚的下一步。", editorial: "独立旅行内容平台",
    exploreAll: "查看全部内容", guidesTitle: "所有内容，一条流里看完。",
    guidesIntro: "汇集亚洲路线、优惠、优惠券说明与预订指南。",
    aboutTitle: "好的旅行建议，应该减少犹豫，不是增加标签页。",
    aboutLead: "TravelGoGuide 把有用的旅行内容，和你准备行动的那一刻连在一起。",
    aboutBody: "我们发布实用路线和优惠说明，说清限制与注意事项，再给出一个前往对应预订平台的明确入口。",
    language: "语言", sources: "资料来源", verifiedOn: "信息核验",
  },
  "zh-TW": {
    discover: "探索", routes: "路線", deals: "優惠", about: "關於", admin: "內容後台",
    feedEyebrow: "亞洲旅行內容流", feedTitle: "先看什麼值得出發，再決定訂什麼。",
    feedIntro: "路線、住宿靈感與優惠說明持續更新。少一點資訊噪音，多一個清楚的下一步。",
    all: "全部", route: "路線", deal: "優惠", coupon: "優惠券", guide: "指南", read: "打開內容",
    latest: "每週更新", bookingVia: "預訂平台", back: "返回內容流", duration: "建議時間",
    season: "適合季節", budget: "預算參考", couponCode: "優惠碼", terms: "查看最新規則",
    disclosure: "價格、庫存與活動規則可能改變，付款前請以預訂平台的最新資訊為準。",
    fallback: "這篇內容的翻譯正在準備中，目前暫時顯示英文版本。",
    openTrip: "在 Trip.com 查看選擇", openTraveloka: "在 Traveloka 查看選擇", openCustom: "打開預訂頁面",
    footer: "有用的旅行內容，以及一個清楚的下一步。", editorial: "獨立旅行內容平台",
    exploreAll: "查看全部內容", guidesTitle: "所有內容，一條流裡看完。", guidesIntro: "亞洲路線、優惠與預訂指南。",
    aboutTitle: "好的旅行建議，應該減少猶豫，而不是增加分頁。", aboutLead: "TravelGoGuide 把有用內容和行動連在一起。",
    aboutBody: "我們說清路線、優惠與限制，再提供一個前往預訂平台的明確入口。", language: "語言", sources: "資料來源", verifiedOn: "資訊核驗",
  },
  en,
  id: {
    discover: "Jelajah", routes: "Rute", deals: "Promo", about: "Tentang", admin: "Studio konten",
    feedEyebrow: "PILIHAN PERJALANAN ASIA", feedTitle: "Baca yang layak dikunjungi. Lalu putuskan apa yang dipesan.",
    feedIntro: "Aliran praktis berisi rute, ide hotel, dan catatan promo untuk perjalanan Asia yang lebih tenang.",
    all: "Semua", route: "Rute", deal: "Promo", coupon: "Kupon", guide: "Panduan", read: "Baca artikel",
    latest: "Diperbarui mingguan", bookingVia: "Pesan melalui", back: "Kembali ke aliran", duration: "Waktu",
    season: "Musim terbaik", budget: "Anggaran", couponCode: "Kode", terms: "Lihat syarat terbaru",
    disclosure: "Harga, ketersediaan, dan aturan promo dapat berubah. Periksa syarat terbaru sebelum membayar.",
    fallback: "Artikel ini sementara ditampilkan dalam bahasa Inggris.", openTrip: "Lihat pilihan di Trip.com",
    openTraveloka: "Lihat pilihan di Traveloka", openCustom: "Buka halaman pemesanan", footer: "Cerita perjalanan yang berguna, dengan langkah berikutnya yang jelas.",
    editorial: "Editorial perjalanan independen", exploreAll: "Jelajahi semua artikel", guidesTitle: "Semua cerita dalam satu aliran.",
    guidesIntro: "Rute, promo, kupon, dan panduan pemesanan untuk Asia.", aboutTitle: "Saran perjalanan harus mengurangi keraguan, bukan menambah tab.",
    aboutLead: "TravelGoGuide menghubungkan konten berguna dengan saat Anda siap bertindak.", aboutBody: "Kami menjelaskan rute, promo, dan batasannya, lalu memberi satu tautan pemesanan yang jelas.", language: "Bahasa", sources: "Sumber", verifiedOn: "Fakta diperiksa",
  },
  th: { ...en, discover: "ค้นพบ", routes: "เส้นทาง", deals: "โปรโมชัน", about: "เกี่ยวกับ", admin: "จัดการเนื้อหา", all: "ทั้งหมด", route: "เส้นทาง", deal: "โปรโมชัน", coupon: "คูปอง", guide: "คู่มือ", read: "อ่านเรื่อง", language: "ภาษา", back: "กลับสู่ฟีด", openTrip: "ดูตัวเลือกบน Trip.com", openTraveloka: "ดูตัวเลือกบน Traveloka" },
  vi: { ...en, discover: "Khám phá", routes: "Lịch trình", deals: "Ưu đãi", about: "Giới thiệu", admin: "Quản lý nội dung", all: "Tất cả", route: "Lịch trình", deal: "Ưu đãi", coupon: "Mã giảm giá", guide: "Cẩm nang", read: "Đọc bài", language: "Ngôn ngữ", back: "Quay lại dòng nội dung", openTrip: "Xem lựa chọn trên Trip.com", openTraveloka: "Xem lựa chọn trên Traveloka" },
  ms: { ...en, discover: "Teroka", routes: "Laluan", deals: "Tawaran", about: "Tentang", admin: "Studio kandungan", all: "Semua", route: "Laluan", deal: "Tawaran", coupon: "Kupon", guide: "Panduan", read: "Baca cerita", language: "Bahasa", back: "Kembali ke aliran", openTrip: "Lihat pilihan di Trip.com", openTraveloka: "Lihat pilihan di Traveloka" },
  fil: { ...en, discover: "Tuklasin", routes: "Ruta", deals: "Deal", about: "Tungkol", admin: "Content studio", all: "Lahat", route: "Mga ruta", deal: "Mga deal", coupon: "Mga kupon", guide: "Gabay", read: "Basahin", language: "Wika", back: "Bumalik sa feed", openTrip: "Tingnan sa Trip.com", openTraveloka: "Tingnan sa Traveloka" },
  km: { ...en, discover: "ស្វែងរក", routes: "ផ្លូវធ្វើដំណើរ", deals: "ប្រូម៉ូសិន", about: "អំពី", admin: "គ្រប់គ្រងមាតិកា", all: "ទាំងអស់", route: "ផ្លូវធ្វើដំណើរ", deal: "ប្រូម៉ូសិន", coupon: "គូប៉ុង", guide: "មគ្គុទ្ទេសក៍", read: "អាន", language: "ភាសា", back: "ត្រឡប់ទៅមាតិកា" },
  lo: { ...en, discover: "ຄົ້ນພົບ", routes: "ເສັ້ນທາງ", deals: "ໂປຣໂມຊັນ", about: "ກ່ຽວກັບ", admin: "ຈັດການເນື້ອຫາ", all: "ທັງໝົດ", route: "ເສັ້ນທາງ", deal: "ໂປຣໂມຊັນ", coupon: "ຄູປອງ", guide: "ຄູ່ມື", read: "ອ່ານ", language: "ພາສາ", back: "ກັບໄປຫາເນື້ອຫາ" },
  my: { ...en, discover: "ရှာဖွေမည်", routes: "ခရီးစဉ်များ", deals: "အထူးအစီအစဉ်", about: "အကြောင်း", admin: "အကြောင်းအရာစီမံရန်", all: "အားလုံး", route: "ခရီးစဉ်", deal: "အထူးအစီအစဉ်", coupon: "ကူပွန်", guide: "လမ်းညွှန်", read: "ဖတ်ရန်", language: "ဘာသာစကား", back: "အကြောင်းအရာသို့ ပြန်သွားရန်" },
};

export function contentTypeLabel(locale: Locale, type: ContentType) {
  return copy[locale][type];
}

export function withLocale(path: string, locale: Locale) {
  return `${path}${path.includes("?") ? "&" : "?"}lang=${locale}`;
}
