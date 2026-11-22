import { useState } from "react";
import LoginPage from "../components/LoginPage"
import Header from "../components/Header"
import RegisterPage from "../components/RegisterPage"

const AuthPage = () => {
  const [isRegistering, setRegistering] = useState<boolean>(false);
<Header/>
    return(
      isRegistering ? <RegisterPage setRegistering={setRegistering}/> :  <LoginPage setRegistering={setRegistering}/> 
    );
}

export default AuthPage;