window.addEventListener('beforeunload', function(e){
  e.preventDefault();
  e.returnValue = '';
})

let user_db = {};

class User {
  constructor(uid, username, password, loggedIn, balance, email) {
    this.uid = uid;
    this.username = username;
    this.password = password;
    this.loggedin = loggedIn;
    this.balance = balance;
    this.email = email;
  }
}
curr_uid = 1;
let user1 = new User(
  0,
  "thulasi",
  "thulasi123",
  false,
  3000,
  "thulasikanswe@gmail.com"
);
user_db[0] = user1;
// console.log("User object", user_db );
//login function
function login() {
  const user_name = document.getElementById("user_name");
  const user_password = document.getElementById("user_password");

  // checking for the username & password in the database
  for (const key in user_db) {
    if (
      user_db[key].username === user_name.value &&
      user_db[key].password === user_password.value
    ) {
      user_db[key].loggedin = true;

      console.log(user_db[key].loggedin);
      
    }
    // do this if user not found
    else {
      alert("User not Found | SignIn first");
      console.log(user_db[key].username, user_db[key].password);
      
    }
  }
}
// functions to validate user's email address and password's format
function validate_email(address) {
  // Regular expression pattern for email validation
  let emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  // Check if the address matches the email pattern
  if (emailPattern.test(address)) {
    return true; // Email is valid
  } else {
    return false; // Email is invalid
  }
}
function validate_password(password) {
  // Check if the password meets the required criteria
  if (password.length >= 8) {
    return true; // Password is valid
  } else {
    return false; // Password is invalid
  }
}

// function to sign In | user have to login to access his account
function signUp() {
  const new_username = document.getElementById("new_user_name");
  const new_user_email = document.getElementById("new_user_email");
  const new_user_password = document.getElementById("new_user_password");

  for (const key in user_db) {
    if (user_db[key].email == new_user_email.value) {
      alert("User already exists !");
       
    }
  }

  if (
    validate_email(new_user_email.value) &&
    validate_password(new_user_password.value)
  ) {
    alert("signed In");
    const newUser = new User(
      curr_uid,
      new_username.value,
      new_user_password.value,
      false,
      0,
      new_user_email.value
    );
    user_db[newUser.uid] = newUser;
    console.log(user_db);
    curr_uid += 1 ;
  } else {
    alert("Invalid Credentials");
  }
}