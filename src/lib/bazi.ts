/**
 * 八字计算核心引擎
 * 基于 lunar-javascript 库，提供日主五行查询。
 * 所有计算在客户端本地执行，数据不上传。
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
// 天干地支 → 五行 映射
// ============================================================

const STEM_ELEMENT_MAP: Record<TenStem, FiveElement> = {
  甲: "木",
  乙: "木",
  丙: "火",
  丁: "火",
  戊: "土",
  己: "土",
  庚: "金",
  辛: "金",
  壬: "水",
  癸: "水",
};

// ============================================================
// 日主特征描述（素材来源：行业五行志系列内容）
// ============================================================

const DAY_MASTER_INFO: Record<FiveElement, DayMasterInfo> = {
  金: {
    dayMaster: "庚",
    element: "金",
    title: "金",
    description: "框架感先于感受。精密、秩序、不可见但不可或缺。",
    traits: [
      "逻辑是本能不是技能",
      "精密与秩序天然在线",
      "适合需要不可见深度的角色",
    ],
  },
  木: {
    dayMaster: "甲",
    element: "木",
    title: "木",
    description: "生长欲先于规则。发散、创意，天生知道什么东西可以长。",
    traits: [
      "直觉判断天生准确",
      "创意有根、有枝、有燃烧的理由",
      "适合需要生长感而非完成感的角色",
    ],
  },
  水: {
    dayMaster: "壬",
    element: "水",
    title: "水",
    description: "流动感先于一切。不喜被固定在一个位置、一个节奏、一套标签里。",
    traits: [
      "流动即深度，每个项目是一条新河道",
      "信息即水，渠道即直觉",
      "适合需要多变的深度而非固定角色的位置",
    ],
  },
  火: {
    dayMaster: "丙",
    element: "火",
    title: "火",
    description: "表达欲先于逻辑。燃烧、外放、需要被看见。",
    traits: [
      "表达不是技能是燃料补给",
      "即时应激天然在线",
      "适合需要被看见、需要即时反馈的角色",
    ],
  },
  土: {
    dayMaster: "戊",
    element: "土",
    title: "土",
    description: "秩序感先于自由。承载、协调、把多方捏合为整体。",
    traits: [
      "多方拉扯是日常节奏不是消耗",
      "制度是你的骨骼不是牢笼",
      "适合需要统筹、承载、捏合多方力量的角色",
    ],
  },
};

// ============================================================
// 工具函数
// ============================================================

/** 从"乙巳"这样的字符串拆出天干和地支 */
function parseGanZhi(ganZhi: string): { stem: TenStem; branch: TwelveBranch } {
  if (ganZhi.length < 2) {
    throw new Error(`Invalid GanZhi string: ${ganZhi}`);
  }
  return {
    stem: ganZhi.charAt(0) as TenStem,
    branch: ganZhi.charAt(1) as TwelveBranch,
  };
}

// ============================================================
// 核心计算函数
// ============================================================

/**
 * 计算八字 + 日主五行。
 * 纯客户端执行——动态 import lunar-javascript。
 */
export async function calculateBazi(input: BirthdayInput): Promise<BaziResult> {
  const { year, month, day, hour, minute } = input;

  // 动态 import 避免 SSR 时加载 CommonJS 模块
  const lunar = await import("lunar-javascript");

  // Solar → Lunar → EightChar
  const solar = lunar.Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunarDate = solar.getLunar();
  const eightChar = lunarDate.getEightChar();

  const yearGZ = eightChar.getYear();
  const monthGZ = eightChar.getMonth();
  const dayGZ = eightChar.getDay();
  const timeGZ = eightChar.getTime();
  const dayGan = eightChar.getDayGan() as TenStem;

  const yearParsed = parseGanZhi(yearGZ);
  const monthParsed = parseGanZhi(monthGZ);
  const dayParsed = parseGanZhi(dayGZ);
  const timeParsed = parseGanZhi(timeGZ);

  const yearPillar: Pillar = { stem: yearParsed.stem, branch: yearParsed.branch, fullName: yearGZ };
  const monthPillar: Pillar = { stem: monthParsed.stem, branch: monthParsed.branch, fullName: monthGZ };
  const dayPillar: Pillar = { stem: dayParsed.stem, branch: dayParsed.branch, fullName: dayGZ };
  const hourPillar: Pillar = { stem: timeParsed.stem, branch: timeParsed.branch, fullName: timeGZ };

  const dayElement = STEM_ELEMENT_MAP[dayGan];

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayMaster: dayGan,
    dayElement,
  };
}

/**
 * 获取日主特征描述
 */
export function getDayMasterInfo(element: FiveElement): DayMasterInfo {
  return { ...DAY_MASTER_INFO[element] };
}

/**
 * 同步版本——仅用于测试环境（Node.js require）。
 * 生产环境请使用异步 calculateBazi()。
 */
export async function validateBazi(
  birthDate: Date,
  expectedDayGan: TenStem,
  expectedYearStem?: TenStem
): Promise<{ passed: boolean; actual: BaziResult; message: string }> {
  const input: BirthdayInput = {
    year: birthDate.getFullYear(),
    month: birthDate.getMonth() + 1,
    day: birthDate.getDate(),
    hour: birthDate.getHours(),
    minute: birthDate.getMinutes(),
  };

  const result = await calculateBazi(input);
  const mismatches: string[] = [];

  if (result.dayMaster !== expectedDayGan) {
    mismatches.push(`日主: expected ${expectedDayGan}, got ${result.dayMaster}`);
  }

  if (expectedYearStem && result.yearPillar.stem !== expectedYearStem) {
    mismatches.push(`年干: expected ${expectedYearStem}, got ${result.yearPillar.stem}`);
  }

  if (mismatches.length > 0) {
    return {
      passed: false,
      actual: result,
      message: `FAILED: ${mismatches.join("; ")}`,
    };
  }

  return {
    passed: true,
    actual: result,
    message: `PASSED: 日主=${result.dayMaster}, 日柱=${result.dayPillar.fullName}, 五行=${result.dayElement}`,
  };
}
