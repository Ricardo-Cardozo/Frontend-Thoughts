import Table from "../components/Table";
import { useState, useEffect, useCallback } from "react";
import ErrorMessage from "../components/ErrorMessage";
import Input from "../components/Input";
import styles from "./Dashboard.module.css";


const Dashboard = () => {
  const [thoughts, setThoughts] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterThoughts, setFIlterThoughts] = useState([]);

  useEffect(() => {
    async function getThoughts() {
      try {
        const response = await fetch("https://api-thoughts.onrender.com/thoughts/");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setThoughts(responseData);
      } catch (err) {
        setError(err.message);
      }
    }
    getThoughts();
  }, []);

  const filterCallback = useCallback(() => {
    setFIlterThoughts(
      Array.isArray(thoughts.thoughts) &&
        thoughts.thoughts.filter((thought) => {
          return thought.title
            .toLowerCase()
            .includes(search.toLocaleLowerCase());
        })
    );
  }, [search, thoughts.thoughts]);

  console.log();

  useEffect(() => {
    filterCallback();
  }, [filterCallback]); //eslint-disable-line

  return (
    <>
      <div className={styles.titleContainer}>
        <h1>Dashboard</h1>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!error ? (
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search any thought"
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : (
          ""
        )}
      </div>
      <div className={styles.container}>
        {!error
          ? Array.isArray(filterThoughts) &&
            filterThoughts.length > 0 &&
            filterThoughts.map((thought) => (
              <div key={thought._id}>
                <Table
                  key={thought._id}
                  id={thought._id}
                  title={thought.title}
                  to={`/edit/${thought._id}`}
                  type="submit"
                  value="Delete"
                  onError={setError}
                />
              </div>
            ))
          : ""
        }
        {!error
          ? Array.isArray(filterThoughts) &&
            filterThoughts.length === 0 && (
              <h1 className={styles.notFound}>Thought not found!</h1>
            )
          : ""
        }
      </div>
    </>
  );
};

export default Dashboard;
