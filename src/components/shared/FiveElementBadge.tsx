import type { FiveElement } from "@/lib/types";

const ELEMENT_COLORS: Record<FiveElement, { bg: string; text: string; ring: string }> = {
  金: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  木: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  水: { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200" },
  火: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" },
  土: { bg: "bg-stone-100", text: "text-stone-700", ring: "ring-stone-300" },
};

interface Props {
  element: FiveElement;
  size?: "sm" | "md";
}

export default function FiveElementBadge({ element, size = "md" }: Props) {
  const c = ELEMENT_COLORS[element];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ring-1 ring-inset ${c.bg} ${c.text} ${c.ring} ${sizeClass}`}
    >
      {element}
    </span>
  );
}
