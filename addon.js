// preventing screen from refreshing
// window.addEventListener("beforeunload", function (e) {
//     e.preventDefault();
//     e.returnValue = ''
//   });


// window.onload = () => {
//   user_db = JSON.parse(localStorage.user_db);
// };
user_db = JSON.parse(localStorage.user_db);
let disp_user_name = document.getElementById("disp_user_name");
disp_user_name.innerHTML = localStorage.disp_user_email;
let user_balance = document.getElementById("user_balance");
user_balance.innerHTML = user_db[localStorage.user_uid].balance + " Rs";


function widraw() {
  let widraw_amount = document.getElementById("widraw_amount");
  if (widraw_amount.value < 0 || widraw_amount.value == "e") {
    alert("Invalid Amount");

    return;
  }

  if (parseInt(widraw_amount.value) > parseInt(user_balance.innerHTML)) {
    alert("Insufficient Balance");
  } else {
    user_db[localStorage.user_uid].balance -= widraw_amount.value;
    user_balance.innerHTML = user_db[localStorage.user_uid].balance + " Rs";
    widraw_amount.value = "";
    localStorage.setItem("user_db", JSON.stringify(user_db));
  }
}

function deposit() {
 
  let deposit_amount = document.getElementById("deposit_amount");
  if (deposit_amount.value < 0 || deposit_amount.value == "e") {
    alert("Invalid Amount");

    return;
  }

  if (parseInt(deposit_amount.value) > 10000000) {
    alert("Deposit limit reached");
  } else {
    user_db[localStorage.user_uid].balance += parseInt(deposit_amount.value);
    user_balance.innerHTML = user_db[localStorage.user_uid].balance + " Rs";
    deposit_amount.value = "";
    localStorage.setItem("user_db", JSON.stringify(user_db));
  }
}
// NOTE
// localStorage.user_db;
// ('{"0":{"uid":0,"username":"thulasi","password":"thulasi123","loggedin":false,"balance":2966,"email":"thulasikanswe@gmail.com"},"1":{"uid":1,"username":"thulasikan","password":"thulasikan","loggedin":true,"balance":0,"email":"thulasikanswe@gmail.org"}}');
// localStorage only stores strings. ask gpt how to parse back to usable format (obj)
