import WebImage from "@/public/assets/img-card.jpg";

const orders = [
    {
        id: 1,
        orderNum: "001248",
        image: WebImage,
        name: "مروان سالم",
        description: "example@gmail.com",
        price: "$59.99",
        payment: "visa",
        status: "مكتمل",
        orderType: "كورس react.js",
        createdAt: "10 مايو 2024",
    },
    {
        id: 2,
        orderNum: "001247",
        image: WebImage,
        name: "سارة علي",
        description: "example@gmail.com",
        price: "$29.99",
        payment: "InstaPay",
        status: "قيد المعالجة",
        orderType: "ملزمة شرح",
        createdAt: "10 مايو 2024",
    },
]

export default orders;