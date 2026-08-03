"use client";

import { useState } from "react";
import type { BirthdayInput } from "@/lib/types";

interface Props {
  onSubmit: (input: BirthdayInput) => void;
  isLoading: boolean;
}

export default function BirthdayForm({ onSubmit, isLoading }: Props) {
  const now = new Date();
  const [year, setYear] = useState(2000);
  const [month, setMonth] = useState(6);
  const [day, setDay] = useState(15);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [unknownTime, setUnknownTime] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      year,
      month,
      day,
      hour: unknownTime ? 12 : hour,
      minute: unknownTime ? 0 : minute,
    });
  };

  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 日期 */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-stone-500 mb-1">年</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            min={1900}
            max={2100}
            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-center text-lg font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-stone-500 mb-1">月</label>
          <input
            type="number"
            value={month}
            onChange={(e) => {
              const m = Math.min(12, Math.max(1, Number(e.target.value)));
              setMonth(m);
              if (day > new Date(year, m, 0).getDate()) {
                setDay(new Date(year, m, 0).getDate());
              }
            }}
            min={1}
            max={12}
            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-center text-lg font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-stone-500 mb-1">日</label>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(Math.min(daysInMonth, Math.max(1, Number(e.target.value))))}
            min={1}
            max={daysInMonth}
            className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-center text-lg font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300"
            required
          />
        </div>
      </div>

      {/* 时间 */}
      <div>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={unknownTime}
            onChange={(e) => setUnknownTime(e.target.checked)}
            className="rounded border-stone-300 text-stone-800 focus:ring-stone-300"
          />
          <span className="text-sm text-stone-500">未知出生时间（默认午时）</span>
        </label>

        {!unknownTime && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-stone-400 mb-1">时 (0-23)</label>
              <input
                type="number"
                value={hour}
                onChange={(e) => setHour(Math.min(23, Math.max(0, Number(e.target.value))))}
                min={0}
                max={23}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-center text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-400 mb-1">分 (0-59)</label>
              <input
                type="number"
                value={minute}
                onChange={(e) => setMinute(Math.min(59, Math.max(0, Number(e.target.value))))}
                min={0}
                max={59}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-center text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300"
              />
            </div>
          </div>
        )}
      </div>

      {/* 提交 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-stone-800 text-white py-3 font-medium text-lg hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "计算中..." : "查看我的日主五行"}
      </button>

      <p className="text-xs text-stone-400 text-center">
        所有计算在浏览器本地完成，不上传任何个人信息
      </p>
    </form>
  );
}
