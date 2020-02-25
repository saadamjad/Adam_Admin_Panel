import ActionType from "./actionType";
// import { Post, Get } from "../../utils/api-call";
import { actionDispatch } from "../../utils/return-obj";
import * as firebase from "firebase";
import { Post } from "utils/api-call";
import { Get } from "utils/api-call";

// import { ToastError } from "../../containers/serviceType";

export const Login = (loginData, history) => {
  console.log(loginData, "Login");
  return dispatch => {
    // dispatch(actionDispatch(ActionType.Login));
    firebase
      .auth()
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(success => {
        dispatch(
          actionDispatch(
            ActionType.Login_SUCCESS,
            localStorage.setItem("Login", true)
          )
        );
        history.push("/admin/icons");
        // console.log("success", success)
      })
      .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
        actionDispatch(
          ActionType.Login_SUCCESS,
          localStorage.setItem("Login", false)
        );
        alert("hello");
      });
  };
};

// Add Products

export const AddProduct = (data, history) => {
  console.log(data, "Login");
  return dispatch => {
    // dispatch(actionDispatch(ActionType.Login));
    let db = firebase.firestore();
    db.collection("allProducts")
      .add(data)
      .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        alert("Successfully Added");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
};

export const EditProduct = (data, history) => {
  console.log(data, "Login");
  return dispatch => {
    let db = firebase.firestore();
    db.collection("allProducts")
      .doc(data.id)
      .set(data)
      .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        alert("Successfully Edit");
        history.push("/admin/icons");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
};
export const EditOrder = (data, history) => {
  console.log(data, "Login");
  return dispatch => {
    // dispatch(actionDispatch(ActionType.Login));
    let db = firebase.firestore();
    db.collection("Order")
      .doc(data.id)
      .set(data)
      .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        alert("Successfully Edit");
        window.location.reload();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
};

export const GetOrder = navigation => {
  return dispatch => {
    let obj = firebase.firestore();
    obj.collection("Order").onSnapshot(objdata => {
      let AllData = [];
      objdata.forEach(val => {
        AllData.push({ ...val.data(), id: val.id });
      });
      dispatch({
        type: ActionType.GET_ORDER,
        payload: AllData
      });
    });
  };
};

export const DeleteProduct = (id, history) => {
  return dispatch => {
    // dispatch(actionDispatch(ActionType.Login));
    let db = firebase.firestore();
    db.collection("allProducts")
      .doc(id)
      .delete()
      .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        alert("Successfully Deleted");
        // history.push("/admin/icons")
        window.location.reload();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
};

export const GetProduct = () => {
  return dispatch => {
    let db = firebase.firestore();
    db.collection("allProducts").onSnapshot(snapshot => {
      console.log(snapshot);
      let allData = [];
      snapshot.forEach(val => {
        allData.push({ ...val.data(), id: val.id });
      });
      dispatch({
        type: ActionType.GET_PRODUCTS,
        payload: allData
      });
      console.log(allData);
    });
  };
};

export const AddStore = data => async dispatch => {
  dispatch({ type: ActionType.LOADER });
  let db = firebase.firestore();
  db.collection("Stores")
    .add(data)
    .then(() => {
      alert(" successfully added");
      // navigation.navigate("ConfirmedOrder");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  dispatch({ type: ActionType.STOP_LOADER });
};
export const GetStore = () => {
  return dispatch => {
    let db = firebase.firestore();
    db.collection("Stores").onSnapshot(objData => {
      let AllData = [];
      objData.forEach(val => {
        AllData.push({ ...val.data(), id: val.id });
      });
      dispatch({
        type: ActionType.GET_STORES,
        payload: AllData
      });
    });
  };
};
export const DeleteStore = (id, history) => {
  return dispatch => {
    // dispatch(actionDispatch(ActionType.Login));
    let db = firebase.firestore();
    db.collection("Stores")
      .doc(id)
      .delete()
      .then(function(docRef) {
        alert("Successfully Deleted");

        window.location.reload();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
};
export const EditStore = (id, history) => {
  return dispatch => {
    // dispatch(actionDispatch(ActionType.Login));
  };
};

export const AddProductCategory = data => async dispatch => {
  let db = firebase.firestore();
  db.collection("productsCategory")
    .add(data)
    .then(() => {
      alert(" category successfully added");
      // navigation.navigate("ConfirmedOrder");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

export const deleteProductCategory = (id, history) => {
  return dispatch => {
    // dispatch(actionDispatch(ActionType.Login));
    let db = firebase.firestore();
    db.collection("productsCategory")
      .doc(id.Id)
      .delete()
      .then(function(docRef) {
        alert("Successfully Deleted");

        window.location.reload();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
};
export const EditProductCategory = (data, history) => {
  console.log(data, "edit data");
  return dispatch => {
    let db = firebase.firestore();
    db.collection("productsCategory")
      .doc(data.Id)
      .update(data)
      .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        alert(" Category Successfully Edit");
        history.push("/admin/icons");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };
};
export const GetProductCategory = data => async dispatch => {
  let db = firebase.firestore();
  db.collection("productsCategory").onSnapshot(objData => {
    let AllData = [];
    objData.forEach(val => {
      AllData.push({ ...val.data(), id: val.id });
    });
    dispatch({
      type: ActionType.GET_PRODUCTS_CATEGORY,
      payload: AllData
    });
  });
};

export const AddImageToStorage = path => {
  return dispatch => {
    let ref = firebase
      .storage()
      .ref(`ProductsImages/${Math.round(Math.random() * 99999)}`);
    ref.put(path).then(function(snapshot) {
      ref
        .getDownloadURL()
        .then(function(url) {
          // Insert url into an <img> tag to "download"
          console.log(url, "MY IMAGE URL");
          // alert("Hogyi add");
          dispatch({
            type: ActionType.ADD_IMAGE,
            payload: url
          });
        })
        .catch(function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              break;

            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    });
  };
};
export const AddStoreImage = path => {
  return dispatch => {
    let ref = firebase
      .storage()
      .ref(`ProductsImages/${Math.round(Math.random() * 99999)}`);
    ref.put(path).then(function(snapshot) {
      ref
        .getDownloadURL()
        .then(function(url) {
          // Insert url into an <img> tag to "download"
          console.log(url, "MY IMAGE URL");
          // alert("Hogyi add");
          dispatch({
            type: ActionType.STORE_IMAGE,
            payload: url
          });
        })
        .catch(function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/object-not-found":
              // File doesn't exist
              break;

            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    });
  };
};

export const AddProductAdam = (productsData, history) => {
  console.log("new data", productsData);
  let db = firebase.firestore();
  db.collection("allProducts")
    .add(productsData)
    .then(() => {
      alert("product added");
      history.push("/admin/icons");
    })
    .catch(err => {
      console.error("Error adding document: ", err);
    });
};
