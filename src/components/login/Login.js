import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const loginCredentials = {
  username: "ayush@gmail.com",
  password: "ayush12345",
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [credentials, setCredentials] = useState(false);

  const userData = localStorage.getItem("user");

  const navigate = useNavigate();

  const formValidation = (username, password) => {
    if (
      username !== loginCredentials.username ||
      password !== loginCredentials.password
    ) {
      setError(true);
      setErrorMsg("Invalid username or password");
      return false;
    }
    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setCredentials(false);
    const isFormValid = formValidation(username, password);

    if (isFormValid) {
      localStorage.setItem("user", JSON.stringify({ username, password }));
      navigate("/");
    }
  };

  useEffect(() => {
    if (userData) {
      return navigate("/");
    }
  }, [userData, navigate]);

  return (
    <div
      style={{ background: "url(/gradient_2.jpg) center/cover" }}
      className="container-fluid login-page vh-100 bg-inherit d-flex flex-column justify-content-center"
    >
      <div className="row justify-content-center align-items-center">
        <form
          className="bg-white p-4 form col-10 col-sm-8 col-md-6 col-lg-4"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-center form-heading mb-4 md-mb-5">
            Login to Your Account
          </h1>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {credentials && (
              <span className="login-credentials">
                {loginCredentials.username}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {credentials && (
              <span className="login-credentials">
                {loginCredentials.password}
              </span>
            )}
          </div>
          <button type="submit" className="login-button">
            Submit
          </button>
          {error && <div className="error-msg text-center">{errorMsg}*</div>}
          <span
            className="get-login-credentials"
            onClick={() => setCredentials(!credentials)}
          >
            {credentials ? "Hide" : "Get"} login credentials
          </span>
        </form>
      </div>
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
