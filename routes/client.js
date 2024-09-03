const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Client = require("../models/client");
const Freelancer = require("../models/freelancer");
const Project = require("../models/project"); // Assuming you have this model created

// GET request to render the signup form
router.get("/signup-client", (req, res) => {
  res.render("signup-client");
});

// POST request for client signup
router.post("/signup-client", async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      companySize,
      industry, // Ensure field names are consistent
      website,
      password,
    } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new client
    const newClient = new Client({
      companyName,
      contactPerson,
      email,
      phone,
      companySize,
      industry, // Ensure field names are consistent
      website,
      password, // Use hashed password
    });

    // Save the client to the database
    await newClient.save();

    req.session.user = newClient; // Store user in session
    req.session.message = "Signup successful as a client!";
    res.redirect("/success-client");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET request to render the login form
router.get("/login-client", (req, res) => {
  res.render("signup-client"); // Render the login form here
});

// POST request for client login
router.post("/login-client", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.user = client; // Store user in session
    req.session.message = "Login successful as a client!";

    // Fetch freelancers from the database
    const freelancers = await Freelancer.find({}); // Fetch all freelancers (you can add filters if needed)

    // Fetch projects for the logged-in client
    const projects = await Project.find({ "client.email": client.email }); // Adjust as necessary

    // Use res.render to render the client-dashboard view directly
    res.render("client-dashboard", { client, freelancers, projects });
    console.log(req.session.user.email);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for rendering the client dashboard
router.get("/client-dashboard", async (req, res) => {
  try {
    const client = req.session.user;
    if (!client) {
      return res.redirect("/login-client");
    }

    // Fetch freelancers from the database
    const freelancers = await Freelancer.find({}); // Fetch all freelancers (you can add filters if needed)

    // Fetch projects for the logged-in client
    const projects = await Project.find({ "client.email": client.email }); // Adjust as necessary

    res.render("client-dashboard", { client, freelancers, projects });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST request to handle project form submission
router.post("/post-project", async (req, res) => {
  try {
    const { title, description, requiredSkills, client, budget, deadline } = req.body;

    const newProject = new Project({
      title,
      description,
      requiredSkills: requiredSkills.split(',').map(skill => skill.trim()),
      client,
      budget,
      deadline
    });

    await newProject.save();

    req.session.message = "Project posted successfully!";
    res.redirect("/project-success"); // Redirect to the client's dashboard
  } catch (error) {
    console.error("Error posting project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET request to show the client's posted projects
router.get('/posted-projects', async (req, res) => {
  try {
      const client = req.session.user;
      if (!client) {
        return res.redirect("/login-client");
      }

      const projects = await Project.find({ "client.email": client.email }); // Fetch projects for the logged-in client

      // Fetch freelancers from the database
      const freelancers = await Freelancer.find({}); // Fetch all freelancers (you can add filters if needed)

      // Ensure `projects` is being passed to the view
      res.render('client-dashboard', { client, freelancers, projects }); 
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

// Logout route
router.get("/logout-client", (req, res) => {
  req.session.destroy();
  res.redirect("/landing-page");
});

module.exports = router;
