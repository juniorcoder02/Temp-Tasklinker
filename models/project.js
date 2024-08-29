const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: { type: [String], required: true },  // Array of skills needed for the project
  client: {
    name: { type: String, required: true },  // Client's name
    email: { type: String, required: true },  // Client's email
    phone: { type: String, required: true }  // Client's phone number
  },
  budget: { type: Number, required: true },  // Project budget
  deadline: { type: Date, required: true }  // Project deadline
  // You can add more fields like status, type, etc.
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
