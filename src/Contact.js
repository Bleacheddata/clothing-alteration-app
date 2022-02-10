import "./styles.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";

//Contact page which displays general contact info
class Contact extends React.Component {
  render() {
    return (
      <div className="Contact">
        <h1>Zoe's Alterations Ltd</h1>
        <br />
        <h4> Main Street Maynooth,</h4>
        <h4>Co. Kildare.</h4>
        <br />
        <h4>Email: info@alterationltd.ie</h4>
        <h4>Tel: 0812345678</h4>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Contact;
