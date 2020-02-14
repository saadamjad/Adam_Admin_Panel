import axios from "axios";
import { handleApiErrors } from "./api-errors";
const API_URL = " http://dry-taiga-90913.herokuapp.com/";

function processRequest(request) {
  return request
    .then(json => {
      if (json.ok == true) {
      } else {
        return json;
      }
    })
    .catch(error => {
      throw error;
    });
}

export function Get(path, obj) {
  const API_REQ_URL = API_URL + path;
  const request = axios.get(API_REQ_URL);
  return processRequest(request);
}

export function Post(path, obj, token) {
  const API_REQ_URL = API_URL + path;
  console.log("------------");
  console.log({ path, obj, token });
  const request = axios.post(API_REQ_URL, obj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  return processRequest(request);
}
