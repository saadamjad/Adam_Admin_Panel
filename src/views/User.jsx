/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { GetOrder, EditOrder } from "../Store/actions/userAuth";

class EditOrder1 extends React.Component {
  state = {
    fullName: "",
    StreetAddress: "",
    ContactNo: "",
    city: "",
    country: "",
    emailAddress: "",
    total: ""
  };
  componentDidMount() {
    this.setState({
      fullName: this.props.data.fullName,
      StreetAddress: this.props.data.StreetAddress,
      ContactNo: this.props.data.ContactNo,
      city: this.props.data.city,
      emailAddress: this.props.data.emailAddress,
      total: this.props.data.product.price,
      status: this.props.data.status,
      pickUpDate: this.props.data.pickUpDate,
      pickUpTime: this.props.data.pickUpTime
    });
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  EditOrder = () => {
    let {
      fullName,
      StreetAddress,
      ContactNo,
      city,
      emailAddress,
      total,
      status,
      pickUpDate,
      pickUpTime
    } = this.state;
    if (
      fullName !== "" &&
      pickUpTime !== "" &&
      pickUpDate !== "" &&
      StreetAddress !== "" &&
      ContactNo !== "" &&
      city !== "" &&
      emailAddress !== "" &&
      total !== "" &&
      status !== ""
    ) {
      let data = {
        fullName,
        StreetAddress,
        ContactNo,
        city,
        emailAddress,
        total,
        status,
        pickUpDate,
        pickUpTime,
        user: this.props.data.user,
        product: this.props.data.product,
        id: this.props.data.id
      };
      this.props.editOrder(data);
    } else {
      alert("Kindly Fill All fields");
    }
  };

  render() {
    return (
      <>
        <Card>
          <CardBody>
            <div className="form-group">
              <div className="dropdown">
                <label for="formGroupExampleInput">{this.state.role}</label>{" "}
                <br />
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton0"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.state.status}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton0"
                >
                  <a
                    className="dropdown-item"
                    onClick={() => this.handleChange("status", "pending")}
                  >
                    Pending
                  </a>
                  <a
                    className="dropdown-item"
                    onClick={() => this.handleChange("status", "delivered")}
                  >
                    Delivered
                  </a>
                  <a
                    className="dropdown-item"
                    onClick={() => this.handleChange("status", "cancelled")}
                  >
                    Cancelled
                  </a>
                </div>
              </div>
              <label for="formGroupExampleInput">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={this.props.data.product.productName}
                id="formGroupExampleInput"
                disabled={true}
                placeholder="Your Product Name"
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={this.state.fullName}
                onChange={e => this.handleChange("fullName", e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Email</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={this.state.emailAddress}
                onChange={e =>
                  this.handleChange("emailAddress", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Total</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={this.state.total}
                onChange={e => this.handleChange("total", e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Contact No</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={this.state.ContactNo}
                onChange={e => this.handleChange("ContactNo", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">PickUp Date</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={this.state.pickUpDate}
                onChange={e => this.handleChange("pickUpDate", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">PickUp Time</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={this.state.pickUpTime}
                onChange={e => this.handleChange("pickUpTime", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">City</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={this.state.city}
                onChange={e => this.handleChange("city", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Street Address</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                value={this.state.StreetAddress}
                onChange={e =>
                  this.handleChange("StreetAddress", e.target.value)
                }
              />
            </div>

            <button
              type="button"
              class="btn btn-info"
              onClick={() => this.EditOrder()}
            >
              Edit
            </button>
          </CardBody>
        </Card>
      </>
    );
  }
}

class User extends React.Component {
  state = {
    showEdit: false
  };
  componentDidMount() {
    this.props.getOrder();
    if (window.location == "/admin/login") {
      let isLogin = localStorage.getItem("Login");
      if (isLogin) {
        this.props.history.push("/");
      }
    } else {
      let isLogin = localStorage.getItem("Login");
      if (!isLogin) {
        this.props.history.push("/admin/login");
      }
    }
  }
  showEdit = val => {
    this.setState({
      showEdit: !this.state.showEdit,
      data: val
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              {!this.state.showEdit ? (
                <Card className="card-user">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Product</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact No</th>
                        <th scope="col">Status</th>
                        <th scope="col">Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.orders &&
                        this.props.orders.map((val, i) => (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{val.fullName}</td>
                            <td>{val.emailAddress}</td>
                            <td>{val.product.productName}</td>
                            <td>{val.StreetAddress}</td>
                            <td>{val.ContactNo}</td>
                            <td>{val.status}</td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-primary"
                                onClick={() => this.showEdit(val)}
                              >
                                Show Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Card>
              ) : (
                <EditOrder1
                  data={this.state.data}
                  editOrder={this.props.editOrder}
                />
              )}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapActionToProps = state => ({
  orders: state.Login.orders
});

const mapDispatchToProps = dispatch => ({
  getOrder: () => dispatch(GetOrder()),
  editOrder: data => dispatch(EditOrder(data))
});

export default connect(mapActionToProps, mapDispatchToProps)(User);
