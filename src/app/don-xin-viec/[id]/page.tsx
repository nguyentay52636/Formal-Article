"use client"
import { CvDetailView } from "@/components/Home/components/JobApplication/components/TabsApplications/components/CurriculumVitae/CvDetailView/CvDetailView"
import { RelateCVs } from "@/components/Home/components/JobApplication/components/TabsApplications/components/CurriculumVitae/RelateCVs"
import { notFound } from "next/navigation"

const cvTemplates = [
    {
        id: "1",
        title: "Mẫu CV Chuyên Viên Logistics",
        slug: "mau-cv-chuyen-vien-logistics",
        category: "Chuyên nghiệp",
        industry: "Logistics",
        views: 6663,
        downloads: 2341,
        rating: 4.8,
        image: "/list-item/professional-cv-template-with-blue-header.jpg",
        previewImage: "list-item/professional-cv-template-with-blue-header.jpg",
        description:
            "Ví trí chuyên viên logistics hiện đang là 1 trong những ví trí hấp dẫn với người tìm việc làm bởi tính linh hoạt, cơ hội phát triển bản thân cũng như hội nhập với lĩnh vực thương mại điện từ đang bùng nổ những năm gần đây.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV chuyên viên logistics",
        features: [
            "Ví dụ thực tế cách viết CV tiếng Việt chi tiết",
            "Hỗ trợ tác tác trực quan online",
            "Tải mẫu CV xin việc về máy dạng PDF",
        ],
    },
    {
        id: "2",
        title: "Mẫu CV Nhân Viên Tư Vấn",
        slug: "mau-cv-nhan-vien-tu-van",
        category: "Thường dùng",
        industry: "Tư vấn",
        views: 7704,
        downloads: 3210,
        rating: 4.9,
        image: "/list-item/elegant-cv-template-with-professional-photo.jpg",
        previewImage: "/list-item/elegant-cv-template-with-professional-photo.jpg",
        description:
            "Mẫu CV nhân viên tư vấn chuyên nghiệp, phù hợp cho các vị trí tư vấn khách hàng, tư vấn bán hàng. Thiết kế thanh lịch, dễ đọc, tạo ấn tượng tốt với nhà tuyển dụng.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV nhân viên tư vấn",
        features: [
            "Thiết kế thanh lịch và chuyên nghiệp",
            "Phù hợp cho ngành tư vấn và bán hàng",
            "Dễ dàng tùy chỉnh thông tin cá nhân",
        ],
    },
    {
        id: "3",
        title: "Mẫu CV Giám Đốc Quản Hệ Khách Hàng Doanh Nghiệp",
        slug: "mau-cv-giam-doc-quan-he-khach-hang",
        category: "Thanh lịch",
        industry: "Kinh doanh",
        views: 2771,
        downloads: 1523,
        rating: 4.7,
        image: "/list-item/modern-cv-template-with-orange-and-dark-sections.jpg",
        previewImage: "/list-item/modern-cv-template-with-orange-and-dark-sections.jpg",
        description:
            "Mẫu CV dành cho vị trí giám đốc quản hệ khách hàng với thiết kế hiện đại, nổi bật. Phù hợp cho các vị trí quản lý cấp cao trong lĩnh vực kinh doanh và quan hệ khách hàng.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV giám đốc quản hệ khách hàng",
        features: [
            "Thiết kế hiện đại với màu sắc nổi bật",
            "Phù hợp cho vị trí quản lý cấp cao",
            "Layout chuyên nghiệp và ấn tượng",
        ],
    },
    {
        id: "4",
        title: "Mẫu CV Chuyên Viên Đào Tạo Nội Bộ",
        slug: "mau-cv-chuyen-vien-dao-tao",
        category: "Đơn giản",
        industry: "Đào tạo",
        views: 3879,
        downloads: 1876,
        rating: 4.6,
        image: "/list-item/clean-cv-template-with-simple-layout.jpg",
        previewImage: "/list-item/clean-cv-template-with-simple-layout.jpg",
        description:
            "Mẫu CV đơn giản, sạch sẽ dành cho chuyên viên đào tạo. Thiết kế tối giản giúp thông tin được trình bày rõ ràng, dễ đọc và chuyên nghiệp.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV chuyên viên đào tạo",
        features: ["Thiết kế đơn giản và dễ đọc", "Phù hợp cho ngành đào tạo và giáo dục", "Trình bày thông tin rõ ràng"],
    },
    {
        id: "5",
        title: "Mẫu CV Thu Ngân",
        slug: "mau-cv-thu-ngan",
        category: "Màu sắc",
        industry: "Bán hàng",
        views: 5410,
        downloads: 2634,
        rating: 4.8,
        image: "/list-item/colorful-cv-template-with-teal-and-orange.jpg",
        previewImage: "/list-item/colorful-cv-template-with-teal-and-orange.jpg",
        description:
            "Mẫu CV thu ngân với thiết kế màu sắc tươi sáng, năng động. Phù hợp cho các vị trí thu ngân, nhân viên bán hàng tại các cửa hàng, siêu thị.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV thu ngân",
        features: ["Thiết kế màu sắc tươi sáng và thu hút", "Phù hợp cho ngành bán lẻ", "Dễ dàng điều chỉnh màu sắc"],
    },
    {
        id: "6",
        title: "Mẫu CV Hành Chính Văn Phòng",
        slug: "mau-cv-hanh-chinh-van-phong",
        category: "Thanh lịch",
        industry: "Văn phòng",
        views: 4794,
        downloads: 2109,
        rating: 4.7,
        image: "/list-item/elegant-cv-template-with-purple-accent.jpg",
        previewImage: "/list-item/elegant-cv-template-with-purple-accent.jpg",
        description:
            "Mẫu CV thanh lịch dành cho nhân viên hành chính văn phòng. Thiết kế tinh tế với điểm nhấn màu sắc sang trọng, thể hiện sự chuyên nghiệp.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV hành chính văn phòng",
        features: [
            "Thiết kế thanh lịch và sang trọng",
            "Phù hợp cho công việc văn phòng",
            "Layout chuyên nghiệp và tinh tế",
        ],
    },
    {
        id: "7",
        title: "Mẫu CV Xin Việc Phục Vụ",
        slug: "mau-cv-phuc-vu",
        category: "Đơn giản",
        industry: "Dịch vụ",
        views: 2224,
        downloads: 1234,
        rating: 4.5,
        image: "/list-item/simple-green-cv-template.jpg",
        previewImage: "/list-item/simple-green-cv-template.jpg",
        description:
            "Mẫu CV đơn giản dành cho vị trí phục vụ. Thiết kế gọn gàng, dễ hiểu, phù hợp cho các công việc trong ngành dịch vụ, nhà hàng, khách sạn.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV phục vụ",
        features: ["Thiết kế đơn giản và gọn gàng", "Phù hợp cho ngành dịch vụ", "Dễ dàng tùy chỉnh"],
    },
    {
        id: "8",
        title: "Mẫu CV Quản Trị Kinh Doanh",
        slug: "mau-cv-quan-tri-kinh-doanh",
        category: "Thanh lịch",
        industry: "Kinh doanh",
        views: 2443,
        downloads: 1543,
        rating: 4.8,
        image: "/list-item/professional-cv-with-green-sidebar.jpg",
        previewImage: "/list-item/professional-cv-with-green-sidebar.jpg",
        description:
            "Mẫu CV quản trị kinh doanh với thiết kế chuyên nghiệp, bố cục rõ ràng. Phù hợp cho các vị trí quản lý và điều hành trong lĩnh vực kinh doanh.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV quản trị kinh doanh",
        features: ["Thiết kế chuyên nghiệp và rõ ràng", "Phù hợp cho vị trí quản lý", "Layout tối ưu cho kinh doanh"],
    },
    {
        id: "9",
        title: "Mẫu CV Xin Việc Ngành Máy",
        slug: "mau-cv-nganh-may",
        category: "Truyền thống",
        industry: "Kỹ thuật",
        views: 2139,
        downloads: 987,
        rating: 4.6,
        image: "/list-item/technical-cv-template-with-red-accents.jpg",
        previewImage: "/list-item/technical-cv-template-with-red-accents.jpg",
        description:
            "Mẫu CV truyền thống dành cho ngành máy và kỹ thuật. Thiết kế vững chắc, chuyên nghiệp, phù hợp cho các vị trí kỹ sư cơ khí, kỹ thuật.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV ngành máy",
        features: ["Thiết kế truyền thống và vững chắc", "Phù hợp cho ngành kỹ thuật", "Layout chuẩn mực"],
    },
    {
        id: "10",
        title: "Mẫu CV Xin Việc Ngành Cơ Điện Tử",
        slug: "mau-cv-co-dien-tu",
        category: "Đơn giản",
        industry: "Công nghệ",
        views: 1527,
        downloads: 876,
        rating: 4.7,
        image: "/list-item/modern-cv-with-blue-layout.jpg",
        previewImage: "/list-item/modern-cv-with-blue-layout.jpg",
        description:
            "Mẫu CV hiện đại dành cho ngành cơ điện tử. Thiết kế đơn giản nhưng tinh tế, phù hợp cho các vị trí kỹ sư điện tử, kỹ thuật viên.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV cơ điện tử",
        features: ["Thiết kế hiện đại và tinh tế", "Phù hợp cho ngành công nghệ", "Dễ đọc và chuyên nghiệp"],
    },
    {
        id: "11",
        title: "Mẫu CV Xin Việc Ngành Nông Nghiệp",
        slug: "mau-cv-nong-nghiep",
        category: "Thường hiệu",
        industry: "Nông nghiệp",
        views: 585,
        downloads: 432,
        rating: 4.5,
        image: "/list-item/cv-template-with-red-and-white-design.jpg",
        previewImage: "/list-item/cv-template-with-red-and-white-design.jpg",
        description:
            "Mẫu CV dành cho ngành nông nghiệp với thiết kế đơn giản, dễ hiểu. Phù hợp cho các vị trí kỹ thuật viên, chuyên viên nông nghiệp.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV nông nghiệp",
        features: ["Thiết kế đơn giản và dễ hiểu", "Phù hợp cho ngành nông nghiệp", "Trình bày thông tin rõ ràng"],
    },
    {
        id: "12",
        title: "Mẫu CV Xin Việc Điều Dưỡng",
        slug: "mau-cv-dieu-duong",
        category: "Màu sắc",
        industry: "Y tế",
        views: 1614,
        downloads: 923,
        rating: 4.8,
        image: "/list-item/healthcare-cv-with-professional-layout.jpg",
        previewImage: "/list-item/healthcare-cv-with-professional-layout.jpg",
        description:
            "Mẫu CV điều dưỡng với thiết kế chuyên nghiệp và màu sắc nhẹ nhàng. Phù hợp cho các vị trí điều dưỡng, y tá, nhân viên y tế.",
        language: "Tiếng Việt",
        usage: "CV mẫu Tiếng Việt",
        design: "Mẫu CV điều dưỡng",
        features: ["Thiết kế chuyên nghiệp và nhẹ nhàng", "Phù hợp cho ngành y tế", "Layout chuẩn mực và dễ đọc"],
    },
]

interface CVDetailPageProps {
    params: {
        id: string
    }
}

export default async function page({ params }: CVDetailPageProps) {
    const { id } = await params
    const cv = cvTemplates.find((t) => t.id === id)

    if (!cv) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <CvDetailView cv={cv} />
            <RelateCVs currentCvId={cv.id} />
        </div>
    )
}
