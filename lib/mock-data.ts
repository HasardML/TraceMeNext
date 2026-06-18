import {
  TravelInputSchema,
  TravelPlanSchema,
  type TravelInput,
  type TravelPlan,
} from "@/types";

// Mock data is for development display only and does not represent real travel recommendations.
export const mockTravelInput: TravelInput = {
  destination: "东京",
  departureCity: "上海",
  startDate: "2026-09-20",
  days: 5,
  travelers: 2,
  budget: 8000,
  currency: "CNY",
  travelType: "couple",
  preferences: ["美食", "动漫", "摄影"],
  pace: "relaxed",
  specialRequests: "想轻松一点，多吃当地美食，少排队，适合第一次去东京。",
};

export const mockTravelPlan: TravelPlan = {
  id: "mock-tokyo-5d-couple-relaxed",
  title: "东京 5 日轻松情侣旅行",
  summary:
    "从上海出发，围绕美食、动漫和城市漫步安排节奏舒缓的东京行程，覆盖浅草、银座、秋叶原、吉祥寺、涩谷和台场等经典区域。",
  destination: "东京",
  totalDays: 5,
  totalBudget: 8000,
  currency: "CNY",
  days: [
    {
      day: 1,
      theme: "抵达东京与浅草散步",
      items: [
        {
          time: "09:30",
          place: "上海浦东国际机场至东京成田机场",
          type: "transport",
          description: "搭乘上午航班抵达东京，预留充足通关和取行李时间。",
          cost: 2200,
        },
        {
          time: "14:00",
          place: "上野酒店办理入住",
          type: "hotel",
          description: "选择交通便利的上野区域入住，方便后续前往浅草、秋叶原和银座。",
          cost: 600,
        },
        {
          time: "16:00",
          place: "浅草寺与仲见世商店街",
          type: "attraction",
          description: "在雷门、浅草寺和商店街慢慢散步，适合抵达日低强度熟悉城市。",
          cost: 60,
        },
        {
          time: "18:30",
          place: "浅草天妇罗晚餐",
          type: "food",
          description: "安排一顿经典日式天妇罗晚餐，作为东京旅行的轻松开场。",
          cost: 320,
        },
      ],
    },
    {
      day: 2,
      theme: "筑地、银座与东京站",
      items: [
        {
          time: "09:30",
          place: "筑地场外市场",
          type: "food",
          description: "品尝海鲜小吃、玉子烧和咖啡，避开清晨拥挤时段。",
          cost: 300,
        },
        {
          time: "11:30",
          place: "银座中央通",
          type: "shopping",
          description: "逛百货、文具和生活方式店铺，控制购物节奏并保留午后体力。",
          cost: 520,
        },
        {
          time: "14:30",
          place: "东京国际论坛与丸之内街区",
          type: "attraction",
          description: "从银座步行到丸之内，欣赏城市建筑和东京站红砖站舍。",
          cost: 80,
        },
        {
          time: "17:30",
          place: "东京站拉面街",
          type: "food",
          description: "晚餐安排在东京站周边，便于饭后直接返回酒店休息。",
          cost: 260,
        },
      ],
    },
    {
      day: 3,
      theme: "秋叶原动漫巡礼与上野放松",
      items: [
        {
          time: "10:00",
          place: "秋叶原电器街",
          type: "shopping",
          description: "逛动漫周边、模型和游戏店，按兴趣预留充足浏览时间。",
          cost: 500,
        },
        {
          time: "12:30",
          place: "秋叶原主题咖啡午餐",
          type: "food",
          description: "选择轻松的主题餐厅体验，午餐后继续在周边慢逛。",
          cost: 320,
        },
        {
          time: "15:00",
          place: "上野公园",
          type: "rest",
          description: "回到上野公园散步休息，给中段行程留出恢复时间。",
          cost: 0,
        },
        {
          time: "17:30",
          place: "阿美横丁居酒屋",
          type: "food",
          description: "在热闹街区吃晚餐，体验东京下町氛围。",
          cost: 300,
        },
      ],
    },
    {
      day: 4,
      theme: "吉祥寺、井之头公园与涩谷夜景",
      items: [
        {
          time: "10:00",
          place: "吉祥寺 Sunroad 商店街",
          type: "shopping",
          description: "逛杂货、甜品和小店，比市中心更适合轻松城市漫步。",
          cost: 360,
        },
        {
          time: "12:30",
          place: "吉祥寺咖喱午餐",
          type: "food",
          description: "安排一顿口味稳定、排队压力较低的日式咖喱午餐。",
          cost: 240,
        },
        {
          time: "14:00",
          place: "井之头恩赐公园",
          type: "rest",
          description: "沿池边散步或坐下喝咖啡，保持 relaxed 节奏。",
          cost: 60,
        },
        {
          time: "17:00",
          place: "涩谷 Scramble Square",
          type: "attraction",
          description: "傍晚前往涩谷，欣赏城市天际线并顺路逛周边商场。",
          cost: 320,
        },
      ],
    },
    {
      day: 5,
      theme: "台场海滨与返程",
      items: [
        {
          time: "09:30",
          place: "酒店退房与行李寄存",
          type: "hotel",
          description: "完成退房后寄存行李，轻装前往台场。",
          cost: 0,
        },
        {
          time: "11:00",
          place: "台场海滨公园",
          type: "attraction",
          description: "在海滨区域散步拍照，作为返程日前半天的轻松安排。",
          cost: 100,
        },
        {
          time: "13:00",
          place: "DiverCity Tokyo Plaza 午餐与伴手礼",
          type: "shopping",
          description: "午餐后补充伴手礼，预留前往机场的缓冲时间。",
          cost: 430,
        },
        {
          time: "16:00",
          place: "东京成田机场至上海浦东国际机场",
          type: "transport",
          description: "搭乘傍晚航班返回上海，结束 5 天东京旅行。",
          cost: 1030,
        },
      ],
    },
  ],
  budget: {
    transport: 3230,
    accommodation: 600,
    food: 1740,
    tickets: 560,
    shopping: 1810,
    other: 60,
    total: 8000,
  },
  packingList: [
    { text: "护照", checked: false },
    { text: "日本签证或入境所需材料", checked: false },
    { text: "机票和酒店确认单", checked: false },
    { text: "Suica 或交通 IC 卡", checked: false },
    { text: "日元现金和银行卡", checked: false },
    { text: "手机充电器和移动电源", checked: false },
    { text: "日标转换插头", checked: false },
    { text: "舒适步行鞋", checked: false },
    { text: "轻便雨伞", checked: false },
    { text: "常用药品", checked: false },
  ],
  tips: [
    "东京多数公共交通准点，跨区移动建议预留 10 到 15 分钟换乘缓冲。",
    "热门餐厅尽量避开 12:00 和 18:30 的高峰时段。",
    "购物前确认退税门槛，并把护照随身携带。",
    "城市漫步日建议减少单日跨城往返，避免把时间消耗在交通上。",
    "部分小店仍偏好现金支付，建议准备少量日元零钱。",
  ],
  createdAt: "2026-06-15T09:00:00.000Z",
  updatedAt: "2026-06-15T09:00:00.000Z",
  inputParams: mockTravelInput,
};

export function validateMockData(): {
  input: TravelInput;
  plan: TravelPlan;
} {
  return {
    input: TravelInputSchema.parse(mockTravelInput),
    plan: TravelPlanSchema.parse(mockTravelPlan),
  };
}
