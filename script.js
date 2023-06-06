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
          signInPassword.focus()
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
  const accountHolderMo = document.getElementById('accountHolderMo')

  if (currentSession) {
    if (currentSession == 1) {
      const userFirstName = allUser[currentUser].firstName;

      accountHolder.innerText = `Hi, ${userFirstName}`;
      signInCon.style.display = 'none';
      signOutCon.style.display = 'block'
      signInMoCon.style.display = 'none';
      signOutMoCon.style.display = 'block'
      accountHolderMo.innerText = `Hi, ${userFirstName}`;
    }
  }

loadProduct()
loadCart()

}

function signOut() {

  localStorage.setItem('currentSession', 0)
  window.location.href = 'index.html'
}

function mobileMenuOpen() {
  mobileMenu.style.display = 'flex'
  mobileMenu.style.left = "0px"
}

function mobileMenuClose() {
  mobileMenu.style.left = "-600px"
}

function mobileMenuDisp() {
  mobileMenu.style.display = 'none'
}

function loadProduct() {
  var allProduct;
  var LSallProduct = localStorage.getItem('allProduct');
  if (LSallProduct) {
    allProduct = JSON.parse(LSallProduct)
  } else {
    allProduct = [];
  }

  class ProductItem {
      constructor (productName, productImage, price, oldPrice, category, topSell, flashSell) {
          this.productName = productName;
          this.productImage = productImage;
          this.price = price;
          this.oldPrice = oldPrice;
          this.category = category;
          this.topSell = topSell;
          this.flashSell = flashSell;
      }
  }

  if (!LSallProduct) {
    
  let productItem1 = new ProductItem(
    "Biore UV Aqua Rich Watery Essence Sunscreen SPF 50 (50ml)", "Biore UV Aqua Rich Watery Essence Sunscreen SPF 50 (50ml).jpeg", "₦ 3400", "₦ 3,500", "Fashion", true, false
  )

  let productItem2 = new ProductItem(
      "EILIFINTE B06 Casual Crossbody Shoulder Chest Bag-Grey", "EILIFINTE B06 Casual Crossbody Shoulder Chest Bag-Grey.jpeg", "₦ 9000", "₦ 3,500", "Fashion", true, false
  )

  let productItem3 = new ProductItem(
      "Eaget Flash Drive 3.0 64GB - Metal OTG Micro USB Type-C", "Eaget Flash Drive 3.0 64GB - Metal OTG Micro USB Type-C.jpeg", "₦ 10000", "₦ 3,500", "Fashion", true, false
  )

  let productItem4 = new ProductItem(
      "100 Cotton Short Sleeve T-Shirts Shorts Set", "100 Cotton Short Sleeve T-Shirts Shorts Set.jpeg", "₦ 4800", "₦ 3,500", "Fashion", true, false
  )

  let productItem5 = new ProductItem(
    "Feng Shui Black Obsidian Wealth Bracelet", "Feng Shui Black Obsidian Wealth Bracelet.jpeg", "₦ 2,800", "₦ 3,500", "Fashion", true, false
  )

  let productItem6 = new ProductItem(
    "Fruit Lip Balm Unisex  Pink Lips Magic Cream (3Days Active)", "Fruit Lip Balm Unisex  Pink Lips Magic Cream (3Days Active).jpeg", "₦ 2,800", "₦ 3,500", "Fashion", true, false
  )

  let productItem7 = new ProductItem(
    "Geneva Unisex Casual Wrist Watch With Bracelet- Gold", "Geneva Unisex Casual Wrist Watch With Bracelet- Gold.jpeg", "₦ 2,800", "₦ 3,500", "Fashion", true, false
  )

  let productItem8 = new ProductItem(
    "Fruit Lip Balm Unisex  Pink Lips Magic Cream (3Days Active)", "Fruit Lip Balm Unisex  Pink Lips Magic Cream (3Days Active).jpeg", "₦ 2,800", "₦ 3,500", "Fashion", true, false
  )

  let productItem9 = new ProductItem(
  "Biore UV Aqua Rich Watery Essence Sunscreen SPF 50 (50ml)", "Biore UV Aqua Rich Watery Essence Sunscreen SPF 50 (50ml).jpeg", "₦ 2,800", "₦ 3,500", "Fashion", false, true
  )

  let productItem10 = new ProductItem(
  "EILIFINTE B06 Casual Crossbody Shoulder Chest Bag-Grey", "EILIFINTE B06 Casual Crossbody Shoulder Chest Bag-Grey.jpeg", "₦ 2,800", "₦ 3,500", "Fashion", false, true
  )

  let productItem11 = new ProductItem(
  "Eaget Flash Drive 3.0 64GB - Metal OTG Micro USB Type-C", "Eaget Flash Drive 3.0 64GB - Metal OTG Micro USB Type-C.jpeg", "₦ 9800", "₦ 3,500", "Fashion", false, true
  )

  let productItem12 = new ProductItem(
  "100 Cotton Short Sleeve T-Shirts Shorts Set", "100 Cotton Short Sleeve T-Shirts Shorts Set.jpeg", "₦ 2800", "₦ 9500", "Fashion", false, true
  )

  let productItem13 = new ProductItem(
  "Mens Sports T-shirts+Pants Suit(white)", "Mens Sports T-shirts+Pants Suit(white).jpeg", "₦ 3900", "₦ 3500", "Fashion", false, true
  )

  let productItem14 = new ProductItem(
  "Men's Casual Light Weight Baseball Collar Jacket-Black", "Men's Casual Light Weight Baseball Collar Jacket-Black.jpeg", "₦ 800", "₦ 3500", "Fashion", false, true
  )

  let productItem15 = new ProductItem(
  "Geneva Unisex Casual Wrist Watch With Bracelet- Gold", "Geneva Unisex Casual Wrist Watch With Bracelet- Gold.jpeg", "₦ 7800", "₦ 3500", "Fashion", false, true
  )

  let productItem16 = new ProductItem(
  "IPhone X 3GB RAM+64GB(Renewed)  -Black", "IPhone X 3GB RAM+64GB(Renewed)  -Black.jpeg", "₦ 4800", "₦ 3500", "Fashion", false, true
  )

  allProduct.push(productItem1, productItem2,productItem3, productItem4, productItem5, productItem6,productItem7, productItem8, productItem9, productItem10, productItem11, productItem12, productItem13, productItem14,productItem15, productItem16)

    localStorage.setItem("allProduct", JSON.stringify(allProduct))
  }

  

  topSellingItem.innerHTML =  ""
  flashItem.innerHTML = ""


  for (let index = 0; index < allProduct.length; index++) {
      if (allProduct[index].topSell == true){
          topSellingItem.innerHTML +=  `
          <div class="productCard" id="productCard">
          <div class="productImage">
              <img src="src/product/${allProduct[index].productImage}" class="img-fluid" alt="">
          </div>
          <div class="productText">
              <a href="productDetails.html" onclick="currentProductDet(${index})">
                <p class="productName text-truncate">
                    ${allProduct[index].productName}
                </p>
              </a>
        
              <h5 class="price">
                  ${allProduct[index].price}
              </h5>
        
              <p class="oldPrice">
                  ${allProduct[index].oldPrice}
              </p>
          </div>
        </div>
          `
      } else if (allProduct[index].flashSell == true) {
        flashItem.innerHTML += `<div class="productCard" id="productCard">
        <div class="productImage">
            <img src="src/product/${allProduct[index].productImage}" class="img-fluid" alt="">
        </div>
        <div class="productText">
            <a href="productDetails.html" onclick="currentProductDet(${index})">
              <p class="productName text-truncate">
                  ${allProduct[index].productName}
              </p>
            </a>
      
            <h5 class="price">
                ${allProduct[index].price}
            </h5>
      
            <p class="oldPrice">
                ${allProduct[index].oldPrice}
            </p>
        </div>
      </div>
        `
      }
    }

}

function currentProductDet(index) {
  localStorage.setItem("currentProduct", index)
}

function loadProductDetails() {
  const LSProductDetails = localStorage.getItem('currentProduct');

  var allProduct;
  var LSallProduct = localStorage.getItem('allProduct');
  if (LSallProduct) {
    allProduct = JSON.parse(LSallProduct)
  }

  console.log(LSProductDetails);

  document.title = allProduct[LSProductDetails].productName;

  pDImage.innerHTML = `<img src="src/product/${allProduct[LSProductDetails].productImage}" class="img-fluid" alt="">`

  pDText.innerHTML = `
    <h5>
      ${allProduct[LSProductDetails].productName}
    </h5>
    <small>Good Quality</small> <br>
    <img src="src/138x18.png" alt="">
    <hr>
    <h4 class="fw-bolder">${allProduct[LSProductDetails].price}</h4>
    <span class="oldPrice">${allProduct[LSProductDetails].oldPrice}</span> <br>
    <input type="number" class="p-1 m-1" placeholder="Enter Quantity" id="productQty${LSProductDetails}"><small>In stock</small>
    <hr>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus laboriosam veritatis iste aliquid ab at nesciunt repellendus incidunt blanditiis impedit, sit quam omnis error debitis quibusdam natus tempora sint assumenda.</p>
    <button class="w-100" onclick="addToCart(${LSProductDetails})"><i class="fa-solid fa-cart-plus text-light"></i> Add To Cart</button>
  `

  userLoginCheck()
  loadCart()
}

