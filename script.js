// Go To Sign In Page
const signIn = () => {
  window.location.href = 'signin.html';
};

var signUpModal = document.getElementById('signUpModal')

// Sign Up Query
const signUpBtn = document.getElementById('signUpBtn');
var allUser;
var LSallUser = localStorage.getItem('allUser');
if (LSallUser) {
  allUser = JSON.parse(LSallUser)
} else {
  allUser = [];
}

const emptySignUpInput = () => {
      signUpName.value = "";
      signUpEmail.value = "";
      signUpPassword.value = "";
      signUpCPassword.value = "";
}

signUpBtn.addEventListener('click', () => {
  const signUpName = document.getElementById('signUpName');
  const signUpEmail = document.getElementById('signUpEmail');
  const signUpPassword = document.getElementById('signUpPassword'); 
  const signUpCPassword = document.getElementById('signUpCPassword'); 

  if (signUpName.value != "" && signUpEmail.value != "" && signUpPassword.value !="") {
    
    if (signUpPassword.value == signUpCPassword.value) {
      errMsgDis()
      const objUser = {
        name: signUpName.value,
        email: signUpEmail.value,
        pass: signUpPassword.value
      };

      let SUpUserFound = 0;
      let signUpEmailAd = document.getElementById('signUpEmail')
      for (let index = 0; index < allUser.length; index++) {
        if (allUser[index].email == signUpEmailAd.value) {
          SUpUserFound = 1
          console.log(allUser[index]);
        }
      }

      if (SUpUserFound == 1) {
        errMsg.innerHTML = "User already exist, click on sign in link to login to your account"
        emptySignUpInput()
        errMsgTimeOut()

      } else {
        allUser.push(objUser);

      let LSAllUser = JSON.stringify(allUser);
      localStorage.setItem('allUser', LSAllUser);
      errMsg.innerHTML = `Congratulation!!! You are now a customer of Jumia.com.ng <br /> Click on sign in link below to access your account <br /> You will be redirected to login page soon <br />`
      signUpModal.innerHTML += `Congratulation!!! You are now a customer of Jumia.com.ng <br /> You will be redirected to login page soon <br /> <img src='src/Infinity-1s-83px.svg'>`
      signUpModal.style.display = "flex"
      errMsg.style.color = "green"
      emptySignUpInput()
      errMsgTimeOut()

      setTimeout(() => {
        window.location.href = 'signin.html'
      }, 10000)

      console.log(allUser);
      }

    } else {
      errMsg.innerHTML = "Password do not match"
      signUpPassword.focus()
      errMsgTimeOut()
    }

  } else {
    errMsg.innerHTML = "* All field required"
    errMsgTimeOut()

  }

});

const errMsgDis = () => {
  errMsg.innerHTML = ""
}

const errMsgTimeOut = () => {

  setTimeout(errMsgDis, 10000)
} 

