import { ITag } from "@/apis/types"

export type Tag = ITag

export interface TagsStats {
  totalTags: number
  totalTemplates: number
  averageTemplatesPerTag: number
  mostPopularTag: {
    name: string
    templateCount: number
  } | null
}
