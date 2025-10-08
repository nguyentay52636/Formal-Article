"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import ListCard from "./components/ListCard"
import SearchBar from "./components/SearchBar"
import TableNguoiDung, { UserItem } from "./components/TableNguoiDung"
import FilterPanel from "./components/FilterPanel"
import AddUserDialog from "./components/Dialog/AddUserDialog"
import EditUserDialog from "./components/Dialog/EditUserDialog"
import DeleteUserDialog from "./components/Dialog/DeleteUserDialog"

const users: UserItem[] = [
    {
        id: 1,
        hoTen: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        vaiTro: "quan_tri",
        kichHoat: true,
        ngayTao: "2024-01-15",
        soBaiViet: 45,
    },
    {
        id: 2,
        hoTen: "Trần Thị B",
        email: "tranthib@example.com",
        vaiTro: "bien_tap",
        kichHoat: true,
        ngayTao: "2024-02-20",
        soBaiViet: 28,
    },
    {
        id: 3,
        hoTen: "Lê Văn C",
        email: "levanc@example.com",
        vaiTro: "tac_gia",
        kichHoat: true,
        ngayTao: "2024-03-10",
        soBaiViet: 12,
    },
    {
        id: 4,
        hoTen: "Phạm Thị D",
        email: "phamthid@example.com",
        vaiTro: "doc_gia",
        kichHoat: false,
        ngayTao: "2024-04-05",
        soBaiViet: 0,
    },
]

const roleColors: Record<UserItem['vaiTro'], string> = {
    quan_tri: "bg-destructive text-destructive-foreground",
    bien_tap: "bg-primary text-primary-foreground",
    tac_gia: "bg-secondary text-secondary-foreground",
    doc_gia: "bg-muted text-muted-foreground",
}

const roleLabels: Record<UserItem['vaiTro'], string> = {
    quan_tri: "Quản trị",
    bien_tap: "Biên tập",
    tac_gia: "Tác giả",
    doc_gia: "Độc giả",
}

export default function NguoiDung() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [filterRole, setFilterRole] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [showFilters, setShowFilters] = useState(false)

    const clearFilters = () => {
        setFilterRole("all")
        setFilterStatus("all")
        setSearchQuery("")
    }

    const activeFiltersCount = [filterRole !== "all", filterStatus !== "all"].filter(Boolean).length

    const handleEdit = (user: any) => {
        setSelectedUser(user)
        setIsEditDialogOpen(true)
    }

    const handleDelete = (user: any) => {
        setSelectedUser(user)
        setIsDeleteDialogOpen(true)
    }

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.hoTen.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesRole = filterRole !== "all" ? user.vaiTro === (filterRole as UserItem['vaiTro']) : true
            const matchesStatus =
                filterStatus !== "all" ? (user.kichHoat ? filterStatus === "active" : filterStatus === "inactive") : true

            return matchesSearch && matchesRole && matchesStatus
        })
    }, [searchQuery, filterRole, filterStatus])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
                    <p className="text-muted-foreground">Quản lý tài khoản và phân quyền người dùng</p>
                </div>
                <AddUserDialog />
            </div>

            <ListCard />

            <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                activeFiltersCount={activeFiltersCount}
                onClearFilters={clearFilters}
            />

            {showFilters && (
                <FilterPanel
                    filterRole={filterRole}
                    filterStatus={filterStatus}
                    onRoleChange={setFilterRole}
                    onStatusChange={setFilterStatus}
                    onClearFilters={clearFilters}
                />
            )}

            <TableNguoiDung
                users={filteredUsers}
                roleColors={roleColors}
                roleLabels={roleLabels}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <EditUserDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} user={selectedUser} />

            <DeleteUserDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} user={selectedUser} />
        </div>
    )
}
