import type { IndustryMatch } from "@/lib/types";
import MatchScoreBar from "./MatchScoreBar";

interface Props {
  match: IndustryMatch;
}

export default function IndustryMatchCard({ match }: Props) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-stone-800">{match.industry}</h4>
          <p className="text-sm text-stone-500 mt-0.5 leading-relaxed">{match.reason}</p>
        </div>
      </div>

      <MatchScoreBar score={match.matchScore} />

      <p className="text-sm text-stone-600 leading-relaxed">{match.detailDescription}</p>

      {match.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {match.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-stone-400 bg-stone-50 rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
