require('colors');
require('dotenv').config();

const connectDB = require('./connectDB');

const User = require('../modules/users/user.model');
const Category = require('../modules/category/category.model');
const Course = require('../modules/course/course.model');
const Lesson = require('../modules/lesson/lesson.model');
const Enrollment = require('../modules/enrollment/enrollment.model');
const Progress = require('../modules/progress/progress.model');
const Review = require('../modules/review/review.model');
const Product = require('../modules/products/product.model');
const Cart = require('../modules/cart/cart.model');
const Coupon = require('../modules/coupon/coupon.model');
const Order = require('../modules/order/orders.model');
const Hero = require('../modules/hero/hero.model');
const Service = require('../modules/services/service.model');
const Portfolio = require('../modules/portfolio/portfolio.model');
const Team = require('../modules/team/team.model');
const Partner = require('../modules/partners/partner.model');
const Blog = require('../modules/blog/blog.model');
const Contact = require('../modules/contact/contact.model');
const Timeline = require('../modules/timeline/timeline.model');
const Journey = require('../modules/journey/journey.model');
const ChooseUs = require('../modules/choose-us/choose.model');
const Settings = require('../modules/settings/settings.model');

const DEFAULT_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'Admin@12345';

// Insert a document only if the filter does not match any existing document.
// Creating via `new Model(data)` + `save()` runs Mongoose pre-validate / pre-save
// hooks (slug generation, password hashing, readingTime calculation, ...).
async function upsert(Model, filter, data) {
    const exists = await Model.findOne(filter);

    if (exists) {
        console.log(`Skipped (exists): ${Model.modelName} ${JSON.stringify(filter)}`.cyan);
        return exists;
    }

    const doc = new Model(data);
    await doc.save();
    console.log(`Created: ${Model.modelName}`.green);

    return doc;
}

async function seedDatabase() {
    await connectDB();

    console.log('Seeding database...'.yellow.bold);

    /* ---------------------------------- Users ---------------------------------- */
    const admin = await upsert(
        User,
        { email: 'admin@qalamacademy.com' },
        {
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@qalamacademy.com',
            phone: '01000000000',
            country: 'Egypt',
            city: 'Cairo',
            address: 'Admin Headquarters',
            password: DEFAULT_PASSWORD,
            bio: 'Platform administrator.',
            role: 'admin',
            isVerified: true,
            isActive: true,
            themeMode: 'dark',
        }
    );

    const instructor = await upsert(
        User,
        { email: 'instructor@qalamacademy.com' },
        {
            firstName: 'Ahmed',
            lastName: 'Hassan',
            email: 'instructor@qalamacademy.com',
            phone: '01000000002',
            country: 'Egypt',
            city: 'Giza',
            address: 'Instructor Office, Giza',
            password: DEFAULT_PASSWORD,
            bio: 'Senior web development instructor.',
            role: 'instructor',
            isVerified: true,
            isActive: true,
            themeMode: 'light',
        }
    );

    const student = await upsert(
        User,
        { email: 'student@qalamacademy.com' },
        {
            firstName: 'Sara',
            lastName: 'Mahmoud',
            email: 'student@qalamacademy.com',
            phone: '01000000003',
            country: 'Egypt',
            city: 'Alexandria',
            address: 'Student Residence, Alexandria',
            password: DEFAULT_PASSWORD,
            bio: 'Passionate about learning.',
            role: 'student',
            isVerified: true,
            isActive: true,
            themeMode: 'dark',
        }
    );

    /* ------------------------------- Categories -------------------------------- */
    const courseCategory = await upsert(
        Category,
        { type: 'course', slug: 'programming' },
        {
            title: { ar: 'برمجة', en: 'Programming' },
            description: { ar: 'دورات البرمجة وتطوير الويب', en: 'Programming and web development courses' },
            type: 'course',
            sortOrder: 1,
            isActive: true,
            createdBy: admin._id,
        }
    );

    const productCategory = await upsert(
        Category,
        { type: 'product', slug: 'books' },
        {
            title: { ar: 'كتب', en: 'Books' },
            description: { ar: 'كتب ومطبوعات رقمية', en: 'Digital books and publications' },
            type: 'product',
            sortOrder: 2,
            isActive: true,
            createdBy: admin._id,
        }
    );

    const blogCategory = await upsert(
        Category,
        { type: 'blog', slug: 'news' },
        {
            title: { ar: 'أخبار', en: 'News' },
            description: { ar: 'أخبار المنصة', en: 'Platform news' },
            type: 'blog',
            sortOrder: 3,
            isActive: true,
            createdBy: admin._id,
        }
    );

    const portfolioCategory = await upsert(
        Category,
        { type: 'portfolio', slug: 'projects' },
        {
            title: { ar: 'مشاريع', en: 'Projects' },
            description: { ar: 'مشاريعنا المميزة', en: 'Our featured projects' },
            type: 'portfolio',
            sortOrder: 4,
            isActive: true,
            createdBy: admin._id,
        }
    );

    const serviceCategory = await upsert(
        Category,
        { type: 'service', slug: 'consulting' },
        {
            title: { ar: 'استشارات', en: 'Consulting' },
            description: { ar: 'خدمات الاستشارات التعليمية', en: 'Educational consulting services' },
            type: 'service',
            sortOrder: 5,
            isActive: true,
            createdBy: admin._id,
        }
    );

    /* --------------------------------- Courses --------------------------------- */
    const course = await upsert(
        Course,
        { slug: 'introduction-to-web-development' },
        {
            title: { ar: 'مقدمة في تطوير الويب', en: 'Introduction to Web Development' },
            description: {
                ar: 'تعلم أساسيات HTML و CSS و JavaScript لبناء صفحات ويب احترافية.',
                en: 'Learn the fundamentals of HTML, CSS and JavaScript to build professional web pages.',
            },
            category: courseCategory._id,
            instructor: instructor._id,
            level: 'beginner',
            language: 'arabic',
            duration: 120,
            price: 500,
            discountPrice: 350,
            requirements: ['Basic computer skills', 'Internet connection'],
            objectives: ['Build responsive web pages', 'Understand core JavaScript'],
            tags: ['web', 'html', 'css', 'javascript'],
            isPublished: true,
            isFeatured: true,
            averageRating: 5,
            totalReviews: 1,
            totalStudents: 1,
            totalLessons: 2,
            createdBy: instructor._id,
        }
    );

    /* --------------------------------- Lessons --------------------------------- */
    const lesson1 = await upsert(
        Lesson,
        { course: course._id, sortOrder: 1 },
        {
            course: course._id,
            title: { ar: 'مقدمة إلى HTML', en: 'Introduction to HTML' },
            description: {
                ar: 'تعرف على بنية صفحات الويب باستخدام HTML.',
                en: 'Understand the structure of web pages using HTML.',
            },
            duration: 45,
            sortOrder: 1,
            isPreview: true,
            isPublished: true,
            createdBy: instructor._id,
        }
    );

    const lesson2 = await upsert(
        Lesson,
        { course: course._id, sortOrder: 2 },
        {
            course: course._id,
            title: { ar: 'أساسيات CSS', en: 'CSS Fundamentals' },
            description: {
                ar: 'قم بتنسيق صفحاتك باستخدام CSS.',
                en: 'Style your pages using CSS.',
            },
            duration: 75,
            sortOrder: 2,
            isPreview: false,
            isPublished: true,
            createdBy: instructor._id,
        }
    );

    /* -------------------------------- Products --------------------------------- */
    const product = await upsert(
        Product,
        { slug: 'complete-arabic-grammar-pdf' },
        {
            title: { ar: 'مذكرة قواعد اللغة العربية', en: 'Complete Arabic Grammar PDF' },
            description: {
                ar: 'ملف PDF شامل لشرح قواعد اللغة العربية خطوة بخطوة.',
                en: 'A comprehensive PDF explaining Arabic grammar step by step.',
            },
            category: productCategory._id,
            price: 150,
            discountPrice: 100,
            stock: 50,
            isPublished: true,
            isFeatured: true,
            averageRating: 0,
            totalReviews: 0,
            totalSales: 1,
            createdBy: admin._id,
        }
    );

    /* --------------------------------- Coupons --------------------------------- */
    const coupon = await upsert(
        Coupon,
        { name: 'WELCOME10' },
        {
            name: 'WELCOME10',
            expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            discount: 10,
            createdBy: admin._id,
        }
    );

    /* ---------------------------------- Orders ---------------------------------- */
    const order = await upsert(
        Order,
        { user: student._id, paymentMethodType: 'cash', totalOrderPrice: 450 },
        {
            user: student._id,
            cartItems: [
                {
                    item: product._id,
                    itemType: 'Product',
                    count: 1,
                    price: 100,
                },
                {
                    item: course._id,
                    itemType: 'Course',
                    count: 1,
                    price: 350,
                },
            ],
            shippingAddress: {
                details: 'Student Residence, Alexandria',
                phone: '01000000003',
                city: 'Alexandria',
                postalCode: '21500',
            },
            taxPrice: 0,
            shippingPrice: 0,
            totalOrderPrice: 450,
            paymentMethodType: 'cash',
            isPaid: true,
            status: 'paid',
            paidAt: new Date(),
        }
    );

    /* ------------------------------- Enrollments -------------------------------- */
    const enrollment = await upsert(
        Enrollment,
        { user: student._id, course: course._id },
        {
            user: student._id,
            course: course._id,
            order: order._id,
            progress: 50,
            isCompleted: false,
        }
    );

    /* --------------------------------- Progress --------------------------------- */
    await upsert(
        Progress,
        { user: student._id, lesson: lesson1._id },
        {
            user: student._id,
            course: course._id,
            lesson: lesson1._id,
            watchedSeconds: 600,
            lastPosition: 10,
            completed: true,
            completedAt: new Date(),
            lastWatchedAt: new Date(),
        }
    );

    /* --------------------------------- Reviews ---------------------------------- */
    await upsert(
        Review,
        { user: student._id, course: course._id },
        {
            user: student._id,
            course: course._id,
            rating: 5,
            comment: 'An amazing course with clear explanations and practical examples.',
        }
    );

    /* ----------------------------------- Cart ----------------------------------- */
    await upsert(
        Cart,
        { cartOwner: student._id },
        {
            products: [
                {
                    item: product._id,
                    itemType: 'Product',
                    count: 2,
                    price: 100,
                },
            ],
            totalCartPrice: 200,
            totalAfterDiscount: null,
            cartOwner: student._id,
            coupon: null,
        }
    );

    /* ----------------------------------- Hero ----------------------------------- */
    await upsert(
        Hero,
        { page: 'home' },
        {
            page: 'home',
            title: { ar: 'تعلم بذكاء مع قلم أكاديمي', en: 'Learn Smarter with Qalam Academy' },
            subtitle: {
                ar: 'منصة تعليمية عربية شاملة',
                en: 'A comprehensive Arabic learning platform',
            },
            description: {
                ar: 'اكتشف دورات تدريبية ومنتجات تعليمية عالية الجودة.',
                en: 'Discover high-quality courses and educational products.',
            },
            buttonText: { ar: 'ابدأ الآن', en: 'Get Started' },
            buttonLink: '/courses',
            secondaryButtonText: { ar: 'اعرف المزيد', en: 'Learn More' },
            secondaryButtonLink: '/about',
            layout: 'center',
            textAlignment: 'center',
            isActive: true,
            sortOrder: 1,
            seoTitle: 'Qalam Academy - Home',
            seoDescription: 'Learn smarter with Qalam Academy.',
            createdBy: admin._id,
            updatedBy: admin._id,
        }
    );

    /* --------------------------------- Services --------------------------------- */
    await upsert(
        Service,
        { slug: 'online-courses' },
        {
            title: { ar: 'كورسات أونلاين', en: 'Online Courses' },
            description: {
                ar: 'دورات تفاعلية يقدمها نخبة من المدربين.',
                en: 'Interactive courses delivered by top instructors.',
            },
            isActive: true,
            createdBy: admin._id,
        }
    );

    /* -------------------------------- Portfolios -------------------------------- */
    await upsert(
        Portfolio,
        { slug: 'e-learning-platform' },
        {
            title: { ar: 'منصة تعليم إلكتروني', en: 'E-Learning Platform' },
            description: {
                ar: 'تصميم وتطوير منصة تعليمية متكاملة.',
                en: 'Design and development of a complete e-learning platform.',
            },
            category: portfolioCategory._id,
            projectUrl: 'https://example.com/project',
            githubUrl: 'https://github.com/example/project',
            technologies: ['React', 'Node.js', 'MongoDB'],
            isActive: true,
            createdBy: admin._id,
        }
    );

    /* ----------------------------------- Team ----------------------------------- */
    await upsert(
        Team,
        { user: instructor._id },
        {
            user: instructor._id,
            position: 'Lead Instructor',
            isActive: true,
            createdBy: admin._id,
        }
    );

    /* --------------------------------- Partners --------------------------------- */
    await upsert(
        Partner,
        { slug: 'google' },
        {
            name: 'Google',
            partnerUrl: 'https://www.google.com',
            isActive: true,
            createdBy: admin._id,
        }
    );

    /* ----------------------------------- Blog ----------------------------------- */
    await upsert(
        Blog,
        { slug: 'new-course-announcement' },
        {
            title: { ar: 'إطلاق دورة جديدة', en: 'New Course Announcement' },
            excerpt: {
                ar: 'يسعدنا الإعلان عن إطلاق دورة جديدة.',
                en: 'We are excited to announce a brand new course.',
            },
            content: {
                ar: 'يسعدنا الإعلان عن إطلاق دورة جديدة في تطوير الويب، سجل الآن واحصل على خصم خاص.',
                en: 'We are excited to announce a brand new web development course. Register now and get a special discount.',
            },
            category: blogCategory._id,
            tags: [
                { ar: 'دورات', en: 'courses' },
                { ar: 'أخبار', en: 'news' },
            ],
            user: admin._id,
            seoTitle: { ar: 'إطلاق دورة جديدة', en: 'New Course Announcement' },
            seoDescription: { ar: 'أخبار قلم أكاديمي', en: 'Qalam Academy news' },
            isFeatured: true,
            isPublished: true,
            publishedAt: new Date(),
            views: 0,
            createdBy: admin._id,
        }
    );

    /* --------------------------------- Contact ---------------------------------- */
    await upsert(
        Contact,
        { email: 'john.doe@example.com', subject: 'Question about enrollment' },
        {
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '01000000004',
            subject: 'Question about enrollment',
            message: 'How do I enroll in the web development course?',
            status: 'unread',
            ipAddress: '192.168.1.10',
            userAgent: 'Mozilla/5.0 (compatible; QalamSeed/1.0)',
        }
    );

    /* --------------------------------- Timeline --------------------------------- */
    await upsert(
        Timeline,
        { year: 2015 },
        {
            year: 2015,
            title: { ar: 'تأسيس المنصة', en: 'Platform Founded' },
            sortOrder: 1,
            isActive: true,
            createdBy: admin._id,
            updatedBy: admin._id,
        }
    );

    /* ---------------------------------- Journey ---------------------------------- */
    await upsert(
        Journey,
        { singleton: true },
        {
            title: { ar: 'رحلتنا', en: 'Our Journey' },
            description: {
                ar: 'بدأنا في 2015 بهدف نشر التعليم عالي الجودة للجميع.',
                en: 'We started in 2015 with the goal of spreading high-quality education to everyone.',
            },
            badge: { ar: 'منذ 2015', en: 'Since 2015' },
            badgeDescription: {
                ar: 'أكثر من عشر سنوات من الخبرة.',
                en: 'More than ten years of experience.',
            },
            isActive: true,
            createdBy: admin._id,
            updatedBy: admin._id,
        }
    );

    /* --------------------------------- ChooseUs --------------------------------- */
    await upsert(
        ChooseUs,
        { singleton: true },
        {
            title: { ar: 'لماذا تختارنا؟', en: 'Why Choose Us?' },
            subTitle: { ar: 'مميزاتنا', en: 'Our Advantages' },
            description: {
                ar: 'نقدم محتوى عالي الجودة، مدربين معتمدين، ودعم مستمر للطلاب.',
                en: 'We offer high-quality content, certified instructors, and continuous student support.',
            },
            isActive: true,
            createdBy: admin._id,
            updatedBy: admin._id,
        }
    );

    /* --------------------------------- Settings --------------------------------- */
    await upsert(
        Settings,
        { singleton: true },
        {
            siteName: 'Qalam Academy',
            siteDescription: 'Modern educational platform for courses and digital products.',
            supportEmail: 'support@qalamacademy.com',
            supportPhone: '01000000000',
            whatsapp: '01000000000',
            address: 'Cairo, Egypt',
            facebook: 'https://facebook.com/qalamacademy',
            instagram: 'https://instagram.com/qalamacademy',
            linkedin: 'https://linkedin.com/company/qalamacademy',
            youtube: 'https://youtube.com/@qalamacademy',
            twitter: 'https://twitter.com/qalamacademy',
            tiktok: 'https://tiktok.com/@qalamacademy',
            allowRegistration: true,
            maintenanceMode: false,
            seoTitle: 'Qalam Academy',
            seoDescription: 'Modern educational platform for courses and digital products.',
            seoKeywords: ['courses', 'education', 'qalam'],
            currency: 'EGP',
            defaultLanguage: 'ar',
            theme: {
                light: {
                    primary: '#2563eb',
                    secondary: '#7c3aed',
                    accent: '#f59e0b',
                    background: '#ffffff',
                    surface: '#f8fafc',
                    text: '#0f172a',
                    mutedText: '#64748b',
                    border: '#e2e8f0',
                    success: '#22c55e',
                    warning: '#f59e0b',
                    danger: '#ef4444',
                },
                dark: {
                    primary: '#3b82f6',
                    secondary: '#8b5cf6',
                    accent: '#fbbf24',
                    background: '#0f172a',
                    surface: '#1e293b',
                    text: '#f8fafc',
                    mutedText: '#94a3b8',
                    border: '#334155',
                    success: '#22c55e',
                    warning: '#f59e0b',
                    danger: '#ef4444',
                },
            },
            createdBy: admin._id,
            updatedBy: admin._id,
        }
    );

    console.log('Database seeding completed successfully.'.green.bold);
}

seedDatabase()
    .catch((error) => {
        console.error(`Error seeding database: ${error.message}`.red.bold);
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        const mongoose = require('mongoose');
        await mongoose.disconnect();
        console.log('MongoDB disconnected.'.yellow);
        process.exit(0);
    });
