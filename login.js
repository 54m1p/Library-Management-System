
let loginFlag;
let currentLoggedIn;

let loginFn = () =>{
    loginCheck();
    if(loginFlag){
        console.log("login successful")
        location.href ="index.html";
    }
    else{
        alert("Invalid email or password");
    }
}
const togglePassword = document.querySelector("#togglePass");
const loginPswd = document.querySelector("#login-pswd");
        togglePassword.addEventListener("click", function () {
            const type = loginPswd.getAttribute("type") === "password" ? "text" : "password";
            loginPswd.setAttribute("type", type);
            this.classList.toggle("bi-eye");
        });
let loginCheck = () =>{
    let loginEmail = document.getElementById("login-email").value;
    let loginPswd = document.getElementById("login-pswd").value;
    document.getElementById("login-email").value = "";
    document.getElementById("login-pswd").value = "";

    let creds = localStorage.getItem("creds") != null? JSON.parse(localStorage.getItem("creds")):[];
    for(let i = 0; i<creds.length;i++){
        if(loginEmail == creds[i].email && loginPswd == creds[i].password){
            currentLoggedIn = {
                    name: creds[i].name,
                    email: creds[i].email,
                    password: creds[i].password
            }
            localStorage.setItem("currentLoggedIn",JSON.stringify(currentLoggedIn));
          loginFlag = true;
          break;
          }
        else{
            loginFlag = false;
        }
    }
}
// input.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       document.getElementById("myBtn").click();
//     }
// function to run Onload
let loginLoadFn = () =>{
    console.log("login on load");

}