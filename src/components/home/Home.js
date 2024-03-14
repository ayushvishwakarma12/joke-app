import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, []);

  return (
    <div className="home">
      <div className="joke-table-container bg-white p-4">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Jokes</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((joke, index) => (
              <tr key={index} scope="row">
                <td>{joke.joke}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex gap-3 ">
          <button className="btn btn-primary" onClick={() => getData()}>
            {loading ? <div className="loading"></div> : "Get more Jokes"}
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
