import React from "react";
import { db } from "./MyFirebase.js";
import "./styles.css";
import { Card, Form, FloatingLabel, Container, Row } from "react-bootstrap";
import { servicesList } from "./servicesList.js";
import { setDoc, doc, arrayUnion } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

//Booking page which links to all its relevant pages
class Booking extends React.Component {
  render() {
    return (
      <div className="Booking">
        <div className="available-services">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            className="link"
            to="/booking/restyling"
          >
            <h1> Restyling and Remodelling</h1>{" "}
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            className="link"
            to="/booking/trousers"
          >
            <h1>Trousers</h1>{" "}
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            className="link"
            to="/booking/skirts"
          >
            <h1>Skirts</h1>{" "}
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            className="link"
            to="/booking/jackets"
          >
            <h1>Jackets and Coats</h1>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            className="link"
            to="/booking/shirts"
          >
            {" "}
            <h1>Shirts and Blouses</h1>{" "}
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            className="link"
            to="/booking/weddingdresses"
          >
            {" "}
            <h1>Wedding and Evening Dresses</h1>
          </Link>

          <div className="jackets-coats"></div>

          <div className="shirts-blouses"></div>

          <div className="wedding-dresses"></div>
        </div>
      </div>
    );
  }
}

//add the selected item to the logge in users cart in the database
async function addToDatabase(item, email) {
  try {
    const itemToAdd = doc(db, "carts", email);
    await setDoc(itemToAdd, { cart: arrayUnion(item) }, { merge: true }).then(
      toast.info(item.type + " added to cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      })
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//get instruction data and add it selected items value, and call the addToDatabase method
function addToCart(item, email) {
  let itemInstruct = document.getElementById(item.type + "-input");
  item.instructions = itemInstruct.value;
  delete item.email;
  addToDatabase(item, email);
}

//page which displays all the service options as cards
export const Restyling = (props) => {
  return (
    <div className="restyling">
      <h1> Restyling and Remodelling</h1>
      <Container>
        <Row>
          {servicesList.Restyling.map((i) => (
            <div key={i.type} className="col-xs-12 col-lg-6 card-centre">
              <Card
                style={{
                  width: "70vw",
                  margin: "5vw",
                  padding: "5vw"
                }}
                className="card-container"
              >
                <Card.Img
                  className="rounded-corners"
                  variant="top"
                  src={i.image}
                />
                <Card.Body>
                  <Card.Title>
                    {i.type}: €{i.price}
                  </Card.Title>
                  <FloatingLabel label="Instructions">
                    <Form.Control
                      id={i.type + "-input"}
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{
                        height: "100px",
                        background: "rgba(255, 255, 255, 0.8)"
                      }}
                      className="rounded-corners"
                    />
                  </FloatingLabel>
                </Card.Body>

                <Card.Body>
                  <button
                    onClick={() => addToCart(i, props.email)}
                    className="addtocart-btn"
                  >
                    {" "}
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};

//page which displays all the service options as cards
export const Trousers = (props) => {
  return (
    <div className="trousers">
      <h1> Trousers</h1>
      <Container>
        <Row>
          {servicesList.Trousers.map((i) => (
            <div key={i.type} className="col-xs-12 col-lg-6 card-centre">
              <Card
                style={{
                  width: "70vw",
                  margin: "5vw",
                  padding: "5vw"
                }}
                className="card-container"
              >
                <Card.Img
                  className="rounded-corners"
                  variant="top"
                  src={i.image}
                />
                <Card.Body>
                  <Card.Title>
                    {i.type}: €{i.price}
                  </Card.Title>
                  <FloatingLabel label="Instructions">
                    <Form.Control
                      id={i.type + "-input"}
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{
                        height: "100px",
                        background: "rgba(255, 255, 255, 0.8)"
                      }}
                      className="rounded-corners"
                    />
                  </FloatingLabel>
                </Card.Body>

                <Card.Body>
                  <button
                    onClick={() => addToCart(i, props.email)}
                    className="addtocart-btn"
                  >
                    {" "}
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};
//page which displays all the service options as cards
export const Skirts = (props) => {
  return (
    <div className="skirts">
      <h1> Skirts</h1>
      <Container>
        <Row>
          {servicesList.Skirts.map((i) => (
            <div key={i.type} className="col-xs-12 col-lg-6 card-centre">
              <Card
                style={{
                  width: "70vw",
                  margin: "5vw",
                  padding: "5vw"
                }}
                className="card-container"
              >
                <Card.Img
                  className="rounded-corners"
                  variant="top"
                  src={i.image}
                />
                <Card.Body>
                  <Card.Title>
                    {i.type}: €{i.price}
                  </Card.Title>
                  <FloatingLabel label="Instructions">
                    <Form.Control
                      id={i.type + "-input"}
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{
                        height: "100px",
                        background: "rgba(255, 255, 255, 0.8)"
                      }}
                      className="rounded-corners"
                    />
                  </FloatingLabel>
                </Card.Body>

                <Card.Body>
                  <button
                    onClick={() => addToCart(i, props.email)}
                    className="addtocart-btn"
                  >
                    {" "}
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};

//page which displays all the service options as cards
export const Jackets = (props) => {
  return (
    <div className="jackets">
      <h1> Jackets</h1>
      <Container>
        <Row>
          {servicesList.Jackets.map((i) => (
            <div key={i.type} className="col-xs-12 col-lg-6 card-centre">
              <Card
                style={{
                  width: "70vw",
                  margin: "5vw",
                  padding: "5vw"
                }}
                className="card-container"
              >
                <Card.Img
                  className="rounded-corners"
                  variant="top"
                  src={i.image}
                />
                <Card.Body>
                  <Card.Title>
                    {i.type}: €{i.price}
                  </Card.Title>
                  <FloatingLabel label="Instructions">
                    <Form.Control
                      id={i.type + "-input"}
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{
                        height: "100px",
                        background: "rgba(255, 255, 255, 0.8)"
                      }}
                      className="rounded-corners"
                    />
                  </FloatingLabel>
                </Card.Body>

                <Card.Body>
                  <button
                    onClick={() => addToCart(i, props.email)}
                    className="addtocart-btn"
                  >
                    {" "}
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};

//page which displays all the service options as cards
export const Shirts = (props) => {
  return (
    <div className="shirts">
      <h1> Shirts</h1>
      <Container>
        <Row>
          {servicesList.Shirts.map((i) => (
            <div key={i.type} className="col-xs-12 col-lg-6 card-centre">
              <Card
                style={{
                  width: "70vw",
                  margin: "5vw",
                  padding: "5vw"
                }}
                className="card-container"
              >
                <Card.Img
                  className="rounded-corners"
                  variant="top"
                  src={i.image}
                />
                <Card.Body>
                  <Card.Title>
                    {i.type}: €{i.price}
                  </Card.Title>
                  <FloatingLabel label="Instructions">
                    <Form.Control
                      id={i.type + "-input"}
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{
                        height: "100px",
                        background: "rgba(255, 255, 255, 0.8)"
                      }}
                      className="rounded-corners"
                    />
                  </FloatingLabel>
                </Card.Body>

                <Card.Body>
                  <button
                    onClick={() => addToCart(i, props.email)}
                    className="addtocart-btn"
                  >
                    {" "}
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};

//page which displays all the service options as cards
export const WeddingDresses = (props) => {
  return (
    <div className="weddingdresses">
      <h1> Wedding Dresses</h1>
      <Container>
        <Row>
          {servicesList.WeddingDresses.map((i) => (
            <div key={i.type} className="col-xs-12 col-lg-6 card-centre">
              <Card
                style={{
                  background: "rgba(77, 77, 77, 0.3)",
                  width: "70vw",
                  margin: "5vw",
                  padding: "5vw"
                }}
              >
                <Card.Img variant="top" src={i.image} />
                <Card.Body>
                  <Card.Title>
                    {i.type}: €{i.price}
                  </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <FloatingLabel label="Instructions">
                    <Form.Control
                      id={i.type + "-input"}
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{
                        height: "100px",
                        background: "rgba(255, 255, 255, 0.8)"
                      }}
                    />
                  </FloatingLabel>
                </Card.Body>

                <Card.Body>
                  <button
                    onClick={() => addToCart(i, props.email)}
                    className="addtocart-btn"
                  >
                    {" "}
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Booking;
