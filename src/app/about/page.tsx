export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-stone-900">关于行业五行志</h1>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">这是什么</h2>
        <p className="text-stone-600 leading-relaxed">
          「行业五行志」是一个基于八字五行理论的职场匹配工具。输入你的公历出生日期，查出日主五行，对照九大行业的五行属性——判断哪些行业生你、哪些克你、哪些正与你互咬。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">八字排盘原理</h2>
        <p className="text-stone-600 leading-relaxed">
          八字（四柱）由年柱、月柱、日柱、时柱组成，各柱由天干地支表示。其中日柱的天干即为「日主」——代表你本人的五行属性。日主分十种（甲乙丙丁戊己庚辛壬癸），统归五行（金木水火土）。
        </p>
        <p className="text-stone-600 leading-relaxed">
          本工具使用开源库{" "}
          <a
            href="https://github.com/6tail/lunar-javascript"
            className="underline text-stone-800 hover:text-stone-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            lunar-javascript
          </a>{" "}
          进行八字计算。年柱以立春为界，月柱以节气为界，日柱按公历天数差推算，时柱按十二时辰分配。所有计算在浏览器本地完成，不上传任何个人信息。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">行业匹配逻辑</h2>
        <p className="text-stone-600 leading-relaxed">
          行业匹配基于五行生克理论——生我者为顺（行业属性与日主五行相生），同我者为扶（同类属性互相加强），克我者为逆（行业克制日主，持久则耗）。每个日主五行对应 6-8 个行业的匹配建议，所有文案均为预写内容，零 AI 生成。
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">免责声明</h2>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-amber-800 text-sm leading-relaxed">
            本工具提供的五行分析仅供参考，不是职业咨询建议。五行匹配旨在提供一个理解自己与行业关系的框架，不构成任何职业选择的依据。最终决定权在你手中。
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-stone-800">联系</h2>
        <p className="text-stone-600 leading-relaxed">
          在小红书搜索「行业五行志」即可找到我们的内容账号。日更八字×职场的五行分析内容。
        </p>
      </section>
    </div>
  );
}
