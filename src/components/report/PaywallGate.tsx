"use client";

import { useState, useEffect } from "react";
import { isReportUnlocked } from "@/lib/payment";
import UnlockButton from "./UnlockButton";

interface Props {
  children: React.ReactNode;
}

export default function PaywallGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    setUnlocked(isReportUnlocked());
  }, []);

  // 还在检查中
  if (unlocked === null) {
    return (
      <div className="text-center py-16">
        <p className="text-stone-400">加载中...</p>
      </div>
    );
  }

  // 未解锁——显示付费门
  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto py-16 space-y-8 text-center">
        <div className="space-y-3">
          <div className="text-4xl">🔒</div>
          <h2 className="text-xl font-semibold text-stone-800">
            解锁完整行业匹配报告
          </h2>
          <p className="text-stone-500 leading-relaxed">
            报告包含：最适合你的行业 × 比较合适的行业 × 需谨慎的行业，每条附五行逻辑详解与具体表现。
          </p>
        </div>

        <UnlockButton />

        <div className="text-xs text-stone-400 space-y-1">
          <p>一次付费，永久可查。浏览器本地解锁，无需登录。</p>
          <p>所有计算均在本地完成，不上传任何个人信息。</p>
        </div>
      </div>
    );
  }

  // 已解锁——渲染完整报告
  return <>{children}</>;
}
