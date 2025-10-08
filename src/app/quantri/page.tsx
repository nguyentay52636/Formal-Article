export default function AdminPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Chào mừng đến với trang quản trị hệ thống
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Tổng người dùng</h3>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% từ tháng trước
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Mẫu đơn</h3>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">
                            +2 mẫu mới tuần này
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Lượt tải</h3>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">12,345</div>
                        <p className="text-xs text-muted-foreground">
                            +15.3% từ tháng trước
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Bình luận</h3>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">89</div>
                        <p className="text-xs text-muted-foreground">
                            +5 mới hôm nay
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
