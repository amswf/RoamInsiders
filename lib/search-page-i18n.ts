import { compareCopy, type CompareCopy, type CompareLocale } from "./compare-i18n";

export const searchPageLocales = ["zh-CN", "zh-TW", "th", "ru", "en"] as const;
export type SearchPageLocale = (typeof searchPageLocales)[number];

export const searchPageLocaleLabels: Record<SearchPageLocale, string> = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  th: "ไทย",
  ru: "Русский",
  en: "English",
};

export function normalizeSearchPageLocale(value?: string | null): SearchPageLocale | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase().replace("_", "-");
  if (normalized === "zh-tw" || normalized === "zh-hk" || normalized === "zh-mo" || normalized.startsWith("zh-hant")) return "zh-TW";
  if (normalized === "zh" || normalized === "zh-cn" || normalized === "zh-sg" || normalized.startsWith("zh-hans")) return "zh-CN";
  if (normalized === "th" || normalized.startsWith("th-")) return "th";
  if (normalized === "ru" || normalized.startsWith("ru-")) return "ru";
  if (normalized === "en" || normalized.startsWith("en-")) return "en";
  return null;
}

export function detectSearchPageLocale(languages: readonly string[]): SearchPageLocale {
  for (const language of languages) {
    const locale = normalizeSearchPageLocale(language);
    if (locale) return locale;
  }
  return "en";
}

export type BookingFlowCopy = {
  eyebrow: string;
  title: string;
  summary: string;
  steps: Array<{ title: string; body: string }>;
  details: string[];
};

export type SearchPageExtraCopy = {
  language: string;
  compareProduct: string;
  previousMonth: string;
  nextMonth: string;
  decrease: string;
  increase: string;
  compareFind: {
    noticeLead: string;
    noticeTail: string;
    popularPlaces: string;
    beforeBook: string;
    eyebrow: string;
    desktopTitle: string;
    mobileTitle: string;
    desktopIntro: string;
    mobileIntro: string;
    photoAria: string;
    photoLabel: string;
    stays: string;
    where: string;
    cityAreaProperty: string;
    cityAirport: string;
    travellers: string;
    searchPrices: string;
    noAccount: string;
    destinationError: string;
    airportError: string;
    dateError: string;
    popularDestinations: string;
    popularTitle: string;
    hotSpots: string;
    popularSummary: string;
    checklistEyebrow: string;
    checklistTitle: string;
    checks: Array<{ title: string; body: string }>;
    footerTagline: string;
    disclosure: string;
  };
  travelCompare: {
    header: string;
    carouselLabel: string;
    visitPartner: string;
    showOffer: string;
    pauseCarousel: string;
    resumeCarousel: string;
    slides: Array<{ label: string; title: string; offer?: string }>;
    hotelPlaceholder: string;
    airportPlaceholder: string;
    featuredTitle: string;
    featuredSubtitle: string;
    bookingFlows: Record<"hotels" | "flights", BookingFlowCopy>;
    reviewBeforeBook: string;
    disclosure: string;
  };
};

const en: SearchPageExtraCopy = {
  language: "Language",
  compareProduct: "Compare product", previousMonth: "Previous month", nextMonth: "Next month", decrease: "Decrease", increase: "Increase",
  compareFind: {
    noticeLead: "Compare live options", noticeTail: "Review final details before booking", popularPlaces: "Popular places", beforeBook: "Before you book",
    eyebrow: "STAYS & FLIGHTS", desktopTitle: "Where do you want to go next?", mobileTitle: "Where to next?", desktopIntro: "Enter your destination and dates to compare current options in one simple search.", mobileIntro: "Choose a place and dates to compare current options.",
    photoAria: "Quiet hotel room overlooking green hills", photoLabel: "TOKYO · JAPAN", stays: "Stays", where: "WHERE", cityAreaProperty: "City, area, or property", cityAirport: "City or airport", travellers: "TRAVELLERS",
    searchPrices: "Search current prices", noAccount: "No account needed to start a search.", destinationError: "Enter a destination or property name.", airportError: "Choose a listed city or enter a 3-letter airport code.", dateError: "Your end date must be after your start date.",
    popularDestinations: "POPULAR DESTINATIONS", popularTitle: "Not sure where to start?", hotSpots: "Hot Spots", popularSummary: "Open a city to review current hotel options, then check the final dates and terms before booking.",
    checklistEyebrow: "BEFORE YOU BOOK", checklistTitle: "A quick final check.", checks: [
      { title: "Total price", body: "Review taxes and fees in the final breakdown." },
      { title: "Change rules", body: "Check cancellation or fare conditions for your exact option." },
      { title: "The practical fit", body: "Confirm location, baggage, room type, and arrival time." },
    ],
    footerTagline: "Useful travel decisions, before the payment screen.", disclosure: "We are an independent travel guide and Trip.com partner. If you book through our Trip.com links, we may earn a commission.",
  },
  travelCompare: {
    header: "Curated Global Hotel & Flight Deals", carouselLabel: "Featured hotel and flight offers", visitPartner: "Visit the booking partner homepage", showOffer: "Show offer", pauseCarousel: "Pause carousel", resumeCarousel: "Resume carousel",
    slides: [
      { label: "HOTELS", title: "BRAND HOTEL OFFERS", offer: "UP TO 15% OFF" },
      { label: "FLIGHTS", title: "Don't miss out on the biggest price drops during the 30 days!" },
    ],
    hotelPlaceholder: "City or destination", airportPlaceholder: "City or airport code", featuredTitle: "Popular hotel destinations", featuredSubtitle: "Popular hotel destinations",
    bookingFlows: {
      hotels: { eyebrow: "HOTEL BOOKING, SIMPLIFIED", title: "From destination to check-in", summary: "Carry your stay details into a complete hotel search, then review the information that matters before booking.", steps: [
        { title: "Set your stay", body: "Choose a destination, dates, guests, and rooms." }, { title: "Review available rooms", body: "Compare room types, inclusions, and stay policies." }, { title: "Confirm with clarity", body: "Check the final price and booking terms before payment." },
      ], details: ["Room choices", "Cancellation policies", "Taxes and fees"] },
      flights: { eyebrow: "FLIGHT BOOKING, SIMPLIFIED", title: "From route search to take-off", summary: "Carry your route and dates into a complete flight search, then review the fare details that shape your trip.", steps: [
        { title: "Set your route", body: "Choose departure, destination, and travel dates." }, { title: "Review flight options", body: "Compare schedules, connections, and fare choices." }, { title: "Confirm with clarity", body: "Check baggage, fare rules, and the final price before payment." },
      ], details: ["Flight schedules", "Baggage and fare rules", "Full price breakdown"] },
    },
    reviewBeforeBook: "Review before you book", disclosure: "We are an independent travel guide and Trip.com partner. If you book through our Trip.com links, we may earn a commission.",
  },
};

const zhCN: SearchPageExtraCopy = {
  language: "语言",
  compareProduct: "比较类型", previousMonth: "上个月", nextMonth: "下个月", decrease: "减少", increase: "增加",
  compareFind: {
    noticeLead: "比较实时选择", noticeTail: "预订前请核对最终信息", popularPlaces: "热门目的地", beforeBook: "预订前须知",
    eyebrow: "酒店与机票", desktopTitle: "下一站想去哪里？", mobileTitle: "下一站去哪？", desktopIntro: "输入目的地和日期，一次搜索即可比较当前可用选择。", mobileIntro: "选择目的地和日期，比较当前选择。",
    photoAria: "俯瞰青山的安静酒店客房", photoLabel: "东京 · 日本", stays: "酒店", where: "目的地", cityAreaProperty: "城市、区域或住宿", cityAirport: "城市或机场", travellers: "旅客",
    searchPrices: "搜索当前价格", noAccount: "无需账户即可开始搜索。", destinationError: "请输入目的地或住宿名称。", airportError: "请选择列表中的城市，或输入三字机场代码。", dateError: "结束日期必须晚于开始日期。",
    popularDestinations: "热门目的地", popularTitle: "还没决定去哪里？", hotSpots: "热门目的地", popularSummary: "打开城市查看当前酒店选择，并在预订前核对最终日期与条款。",
    checklistEyebrow: "预订前须知", checklistTitle: "最后快速核对。", checks: [
      { title: "总价", body: "在最终明细中核对税费。" }, { title: "变更规则", body: "查看所选方案的取消或票价条件。" }, { title: "实际是否合适", body: "确认位置、行李、房型和抵达时间。" },
    ],
    footerTagline: "付款前，帮你做出更清楚的旅行决定。", disclosure: "我们是 Trip.com 的独立合作伙伴旅行指南。如果您通过我们的 Trip.com 链接预订，我们可能会获得佣金。",
  },
  travelCompare: {
    header: "精选全球酒店与机票优惠", carouselLabel: "精选酒店与机票优惠", visitPartner: "前往预订合作伙伴首页", showOffer: "显示优惠", pauseCarousel: "暂停轮播", resumeCarousel: "继续轮播",
    slides: [{ label: "酒店", title: "品牌酒店优惠", offer: "最高 85 折" }, { label: "机票", title: "别错过未来 30 天内的大幅降价！" }],
    hotelPlaceholder: "城市或目的地", airportPlaceholder: "城市或机场代码", featuredTitle: "热门酒店目的地", featuredSubtitle: "热门酒店目的地",
    bookingFlows: {
      hotels: { eyebrow: "简化酒店预订", title: "从目的地到入住", summary: "将住宿信息带入完整的酒店搜索，并在预订前核对重要信息。", steps: [
        { title: "设置住宿", body: "选择目的地、日期、住客和房间。" }, { title: "查看可订房型", body: "比较房型、包含项目和住宿政策。" }, { title: "确认细节", body: "付款前核对最终价格和预订条款。" },
      ], details: ["房型选择", "取消政策", "税费"] },
      flights: { eyebrow: "简化机票预订", title: "从航线搜索到起飞", summary: "将航线和日期带入完整的机票搜索，并核对影响行程的票价信息。", steps: [
        { title: "设置航线", body: "选择出发地、目的地和旅行日期。" }, { title: "查看航班选择", body: "比较时刻、中转和票价方案。" }, { title: "确认细节", body: "付款前核对行李、票价规则和最终价格。" },
      ], details: ["航班时刻", "行李与票价规则", "完整价格明细"] },
    },
    reviewBeforeBook: "预订前请核对", disclosure: "我们是 Trip.com 的独立合作伙伴旅行指南。如果您通过我们的 Trip.com 链接预订，我们可能会获得佣金。",
  },
};

const zhTW: SearchPageExtraCopy = {
  language: "語言",
  compareProduct: "比較類型", previousMonth: "上個月", nextMonth: "下個月", decrease: "減少", increase: "增加",
  compareFind: {
    noticeLead: "比較即時選擇", noticeTail: "預訂前請核對最終資訊", popularPlaces: "熱門目的地", beforeBook: "預訂前須知",
    eyebrow: "飯店與機票", desktopTitle: "下一站想去哪裡？", mobileTitle: "下一站去哪？", desktopIntro: "輸入目的地和日期，一次搜尋即可比較目前可用選擇。", mobileIntro: "選擇目的地和日期，比較目前選擇。",
    photoAria: "俯瞰青山的安靜飯店客房", photoLabel: "東京 · 日本", stays: "飯店", where: "目的地", cityAreaProperty: "城市、區域或住宿", cityAirport: "城市或機場", travellers: "旅客",
    searchPrices: "搜尋目前價格", noAccount: "無需帳戶即可開始搜尋。", destinationError: "請輸入目的地或住宿名稱。", airportError: "請選擇列表中的城市，或輸入三碼機場代碼。", dateError: "結束日期必須晚於開始日期。",
    popularDestinations: "熱門目的地", popularTitle: "還沒決定去哪裡？", hotSpots: "熱門目的地", popularSummary: "開啟城市查看目前飯店選擇，並在預訂前核對最終日期與條款。",
    checklistEyebrow: "預訂前須知", checklistTitle: "最後快速核對。", checks: [
      { title: "總價", body: "在最終明細中核對稅費。" }, { title: "變更規則", body: "查看所選方案的取消或票價條件。" }, { title: "實際是否合適", body: "確認位置、行李、房型和抵達時間。" },
    ],
    footerTagline: "付款前，幫你做出更清楚的旅行決定。", disclosure: "我們是 Trip.com 的獨立合作夥伴旅遊指南。如果您透過我們的 Trip.com 連結預訂，我們可能會獲得佣金。",
  },
  travelCompare: {
    header: "精選全球飯店與機票優惠", carouselLabel: "精選飯店與機票優惠", visitPartner: "前往預訂合作夥伴首頁", showOffer: "顯示優惠", pauseCarousel: "暫停輪播", resumeCarousel: "繼續輪播",
    slides: [{ label: "飯店", title: "品牌飯店優惠", offer: "最高 85 折" }, { label: "機票", title: "別錯過未來 30 天內的大幅降價！" }],
    hotelPlaceholder: "城市或目的地", airportPlaceholder: "城市或機場代碼", featuredTitle: "熱門飯店目的地", featuredSubtitle: "熱門飯店目的地",
    bookingFlows: {
      hotels: { eyebrow: "簡化飯店預訂", title: "從目的地到入住", summary: "將住宿資訊帶入完整的飯店搜尋，並在預訂前核對重要資訊。", steps: [
        { title: "設定住宿", body: "選擇目的地、日期、旅客和房間。" }, { title: "查看可訂房型", body: "比較房型、包含項目和住宿政策。" }, { title: "確認細節", body: "付款前核對最終價格和預訂條款。" },
      ], details: ["房型選擇", "取消政策", "稅費"] },
      flights: { eyebrow: "簡化機票預訂", title: "從航線搜尋到起飛", summary: "將航線和日期帶入完整的機票搜尋，並核對影響行程的票價資訊。", steps: [
        { title: "設定航線", body: "選擇出發地、目的地和旅行日期。" }, { title: "查看航班選擇", body: "比較時刻、中轉和票價方案。" }, { title: "確認細節", body: "付款前核對行李、票價規則和最終價格。" },
      ], details: ["航班時刻", "行李與票價規則", "完整價格明細"] },
    },
    reviewBeforeBook: "預訂前請核對", disclosure: "我們是 Trip.com 的獨立合作夥伴旅遊指南。如果您透過我們的 Trip.com 連結預訂，我們可能會獲得佣金。",
  },
};

const th: SearchPageExtraCopy = {
  language: "ภาษา",
  compareProduct: "ประเภทการเปรียบเทียบ", previousMonth: "เดือนก่อน", nextMonth: "เดือนถัดไป", decrease: "ลด", increase: "เพิ่ม",
  compareFind: {
    noticeLead: "เปรียบเทียบตัวเลือกแบบเรียลไทม์", noticeTail: "ตรวจสอบรายละเอียดสุดท้ายก่อนจอง", popularPlaces: "จุดหมายยอดนิยม", beforeBook: "ก่อนจอง",
    eyebrow: "ที่พักและเที่ยวบิน", desktopTitle: "จุดหมายต่อไปของคุณคือที่ไหน?", mobileTitle: "ไปไหนดี?", desktopIntro: "กรอกจุดหมายและวันที่เพื่อเปรียบเทียบตัวเลือกปัจจุบันด้วยการค้นหาเดียว", mobileIntro: "เลือกจุดหมายและวันที่เพื่อเปรียบเทียบตัวเลือก",
    photoAria: "ห้องพักเงียบสงบที่มองเห็นเนินเขาสีเขียว", photoLabel: "โตเกียว · ญี่ปุ่น", stays: "ที่พัก", where: "จุดหมาย", cityAreaProperty: "เมือง ย่าน หรือที่พัก", cityAirport: "เมืองหรือสนามบิน", travellers: "ผู้เดินทาง",
    searchPrices: "ค้นหาราคาปัจจุบัน", noAccount: "เริ่มค้นหาได้โดยไม่ต้องมีบัญชี", destinationError: "กรอกจุดหมายหรือชื่อที่พัก", airportError: "เลือกเมืองจากรายการหรือกรอกรหัสสนามบิน 3 ตัวอักษร", dateError: "วันที่สิ้นสุดต้องอยู่หลังวันที่เริ่มต้น",
    popularDestinations: "จุดหมายยอดนิยม", popularTitle: "ยังไม่แน่ใจว่าจะไปไหนดี?", hotSpots: "จุดหมายยอดนิยม", popularSummary: "เปิดเมืองเพื่อดูตัวเลือกโรงแรมปัจจุบัน แล้วตรวจสอบวันที่และเงื่อนไขสุดท้ายก่อนจอง",
    checklistEyebrow: "ก่อนจอง", checklistTitle: "ตรวจสอบครั้งสุดท้ายอย่างรวดเร็ว", checks: [
      { title: "ราคารวม", body: "ตรวจสอบภาษีและค่าธรรมเนียมในรายละเอียดสุดท้าย" }, { title: "เงื่อนไขการเปลี่ยนแปลง", body: "ตรวจสอบเงื่อนไขการยกเลิกหรือค่าโดยสารของตัวเลือกของคุณ" }, { title: "ความเหมาะสม", body: "ยืนยันทำเล สัมภาระ ประเภทห้อง และเวลาที่มาถึง" },
    ],
    footerTagline: "ช่วยให้ตัดสินใจเรื่องการเดินทางได้ชัดเจนก่อนชำระเงิน", disclosure: "เราเป็นคู่มือท่องเที่ยวอิสระและพาร์ทเนอร์ของ Trip.com หากคุณจองผ่านลิงก์ Trip.com ของเรา เราอาจได้รับค่าคอมมิชชัน",
  },
  travelCompare: {
    header: "ดีลโรงแรมและเที่ยวบินทั่วโลกที่คัดสรรแล้ว", carouselLabel: "ข้อเสนอโรงแรมและเที่ยวบินแนะนำ", visitPartner: "ไปยังหน้าแรกของพาร์ทเนอร์การจอง", showOffer: "แสดงข้อเสนอ", pauseCarousel: "หยุดภาพสไลด์", resumeCarousel: "เล่นภาพสไลด์ต่อ",
    slides: [{ label: "โรงแรม", title: "ข้อเสนอโรงแรมแบรนด์ดัง", offer: "ลดสูงสุด 15%" }, { label: "เที่ยวบิน", title: "อย่าพลาดราคาที่ลดลงมากที่สุดในช่วง 30 วัน!" }],
    hotelPlaceholder: "เมืองหรือจุดหมาย", airportPlaceholder: "เมืองหรือรหัสสนามบิน", featuredTitle: "จุดหมายโรงแรมยอดนิยม", featuredSubtitle: "จุดหมายโรงแรมยอดนิยม",
    bookingFlows: {
      hotels: { eyebrow: "จองโรงแรมได้ง่ายขึ้น", title: "จากจุดหมายถึงวันเช็กอิน", summary: "ส่งรายละเอียดที่พักไปยังการค้นหาโรงแรมแบบครบถ้วน แล้วตรวจสอบข้อมูลสำคัญก่อนจอง", steps: [
        { title: "กำหนดการเข้าพัก", body: "เลือกจุดหมาย วันที่ ผู้เข้าพัก และจำนวนห้อง" }, { title: "ดูห้องที่ว่าง", body: "เปรียบเทียบประเภทห้อง สิ่งที่รวม และนโยบายการเข้าพัก" }, { title: "ยืนยันให้ชัดเจน", body: "ตรวจสอบราคาสุดท้ายและเงื่อนไขก่อนชำระเงิน" },
      ], details: ["ตัวเลือกห้อง", "นโยบายการยกเลิก", "ภาษีและค่าธรรมเนียม"] },
      flights: { eyebrow: "จองเที่ยวบินได้ง่ายขึ้น", title: "จากค้นหาเส้นทางถึงขึ้นบิน", summary: "ส่งเส้นทางและวันที่ไปยังการค้นหาเที่ยวบิน แล้วตรวจสอบรายละเอียดค่าโดยสารที่มีผลต่อการเดินทาง", steps: [
        { title: "กำหนดเส้นทาง", body: "เลือกต้นทาง จุดหมาย และวันที่เดินทาง" }, { title: "ดูตัวเลือกเที่ยวบิน", body: "เปรียบเทียบเวลา จุดแวะพัก และค่าโดยสาร" }, { title: "ยืนยันให้ชัดเจน", body: "ตรวจสอบสัมภาระ กฎค่าโดยสาร และราคาสุดท้ายก่อนชำระเงิน" },
      ], details: ["ตารางเที่ยวบิน", "กฎสัมภาระและค่าโดยสาร", "รายละเอียดราคาทั้งหมด"] },
    },
    reviewBeforeBook: "ตรวจสอบก่อนจอง", disclosure: "เราเป็นคู่มือท่องเที่ยวอิสระและพาร์ทเนอร์ของ Trip.com หากคุณจองผ่านลิงก์ Trip.com ของเรา เราอาจได้รับค่าคอมมิชชัน",
  },
};

const ru: SearchPageExtraCopy = {
  language: "Язык",
  compareProduct: "Тип поиска", previousMonth: "Предыдущий месяц", nextMonth: "Следующий месяц", decrease: "Уменьшить", increase: "Увеличить",
  compareFind: {
    noticeLead: "Сравните актуальные варианты", noticeTail: "Проверьте детали перед бронированием", popularPlaces: "Популярные направления", beforeBook: "Перед бронированием",
    eyebrow: "ОТЕЛИ И АВИАБИЛЕТЫ", desktopTitle: "Куда отправимся дальше?", mobileTitle: "Куда дальше?", desktopIntro: "Укажите направление и даты, чтобы сравнить актуальные варианты одним поиском.", mobileIntro: "Выберите направление и даты, чтобы сравнить варианты.",
    photoAria: "Тихий гостиничный номер с видом на зелёные холмы", photoLabel: "ТОКИО · ЯПОНИЯ", stays: "Отели", where: "КУДА", cityAreaProperty: "Город, район или объект", cityAirport: "Город или аэропорт", travellers: "ПУТЕШЕСТВЕННИКИ",
    searchPrices: "Найти актуальные цены", noAccount: "Для начала поиска аккаунт не нужен.", destinationError: "Введите направление или название объекта.", airportError: "Выберите город из списка или введите трёхбуквенный код аэропорта.", dateError: "Дата окончания должна быть позже даты начала.",
    popularDestinations: "ПОПУЛЯРНЫЕ НАПРАВЛЕНИЯ", popularTitle: "Не знаете, с чего начать?", hotSpots: "Популярные места", popularSummary: "Откройте город, чтобы посмотреть варианты отелей, затем проверьте даты и условия перед бронированием.",
    checklistEyebrow: "ПЕРЕД БРОНИРОВАНИЕМ", checklistTitle: "Быстрая финальная проверка.", checks: [
      { title: "Итоговая цена", body: "Проверьте налоги и сборы в итоговой детализации." }, { title: "Условия изменений", body: "Проверьте правила отмены или условия тарифа выбранного варианта." }, { title: "Практические детали", body: "Уточните расположение, багаж, тип номера и время прибытия." },
    ],
    footerTagline: "Полезные решения о путешествии до перехода к оплате.", disclosure: "Мы — независимый путеводитель и партнёр Trip.com. Если вы бронируете по нашим ссылкам Trip.com, мы можем получить комиссию.",
  },
  travelCompare: {
    header: "Отобранные предложения отелей и авиабилетов", carouselLabel: "Рекомендуемые предложения отелей и авиабилетов", visitPartner: "Перейти на сайт партнёра по бронированию", showOffer: "Показать предложение", pauseCarousel: "Остановить карусель", resumeCarousel: "Запустить карусель",
    slides: [{ label: "ОТЕЛИ", title: "ПРЕДЛОЖЕНИЯ СЕТЕВЫХ ОТЕЛЕЙ", offer: "СКИДКА ДО 15%" }, { label: "АВИАБИЛЕТЫ", title: "Не пропустите самые заметные снижения цен за 30 дней!" }],
    hotelPlaceholder: "Город или направление", airportPlaceholder: "Город или код аэропорта", featuredTitle: "Популярные направления для отелей", featuredSubtitle: "Популярные направления для отелей",
    bookingFlows: {
      hotels: { eyebrow: "ПРОСТОЕ БРОНИРОВАНИЕ ОТЕЛЯ", title: "От направления до заезда", summary: "Перенесите параметры проживания в полный поиск отелей и проверьте важную информацию перед бронированием.", steps: [
        { title: "Задайте проживание", body: "Выберите направление, даты, гостей и номера." }, { title: "Посмотрите доступные номера", body: "Сравните категории номеров, включённые услуги и правила проживания." }, { title: "Подтвердите детали", body: "Проверьте итоговую цену и условия до оплаты." },
      ], details: ["Категории номеров", "Правила отмены", "Налоги и сборы"] },
      flights: { eyebrow: "ПРОСТОЕ БРОНИРОВАНИЕ ПЕРЕЛЁТА", title: "От поиска маршрута до вылета", summary: "Перенесите маршрут и даты в полный поиск рейсов и проверьте детали тарифа, которые влияют на поездку.", steps: [
        { title: "Задайте маршрут", body: "Выберите пункт вылета, направление и даты." }, { title: "Посмотрите варианты", body: "Сравните расписание, пересадки и тарифы." }, { title: "Подтвердите детали", body: "Проверьте багаж, правила тарифа и итоговую цену до оплаты." },
      ], details: ["Расписание рейсов", "Багаж и правила тарифа", "Полная детализация цены"] },
    },
    reviewBeforeBook: "Проверьте перед бронированием", disclosure: "Мы — независимый путеводитель и партнёр Trip.com. Если вы бронируете по нашим ссылкам Trip.com, мы можем получить комиссию.",
  },
};

export const searchPageExtraCopy: Record<SearchPageLocale, SearchPageExtraCopy> = { en, "zh-CN": zhCN, "zh-TW": zhTW, th, ru };

export function getSearchPageCopy(locale: SearchPageLocale): { common: CompareCopy; extra: SearchPageExtraCopy } {
  return { common: compareCopy[locale as CompareLocale], extra: searchPageExtraCopy[locale] };
}

function russianCount(value: number, one: string, few: string, many: string) {
  const mod100 = value % 100;
  const mod10 = value % 10;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

export function formatGuestsRooms(locale: SearchPageLocale, adults: number, rooms: number, t: CompareCopy) {
  if (locale === "ru") return `${adults} ${russianCount(adults, "взрослый", "взрослых", "взрослых")} · ${rooms} ${russianCount(rooms, "номер", "номера", "номеров")}`;
  return `${adults} ${adults === 1 ? t.adult : t.adults} · ${rooms} ${rooms === 1 ? t.room : t.rooms}`;
}
