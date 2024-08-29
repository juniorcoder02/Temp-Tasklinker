const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ClientSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true }, // Removed unique: true if not needed
  email: { type: String, required: true, unique: true }, // Added unique constraint for email
  phone: { type: String, required: true },
  companySize: { type: String, required: true },
  industry: { type: String, required: true }, // Fixed the field name to match input
  website: { type: String },
  password: { type: String, required: true },
});

// Hash the password before saving
ClientSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) { // Hash password if new or modified
        try {
            console.log('Hashing password...');
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error); // Pass error to the next middleware
        }
    }
    next();
});

module.exports = mongoose.model("Client", ClientSchema);
