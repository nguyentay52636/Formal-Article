import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Shield, Trash2 } from 'lucide-react'

export type UserItem = {
  id: number
  hoTen: string
  email: string
  vaiTro: 'quan_tri' | 'bien_tap' | 'tac_gia' | 'doc_gia'
  kichHoat: boolean
  ngayTao: string
  soBaiViet: number
}

type Props = {
  users: UserItem[]
  roleColors: Record<UserItem['vaiTro'], string>
  roleLabels: Record<UserItem['vaiTro'], string>
  onEdit: (user: UserItem) => void
  onDelete: (user: UserItem) => void
}

export default function TableNguoiDung({ users, roleColors, roleLabels, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Người dùng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Số bài viết</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[100px]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{user.hoTen.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.hoTen}</span>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge className={roleColors[user.vaiTro]}>
                  <Shield className="mr-1 h-3 w-3" />
                  {roleLabels[user.vaiTro]}
                </Badge>
              </TableCell>
              <TableCell>{user.soBaiViet}</TableCell>
              <TableCell>{user.ngayTao}</TableCell>
              <TableCell>
                <Badge variant={user.kichHoat ? 'default' : 'secondary'}>
                  {user.kichHoat ? 'Kích hoạt' : 'Tắt'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(user)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
