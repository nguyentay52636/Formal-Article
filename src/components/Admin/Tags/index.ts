// Main component
export { default as Tags } from './Tags'

// Sub components
export { default as TagsHeader } from './components/TagsHeader'
export { default as TagsList } from './components/TagsList'
export { default as TagsActions } from './components/TagsActions'
export { default as SearchAction } from './components/SearchAction'

export { default as DialogAddTags } from './components/Dialog/DialogAddTags'
export { default as DialogEditTags } from './components/Dialog/DialogEditTags'
export { default as DialogDeleteTags } from './components/Dialog/DialogDeleteTags'
export { useTagsManagement } from './hooks/useTagsManagement'

export type { Tag, TagsStats } from './types'

