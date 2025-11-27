// Layout types
export type LayoutType = 'single-column' | 'two-column-left-wide' | 'two-column-right-wide' | 'full-width'

// Icon style types
export type IconStyle = 'minimal' | 'bold' | 'filled' | 'rounded'

// Section types for drag & drop
export type SectionType = 
    | 'objective'
    | 'experience'
    | 'education'
    | 'skills'
    | 'languages'
    | 'interests'
    | 'references'
    | 'projects'
    | 'certificates'

export interface Section {
    id: SectionType
    label: string
    visible: boolean
}

// Advanced color settings
export interface ColorSettings {
    primary: string
    text: string
    background: string
    heading: string
    border: string
}

// Spacing settings
export interface SpacingSettings {
    lineHeight: number      // 1.2 - 2.0
    sectionSpacing: number  // 8 - 32px
    paddingHorizontal: number // 16 - 48px
    paddingVertical: number   // 16 - 48px
}

// Complete editor settings
export interface EditorSettings {
    layout: LayoutType
    sections: Section[]
    colors: ColorSettings
    spacing: SpacingSettings
    iconStyle: IconStyle
}

// Default settings
export const DEFAULT_SECTIONS: Section[] = [
    { id: 'objective', label: 'Mục tiêu nghề nghiệp', visible: true },
    { id: 'experience', label: 'Kinh nghiệm làm việc', visible: true },
    { id: 'education', label: 'Học vấn', visible: true },
    { id: 'skills', label: 'Kỹ năng', visible: true },
    { id: 'languages', label: 'Ngoại ngữ', visible: true },
    { id: 'interests', label: 'Sở thích', visible: true },
    { id: 'references', label: 'Người tham chiếu', visible: true },
    { id: 'projects', label: 'Dự án', visible: false },
    { id: 'certificates', label: 'Chứng chỉ', visible: false },
]

export const DEFAULT_COLORS: ColorSettings = {
    primary: '#0066CC',
    text: '#333333',
    background: '#FFFFFF',
    heading: '#0066CC',
    border: '#E5E7EB',
}

export const DEFAULT_SPACING: SpacingSettings = {
    lineHeight: 1.5,
    sectionSpacing: 24,
    paddingHorizontal: 32,
    paddingVertical: 32,
}

export const DEFAULT_SETTINGS: EditorSettings = {
    layout: 'two-column-left-wide',
    sections: DEFAULT_SECTIONS,
    colors: DEFAULT_COLORS,
    spacing: DEFAULT_SPACING,
    iconStyle: 'minimal',
}

