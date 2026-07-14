const http = require("http");
require('colors');

const app = require("./src/app");
const env = require("./src/config/env");
const connectDB = require("./src/database/connectDB");

// Connect to MongoDB
connectDB();

// Create HTTP Server
const server = http.createServer(app);

const PORT = env.port || 5000;

// Start Server
server.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`.green);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (error) => {
    console.error(`Unhandled Rejection: ${error.message}`.red.bold);

    server.close(() => process.exit(1));
});

// Handle Uncaught Exceptions
process.on("uncaughtException", (error) => {
    console.error(`Uncaught Exception: ${error}`.red.bold);

    process.exit(1);
});


// Graceful Shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...".yellow.bold);

    server.close(() => {
        console.log("Server closed.".yellow.bold);

        process.exit(0);
    });
});