require("dotenv").config();
const express = require("express");
const session = require("express-session");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const contactRoute = require("./routes/contact");
const freelancerRoutes = require("./routes/freelancer");
const clientRoutes = require("./routes/client");
const MongoStore = require('connect-mongo');  // For storing sessions in MongoDB

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 8080;

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Tasklinker";

// Session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "yourSecretKey", // Use environment variable for secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoURI }), // Store session in MongoDB
  cookie: { secure: false }, // Set secure: true if using HTTPS
});

// Use session middleware with Express
app.use(sessionMiddleware);

// Use body-parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

// Security and logging middleware
app.use(helmet());
app.use(morgan("combined"));

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/landing-page", (req, res) => {
  res.render("landing-page");
});

app.get("/about-us", (req, res) => {
  res.render("about-us");
});

app.get("/success-client",(req,res)=>{
  res.render("success-client");
})

app.get("/success-freelancer",(req,res)=>{
  res.render("success-freelancer");
})

app.get("/project-success",(req,res)=>{
  res.render("project-success");
})
app.get("/terms-service",(req,res)=>{
  res.render("terms-service");
})
app.get("/privacy-policy",(req,res)=>{
  res.render("privacy-policy");
})
// Contact section
app.use("/", contactRoute); // This will handle routes like /contact

// Freelancer routes
app.use("/", freelancerRoutes);

// Client routes
app.use("/", clientRoutes);



// Authentication middleware for freelancers
const isAuthenticatedFreelancer = (req, res, next) => {
  if (req.session.user) {
    return next(); // User is authenticated as freelancer
  }
  res.redirect("/login-freelancer"); // Redirect to freelancer login page if not authenticated
};

// Authentication middleware for clients
const isAuthenticatedClient = (req, res, next) => {
  if (req.session.user) {
    return next(); // User is authenticated as client
  }
  res.redirect("/login-client"); // Redirect to client login page if not authenticated
};

// Protected route for freelancers
app.get("/protected-page-freelancer",isAuthenticatedFreelancer, (req, res) => {
  res.render("protected-page-freelancer");
});

// Protected route for clients
app.get("/protected-page-client",isAuthenticatedClient,  (req, res) => {
  res.render("protected-page-client");
});

// Chat Route
app.get("/chat", (req, res) => {
  res.render("chat", { email: req.session.user.email });
});

// Socket.io connection handling
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on('connection', (socket) => {
  const session = socket.request.session;
  if (!session.user) {
    socket.disconnect();
    return;
  }

  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('receiveMessage', data.message);
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("404", { url: req.url });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Server listening
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
