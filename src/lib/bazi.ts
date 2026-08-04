/**
 * 八字计算核心引擎 v2
 * 纯 JavaScript 实现，零外部依赖。所有计算在浏览器本地执行。
 *
 * 核心算法：
 * - 日柱：从公元 1900-01-01（甲戌日）起算，日天干 = (0 + 天数差) % 10，日地支 = (10 + 天数差) % 12
 * - 年柱：以立春（约 2 月 4 日）为界
 * - 月柱：以节气为界，年干定月干
 * - 时柱：日干定时干，时辰定时支
 */

import type {
  BirthdayInput,
  BaziResult,
  Pillar,
  TenStem,
  TwelveBranch,
  FiveElement,
  DayMasterInfo,
} from "./types";

// ============================================================
// 天干地支常量
// ============================================================

const STEMS: TenStem[] = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES: TwelveBranch[] = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_ELEMENT_MAP: Record<TenStem, FiveElement> = {
  甲: "木", 乙: "木",
  丙: "火", 丁: "火",
  戊: "土", 己: "土",
  庚: "金", 辛: "金",
  壬: "水", 癸: "水",
};

// ============================================================
// 日柱计算：基准日 1900-01-01 = 甲戌日（天干索引 0，地支索引 10）
// ============================================================

const REF_DATE = new Date(1900, 0, 1); // 1900-01-01
const REF_STEM_INDEX = 0;  // 甲
const REF_BRANCH_INDEX = 10; // 戌

/** 计算两个日期之间的天数差（考虑时区） */
function daysBetween(d1: Date, d2: Date): number {
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

// ============================================================
// 24 节气日序（1900-2100 近似值，每月两个节气，误差 ±1 天）
// 对八字月柱来说 ±1 天的误差在节气边界日才影响结果，可接受
// ============================================================

/**
 * 节气日期查找表。key: "月 节气索引(0=节,1=气)"，value: 日期数组，按年份%4 索引。
 * 数据为 1900-2100 范围的近似值。
 */
const SOLAR_TERM_DAYS: Record<string, number[]> = {
  // 立春（年柱分界）约 2 月 4 日
  "2_0": [4, 4, 4, 5],  // 立春: Feb 3-5
  // 惊蛰 约 3 月 6 日
  "3_0": [6, 5, 5, 6],  // 惊蛰: Mar 5-7
  // 清明 约 4 月 5 日
  "4_0": [5, 4, 4, 5],  // 清明: Apr 4-6
  // 立夏 约 5 月 6 日
  "5_0": [6, 5, 5, 6],  // 立夏: May 5-7
  // 芒种 约 6 月 6 日
  "6_0": [6, 5, 5, 6],  // 芒种: Jun 5-7
  // 小暑 约 7 月 7 日
  "7_0": [7, 7, 7, 8],  // 小暑: Jul 6-8
  // 立秋 约 8 月 8 日
  "8_0": [8, 7, 7, 8],  // 立秋: Aug 7-9
  // 白露 约 9 月 8 日
  "9_0": [8, 7, 7, 8],  // 白露: Sep 7-9
  // 寒露 约 10 月 8 日
  "10_0": [8, 8, 8, 9], // 寒露: Oct 8-9
  // 立冬 约 11 月 7 日
  "11_0": [7, 7, 8, 8], // 立冬: Nov 7-8
  // 大雪 约 12 月 7 日
  "12_0": [7, 7, 7, 8], // 大雪: Dec 6-8
  // 小寒 约 1 月 6 日
  "1_0": [6, 5, 5, 6],  // 小寒: Jan 5-7
};

/** 获取近似节气的"日"（相对于月初）。month: 1-12 */
function getSolarTermDay(year: number, month: number, termIndex: 0): number {
  const key = `${month}_0`;
  const arr = SOLAR_TERM_DAYS[key];
  if (!arr) return month === 2 ? 4 : 6; // fallback
  return arr[year % 4] ?? arr[0];
}

// ============================================================
// 月干计算：年干 → 首月（寅月）天干
// ============================================================

/** 年干定首月天干（五虎遁） */
const YEAR_STEM_TO_MONTH_STEM: Record<number, number> = {
  // 甲己年 → 丙寅月 (stem index 2)
  0: 2, 5: 2,
  // 乙庚年 → 戊寅月 (stem index 4)
  1: 4, 6: 4,
  // 丙辛年 → 庚寅月 (stem index 6)
  2: 6, 7: 6,
  // 丁壬年 → 壬寅月 (stem index 8)
  3: 8, 8: 8,
  // 戊癸年 → 甲寅月 (stem index 0)
  4: 0, 9: 0,
};

// ============================================================
// 时干计算：日干 → 子时天干（五鼠遁）
// ============================================================

const DAY_STEM_TO_HOUR_STEM: Record<number, number> = {
  // 甲己日 → 甲子时 (0)
  0: 0, 5: 0,
  // 乙庚日 → 丙子时 (2)
  1: 2, 6: 2,
  // 丙辛日 → 戊子时 (4)
  2: 4, 7: 4,
  // 丁壬日 → 庚子时 (6)
  3: 6, 8: 6,
  // 戊癸日 → 壬子时 (8)
  4: 8, 9: 8,
};

// ============================================================
// 日主特征描述
// ============================================================

const DAY_MASTER_INFO: Record<FiveElement, DayMasterInfo> = {
  金: { dayMaster: "庚", element: "金", title: "金", description: "框架感先于感受。精密、秩序、不可见但不可或缺。", traits: ["逻辑是本能不是技能", "精密与秩序天然在线", "适合需要不可见深度的角色"] },
  木: { dayMaster: "甲", element: "木", title: "木", description: "生长欲先于规则。发散、创意，天生知道什么东西可以长。", traits: ["直觉判断天生准确", "创意有根、有枝、有燃烧的理由", "适合需要生长感而非完成感的角色"] },
  水: { dayMaster: "壬", element: "水", title: "水", description: "流动感先于一切。不喜被固定在一个位置、一个节奏、一套标签里。", traits: ["流动即深度，每个项目是一条新河道", "信息即水，渠道即直觉", "适合需要多变的深度而非固定角色的位置"] },
  火: { dayMaster: "丙", element: "火", title: "火", description: "表达欲先于逻辑。燃烧、外放、需要被看见。", traits: ["表达不是技能是燃料补给", "即时应激天然在线", "适合需要被看见、需要即时反馈的角色"] },
  土: { dayMaster: "戊", element: "土", title: "土", description: "秩序感先于自由。承载、协调、把多方捏合为整体。", traits: ["多方拉扯是日常节奏不是消耗", "制度是你的骨骼不是牢笼", "适合需要统筹、承载、捏合多方力量的角色"] },
};

// ============================================================
// 核心计算函数
// ============================================================

function makePillar(stemIndex: number, branchIndex: number): Pillar {
  const stem = STEMS[stemIndex % 10];
  const branch = BRANCHES[branchIndex % 12];
  return { stem, branch, fullName: stem + branch };
}

export function calculateBazi(input: BirthdayInput): BaziResult {
  const { year, month, day, hour } = input;

  // 1. 日柱：天数差从基准日起算
  const birthDate = new Date(year, month - 1, day);
  const dayDiff = daysBetween(REF_DATE, birthDate);
  const dayStemIdx = ((REF_STEM_INDEX + dayDiff) % 10 + 10) % 10;
  const dayBranchIdx = ((REF_BRANCH_INDEX + dayDiff) % 12 + 12) % 12;
  const dayPillar = makePillar(dayStemIdx, dayBranchIdx);

  // 2. 年柱：以立春为界
  const lichunDay = getSolarTermDay(year, 2, 0);
  const isBeforeLichun = (month < 2) || (month === 2 && day < lichunDay);
  const effectiveYear = isBeforeLichun ? year - 1 : year;
  const yearStemIdx = (effectiveYear - 4) % 10;
  const yearBranchIdx = (effectiveYear - 4) % 12;
  const yearPillar = makePillar(yearStemIdx, yearBranchIdx);

  // 3. 月柱：以节气为月界
  // 地支固定：寅(2)卯(3)辰(4)巳(5)午(6)未(7)申(8)酉(9)戌(10)亥(11)子(12)丑(1)
  // 月支索引 = (month + 1) % 12，实际是 month 对应的地支从寅开始
  // 简化：month 1=寅(idx2), 2=卯(idx3)...12=丑(idx1)
  const monthBranchIndex = (month + 1) % 12; // 偏移使寅=2

  // 检查是否在节气之前（月柱属上月）
  let effectiveMonthBranch = monthBranchIndex;
  const termDay = getSolarTermDay(year, month, 0);
  if (day < termDay) {
    // 在节气前，月柱属上月
    effectiveMonthBranch = (monthBranchIndex + 11) % 12; // -1 mod 12
  }

  // 月干：年干定首月(寅)天干，再推算
  const firstMonthStem = YEAR_STEM_TO_MONTH_STEM[yearStemIdx];
  // 寅月 = index 2, effectiveMonthBranch 对应的 stem 偏移
  const monthStemOffset = (effectiveMonthBranch - 2 + 12) % 12;
  const monthStemIdx = (firstMonthStem + monthStemOffset) % 10;
  const monthPillar = makePillar(monthStemIdx, effectiveMonthBranch);

  // 4. 时柱：日干定时干，时辰定时支
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12; // 0-23 → 0-11 (子丑寅...)
  const hourStemBase = DAY_STEM_TO_HOUR_STEM[dayStemIdx];
  const hourStemIdx = (hourStemBase + hourBranchIndex) % 10;
  const hourPillar = makePillar(hourStemIdx, hourBranchIndex);

  // 日主
  const dayGan = dayPillar.stem;
  const dayElement = STEM_ELEMENT_MAP[dayGan];

  return { yearPillar, monthPillar, dayPillar, hourPillar, dayMaster: dayGan, dayElement };
}

export function getDayMasterInfo(element: FiveElement): DayMasterInfo {
  return { ...DAY_MASTER_INFO[element] };
}

// ============================================================
// 验证函数
// ============================================================

export function validateBazi(
  birthDate: Date,
  expectedDayGan: TenStem,
  expectedYearStem?: TenStem
): { passed: boolean; actual: BaziResult; message: string } {
  const input: BirthdayInput = {
    year: birthDate.getFullYear(),
    month: birthDate.getMonth() + 1,
    day: birthDate.getDate(),
    hour: birthDate.getHours(),
    minute: birthDate.getMinutes(),
  };
  const result = calculateBazi(input);
  const mismatches: string[] = [];
  if (result.dayMaster !== expectedDayGan) mismatches.push(`日主: expected ${expectedDayGan}, got ${result.dayMaster}`);
  if (expectedYearStem && result.yearPillar.stem !== expectedYearStem) mismatches.push(`年干: expected ${expectedYearStem}, got ${result.yearPillar.stem}`);
  if (mismatches.length > 0) return { passed: false, actual: result, message: `FAILED: ${mismatches.join("; ")}` };
  return { passed: true, actual: result, message: `PASSED: 日主=${result.dayMaster}, 日柱=${result.dayPillar.fullName}, 五行=${result.dayElement}` };
}
