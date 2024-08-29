const mongoose = require('mongoose');
const Freelancer = require("../models/freelancer");  // Adjust the path to your Freelancer model

mongoose.connect('mongodb://localhost:27017/Tasklinker')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const seedFreelancers = async () => {
  const freelancers = [
    {
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: 5,
      availability: 'Full-time',
      portfolio: 'https://johndoeportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987-654-3210',
      skills: ['Python', 'Django', 'Flask'],
      experience: 3,
      availability: 'Part-time',
      portfolio: 'https://janesmithportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'Michael Johnson',
      email: 'michaelj@example.com',
      phone: '111-222-3333',
      skills: ['Ruby', 'Ruby on Rails', 'PostgreSQL'],
      experience: 4,
      availability: 'Contract',
      portfolio: 'https://michaeljportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'Emily Davis',
      email: 'emilyd@example.com',
      phone: '444-555-6666',
      skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
      experience: 2,
      availability: 'Freelance',
      portfolio: 'https://emilydportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'David Brown',
      email: 'davidb@example.com',
      phone: '777-888-9999',
      skills: ['PHP', 'Laravel', 'MySQL'],
      experience: 6,
      availability: 'Full-time',
      portfolio: 'https://davidbportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'Sarah Wilson',
      email: 'sarahw@example.com',
      phone: '101-202-3030',
      skills: ['Java', 'Spring Boot', 'Microservices'],
      experience: 7,
      availability: 'Full-time',
      portfolio: 'https://sarahwportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'Chris Evans',
      email: 'chrise@example.com',
      phone: '404-505-6060',
      skills: ['C#', '.NET Core', 'Azure'],
      experience: 5,
      availability: 'Contract',
      portfolio: 'https://chriseportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'Jessica Taylor',
      email: 'jessicat@example.com',
      phone: '707-808-9090',
      skills: ['Swift', 'iOS Development', 'Objective-C'],
      experience: 4,
      availability: 'Part-time',
      portfolio: 'https://jessicatportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'Tom Hiddleston',
      email: 'tomh@example.com',
      phone: '111-333-5555',
      skills: ['Kotlin', 'Android Development', 'Java'],
      experience: 3,
      availability: 'Freelance',
      portfolio: 'https://tomhportfolio.com',
      password: 'password123'
    },
    {
      fullName: 'Emma Watson',
      email: 'emmaw@example.com',
      phone: '222-444-6666',
      skills: ['Go', 'Docker', 'Kubernetes'],
      experience: 6,
      availability: 'Full-time',
      portfolio: 'https://emmawportfolio.com',
      password: 'password123'
    }
  ];

  try {
    // Clear the existing collection
    // await Freelancer.deleteMany({});
    // Hash the passwords and seed the data
    for (let freelancerData of freelancers) {
      const freelancer = new Freelancer(freelancerData);
      await freelancer.save();
    }
    console.log("10 freelancers have been seeded!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding freelancers:", error);
    mongoose.connection.close();
  }
};

seedFreelancers();
