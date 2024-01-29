export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, userName },
  } = action;

  switch (type) {
    case "SET_AUTH_USER":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        userName,
        UserRole: "USER",
      };
    case "SET_AUTH_ADMIN":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        userName,
        UserRole: "ADMIN",
      };
    case "SET_AUTH_NUTRIENT_EXPERT":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        userName,
        UserRole: "NUTRIENT_EXPERT",
      };
    default:
      return state;
  }
};
