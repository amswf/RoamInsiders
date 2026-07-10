export type GuidePost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  destination: string;
  duration: string;
  budget: string;
  season: string;
  category: string;
  color: string;
  status: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export const starterPosts: GuidePost[] = [
  {
    id: 1,
    slug: "moganshan-48-hours",
    title: "莫干山 48 小时：把周末过得像一次小长假",
    excerpt: "不赶景点，住进竹林，沿山路散步，再把一个下午完整留给日落。",
    content: "第一天｜慢慢抵达\n午后入住山里，先不安排景点。放下行李后沿民宿附近散步，把城市的节奏留在山脚。晚餐选择步行可达的小馆，早点回去。\n\n第二天｜把时间交给山\n早起喝一杯咖啡，走一段轻松的竹林路线。午后找一个能看见远山的位置坐着，直到光线变软。\n\n第三天｜不急着返程\n睡到自然醒，吃一顿长早餐。返程前只做一件事：挑一份当地食物带回家，让旅行多延续一天。",
    destination: "莫干山",
    duration: "2天1夜",
    budget: "¥1,200 起",
    season: "春 / 秋",
    category: "周末逃离",
    color: "forest",
    status: "published",
    featured: true,
    createdAt: "2026-07-10 09:00:00",
    updatedAt: "2026-07-10 09:00:00",
  },
  {
    id: 2,
    slug: "kyoto-first-time",
    title: "第一次去京都：把清晨留给自己",
    excerpt: "一条避开匆忙的四日路线：早起看寺院，午后钻进小巷，夜晚只留给一顿饭。",
    content: "Day 1｜先认识街区\n抵达后不要横跨城市。围绕住处走一圈，找到便利店、咖啡店和一条你愿意再走一次的小路。\n\nDay 2｜早起是最值得的门票\n把最想看的寺院放在开门后的第一小时。中午回酒店休息，傍晚再出门。\n\nDay 3｜只选一个方向\n沿一条街区慢慢逛，不把地图上的收藏全部兑现。真正属于你的京都，往往藏在计划之间。\n\nDay 4｜留白再离开\n最后半天不新增景点，回到最喜欢的地方，带着熟悉感结束旅程。",
    destination: "京都",
    duration: "4天3夜",
    budget: "¥4,800 起",
    season: "四季",
    category: "城市初见",
    color: "persimmon",
    status: "published",
    featured: true,
    createdAt: "2026-07-09 09:00:00",
    updatedAt: "2026-07-09 09:00:00",
  },
  {
    id: 3,
    slug: "chiang-mai-slow-trip",
    title: "清迈五日：一份不需要打卡的松弛路线",
    excerpt: "寺庙、咖啡、手作与山风。每天只安排一个重点，剩下的交给偶遇。",
    content: "Day 1｜住进老城边缘\n选择步行方便但不过分热闹的位置，傍晚用一顿当地晚餐开启旅程。\n\nDay 2｜寺庙与树影\n上午看一座寺庙就够了。午后找一家能久坐的咖啡馆，把手机收起来。\n\nDay 3｜做点能带走的东西\n参加一次手作体验，或逛一间小型工作室。旅行的纪念不一定来自商店货架。\n\nDay 4｜去山里换空气\n留一天给城外。不要塞满沿途停靠点，重点是体会温度和海拔的变化。\n\nDay 5｜再吃一次最喜欢的\n旅行最后一顿，不必寻找新答案。回到前几天最喜欢的小店，然后轻松离开。",
    destination: "清迈",
    duration: "5天4夜",
    budget: "¥3,600 起",
    season: "11月—2月",
    category: "慢旅行",
    color: "sky",
    status: "published",
    featured: true,
    createdAt: "2026-07-08 09:00:00",
    updatedAt: "2026-07-08 09:00:00",
  },
];

export const defaultSettings = {
  trip_cta_url: "https://www.trip.com/?utm_source=roam-insider&utm_medium=content&utm_campaign=launch",
  site_announcement: "首发路线已上线 · 从一个周末开始",
};
