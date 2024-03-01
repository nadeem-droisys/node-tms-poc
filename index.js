import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createRequire } from "module";
import emailOtpVerifypHandler from "./gql-handlers/email-signup.js";
// const require = createRequire(import.meta.url);
const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3008;

app.use(bodyParser.json());
app.get('/', async (req, res) => {
	try {
		// console.log(`HEROKU Config var - HASURA_GRAPHQL_ADMIN_SECRET: ${process.env.NODE_ENV}`);
		return res.send("We regret; Get requests are not entertained!");
	}
	catch(err) {
		console.error("Error occurred handling the request...", err);
	}
});
app.post('/:route', async (req, res) => {
	try {
		console.log(`POST ------ request: ${req.params.route} with data:`);
		// const handler = 123;
		// const handler = require(`./gql-handlers/${req.params.route}`);
        // import handler from `./gql-handlers/${req.params.route}`;
		switch(req.params.route) {
			case 'email-signup':
				return emailOtpVerifypHandler(req,res)
			// case 'email-otpverify':
			// 	return handler(req,res)
			default:
				return res.json({message: "Please choose a properly configured route."});
		}
	}
	catch(err) {
		console.error("Error occurred handling the signup...", err);
	}
});
app.listen(PORT, ()=>{
    console.log('project started')
})