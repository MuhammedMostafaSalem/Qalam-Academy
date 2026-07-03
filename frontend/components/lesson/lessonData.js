const lessonData = {
    course: {
        id: 1,

        title: "React.js From Zero to Hero",

        instructor: "Ahmed Mostafa",

        thumbnail: "/assets/images/react-course.png",

        totalDuration: "18 ساعة",

        level: "Beginner",

        language: "العربية",
    },

    progress: 38,

    completedLessons: 6,

    totalLessons: 16,

    currentLessonId: 7,

    modules: [
        {
            id: 1,

            title: "مقدمة في React",

            duration: "1 ساعة",

            lessons: [
                {
                    id: 1,
                    title: "Introduction",
                    duration: "05:21",
                    completed: true,
                    locked: false,
                    active: false,
                    preview: true,
                    videoUrl: "",
                },
                {
                    id: 2,
                    title: "Why React?",
                    duration: "08:10",
                    completed: true,
                    locked: false,
                    active: false,
                    preview: true,
                    videoUrl: "",
                },
                {
                    id: 3,
                    title: "Setup Environment",
                    duration: "14:30",
                    completed: true,
                    locked: false,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
            ],
        },

        {
            id: 2,

            title: "React Fundamentals",

            duration: "4 ساعات",

            lessons: [
                {
                    id: 4,
                    title: "JSX",
                    duration: "16:20",
                    completed: true,
                    locked: false,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 5,
                    title: "Components",
                    duration: "18:42",
                    completed: true,
                    locked: false,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 6,
                    title: "Props",
                    duration: "21:15",
                    completed: true,
                    locked: false,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 7,
                    title: "State",
                    duration: "28:05",
                    completed: false,
                    locked: false,
                    active: true,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 8,
                    title: "Events",
                    duration: "18:44",
                    completed: false,
                    locked: false,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
            ],
        },

        {
            id: 3,

            title: "Advanced React",

            duration: "6 ساعات",

            lessons: [
                {
                    id: 9,
                    title: "Hooks",
                    duration: "32:50",
                    completed: false,
                    locked: true,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 10,
                    title: "useEffect",
                    duration: "24:20",
                    completed: false,
                    locked: true,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 11,
                    title: "Context API",
                    duration: "31:14",
                    completed: false,
                    locked: true,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 12,
                    title: "Custom Hooks",
                    duration: "22:09",
                    completed: false,
                    locked: true,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
            ],
        },

        {
            id: 4,

            title: "Final Project",

            duration: "7 ساعات",

            lessons: [
                {
                    id: 13,
                    title: "Planning",
                    duration: "18:33",
                    completed: false,
                    locked: true,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 14,
                    title: "Development",
                    duration: "02:15:40",
                    completed: false,
                    locked: true,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 15,
                    title: "Deployment",
                    duration: "41:30",
                    completed: false,
                    locked: true,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
                {
                    id: 16,
                    title: "Course Conclusion",
                    duration: "12:45",
                    completed: false,
                    locked: true,
                    active: false,
                    preview: false,
                    videoUrl: "",
                },
            ],
        },
    ],
};

export default lessonData;