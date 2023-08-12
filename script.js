// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   e.returnValue = ''
// });
// exporting user_name for dash board use

let user_db =  {};
let curr_uid = parseInt(localStorage.getItem("curr_uid")) || 1;

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


let user1 = new User(
  0,
  "thulasi",
  "thulasi123",
  false,
  3000,
  "thulasikanswe@gmail.com"
);

user_db[0] = user1;

//functions to validate user's email address and password's format
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

function login() {
  user_db = JSON.parse(localStorage.user_db);

  let user_name = document.getElementById("user_name");
  let user_password = document.getElementById("user_password");

  // Checking for the username & password in the database
  for (let key in user_db) {
    if (
      user_db[key].username === user_name.value &&
      user_db[key].password === user_password.value
    ) {
      let user_email = user_db[key].email;
      let user_uid = user_db[key].uid;
      console.log(user_email)
      user_db[key].loggedin = true;
      console.log(user_db[key].loggedin);

      // Save the updated user_db to Local Storage
      //localStorage: localStorage is a built-in web storage object provided by web browsers.
      //It allows you to store key-value pairs locally on the user's browser.
      //The data stored in localStorage persists even after the browser is closed.
      //setItem("user_db", JSON.stringify(user_db)): This method call is used to store a value in localStorage.
      //The method takes two arguments:"user_db": This is the key or name under which the data will be stored in localStorage. It's similar to a variable name.JSON.stringify(user_db): The value associated with the key is the serialized form of the user_db object. The JSON.stringify() function is used to convert the JavaScript object (user_db) into a JSON string. This is necessary because localStorage can only store string values.
      localStorage.setItem("user_db", JSON.stringify(user_db));
      localStorage.setItem('disp_user_email', user_email);
      localStorage.setItem('user_uid', user_uid);

      // Redirect to the dashboard page//
      window.location.href = "dashboard.html";

      return;
    }
  }
  // Do this if user not found
  alert("Incorrect Username or Password ");
}

function signUp() {
  user_db = JSON.parse(localStorage.user_db);

  const new_username = document.getElementById("new_user_name");
  const new_user_email = document.getElementById("new_user_email");
  const new_user_password = document.getElementById("new_user_password");

  for (const key in user_db) {
    if (user_db[key].email == new_user_email.value) {
      alert("User already exists !");
      return;
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
    curr_uid++;

    // Save the updated user_db and curr_uid to Local Storage
    localStorage.setItem("user_db", JSON.stringify(user_db));
    localStorage.setItem("curr_uid", curr_uid.toString());
  } else {
    alert("Invalid Credentials");
  }
}
