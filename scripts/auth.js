import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore,  collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyB92YCP0vsxGJrJnx3rkpoWbk58gAqxaoo",
    authDomain: "game-guide-b5634.firebaseapp.com",
    projectId: "game-guide-b5634",
    storageBucket: "game-guide-b5634.appspot.com",
    messagingSenderId: "889874626411",
    appId: "1:889874626411:web:55d1d5f8e9097d9696fe2e"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  
  const signupForm = document.querySelector('#signup-form');
  const logout = document.getElementById('logout')
  const login = document.getElementById('login-form')


  const getGuides = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'guides'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };
  
  getGuides();

  auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User Just Logged In", user)
        logout.classList.remove("hidden")
    } else {
        console.log("User just logged out", user)
        logout.classList.add("hidden")
    }
   })
  

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
  
    // sign up the user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });


  logout.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut()
    })

  login.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = login['login-email'].value
    const password = login['login-password'].value
  
    // sign in the user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // close the login modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        login.reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  });

