import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Auth = () => {
  let authType = useParams().type;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault(); // prevent reload

    try {
      let data;
      if (authType === "signup") {
        // create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // login
        data = await signInWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="email"
          required
          value={email} // controlled component
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={authType === "login" ? "Login" : "Create Account"}
        />
        {error}
      </form>
    </>
  );
};

export default Auth;
