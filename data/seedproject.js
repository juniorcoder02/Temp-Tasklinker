const mongoose = require("mongoose");
const Project = require("../models/project");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Tasklinker").then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err.message);
});

// Define the dummy projects
const projects = [
  {
    title: "E-commerce Website Development",
    description: "Develop a full-featured e-commerce website with payment integration.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    client: {
      name: "TechShop Ltd.",
      email: "contact@techshop.com",
      phone: "123-456-7890"
    },
    budget: 8000,
    deadline: new Date("2024-10-01")
  },
  {
    title: "Mobile App for Fitness Tracking",
    description: "Create a mobile app to track fitness activities and goals.",
    requiredSkills: ["React Native", "JavaScript", "API Integration"],
    client: {
      name: "FitnessPro Inc.",
      email: "support@fitnesspro.com",
      phone: "098-765-4321"
    },
    budget: 6000,
    deadline: new Date("2024-11-17")
  },
  {
    title: "User Searcher",
    description: "Create a web app to search for users.",
    requiredSkills: ["React", "JavaScript", "API Integration"],
    client: {
      name: "user search.",
      email: "support@usersearch.com",
      phone: "021-235-4564"
    },
    budget: 12000,
    deadline: new Date("2024-10-15")
  },
  {
    title: "web application to find menu for canteen",
    description: "Create a web app that finds a new menu for canteen.",
    requiredSkills: ["React", "JavaScript", "API Integration" , "MongoDB"],
    client: {
      name: "Menumaker Inc.",
      email: "support@menumaker.com",
      phone: "023-545-2121"
    },
    budget: 23000,
    deadline: new Date("2024-11-31")
  },
  {
    title: "mobile app to find cafe",
    description: "Create a mobile app to find cafe near by you.",
    requiredSkills: ["Kotlin", "JavaScript", "API Integration"],
    client: {
      name: "cafefinder Inc.",
      email: "support@cafefinder.com",
      phone: "098-765-4321"
    },
    budget: 7000,
    deadline: new Date("2024-09-12")
  },
  {
    title: "Mobile App for workout",
    description: "Create a mobile app that create and track your workout schedule.",
    requiredSkills: ["React Native", "Kotlin", "Go" , "API Integration"],
    client: {
      name: "workoutTracker Inc.",
      email: "support@workouttracker.com",
      phone: "021-787-4321"
    },
    budget: 16000,
    deadline: new Date("2024-11-21")
  },
  {
    title: "Weather App",
    description: "Create a mobile app to find weather related data for your location.",
    requiredSkills: ["Java", "Kotlin", "API Integration" ,],
    client: {
      name: "weather Inc.",
      email: "support@weather.com",
      phone: "032-345-5421"
    },
    budget: 12000,
    deadline: new Date("2024-11-21")
  },
  {
    title: "SEO Optimization for Website",
    description: "Optimize website for better search engine ranking.",
    requiredSkills: ["SEO", "HTML", "Content Writing"],
    client: {
      name: "BestBlog Co.",
      email: "info@bestblog.com",
      phone: "555-123-4567"
    },
    budget: 3000,
    deadline: new Date("2024-09-20")
  },
  {
    title: "Custom CRM Development",
    description: "Develop a custom CRM system for client management.",
    requiredSkills: ["Python", "Django", "MySQL"],
    client: {
      name: "SalesFlow Corp.",
      email: "sales@salesflow.com",
      phone: "222-333-4444"
    },
    budget: 10000,
    deadline: new Date("2025-01-10")
  },
  {
    title: "Graphic Design for Marketing Campaign",
    description: "Create graphic designs for a new marketing campaign.",
    requiredSkills: ["Adobe Photoshop", "Illustrator", "Creativity"],
    client: {
      name: "CreativeMedia Agency",
      email: "design@creativemedia.com",
      phone: "777-888-9999"
    },
    budget: 2500,
    deadline: new Date("2024-08-30")
  },
  {
    title: "API Development for Payment Gateway",
    description: "Develop a secure API for integrating a payment gateway.",
    requiredSkills: ["Node.js", "Express", "API Security"],
    client: {
      name: "PayFast Solutions",
      email: "dev@payfast.com",
      phone: "666-555-4444"
    },
    budget: 7000,
    deadline: new Date("2024-12-01")
  },
  {
    title: "Content Management System (CMS)",
    description: "Develop a CMS for managing website content.",
    requiredSkills: ["PHP", "Laravel", "MySQL"],
    client: {
      name: "WebMasters Inc.",
      email: "admin@webmasters.com",
      phone: "888-777-6666"
    },
    budget: 5000,
    deadline: new Date("2024-10-25")
  },
  {
    title: "Cloud Migration for Business Applications",
    description: "Migrate business applications to a cloud platform.",
    requiredSkills: ["AWS", "Azure", "Cloud Computing"],
    client: {
      name: "CloudSync Ltd.",
      email: "support@cloudsync.com",
      phone: "444-555-6666"
    },
    budget: 12000,
    deadline: new Date("2024-11-30")
  },
  {
    title: "Blockchain Development for Supply Chain",
    description: "Implement blockchain technology for supply chain management.",
    requiredSkills: ["Blockchain", "Smart Contracts", "Ethereum"],
    client: {
      name: "SupplyChain Innovators",
      email: "contact@supplychain.com",
      phone: "333-222-1111"
    },
    budget: 15000,
    deadline: new Date("2025-02-28")
  },
  {
    title: "Chatbot Development for Customer Support",
    description: "Create a chatbot for automating customer support.",
    requiredSkills: ["Python", "NLP", "AI"],
    client: {
      name: "HelpDesk Inc.",
      email: "help@helpdesk.com",
      phone: "111-222-3333"
    },
    budget: 4000,
    deadline: new Date("2024-09-10")
  }
];

// Function to seed the database
async function seedProjects() {
  try {
    await Project.deleteMany({}); // Clear existing projects
    await Project.insertMany(projects); // Insert the dummy projects
    console.log("Projects seeded successfully!");
  } catch (error) {
    console.error("Error seeding projects:", error);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
}

// Seed the projects
seedProjects();
