// Go To Sign In Page
const signIn = () => {
  window.location.href = 'signin.html';
};

// Sign Up Query
const signUpBtn = document.getElementById('signUpBtn');
const allUser = [];

signUpBtn.addEventListener('click', () => {
  const signUpName = document.getElementById('signUpName').value;
  const signUpEmail = document.getElementById('signUpEmail').value;
  const signUpPassword = document.getElementById('signUpPassword').value; 
  
  if (signUpName != "" && signUpEmail != "" && signUpPassword !="") {

    if (signUpPassword == signUpCPassword.value) {
      errMsgDis()
      const objUser = {
        name: signUpName,
        email: signUpEmail,
        pass: signUpPassword
      };
    
      allUser.push(objUser);
    
      console.log(allUser);
    } else {
      errMsg.innerHTML = "Password do not match"

      setTimeout(errMsgDis, 3000)
    }

  } else {
    errMsg.innerHTML = "* All field required"

    setTimeout(errMsgDis, 3000)

  }

});

const errMsgDis = () => {
  errMsg.innerHTML = ""
}
