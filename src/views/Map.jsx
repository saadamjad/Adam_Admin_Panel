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
import { GetProductCategory } from "Store/actions/userAuth";
import { GetStore } from "Store/actions/userAuth";
import { AddProductAdam } from "Store/actions/userAuth";
import { AddImageToStorage } from "Store/actions/userAuth";
import Axios from "axios";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,

      gender: "Select gender",
      discount: "",
      Tagscategory: "select Category",
      TagsType: "Select Type",
      TagsColour: "select colour",
      allImages: [],
      name: "",
      material: "",

      category: "Select Category",
      quantity: "",
      price: "",
      description: "",
      event: "select event ",

      images: [],
      event_Map: ["winter", "summer", "cristmas", "All"],
      discount: "",
      storeId: "5e09b4f72168722e2856acc4",
      storeName: "select store"
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

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      //  alert("IMAGE HERE");
      console.log("IMAGES", nextProps.images);
      this.setState({
        images: nextProps.images
      });
    }
  }

  componentWillMount() {
    this.props.getStore();
    this.props.productCategory();
  }

  addProductAdam = () => {
    let {
      name,
      material,
      gender,
      category,
      quantity,
      price,
      description,
      event,
      storeId,
      discount,
      Tagscategory
    } = this.state;
    if (
      name !== "" &&
      material !== "" &&
      gender !== "" &&
      category !== "" &&
      quantity !== "" &&
      price !== "" &&
      description !== "" &&
      event !== "" &&
      discount !== "" &&
      Tagscategory !== "" &&
      storeId !== ""
    ) {
      console.log("done");
      let data = {
        name,
        price,
        category,
        event,
        material,
        gender,

        quantity,
        description,

        discount,
        storeId,
        tags: [...Tagscategory.split(","), ...this.state.AITags],
        images: this.props.images
      };
      console.log(data);
      this.props.AddProductAdam(data, this.props.history);
      this.setState({
        productName: "",
        location: "",
        price: "",
        priceRange: "",
        category: "",
        rating: "",
        phoneNumber: "",
        vicinity: "",
        tags: "",
        AITags: []
      });
    } else {
      alert("Kindly fill all values");
      console.log(this.state);
    }
  };
  //   editProduct = () => {
  //     let {
  //       productName,
  //       description,
  //       price,
  //       allImages,
  //       gender,
  //       ware,
  //       cloth
  //     } = this.state;
  //     if (
  //       productName !== "" &&
  //       description !== "" &&
  //       price !== "" &&
  //       allImages.length !== 0 &&
  //       gender !== "GENDER" &&
  //       ware !== ""
  //     ) {
  //       console.log("done");
  //       let data = {
  //         productName,
  //         description,
  //         price,
  //         allImages,
  //         gender,
  //         ware
  //       };
  //       this.props.editProduct(
  //         { ...data, id: this.props.location.state.id },
  //         this.props.history
  //       );
  //       this.setState({
  //         allImages: [],
  //         productName: "",
  //         description: "",
  //         price: "",
  //         gender: "GENDER",
  //         ware: ""
  //       });
  //     } else {
  //       alert("Kindly fill all values");
  //     }
  //   };

  render() {
    console.log(this.props.images, "PROPS");
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>Add Products</CardHeader>
                <CardBody>
                  <div>
                    <div className="form-group">
                      <div className="dropdown">
                        <label
                          for="formGroupExampleInput"
                          style={{ fontSize: 15, fontWeight: "bold" }}
                        >
                          {" "}
                          Select Store{" "}
                        </label>

                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton0"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          style={{ marginLeft: 30 }}
                        >
                          {this.state.storeName}
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton0"
                        >
                          {this.props.store.lenght !== "" ? (
                            this.props.store.map((item, i) => {
                              return (
                                <a
                                  className="dropdown-item"
                                  onClick={() => {
                                    this.handleChange("storeId", item.id);
                                    this.setState({
                                      storeName: item.storeName,
                                      store: item,
                                      storeId: item.id
                                    });
                                    console.log("testing id ", item.id);
                                  }}
                                >
                                  {item.storeName}
                                </a>
                              );
                            })
                          ) : (
                            <a className="dropdown-item">
                              {" No store added "}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="dropdown">
                      <label
                        for="formGroupExampleInput"
                        style={{ fontSize: 15, fontWeight: "bold" }}
                      >
                        {/* {this.state.role} */}
                        select category
                      </label>{" "}
                      <button
                        style={{ marginLeft: 18 }}
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton0"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {this.state.category}
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton0"
                      >
                        {this.props.productCat &&
                          this.props.productCat.map((item, i) => {
                            return (
                              <a
                                className="dropdown-item"
                                onClick={() => {
                                  this.setState({
                                    category: item.Productcategory
                                  });
                                }}
                              >
                                {item.Productcategory}
                              </a>
                            );
                          })}
                      </div>
                    </div>

                    <div className="form-group">
                      <label for="formGroupExampleInput">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        id="formGroupExampleInput"
                        placeholder="Your Product Name"
                      />
                    </div>

                    <div className="form-group">
                      <label for="formGroupExampleInput">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        value={this.state.price}
                        onChange={e => this.setState({ price: e.target.value })}
                        id="formGroupExampleInput"
                        placeholder="Price"
                      />
                    </div>
                    <div className="form-group">
                      <label for="formGroupExampleInput">Discount</label>
                      <input
                        type="number"
                        className="form-control"
                        value={this.state.discount}
                        onChange={e =>
                          this.setState({ discount: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Your Product Discount"
                      />
                    </div>

                    <div className="form-group">
                      <label for="formGroupExampleInput"> material</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.material}
                        onChange={e =>
                          this.setState({ material: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Your Product Materials"
                      />
                    </div>

                    <div className="form-group">
                      <label for="formGroupExampleInput"> Item Details </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.description}
                        onChange={e =>
                          this.setState({ description: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Your Product Details"
                      />
                    </div>

                    <div className="form-group">
                      <label for="formGroupExampleInput"> Quantity </label>
                      <input
                        type="number"
                        className="form-control"
                        value={this.state.qantity}
                        onChange={e =>
                          this.setState({ quantity: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Your Product Quantity"
                      />
                    </div>

                    {/* <div className="form-group">
                      <label for="formGroupExampleInput"> Product Type </label>
                      <input
                        type="text"
                        className="form-control"
                        // value={this.state.event}
                        onChange={e => this.setState({ event: e.target.value })}
                        id="formGroupExampleInput"
                        placeholder="Product Type"
                      />
                    </div> */}

                    <div className="form-group" style={{ marginLeft: 10 }}>
                      <label for="formGroupExampleInput">
                        {" "}
                        select specific event{" "}
                      </label>
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
                          {this.state.event}
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton0"
                        >
                          {this.state.event_Map.map((item, i) => {
                            return (
                              <a
                                onClick={() => this.setState({ event: item })}
                                className="dropdown-item"
                              >
                                {" "}
                                {item}{" "}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginLeft: 10 }}>
                      <div className="dropdown">
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
                            onClick={() => this.setState({ gender: "Male" })}
                            className="dropdown-item"
                          >
                            {" "}
                            Male{" "}
                          </a>
                          <a
                            onClick={() => this.setState({ gender: "Female" })}
                            className="dropdown-item"
                          >
                            {" "}
                            Female{" "}
                          </a>
                          <a
                            onClick={() => this.setState({ gender: "Both" })}
                            className="dropdown-item"
                          >
                            {" "}
                            both{" "}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <img
                        src={
                          this.state.image
                            ? URL.createObjectURL(this.state.image)
                            : null
                        }
                        style={{ height: 100, width: 100, marginRight: 10 }}
                      />
                      <input
                        type="file"
                        onChange={e => {
                          // let reader = new FileReader();
                          let image = e.target.files[0];
                          this.setState({ image: image, loading: true });
                          let data = new FormData();
                          data.append("file", image);
                          //this.setState({ loading: true });
                          Axios.post(
                            "https://dry-taiga-90913.herokuapp.com/" +
                              "api/upload",
                            data,
                            {
                              headers: {
                                "Content-type": "multipart/form-data",
                                Authorization:
                                  "bearer " +
                                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZGY3YjdhMzNlYjQ2MTEzYzgxNjkwNjMiLCJpYXQiOjE1NzY1MjQ0NDJ9.kxXL0-mTUQvQMyUQy70_UNTU1A5xeW3QwGoAt4xAkj8"
                              }
                            }
                          ).then(async response => {
                            //console.log(response);
                            if (response.status == 200) {
                              let rawTags = [];
                              let categories = [];

                              console.log(categories);
                              response.data.forEach(text => {
                                if (text.includes("color")) {
                                  let test = text.replace(" color", "");
                                  rawTags.push(test);
                                } else rawTags.push(text);

                                this.setState({ AITags: rawTags });
                              });
                            }
                          });
                          this.setState({ loading: false });
                          this.props.AddImageToStorage(image);
                        }}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ alignItems: "center" }}
                    >
                      <label
                        for="formGroupExampleInput"
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          alignItems: "center",
                          fontWeight: "bold"
                        }}
                      >
                        Enter Tags For AI (Select Image to Automatically detect)
                      </label>
                    </div>
                    {this.state.loading ? <div>LOADING...</div> : null}
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {this.state.AITags
                        ? this.state.AITags.map((tag, index) => {
                            return (
                              <div
                                style={{
                                  padding: 4,
                                  backgroundColor: "#66615b",
                                  margin: 4,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: 6
                                }}
                                onClick={() => {
                                  let tags = [...this.state.AITags];
                                  tags.splice(index, 1);
                                  this.setState({ AITags: tags });
                                }}
                              >
                                <label style={{ color: "white" }}>{tag}</label>
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
                          })
                        : null}
                    </div>
                    <div className="form-group">
                      <label for="formGroupExampleInput"> Search Terms </label>
                      <textarea
                        //type="text"
                        className="form-control"
                        value={this.state.tags}
                        onChange={e =>
                          this.setState({ Tagscategory: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Type possible terms that can be used to search the Product,
                        MUST BE COMMA SEPARATED eg Digital Watch,Stylish,Trendy,Featured"
                      />
                    </div>

                    {this.props.location.state === undefined ? (
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => this.addProductAdam()}
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        type="button"
                        class="btn btn-info"
                        // onClick={() => this.editProduct()}
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
  editProduct: (obj, history) => dispatch(EditProduct(obj, history)),
  getStore: (obj, history) => dispatch(GetStore(obj, history)),
  productCategory: (obj, history) => dispatch(GetProductCategory(obj, history)),
  AddImageToStorage: obj => dispatch(AddImageToStorage(obj)),
  AddProductAdam: (obj, store, history) =>
    dispatch(AddProductAdam(obj, store, history))
});

const mapActionToProps = state => ({
  store: state.Login.store,
  productCat: state.Login.getProductCategory,
  images: state.Login.images
});

export default connect(mapActionToProps, mapDispatchToProps)(Map);
