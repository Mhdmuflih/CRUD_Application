"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRounter_1 = __importDefault(require("./router/userRounter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// Mongoose connection
mongoose_1.default.connect('mongodb://localhost:27017/student_management_typescript').then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
// Routes
app.use('/users', userRounter_1.default);
const port = 4000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
