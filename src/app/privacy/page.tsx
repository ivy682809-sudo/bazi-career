export const dynamic = "force-static";

export default function PrivacyPage() {
  return (
    <div className="max-w-xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-stone-900">隐私政策</h1>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">数据收集</h2>
        <p className="text-stone-600 leading-relaxed">
          我们不收集任何个人信息。你输入的出生日期仅在浏览器本地用于八字计算，不会被上传至任何服务器。我们无法获知也无法存储任何用户的出生日期或其他个人数据。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">本地存储</h2>
        <p className="text-stone-600 leading-relaxed">
          本网站使用浏览器的 localStorage 存储付费解锁状态——仅在你完成支付后记录「已解锁」标记，不包含任何个人身份信息。你可以随时清除浏览器数据来删除此记录。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">支付</h2>
        <p className="text-stone-600 leading-relaxed">
          支付由第三方服务「面包多」（mbd.pub）处理。支付过程中的个人信息由面包多按其隐私政策处理。我们不在网站的支付流程中接收或存储你的支付信息。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">更新日期</h2>
        <p className="text-stone-600 leading-relaxed">2026 年 8 月 3 日</p>
      </section>
    </div>
  );
}
