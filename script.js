// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
   menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navlinks =document.querySelectorAll('header nav a');
window.onscroll = () =>{
  sections.forEach(sec => {
  let top = window.scrollY;
  let offset =sec.offsetTop - 100;
  let height = sec.offsetHeight;
  let id = sec.getAttribute('id');

if(top >= offset && top < offset + height ){
  // active navbar links 
  navlinks.forEach(links => {
    links.classList.remove("active");
    document.querySelector('header nav a[href*='+ id +']').classList.add('active');
  });
}
  });
//  sticky header
let header = document.querySelector('header');

header.classList.toggle('sticky',window.scrollY> 100);

 // remove toggle icon and navbar when click navbar links( scroll)
 menuIcon.classList.remove('bx-x');
 navbar.classList.remove('active');
}

document.addEventListener("DOMContentLoaded", function () {
  const responseMessage = document.querySelector(".response-message");

  const form = document.querySelector("form");
  const fullNameInput = document.getElementById("fullName");
  const mobileNumberInput = document.getElementById("mobileNumber");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get values from the input elements
    const fullName = fullNameInput.value;
    const mobileNumber = mobileNumberInput.value;
    const email = emailInput.value;
    const subject = subjectInput.value;
    const message = messageInput.value;

    console.log(fullName);
    console.log(mobileNumber);
    console.log(email);
    console.log(subject);
    console.log(message);


    // Construct your own data object
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    console.log(formData.get("fullName"));
    const apiUrl = "https://portfolio-website-backend-ochre.vercel.app/contact";
    
    // Send the form data to the server using Fetch API
    fetch(apiUrl, {
      method: "POST",
      body: formData,
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // },
    }).then((response) => response.json())
      .then((data) => {
        // Handle the server response
        
        if (data.code === 200) {
          responseMessage.textContent = "Message sent successfully!";
          responseMessage.classList.remove("error");
          responseMessage.classList.add("success");
        } else {
          responseMessage.textContent = "Error sending the message. Please try again.";
          responseMessage.classList.remove("success");
          responseMessage.classList.add("error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        responseMessage.textContent = `An error occurred. Please try again later. ${error}`;
        responseMessage.classList.remove("success");
        responseMessage.classList.add("error");
      });
  });
});