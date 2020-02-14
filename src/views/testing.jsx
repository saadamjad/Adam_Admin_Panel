/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { connect } from "react-redux";
import { Login } from "Store/actions";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { AddProduct } from "Store/actions/userAuth";
import { EditProduct } from "Store/actions/userAuth";

const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
          {
            featureType: "water",
            stylers: [
              {
                saturation: 43
              },
              {
                lightness: -11
              },
              {
                hue: "#0088ff"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                hue: "#ff0000"
              },
              {
                saturation: -100
              },
              {
                lightness: 99
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#808080"
              },
              {
                lightness: 54
              }
            ]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ece2d9"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ccdca1"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#767676"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff"
              }
            ]
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on"
              },
              {
                color: "#b8cb93"
              }
            ]
          },
          {
            featureType: "poi.park",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.sports_complex",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.medical",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi.business",
            stylers: [
              {
                visibility: "simplified"
              }
            ]
          }
        ]
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
      role: "Select Gender",
      gender: "",
      wear: "",
      attire: "",
      allImages: [],
      productName: "",
      description: "",
      price: "",
      gender: "GENDER",
      ware: "",
      cloth: ""
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "dark"
      });
    }
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  componentWillMount() {
    if (this.props.location.state && this.props.location.state !== {}) {
      let data = this.props.location.state;
      this.setState({
        productName: data.productName,
        description: data.description,
        price: data.price,
        gender: data.gender,
        ware: data.ware,
        cloth: data.cloth,
        allImages: data.allImages
      });
    }
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

  addProduct = () => {
    let {
      productName,
      description,
      price,
      allImages,
      gender,
      ware
    } = this.state;
    if (
      productName !== "" &&
      description !== "" &&
      price !== "" &&
      allImages.length !== 0 &&
      gender !== "GENDER" &&
      ware !== ""
    ) {
      console.log("done");
      let data = {
        productName,
        description,
        price,
        allImages,
        gender,
        ware
      };
      this.props.addProduct(data, this.props.history);
      this.setState({
        allImages: [],
        productName: "",
        description: "",
        price: "",
        gender: "GENDER",
        ware: ""
      });
    } else {
      alert("Kindly fill all values");
    }
  };
  editProduct = () => {
    let {
      productName,
      description,
      price,
      allImages,
      gender,
      ware,
      cloth
    } = this.state;
    if (
      productName !== "" &&
      description !== "" &&
      price !== "" &&
      allImages.length !== 0 &&
      gender !== "GENDER" &&
      ware !== ""
    ) {
      console.log("done");
      let data = {
        productName,
        description,
        price,
        allImages,
        gender,
        ware
      };
      this.props.editProduct(
        { ...data, id: this.props.location.state.id },
        this.props.history
      );
      this.setState({
        allImages: [],
        productName: "",
        description: "",
        price: "",
        gender: "GENDER",
        ware: ""
      });
    } else {
      alert("Kindly fill all values");
    }
  };

  render() {
    console.log(this.props);
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>Add Products</CardHeader>
                <CardBody>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: " space-around",
                        alignItems: "center",
                        flexWrap: "wrap"
                      }}
                    >
                      {this.state.allImages.map((val, key) => {
                        return (
                          <div key={key} style={{ width: 150, height: 120 }}>
                            <img
                              style={{ width: "100%", height: "100%" }}
                              src={val.path}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <input
                      type="file"
                      onChange={e => {
                        let reader = new FileReader();
                        let allImages = this.state.allImages;
                        reader.onload = e => {
                          allImages.push({ path: e.target.result });
                          this.setState({ allImages });
                          console.log("Running", allImages);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }}
                    />

                    <div className="dropdown">
                      <label for="formGroupExampleInput">
                        {this.state.role}
                      </label>{" "}
                      <br />
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton0"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {this.state.gender}
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton0"
                      >
                        <a
                          className="dropdown-item"
                          onClick={() => this.handleChange("gender", "Male")}
                        >
                          Male
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => this.handleChange("gender", "Female")}
                        >
                          Female
                        </a>
                      </div>
                    </div>

                    <div class="dropdown ">
                      <a
                        class="btn btn-secondary dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {!this.state.ware ? "Select Wear" : this.state.ware}
                      </a>

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            this.handleChange("ware", "Daily Wear")
                          }
                        >
                          Daily Wear
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            this.handleChange("ware", "Party Wear")
                          }
                        >
                          Party Wear
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            this.handleChange("ware", "Formal Wear")
                          }
                        >
                          Formal Wear
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            this.handleChange("ware", "special offer")
                          }
                        >
                          special offer
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={() => this.handleChange("ware", "Others")}
                        >
                          Others
                        </a>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="formGroupExampleInput">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.productName}
                        onChange={e =>
                          this.setState({ productName: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Your Product Name"
                      />
                    </div>
                    <div className="form-group">
                      <label for="formGroupExampleInput">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.description}
                        onChange={e =>
                          this.setState({ description: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Description"
                      />
                    </div>
                    <div className="form-group">
                      <label for="formGroupExampleInput">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.price}
                        onChange={e => this.setState({ price: e.target.value })}
                        id="formGroupExampleInput"
                        placeholder="Price"
                      />
                    </div>
                    {this.props.location.state === undefined ? (
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => this.addProduct()}
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => this.editProduct()}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProduct: (obj, history) => dispatch(AddProduct(obj, history)),
  editProduct: (obj, history) => dispatch(EditProduct(obj, history))
});

export default connect(null, mapDispatchToProps)(Map);
