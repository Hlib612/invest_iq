import { useState } from "react";
import LoginPage from "./LoginPage"
import Header from "./Header"
import RegisterPage from "./RegisterPage"

const AuthPage = () => {
  const [isRegistering, setRegistering] = useState<boolean>(false);
<Header/>
    return(
      isRegistering ? <RegisterPage setRegistering={setRegistering}/> :  <LoginPage setRegistering={setRegistering}/> 
    );
}

export default AuthPage;