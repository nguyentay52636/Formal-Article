import React from 'react'
import DialogAddFiles from './Dialog/DialogAddFiles'

interface HeaderTitleProps {
    isUploadDialogOpen: boolean
    setIsUploadDialogOpen: (value: boolean) => void
}
export default function HeaderTitle({ isUploadDialogOpen, setIsUploadDialogOpen }: HeaderTitleProps) {
  return (
<>
<div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý tệp tin</h1>
                    <p className="text-muted-foreground">Quản lý tất cả tệp tin tải lên hệ thống</p>
                </div>
                <DialogAddFiles
                    isUploadDialogOpen={isUploadDialogOpen}
                    setIsUploadDialogOpen={setIsUploadDialogOpen}
                    onOpenChange={setIsUploadDialogOpen}
                />
            </div>
</>
  )
}
