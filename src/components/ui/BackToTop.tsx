"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            className={`fixed bottom-10 right-6 z-50 transition-all duration-300 ${visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none"
                }`}
        >
            <Button
                onClick={handleClick}

                className="rounded-full cursor-pointer bg-gradient-to-b from-[#0d83c7] to-[#0b6fb0] text-white shadow-lg hover:from-[#0b6fb0] hover:to-[#095f97] transition-all px-4! py-8!"
            >
                <ArrowUp className="h-8 w-8!" />
            </Button>
        </div>
    );
}
