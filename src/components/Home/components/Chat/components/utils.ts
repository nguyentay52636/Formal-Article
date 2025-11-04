
export const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [key, response] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
            return response
        }
    }

    return "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi về giờ mở cửa, món ăn, đặt bàn, hoặc liên hệ admin để được hỗ trợ tốt hơn! 😊"
}



export const botResponses: Record<string, string> = {
    "xin chào": "Xin chào! Tôi có thể giúp gì cho bạn hôm nay? 🍜",
    hello: "Hello! How can I help you today? 🍜",
    "giờ mở cửa":
        "Hầu hết các nhà hàng mở cửa từ 8:00 sáng đến 10:00 tối. Bạn có thể xem chi tiết từng nhà hàng trên trang Map.",
    "opening hours":
        "Most restaurants are open from 8:00 AM to 10:00 PM. You can check specific restaurant hours on the Map page.",
    "đặt bàn":
        "Để đặt bàn, vui lòng truy cập trang chi tiết nhà hàng và nhấn nút 'Đặt bàn'. Hoặc liên hệ trực tiếp với admin để được hỗ trợ.",
    reservation:
        "To make a reservation, please visit the restaurant detail page and click the 'Book Table' button. Or contact admin for assistance.",
    "món ăn":
        "Chúng tôi có nhiều món ăn đặc sản Sài Gòn như Phở, Bánh Mì, Cơm Tấm, Bún Bò Huế và nhiều hơn nữa! Khám phá trên trang Map.",
    dishes: "We have many Saigon specialties like Pho, Banh Mi, Com Tam, Bun Bo Hue and more! Explore on the Map page.",
    "liên hệ": "Bạn muốn liên hệ với admin? Tôi sẽ chuyển bạn đến bộ phận hỗ trợ ngay!",
    contact: "Would you like to contact admin? I'll transfer you to support right away!",
    "giúp đỡ":
        "Tôi có thể giúp bạn về: 🍜 Tìm nhà hàng, 📍 Xem bản đồ, 🎥 Xem livestream nấu ăn, 📅 Sự kiện ẩm thực, 🔍 Nhận diện món ăn bằng AI",
    help: "I can help you with: 🍜 Find restaurants, 📍 View map, 🎥 Watch cooking livestreams, 📅 Food events, 🔍 AI food recognition",
}
