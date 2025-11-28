// "use client"

// import { useState } from "react"
// import { Search, FileText, ImageIcon, File } from "lucide-react"
// import TableFiles from "./components/TableFiles"
// import DialogViewDetailsFiles from "./components/Dialog/DialogViewDetailsFiles"
// import DialogConfirmFile from "./components/Dialog/DialogConfirmFile"
// import { PaginationProvider } from "@/context/PaginationProvider"
// import PaginationFiles from "../../Tags/components/PaginationFiles"
// import SearchAction from "./components/SearchAction"
// import HeaderTitle from "./components/HeaderTitle"


// export const fileTypeLabels = {
//     anh: "Ảnh",
//     tai_lieu: "Tài liệu",
//     khac: "Khác",
// }

// export const fileTypeIcons = {
//     anh: ImageIcon,
//     tai_lieu: FileText,
//     khac: File,
// }

// const files = [
//     {
//         id: 1,
//         tenTapTin: "mau-don-xin-viec-it.docx",
//         loai: "tai_lieu",
//         dinhDang: "docx",
//         kichThuoc: 45678,
//         nguoiTai: "Nguyễn Văn A",
//         luotTai: 234,
//         ngayTao: "2025-01-15",
//     },
//     {
//         id: 2,
//         tenTapTin: "anh-dai-dien-bai-viet.jpg",
//         loai: "anh",
//         dinhDang: "jpg",
//         kichThuoc: 123456,
//         nguoiTai: "Trần Thị B",
//         luotTai: 0,
//         ngayTao: "2025-01-14",
//     },
//     {
//         id: 3,
//         tenTapTin: "don-xin-nghi-phep.pdf",
//         loai: "tai_lieu",
//         dinhDang: "pdf",
//         kichThuoc: 89012,
//         nguoiTai: "Lê Văn C",
//         luotTai: 156,
//         ngayTao: "2025-01-13",
//     },
// ]

// export default function TepTin() {
//     const [searchQuery, setSearchQuery] = useState("")
//     const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//     const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
//     const [selectedFile, setSelectedFile] = useState<any>(null)

//     const handleDelete = (file: any) => {
//         setSelectedFile(file)
//         setIsDeleteDialogOpen(true)
//     }

//     const handleView = (file: any) => {
//         setSelectedFile(file)
//         setIsViewDialogOpen(true)
//     }

//     return (
//         <div className="space-y-6">
//             <HeaderTitle
//                 isUploadDialogOpen={isUploadDialogOpen}
//                 setIsUploadDialogOpen={setIsUploadDialogOpen}
//             />

//             <SearchAction
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//             />
//             <TableFiles
//                 files={files}
//                 handleView={handleView}
//                 handleDelete={handleDelete}
//             />
//             <PaginationProvider total={files.length}>
//                 <PaginationFiles tags={files} />
//             </PaginationProvider>

//             <DialogViewDetailsFiles
//                 open={isViewDialogOpen}
//                 setIsViewDialogOpen={setIsViewDialogOpen}
//                 onOpenChange={setIsViewDialogOpen}
//                 selectedFile={selectedFile}
//             />

//             <DialogConfirmFile
//                 isDeleteDialogOpen={isDeleteDialogOpen}
//                 open={isDeleteDialogOpen}
//                 setIsDeleteDialogOpen={setIsDeleteDialogOpen}
//                 onOpenChange={setIsDeleteDialogOpen}
//                 selectedFile={selectedFile}
//             />
//         </div>
//     )
// }
