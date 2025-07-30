const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    projectLang: {
        type: String,
        required: true,
        enum: ['python', 'javascript', 'java', 'cpp', 'c#', 'ruby', 'rust']
    },
    code: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },  
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
