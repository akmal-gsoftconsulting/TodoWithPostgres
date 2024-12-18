import { TodoItem, List } from "../common/models/index.js";
import sequelize from '../common/config/db.js';

class ListController {
  static async create(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { IdArray, name } = req.body;
      const userId = req.user.id;

      const tasks = await TodoItem.findAll({
        where: { id: IdArray, userId },
        transaction,
      });

      if (!tasks.length) {
        return res.status(404).json({ message: "Tasks not found" });
      }

      const list = await List.create({ name, userId }, { transaction });

      await Promise.all(
        tasks.map((task) => task.update({ listId: list.id }, { transaction }))
      );

      await transaction.commit();
      res.status(201).json({ status: 200, message: "List created successfully", list_id: list.id });
    } catch (error) {
      await transaction.rollback();
      res.status(500).send(error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const userId = req.user.id;

      const lists = await List.findAll({
        where: { userId },
        attributes: ['id', 'name'],
      });

      res.status(200).json({ status: 200, message: "All lists", lists });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;

      const list = await List.findByPk(id, {
        include: [
          {
            model: TodoItem,
            attributes: ['id', 'title', 'status'],
          },
        ],
      });

      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }

      res.status(200).json({ status: 200, message: "List retrieved successfully", list });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async update(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, itemid, status } = req.body;
      const userId = req.user.id;

      if (itemid && status) {
        
        const todoItem = await TodoItem.findOne({
          where: {
            id: itemid,
            listId: id,  
            userId: userId,  
          },
          transaction,
        });
        

        if (!todoItem) {
          return res.status(404).json({ message: "TodoItem not found" });
        }

        await todoItem.update({ status }, { transaction });
      }

      if (name) {
        const list = await List.findByPk(id, { transaction });

        if (!list) {
          return res.status(404).json({ message: "List not found" });
        }

        await list.update({ name }, { transaction });
      }

      await transaction.commit();
      res.status(200).json({ status: 200, message: "List and item updated successfully" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).send(error.message);
    }
  }

  static async deleteOne(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const list = await List.findOne({ where: { id , userId } });

      if (!list) {
        return res.status(404).json({ message: "List not found" });
      }

      await List.destroy({ where: { id , userId } });

      res.status(200).json({ status: 200, message: "List deleted" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default ListController;
