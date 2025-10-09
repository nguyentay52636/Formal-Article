import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ActivityRow, { Activity } from "./ActivityRow"

interface ActivityTableProps {
    activities: Activity[]
}

export default function ActivityTable({ activities }: ActivityTableProps) {
    return (
        <div className="rounded-lg border border-border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Người dùng</TableHead>
                        <TableHead>Hành động</TableHead>
                        <TableHead>Đối tượng</TableHead>
                        <TableHead>Chi tiết</TableHead>
                        <TableHead>Thời gian</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activities.map((activity) => (
                        <ActivityRow key={activity.id} activity={activity} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
