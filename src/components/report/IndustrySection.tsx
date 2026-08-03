import type { IndustryMatchGroup } from "@/lib/types";
import IndustryMatchCard from "./IndustryMatchCard";

const LEVEL_STYLES: Record<string, { border: string; bg: string; text: string }> = {
  best: {
    border: "border-l-emerald-400",
    bg: "bg-emerald-50/50",
    text: "text-emerald-700",
  },
  good: {
    border: "border-l-amber-400",
    bg: "bg-amber-50/50",
    text: "text-amber-700",
  },
  challenging: {
    border: "border-l-red-400",
    bg: "bg-red-50/50",
    text: "text-red-700",
  },
};

interface Props {
  group: IndustryMatchGroup;
}

export default function IndustrySection({ group }: Props) {
  if (group.items.length === 0) return null;

  const style = LEVEL_STYLES[group.level] || LEVEL_STYLES.good;

  return (
    <div>
      <div className={`border-l-4 ${style.border} ${style.bg} px-3 py-2 rounded-r mb-4`}>
        <h3 className={`font-semibold text-lg ${style.text}`}>{group.label}</h3>
      </div>
      <div className="space-y-3">
        {group.items.map((item) => (
          <IndustryMatchCard key={item.industry} match={item} />
        ))}
      </div>
    </div>
  );
}
