import { User } from '../common/models/index.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Op } from 'sequelize';

export const signup  = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({status: 400 ,  message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password : hashedPassword});
        res.status(201).json({ status:201 , message: "User created successfully", user: newUser.name });
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ status:401 ,  message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status:401 , message: "Invalid email or password" });
        }

		const SECRET_KEY = process.env.JWT_SECRET

        const token = jwt.sign(
            { id: user.id }, 
            SECRET_KEY,                                         
            { expiresIn: "2m" }                                
        );

        res.status(200).json({status:200, message: "Login successful", data: token });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout   = async (req, res) => {
	try {
		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error('Error decoding token:', error);
		res.status(401).json({ message: 'Invalid or expired token' });
	}
};





export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minute expiry

        // Save token & expiry in user record
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();




		var global_email = process.env.GLOBAL_EMAIL;
		var global_pass = process.env.GLOBAL_PASSWORD;
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: global_email,
				pass: global_pass
			}
		});
		var mailOptions = {
			from: global_email,
			to: email,
			subject: 'Sending Email for reset password',
			text: resetToken
		};
		try {
			const info = await transporter.sendMail(mailOptions);
			console.log('Email sent: ' + info.response);
		} catch (error) {
			console.log(error);
		}
		res.json( { status:200 , message : "email send"  });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({ where: { resetToken: token, resetTokenExpiry: { [Op.gt]: Date.now() } } });
        if (!user) return res.status(400).json({ message: "Token invalid or expired" });

        // Hash and update new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null; 
        user.resetTokenExpiry = null;
        await user.save();

        res.status(200).json({status:200 ,  message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password", error: error.message });
    }
};












