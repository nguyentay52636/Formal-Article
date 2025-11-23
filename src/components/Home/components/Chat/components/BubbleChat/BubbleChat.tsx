"use client";
import { IUser } from '@/apis/types';
import React from 'react'


import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { MessageCircle } from "lucide-react";
interface IChatRoom {
    user: IUser;
    lastMessage: string;
    lastTime: string;
    unread: number;
}

const chatRooms: IChatRoom[] = [
    {
        user: {
            id: 1,
            fullName: "Nguyễn Văn A",
            phone: "0901234567",
            email: "vana@example.com",
            password: "",
            avatar: "",
            active: true,
            roleId: 2,
            createdAt: "2025-11-20",
            updatedAt: "2025-11-21"
        },
        lastMessage: "Anh ơi còn phòng không?",
        lastTime: "2025-11-23T13:40:00",
        unread: 2
    },
    {
        user: {
            id: 2,
            fullName: "Trần Thị B",
            phone: "0907654321",
            email: "tranb@example.com",
            password: "",
            avatar: "",
            active: true,
            roleId: 2,
            createdAt: "2025-09-12",
            updatedAt: "2025-10-01"
        },
        lastMessage: "Dạ cảm ơn anh nhiều ❤️",
        lastTime: "2025-11-23T12:10:00",
        unread: 0
    },
    {
        user: {
            id: 3,
            fullName: "Lê Quốc C",
            phone: "0988855222",
            email: "quocc@example.com",
            password: "",
            avatar: "",
            active: true,
            roleId: 2,
            createdAt: "2025-10-01",
            updatedAt: "2025-10-22"
        },
        lastMessage: "Ok chiều em qua xem căn nhé",
        lastTime: "2025-11-23T10:45:00",
        unread: 5
    }
];



export default function BubbleChat() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative border-none">
                <MessageCircle className="w-9 h-9 text-white cursor-pointer hover:bg-primary/60" />

                {/* Badge unread tổng */}
                {chatRooms.some((c) => c.unread > 0) && (
                    <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                        !
                    </span>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-120 max-h-150 overflow-y-auto p-2">
                <h3 className="text-sm font-semibold px-1 mb-2">Đoạn chat</h3>

                {chatRooms.map((room) => (
                    <div
                        key={room.user.id}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                            {room.user.avatar ? (
                                <img
                                    src={room.user.avatar}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-primary font-bold">
                                    {room.user.fullName.charAt(0)}
                                </span>
                            )}
                        </div>

                        {/* Nội dung */}
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-sm">
                                    {room.user.fullName}
                                </span>

                                {room.unread > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] px-2 py-[1px] rounded-full">
                                        {room.unread}
                                    </span>
                                )}
                            </div>

                            <span className="text-xs text-muted-foreground line-clamp-1">
                                {room.lastMessage}
                            </span>

                            <span className="text-[10px] text-gray-400 mt-1">
                                {new Date(room.lastTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
