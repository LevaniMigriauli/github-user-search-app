import axios from "axios";
import { useRef, useEffect, useState } from "react";
import iconSearch from "./assets/icon-search.svg";
import GlobalStyles from "./components/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./assets/themes/defaultTheme";

const user = axios.create({
  baseURL: "https://api.github.com/users/",
});

function App() {
  // const userInputValue = useRef("octocat");
  const [userInputValue, setUserInputValue] = useState("octocat");
  const [userObj, setUSerObj] = useState();

  useEffect(() => {
    const apiConnector = setTimeout(() => {
      async function getUser() {
        const response = await user.get(userInputValue);
        setUSerObj(response.data);
      }
      getUser();
      console.log("get");
    }, 1000);

    return () => {
      console.log("resp");
      clearTimeout(apiConnector);
    };
  }, []);

  function submitHandler(e) {
    e.preventDefault();

    async function getUser() {
      const response = await user.get(`${userInputValue || "octocat"}`);
      setUSerObj(response.data);
    }
    getUser();
  }

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
    // console.log(
    //   name,
    //   created_at,
    //   public_repos,
    //   followers,
    //   following,
    //   location,
    //   blog,
    //   twitter_username,
    //   company
    // );
  }

  console.log(userObj);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
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
    </ThemeProvider>
  );
}

export default App;
