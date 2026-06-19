/**
 * Site Content Map - 维护站点内容分区与关键词标签
 * 提供简单的搜索过滤与数据检索功能
 */

const siteContentMap = {
  baseUrl: "https://m-cn-aiyouxi.com.cn",
  primaryTag: "爱游戏",
  sections: [
    {
      id: "news",
      title: "游戏资讯",
      keywords: ["爱游戏", "新闻", "更新", "活动"],
      items: [
        { id: 1, title: "夏日庆典开启", tags: ["爱游戏", "活动"] },
        { id: 2, title: "版本更新日志", tags: ["爱游戏", "更新"] }
      ]
    },
    {
      id: "guides",
      title: "攻略专区",
      keywords: ["爱游戏", "攻略", "技巧", "教程"],
      items: [
        { id: 3, title: "新手入门指南", tags: ["爱游戏", "教程"] },
        { id: 4, title: "高级技巧汇总", tags: ["爱游戏", "技巧"] }
      ]
    },
    {
      id: "community",
      title: "玩家社区",
      keywords: ["爱游戏", "论坛", "讨论", "反馈"],
      items: [
        { id: 5, title: "热门话题讨论", tags: ["爱游戏", "讨论"] },
        { id: 6, title: "建议反馈收集", tags: ["爱游戏", "反馈"] }
      ]
    }
  ]
};

/**
 * 根据关键词搜索匹配的内容项
 * @param {string} keyword - 搜索关键词
 * @returns {Array} 匹配的内容项数组
 */
function searchContentByKeyword(keyword) {
  const results = [];
  const lowerKeyword = keyword.toLowerCase();
  siteContentMap.sections.forEach(section => {
    section.items.forEach(item => {
      const hasTag = item.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));
      const titleMatch = item.title.toLowerCase().includes(lowerKeyword);
      if (hasTag || titleMatch) {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          itemId: item.id,
          title: item.title,
          tags: item.tags
        });
      }
    });
  });
  return results;
}

/**
 * 获取某个分区下的所有内容项
 * @param {string} sectionId - 分区标识
 * @returns {Array|null} 内容项列表，若分区不存在返回null
 */
function getSectionItems(sectionId) {
  const section = siteContentMap.sections.find(s => s.id === sectionId);
  return section ? section.items : null;
}

/**
 * 获取完整站点地图（包含URL和标签信息）
 * @returns {Object} 站点地图对象
 */
function getSiteMap() {
  return {
    url: siteContentMap.baseUrl,
    primaryTag: siteContentMap.primaryTag,
    sections: siteContentMap.sections.map(section => ({
      id: section.id,
      title: section.title,
      keywords: section.keywords,
      itemCount: section.items.length
    }))
  };
}

// 示例使用
const sampleResults = searchContentByKeyword("爱游戏");
console.log("搜索 '爱游戏' 的结果:", sampleResults);

const newsItems = getSectionItems("news");
console.log("资讯分区内容:", newsItems);

const map = getSiteMap();
console.log("站点地图:", map);

export { searchContentByKeyword, getSectionItems, getSiteMap, siteContentMap };