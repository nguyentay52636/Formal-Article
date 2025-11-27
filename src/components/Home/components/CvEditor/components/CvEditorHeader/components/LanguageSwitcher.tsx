"use client"

interface LanguageSwitcherProps {
    language: "vi" | "en"
    onLanguageChange: (lang: "vi" | "en") => void
}

export function LanguageSwitcher({ language, onLanguageChange }: LanguageSwitcherProps) {
    return (
        <div className="flex items-center gap-2 bg-gray-700 rounded px-3 py-1.5">
            <span className="text-white text-sm">Ngôn ngữ CV:</span>
            <div className="flex gap-1">
                <button
                    onClick={() => onLanguageChange("vi")}
                    className={`w-6 h-4 rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                        language === "vi" 
                            ? "bg-red-500 text-white scale-110" 
                            : "bg-gray-500 text-gray-300 hover:bg-gray-400"
                    }`}
                    title="Tiếng Việt"
                >
                    VN
                </button>
                <button
                    onClick={() => onLanguageChange("en")}
                    className={`w-6 h-4 rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                        language === "en" 
                            ? "bg-blue-500 text-white scale-110" 
                            : "bg-gray-500 text-gray-300 hover:bg-gray-400"
                    }`}
                    title="English"
                >
                    EN
                </button>
            </div>
        </div>
    )
}
