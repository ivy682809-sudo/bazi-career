import type { DayMasterInfo } from "@/lib/types";
import FiveElementBadge from "./FiveElementBadge";

interface Props {
  info: DayMasterInfo;
  dayMaster: string;
}

export default function DayMasterCard({ info, dayMaster }: Props) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-2xl font-bold text-stone-800">
          {dayMaster}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <FiveElementBadge element={info.element} />
            <span className="text-stone-500 text-sm">日主</span>
          </div>
          <p className="text-stone-800 font-medium mt-0.5">{info.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {info.traits.map((trait, i) => (
          <span key={i} className="text-sm text-stone-600 bg-stone-50 rounded-full px-3 py-1">
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
}
