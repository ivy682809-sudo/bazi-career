/**
 * 行业匹配引擎
 * 纯查表函数——根据日主五行返回预写的行业推荐。
 * 零 AI 生成，所有内容来自 recommendations.ts 预写数据。
 */
import type { FiveElement, IndustryMatch, IndustryMatchGroup } from "./types";
import { RECOMMENDATIONS } from "@/data/recommendations";

const LEVEL_LABELS: Record<string, string> = {
  best: "最适合的行业",
  good: "比较合适的行业",
  challenging: "需谨慎的行业",
};

/**
 * 获取某个日主五行的所有行业推荐（已按等级分组）
 */
export function getMatchesByElement(element: FiveElement): IndustryMatchGroup[] {
  const recs = RECOMMENDATIONS[element];

  return [
    { level: "best", label: LEVEL_LABELS.best, items: [...recs.best] },
    { level: "good", label: LEVEL_LABELS.good, items: [...recs.good] },
    { level: "challenging", label: LEVEL_LABELS.challenging, items: [...recs.challenging] },
  ];
}

/**
 * 获取适合的行业（best + good）
 */
export function getMatchedIndustries(element: FiveElement): IndustryMatch[] {
  const recs = RECOMMENDATIONS[element];
  return [...recs.best, ...recs.good].sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * 获取忌入行业
 */
export function getChallengingIndustries(element: FiveElement): IndustryMatch[] {
  const recs = RECOMMENDATIONS[element];
  return [...recs.challenging].sort((a, b) => a.matchScore - b.matchScore);
}
