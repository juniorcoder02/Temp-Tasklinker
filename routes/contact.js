const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();


router.get("/contact", (req, res) => {
  res.render("contact");
})
router.post("/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input data
  if (!name || !email || !subject || !message) {
    return res.status(400).send("All fields are required.");
  }

  // Create transporter for sending email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Mail options
  const mailOptions = {
    from: email,
    to: "adnanqureshi.cs22@skitm.in", // Replace with your recipient email address
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email.");
    }
    res.render("contact-success", { name });  });
    
});

module.exports = router;
