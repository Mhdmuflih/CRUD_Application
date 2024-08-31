"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const router = express_1.default.Router();
router.post('/', userControllers_1.createUser);
router.get('/', userControllers_1.getUsers);
router.put('/:id', userControllers_1.updateUser);
router.delete('/:id', userControllers_1.deleteUser);
exports.default = router;
