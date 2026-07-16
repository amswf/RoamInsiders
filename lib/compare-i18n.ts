import type { Locale } from "./content";

export type CompareCopy = {
  oneSearch: string;
  titleTop: string;
  titleBottom: string;
  subtitle: string;
  hotels: string;
  flights: string;
  destination: string;
  from: string;
  to: string;
  checkIn: string;
  checkOut: string;
  departure: string;
  returnDate: string;
  guestsRooms: string;
  adult: string;
  adults: string;
  room: string;
  rooms: string;
  comparePrices: string;
  findingDeals: string;
  noBookingFees: string;
  secureBooking: string;
  transparentPrices: string;
  bestPrices: string;
  bestPricesBody: string;
  trustedSecure: string;
  trustedSecureBody: string;
  noHiddenFees: string;
  noHiddenFeesBody: string;
  instantResults: string;
  instantResultsBody: string;
  partners: string;
  privacyNote: string;
  privacy: string;
  terms: string;
  searchDestinations: string;
  whereStay: string;
  whereFrom: string;
  whereTo: string;
  cityAirport: string;
  noDestinations: string;
  selectDates: string;
  selectingCheckout: string;
  whenTravel: string;
  select: string;
  chooseRange: string;
  night: string;
  nights: string;
  cancel: string;
  confirm: string;
  whoTravels: string;
  adultHint: string;
  roomHint: string;
  explore: string;
  travelStories: string;
  allGuides: string;
  aboutUs: string;
  afterStart: string;
};

export const compareLocaleLabels: Record<Locale, string> = {
  "zh-CN": "简中",
  "zh-TW": "繁中",
  en: "EN",
  id: "ID",
  th: "TH",
  vi: "VI",
  ms: "MS",
  fil: "FIL",
  km: "KM",
  lo: "LO",
  my: "MY",
};

const en: CompareCopy = {
  oneSearch: "ONE SEARCH · TRUSTED TRAVEL PARTNERS",
  titleTop: "Find the Best",
  titleBottom: "Travel Deals",
  subtitle: "Compare prices from trusted travel partners in seconds.",
  hotels: "Hotels", flights: "Flights", destination: "Destination", from: "From", to: "To",
  checkIn: "Check-in", checkOut: "Check-out", departure: "Departure", returnDate: "Return",
  guestsRooms: "Guests & Rooms", adult: "Adult", adults: "Adults", room: "Room", rooms: "Rooms",
  comparePrices: "Compare Prices", findingDeals: "Finding Best Deals...",
  noBookingFees: "No booking fees", secureBooking: "Secure booking", transparentPrices: "Transparent prices",
  bestPrices: "Best Prices", bestPricesBody: "Compare available deals in one simple search.",
  trustedSecure: "Trusted & Secure", trustedSecureBody: "Continue your booking with an established partner.",
  noHiddenFees: "No Hidden Fees", noHiddenFeesBody: "Review the full price and terms before paying.",
  instantResults: "Instant Results", instantResultsBody: "Your search details travel with you.",
  partners: "Search powered by leading travel partners",
  privacyNote: "We respect your privacy. Your search is protected.", privacy: "Privacy Policy", terms: "Terms of Service",
  searchDestinations: "Search destinations", whereStay: "Where do you want to stay?", whereFrom: "Where are you flying from?", whereTo: "Where are you flying to?",
  cityAirport: "City or airport code", noDestinations: "No destinations found. Try another city.",
  selectDates: "Select dates", selectingCheckout: "Selecting check-out", whenTravel: "When are you travelling?", select: "Select",
  chooseRange: "Choose a check-in and check-out date", night: "night", nights: "nights", cancel: "Cancel", confirm: "Confirm",
  whoTravels: "Who is travelling?", adultHint: "Ages 18 or above", roomHint: "Up to 5 rooms",
  explore: "Explore", travelStories: "Travel stories", allGuides: "All guides", aboutUs: "About us",
  afterStart: "Check-out or return must be after your start date.",
};

export const compareCopy: Record<Locale, CompareCopy> = {
  en,
  "zh-CN": {
    oneSearch: "一次搜索 · 多家可信旅行平台", titleTop: "找到更合适的", titleBottom: "旅行价格", subtitle: "几秒内比较可信旅行平台的价格。",
    hotels: "酒店", flights: "机票", destination: "目的地", from: "出发地", to: "目的地", checkIn: "入住", checkOut: "离店", departure: "出发", returnDate: "返程",
    guestsRooms: "住客与房间", adult: "位成人", adults: "位成人", room: "间房", rooms: "间房", comparePrices: "比较价格", findingDeals: "正在寻找更优价格…",
    noBookingFees: "无预订手续费", secureBooking: "安全预订", transparentPrices: "价格透明",
    bestPrices: "比较价格", bestPricesBody: "一次搜索即可查看当前可用选择。", trustedSecure: "可信与安全", trustedSecureBody: "在成熟的合作平台继续完成预订。",
    noHiddenFees: "无隐藏费用", noHiddenFeesBody: "付款前查看完整价格与条款。", instantResults: "即时结果", instantResultsBody: "搜索条件会随跳转一并保留。",
    partners: "由领先旅行合作伙伴提供搜索结果", privacyNote: "我们尊重你的隐私，并保护你的搜索信息。", privacy: "隐私政策", terms: "服务条款",
    searchDestinations: "搜索目的地", whereStay: "你想住在哪里？", whereFrom: "你从哪里出发？", whereTo: "你要飞往哪里？", cityAirport: "城市或机场代码", noDestinations: "没有找到目的地，请尝试其他城市。",
    selectDates: "选择日期", selectingCheckout: "请选择结束日期", whenTravel: "你计划什么时候出行？", select: "请选择", chooseRange: "请选择开始和结束日期", night: "晚", nights: "晚", cancel: "取消", confirm: "确认",
    whoTravels: "谁会一起出行？", adultHint: "18 岁或以上", roomHint: "最多 5 间房", explore: "探索", travelStories: "旅行内容", allGuides: "全部指南", aboutUs: "关于我们", afterStart: "离店或返程日期必须晚于开始日期。",
  },
  "zh-TW": {
    oneSearch: "一次搜尋 · 多家可信旅遊平台", titleTop: "找到更合適的", titleBottom: "旅遊價格", subtitle: "數秒內比較可信旅遊平台的價格。",
    hotels: "飯店", flights: "機票", destination: "目的地", from: "出發地", to: "目的地", checkIn: "入住", checkOut: "退房", departure: "出發", returnDate: "回程",
    guestsRooms: "旅客與房間", adult: "位成人", adults: "位成人", room: "間房", rooms: "間房", comparePrices: "比較價格", findingDeals: "正在尋找更優價格…",
    noBookingFees: "無預訂手續費", secureBooking: "安全預訂", transparentPrices: "價格透明",
    bestPrices: "比較價格", bestPricesBody: "一次搜尋即可查看目前可用選擇。", trustedSecure: "可信與安全", trustedSecureBody: "在成熟的合作平台繼續完成預訂。",
    noHiddenFees: "無隱藏費用", noHiddenFeesBody: "付款前查看完整價格與條款。", instantResults: "即時結果", instantResultsBody: "搜尋條件會隨跳轉一併保留。",
    partners: "由領先旅遊合作夥伴提供搜尋結果", privacyNote: "我們尊重你的隱私，並保護你的搜尋資訊。", privacy: "隱私權政策", terms: "服務條款",
    searchDestinations: "搜尋目的地", whereStay: "你想住在哪裡？", whereFrom: "你從哪裡出發？", whereTo: "你要飛往哪裡？", cityAirport: "城市或機場代碼", noDestinations: "找不到目的地，請嘗試其他城市。",
    selectDates: "選擇日期", selectingCheckout: "請選擇結束日期", whenTravel: "你計畫何時出發？", select: "請選擇", chooseRange: "請選擇開始與結束日期", night: "晚", nights: "晚", cancel: "取消", confirm: "確認",
    whoTravels: "誰會一起出行？", adultHint: "18 歲或以上", roomHint: "最多 5 間房", explore: "探索", travelStories: "旅遊內容", allGuides: "全部指南", aboutUs: "關於我們", afterStart: "退房或回程日期必須晚於開始日期。",
  },
  id: {
    oneSearch: "SATU PENCARIAN · MITRA PERJALANAN TEPERCAYA", titleTop: "Temukan Penawaran", titleBottom: "Perjalanan Terbaik", subtitle: "Bandingkan harga dari mitra perjalanan tepercaya dalam hitungan detik.",
    hotels: "Hotel", flights: "Penerbangan", destination: "Tujuan", from: "Dari", to: "Ke", checkIn: "Check-in", checkOut: "Check-out", departure: "Berangkat", returnDate: "Pulang",
    guestsRooms: "Tamu & Kamar", adult: "Dewasa", adults: "Dewasa", room: "Kamar", rooms: "Kamar", comparePrices: "Bandingkan Harga", findingDeals: "Mencari Harga Terbaik...",
    noBookingFees: "Tanpa biaya pemesanan", secureBooking: "Pemesanan aman", transparentPrices: "Harga transparan",
    bestPrices: "Harga Terbaik", bestPricesBody: "Bandingkan pilihan yang tersedia dalam satu pencarian.", trustedSecure: "Tepercaya & Aman", trustedSecureBody: "Lanjutkan pemesanan dengan mitra tepercaya.",
    noHiddenFees: "Tanpa Biaya Tersembunyi", noHiddenFeesBody: "Tinjau harga lengkap dan syarat sebelum membayar.", instantResults: "Hasil Instan", instantResultsBody: "Detail pencarian ikut dibawa saat Anda beralih.",
    partners: "Pencarian didukung mitra perjalanan terkemuka", privacyNote: "Kami menghormati privasi Anda dan melindungi pencarian Anda.", privacy: "Kebijakan Privasi", terms: "Ketentuan Layanan",
    searchDestinations: "Cari tujuan", whereStay: "Di mana Anda ingin menginap?", whereFrom: "Dari mana Anda terbang?", whereTo: "Ke mana Anda terbang?", cityAirport: "Kota atau kode bandara", noDestinations: "Tujuan tidak ditemukan. Coba kota lain.",
    selectDates: "Pilih tanggal", selectingCheckout: "Pilih tanggal selesai", whenTravel: "Kapan Anda bepergian?", select: "Pilih", chooseRange: "Pilih tanggal mulai dan selesai", night: "malam", nights: "malam", cancel: "Batal", confirm: "Konfirmasi",
    whoTravels: "Siapa yang bepergian?", adultHint: "Usia 18 tahun ke atas", roomHint: "Maksimal 5 kamar", explore: "Jelajahi", travelStories: "Cerita perjalanan", allGuides: "Semua panduan", aboutUs: "Tentang kami", afterStart: "Tanggal selesai harus setelah tanggal mulai.",
  },
  th: {
    oneSearch: "ค้นหาครั้งเดียว · พาร์ทเนอร์ท่องเที่ยวที่เชื่อถือได้", titleTop: "ค้นหาดีลท่องเที่ยว", titleBottom: "ที่ดีที่สุด", subtitle: "เปรียบเทียบราคาจากพาร์ทเนอร์ที่เชื่อถือได้ในไม่กี่วินาที",
    hotels: "โรงแรม", flights: "เที่ยวบิน", destination: "จุดหมาย", from: "จาก", to: "ไป", checkIn: "เช็กอิน", checkOut: "เช็กเอาต์", departure: "ออกเดินทาง", returnDate: "เดินทางกลับ",
    guestsRooms: "ผู้เข้าพักและห้อง", adult: "ผู้ใหญ่", adults: "ผู้ใหญ่", room: "ห้อง", rooms: "ห้อง", comparePrices: "เปรียบเทียบราคา", findingDeals: "กำลังค้นหาราคาที่ดีที่สุด...",
    noBookingFees: "ไม่มีค่าธรรมเนียมการจอง", secureBooking: "จองอย่างปลอดภัย", transparentPrices: "ราคาโปร่งใส",
    bestPrices: "ราคาที่ดีที่สุด", bestPricesBody: "เปรียบเทียบตัวเลือกที่มีด้วยการค้นหาเดียว", trustedSecure: "เชื่อถือได้และปลอดภัย", trustedSecureBody: "จองต่อกับพาร์ทเนอร์ที่ได้รับความไว้วางใจ",
    noHiddenFees: "ไม่มีค่าใช้จ่ายแอบแฝง", noHiddenFeesBody: "ตรวจสอบราคาและเงื่อนไขก่อนชำระเงิน", instantResults: "ผลลัพธ์ทันที", instantResultsBody: "รายละเอียดการค้นหาจะถูกส่งต่อไปด้วย",
    partners: "ผลการค้นหาจากพาร์ทเนอร์ท่องเที่ยวชั้นนำ", privacyNote: "เราเคารพความเป็นส่วนตัวและปกป้องการค้นหาของคุณ", privacy: "นโยบายความเป็นส่วนตัว", terms: "ข้อกำหนดการใช้บริการ",
    searchDestinations: "ค้นหาจุดหมาย", whereStay: "คุณต้องการพักที่ไหน?", whereFrom: "คุณจะบินจากที่ไหน?", whereTo: "คุณจะบินไปที่ไหน?", cityAirport: "เมืองหรือรหัสสนามบิน", noDestinations: "ไม่พบจุดหมาย ลองค้นหาเมืองอื่น",
    selectDates: "เลือกวันที่", selectingCheckout: "เลือกวันที่สิ้นสุด", whenTravel: "คุณจะเดินทางเมื่อไร?", select: "เลือก", chooseRange: "เลือกวันที่เริ่มต้นและสิ้นสุด", night: "คืน", nights: "คืน", cancel: "ยกเลิก", confirm: "ยืนยัน",
    whoTravels: "ใครร่วมเดินทาง?", adultHint: "อายุ 18 ปีขึ้นไป", roomHint: "สูงสุด 5 ห้อง", explore: "สำรวจ", travelStories: "เรื่องราวท่องเที่ยว", allGuides: "คู่มือทั้งหมด", aboutUs: "เกี่ยวกับเรา", afterStart: "วันที่สิ้นสุดต้องอยู่หลังวันที่เริ่มต้น",
  },
  vi: {
    oneSearch: "MỘT LẦN TÌM · ĐỐI TÁC DU LỊCH ĐÁNG TIN CẬY", titleTop: "Tìm Ưu Đãi", titleBottom: "Du Lịch Tốt Nhất", subtitle: "So sánh giá từ các đối tác du lịch đáng tin cậy trong vài giây.",
    hotels: "Khách sạn", flights: "Chuyến bay", destination: "Điểm đến", from: "Từ", to: "Đến", checkIn: "Nhận phòng", checkOut: "Trả phòng", departure: "Khởi hành", returnDate: "Khứ hồi",
    guestsRooms: "Khách & Phòng", adult: "Người lớn", adults: "Người lớn", room: "Phòng", rooms: "Phòng", comparePrices: "So Sánh Giá", findingDeals: "Đang tìm giá tốt nhất...",
    noBookingFees: "Không phí đặt chỗ", secureBooking: "Đặt chỗ an toàn", transparentPrices: "Giá minh bạch",
    bestPrices: "Giá Tốt Nhất", bestPricesBody: "So sánh các lựa chọn hiện có chỉ với một lần tìm.", trustedSecure: "Tin Cậy & An Toàn", trustedSecureBody: "Tiếp tục đặt chỗ với đối tác uy tín.",
    noHiddenFees: "Không Phí Ẩn", noHiddenFeesBody: "Xem đầy đủ giá và điều khoản trước khi thanh toán.", instantResults: "Kết Quả Tức Thì", instantResultsBody: "Thông tin tìm kiếm được giữ nguyên khi chuyển trang.",
    partners: "Kết quả từ các đối tác du lịch hàng đầu", privacyNote: "Chúng tôi tôn trọng quyền riêng tư và bảo vệ tìm kiếm của bạn.", privacy: "Chính sách quyền riêng tư", terms: "Điều khoản dịch vụ",
    searchDestinations: "Tìm điểm đến", whereStay: "Bạn muốn ở đâu?", whereFrom: "Bạn bay từ đâu?", whereTo: "Bạn bay đến đâu?", cityAirport: "Thành phố hoặc mã sân bay", noDestinations: "Không tìm thấy điểm đến. Hãy thử thành phố khác.",
    selectDates: "Chọn ngày", selectingCheckout: "Chọn ngày kết thúc", whenTravel: "Bạn đi khi nào?", select: "Chọn", chooseRange: "Chọn ngày bắt đầu và kết thúc", night: "đêm", nights: "đêm", cancel: "Hủy", confirm: "Xác nhận",
    whoTravels: "Ai sẽ đi?", adultHint: "Từ 18 tuổi", roomHint: "Tối đa 5 phòng", explore: "Khám phá", travelStories: "Câu chuyện du lịch", allGuides: "Tất cả cẩm nang", aboutUs: "Về chúng tôi", afterStart: "Ngày kết thúc phải sau ngày bắt đầu.",
  },
  ms: {
    oneSearch: "SATU CARIAN · RAKAN PERJALANAN DIPERCAYAI", titleTop: "Temui Tawaran", titleBottom: "Perjalanan Terbaik", subtitle: "Bandingkan harga daripada rakan perjalanan dipercayai dalam beberapa saat.",
    hotels: "Hotel", flights: "Penerbangan", destination: "Destinasi", from: "Dari", to: "Ke", checkIn: "Daftar masuk", checkOut: "Daftar keluar", departure: "Berlepas", returnDate: "Pulang",
    guestsRooms: "Tetamu & Bilik", adult: "Dewasa", adults: "Dewasa", room: "Bilik", rooms: "Bilik", comparePrices: "Bandingkan Harga", findingDeals: "Mencari Harga Terbaik...",
    noBookingFees: "Tiada fi tempahan", secureBooking: "Tempahan selamat", transparentPrices: "Harga telus",
    bestPrices: "Harga Terbaik", bestPricesBody: "Bandingkan pilihan tersedia dalam satu carian.", trustedSecure: "Dipercayai & Selamat", trustedSecureBody: "Teruskan tempahan dengan rakan yang dipercayai.",
    noHiddenFees: "Tiada Caj Tersembunyi", noHiddenFeesBody: "Semak harga penuh dan syarat sebelum membayar.", instantResults: "Hasil Segera", instantResultsBody: "Butiran carian dibawa bersama semasa anda beralih.",
    partners: "Carian dikuasakan rakan perjalanan terkemuka", privacyNote: "Kami menghormati privasi dan melindungi carian anda.", privacy: "Dasar Privasi", terms: "Terma Perkhidmatan",
    searchDestinations: "Cari destinasi", whereStay: "Di mana anda mahu menginap?", whereFrom: "Dari mana anda terbang?", whereTo: "Ke mana anda terbang?", cityAirport: "Bandar atau kod lapangan terbang", noDestinations: "Destinasi tidak ditemui. Cuba bandar lain.",
    selectDates: "Pilih tarikh", selectingCheckout: "Pilih tarikh tamat", whenTravel: "Bila anda melancong?", select: "Pilih", chooseRange: "Pilih tarikh mula dan tamat", night: "malam", nights: "malam", cancel: "Batal", confirm: "Sahkan",
    whoTravels: "Siapa yang melancong?", adultHint: "Umur 18 tahun ke atas", roomHint: "Sehingga 5 bilik", explore: "Teroka", travelStories: "Cerita perjalanan", allGuides: "Semua panduan", aboutUs: "Tentang kami", afterStart: "Tarikh tamat mesti selepas tarikh mula.",
  },
  fil: {
    oneSearch: "ISANG SEARCH · MGA PINAGKAKATIWALAANG TRAVEL PARTNER", titleTop: "Hanapin ang Pinakamagandang", titleBottom: "Travel Deals", subtitle: "Ihambing ang presyo mula sa mga pinagkakatiwalaang travel partner sa ilang segundo.",
    hotels: "Mga Hotel", flights: "Mga Flight", destination: "Destinasyon", from: "Mula", to: "Papunta", checkIn: "Check-in", checkOut: "Check-out", departure: "Alis", returnDate: "Balik",
    guestsRooms: "Bisita at Kuwarto", adult: "Adult", adults: "Adults", room: "Kuwarto", rooms: "Kuwarto", comparePrices: "Ihambing ang Presyo", findingDeals: "Hinahanap ang Pinakamagandang Presyo...",
    noBookingFees: "Walang booking fee", secureBooking: "Ligtas na booking", transparentPrices: "Malinaw na presyo",
    bestPrices: "Pinakamagandang Presyo", bestPricesBody: "Ihambing ang mga available na opsyon sa isang search.", trustedSecure: "Mapagkakatiwalaan at Ligtas", trustedSecureBody: "Ipagpatuloy ang booking sa maaasahang partner.",
    noHiddenFees: "Walang Nakatagong Bayad", noHiddenFeesBody: "Suriin ang buong presyo at tuntunin bago magbayad.", instantResults: "Agarang Resulta", instantResultsBody: "Kasamang ipinapasa ang detalye ng iyong search.",
    partners: "Search mula sa nangungunang travel partners", privacyNote: "Iginagalang namin ang iyong privacy at pinoprotektahan ang search mo.", privacy: "Patakaran sa Privacy", terms: "Mga Tuntunin ng Serbisyo",
    searchDestinations: "Maghanap ng destinasyon", whereStay: "Saan mo gustong manatili?", whereFrom: "Saan ka manggagaling?", whereTo: "Saan ka pupunta?", cityAirport: "Lungsod o airport code", noDestinations: "Walang nahanap na destinasyon. Subukan ang ibang lungsod.",
    selectDates: "Pumili ng petsa", selectingCheckout: "Piliin ang petsa ng pagtatapos", whenTravel: "Kailan ang biyahe mo?", select: "Piliin", chooseRange: "Piliin ang simula at pagtatapos", night: "gabi", nights: "gabi", cancel: "Kanselahin", confirm: "Kumpirmahin",
    whoTravels: "Sino ang bibiyahe?", adultHint: "Edad 18 pataas", roomHint: "Hanggang 5 kuwarto", explore: "Tuklasin", travelStories: "Mga kuwentong biyahe", allGuides: "Lahat ng gabay", aboutUs: "Tungkol sa amin", afterStart: "Dapat mas huli ang petsa ng pagtatapos.",
  },
  km: {
    oneSearch: "ស្វែងរកម្ដង · ដៃគូទេសចរណ៍ដែលទុកចិត្តបាន", titleTop: "ស្វែងរកតម្លៃ", titleBottom: "ដំណើរល្អបំផុត", subtitle: "ប្រៀបធៀបតម្លៃពីដៃគូទេសចរណ៍ដែលទុកចិត្តបានក្នុងរយៈពេលខ្លី។",
    hotels: "សណ្ឋាគារ", flights: "ជើងហោះហើរ", destination: "គោលដៅ", from: "ពី", to: "ទៅ", checkIn: "ចូលស្នាក់", checkOut: "ចាកចេញ", departure: "ចេញដំណើរ", returnDate: "ត្រឡប់",
    guestsRooms: "ភ្ញៀវ និងបន្ទប់", adult: "មនុស្សពេញវ័យ", adults: "មនុស្សពេញវ័យ", room: "បន្ទប់", rooms: "បន្ទប់", comparePrices: "ប្រៀបធៀបតម្លៃ", findingDeals: "កំពុងស្វែងរកតម្លៃល្អ...",
    noBookingFees: "គ្មានថ្លៃកក់", secureBooking: "កក់ដោយសុវត្ថិភាព", transparentPrices: "តម្លៃច្បាស់លាស់",
    bestPrices: "តម្លៃល្អ", bestPricesBody: "ប្រៀបធៀបជម្រើសដែលមានដោយស្វែងរកម្ដង។", trustedSecure: "ទុកចិត្តបាន និងសុវត្ថិភាព", trustedSecureBody: "បន្តកក់ជាមួយដៃគូដែលទុកចិត្តបាន។",
    noHiddenFees: "គ្មានថ្លៃលាក់", noHiddenFeesBody: "ពិនិត្យតម្លៃ និងលក្ខខណ្ឌមុនបង់ប្រាក់។", instantResults: "លទ្ធផលភ្លាមៗ", instantResultsBody: "ព័ត៌មានស្វែងរកត្រូវបានរក្សាទុកពេលប្ដូរទំព័រ។",
    partners: "លទ្ធផលពីដៃគូទេសចរណ៍ឈានមុខ", privacyNote: "យើងគោរពភាពឯកជន និងការពារការស្វែងរករបស់អ្នក។", privacy: "គោលការណ៍ឯកជនភាព", terms: "លក្ខខណ្ឌសេវាកម្ម",
    searchDestinations: "ស្វែងរកគោលដៅ", whereStay: "អ្នកចង់ស្នាក់នៅទីណា?", whereFrom: "អ្នកហោះពីទីណា?", whereTo: "អ្នកហោះទៅទីណា?", cityAirport: "ទីក្រុង ឬលេខកូដព្រលាន", noDestinations: "រកមិនឃើញគោលដៅ។ សាកល្បងទីក្រុងផ្សេង។",
    selectDates: "ជ្រើសកាលបរិច្ឆេទ", selectingCheckout: "ជ្រើសថ្ងៃបញ្ចប់", whenTravel: "អ្នកធ្វើដំណើរពេលណា?", select: "ជ្រើស", chooseRange: "ជ្រើសថ្ងៃចាប់ផ្ដើម និងបញ្ចប់", night: "យប់", nights: "យប់", cancel: "បោះបង់", confirm: "បញ្ជាក់",
    whoTravels: "អ្នកណាធ្វើដំណើរ?", adultHint: "អាយុ 18 ឆ្នាំឡើង", roomHint: "រហូតដល់ 5 បន្ទប់", explore: "ស្វែងយល់", travelStories: "រឿងទេសចរណ៍", allGuides: "មគ្គុទ្ទេសក៍ទាំងអស់", aboutUs: "អំពីយើង", afterStart: "ថ្ងៃបញ្ចប់ត្រូវក្រោយថ្ងៃចាប់ផ្ដើម។",
  },
  lo: {
    oneSearch: "ຄົ້ນຫາຄັ້ງດຽວ · ພາກສ່ວນທ່ອງທ່ຽວທີ່ໄວ້ໃຈ", titleTop: "ຊອກຫາລາຄາ", titleBottom: "ການເດີນທາງທີ່ດີ", subtitle: "ປຽບທຽບລາຄາຈາກພາກສ່ວນທີ່ໄວ້ໃຈໄດ້ໃນບໍ່ກີ່ວິນາທີ.",
    hotels: "ໂຮງແຮມ", flights: "ຖ້ຽວບິນ", destination: "ປາຍທາງ", from: "ຈາກ", to: "ໄປ", checkIn: "ເຂົ້າພັກ", checkOut: "ອອກ", departure: "ອອກເດີນທາງ", returnDate: "ກັບ",
    guestsRooms: "ແຂກ ແລະຫ້ອງ", adult: "ຜູ້ໃຫຍ່", adults: "ຜູ້ໃຫຍ່", room: "ຫ້ອງ", rooms: "ຫ້ອງ", comparePrices: "ປຽບທຽບລາຄາ", findingDeals: "ກຳລັງຊອກຫາລາຄາດີ...",
    noBookingFees: "ບໍ່ມີຄ່າຈອງ", secureBooking: "ຈອງຢ່າງປອດໄພ", transparentPrices: "ລາຄາຊັດເຈນ",
    bestPrices: "ລາຄາທີ່ດີ", bestPricesBody: "ປຽບທຽບຕົວເລືອກດ້ວຍການຄົ້ນຫາຄັ້ງດຽວ.", trustedSecure: "ໄວ້ໃຈ ແລະປອດໄພ", trustedSecureBody: "ຈອງຕໍ່ກັບພາກສ່ວນທີ່ໄວ້ໃຈ.",
    noHiddenFees: "ບໍ່ມີຄ່າແອບແຝງ", noHiddenFeesBody: "ກວດລາຄາ ແລະເງື່ອນໄຂກ່ອນຈ່າຍ.", instantResults: "ຜົນທັນທີ", instantResultsBody: "ລາຍລະອຽດການຄົ້ນຫາຈະຕິດໄປນຳ.",
    partners: "ຜົນຈາກພາກສ່ວນທ່ອງທ່ຽວຊັ້ນນຳ", privacyNote: "ພວກເຮົາເຄົາລົບຄວາມສ່ວນຕົວ ແລະປົກປ້ອງການຄົ້ນຫາ.", privacy: "ນະໂຍບາຍຄວາມສ່ວນຕົວ", terms: "ເງື່ອນໄຂບໍລິການ",
    searchDestinations: "ຄົ້ນຫາປາຍທາງ", whereStay: "ຢາກພັກຢູ່ໃສ?", whereFrom: "ບິນຈາກໃສ?", whereTo: "ບິນໄປໃສ?", cityAirport: "ເມືອງ ຫຼືລະຫັດສະໜາມບິນ", noDestinations: "ບໍ່ພົບປາຍທາງ. ລອງເມືອງອື່ນ.",
    selectDates: "ເລືອກວັນ", selectingCheckout: "ເລືອກວັນສິ້ນສຸດ", whenTravel: "ຈະເດີນທາງເມື່ອໃດ?", select: "ເລືອກ", chooseRange: "ເລືອກວັນເລີ່ມ ແລະສິ້ນສຸດ", night: "ຄືນ", nights: "ຄືນ", cancel: "ຍົກເລີກ", confirm: "ຢືນຢັນ",
    whoTravels: "ໃຜເດີນທາງ?", adultHint: "ອາຍຸ 18 ປີຂຶ້ນໄປ", roomHint: "ສູງສຸດ 5 ຫ້ອງ", explore: "ສຳຫຼວດ", travelStories: "ເລື່ອງທ່ອງທ່ຽວ", allGuides: "ຄູ່ມືທັງໝົດ", aboutUs: "ກ່ຽວກັບພວກເຮົາ", afterStart: "ວັນສິ້ນສຸດຕ້ອງຫຼັງວັນເລີ່ມ.",
  },
  my: {
    oneSearch: "တစ်ကြိမ်ရှာဖွေ · ယုံကြည်ရသော ခရီးသွားမိတ်ဖက်များ", titleTop: "အကောင်းဆုံး", titleBottom: "ခရီးသွားဈေးနှုန်းများ", subtitle: "ယုံကြည်ရသော ခရီးသွားမိတ်ဖက်များ၏ ဈေးနှုန်းကို စက္ကန့်ပိုင်းအတွင်း နှိုင်းယှဉ်ပါ။",
    hotels: "ဟိုတယ်", flights: "လေယာဉ်", destination: "ခရီးဆုံး", from: "မှ", to: "သို့", checkIn: "ဝင်ရောက်", checkOut: "ထွက်ခွာ", departure: "ထွက်ခွာမည့်နေ့", returnDate: "ပြန်မည့်နေ့",
    guestsRooms: "ဧည့်သည်နှင့် အခန်း", adult: "လူကြီး", adults: "လူကြီး", room: "အခန်း", rooms: "အခန်း", comparePrices: "ဈေးနှုန်းနှိုင်းယှဉ်ရန်", findingDeals: "အကောင်းဆုံးဈေးနှုန်း ရှာနေသည်...",
    noBookingFees: "ဘွတ်ကင်ကြေးမရှိ", secureBooking: "လုံခြုံစွာ ဘွတ်ကင်", transparentPrices: "ပွင့်လင်းသောဈေးနှုန်း",
    bestPrices: "အကောင်းဆုံးဈေး", bestPricesBody: "တစ်ကြိမ်ရှာဖွေပြီး ရရှိနိုင်သောရွေးချယ်မှုများကို နှိုင်းယှဉ်ပါ။", trustedSecure: "ယုံကြည်ရပြီး လုံခြုံ", trustedSecureBody: "ယုံကြည်ရသော မိတ်ဖက်နှင့် ဘွတ်ကင်ဆက်လုပ်ပါ။",
    noHiddenFees: "လျှို့ဝှက်ကြေးမရှိ", noHiddenFeesBody: "ငွေမချေမီ ဈေးနှုန်းနှင့် စည်းကမ်းများကို စစ်ဆေးပါ။", instantResults: "ချက်ချင်းရလဒ်", instantResultsBody: "ရှာဖွေမှုအချက်အလက်များကို ဆက်လက်ပို့ဆောင်ပါသည်။",
    partners: "ဦးဆောင်ခရီးသွားမိတ်ဖက်များမှ ရှာဖွေမှုရလဒ်", privacyNote: "သင့်ကိုယ်ရေးအချက်အလက်နှင့် ရှာဖွေမှုကို ကာကွယ်ပါသည်။", privacy: "ကိုယ်ရေးအချက်အလက် မူဝါဒ", terms: "ဝန်ဆောင်မှု စည်းကမ်းများ",
    searchDestinations: "ခရီးဆုံးရှာရန်", whereStay: "ဘယ်မှာ တည်းခိုမလဲ?", whereFrom: "ဘယ်ကနေ ပျံမလဲ?", whereTo: "ဘယ်ကို ပျံမလဲ?", cityAirport: "မြို့ သို့မဟုတ် လေဆိပ်ကုဒ်", noDestinations: "ခရီးဆုံးမတွေ့ပါ။ အခြားမြို့ကို စမ်းပါ။",
    selectDates: "ရက်ရွေးရန်", selectingCheckout: "အဆုံးရက်ရွေးရန်", whenTravel: "ဘယ်အချိန် ခရီးသွားမလဲ?", select: "ရွေးရန်", chooseRange: "အစနှင့်အဆုံး ရက်ရွေးပါ", night: "ည", nights: "ည", cancel: "ပယ်ဖျက်", confirm: "အတည်ပြု",
    whoTravels: "ဘယ်သူတွေ သွားမလဲ?", adultHint: "အသက် 18 နှစ်အထက်", roomHint: "အများဆုံး 5 ခန်း", explore: "လေ့လာရန်", travelStories: "ခရီးသွားအကြောင်းအရာ", allGuides: "လမ်းညွှန်အားလုံး", aboutUs: "ကျွန်ုပ်တို့အကြောင်း", afterStart: "အဆုံးရက်သည် အစရက်နောက် ဖြစ်ရမည်။",
  },
};

export type CompareLocationCopy = {
  useMyLocation: string;
  detectingLocation: string;
  approximateLocation: string;
  preciseLocation: string;
  locationFailed: string;
  loadingAirports: string;
  searchTripFor: string;
  globalDestination: string;
  airportCoverage: string;
};

const enLocation: CompareLocationCopy = {
  useMyLocation: "Use my precise location",
  detectingLocation: "Finding your nearest airport…",
  approximateLocation: "Nearby airport selected from your approximate location",
  preciseLocation: "Nearby airport selected from your device location",
  locationFailed: "We could not detect your location. Search by city or airport code.",
  loadingAirports: "Loading global airport coverage…",
  searchTripFor: "Search Trip.com for",
  globalDestination: "Global hotel destination",
  airportCoverage: "4,170 scheduled-service airports",
};

export const compareLocationCopy: Record<Locale, CompareLocationCopy> = {
  en: enLocation,
  "zh-CN": { useMyLocation: "使用我的精确位置", detectingLocation: "正在查找附近机场…", approximateLocation: "已根据大致位置选择附近机场", preciseLocation: "已根据设备位置选择附近机场", locationFailed: "无法识别位置，请搜索城市或机场代码。", loadingAirports: "正在加载全球机场数据…", searchTripFor: "在 Trip.com 搜索", globalDestination: "全球酒店目的地", airportCoverage: "4,170 个有定期航班的机场" },
  "zh-TW": { useMyLocation: "使用我的精確位置", detectingLocation: "正在尋找附近機場…", approximateLocation: "已根據大致位置選擇附近機場", preciseLocation: "已根據裝置位置選擇附近機場", locationFailed: "無法辨識位置，請搜尋城市或機場代碼。", loadingAirports: "正在載入全球機場資料…", searchTripFor: "在 Trip.com 搜尋", globalDestination: "全球飯店目的地", airportCoverage: "4,170 個有定期航班的機場" },
  id: { ...enLocation, useMyLocation: "Gunakan lokasi akurat saya", detectingLocation: "Mencari bandara terdekat…", locationFailed: "Lokasi tidak terdeteksi. Cari kota atau kode bandara.", loadingAirports: "Memuat data bandara global…", searchTripFor: "Cari di Trip.com", globalDestination: "Destinasi hotel global", airportCoverage: "4.170 bandara dengan layanan terjadwal" },
  th: { ...enLocation, useMyLocation: "ใช้ตำแหน่งที่แม่นยำของฉัน", detectingLocation: "กำลังค้นหาสนามบินใกล้คุณ…", locationFailed: "ไม่พบตำแหน่ง โปรดค้นหาเมืองหรือรหัสสนามบิน", loadingAirports: "กำลังโหลดข้อมูลสนามบินทั่วโลก…", searchTripFor: "ค้นหาบน Trip.com", globalDestination: "จุดหมายโรงแรมทั่วโลก", airportCoverage: "สนามบินที่มีเที่ยวบินประจำ 4,170 แห่ง" },
  vi: { ...enLocation, useMyLocation: "Dùng vị trí chính xác của tôi", detectingLocation: "Đang tìm sân bay gần nhất…", locationFailed: "Không thể xác định vị trí. Hãy tìm theo thành phố hoặc mã sân bay.", loadingAirports: "Đang tải dữ liệu sân bay toàn cầu…", searchTripFor: "Tìm trên Trip.com", globalDestination: "Điểm đến khách sạn toàn cầu", airportCoverage: "4.170 sân bay có chuyến bay thường lệ" },
  ms: { ...enLocation, useMyLocation: "Gunakan lokasi tepat saya", detectingLocation: "Mencari lapangan terbang terdekat…", locationFailed: "Lokasi tidak dapat dikesan. Cari bandar atau kod lapangan terbang.", loadingAirports: "Memuatkan data lapangan terbang global…", searchTripFor: "Cari di Trip.com", globalDestination: "Destinasi hotel global", airportCoverage: "4,170 lapangan terbang berjadual" },
  fil: { ...enLocation, useMyLocation: "Gamitin ang eksaktong lokasyon ko", detectingLocation: "Hinahanap ang pinakamalapit na airport…", locationFailed: "Hindi matukoy ang lokasyon. Maghanap ng lungsod o airport code.", loadingAirports: "Nilo-load ang pandaigdigang airport data…", searchTripFor: "Maghanap sa Trip.com", globalDestination: "Pandaigdigang hotel destination", airportCoverage: "4,170 airport na may regular na serbisyo" },
  km: { ...enLocation, useMyLocation: "ប្រើទីតាំងជាក់លាក់របស់ខ្ញុំ", detectingLocation: "កំពុងស្វែងរកព្រលានយន្តហោះជិតបំផុត…", locationFailed: "មិនអាចរកទីតាំងបានទេ។ សូមស្វែងរកទីក្រុង ឬលេខកូដព្រលាន។", loadingAirports: "កំពុងផ្ទុកទិន្នន័យព្រលានទូទាំងពិភពលោក…", searchTripFor: "ស្វែងរកនៅ Trip.com", globalDestination: "គោលដៅសណ្ឋាគារទូទាំងពិភពលោក", airportCoverage: "ព្រលានមានជើងហោះហើរទៀងទាត់ 4,170" },
  lo: { ...enLocation, useMyLocation: "ໃຊ້ຕຳແໜ່ງທີ່ແນ່ນອນຂອງຂ້ອຍ", detectingLocation: "ກຳລັງຊອກຫາສະໜາມບິນໃກ້ສຸດ…", locationFailed: "ບໍ່ສາມາດລະບຸຕຳແໜ່ງ. ຄົ້ນຫາເມືອງ ຫຼືລະຫັດສະໜາມບິນ.", loadingAirports: "ກຳລັງໂຫຼດຂໍ້ມູນສະໜາມບິນທົ່ວໂລກ…", searchTripFor: "ຄົ້ນຫາໃນ Trip.com", globalDestination: "ປາຍທາງໂຮງແຮມທົ່ວໂລກ", airportCoverage: "4,170 ສະໜາມບິນທີ່ມີຖ້ຽວບິນປະຈຳ" },
  my: { ...enLocation, useMyLocation: "ကျွန်ုပ်၏ တိကျသောနေရာကို သုံးရန်", detectingLocation: "အနီးဆုံးလေဆိပ် ရှာနေသည်…", locationFailed: "တည်နေရာမသိနိုင်ပါ။ မြို့ သို့မဟုတ် လေဆိပ်ကုဒ်ဖြင့် ရှာပါ။", loadingAirports: "ကမ္ဘာတစ်ဝန်း လေဆိပ်ဒေတာ တင်နေသည်…", searchTripFor: "Trip.com တွင် ရှာရန်", globalDestination: "ကမ္ဘာတစ်ဝန်း ဟိုတယ်ခရီးဆုံး", airportCoverage: "ပုံမှန်လေကြောင်းခရီးစဉ်ရှိ လေဆိပ် 4,170" },
};
