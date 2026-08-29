import img from '@/public/assets/img-card.jpg';

export const testimonials = [
    {
        id: 1,
        name: {
            ar: "محمد أحمد",
            en: "Mohamed Ahmed",
        },
        position: {
            ar: "مطور واجهات أمامية",
            en: "Frontend Developer",
        },
        avatar: img,
        rating: 5,
        review: {
            ar: "تعلمت React و Next.js من خلال الكورس، وكانت التجربة ممتازة والمحتوى عملي جدًا.",
            en: "I learned React and Next.js through the course. The experience was outstanding and practical.",
        },
    },
    {
        id: 2,
        name: {
            ar: "سارة علي",
            en: "Sara Ali",
        },
        position: {
            ar: "مصممة تجربة مستخدم",
            en: "UI/UX Designer",
        },
        avatar: img,
        rating: 5,
        review: {
            ar: "الفريق محترف جدًا، وتم تنفيذ المشروع بجودة عالية وفي الوقت المحدد.",
            en: "The team is extremely professional; the project was delivered with top quality and on schedule.",
        },
    },
];