const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const path = require('path');

// server used to send send emails
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// // Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));


const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "oliyadoba@gmail.com",
    pass: "qcqkdskneemtogql"
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  console.log(req);
  const name = req.body.fullName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const subject = req.body.subject;
  const mail = {
    from: name,
    to: "oliyadoba@gmail.com",
    subject: `<p>Subject: ${subject}`,
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json("The error", error);
    } else {
      console.log("Message sent");
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

// Use the router in your main app
app.use("/", router);

// // Handles any requests that don't match the above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

const port = 80 || 5000;
app.listen(port);

console.log('App is listening on port ' + port);