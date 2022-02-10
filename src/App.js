import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Contact from "./Contact.js";
import { Login, Signup } from "./Login.js";
import Services from "./Services.js";
import Cart from "./Cart.js";
import Admin from "./Admin.js";
import Booking, {
  Trousers,
  Restyling,
  Skirts,
  Jackets,
  Shirts,
  WeddingDresses
} from "./Booking.js";
import "./styles.css";
import { getAuth, signOut } from "firebase/auth";

//Main class where all components are called through their specific routes
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: []
    };
    this.getDataFromLogin = this.getDataFromLogin.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  //get login data from child component
  getDataFromLogin(userInfo, checkUserLogin) {
    this.setState({ isLoggedIn: checkUserLogin, user: userInfo });
    console.log(this.state.user, this.state.isLoggedIn);
  }

  //log out from the app
  logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.setState({ isLoggedIn: false, user: [] });
      })
      .catch((error) => {
        // An error happened.
      });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBarHome
            email={this.state.user.email}
            isLoggedIn={this.state.isLoggedIn}
            logOut={this.logOut}
          />
          <Routes>
            {this.state.isLoggedIn === false && (
              <>
                <Route exact path="/" element={<MainHome />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
                <Route
                  exact
                  path="/login"
                  element={<Login sendData={this.getDataFromLogin} />}
                ></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
                <Route exact path="/services" element={<Services />}></Route>
              </>
            )}

            {this.state.isLoggedIn === true && (
              <>
                {this.state.user.email === "zoe.corrigan.2021@mumail.ie" && (
                  <Route exact path="/admin" element={<Admin />}></Route>
                )}
                <Route exact path="/" element={<MainHome />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
                <Route exact path="/services" element={<Services />}></Route>
                <Route
                  exact
                  path="/booking/restyling"
                  element={<Restyling email={this.state.user.email} />}
                ></Route>
                <Route
                  exact
                  path="/cart"
                  element={<Cart email={this.state.user.email} />}
                ></Route>
                <Route
                  exact
                  path="/booking/trousers"
                  element={<Trousers email={this.state.user.email} />}
                ></Route>
                <Route
                  exact
                  path="/booking/shirts"
                  element={<Shirts email={this.state.user.email} />}
                ></Route>
                <Route
                  exact
                  path="/booking/jackets"
                  element={<Jackets email={this.state.user.email} />}
                ></Route>
                <Route
                  exact
                  path="/booking/weddingdresses"
                  element={<WeddingDresses email={this.state.user.email} />}
                ></Route>
                <Route
                  exact
                  path="/booking/skirts"
                  element={<Skirts email={this.state.user.email} />}
                ></Route>
                <Route exact path="/booking" element={<Booking />}></Route>
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

//navbar component
const NavBarHome = (props) => {
  return (
    <div className="NavbarHome">
      <Navbar className="navbar" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>
            <img
              src="https://lh3.googleusercontent.com/proxy/K5FXX4v7ljeNQYJqiEnFJ95MFjU1pjA2yveW_NgeprNUu2VgbZmOfNbOZZJ6bgz-xBp6kv4gwIVV9tF-XGhncAQiOodJ7rbOywhkUpqY3-xXN57JjnUa23NDgfMXOP8x8zGCM1_g9t2lktK8PPSHGCs3CkIGluumdsQSYlzfE-vznul0bA"
              width="50px"
              alt=""
            />
            <span /> Zoe's Alterations
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                className="link"
                to="/"
              >
                Home
              </Link>

              {props.isLoggedIn === true && (
                <>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    className="link"
                    to="/booking"
                  >
                    Booking
                  </Link>
                </>
              )}
              <Link
                style={{ textDecoration: "none", color: "black" }}
                className="link"
                to="/services"
              >
                Services
              </Link>

              <Link
                style={{ textDecoration: "none", color: "black" }}
                className="link"
                to="/contact"
              >
                Contact
              </Link>
            </Nav>
            <Nav>
              <Navbar.Text>
                {props.email !== "zoe.corrigan.2021@mumail.ie" && (
                  <img
                    src="https://static.thenounproject.com/png/178831-200.png"
                    alt=""
                    className="icon"
                  />
                )}

                {props.email === "zoe.corrigan.2021@mumail.ie" && (
                  <Link to="/admin">
                    <img
                      title="Manage Orders"
                      src="https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-admin.png"
                      alt=""
                      className="icon"
                    />
                  </Link>
                )}
                {props.isLoggedIn === true && <div>{props.email}</div>}
                {props.isLoggedIn === false && (
                  <Link className="link" to="/login">
                    Login
                  </Link>
                )}
              </Navbar.Text>
            </Nav>
            {props.isLoggedIn === true && (
              <>
                <Link to="/cart" className="link">
                  <img
                    title="Cart"
                    src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                    alt=""
                    className="icon"
                  />
                </Link>
                <br />

                <img
                  onClick={props.logOut}
                  title="Log out"
                  src="https://cdn.icon-icons.com/icons2/2716/PNG/512/sign_out_icon_172901.png"
                  className="icon"
                  alt=""
                />
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

//Home page's main content
const MainHome = (props) => {
  return (
    <div className="main-home p-2">
      <h1>Simplify clothing alterations and repairs</h1>
      <br />
      <h1>Five simple steps to get you started</h1>
      <br />

      <div className="main-options container p-2">
        <div className="row">
          <div className="login-home col-sm">
            <img
              src="https://static.thenounproject.com/png/178831-200.png"
              alt=""
            />
            <div>Login/Create an account</div>
          </div>

          <div className="booking-home col-sm">
            {" "}
            <img
              src="https://static.thenounproject.com/png/1131224-200.png"
              alt=" "
            />
            <div>Book a service</div>
          </div>

          <div className="drop-home col-sm">
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1515/1515640.png"
              alt=" "
            />
            <div>Drop your item at our store</div>
          </div>

          <div className="track-home col-sm">
            {" "}
            <img
              src="https://static.thenounproject.com/png/1328079-200.png"
              alt=" "
            />
            <div>Track order progress</div>
          </div>

          <div className="ready-home col-sm">
            {" "}
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/regular-icon/done-7.png"
              alt=" "
            />
            <div>Order is ready for pickup</div>
          </div>

          <div className="row">
            <div className="get-started col-sm">
              <br />

              {props.isLoggedIn === false && (
                <Link to="/login">
                  <button className="addtocart-btn color-10">
                    Get Started
                  </button>{" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
