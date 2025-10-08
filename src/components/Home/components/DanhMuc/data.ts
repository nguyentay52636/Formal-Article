import { CategoryItem } from "./components/TableDanhMuc";

export const categories: CategoryItem[] = [
    {
        id: 1,
        ten: "Đơn xin việc",
        duongDan: "don-xin-viec",
        danhMucCha: null,
        moTa: "Các mẫu đơn xin việc cho nhiều ngành nghề",
        thuTu: 1,
        kichHoat: true,
        soBaiViet: 45,
    },
    {
        id: 2,
        ten: "Đơn xin việc IT",
        duongDan: "don-xin-viec-it",
        danhMucCha: "Đơn xin việc",
        moTa: "Mẫu đơn xin việc chuyên ngành công nghệ thông tin",
        thuTu: 1,
        kichHoat: true,
        soBaiViet: 12,
    },
    {
        id: 3,
        ten: "Đơn xin nghỉ",
        duongDan: "don-xin-nghi",
        danhMucCha: null,
        moTa: "Các mẫu đơn xin nghỉ phép, nghỉ việc",
        thuTu: 2,
        kichHoat: true,
        soBaiViet: 28,
    },
]