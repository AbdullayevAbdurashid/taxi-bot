import { Navigate } from "react-router-dom";

const Auth = (WrappedComponent) => {
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      localStorage.removeItem("accessToken");
      alert("Iltimos qaytadan dasturga kring!");
      return <Navigate to="/driver/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default Auth;
