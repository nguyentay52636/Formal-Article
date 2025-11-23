import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Shield, Trash2 } from 'lucide-react'
import { IUser } from '@/apis/types'

type Props = {
  users: IUser[]
  roleColors: Record<string, string>
  roleLabels: Record<string, string>
  onEdit: (user: IUser) => void
  onDelete: (user: IUser) => void
}

export default function TableNguoiDung({ users, roleColors, roleLabels, onEdit, onDelete }: Props) {
  const getRoleKey = (user: IUser): string => {
    if (user.role?.name === 'admin') return 'quan_tri';
    if (user.role?.name === 'editor') return 'bien_tap';
    if (user.role?.name === 'author') return 'tac_gia';
    return 'doc_gia';
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Người dùng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ảnh đại diện</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Số bài viết</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[100px]">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const roleKey = getRoleKey(user);
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.fullName}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.avatar?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Badge className={roleColors[roleKey] || "bg-muted text-muted-foreground"}>
                    <Shield className="mr-1 h-3 w-3" />
                    {roleLabels[roleKey] || "Độc giả"}
                  </Badge>
                </TableCell>
                <TableCell>0</TableCell>
                <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : ''}</TableCell>
                <TableCell>
                  <Badge variant={user.active ? 'default' : 'secondary'}>
                    {user.active ? 'Kích hoạt' : 'Tắt'}
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
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
