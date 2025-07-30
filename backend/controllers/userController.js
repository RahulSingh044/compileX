const axios = require("axios");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
var { getHelloWorldCode } = require('../utils/CodeSnippets');
const Project = require('../models/projectModel');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let alreadyUser = await User.findOne({ email });

        if(alreadyUser) {
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            });
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async function (err, hash) {
              // Store hash in your password DB
              const user = await User.create({ name, email, password: hash });
              return res.status(201).json({
                success: true,
                msg: "User created successfully",
                user
            });
            });
          });


    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                success: true,
                msg: "Login successful",
                user,
                token
            });
        } else {
            return res.status(400).json({
                success: false,
                msg: "Invalid password"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}

exports.getUser = async (req, res) => {
    
    const token = req.body && req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token', error: err.message });
    }
}

exports.logout = async (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.status(200).json({
        success: true,
        msg: "Logout successful"
    });
}

exports.createProject = async (req, res) => {
    try {
        let { name, projectLang, token } = req.body;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id);
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "User not found"
            });
        }

        let code = getHelloWorldCode(projectLang.toLowerCase());

        const project = await Project.create({ name, projectLang, code, createdBy: user._id });

        return res.status(201).json({
            success: true,
            msg: "Project created successfully",
            projectId: project._id
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}

exports.saveProject = async (req, res) => {
    try {
        let {token, projectId, code} = req.body;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id);
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "User not found"
            });
        }

        let project = await Project.findOne({_id : projectId});
        project.code = code;
        await project.save();

        return res.status(200).json({
            success: true,
            msg: "Project Saved"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}

exports.getProjects = async(req, res) => {
    try {

        let {token} = req.body;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id);
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "User not found"
            });
        }

        let projects = await Project.find({createdBy : user._id});
        return res.status(200).json({
            success: true,
            msg: "Projects fetched",
            projects: projects
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}

exports.getProject = async(req, res) => {
    try {
        let {token, projectId} = req.body;
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decoded.id);
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "User not found"
            });
        }

        let project = await Project.findById(projectId);

        if(project) {
            return res.status(200).json({
                success: true,
                msg: "Project fetched",
                project: project
            })
        }else {
            return res.status(400).json({
                success: false,
                msg: "Project not found"
            })
        }
        
    }
    catch(error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}