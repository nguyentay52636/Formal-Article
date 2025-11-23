
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical, Pencil, Copy, Trash2 } from 'lucide-react'
interface ActionTemplateProps {
    onEdit: () => void
    onDelete: () => void
}

export default function ActionTemplate({ onEdit, onDelete }: ActionTemplateProps) {
    return (
        <>
            <div className="absolute right-3 top-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-background"
                        >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Mở menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={onEdit} className="gap-2">
                            <Pencil className="h-4 w-4" />
                            Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <Copy className="h-4 w-4" />
                            Nhân bản
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={onDelete} className="gap-2 text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Xóa
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}