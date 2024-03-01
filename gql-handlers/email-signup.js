
import { GET_USER_DATA } from './queries/signup-queries.js';
import { fetchGraphQL } from './util/fetch-util.js';

const emailOtpVerifypHandler = async (req, res) => {
    // let params = req.body.input;	// LIVE
   let params = req.body;					// LOCAL
   if ('variables' in req.body) {
       params = req.body.variables;
   }
   const { email } = params;
   console.log('verify with email', email)
   executeEmail({ email })
       .then(result => {
           console.log("Precheck promise result:", result?.data?.users[0]);
           // console.dir(result);
           res.status(200).send(result?.data?.users[0])
       })
       .catch(error => {
           res.json({ message: 'email-signup-otp-fail' })
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