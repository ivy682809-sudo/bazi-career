/**
 * 日主五行 → 职场行业推荐矩阵
 * 数据源：资源库/五行职业匹配规则.json
 * 所有推荐文案均为预写内容，零 AI 生成。
 */
import type { FiveElement, IndustryMatch } from "@/lib/types";

type ElementRecommendations = {
  best: IndustryMatch[];
  good: IndustryMatch[];
  challenging: IndustryMatch[];
};

const GOLD_RECS: ElementRecommendations = {
  best: [
    {
      industry: "后端开发",
      matchLevel: "best",
      matchScore: 95,
      reason: "金得金扶——逻辑是本能不是技能。",
      detailDescription: "后端工作不面对用户，只面对日志与监控面板。金日主入此行，如刀入鞘——敲出来的就是对的。",
      tags: ["互联网", "技术"],
    },
    {
      industry: "风控/合规",
      matchLevel: "best",
      matchScore: 92,
      reason: "金主规则与精密——风险在模型里无处藏身。",
      detailDescription: "土金相生的锁链——锁的是风险，稳的是百年。制度不是你的敌人，是你骨骼的延伸。",
      tags: ["金融", "银行"],
    },
    {
      industry: "投行建模",
      matchLevel: "best",
      matchScore: 90,
      reason: "金主定价逻辑——不是在计算，是在打磨一件金器。",
      detailDescription: "金水相生，模型即本能。投行的节奏和金日主的节律天然同频。",
      tags: ["金融", "投行"],
    },
  ],
  good: [
    {
      industry: "法律",
      matchLevel: "good",
      matchScore: 82,
      reason: "金主条文与对抗——对逻辑的信仰天然在线。",
      detailDescription: "法律行业的文本密度和论证结构与金日主的框架感高度吻合。",
      tags: ["法律", "专业服务"],
    },
    {
      industry: "数据分析",
      matchLevel: "good",
      matchScore: 80,
      reason: "金主不可见的秩序——数据里藏着你要的结构。",
      detailDescription: "在数据洪流中建立秩序，对金日主而言不是工作，是本能。",
      tags: ["互联网", "金融"],
    },
  ],
  challenging: [
    {
      industry: "前端开发",
      matchLevel: "challenging",
      matchScore: 25,
      reason: "火克金——你的精密在那里不值钱。",
      detailDescription: "前端需要瞬间审美直觉和用户共情，金日主的精密逻辑在这里是反向而行。",
      tags: ["互联网", "技术"],
    },
    {
      industry: "销售/BD",
      matchLevel: "challenging",
      matchScore: 20,
      reason: "火克金——你需要即时应激，金的节奏不在那个波段。",
      detailDescription: "成交需要燃烧和感染，金主收敛——这两种能量方向相反。",
      tags: ["销售", "商务"],
    },
  ],
};

const WOOD_RECS: ElementRecommendations = {
  best: [
    {
      industry: "VC/风险投资",
      matchLevel: "best",
      matchScore: 95,
      reason: "木主生发——投早期就是赌人，你天然知道谁会长。",
      detailDescription: "翻 BP 翻到第三页不再往下翻，不是偷懒——是已经知道这个人能不能成。木火日主在此，越赌越准。",
      tags: ["金融", "投资"],
    },
    {
      industry: "品牌/内容",
      matchLevel: "best",
      matchScore: 92,
      reason: "木得水生——品牌是种出来的，不是造出来的。",
      detailDescription: "内容创作最怕的不是写不出来——是写出来没有根。木日主的发散性在此不是弱点，是唯一正确的姿势。",
      tags: ["互联网", "内容"],
    },
    {
      industry: "教育",
      matchLevel: "best",
      matchScore: 88,
      reason: "木主生发——教书就是给种子浇水。",
      detailDescription: "木日主在教育行业不是消耗而是生长——你在讲台上每一句话都在长。",
      tags: ["教育"],
    },
  ],
  good: [
    {
      industry: "设计/创意",
      matchLevel: "good",
      matchScore: 84,
      reason: "木火通明——创意有根、有枝、有燃烧的理由。",
      detailDescription: "设计行业的本质是把抽象意念种成可感知的形态，这是木的天然能力。",
      tags: ["设计", "创意"],
    },
  ],
  challenging: [
    {
      industry: "银行/体制内",
      matchLevel: "challenging",
      matchScore: 20,
      reason: "金克木——流程即剪刀，每日修剪让你无处可长。",
      detailDescription: "木日主需要生长空间，银行和体制的流程是结构性剪刀——不是针对你，但它克制一切生长。",
      tags: ["金融", "银行"],
    },
    {
      industry: "投行",
      matchLevel: "challenging",
      matchScore: 18,
      reason: "金克木——每一笔交易都在修剪不该剪的枝杈。",
      detailDescription: "投行的精密和压缩节奏天然克制木日主的发散直觉。不是能力问题，是五行反向。",
      tags: ["金融", "投行"],
    },
  ],
};

const WATER_RECS: ElementRecommendations = {
  best: [
    {
      industry: "咨询",
      matchLevel: "best",
      matchScore: 95,
      reason: "水得金生——流动即深度，每个项目是一个新的河道。",
      detailDescription: "咨询行业就是水——每个客户是一条新河床，水日主的适应力和深度在此不是技能，是本能。",
      tags: ["咨询", "专业服务"],
    },
    {
      industry: "学术/研究",
      matchLevel: "best",
      matchScore: 90,
      reason: "水主智——越深越静，知识的底层逻辑在你那里是通的。",
      detailDescription: "水日主做学术不是在做研究——是在回到自己最舒服的水压之下。",
      tags: ["教育", "学术"],
    },
    {
      industry: "量化交易",
      matchLevel: "best",
      matchScore: 88,
      reason: "水与金相生——流动性与逻辑同频，分钟级决策是你的节奏。",
      detailDescription: "量化的即时应激和水的天然节律完全匹配——不是快，是流畅。",
      tags: ["金融", "交易"],
    },
  ],
  good: [
    {
      industry: "媒体/新闻",
      matchLevel: "good",
      matchScore: 80,
      reason: "水主流动——信息即水，渠道即河道。",
      detailDescription: "信息的采集、流转、沉淀——对水日主而言，这不是工作流程，是生存方式。",
      tags: ["媒体", "内容"],
    },
  ],
  challenging: [
    {
      industry: "大厂中台/运营",
      matchLevel: "challenging",
      matchScore: 22,
      reason: "土克水——每日站会即淤塞，流程拦住水。",
      detailDescription: "你不是在做运营——你是在被固定的节奏、固定的报表、固定的排期把水的流动性抽干。",
      tags: ["互联网", "运营"],
    },
    {
      industry: "体制内",
      matchLevel: "challenging",
      matchScore: 18,
      reason: "土克水——规则感压死流动性直觉。",
      detailDescription: "水日主在体制内不是不适——是窒息。规则不是你的工具，是坝。",
      tags: ["公务员", "体制内"],
    },
  ],
};

const FIRE_RECS: ElementRecommendations = {
  best: [
    {
      industry: "前端开发",
      matchLevel: "best",
      matchScore: 95,
      reason: "火得木生——像素级打磨不是消耗，是持续被用户反馈点燃。",
      detailDescription: "每一次 A/B 测试、每一次灰度发布——都是在给你添柴。火日主入前端，越燃越旺。",
      tags: ["互联网", "技术"],
    },
    {
      industry: "销售",
      matchLevel: "best",
      matchScore: 92,
      reason: "火主外放——成交不是交易，是燃烧的即时回响。",
      detailDescription: "一个好的销售不是说服——是点燃。火日主天然具备这种感染性的燃烧。",
      tags: ["销售", "商务"],
    },
    {
      industry: "内容/自媒体",
      matchLevel: "best",
      matchScore: 90,
      reason: "火主被看见——你的表达需要观众，这不是虚荣，是燃料。",
      detailDescription: "火日主的表达欲不是性格缺陷——是能量输出方式。只有被看见的火才不会自熄。",
      tags: ["内容", "媒体"],
    },
  ],
  good: [
    {
      industry: "市场/品牌营销",
      matchLevel: "good",
      matchScore: 84,
      reason: "火得木生——品牌在燃烧中成形。",
      detailDescription: "市场营销的本质是把信息点燃、让它传播——每一步都在给火日主续柴。",
      tags: ["互联网", "营销"],
    },
  ],
  challenging: [
    {
      industry: "后端开发",
      matchLevel: "challenging",
      matchScore: 22,
      reason: "水克火——没有观众的火会自熄，debug 就是在灭火。",
      detailDescription: "不是代码写不好——是每一次 debug 都在浇你的火。三个月才能看到效果，三周就烧干了。",
      tags: ["互联网", "技术"],
    },
    {
      industry: "风控",
      matchLevel: "challenging",
      matchScore: 18,
      reason: "水克火——火需要直觉，风控只有规则。",
      detailDescription: "火日主靠直觉做判断，风控行业只有冷冰冰的条款和流程，燃烧无处可去。",
      tags: ["金融", "银行"],
    },
  ],
};

const EARTH_RECS: ElementRecommendations = {
  best: [
    {
      industry: "产品经理",
      matchLevel: "best",
      matchScore: 95,
      reason: "土得火生——左火右金，你坐在中间是天然归宿。",
      detailDescription: "你不是在协调——你是在做土的天然工作：把火和金捏在一起。需求评审会就是你的五行主场。",
      tags: ["互联网", "产品"],
    },
    {
      industry: "运营",
      matchLevel: "best",
      matchScore: 90,
      reason: "土主捏合——多方拉扯不是消耗，是你的日常节奏。",
      detailDescription: "运营的拉扯对火日主是消耗、对水日主是窒息——但土日主天然知道什么时候按住谁、什么时候放谁过。",
      tags: ["互联网", "运营"],
    },
    {
      industry: "银行/信贷审批",
      matchLevel: "best",
      matchScore: 88,
      reason: "土金相生——流程即血脉，越稳越上。",
      detailDescription: "银行的土金环境就是为土日主设计的——层层秩序是你的安全感来源，不是压迫。",
      tags: ["金融", "银行"],
    },
  ],
  good: [
    {
      industry: "管理/行政",
      matchLevel: "good",
      matchScore: 82,
      reason: "土生金——制度不是你的敌人，是你骨骼的延伸。",
      detailDescription: "土日主在管理岗位上天然知道如何建立秩序——这不是技能，是本能。",
      tags: ["管理", "行政"],
    },
  ],
  challenging: [
    {
      industry: "初创公司（早期）",
      matchLevel: "challenging",
      matchScore: 22,
      reason: "木克土——没有流程的土壤会散，自由过头对你是失控。",
      detailDescription: "土需要框架，初创把框架抽走了——你会陷入不是在建设而是在每天重新搭架子的循环。",
      tags: ["创业", "科技"],
    },
    {
      industry: "自由职业",
      matchLevel: "challenging",
      matchScore: 18,
      reason: "木克土——土需要框架，自由把框架抽走了。",
      detailDescription: "自由职业对木火日主是释放，对土日主是虚空——你失去了可以承载的坐标系。",
      tags: ["自由职业"],
    },
  ],
};

export const RECOMMENDATIONS: Record<FiveElement, ElementRecommendations> = {
  金: GOLD_RECS,
  木: WOOD_RECS,
  水: WATER_RECS,
  火: FIRE_RECS,
  土: EARTH_RECS,
};
