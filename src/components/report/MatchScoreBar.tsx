interface Props {
  score: number;
}

export default function MatchScoreBar({ score }: Props) {
  const color =
    score >= 85
      ? "bg-emerald-500"
      : score >= 60
        ? "bg-amber-400"
        : score >= 40
          ? "bg-stone-400"
          : "bg-red-400";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-medium text-stone-500 w-8 text-right">
        {score}
      </span>
    </div>
  );
}
