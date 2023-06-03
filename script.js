// Function to navigate to the sign-in page
const signIn = () => {
  window.location.href = 'signin.html';
};

// Get the element or Declaration section
const signUpModal = document.getElementById('signUpModal')
const signUpName = document.getElementById('signUpName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const signUpCPassword = document.getElementById('signUpCPassword');
const signUpEmailAd = document.getElementById('signUpEmail');
const signInBtn = document.getElementById('signInBtn');
const signInEmail = document.getElementById('signInEmail')
const signUpBtn = document.getElementById('signUpBtn')
const signUpFirstName = document.getElementById('signUpFirstName')
let SUpUserFound = 0;
let SInUserFound = 0;
let SInContinue = 0
//<--------------------------- Sign Up Page code start Here ---------------->

// Check if there are any existing users in local storage, otherwise initialize an empty array
  var allUser;
  var LSallUser = localStorage.getItem('allUser');
  if (LSallUser) {
    allUser = JSON.parse(LSallUser)
  } else {
    allUser = [];
  }

// Function to clear sign-up input fields
const emptySignUpInput = () => {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpCPassword.value = "";
}

// Event listener for the sign-up button
signUpBtn.addEventListener('click', () => {
  
  // Check if all required fields are filled
  if (signUpName.value != "" && signUpEmail.value != "" && signUpPassword.value != "") {

    // Check if the password matches the confirm password
    if (signUpPassword.value == signUpCPassword.value) {
      errMsgDis() // Clear any previous error message

      // Create an object to represent the new user
      const objUser = {
        name: signUpName.value,
        email: signUpEmail.value,
        pass: signUpPassword.value,
        firstName: signUpFirstName.value
      };

      // Check if the user already exists
      for (let index = 0; index < allUser.length; index++) {
        if (allUser[index].email == signUpEmailAd.value) {
          SUpUserFound = 1
          console.log(allUser[index]);
        }
      }

      if (SUpUserFound == 1) {
        // User already exists, display error message and clear input fields
        errMsg.innerHTML = "User already exists. Click on the sign-in link to log in to your account"
        emptySignUpInput()
        errMsgTimeOut()
      } else {
        // Add the new user to the array
        allUser.push(objUser);

        // Store the updated user array in local storage
        let LSAllUser = JSON.stringify(allUser);
        localStorage.setItem('allUser', LSAllUser);

        // Display success message and clear input fields
        signUpModal.innerHTML += `Congratulations! You are now a customer of Jumia.com.ng <br /> You will be redirected to the login page soon <br /> <img src='src/Infinity-1s-83px.svg'>`
        signUpModal.style.display = "flex"
        errMsg.style.color = "green"
        emptySignUpInput()
        errMsgTimeOut()

        // Redirect to the sign-in page after a delay
        setTimeout(() => {
          window.location.href = 'signin.html'
        }, 10000)

        console.log(allUser);
      }

    } else {
      // Passwords do not match, display error message and focus on the password field
      errMsg.innerHTML = "Passwords do not match"
      signUpPassword.focus()
      errMsgTimeOut()
    }

  } else {
    // Not all required fields are filled, display error message
    errMsg.innerHTML = "* All fields are required"
    errMsgTimeOut()
  }
});

// Function to clear error message
const errMsgDis = () => {
  errMsg.innerHTML = ""
}

// Function to clear error message after a timeout
const errMsgTimeOut = () => {
  setTimeout(errMsgDis, 10000)
}


//<--------------------------- Sign In Page code start Here ---------------->

function signInContinue() {
  for (let index = 0; index < allUser.length; index++) {
    // Check if the email and password match for a user
    if (allUser[index].email == signInEmail.value) {
      SInContinue = 1;
      var i = index;
    }
  }

  // Check if the email field is empty
    if (signInEmail.value == "") {
      errMsg.innerHTML = "Enter Your Email Address";
    } else {
      
      if (SInContinue == 1) {
        errMsg.innerHTML = "";
          console.log(allUser[i]);
    
          // Disable the signInEmail input field
          signInEmail.disabled = true;
          signInEmail.style.color = '#fff';
          signInEmailCon.style.backgroundColor = '#9B9B9C';
          signInPasswordCon.style.display = 'block';
          signInContinueCon.style.display = 'none'
          signInBtnCon.style.display = 'block'
      } else {
        signInEmail.value = ''
        errMsg.innerHTML = "User does not exit, create account with the link below"
      }
    }

}

function signInProcess() {
  // Loop through the array of all users
  for (let index = 0; index < allUser.length; index++) {
    // Check if the email and password match for a user
    if (allUser[index].email == signInEmail.value && allUser[index].pass == signInPassword.value) {
      SInUserFound = 1;
      var i = index;
    }
  }

  if (SInUserFound == 1) {
    localStorage.setItem('currentUser', i)
    localStorage.setItem('currentSession', 1)
    window.location.href = "index.html";
  } else {
    errMsg.innerHTML = "Wrong Password"
  }

}

function userLoginCheck() {
  let currentSession = localStorage.getItem('currentSession');
  const currentUser = localStorage.getItem('currentUser')

  if (currentSession) {
    if (currentSession == 1) {
      accountHolder.innerText = `Hi, ${allUser[currentUser].firstName}`;
      signInCon.style.display = 'none';
      signOutCon.style.display = 'block'
    }
  }
}

function signOut() {

  localStorage.setItem('currentSession', 0)
  window.location.href = 'index.html'
}

function mobileMenuOpen() {
  mobileMenu.style.left = "-20px"
}

function mobileMenuClose() {
  mobileMenu.style.left = "-600px"
}
