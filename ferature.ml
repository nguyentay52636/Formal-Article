# CV Template Detail & Editor Implementation

## Overview
This implementation adds functionality to fetch and display CV template details when users navigate to CV detail pages or click "DÙNG NGAY MẪU CV NÀY" to edit a template.

## Changes Made

### 1. Fixed `/don-xin-viec/[id]/page.tsx`
**Problem**: The page was trying to use React hooks (`useTemplate()`) in an async server component, which is not allowed.

**Solution**: 
- Removed the hook usage
- Changed to use `getTemplateById()` API function directly in the server component
- Added proper error handling with `notFound()` if template doesn't exist
- Now properly fetches template data from API: `http://localhost:8000/api/templates/{id}`

```typescript
export default async function page({ params }: CVDetailPageProps) {
    const { id } = await params
    const cv = await getTemplateById(Number(id))
    
    if (!cv) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <GeneratorCv cv={cv} />
            <RelateCVs currentCvId={cv.id} />
        </div>
    )
}
```

### 2. Updated `/chinh-sua-don/[id]/page.tsx`
**Enhancement**: Now fetches template details when users click "DÙNG NGAY MẪU CV NÀY"

**Changes**:
- Added API call to fetch template details: `getTemplateById(Number(id))`
- Added error handling with `notFound()` for invalid template IDs
- Created new `CvEditorWrapper` component to handle the template data
- Passes both `cvId` and `template` data to the editor

```typescript
export default async function page({ params }: CVEditorPageProps) {
    const { id } = await params
    
    if (!id) {
        notFound()
    }

    const template = await getTemplateById(Number(id))

    if (!template) {
        notFound()
    }

    return (
        <div className="h-screen">
            <CvEditorWrapper cvId={id} template={template} />
        </div>
    )
}
```

### 3. Created `/components/Home/components/CvEditor/CvEditorWrapper.tsx`
**Purpose**: Client component wrapper that handles template data and shows notifications

**Features**:
- Displays a toast notification when template is loaded
- Stores template metadata in localStorage for reference
- Wraps the `CvEditor` component with template data

### 4. Updated `/components/Home/components/CvEditor/CvEditor.tsx`
**Changes**:
- Added `template?: ITemplate` prop to accept template data
- Renamed internal state variable from `template` to `templateStyle` to avoid naming conflicts
- Added logic to show toast notification when starting with a template
- Updated all references to use `templateStyle` for the UI style/layout state

### 5. Simplified `/components/Home/components/GeneratorCv/GeneratorCv.tsx`
**Optimization**:
- Removed redundant API call since template data is now fetched in the server component
- Simplified component to just render `CvDetailView` with the passed template data

## API Integration

The implementation now properly calls the backend API:

```bash
curl -X 'GET' \
  'http://localhost:8000/api/templates/{id}' \
  -H 'accept: */*'
```

**Response Structure**:
```json
{
  "id": 5,
  "name": "Fullstack Developer CV - Blue Modern",
  "slug": "fullstack-modern-blue",
  "summary": "CV template hiện đại cho lập trình viên Fullstack",
  "html": "<div class='cv-container'>...</div>",
  "css": ".cv-container{...}",
  "previewUrl": "/previews/fullstack-modern-blue.png",
  "tag": {
    "id": 1,
    "name": "Sinh viên",
    "slug": "sinh-vien"
  },
  "views": 0,
  "downloads": 0,
  "createdAt": "2025-11-23 11:59:06",
  "updatedAt": "2025-11-23 11:59:06"
}
```

## User Flow

1. **View CV Details**: 
   - User navigates to `http://localhost:3000/don-xin-viec/2`
   - Server fetches template details from API
   - Displays CV details with preview, description, and features

2. **Use Template**:
   - User clicks "DÙNG NGAY MẪU CV NÀY" button
   - Navigates to `/chinh-sua-don/2`
   - Server fetches template details
   - CV Editor loads with template information
   - User sees toast notification: "Bắt đầu với mẫu CV - Sử dụng mẫu: [Template Name]"
   - Template metadata is stored in localStorage for reference

## Benefits

1. **Proper Architecture**: Server components handle data fetching, client components handle interactivity
2. **Error Handling**: Proper 404 pages for invalid template IDs
3. **Performance**: No redundant API calls, data fetched once at server level
4. **User Experience**: Toast notifications inform users about template loading
5. **Type Safety**: Full TypeScript typing throughout the implementation

## Testing

To test the implementation:

1. Start the backend server at `http://localhost:8000`
2. Start the Next.js frontend at `http://localhost:3000`
3. Navigate to `http://localhost:3000/don-xin-viec/2` (or any valid template ID)
4. Verify the CV details are displayed correctly
5. Click "DÙNG NGAY MẪU CV NÀY"
6. Verify you're redirected to the editor with template data loaded
7. Check the browser console and localStorage for template information

## Notes

- The `baseApi.ts` is already configured to use `http://localhost:8000/api` as the base URL
- Template data includes HTML and CSS that can be used for CV rendering
- The editor maintains backward compatibility with existing CV data in localStorage

image.png
ấu trúc mới:
File	Chức năng
constants.ts	makeEditable() + EDITABLE_STYLES
types.ts	Shared interfaces cho các section
SectionWrapper.tsx	Component wrapper dùng chung
CustomTemplatePreview.tsx	Render HTML template có thể chỉnh sửa
CVHeader.tsx	Header với avatar + thông tin cá nhân
ObjectiveSection.tsx	Mục tiêu nghề nghiệp
ExperienceSection.tsx	Kinh nghiệm làm việc (CRUD)
EducationSection.tsx	Học vấn (CRUD)
LanguagesSection.tsx	Ngoại ngữ (CRUD)
SkillsSection.tsx	Kỹ năng (CRUD)
InterestsSection.tsx	Sở thích (CRUD)
ReferencesSection.tsx	Người tham chiếu (CRUD)
index.ts	Export tất cả components
