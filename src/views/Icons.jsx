import React, { useState } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { GetProduct } from "Store/actions/userAuth";
import { DeleteProduct } from "Store/actions/userAuth";

export const ShowMoreDetailOfClothes = props => {
  const [firstImage, setImage] = useState();
  // props.products[props.index].allImages[0].path

  // var firstImage = props.products[props.index].allImages[0].path;
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card className="demo-icons">
            <CardHeader>
              <div style={{ width: "100%", display: "flex" }}>
                <div style={{ width: "50%", textAlign: "left" }}>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() =>
                      props.history.push({
                        pathname: "/admin/addProducts",
                        state: props.products[props.index]
                      })
                    }
                  >
                    Edit
                  </button>{" "}
                </div>
                <div style={{ width: "50%", textAlign: "right" }}>
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={props.back}
                  >
                    Back
                  </button>{" "}
                </div>
              </div>
            </CardHeader>
            <CardBody className="all-icons">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%"
                }}
              >
                <div
                  style={{
                    width: "50%",
                    // border: "1px solid black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <img
                    style={{
                      width: "90%",
                      height: 250,
                      border: "1px solid transparent",
                      borderBottomColor: "black"
                    }}
                    src={firstImage}
                    alt=""
                  />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      border: "1px solid transparent",
                      borderBottomColor: "lightgray",
                      paddingBottom: 10,
                      marginTop: 10,
                      justifyContent: "space-around"
                      // flexWrap: "wrap",
                    }}
                  >
                    {props.products[props.index] &&
                      props.products[props.index].allImages &&
                      props.products[props.index].allImages.map(val => {
                        return (
                          <div style={{ width: "25%" }}>
                            <img
                              style={{
                                width: "100%",
                                height: 100,
                                border: "1px solid lightgray"
                              }}
                              src={val.path}
                              onClick={() => setImage(val.path)}
                              alt=""
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    marginLeft: 40
                  }}
                >
                  <div>
                    <span style={{ fontSize: 22, fontWeight: "600" }}>
                      Product Name:
                    </span>{" "}
                    <br />
                    <span style={{ marginLeft: 50, fontSize: 22 }}>
                      {props.products[props.index].productName}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: "600" }}>
                      PRICE:
                    </span>{" "}
                    <br />
                    <span style={{ marginLeft: 50, fontSize: 22 }}>
                      {props.products[props.index].price}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: 22, fontWeight: "600" }}>
                      Description:
                    </span>{" "}
                    <br />
                    <span style={{ marginLeft: 50, fontSize: 22 }}>
                      {props.products[props.index].description}
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => props.delete(props.products[props.index].id)}
                >
                  Delete
                </button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

class Icons extends React.Component {
  state = {
    isShow: false
  };
  componentWillMount() {
    this.props.GetProduct();
  }

  changeCom = index => {
    this.setState({
      index,
      isShow: !this.state.isShow
    });
  };

  delete = id => {
    this.props.deleteProduct(id, this.props.history);
  };

  render() {
    return (
      <>
        {!this.state.isShow ? (
          <div className="content">
            <Row>
              <Col md="12">
                <Card className="demo-icons">
                  <CardBody className="all-icons">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexWrap: "wrap",
                        width: "100%"
                      }}
                      id="icons-wrapper"
                    >
                      {this.props.products &&
                        this.props.products.map((val, index) => (
                          <Card
                            key={index}
                            style={{
                              width: "25%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                            onClick={() => this.changeCom(index)}
                          >
                            <div
                              style={{
                                height: 50,
                                width: "100%",

                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex"
                              }}
                            >
                              <p style={{ fontWeight: "600", fontSize: 18 }}>
                                {val.Discription}
                              </p>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: "90%",
                                textAlign: "center"
                              }}
                            >
                              <img
                                style={{ width: "70%", height: "100%" }}
                                alt=""
                              />
                            </div>
                            <div
                              style={{
                                height: 50,
                                width: " 100%",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <p style={{ fontSize: 18 }}>
                                <span style={{ fontWeight: "600" }}>
                                  {" "}
                                  Price{" "}
                                </span>
                                : {val.price} rs
                              </p>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <ShowMoreDetailOfClothes
            products={this.props.products}
            index={this.state.index}
            back={this.changeCom}
            history={this.props.history}
            delete={this.delete}
          />
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  GetProduct: () => dispatch(GetProduct()),
  deleteProduct: (id, history) => dispatch(DeleteProduct(id, history))
});

const mapActionToProps = state => ({
  products: state.Login.products
});

export default connect(mapActionToProps, mapDispatchToProps)(Icons);
