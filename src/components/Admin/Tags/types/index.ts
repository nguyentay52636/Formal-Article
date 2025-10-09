export interface Tag {
  id: number
  ten: string
  duongDan: string
  soBaiViet: number
}

export interface TagsStats {
  totalTags: number
  mostPopularTag: string
  averagePostsPerTag: number
  totalUsage: number
}
