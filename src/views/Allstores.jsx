import React, { useState } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { GetProduct } from "Store/actions/userAuth";
import { GetStore } from "Store/actions/userAuth";
import { DeleteProduct } from "Store/actions/userAuth";
import { DeleteStore } from "Store/actions/userAuth";

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
                        pathname: "/admin/allStores",
                        state: props.store[props.index]
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
              <div>
                <span style={{ fontSize: 17, fontWeight: "600" }}>id:</span>{" "}
                <span style={{ marginLeft: 10, fontSize: 17 }}>
                  {props.store[props.index].id}
                </span>
              </div>
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
                    {props.store[props.index] &&
                      props.store[props.index].allImages &&
                      props.store[props.index].allImages.map(val => {
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
                    <span style={{ fontSize: 17, fontWeight: "600" }}>
                      Store Name:
                    </span>{" "}
                    <span style={{ marginLeft: 10, fontSize: 17 }}>
                      {props.store[props.index].Storename}
                    </span>
                  </div>
                  <br />
                  <div>
                    <span style={{ fontSize: 17, fontWeight: "600" }}>
                      Category:
                    </span>{" "}
                    <span style={{ marginLeft: 10, fontSize: 17 }}>
                      {props.store[props.index].category}
                    </span>
                  </div>
                  <br />
                  <div>
                    <span style={{ fontSize: 17, fontWeight: "600" }}>
                      Description:
                    </span>{" "}
                    <span style={{ marginLeft: 10, fontSize: 17 }}>
                      {props.store[props.index].Discription}
                    </span>
                  </div>
                  <br />
                  <div>
                    <span style={{ fontSize: 17, fontWeight: "600" }}>
                      country:
                    </span>{" "}
                    <span style={{ marginLeft: 10, fontSize: 17 }}>
                      {props.store[props.index].country}
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
                  onClick={() => props.delete(props.store[props.index].id)}
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
    this.props.GetStore();
  }

  changeCom = index => {
    this.setState({
      index,
      isShow: !this.state.isShow
    });
  };

  delete = id => {
    this.props.deletestore(id, this.props.history);
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
                      {this.props.store &&
                        this.props.store.map((val, index) => (
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
                                {val.Storename}
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
                                  Category{" "}
                                </span>
                                : {val.category}
                              </p>
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
                                  Location{" "}
                                </span>
                                : {val.country}
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
            store={this.props.store}
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
  GetStore: () => dispatch(GetStore()),
  deleteProduct: (id, history) => dispatch(DeleteProduct(id, history)),
  deletestore: (obj, history) => dispatch(DeleteStore(obj, history))
});

const mapActionToProps = state => ({
  products: state.Login.products,
  store: state.Login.store
});

export default connect(mapActionToProps, mapDispatchToProps)(Icons);
