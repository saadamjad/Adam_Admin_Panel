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
import { AddStore } from "Store/actions/userAuth";
import { AddStoreImage } from "Store/actions/userAuth";
// import {StoreImage} from 'stor'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "react-loader-spinner";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,

      store_image: "",
      storeAddress: "",

      storeName: "",
      country: "",
      allCategory: [
        "cloths",
        "shoes",
        "Jackets",
        "jewellery",
        "Watches",
        "Men wear",
        "girls Wear"
      ],
      category: [],
      discription: "",
      storeMobileNumber: ""
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

  addStore = () => {
    let {
      storeName,
      discription,
      country,
      storeAddress,
      category,
      storeMobileNumber
    } = this.state;
    if (
      storeName !== "" &&
      discription !== "" &&
      country !== "" &&
      storeMobileNumber !== "" &&
      storeAddress !== "" &&
      category !== ""
    ) {
      console.log("done");
      let data = {
        storeName: storeName,
        description: discription,
        category: category,
        country: country,
        storeImage: this.props.storeImage,
        storeAddress: storeAddress,
        storeMobileNumber: storeMobileNumber
      };
      this.props.addStore(data, this.props.history);
      // this.setState({
      //   storeName: "",
      //   description: "",
      //   category: "",
      //   country: "",
      //   storeImage: "",
      //   storeAddress: "",
      //   storeMobileNumber: ""
      // });
    } else {
      alert("Kindly fill all valuess");
    }
  };
  editStore = () => {
    let {
      storeName,
      discription,
      country,
      category,
      storeAddress
    } = this.state;
    if (storeName !== "" && category !== "" && discription !== "") {
      console.log("done");
      let data = {
        storeName: storeName,
        description: discription,
        category: category,
        country: country,
        storeImage: this.props.storeImage,
        storeAddress: storeAddress
      };
      this.props.addStore(data);
    } else {
      alert("Kindly fill all valuess");
    }
  };

  componentWillReceiveProps(nextProps) {
    // console.log("testing new componements", nextProps.storeImage);
    this.setState({ store_image: nextProps.storeImage });
    // let allImages = this.state.test;
    // allImages.push(nextProps.storeImage);
    // this.setState(allImages);
    // console.log("testing ", this.state.test);
  }

  render() {
    const allStoreCatgry_Variable = [...this.state.allCategory];
    const storeCatgry_Variable = [...this.state.category];
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
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
                      <Card
                        style={{
                          width: "25%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center"
                          // backgroundColor: "red"
                        }}
                      >
                        <div
                          style={{
                            width: 200,
                            height: 150,
                            borderWidth: 1,
                            borderRadius: 10
                          }}
                        >
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={
                              this.state.store_image
                                ? this.state.store_image
                                : null
                            }
                            alt="image"
                          />
                        </div>
                      </Card>
                    </div>
                    <div className="form-group" style={{ marginLeft: 10 }}>
                      <label for="formGroupExampleInput">
                        {" "}
                        Select category of the store{" "}
                      </label>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        borderWidth: 1,
                        width: "100%"
                      }}
                    >
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton0"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          // value={this.state.event}
                          aria-expanded="false"
                        >
                          {"select Category "}
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton0"
                        >
                          {this.state.allCategory.map((item, i) => {
                            return (
                              <a
                                onClick={() => {
                                  storeCatgry_Variable.push(item);
                                  allStoreCatgry_Variable.splice(i, 1);
                                  this.setState({
                                    category: storeCatgry_Variable,
                                    allCategory: allStoreCatgry_Variable
                                  });
                                }}
                                className="dropdown-item"
                              >
                                {" "}
                                {item}{" "}
                              </a>
                            );
                          })}
                        </div>
                      </div>{" "}
                      {this.state.category.map((item, i) => {
                        return (
                          <div
                            style={{
                              padding: 4,
                              backgroundColor: "#66615b",
                              margin: 10,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 6
                            }}
                            onClick={() => {
                              storeCatgry_Variable.splice(i, 1);
                              allStoreCatgry_Variable.push(item);
                              this.setState({
                                category: storeCatgry_Variable,
                                allCategory: allStoreCatgry_Variable
                              });
                              this.forceUpdate();
                            }}
                          >
                            <label style={{ color: "white" }}> {item} </label>
                            <p
                              style={{
                                display: "inline",
                                marginLeft: 8,
                                color: "white"
                              }}
                            >
                              x
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="form-group">
                      <label for="formGroupExampleInput">Store Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.storeName}
                        onChange={e =>
                          this.setState({ storeName: e.target.value })
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
                        value={this.state.discription}
                        onChange={e =>
                          this.setState({ discription: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Description"
                      />
                    </div>

                    <div className="form-group">
                      <label for="formGroupExampleInput"> country</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.country}
                        onChange={e =>
                          this.setState({ country: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Your Product Name"
                      />
                    </div>

                    <div className="form-group">
                      <label for="formGroupExampleInput"> store Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.storeAddress}
                        onChange={e =>
                          this.setState({ storeAddress: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Store address"
                      />
                    </div>
                    <div className="form-group">
                      <label for="formGroupExampleInput"> Phone no </label>
                      <input
                        type="number"
                        className="form-control"
                        value={this.state.storeMobileNumber}
                        onChange={e =>
                          this.setState({ storeMobileNumber: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Store address"
                      />
                    </div>
                    {/* <div className="form-group">
                      <label for="formGroupExampleInput"> Category</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.category}
                        onChange={e =>
                          this.setState({ category: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Your Product Name"
                      />
                    </div> */}

                    <input
                      type="file"
                      onChange={e => {
                        // let reader = new FileReader();
                        let image = e.target.files[0];

                        this.props.StoreImages(image);
                      }}
                    />

                    {this.props.location.state === undefined ? (
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => this.addStore()}
                      >
                        Add
                      </button>
                    ) : (
                      <button type="button" class="btn btn-info">
                        Edit
                      </button>
                    )}
                  </div>
                </CardBody>
              </Card>

              {this.props.Loader ? (
                <div
                  style={{
                    alignItems: "center",
                    position: "absolute",
                    bottom: 0,
                    right: 650
                  }}
                >
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={50}
                    width={50}
                    // style={}
                    // timeout={3000} //3 secs
                  />
                </div>
              ) : null}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addStore: (obj, history) => dispatch(AddStore(obj, history)),
  editProduct: (obj, history) => dispatch(EditProduct(obj, history)),
  StoreImages: (obj, history) => dispatch(AddStoreImage(obj, history))
});

const mapActionToProps = state => ({
  storeImage: state.Login.StoreImage,
  Loader: state.Login.isLoading
});

export default connect(mapActionToProps, mapDispatchToProps)(Map);
