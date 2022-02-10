import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = (props) => {
  let navigate = useNavigate();

  //send log in data to parent component which is App
  function sendDataToApp(user, isLoggedIn) {
    props.sendData(user, isLoggedIn);
  }

  //sign in by getting authenticated through firebase
  async function signIn(event) {
    event.preventDefault();
    let email = event.target[0].value;
    let password = event.target[1].value;
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        sendDataToApp(user, true);
        toast.info("Logged in successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Either email or password are incorrect");
        console.log(errorCode + errorMessage);
      });
  }

  return (
    <div className="Login">
      <form className="form-signin" onSubmit={signIn}>
        <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
        <label className="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
        />
        <label className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        Not signed up yet? <Link to="/signup"> Create an account </Link>
        <button className="login-btn" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

//Sign up page where user can create a new account
export const Signup = () => {
  let navigate = useNavigate();
  async function signUp(event) {
    event.preventDefault();
    let email = event.target[0].value;
    let password = event.target[1].value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        toast.info("Signed up successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        });
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  return (
    <div className="Signup">
      <form className="form-signin" onSubmit={signUp}>
        <h1 className="h3 mb-3 font-weight-normal">Sign up</h1>
        <label className="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
        />
        <label className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        Signed up already? <Link to="/login"> Log in </Link> <br />
        <button className="login-btn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};
