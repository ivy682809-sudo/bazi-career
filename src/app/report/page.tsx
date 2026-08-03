"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PaywallGate from "@/components/report/PaywallGate";
import IndustrySection from "@/components/report/IndustrySection";
import BaziPillarsTable from "@/components/shared/BaziPillarsTable";
import DayMasterCard from "@/components/shared/DayMasterCard";
import { getStoredBaziData } from "@/lib/payment";
import { getMatchesByElement } from "@/lib/matching";
import { getDayMasterInfo } from "@/lib/bazi";
import type { FiveElement, DayMasterInfo, IndustryMatchGroup, BaziResult, Pillar, TenStem, TwelveBranch } from "@/lib/types";

export default function ReportPage() {
  const [dayMaster, setDayMaster] = useState("");
  const [dayElement, setDayElement] = useState<FiveElement | "">("");
  const [dayMasterInfo, setDayMasterInfo] = useState<DayMasterInfo | null>(null);
  const [matchGroups, setMatchGroups] = useState<IndustryMatchGroup[]>([]);
  const [baziForTable, setBaziForTable] = useState<BaziResult | null>(null);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const stored = getStoredBaziData();
    if (stored.dayMaster && stored.dayElement) {
      setDayMaster(stored.dayMaster);
      setDayElement(stored.dayElement as FiveElement);
      setDayMasterInfo(getDayMasterInfo(stored.dayElement as FiveElement));
      setMatchGroups(getMatchesByElement(stored.dayElement as FiveElement));

      // 重建四柱表数据
      if (stored.pillars) {
        setBaziForTable({
          yearPillar: { stem: stored.pillars.year[0] as TenStem, branch: stored.pillars.year[1] as TwelveBranch, fullName: stored.pillars.year },
          monthPillar: { stem: stored.pillars.month[0] as TenStem, branch: stored.pillars.month[1] as TwelveBranch, fullName: stored.pillars.month },
          dayPillar: { stem: stored.pillars.day[0] as TenStem, branch: stored.pillars.day[1] as TwelveBranch, fullName: stored.pillars.day },
          hourPillar: { stem: stored.pillars.hour[0] as TenStem, branch: stored.pillars.hour[1] as TwelveBranch, fullName: stored.pillars.hour },
          dayMaster: stored.dayMaster as TenStem,
          dayElement: stored.dayElement as FiveElement,
        });
      }

      setHasData(true);
    }
  }, []);

  if (!hasData) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-stone-500">未找到排盘数据。</p>
        <Link
          href="/"
          className="inline-block text-stone-800 underline hover:text-stone-600"
        >
          返回首页重新排盘
        </Link>
      </div>
    );
  }

  return (
    <PaywallGate>
      <div className="space-y-8">
        {/* 报告标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-stone-900">你的行业五行匹配报告</h1>
          <p className="text-stone-500 text-sm">
            日主：<span className="font-bold text-stone-800 text-lg">{dayMaster}</span>
            &nbsp;·&nbsp;五行属<span className="font-bold text-stone-800 text-lg">{dayElement}</span>
          </p>
        </div>

        {/* 日主卡片 */}
        {dayMasterInfo && (
          <DayMasterCard info={dayMasterInfo} dayMaster={dayMaster} />
        )}

        {/* 四柱表 */}
        {baziForTable && (
          <div>
            <h2 className="text-sm font-medium text-stone-500 mb-3">你的八字四柱</h2>
            <BaziPillarsTable bazi={baziForTable} />
          </div>
        )}

        {/* 行业匹配 */}
        <div className="space-y-8">
          {matchGroups.map((group) => (
            <IndustrySection key={group.level} group={group} />
          ))}
        </div>

        {/* 底部说明 */}
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-6 text-sm text-stone-500 space-y-2">
          <p className="font-medium text-stone-700">关于这份报告</p>
          <p>所有分析基于八字五行生克理论，行业匹配来源于预写规则，无 AI 生成内容。</p>
          <p>
            <strong>这不是职业建议。</strong>五行分析提供的是一个理解自己与行业关系的框架——不是判决书。最适合的行业不一定是你现在该去的，最不适合的不一定是你必须离开的。了解，然后自己做判断。
          </p>
        </div>

        {/* 返回 */}
        <div className="text-center">
          <Link href="/" className="text-sm text-stone-500 hover:text-stone-700 underline">
            返回首页
          </Link>
        </div>
      </div>
    </PaywallGate>
  );
}
