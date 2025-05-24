"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("../server"));
const router = express_1.default.Router();
// ADD TODO
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, done } = req.body;
    try {
        const todo = yield server_1.default.todoModel.create({
            title,
            description: description || "",
            done: done || false,
            //@ts-ignore
            userId: req.id
        });
        res.json({
            todo: {
                _id: todo._id,
                title: todo.title,
            },
            message: "todo added"
        });
    }
    catch (e) {
        console.error("Error adding todo:", e);
        res.status(500).json({ message: "Failed to add todo" });
    }
}));
// GET TODOS
router.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
    try {
        const todos = yield server_1.default.todoModel.find({ userId });
        const user = yield server_1.default.userModel.findById(userId).select("username");
        res.json({ todo: todos,
            username: user === null || user === void 0 ? void 0 : user.username
        });
    }
    catch (e) {
        console.error("Error fetching todos:", e);
        res.status(500).json({ message: "Failed to fetch todos" });
    }
}));
// DELETE TODO
router.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield server_1.default.todoModel.findByIdAndDelete(id);
        res.json({ message: "Todo deleted" });
    }
    catch (e) {
        console.error("Delete failed:", e);
        res.status(500).json({ message: "Error deleting todo" });
    }
}));
// UPDATE TODO
router.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updated = req.body;
    try {
        yield server_1.default.todoModel.findByIdAndUpdate(id, updated, { new: true });
        res.status(200).json({ message: "Updated successfully" });
    }
    catch (e) {
        console.error("Update failed:", e);
        res.status(500).json({ message: "Error updating todo" });
    }
}));
exports.default = router;
