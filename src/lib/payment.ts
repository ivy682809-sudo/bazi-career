/**
 * 支付模块
 * 使用面包多 (mbd.pub) no-code 支付模式。
 * MVP 阶段：用户点击链接 → 跳转支付 → 回跳后 localStorage 存解锁状态。
 */

const STORAGE_KEY = "bazi_report_unlocked";
const MBD_PAY_URL = "https://p.mbd.pub/nocode_pay"; // 面包多 no-code 支付链接

/**
 * 获取支付链接
 * 正式使用时替换 id 参数为实际商品 ID。
 */
export function getPaymentUrl(): string {
  // 开发阶段返回占位链接，正式上线前替换为面包多商品链接
  return `${MBD_PAY_URL}?id=YOUR_PRODUCT_ID`;
}

/**
 * 从 URL 参数检查是否刚完成支付
 */
export function checkUrlPayment(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("paid") === "1";
}

/**
 * 解锁报告（存 localStorage）
 */
export function unlockReport(orderId?: string): void {
  if (typeof window === "undefined") return;
  const state = {
    paid: true,
    orderId: orderId || "",
    unlockedAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * 检查报告是否已解锁
 */
export function isReportUnlocked(): boolean {
  if (typeof window === "undefined") return false;

  // 优先检查 URL 参数（刚支付回跳）
  if (checkUrlPayment()) {
    unlockReport(
      new URLSearchParams(window.location.search).get("order_id") || ""
    );
    // 清理 URL 参数，保留干净地址
    if (window.history.replaceState) {
      window.history.replaceState({}, "", window.location.pathname);
    }
    return true;
  }

  // 其次检查 localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    const state = JSON.parse(stored);
    return state.paid === true;
  } catch {
    return false;
  }
}

/**
 * 获取存储的日主数据（从 sessionStorage）
 */
export function getStoredBaziData(): {
  dayMaster: string;
  dayElement: string;
  pillars: { year: string; month: string; day: string; hour: string } | null;
} {
  if (typeof window === "undefined") {
    return { dayMaster: "", dayElement: "", pillars: null };
  }
  const dayMaster = sessionStorage.getItem("bazi_dayMaster") || "";
  const dayElement = sessionStorage.getItem("bazi_dayElement") || "";
  const pillarsStr = sessionStorage.getItem("bazi_pillars");
  const pillars = pillarsStr ? JSON.parse(pillarsStr) : null;
  return { dayMaster, dayElement, pillars };
}
