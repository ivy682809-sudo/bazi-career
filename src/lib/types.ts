// 八字职场五行匹配工具 · 类型定义

export type FiveElement = "金" | "木" | "水" | "火" | "土";

export type TenStem = "甲" | "乙" | "丙" | "丁" | "戊" | "己" | "庚" | "辛" | "壬" | "癸";

export type TwelveBranch = "子" | "丑" | "寅" | "卯" | "辰" | "巳" | "午" | "未" | "申" | "酉" | "戌" | "亥";

/** 公历出生日期输入 */
export interface BirthdayInput {
  year: number;   // 1900-2100
  month: number;  // 1-12
  day: number;    // 1-31
  hour: number;   // 0-23
  minute: number; // 0-59
}

/** 一柱：天干 + 地支 */
export interface Pillar {
  stem: TenStem;
  branch: TwelveBranch;
  /** 完整字符串，如 "丙午" */
  fullName: string;
}

/** 完整的八字四柱结果 */
export interface BaziResult {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  /** 日主——日柱天干 */
  dayMaster: TenStem;
  /** 日主五行 */
  dayElement: FiveElement;
}

/** 日主特征描述 */
export interface DayMasterInfo {
  dayMaster: TenStem;
  element: FiveElement;
  title: string;
  description: string;
  traits: string[];
}

/** 行业匹配等级 */
export type MatchLevel = "best" | "good" | "neutral" | "challenging";

/** 一条行业匹配推荐 */
export interface IndustryMatch {
  industry: string;
  matchLevel: MatchLevel;
  matchScore: number;   // 0-100
  reason: string;        // 风水档案式短评
  detailDescription: string; // 详细阐述
  tags: string[];
}

/** 按等级分组的行业匹配结果 */
export interface IndustryMatchGroup {
  level: MatchLevel;
  label: string;
  items: IndustryMatch[];
}

/** 支付状态 */
export interface PaymentState {
  paid: boolean;
  orderId: string;
  unlockedAt: number; // timestamp
}
