import { ADD_INFO, GET_INFO, UPDATE_INFO, GET_INFO_BY_ID } from "../actions";

const initialState = {
  hubData: [],
  row: {},
  success: false,

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO:
      console.log(action.payload)
      return {
        ...state,
        hubData: action.payload,
      };
    case GET_INFO_BY_ID:
      return {
        ...state,
        row: action.payload,
      };
    case ADD_INFO:
      return {
        ...state,
        success: action.payload.msg.includes("successfully"),
      };
    case UPDATE_INFO:
      return {
        ...state,
        success: action.payload.msg.includes("successfully"),
      };
    default:
      return state;
  }
};

export default reducer;
