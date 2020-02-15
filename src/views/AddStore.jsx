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

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,

      allImages: [],

      storeName: "",
      country: "",

      category: "",
      discription: ""
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

  addProduct = () => {
    let {
      storeName,
      discription,
      country,

      category
    } = this.state;
    if (storeName !== "" && category !== "" && discription !== "") {
      console.log("done");
      let data = {
        Storename: storeName,
        Discription: discription,
        category: category,
        country: country
      };
      this.props.addProduct(data, this.props.history);
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
                              src={val}
                            />
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

                    <input
                      type="file"
                      onChange={e => {
                        let reader = new FileReader();
                        let allImages = this.state.allImages;
                        reader.onload = e => {
                          allImages.push(e.target.result);
                          this.setState({ allImages });
                          // console.log("Running", allImages);
                        };
                        console.log("hello", this.state.allImages);
                        reader.readAsDataURL(e.target.files[0]);
                        // console.log("for testing ", e.target.files[0]);
                      }}
                    />

                    {this.props.location.state === undefined ? (
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={
                          (() => this.addProduct(), console.log("All image"))
                        }
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
  addProduct: (obj, history) => dispatch(AddStore(obj, history)),
  editProduct: (obj, history) => dispatch(EditProduct(obj, history)),
  StoreImages: (obj, history) => dispatch(AddStoreImage(obj, history))
});

export default connect(null, mapDispatchToProps)(Map);
