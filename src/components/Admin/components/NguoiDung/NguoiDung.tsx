"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import ListCard from "./components/ListCard"
import SearchBar from "./components/SearchBar"
import TableNguoiDung from "./components/TableNguoiDung"
import FilterPanel from "./components/FilterPanel"
import AddUserDialog from "./components/Dialog/AddUserDialog"
import EditUserDialog from "./components/Dialog/EditUserDialog"
import DeleteUserDialog from "./components/Dialog/DeleteUserDialog"
import { PaginationProvider, usePaginateArray } from "@/context/PaginationProvider"
import PaginationNguoiDung from "./components/PaginationNguoiDung"
import { useUser } from "./hooks/useUser"
import { IUser } from "@/apis/types"

const roleColors: Record<string, string> = {
    quan_tri: "bg-destructive text-destructive-foreground",
    bien_tap: "bg-primary text-primary-foreground",
    tac_gia: "bg-secondary text-secondary-foreground",
    doc_gia: "bg-muted text-muted-foreground",
}

const roleLabels: Record<string, string> = {
    quan_tri: "Quản trị",
    bien_tap: "Biên tập",
    tac_gia: "Tác giả",
    doc_gia: "Độc giả",
}

// Component to handle paginated table display
function TableContent({ filteredUsers, roleColors, roleLabels, onEdit, onDelete }: {
    filteredUsers: IUser[]
    roleColors: Record<string, string>
    roleLabels: Record<string, string>
    onEdit: (user: IUser) => void
    onDelete: (user: IUser) => void
}) {
    const paginatedUsers = usePaginateArray(filteredUsers)

    console.log("🔍 TableContent render:");
    console.log("  - Total filtered users:", filteredUsers.length);
    console.log("  - Paginated users:", paginatedUsers.length);
    console.log("  - Paginated users data:", paginatedUsers);

    return (
        <>
            <TableNguoiDung
                users={paginatedUsers}
                roleColors={roleColors}
                roleLabels={roleLabels}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <PaginationNguoiDung users={filteredUsers} />
        </>
    )
}

export default function NguoiDung() {
    const { users, refresh } = useUser()
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [filterRole, setFilterRole] = useState<string>("all")
    const [filterStatus, setFilterStatus] = useState<string>("all")
    const [showFilters, setShowFilters] = useState(false)

    console.log("🎯 NguoiDung component render:");
    console.log("  - Total users from hook:", users.length);
    console.log("  - Users data:", users);

    const clearFilters = () => {
        setFilterRole("all")
        setFilterStatus("all")
        setSearchQuery("")
    }

    const activeFiltersCount = [filterRole !== "all", filterStatus !== "all"].filter(Boolean).length

    const handleEdit = (user: IUser) => {
        setSelectedUser(user)
        setIsEditDialogOpen(true)
    }

    const handleDelete = (user: IUser) => {
        setSelectedUser(user)
        setIsDeleteDialogOpen(true)
    }

    const getRoleKey = (user: IUser): string => {
        if (user.role?.name === 'admin') return 'quan_tri';
        if (user.role?.name === 'editor') return 'bien_tap';
        if (user.role?.name === 'author') return 'tac_gia';
        return 'doc_gia';
    }

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())

            const roleKey = getRoleKey(user);
            const matchesRole = filterRole !== "all" ? roleKey === filterRole : true

            const matchesStatus =
                filterStatus !== "all" ? (user.active ? filterStatus === "active" : filterStatus === "inactive") : true

            return matchesSearch && matchesRole && matchesStatus
        })
    }, [users, searchQuery, filterRole, filterStatus])

    console.log("🔎 Filtered users:", filteredUsers.length);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
                    <p className="text-muted-foreground">Quản lý tài khoản và phân quyền người dùng</p>
                </div>
                <AddUserDialog onSuccess={refresh} />
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

            <PaginationProvider total={filteredUsers.length} initialPageSize={10}>
                <TableContent
                    filteredUsers={filteredUsers}
                    roleColors={roleColors}
                    roleLabels={roleLabels}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </PaginationProvider>


            <EditUserDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} user={selectedUser} onSuccess={refresh} />

            <DeleteUserDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} user={selectedUser} onSuccess={refresh} />
        </div>
    )
}
