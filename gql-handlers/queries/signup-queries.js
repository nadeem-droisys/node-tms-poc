export const GET_USER_DATA = `
query UserData($email: String!) {
    users(where: {email: {_eq: $email}}) {
      email
      first_name
      last_name
      password
      id
      two_factor_auth
      phone_number
    }
  }`;