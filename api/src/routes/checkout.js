require("dotenv").config()
const server = require("express").Router();
const { User } = require("../db.js");
const authenticateToken = require('../auth/authenticateToken')
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL, //Nuestro mail
		pass: process.env.PASSWORD  //Nuestra password
	}
});

var returnHTML = function(user, body){
  return (` 
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
.container {
 width: 50%;
 margin: auto;
 border: solid 2px orange;
 border-radius: 50px  ;
}
h1 {
  text-align: center;
}
h2 {
  text-align: center;
}
ul {
  text-decoration: none
}
  </style>
</head>
<body>
 <div class='container'>
    <h1>GRACIAS POR SU COMPRA</h1>
    <h2>Esperemos que disfrutes tus juegos loco</h2>
      <hr>
      <ul> 
        ${body.map(product => {
          return (
            `<li>
              <img src=${product.img} width="50" height="62"/><span><h3>${product.title}  $ ${product.price}</h3></span>
            </li>`
          )
        })}
        <li>
          <h3>       
            Total: $ ${!body ? ("$0,00") : (
              body.reduce((sum, prod) => {
              return sum + (prod.price * prod.count)
              }, 0)) }
          </h3>
        </li>
      </ul>
      <h2>De parte del grupo de este ecommerce estamos muy agradecidos por tu apoyo</h2>
      <h2>No dudes en volver a comprar en nuestra <a href="http://localhost:3000/">pagina oficial</a></h2>
  </div> 
  </body> 
  </html>`
  )
}

server.post("/mail", authenticateToken, (req, res, next) => {
  var body = req.body
  var mail = req.user.user.email;
  console.log(mail)

  let mailOptions = {
	from: process.env.EMAIL,
	to: mail,
	subject: "Felicitaciones por tu compra",
  html:  returnHTML(req.user.user, body),	
  };

  transporter.sendMail(mailOptions, function(err, data) {
	if(err){
		console.log("Error occurs: ", err)
	} else {
		console.log("Success")
	}
  });
});

module.exports = server;
