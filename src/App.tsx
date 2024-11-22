import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) throw new Error("Error fetching data !");
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const dataPerPage =
    data.length > 0
      ? data.slice((page - 1) * itemsPerPage, itemsPerPage * page)
      : [];
  if (data.length > 0)
    return (
      <div className="App">
        {error ? (
          <div>Error ! </div>
        ) : dataPerPage.length < 1 || loading ? (
          <div>Loading... </div>
        ) : (
          <div>
            {dataPerPage.map((x: any) => {
              return (
                <li key={x.id}>
                  {x.id} {x.title}
                </li>
              );
            })}
            {data.length > 0 &&
              page < Math.floor(data.length / itemsPerPage) && (
                <button onClick={() => setPage(page + 1)}>Next Page </button>
              )}
          </div>
        )}
      </div>
    );
}
