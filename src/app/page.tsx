"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import BirthdayForm from "@/components/home/BirthdayForm";
import BaziPillarsTable from "@/components/shared/BaziPillarsTable";
import DayMasterCard from "@/components/shared/DayMasterCard";
import type { BirthdayInput, BaziResult, DayMasterInfo } from "@/lib/types";
import { calculateBazi, getDayMasterInfo } from "@/lib/bazi";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [baziResult, setBaziResult] = useState<BaziResult | null>(null);
  const [dayMasterInfo, setDayMasterInfo] = useState<DayMasterInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (input: BirthdayInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await calculateBazi(input);
      setBaziResult(result);
      setDayMasterInfo(getDayMasterInfo(result.dayElement));

      // 将日主结果存入 sessionStorage，供 report 页使用
      sessionStorage.setItem("bazi_dayMaster", result.dayMaster);
      sessionStorage.setItem("bazi_dayElement", result.dayElement);
      sessionStorage.setItem("bazi_pillars", JSON.stringify({
        year: result.yearPillar.fullName,
        month: result.monthPillar.fullName,
        day: result.dayPillar.fullName,
        hour: result.hourPillar.fullName,
      }));
    } catch (e) {
      setError("计算失败，请检查输入的日期是否正确。");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUnlockReport = () => {
    router.push("/report");
  };

  return (
    <div className="space-y-8">
      {/* 标题区 */}
      <section className="text-center space-y-3">
        <h1 className="text-2xl font-bold tracking-wide text-stone-900">
          三分钟查出你的日主五行
        </h1>
        <p className="text-stone-500 max-w-md mx-auto leading-relaxed">
          MBTI 测的是你想成为谁，日主看的是你本来就是什么。前者填问卷，后者只查出生日。
        </p>
      </section>

      {/* 表单 */}
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <BirthdayForm onSubmit={handleSubmit} isLoading={isLoading} />
        {error && (
          <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>

      {/* 结果区 */}
      {baziResult && dayMasterInfo && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* 日主卡片 */}
          <DayMasterCard info={dayMasterInfo} dayMaster={baziResult.dayMaster} />

          {/* 四柱表 */}
          <div>
            <h2 className="text-sm font-medium text-stone-500 mb-3">八字四柱</h2>
            <BaziPillarsTable bazi={baziResult} />
          </div>

          {/* 解锁按钮 */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 text-center space-y-4">
            <p className="text-stone-600">
              知道日主只是第一步。你的日主五行对照九大行业——<br />
              哪些生你、哪些克你、哪些正与你互咬。
            </p>
            <button
              onClick={handleUnlockReport}
              className="inline-flex items-center gap-2 rounded-lg bg-stone-800 text-white px-8 py-3 text-lg font-medium hover:bg-stone-700 transition-colors"
            >
              查看完整行业匹配报告
              <span className="text-stone-400 text-sm font-normal">￥9.9</span>
            </button>
            <p className="text-xs text-stone-400">
              一次付费，永久可查。所有数据在浏览器本地处理。
            </p>
          </div>
        </div>
      )}

      {/* 底部说明 */}
      {!baziResult && (
        <div className="text-center text-sm text-stone-400 space-y-1">
          <p>输入公历出生日期，即刻出结果。</p>
          <p>不知道出生时间？勾选「未知出生时间」，默认午时计算。</p>
        </div>
      )}
    </div>
  );
}
