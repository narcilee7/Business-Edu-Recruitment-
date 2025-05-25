export interface Job {
  _id?: string; // ObjectId
  jobId: string; // 来源职位id
  title: string; // 职位标题
  company: {
    name: string;
    website?: string;
    industry?: string;
    size?: string;
    location?: string;
  };
  location: string;           // 工作地点
  salary?: string;            // 薪资原始字符串
  salaryMin?: number;         // 薪资下限
  salaryMax?: number;         // 薪资上限
  experience?: string;        // 经验要求
  degree?: string;            // 学历要求
  description?: string;       // 职位描述
  tags?: string[];            // 标签
  source: string;             // 来源网站
  sourceUrl: string;          // 原始链接
  crawledAt: Date;            // 爬取时间
  updatedAt?: Date;           // 页面更新时间
  createdAt: Date;            // 入库时间
}