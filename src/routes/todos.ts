import express from "express";
import models from "../server";

const router = express.Router();

// ADD TODO
router.post("/add", async (req, res) => {
    const { title, description, done } = req.body;

    try {
        const todo = await models.todoModel.create({
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
    } catch (e) {
        console.error("Error adding todo:", e);
        res.status(500).json({ message: "Failed to add todo" });
    }
});

// GET TODOS
router.get("/todos", async (req, res) => {
    //@ts-ignore
    const userId = req.id;
    try {
        const todos = await models.todoModel.find({ userId });
        const user = await models.userModel.findById(userId).select("username");
        res.json({ todo: todos,
            username : user?.username
         });
    } catch (e) {
        console.error("Error fetching todos:", e);
        res.status(500).json({ message: "Failed to fetch todos" });
    }
});

// DELETE TODO
router.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await models.todoModel.findByIdAndDelete(id);
        res.json({ message: "Todo deleted" });
    } catch (e) {
        console.error("Delete failed:", e);
        res.status(500).json({ message: "Error deleting todo" });
    }
});

// UPDATE TODO
router.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const updated = req.body;
    try {
        await models.todoModel.findByIdAndUpdate(id, updated, { new: true });
        res.status(200).json({ message: "Updated successfully" });
    } catch (e) {
        console.error("Update failed:", e);
        res.status(500).json({ message: "Error updating todo" });
    }
});

export default router;
