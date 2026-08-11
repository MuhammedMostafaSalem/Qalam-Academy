require('colors');
require('dotenv').config();

const connectDB = require('./connectDB');
const User = require('../modules/users/user.model');

const admins = [
    {
        firstName: 'Super',
        lastName: 'Admin',
        email: process.env.SEED_ADMIN_EMAIL || 'admin@qalamacademy.com',
        phone: process.env.SEED_ADMIN_PHONE || '01000000000',
        password: process.env.SEED_ADMIN_PASSWORD || 'Admin@12345',
        country: process.env.SEED_ADMIN_COUNTRY || 'Egypt',
        city: process.env.SEED_ADMIN_CITY || 'Cairo',
        address: process.env.SEED_ADMIN_ADDRESS || 'Admin Headquarters',
        role: 'admin',
        isVerified: true,
        isActive: true,
    },
    {
        firstName: 'Content',
        lastName: 'Manager',
        email: process.env.SEED_ADMIN2_EMAIL || 'content.admin@qalamacademy.com',
        phone: process.env.SEED_ADMIN2_PHONE || '01000000001',
        password: process.env.SEED_ADMIN2_PASSWORD || 'Admin@12345',
        country: process.env.SEED_ADMIN_COUNTRY || 'Egypt',
        city: process.env.SEED_ADMIN_CITY || 'Cairo',
        address: process.env.SEED_ADMIN_ADDRESS || 'Admin Headquarters',
        role: 'admin',
        isVerified: true,
        isActive: true,
    },
];

const seedAdmins = async () => {
    try {
        await connectDB();

        console.log('Seeding admin users...'.yellow.bold);

        for (const admin of admins) {
            const existing = await User.findOne({ email: admin.email });

            if (existing) {
                console.log(`Admin already exists: ${admin.email}`.cyan);
                continue;
            }

            const newAdmin = new User(admin);
            await newAdmin.save();

            console.log(`Created admin: ${admin.email} (${admin.firstName} ${admin.lastName})`.green);
        }

        console.log('Admin seeding completed successfully.'.green.bold);
    } catch (error) {
        console.error(`Error seeding admin users: ${error.message}`.red.bold);
        process.exit(1);
    } finally {
        const mongoose = require('mongoose');
        await mongoose.disconnect();
        console.log('MongoDB disconnected.'.yellow);
        process.exit(0);
    }
};

seedAdmins();
