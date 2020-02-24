import { ActionType } from "../actions";

const initialState = {
  isLoading: false,
  data: {},
  Login: [],
  products: [],
  orders: [],
  store: [],
  Adamproducts: [],
  images: [],
  getProductCategory: [],
  StoreImage: []
};

export default (state = initialState, action) => {
  // console.log("action", action);
  switch (action.type) {
    // STEPPER

    case ActionType.LOADER:
      return {
        ...state,
        isLoading: true
      };
    case ActionType.STOP_LOADER:
      return {
        ...state,
        isLoading: false
      };
    case ActionType.Login_SUCCESS:
      return {
        ...state,
        Login: action.payload
      };
    case ActionType.GET_PRODUCTS:
      console.log("all products", action.payload);
      return {
        ...state,
        products: action.payload
      };
    case ActionType.GET_ORDER:
      return {
        ...state,
        orders: action.payload
      };

    case ActionType.Login_FAIL:
      return { ...state, error: action.payload };

    case ActionType.GET_STORES:
      return { ...state, store: action.payload };

    case ActionType.ADD_PRODUCTADAM:
      return { ...state, Adamproducts: action.payload };
    case ActionType.ADD_IMAGE:
      let images = state.images;
      images.push(action.payload);
      return { ...state, images };

    case ActionType.GET_PRODUCTS_CATEGORY:
      return { ...state, getProductCategory: action.payload };

    case ActionType.STORE_IMAGE:
      console.log("this is actiion", action.payload);
      return { ...state, StoreImage: action.payload };

    default:
      return { ...state };
  }
};
