// Go To Sign In Page
const signIn = () => {
  window.location.href = 'signin.html';
};

// Sign Up Query
const signUpBtn = document.getElementById('signUpBtn');

signUpBtn.addEventListener('click', () => {
  const allUser = [];
  const signUpName = document.getElementById('signUpName').value;
  const signUpEmail = document.getElementById('signUpEmail').value;
  const signUpPassword = document.getElementById('signUpPassword').value; 
  const signUpCPassword = document.getElementById('signUpCPassword').value; 
  
  const objUser = {
    name: signUpName,
    email: signUpEmail,
    pass: signUpPassword,
    confirmPass: signUpCPassword
  };

  allUser.push(objUser);

  console.log(allUser);
});
