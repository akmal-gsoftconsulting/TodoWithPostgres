import { Tag, TodoItem } from "../common/models/index.js";

class TagController {
  
  
  static async createTag(req, res) {
    try {
      const { name, todoId } = req.body;
      const userId = req.user.id;

      const todoItem = await TodoItem.findOne({where: {id: todoId , userId }});

      if (!todoItem) {
        return res.status(404).json({ status: 404, message: "Task not found" });
      }

      const tag = await Tag.create({ userId, name });
      await tag.setTodoItems(todoItem); 

      res.status(200).json({
        status: 200,
        message: "Tag created successfully",
        tag,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async getTags(req, res) {
    try {
      const userId = req.user.id;
      const tags = await Tag.findAll({
        where: { userId },
        attributes: ['name'],
      });
      
      res.status(200).json({
        status: 200,
        message: "Tags fetched successfully",
        tags,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }


  static async updateTag(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const userId = req.user.id;

      // Find tag by ID and update the name
      const tag = await Tag.findOne({where : {id , userId}});
      if (!tag) {
        return res.status(404).json({ status: 404, message: "Tag not found" });
      }

      tag.name = name;
      await tag.save();

      res.status(200).json({
        status: 200,
        message: "Tag updated successfully",
        tag,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }


  static async deleteOrUpdate(req, res) {
    try {
        const { id } = req.params; // Tag ID
        const { action } = req.query; // Action: "remove" or "update"
        const userId = req.user.id; // Logged-in user ID

        const tag = await Tag.findOne({
            where: { id, userId },
            include: [
                {
                    model: TodoItem,
                    attributes: ['id', 'title', 'description', 'status', 'dueDate', 'priority'], 
                }
            ],
        });

        if (!tag) {
            return res.status(404).json({ status: 404, message: "Tag not found" });
        }

        

        if (action === "remove") {
            // Delete the tag
            await tag.destroy();
            return res.status(200).json({ status: 200, message: "Tag deleted successfully" });
        } else if (action === "update") {
            const { todoItemId, title, description, status, dueDate, priority } = req.body;

            // Find the related todo item from the tag's associated TodoItems
            const todoItem = tag.TodoItems.find((item) => item.id == todoItemId);
            

            if (!todoItem) {
                return res.status(404).json({ status: 404, message: "Todo item not associated with this tag" });
            }

            // Update the todo item dynamically
            const updates = {};
            if (title !== undefined) updates.title = title;
            if (description !== undefined) updates.description = description;
            if (status !== undefined) updates.status = status;
            if (dueDate !== undefined) updates.dueDate = dueDate;
            if (priority !== undefined) updates.priority = priority;

            await todoItem.update(updates);

            return res.status(200).json({
                status: 200,
                message: "Todo item updated successfully",
                result: todoItem,
            });
        } else {
            return res.status(400).json({ status: 400, message: "Invalid action specified in query parameter." });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
   }

  
}

export default TagController;
