
import { GET_USER_DATA } from './queries/signup-queries.js';
import { fetchGraphQL } from './util/fetch-util.js';
import generator from "otp-generator";

const emailOtpVerifypHandler = async (req, res) => {
    let params = req.body.input;	// LIVE
//    let params = req.body;					// LOCAL
   if ('variables' in req.body) {
       params = req.body.variables;
   }
   const { email, password } = params;
   console.log('verify with email', email, password)
   executeEmail({ email })
       .then(result => {
           const user = result?.data?.users[0];
           if(user?.id){
            console.log("Precheck 1", result?.data?.users[0]);
            if(password === user?.password){
                console.log("Precheck 2")
                if(user?.two_factor_auth){
                    const generatedCode = generator.generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false});
                    res.status(200).send({message:"two-factor authentication is on", code:generatedCode})
                }else{
                    res.status(200).send({id:user?.id, first_name:user?.first_name, last_name:user?.last_name, email:user?.email, password:user?.password,two_factor_auth:user?.two_factor_auth})
                }
            }else{
                console.log("Precheck 3")
                res.status(402).send({message:"Incorrect password."})
            }
           }else{
            console.log("Precheck 4")
            res.status(402).send({message:"Invalid credentials, no user found."})
           }
           // console.dir(result);
           
       })
       .catch(error => {
           res.json({ message: 'Email sign up failed (user not found)' })
       })
}

const executeEmail = async (variables) => {
	// console.log("phone signup -- stage one:", variables);
	const fetchResponse = await fetchGraphQL(GET_USER_DATA, variables);
	const data = await fetchResponse.json();
	// console.log('phone signup -- stage one respone: ', data);
	return data;
};
export default emailOtpVerifypHandler;