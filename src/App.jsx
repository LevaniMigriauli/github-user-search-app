import axios from "axios";
import { useEffect, useState } from "react";
import iconSearch from "./assets/icon-search.svg";
// import classes from "./App.modules.scss";

// let userUrl = "https://api.github.com/users/";

const user = axios.create({
  baseURL: "https://api.github.com/users/",
});

function App() {
  // const userInputValue = useRef(initialVallue);
  const [userInputValue, setUserInputValue] = useState("octocat");
  const [userObj, setUSerObj] = useState();

  useEffect(() => {
    const apiConnector = setTimeout(() => {
      async function getUser() {
        const response = await user.get(`${"octocat"}`);
        setUSerObj(response.data);
      }
      getUser();
      console.log("get");
    }, 1000);

    return () => {
      console.log("resp");
      clearTimeout(apiConnector);
    };

    // axios.get(`${userUrl}"LevaniMigriauli"`).then((response) => {
    //   setUSerObj(response.data);
    // }
  }, []);

  // if (!userObj) return null;

  function submitHandler(e) {
    e.preventDefault();

    async function getUser() {
      const response = await user.get(`${userInputValue || "octocat"}`);
      setUSerObj(response.data);
    }
    getUser();

    // setUserInputValue(e.target.value);
  }

  console.log(userObj);
  if (userObj) {
    const {
      name,
      created_at,
      public_repos,
      followers,
      following,
      location,
      blog,
      twitter_username,
      company,
    } = userObj;
    console.log(
      name,
      created_at,
      public_repos,
      followers,
      following,
      location,
      blog,
      twitter_username,
      company
    );
  }

  console.log(userObj);

  return (
    <div className="App" style={{ background: "grey" }}>
      <form
        id="form"
        onSubmit={submitHandler}
        style={{ padding: "500px 600px" }}
      >
        <img src={iconSearch} alt="" />
        <input
          // ref={userInputValue}
          value={userInputValue}
          onChange={(e) => setUserInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <p>userObj</p>
    </div>
  );
}

export default App;
