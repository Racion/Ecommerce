import { LOG_IN, LOG_OUT } from "../Action/actionTypes";

export const userReducer = (
  state = { userLog: JSON.parse(localStorage.getItem("userLog") || "{}") },
  action
) => {
  switch (action.type) {
    case LOG_IN:
      return {
        userLog: action.payload,
      };
    case LOG_OUT:
      return {
        userLog: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
