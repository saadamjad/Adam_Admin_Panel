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
import { editProductCat } from "Store/actions/userAuth";
import { AddProductCategory } from "Store/actions/userAuth";
import { GetProductCategory } from "Store/actions/userAuth";
import { deleteProductCategory } from "Store/actions/userAuth";
import { EditProductCategory } from "Store/actions/userAuth";
// import store from "../../saadredux/store";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      category: "",
      storeId: ""
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
    let { category } = this.state;
    if (category !== "") {
      console.log("done");
      let data = {
        Productcategory: category
      };
      this.props.AddProductCategory(data, this.props.history);
      this.setState({
        category: ""
      });
    } else {
      alert("Kindly fill all values");
    }
  };
  deleteProduct = () => {
    let { storeId } = this.state;
    if (storeId !== "") {
      let data = {
        Id: storeId
      };
      this.props.DeleteProductCat(data, this.props.history);
    } else {
      alert("Kindly select category ");
    }
  };
  editProductCat = () => {
    if (this.state.storeId !== "") {
      console.log("done");
      let data = {
        Productcategory: this.state.category,
        Id: this.state.storeId
      };
      this.props.editProductCat({ ...data }, this.props.history);
      this.setState({
        category: this.state.category
      });
    } else {
      alert("Kindly fill all values");
    }
  };

  componentWillMount() {
    // this.props.getStore();
    this.props.productCategory();
  }

  render() {
    console.log(this.props);
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>Add Category </CardHeader>
                <CardBody>
                  <div>
                    <div className="form-group">
                      <label for="formGroupExampleInput">
                        enter product category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.category}
                        onChange={e =>
                          this.setState({ category: e.target.value })
                        }
                        id="formGroupExampleInput"
                        placeholder="Enter category"
                        style={{
                          color: this.state.category.length !== 0 ? "red" : null
                        }}
                      />
                    </div>
                    <div style={{ display: "flex" }}>
                      <button
                        style={{ width: 200 }}
                        type="button"
                        class="btn btn-info"
                        onClick={() => this.addProduct()}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <div className="dropdown">
                      <button
                        style={{ marginLeft: 0 }}
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton0"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        placeholder="select category"
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
                                    category: item.Productcategory,
                                    storeId: item.id
                                  });
                                }}
                              >
                                {item.Productcategory}
                              </a>
                            );
                          })}
                      </div>
                    </div>
                    {/* <button
                      style={{ marginLeft: 20 }}
                      type="button"
                      class="btn btn-info"
                      onClick={() => this.editProductCat()}
                      //   onClick={() => alert("not working")}
                    >
                      Edit
                    </button> */}
                    <button
                      style={{ marginLeft: 20 }}
                      type="button"
                      class="btn btn-info"
                      onClick={() => this.deleteProduct()}
                    >
                      Delete
                    </button>
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
  AddProductCategory: (obj, history) =>
    dispatch(AddProductCategory(obj, history)),
  productCategory: (obj, history) => dispatch(GetProductCategory(obj, history)),
  editProductCat: (obj, history) => dispatch(EditProductCategory(obj, history)),
  DeleteProductCat: (obj, history) =>
    dispatch(deleteProductCategory(obj, history))
});

const mapActionToProps = state => ({
  productCat: state.Login.getProductCategory
});
export default connect(mapActionToProps, mapDispatchToProps)(Map);
