const db = require("../models");
const nodemailer = require("nodemailer");

exports.sendVerificationcode = (req, res) => {
	let user = req.body;	
	sendMail(user, info=>{		
		res.send(info)
	});
};


exports.SendEmailForResetPassword = (req, res) => {
	let user = req.body;
	console.log(user)
	sendMailResetPassword(user, info=>{		
		res.send(info)
	});
};

exports.SendEmaiForPaymentRecord = (req, res) => {
	let user = req.body;
	console.log(user)
	sendMailPaymentRecord(user, user.body, info=>{		
		res.send(info)
	});
};


async function sendMail(user, callback)
{
	let transporter = nodemailer.createTransport({
		host:"smtp.gmail.com",
		port:587,
		secure:0,
		auth:{
			user: "jackstyle.onlineshop@gmail.com",
			pass : "hdavkalverdrajhe"
		}
		
	});
	
	var body = "";
	body = "<div>";
	body += "<p>Hi " + user.UserName + ",</p>";
	body += "<p>Wellcome to JackStyle! Please Enter the following code to Verify your account</p>";
	body += "<p>Verification Code : " + user.Verificationcode + "</p>";
	body += "<p>Thank you for join our JackStyle family!</p>";
	body += "<p>Regards,</p>";
	body += "<p>JackStyle</p>";
	body += "</div>";

	

	let mailOption = {		 
		from:"JackStyle",
		to:user.Email,
		subject:"Verify your email address for JackStyle",
		html:body
	};
	
	let info = await transporter.sendMail(mailOption);
	callback(info);
}

async function sendMailResetPassword(user, callback)
{
	let transporter = nodemailer.createTransport({
		host:"smtp.gmail.com",
		port:587,
		secure:0,
		auth:{
			user: "jackstyle.onlineshop@gmail.com",
			pass : "hdavkalverdrajhe"
		}		
	});
	
	var body = "";
	body = "<div>";
	body += "<p>Hi " + user.UserName + ",</p>";
	body += "<p>There was a request to change your password!</p>";
	body += "<p>Verification Code : " + user.Verificationcode + "</p>";
	body += "<p>If you did not make this request then please ignore this email.</p>";
	body += "<p>Regards,</p>";
	body += "<p>JackStyle</p>";
	body += "</div>";
	console.log(user.Verificationcode)

	let mailOption = {		 
		from:"JackStyle",
		to:user.Email,
		subject:"Password Reset Request",
		html:body
	};
	
	let info = await transporter.sendMail(mailOption);
	callback(info);
}

async function sendMailPaymentRecord(user, body, callback)
{
	let transporter = nodemailer.createTransport({
		host:"smtp.gmail.com",
		port:587,
		secure:0, 
		auth:{
			user: "jackstyle.onlineshop@gmail.com",
			pass : "hdavkalverdrajhe"
		}		
	});
	
	let mailOption = {		 
		from:"JackStyle",
		to:user.Email,
		subject:"Payment Record from JackStyle",
		html:body
	};
	
	let info = await transporter.sendMail(mailOption);
	callback(info);
}