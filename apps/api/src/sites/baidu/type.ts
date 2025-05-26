
/**
 * db
 */
type BaiduData = {
  id: string;
  title: string;
  jobType: jobType;
  jobInfo: string;
  description: string;
  requirements: string;
  createAt: string;
}

type jobType = 'intern' | 'campus' // 实习生 | 校园招聘


export type {
  BaiduData,
  jobType
}