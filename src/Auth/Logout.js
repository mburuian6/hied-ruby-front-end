import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../helpers";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(()=>{

    clearStorage();
    navigate('/');

  }, []);

  return (
    <>
    {navigate('/')}
    </>
  )
}

export default Logout;