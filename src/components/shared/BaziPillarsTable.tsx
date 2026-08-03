import type { BaziResult } from "@/lib/types";

interface Props {
  bazi: BaziResult;
}

export default function BaziPillarsTable({ bazi }: Props) {
  const pillars = [
    { label: "年柱", pillar: bazi.yearPillar },
    { label: "月柱", pillar: bazi.monthPillar },
    { label: "日柱", pillar: bazi.dayPillar, highlight: true },
    { label: "时柱", pillar: bazi.hourPillar },
  ];

  return (
    <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
      <div className="grid grid-cols-4 divide-x divide-stone-100">
        {pillars.map(({ label, pillar, highlight }) => (
          <div
            key={label}
            className={`text-center py-4 ${
              highlight ? "bg-stone-50" : ""
            }`}
          >
            <div className="text-xs text-stone-400 mb-1">{label}</div>
            <div
              className={`text-xl font-bold tracking-wider ${
                highlight ? "text-stone-900" : "text-stone-600"
              }`}
            >
              {pillar.fullName}
            </div>
            <div className="text-xs text-stone-400 mt-1">
              {pillar.fullName.charAt(0)}
              {pillar.fullName.charAt(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
