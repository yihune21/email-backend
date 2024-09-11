const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Route for sending emails
app.post("/send-email", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Set up Nodemailer transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // You can use any email service, e.g., Gmail, Outlook, etc.
    auth: {
      user: "your-email@gmail.com", // Your email address
      pass: "your-email-password", // Your email password or app-specific password
    },
  });

  // Email options
  let mailOptions = {
    from: email, // Sender's email address
    to: "yihunezewdie23@gmail.com", // Your email address
    subject: "New Contact Form Submission",
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
