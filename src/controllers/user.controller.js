import { User } from '../common/models/index.js';


export const getUserForPassport = async (req, res) => {
	try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ status:200 , message : "User found" , data: user });

	} catch (error) {
		console.error('Error decoding token:', error);
		res.status(401).json({ message: 'Invalid or expired token' });
	}
};

export const getUser = async (req, res) => {
	try {
        const userId = req.user.id;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ status:200 , message : "User found" , data: user });

	} catch (error) {
		console.error('Error decoding token:', error);
		res.status(401).json({ message: 'Invalid or expired token' });
	}
};

export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!(name || email)) {
            return res.status(404).json({ message: 'Both name and email are empty' });
        }

        if(name) user.name = name;
        if(email) user.email = email;
        await user.save();

        res.status(200).json({ status:200 , message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
}