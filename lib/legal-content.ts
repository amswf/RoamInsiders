import type { Locale } from "./content";

export type LegalKind = "privacy" | "terms";

type LegalDocument = {
  title: string;
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
};

export const legalLabels: Record<Locale, { privacy: string; terms: string; effective: string; fallback: string; contents: string }> = {
  "zh-CN": { privacy: "隐私政策", terms: "服务条款", effective: "生效日期", fallback: "该法律文件暂未提供当前语言版本，以下显示英文正式文本。", contents: "本页目录" },
  "zh-TW": { privacy: "隱私政策", terms: "服務條款", effective: "生效日期", fallback: "此法律文件暫未提供目前語言版本，以下顯示英文正式文本。", contents: "本頁目錄" },
  en: { privacy: "Privacy Policy", terms: "Terms of Service", effective: "Effective", fallback: "A translation is not yet available for this legal document. The official English text is shown below.", contents: "On this page" },
  id: { privacy: "Kebijakan Privasi", terms: "Ketentuan Layanan", effective: "Berlaku", fallback: "Terjemahan belum tersedia. Teks resmi bahasa Inggris ditampilkan di bawah.", contents: "Di halaman ini" },
  th: { privacy: "นโยบายความเป็นส่วนตัว", terms: "ข้อกำหนดการให้บริการ", effective: "มีผลตั้งแต่", fallback: "ยังไม่มีคำแปล เอกสารภาษาอังกฤษอย่างเป็นทางการแสดงอยู่ด้านล่าง", contents: "ในหน้านี้" },
  vi: { privacy: "Chính sách quyền riêng tư", terms: "Điều khoản dịch vụ", effective: "Có hiệu lực", fallback: "Chưa có bản dịch. Văn bản tiếng Anh chính thức được hiển thị bên dưới.", contents: "Trong trang này" },
  ms: { privacy: "Dasar Privasi", terms: "Terma Perkhidmatan", effective: "Berkuat kuasa", fallback: "Terjemahan belum tersedia. Teks rasmi bahasa Inggeris dipaparkan di bawah.", contents: "Pada halaman ini" },
  fil: { privacy: "Patakaran sa Privacy", terms: "Mga Tuntunin ng Serbisyo", effective: "May bisa", fallback: "Wala pang salin. Ang opisyal na English text ay nasa ibaba.", contents: "Sa pahinang ito" },
  km: { privacy: "គោលការណ៍ឯកជនភាព", terms: "លក្ខខណ្ឌសេវាកម្ម", effective: "មានប្រសិទ្ធភាព", fallback: "មិនទាន់មានការបកប្រែទេ។ អត្ថបទអង់គ្លេសផ្លូវការបង្ហាញខាងក្រោម។", contents: "ក្នុងទំព័រនេះ" },
  lo: { privacy: "ນະໂຍບາຍຄວາມສ່ວນຕົວ", terms: "ເງື່ອນໄຂບໍລິການ", effective: "ມີຜົນ", fallback: "ຍັງບໍ່ມີຄຳແປ. ສະແດງຂໍ້ຄວາມທາງການພາສາອັງກິດດ້ານລຸ່ມ.", contents: "ໃນໜ້ານີ້" },
  my: { privacy: "ကိုယ်ရေးအချက်အလက် မူဝါဒ", terms: "ဝန်ဆောင်မှု စည်းကမ်းများ", effective: "စတင်သက်ရောက်သည့်နေ့", fallback: "ဘာသာပြန် မရရှိသေးပါ။ တရားဝင် အင်္ဂလိပ်စာကို အောက်တွင် ဖော်ပြထားသည်။", contents: "ဤစာမျက်နှာတွင်" },
};

const privacyEn: LegalDocument = {
  title: "Privacy Policy",
  intro: "This policy explains what information TravelGoGuide handles when you read our travel content, use the hotel and flight comparison page, or follow a link to a third-party booking platform.",
  sections: [
    { heading: "1. Information you provide", paragraphs: ["The comparison form may contain a destination, travel dates, passenger or guest counts, room counts, and departure and arrival airports. TravelGoGuide processes these values in your browser to construct your search. Our current public site does not have a user account system or a database that stores completed comparison searches."] },
    { heading: "2. Location entries", paragraphs: ["The comparison page does not request device location or use an IP-based geolocation service. You enter hotel destinations and flight departure and arrival locations manually.", "Airport suggestions are generated in your browser from the site’s scheduled-service airport list. You can enter a city, select a suggested airport, or type a three-letter airport code."] },
    { heading: "3. Advertising, URL parameters, and click measurement", paragraphs: ["A visit may include campaign and affiliate parameters such as trip_sub1, trip_sub3, allianceid, SID, UTM values, a keyword, destination, or airport code. We use these values to prefill the comparison form and preserve campaign attribution. When you press the comparison button, the applicable affiliate values are forwarded to Trip.com with your search.", "At the same time, your browser sends a click-measurement request to insg.jiatoutrade.com containing the product type and the applicable trip_sub1, trip_sub3, allianceid, and SID values. The request is sent without delaying your transfer to Trip.com. The measurement provider may also receive standard request data such as your internet address, browser type, referring page, and time."] },
    { heading: "4. Technical data and hosting", paragraphs: ["TravelGoGuide is published through GitHub Pages. Hosting providers and content providers, including Google Fonts and Unsplash, may receive standard request data such as your internet address, browser type, requested page, and time. Their handling is governed by their own privacy terms.", "The current public TravelGoGuide pages do not set first-party analytics cookies. Browser authentication used by authorized content administrators is separate from the public comparison experience."] },
    { heading: "5. Third-party booking services", paragraphs: ["When you follow a booking or comparison link, you leave TravelGoGuide. Trip.com, Booking.com, Traveloka, Agoda, or another named provider may collect search details and other information under its own privacy policy. Review that provider’s policy before submitting personal or payment information."] },
    { heading: "6. Retention and security", paragraphs: ["Because the current static comparison site does not store completed form submissions in a TravelGoGuide database, TravelGoGuide has no search-submission retention period. URL parameters may remain in your browser history, and third parties may retain their own logs. We use HTTPS and limit the data handled by the public site, but no internet transmission can be guaranteed completely secure."] },
    { heading: "7. Your choices and rights", paragraphs: ["You may manually enter or change any destination or airport, remove campaign parameters from the URL, or avoid third-party links. Depending on where you live, you may also have rights to access, correct, delete, restrict, or object to processing of personal information. Contact us to make a request."] },
    { heading: "8. Children", paragraphs: ["TravelGoGuide is a general travel-information service and is not directed to children under 13. We do not knowingly collect personal information from children through the public comparison form."] },
    { heading: "9. Changes and contact", paragraphs: ["We may update this policy when our site, providers, or legal obligations change. The effective date above identifies the current version.", "Privacy questions and requests may be sent to privacy@travelgoguide.com."] },
  ],
};

const termsEn: LegalDocument = {
  title: "Terms of Service",
  intro: "These terms govern your use of TravelGoGuide. By using the site, you agree to these terms. If you do not agree, do not use the site.",
  sections: [
    { heading: "1. What TravelGoGuide provides", paragraphs: ["TravelGoGuide publishes travel editorial content and provides a search interface that passes selected hotel or flight criteria to third-party booking platforms. TravelGoGuide is not a travel agency, airline, hotel, seller of travel, payment processor, or party to a booking contract."] },
    { heading: "2. Prices, availability, and search coverage", paragraphs: ["Prices, schedules, availability, taxes, fees, cancellation rules, entry requirements, and other travel conditions can change without notice. Search fields and location datasets help you construct a query, but do not guarantee that a particular route, property, destination, or fare is sold by Trip.com or another provider. The booking platform’s final results and checkout terms control."] },
    { heading: "3. Third-party services", paragraphs: ["Bookings, payments, changes, refunds, cancellations, loyalty benefits, and customer support are provided by the booking platform or travel supplier under its own terms. TravelGoGuide is not responsible for third-party websites, inventory, acts, omissions, or service interruptions."] },
    { heading: "4. Affiliate disclosure", paragraphs: ["TravelGoGuide may earn a commission when you follow an affiliate link or complete an eligible booking. This commercial relationship does not change the requirement to review the provider’s displayed price and terms before paying."] },
    { heading: "5. Acceptable use", paragraphs: ["You may use the site for lawful personal travel research. You must not interfere with site operation, attempt unauthorized access, introduce malicious code, scrape the site at a disruptive rate, misrepresent affiliation with TravelGoGuide, or use the site in violation of applicable law."] },
    { heading: "6. Content and intellectual property", paragraphs: ["TravelGoGuide’s original text, visual design, branding, and site code are protected by applicable intellectual-property laws. Third-party names, trademarks, photographs, airport data, and booking content remain subject to their respective owners or licenses. OurAirports airport data is used under its public-domain dedication."] },
    { heading: "7. Disclaimers", paragraphs: ["The site is provided on an ‘as is’ and ‘as available’ basis. To the fullest extent permitted by law, TravelGoGuide disclaims warranties of accuracy, availability, merchantability, fitness for a particular purpose, and non-infringement. Travel decisions should be confirmed with official suppliers and relevant authorities."] },
    { heading: "8. Limitation of liability", paragraphs: ["To the fullest extent permitted by law, TravelGoGuide will not be liable for indirect, incidental, special, consequential, or punitive losses, or for losses arising from third-party bookings, missed travel, price changes, data loss, or reliance on site content. Nothing in these terms excludes liability that cannot legally be excluded."] },
    { heading: "9. Changes and contact", paragraphs: ["We may change the site or these terms. Continued use after an updated effective date means you accept the revised terms. Questions may be sent to privacy@travelgoguide.com."] },
  ],
};

const privacyZhCN: LegalDocument = {
  title: "隐私政策",
  intro: "本政策说明当你浏览 TravelGoGuide、使用酒店与机票比价页，或前往第三方预订平台时，我们如何处理信息。",
  sections: [
    { heading: "1. 你主动提供的信息", paragraphs: ["比价表单可能包含目的地、旅行日期、乘客或住客人数、房间数以及出发和到达机场。这些内容仅在你的浏览器中用于生成搜索。当前公开网站没有用户账户系统，也没有存储已提交搜索的 TravelGoGuide 数据库。"] },
    { heading: "2. 地点输入", paragraphs: ["比价页不会请求设备定位，也不会使用基于网络地址的定位服务。酒店目的地以及航班出发地、到达地均由你手动输入。", "机场建议由浏览器根据网站内的定期航班机场列表生成。你可以输入城市、选择建议机场，或直接输入三字机场代码。"] },
    { heading: "3. 广告、网址参数与点击监测", paragraphs: ["访问网址可能包含 trip_sub1、trip_sub3、allianceid、SID、UTM、关键词、目的地或机场代码等活动及联盟参数。我们用它们预填表单并保留广告归因；当你点击比价按钮时，适用的联盟参数会随搜索一并传递给 Trip.com。", "同时，浏览器会向 insg.jiatoutrade.com 发送点击监测请求，其中包含产品类型及适用的 trip_sub1、trip_sub3、allianceid 和 SID 值。该请求不会延迟前往 Trip.com 的跳转。监测服务方还可能接收网络地址、浏览器类型、来源页面和时间等标准请求数据。"] },
    { heading: "4. 技术数据与托管", paragraphs: ["TravelGoGuide 通过 GitHub Pages 发布。GitHub、Google Fonts、Unsplash 等托管或内容提供方可能接收网络地址、浏览器类型、请求页面和时间等标准请求数据，其处理受各自隐私条款约束。当前公开页面不设置第一方分析 Cookie。"] },
    { heading: "5. 第三方预订服务", paragraphs: ["点击预订或比价链接后，你将离开 TravelGoGuide。Trip.com、Booking.com、Traveloka、Agoda 或其他平台会根据自己的隐私政策处理搜索、账户与支付信息。提交个人或支付信息前请查看对应政策。"] },
    { heading: "6. 保存与安全", paragraphs: ["由于当前静态比价站不把表单提交保存到 TravelGoGuide 数据库，因此没有搜索记录保存期限。网址参数可能保留在浏览器历史中，第三方也可能保存其日志。我们使用 HTTPS 并尽量减少数据处理，但无法保证互联网传输绝对安全。"] },
    { heading: "7. 你的选择与权利", paragraphs: ["你可以手动输入或修改目的地与机场、删除网址中的活动参数或不点击第三方链接。你所在地区的法律还可能赋予访问、更正、删除、限制或反对处理个人信息的权利。"] },
    { heading: "8. 儿童", paragraphs: ["TravelGoGuide 是面向一般公众的旅行信息服务，并非专门面向 13 岁以下儿童。我们不会通过公开比价表单故意收集儿童个人信息。"] },
    { heading: "9. 更新与联系", paragraphs: ["网站、服务提供方或法律义务变化时，我们可能更新本政策，页面顶部日期为当前版本生效日。", "隐私问题或权利请求请发送至 privacy@travelgoguide.com。"] },
  ],
};

const termsZhCN: LegalDocument = {
  title: "服务条款",
  intro: "本条款适用于你对 TravelGoGuide 的使用。继续使用即表示接受本条款；不同意时请停止使用。",
  sections: [
    { heading: "1. 服务性质", paragraphs: ["TravelGoGuide 发布旅行内容，并把你选择的酒店或航班条件传递给第三方预订平台。TravelGoGuide 不是旅行社、航空公司、酒店、旅行产品销售方、支付处理方，也不是你与预订平台之间合同的当事人。"] },
    { heading: "2. 价格、库存与搜索覆盖", paragraphs: ["价格、班次、库存、税费、取消规则、入境要求等可能随时变化。地点与机场数据用于帮助生成查询，但不保证 Trip.com 或其他平台一定销售特定路线、住宿、目的地或票价。最终结果和结算条款以预订平台为准。"] },
    { heading: "3. 第三方服务", paragraphs: ["预订、付款、改签、退款、取消、会员权益和客户支持由预订平台或旅行供应商根据其条款提供。TravelGoGuide 不对第三方网站、库存、行为、遗漏或服务中断负责。"] },
    { heading: "4. 联盟披露", paragraphs: ["你点击联盟链接或完成符合条件的预订时，TravelGoGuide 可能获得佣金。付款前仍应以平台展示的价格和条款为准。"] },
    { heading: "5. 可接受使用", paragraphs: ["你可以将网站用于合法的个人旅行研究。不得干扰网站运行、尝试未授权访问、植入恶意代码、以造成干扰的频率抓取内容、冒充与 TravelGoGuide 有关联，或违反适用法律。"] },
    { heading: "6. 内容与知识产权", paragraphs: ["TravelGoGuide 的原创文字、视觉设计、品牌与网站代码受适用知识产权法律保护。第三方名称、商标、照片、机场数据和预订内容分别受其所有者或许可约束；OurAirports 机场数据按公共领域声明使用。"] },
    { heading: "7. 免责声明", paragraphs: ["网站按“现状”和“可用状态”提供。在法律允许的最大范围内，我们不保证内容准确、持续可用、适销、适合特定用途或不侵权。重要旅行决定应向官方供应商和相关主管部门确认。"] },
    { heading: "8. 责任限制", paragraphs: ["在法律允许的最大范围内，TravelGoGuide 不对间接、附带、特殊、后果性或惩罚性损失，以及第三方预订、行程错过、价格变化、数据丢失或依赖本站内容产生的损失负责。法律不得排除的责任不受本条限制。"] },
    { heading: "9. 更新与联系", paragraphs: ["我们可能修改网站或本条款。在新生效日期后继续使用即表示接受修改。问题请发送至 privacy@travelgoguide.com。"] },
  ],
};

const privacyZhTW: LegalDocument = {
  ...privacyZhCN,
  title: "隱私政策",
  intro: "本政策說明當你瀏覽 TravelGoGuide、使用飯店與機票比較頁，或前往第三方預訂平台時，我們如何處理資訊。",
};

const termsZhTW: LegalDocument = {
  ...termsZhCN,
  title: "服務條款",
  intro: "本條款適用於你對 TravelGoGuide 的使用。繼續使用即表示接受本條款；不同意時請停止使用。",
};

export function getLegalDocument(locale: Locale, kind: LegalKind) {
  if (locale === "zh-CN") return { document: kind === "privacy" ? privacyZhCN : termsZhCN, translated: true };
  if (locale === "zh-TW") return { document: kind === "privacy" ? privacyZhTW : termsZhTW, translated: true };
  return { document: kind === "privacy" ? privacyEn : termsEn, translated: locale === "en" };
}
