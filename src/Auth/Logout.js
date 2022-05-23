import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../helpers";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    revokeToken();
  }, []);

  const revokeToken = async () => {
    await axios
      .post(API_LOGOUT_PATH,
        {
          token: persistedState('access_token'),
          client_id: clientId,
          client_secret: clientSecret
        })
      .then(() => {
        clearStorage();
        toast.info('Successfully logged out')
        navigate("/");
      })
      .catch((error) => {
        toast.error('Error logging out')
        console.log(error.toJSON());
      });
  }

  return null;

}

export default Logout;