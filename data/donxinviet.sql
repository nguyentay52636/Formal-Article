-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 03, 2025 lúc 09:08 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `donxinviec`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bai_viet`
--

CREATE TABLE `bai_viet` (
  `id` bigint(20) NOT NULL,
  `danh_muc_id` bigint(20) NOT NULL,
  `tac_gia_id` bigint(20) NOT NULL,
  `duong_dan` varchar(180) NOT NULL,
  `tieu_de` varchar(220) NOT NULL,
  `tom_tat` varchar(300) DEFAULT NULL,
  `noi_dung_html` longtext DEFAULT NULL,
  `trang_thai` enum('nhap','xuat_ban','luu_tru') DEFAULT 'nhap',
  `ngay_xuat_ban` datetime DEFAULT NULL,
  `anh_dai_dien_id` bigint(20) DEFAULT NULL,
  `thong_tin_bo_sung` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`thong_tin_bo_sung`)),
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bai_viet_tep_tin`
--

CREATE TABLE `bai_viet_tep_tin` (
  `id` bigint(20) NOT NULL,
  `bai_viet_id` bigint(20) NOT NULL,
  `tep_tin_id` bigint(20) NOT NULL,
  `loai_lien_ket` enum('anh_dai_dien','tep_dinh_kem') NOT NULL,
  `thu_tu` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bai_viet_the`
--

CREATE TABLE `bai_viet_the` (
  `bai_viet_id` bigint(20) NOT NULL,
  `the_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binh_luan`
--

CREATE TABLE `binh_luan` (
  `id` bigint(20) NOT NULL,
  `bai_viet_id` bigint(20) NOT NULL,
  `nguoi_dung_id` bigint(20) DEFAULT NULL,
  `ten_khach` varchar(120) DEFAULT NULL,
  `email_khach` varchar(160) DEFAULT NULL,
  `noi_dung` text NOT NULL,
  `trang_thai` enum('cho_duyet','da_duyet','spam','xoa') DEFAULT 'cho_duyet',
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_muc`
--

CREATE TABLE `danh_muc` (
  `id` bigint(20) NOT NULL,
  `danh_muc_cha` bigint(20) DEFAULT NULL,
  `duong_dan` varchar(160) NOT NULL,
  `ten` varchar(160) NOT NULL,
  `mo_ta` text DEFAULT NULL,
  `thu_tu` int(11) NOT NULL DEFAULT 0,
  `kich_hoat` tinyint(1) NOT NULL DEFAULT 1,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khoi_noi_bat`
--

CREATE TABLE `khoi_noi_bat` (
  `id` bigint(20) NOT NULL,
  `ma` varchar(80) NOT NULL,
  `ten` varchar(160) NOT NULL,
  `cau_hinh` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cau_hinh`)),
  `kich_hoat` tinyint(1) NOT NULL DEFAULT 1,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_su_hoat_dong`
--

CREATE TABLE `lich_su_hoat_dong` (
  `id` bigint(20) NOT NULL,
  `nguoi_thuc_hien_id` bigint(20) DEFAULT NULL,
  `doi_tuong` enum('bai_viet','danh_muc','tep_tin','binh_luan','noi_bat') NOT NULL,
  `doi_tuong_id` bigint(20) NOT NULL,
  `hanh_dong` varchar(60) NOT NULL,
  `truoc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`truoc`)),
  `sau` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`sau`)),
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `id` bigint(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ho_ten` varchar(120) DEFAULT NULL,
  `vai_tro` enum('quan_tri','bien_tap','tac_gia','doc_gia') DEFAULT 'tac_gia',
  `kich_hoat` tinyint(1) NOT NULL DEFAULT 1,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `noi_bat_bai_viet`
--

CREATE TABLE `noi_bat_bai_viet` (
  `id` bigint(20) NOT NULL,
  `khoi_id` bigint(20) NOT NULL,
  `bai_viet_id` bigint(20) NOT NULL,
  `thu_tu` int(11) NOT NULL DEFAULT 0,
  `ghi_chu` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_ung`
--

CREATE TABLE `phan_ung` (
  `id` bigint(20) NOT NULL,
  `bai_viet_id` bigint(20) NOT NULL,
  `nguoi_dung_id` bigint(20) DEFAULT NULL,
  `loai` enum('thich','sao','huu_ich') NOT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_lieu_da_luu`
--

CREATE TABLE `tai_lieu_da_luu` (
  `id` bigint(20) NOT NULL,
  `nguoi_dung_id` bigint(20) NOT NULL,
  `bai_viet_id` bigint(20) NOT NULL,
  `tep_tin_id` bigint(20) DEFAULT NULL,
  `ngay_luu` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tep_tin`
--

CREATE TABLE `tep_tin` (
  `id` bigint(20) NOT NULL,
  `nguoi_tai_id` bigint(20) NOT NULL,
  `loai` enum('anh','tai_lieu','khac') NOT NULL,
  `dinh_dang` varchar(100) NOT NULL,
  `ten_tap_tin` varchar(255) NOT NULL,
  `kich_thuoc` int(11) NOT NULL,
  `duong_dan_luu` varchar(500) NOT NULL,
  `chieu_rong` int(11) DEFAULT NULL,
  `chieu_cao` int(11) DEFAULT NULL,
  `ngay_tao` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `the`
--

CREATE TABLE `the` (
  `id` bigint(20) NOT NULL,
  `duong_dan` varchar(160) NOT NULL,
  `ten` varchar(160) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thong_ke_bai_viet`
--

CREATE TABLE `thong_ke_bai_viet` (
  `bai_viet_id` bigint(20) NOT NULL,
  `luot_xem` bigint(20) NOT NULL DEFAULT 0,
  `luot_tai` bigint(20) NOT NULL DEFAULT 0,
  `so_binh_luan` bigint(20) NOT NULL DEFAULT 0,
  `lan_xem_cuoi` datetime DEFAULT NULL,
  `lan_tai_cuoi` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bai_viet`
--
ALTER TABLE `bai_viet`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `duong_dan` (`duong_dan`),
  ADD KEY `tac_gia_id` (`tac_gia_id`),
  ADD KEY `idx_bai_viet_dm_tt` (`danh_muc_id`,`trang_thai`,`ngay_xuat_ban`);

--
-- Chỉ mục cho bảng `bai_viet_tep_tin`
--
ALTER TABLE `bai_viet_tep_tin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bai_viet_id` (`bai_viet_id`),
  ADD KEY `tep_tin_id` (`tep_tin_id`);

--
-- Chỉ mục cho bảng `bai_viet_the`
--
ALTER TABLE `bai_viet_the`
  ADD PRIMARY KEY (`bai_viet_id`,`the_id`),
  ADD KEY `the_id` (`the_id`);

--
-- Chỉ mục cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bai_viet_id` (`bai_viet_id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Chỉ mục cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `duong_dan` (`duong_dan`),
  ADD KEY `danh_muc_cha` (`danh_muc_cha`);

--
-- Chỉ mục cho bảng `khoi_noi_bat`
--
ALTER TABLE `khoi_noi_bat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ma` (`ma`);

--
-- Chỉ mục cho bảng `lich_su_hoat_dong`
--
ALTER TABLE `lich_su_hoat_dong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_thuc_hien_id` (`nguoi_thuc_hien_id`);

--
-- Chỉ mục cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `noi_bat_bai_viet`
--
ALTER TABLE `noi_bat_bai_viet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `khoi_id` (`khoi_id`),
  ADD KEY `bai_viet_id` (`bai_viet_id`);

--
-- Chỉ mục cho bảng `phan_ung`
--
ALTER TABLE `phan_ung`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bai_viet_id` (`bai_viet_id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Chỉ mục cho bảng `tai_lieu_da_luu`
--
ALTER TABLE `tai_lieu_da_luu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nguoi_dung_id` (`nguoi_dung_id`,`bai_viet_id`),
  ADD KEY `bai_viet_id` (`bai_viet_id`),
  ADD KEY `tep_tin_id` (`tep_tin_id`);

--
-- Chỉ mục cho bảng `tep_tin`
--
ALTER TABLE `tep_tin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_tai_id` (`nguoi_tai_id`);

--
-- Chỉ mục cho bảng `the`
--
ALTER TABLE `the`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `duong_dan` (`duong_dan`);

--
-- Chỉ mục cho bảng `thong_ke_bai_viet`
--
ALTER TABLE `thong_ke_bai_viet`
  ADD PRIMARY KEY (`bai_viet_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bai_viet`
--
ALTER TABLE `bai_viet`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `bai_viet_tep_tin`
--
ALTER TABLE `bai_viet_tep_tin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `khoi_noi_bat`
--
ALTER TABLE `khoi_noi_bat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `lich_su_hoat_dong`
--
ALTER TABLE `lich_su_hoat_dong`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `noi_bat_bai_viet`
--
ALTER TABLE `noi_bat_bai_viet`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `phan_ung`
--
ALTER TABLE `phan_ung`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tai_lieu_da_luu`
--
ALTER TABLE `tai_lieu_da_luu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tep_tin`
--
ALTER TABLE `tep_tin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `the`
--
ALTER TABLE `the`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bai_viet`
--
ALTER TABLE `bai_viet`
  ADD CONSTRAINT `bai_viet_ibfk_1` FOREIGN KEY (`danh_muc_id`) REFERENCES `danh_muc` (`id`),
  ADD CONSTRAINT `bai_viet_ibfk_2` FOREIGN KEY (`tac_gia_id`) REFERENCES `nguoi_dung` (`id`);

--
-- Các ràng buộc cho bảng `bai_viet_tep_tin`
--
ALTER TABLE `bai_viet_tep_tin`
  ADD CONSTRAINT `bai_viet_tep_tin_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bai_viet_tep_tin_ibfk_2` FOREIGN KEY (`tep_tin_id`) REFERENCES `tep_tin` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `bai_viet_the`
--
ALTER TABLE `bai_viet_the`
  ADD CONSTRAINT `bai_viet_the_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bai_viet_the_ibfk_2` FOREIGN KEY (`the_id`) REFERENCES `the` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  ADD CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`);

--
-- Các ràng buộc cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  ADD CONSTRAINT `danh_muc_ibfk_1` FOREIGN KEY (`danh_muc_cha`) REFERENCES `danh_muc` (`id`);

--
-- Các ràng buộc cho bảng `lich_su_hoat_dong`
--
ALTER TABLE `lich_su_hoat_dong`
  ADD CONSTRAINT `lich_su_hoat_dong_ibfk_1` FOREIGN KEY (`nguoi_thuc_hien_id`) REFERENCES `nguoi_dung` (`id`);

--
-- Các ràng buộc cho bảng `noi_bat_bai_viet`
--
ALTER TABLE `noi_bat_bai_viet`
  ADD CONSTRAINT `noi_bat_bai_viet_ibfk_1` FOREIGN KEY (`khoi_id`) REFERENCES `khoi_noi_bat` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `noi_bat_bai_viet_ibfk_2` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `phan_ung`
--
ALTER TABLE `phan_ung`
  ADD CONSTRAINT `phan_ung_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `phan_ung_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`);

--
-- Các ràng buộc cho bảng `tai_lieu_da_luu`
--
ALTER TABLE `tai_lieu_da_luu`
  ADD CONSTRAINT `tai_lieu_da_luu_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tai_lieu_da_luu_ibfk_2` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tai_lieu_da_luu_ibfk_3` FOREIGN KEY (`tep_tin_id`) REFERENCES `tep_tin` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `tep_tin`
--
ALTER TABLE `tep_tin`
  ADD CONSTRAINT `tep_tin_ibfk_1` FOREIGN KEY (`nguoi_tai_id`) REFERENCES `nguoi_dung` (`id`);

--
-- Các ràng buộc cho bảng `thong_ke_bai_viet`
--
ALTER TABLE `thong_ke_bai_viet`
  ADD CONSTRAINT `thong_ke_bai_viet_ibfk_1` FOREIGN KEY (`bai_viet_id`) REFERENCES `bai_viet` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
