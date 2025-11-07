"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
  
export function   JobApplicationFilter() {
  const [language, setLanguage] = useState<"vi" | "en">("vi")
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest")

  return (
    <div className="mb-8">
      {/* Language Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${language === "vi" ? "border-primary text-primary" : "border-transparent"
            }`}
          onClick={() => setLanguage("vi")}
        >
          Tiếng Việt
        </Button>
        <Button
          variant="ghost"
          className={`rounded-none border-b-2 ${language === "en" ? "border-primary text-primary" : "border-transparent"
            }`}
          onClick={() => setLanguage("en")}
        >
          Tiếng Anh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Theo ngành nghề" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="logistics">Chuyên nghiệp</SelectItem>
              <SelectItem value="hr">Nhân viên tư vấn</SelectItem>
              <SelectItem value="hotel">Giám đốc quản lý</SelectItem>
              <SelectItem value="business">Kinh doanh</SelectItem>
              <SelectItem value="admin">Hành chính văn phòng</SelectItem>
              <SelectItem value="it">Công nghệ thông tin</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Theo vị trí làm việc" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="intern">Thực tập</SelectItem>
              <SelectItem value="fresher">Mới tốt nghiệp</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="leader">Trưởng nhóm</SelectItem>
              <SelectItem value="manager">Quản lý</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Theo thiết kế" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Hiện đại</SelectItem>
              <SelectItem value="professional">Chuyên nghiệp</SelectItem>
              <SelectItem value="creative">Sáng tạo</SelectItem>
              <SelectItem value="simple">Đơn giản</SelectItem>
              <SelectItem value="colorful">Màu sắc</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <RadioGroup
          value={sortBy}
          onValueChange={(value) => setSortBy(value as "latest" | "popular")}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="latest" id="latest" />
            <Label htmlFor="latest" className="cursor-pointer">
              Mới cập nhật
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="popular" id="popular" />
            <Label htmlFor="popular" className="cursor-pointer">
              Được dùng nhiều nhất
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
