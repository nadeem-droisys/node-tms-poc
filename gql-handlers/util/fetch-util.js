import fetch from "node-fetch";
import { HASURA_GRAPHQL_URL } from "../../constants.js";

export const fetchGraphQL = (query, variables) => {
	return fetch(
		HASURA_GRAPHQL_URL,
		{
			method: 'POST',
			body: JSON.stringify({
				query: query,
				variables
			}),
			headers: {
				"x-hasura-admin-secret": "Ab6rsvh6C5D03112rivHLe5nEBiuItZNXkVRGCq0ditHWkTZOb2qPtet12za7D9r"
			}
		}
	);
}