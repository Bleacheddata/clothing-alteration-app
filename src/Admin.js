import React from "react";
import {
  getDocs,
  doc,
  updateDoc,
  collection,
  deleteDoc
} from "firebase/firestore";
import { db } from "./MyFirebase.js";
import { div, Container, Row, Col } from "react-bootstrap";
export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };

    this.cancelOrder = this.cancelOrder.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
  }

  //cancel the selected pending order by removing it from database
  async cancelOrder(id) {
    await deleteDoc(doc(db, "orders", id));
    this.componentDidMount();
  }

  //change the order's status to pending
  async confirmOrder(id) {
    const orderRef = doc(db, "orders", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(orderRef, {
      status: "confirmed"
    });
    this.componentDidMount();
  }

  //get all orders
  async componentDidMount() {
    this.setState({ orders: [] });
    const query = await getDocs(collection(db, "orders"));
    query.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      this.setState({ orders: this.state.orders.concat(data) });
    });

    console.log(this.state.orders);
  }
  render() {
    return (
      <div className="Admin">
        {this.state.orders.length === 0 && (
          <div>
            <h1> No orders yet... </h1>
          </div>
        )}
        {this.state.orders.length !== 0 && (
          <>
            <h1> Admin - Manage orders </h1>
            <Container className="card-container">
              {this.state.orders.map((i) => (
                <Row className="p-2 border">
                  <Col lg={4} xs={12} className="my-auto mx-auto">
                    <h5 className="grid-text"> Email: {i.email} </h5>
                  </Col>
                  <Col lg={2} xs={12}>
                    {i.items.map((j) => (
                      <div>
                        <h5 className="grid-text">
                          {" "}
                          {j.type} : {" €" + j.price}{" "}
                        </h5>
                      </div>
                    ))}
                  </Col>
                  <Col lg={2} xs={12} className="my-auto mx-auto">
                    <h5 className="grid-text">Status: {i.status}</h5>
                  </Col>
                  <Col lg={2} xs={12} className="my-auto mx-auto">
                    <h5 className="grid-text"> Total: €{i.total}</h5>
                  </Col>
                  <Col lg={1} xs={6} className="my-auto mx-auto">
                    <button
                      onClick={() => this.cancelOrder(i.id)}
                      type="button"
                      className="delete-btn"
                    >
                      X
                    </button>
                  </Col>

                  <Col lg={1} xs={6} className="my-auto mx-auto">
                    <button
                      onClick={() => this.confirmOrder(i.id)}
                      type="button"
                      className="confirm-btn"
                    >
                      ✓
                    </button>
                  </Col>
                </Row>
              ))}
            </Container>
          </>
        )}
      </div>
    );
  }
}
