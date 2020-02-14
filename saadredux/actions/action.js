import ActionType from "../../saadredux/actions/types";
// import { Post, Get } from "../../utils/api-call";
import * as firebase from "firebase";

export const Login = (loginData, history) => {
  console.log(loginData, "Login");
  return dispatch => {
    // dispatch(actionDispatch(ActionType.Login));
    firebase
      .auth()
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(_success => {
        dispatch({
          type: ActionType.SET_USER_DATA
        });
        history.push("/admin/dashboard");
        // console.log("success", success)
      })
      .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };
};
