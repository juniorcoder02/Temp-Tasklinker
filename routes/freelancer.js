const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Freelancer = require("../models/freelancer");
const Project = require("../models/project");

// GET request to render the signup form
router.get("/signup-freelancer", (req, res) => {
  res.render("signup-freelancer");
});

// POST request for freelancer signup
router.post("/signup-freelancer", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      skills,
      experience,
      availability,
      portfolio,
      password,
    } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new freelancer
    const newFreelancer = new Freelancer({
      fullName,
      email,
      phone,
      skills:skills.split(","),
      experience,
      availability,
      portfolio,
      password, // Use hashed password here
    });

    // Save the freelancer to the database
    await newFreelancer.save();

    req.session.user = newFreelancer; // Store user in session
    req.session.message = "Signup successful!";
    res.redirect("/success-freelancer");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET request to render the login form
router.get("/login-freelancer", (req, res) => {
  res.render("signup-freelancer"); // Render the login form here
});

// POST request for freelancer login
router.post("/login-freelancer", async (req, res) => {
  const { email, password } = req.body;

  try {
    const freelancer = await Freelancer.findOne({ email });
    if (!freelancer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, freelancer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.user = freelancer; // Store user in session
    req.session.message = "Login successful!";
    res.redirect("/freelancer-dashboard"); // Correct redirect
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for rendering the protected page
router.get("/freelancer-dashboard", async (req, res) => {
  try {
    const freelancer = req.session.user;
    if (!freelancer) {
      return res.redirect("/login-freelancer");
    }

    // Fetch all projects that match the freelancer's skills
    const projects = await Project.find({
      requiredSkills: { $in: freelancer.skills }
    });

    res.render("freelancer-dashboard", { freelancer, projects });
    console.log(req.session.user.email);

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//logout route
router.get("/logout-freelancer", (req, res) => {
  req.session.destroy();
  res.redirect("/landing-page");
});

module.exports = router;
