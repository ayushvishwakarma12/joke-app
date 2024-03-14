import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");

  async function getData() {
    setLoading(true);
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
    );
    const data = await response.json();
    setData(data.jokes);
    setLoading(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    getData();
  }, [userData]);

  if (userData === null) {
    return navigate("/login");
  }

  return (
    <div className="home container-fluid">
      <div className="row justify-content-center align-items-center mt-4">
        {data.length < 1 ? (
          <div
            style={{ height: "90vh" }}
            className="text-center d-flex justify-content-center align-items-center"
          >
            <div
              className="spinner-border text-light"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="joke-table-container bg-white p-4 col-11 col-md-10">
            <table className="table table-hover  table-striped table-bordered align-middle">
              <thead className="thead table-primary">
                <tr>
                  <th scope="col" className="fs-5">
                    Jokes
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data.map((joke, index) => (
                  <tr key={index}>
                    <td>{joke.joke}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex gap-3 ">
              <button
                className="btn btn-primary"
                type="button"
                disabled={loading ? true : false}
                onClick={() => getData()}
              >
                {loading ? (
                  <>
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status">Loading...</span>
                  </>
                ) : (
                  "Get more Jokes"
                )}
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
