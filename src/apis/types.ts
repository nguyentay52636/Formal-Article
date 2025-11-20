export interface IUser {
    id?: number,
    fullName: string,
    phone: string,
    email: string,
    password: string,
    avatar: string,
    active: boolean,
    roleId: number,
    role?: IRole,
    createdAt: string,
    updatedAt: string
}

export interface RegisterDTO {
    email: string;
    fullName: string;
    password: string;
    phone: string;
}

export interface IRole {
    id?: number,
    name: string,
    createdAt?: string,
    updatedAt?: string
}
export interface IMessage {
    id: string,
    roomId: string,
    senderId: number,
    content: string,
    senderType: "user" | "admin" | "ai",
    type: "text" | "image" | "audio" | "video",
    fileUrl: string,
    fileSize: number,
    fileMime: string,
    replyToId: string,
    status: "sent" | "delivered" | "read" | "failed",
    createdAt: string,
    updatedAt: string,

}
export interface IRoom {
    id?: string,
    roomType: string,
    status: string,
    userId: number,
    adminId: number,
    aiEnabled?: boolean,
    createdAt: string,
    updatedAt: string,
}
export interface INotification {
    id?: number,
    title: string,
    message: string,
    type: string,
    roomId: string,
    isRead: string,
    metadata: string
    createdAt?: string,
}