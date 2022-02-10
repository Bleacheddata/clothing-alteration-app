import React from "react";
import {
  getDoc,
  addDoc,
  doc,
  updateDoc,
  arrayRemove,
  collection
} from "firebase/firestore";
import {
  div,
  Card,
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { db } from "./MyFirebase.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      cart: []
    };
    this.removeFromCart = this.removeFromCart.bind(this);
    this.completeBooking = this.completeBooking.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }
  async componentDidMount() {
    const docRef = doc(db, "carts", this.state.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.setState({ cart: docSnap.data().cart });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  async removeFromCart(item) {
    const itemRef = doc(db, "carts", this.state.email);

    await updateDoc(itemRef, {
      cart: arrayRemove(item)
    });
    this.componentDidMount();
    toast.info(item.type + " removed from cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined
    });
  }
  async completeBooking() {
    const docRef = await addDoc(collection(db, "orders"), {
      items: this.state.cart,
      email: this.state.email,
      status: "pending",
      total: this.state.cart.reduce(this.getTotal, 0)
    });
    console.log("Document written with ID: ", docRef.id);

    const itemRef = doc(db, "carts", this.state.email);

    await updateDoc(itemRef, {
      cart: []
    });

    this.setState({ cart: [] });

    toast.success("Order placed. Pending approval", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }

  getTotal(a, i) {
    return a + i.price;
  }
  render() {
    return (
      <div className="Cart">
        <h1> Cart </h1>
        {this.state.cart.length === 0 && (
          <div>
            <h1>Your cart looks empty...</h1>
            <Link className="link" to="/booking">
              <button className="addtocart-btn">Bookings</button>
            </Link>
          </div>
        )}

        {this.state.cart.length > 0 && (
          <Container className="card-container">
            {this.state.cart.map((i) => (
              <Row className="p-4">
                <Col
                  lg={3}
                  xs={12}
                  className="my-auto mx-auto justify-content-start"
                >
                  <img className="responsive-image" src={i.image} />
                </Col>
                <Col lg={5} xs={12} className="my-auto mx-auto">
                  <h5>{i.type}</h5>
                  {i.instructions}
                </Col>
                <Col lg={2} xs={12} className="my-auto mx-auto">
                  <h5> €{i.price}</h5>
                </Col>
                <Col lg={2} xs={12} className="my-auto mx-auto">
                  <button
                    onClick={() => this.removeFromCart(i)}
                    type="button"
                    className="delete-btn"
                  >
                    X
                  </button>
                </Col>
              </Row>
            ))}
            <Row>
              <Col className="my-auto mx-auto">
                <h2> Total Items: {this.state.cart.length} </h2>
              </Col>
              <Col className="my-auto mx-auto">
                <h2> Total: €{this.state.cart.reduce(this.getTotal, 0)}</h2>
              </Col>
            </Row>

            <Row>
              <Col className="my-auto mx-auto">
                <button
                  onClick={this.completeBooking}
                  className="addtocart-btn"
                >
                  <img
                    src="https://static.thenounproject.com/png/61437-200.png"
                    className="icon"
                    alt=""
                  />{" "}
                  Place Order
                </button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
