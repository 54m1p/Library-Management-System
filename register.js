let registerform = document.getElementById("register-form");
registerform.addEventListener("submit", (e) =>{
    e.preventDefault(); 
    formValidate = validatefn();
    if(formValidate == false){
        alert("Not submitted");
        return;
    }
    submitForm();
    registerform.reset();
    //registerform.submit();
});

function validatefn(){
    dateCheckResponse = datecheck();
    emailCheckResponse = emailCheck();
    //pswdCheckResponse = passwordCheck();
    pswdCheckResponse = true;
    if(dateCheckResponse == false){
        alert("Invalid date");
        return false;
    }
    if(emailCheckResponse == false){
            alert("Invalid email");
            return false
        }
    if(pswdCheckResponse == false){
            alert("Invalid password");
            return false;
        }
    return true;
    
}
function datecheck(){
    var inputMonth = document.getElementById("mm").value;
    var inputDay = document.getElementById("dd").value;
    var inputYear = document.getElementById("yyyy").value;

    var currentDate =new Date();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();
    var currentYear = currentDate.getFullYear();

    if((inputYear < currentYear) || (inputYear == currentYear && inputMonth < currentMonth) || (inputYear == currentYear && inputMonth == currentMonth && inputDay < currentDay)){
        return true;
    }
    else{
        return false;
    }
    }

    function emailCheck(){
        var regexValue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        inputEmail = document.getElementById("form-email").value;
        if(inputEmail.match(regexValue)){
            return true;
        }
        else{
            return false;
        }
    }
let inputEmail;

function passwordCheck(){
    var pswd1 = document.getElementById("password").value;
    var pswd2 = document.getElementById("re-password").value;
    if(pswd1 == pswd2 ){
        return true;
    }
    else{
        return false;
    }
}
        const togglePassword = document.querySelector("#togglePass");
        const password = document.querySelector("#password");
        togglePassword.addEventListener("click", function () {
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);
            this.classList.toggle("bi-eye");
        });
        
        const toggleRePass = document.querySelector("#toggleRePass");
        const rePass = document.querySelector("#re-pass");
        toggleRePass.addEventListener("click",function () {
            const reType = rePass.getAttribute("type") === "password" ? "text" : "password";
            rePass.setAttribute("type", reType);
            this.classList.toggle("bi-eye");    
        })
let submitForm = () =>{
    let regDetails = localStorage.getItem('creds') != null? JSON.parse(localStorage.getItem('creds')) : []; 
    const email = document.getElementById("form-email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("firstName").value +" "+ document.getElementById("lastName").value;
    const phone = document.getElementById("phoneNo").value;
    const dob = document.getElementById("mm").value+"/"+document.getElementById("dd").value+"/"+document.getElementById("yyyy").value;
    const genderRadio = document.querySelectorAll('input[name = "gender"]')
    for(const radiobtn of genderRadio){
        if(radiobtn.checked){
            gender = radiobtn.value;
            break;
        }  
    }
    console.log(dob,'dob');
    console.log(gender,'gender');
    regDetails.push({
        name: name,
        email: email,
        password: password,
        dob: dob

})
    console.log(regDetails,'regdetails');
    localStorage.setItem('creds', JSON.stringify(regDetails));
    location.href = "login.html";
}

let discard = document.getElementById("discard");
discard.addEventListener('click', function(){
    location.href = "login.html";
})