import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  console.log(error, errorMsg);

  const navigate = useNavigate();

  const formValidation = (username, password) => {
    if (username === "") {
      setError(true);
      setErrorMsg("Please enter a username");
      return false;
    }
    if (password === "") {
      setError(true);
      setErrorMsg("Please enter password");
      return false;
    }
    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isFormValid = formValidation(username, password);

    if (isFormValid) {
      localStorage.setItem("user", JSON.stringify({ username, password }));
      navigate("/");
    }
  };
  return (
    <div
      style={{ background: "url(/gradient_2.jpg) center/cover" }}
      className="login-page vh-100 bg-inherit d-flex flex-column justify-content-center align-items-center"
    >
      {/* <LoginDetails /> */}
      <form className="bg-white p-4 w-25 form" onSubmit={handleFormSubmit}>
        <h1 className="text-center form-heading mb-5">Login</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

// const LoginDetails = () => {
//   return (
//     <div className="login-details">
//       <h4>Login credentials</h4>
//       <p>username: Ayush@gmail.com</p>
//       <p>assword: ayush12345</p>
//     </div>
//   );
// };

export default Login;
