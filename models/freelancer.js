const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const FreelancerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: { type: [String], required: true },
  experience: { type: Number, required: true },
  availability: { type: String, required: true },
  portfolio: { type: String },
  password: { type: String, required: true },
});

// Hash the password before saving
FreelancerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

  

module.exports = mongoose.model("Freelancer", FreelancerSchema);
