import { User, List , Collaborator } from "../common/models/index.js";
import { Op } from 'sequelize';

class CollaboratorController {

  static async generate(req, res) {
    const transaction = await Collaborator.sequelize.transaction();
    try {
      const { email, listId } = req.body;
      const userId = req.user.id;  

      const collaborator = await User.findOne({ where: { email } });
      if (!collaborator) return res.status(404).json({ message: 'User with provided email is not found' });

      const list = await List.findOne({
        where: {
          id : listId,
          userId
        },
        transaction,
      });
    
      if (!list) return res.status(404).json({ message: 'List not found' });
      

      const newCollaborator = await Collaborator.create({
        email :  email,
        ListId : listId,
        UserId : userId
      }, { transaction });

      await transaction.commit();

      res.status(201).json({
        status: 201,
        message: 'Collaborator added successfully',
        data: newCollaborator.id,
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: 'Error adding collaborator', error: error.message });
    }
  }

  
  static async remove(req, res) {
    try {
      const { listid } = req.params;
      const userId = req.user.id;

      const collaborator = await Collaborator.findOne( {where : {ListId : listid , UserId : userId}});
      if (!collaborator) return res.status(404).json({ message: 'Collaborator not found' });

      await collaborator.destroy();

      res.status(200).json({ status: 200, message: 'Collaborator removed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error removing collaborator', error: error.message });
    }
  }

  static async get(req, res) {
    try {
      const { listid } = req.params;

      const list = await List.findByPk(listid, {
        include: [
          {
            model: User,
            as: 'Users',
            attributes: ['email'],
          },

        ],
      });

      if (!list) return res.status(404).json({ message: 'List not found' });      

      const collaborators = list.Users.map(user => user.email);

      res.status(200).json({
        status: 200,
        message: 'Collaborators for the specific list',
        data: collaborators,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error getting collaborators', error: error.message });
    }
  }
}

export default CollaboratorController;
