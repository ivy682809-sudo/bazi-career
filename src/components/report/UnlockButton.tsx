"use client";

import { getPaymentUrl } from "@/lib/payment";

export default function UnlockButton() {
  const handleClick = () => {
    // 生产环境：跳转到面包多支付页
    // MVP 阶段：点击后直接模拟解锁（便于测试）
    const url = getPaymentUrl();
    if (url.includes("YOUR_PRODUCT_ID")) {
      // 开发/测试模式：模拟支付成功
      const confirmed = window.confirm(
        "【开发模式】\n\n点击「确定」模拟支付成功（生产环境将跳转至面包多支付页）。\n\n点击「取消」回到页面。"
      );
      if (confirmed) {
        window.location.href = "/report?paid=1&order_id=test_" + Date.now();
      }
    } else {
      window.location.href = url;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-lg bg-stone-800 text-white py-4 font-medium text-lg hover:bg-stone-700 transition-colors"
    >
      解锁完整报告 ￥9.9
    </button>
  );
}
