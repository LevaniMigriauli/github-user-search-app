import axios from "axios";
import { useRef, useEffect, useState, Fragment } from "react";
import iconSearch from "./assets/imgs/icon-search.svg";
import moon from "./assets/imgs/icon-moon.svg";
import sun from "./assets/imgs/icon-sun.svg";
import locationIcon from "./assets/imgs/icon-location.svg";
import websiteIcon from "./assets/imgs/icon-website.svg";
import twitterIcon from "./assets/imgs/icon-twitter.svg";
import companyIcon from "./assets/imgs/icon-company.svg";

import GlobalStyles from "./components/GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import { defaultTheme } from "./assets/themes/defaultTheme";
import moment from "moment";

const user = axios.create({
  baseURL: "https://api.github.com/users/",
});

function App() {
  // const userInputValue = useRef("octocat");
  const [userInputValue, setUserInputValue] = useState("octocat");
  const [userObj, setUSerObj] = useState({});

  const [modeTheme, setModeTheme] = useState("light");

  useEffect(() => {
    const apiConnector = setTimeout(() => {
      async function getUser() {
        const response = await user.get(userInputValue);
        console.log(response.data);
        setUSerObj(response.data);
      }
      getUser();
      console.log("get");
    }, 0);

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

  const {
    avatar_url,
    name,
    bio,
    login,
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
    avatar_url,
    name,
    bio,
    login,
    created_at,
    public_repos,
    followers,
    following,
    location,
    blog,
    twitter_username,
    company
  );

  const iconsArr = [
    [locationIcon, location],
    [websiteIcon, blog],
    [twitterIcon, twitter_username],
    [companyIcon, company],
  ];

  const userCreateDate = moment(created_at).format("ll");

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <MainContainer modeTheme={modeTheme}>
        <Header modeTheme={modeTheme}>
          <h1>devfinder</h1>
          <button
            onClick={() =>
              modeTheme === "light"
                ? setModeTheme("dark")
                : setModeTheme("light")
            }
          >
            <span>{modeTheme === "light" ? "dark" : "light"}</span>
            <img
              src={modeTheme === "light" ? moon : sun}
              alt={modeTheme === "light" ? "moon" : "sun"}
            />
          </button>
        </Header>
        <Form id="form" onSubmit={submitHandler} modeTheme={modeTheme}>
          <img src={iconSearch} alt="" />
          <input
            // ref={userInputValue}
            value={userInputValue}
            onChange={(e) => setUserInputValue(e.target.value)}
            placeholder="Search GitHub username…"
          />
          <button type="submit">Search</button>
        </Form>
        <Main modeTheme={modeTheme}>
          <UserHeader modeTheme={modeTheme}>
            <img src={avatar_url} alt="User profile photo" />
            <div>
              <p>{name}</p>
              <h3>@{login}</h3>
              <span>Joined {userCreateDate}</span>
            </div>
          </UserHeader>
          <Bio modeTheme={modeTheme}>{bio || "This profile has no bio"}</Bio>
          <NumberInfos modeTheme={modeTheme}>
            <h4>Repos</h4>
            <h4>Followers</h4>
            <h4>Following</h4>
            <span>{public_repos}</span>
            <span>{followers}</span>
            <span>{following}</span>
          </NumberInfos>
          <SocNewtworks modeTheme={modeTheme} iconsArr={iconsArr}>
            {/* <img alt="location icon" /> */}
            {iconsArr.map((networkInfo) => {
              return (
                <Fragment>
                  <div
                    style={{
                      webkitMask: `url(${networkInfo[0]}) no-repeat center`,
                      mask: `url(${networkInfo[0]}) no-repeat center`,
                      background: `${
                        !networkInfo[1]
                          ? "#999"
                          : modeTheme === "light"
                          ? defaultTheme.colors.steel
                          : defaultTheme.colors.white
                      }`,
                    }}
                  ></div>
                  <span
                    style={{
                      color: !networkInfo[1]
                        ? "#999"
                        : modeTheme === "light"
                        ? defaultTheme.colors.steel
                        : defaultTheme.colors.white,
                    }}
                    networkInfo={networkInfo[1]}
                  >
                    {networkInfo[1] || "Not available"}
                  </span>
                </Fragment>
              );
            })}
          </SocNewtworks>
        </Main>
      </MainContainer>
    </ThemeProvider>
  );
}

const MainContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
  font-family: "Space Mono", monospace;
  font-weight: 400;
  min-width: 375px;
  width: 100%;
  padding: 31px 24px 79px 24px;
  background: ${({ theme, modeTheme }) =>
    modeTheme === "light"
      ? theme.colors.light.ivory
      : theme.colors.dark.darkBlue};
`;

const Header = styled.header`
  font-family: "Space Mono", monospace;
  font-weight: 700;
  width: 327px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;

  h1 {
    line-height: 39px;
    color: ${({ theme, modeTheme }) =>
      modeTheme === "light"
        ? theme.colors.dark.midnightExpress
        : theme.colors.white};
  }

  button {
    font-family: "Space Mono", monospace;
    font-weight: 700;
    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.steel : theme.colors.white};

    display: flex;
    align-items: center;
    gap: 16px;
    border: none;
    background: none;
  }
`;

const Form = styled.form`
  width: 327px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme, modeTheme }) =>
    modeTheme === "light"
      ? theme.colors.dark.white1
      : theme.colors.light.purple};
  border-radius: 15px;
  margin-bottom: 16px;
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);

  img {
    width: 17.7px;
    margin: 20px 11px 22px 16px;
  }

  input {
    font-family: "Space Mono", monospace;
    font-weight: 400;
    font-size: 13px;
    line-height: 25px;
    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.steel : theme.colors.white};
    background: ${({ theme, modeTheme }) =>
      modeTheme === "light"
        ? theme.colors.dark.white1
        : theme.colors.light.purple};
    margin: 18px 7px 17px 0;
    border: none;
    outline: none;
    caret-color: ${({ theme }) => theme.colors.dadgerBlue};

    &::placeholder {
      color: ${({ theme, modeTheme }) =>
        modeTheme === "light" ? theme.colors.steel : theme.colors.white};
    }
  }

  button {
    font-family: "Space Mono", monospace;
    font-weight: 700;
    line-height: 21px;
    color: ${({ theme }) => theme.colors.white};
    width: 84px;
    padding: 12.5px 14px 12.5px 18px;
    margin: 6.5px 7px 7.5px 0;
    border: none;
    background: ${({ theme }) => theme.colors.dadgerBlue};
    border-radius: 10px;
  }
`;

const Main = styled.main`
  /* color: ${({ theme, modeTheme }) =>
    modeTheme === "light" ? theme.colors.steel : theme.colors.white}; */
  box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
  border-radius: 15px;
  background: ${({ theme, modeTheme }) =>
    modeTheme === "light"
      ? theme.colors.dark.white1
      : theme.colors.light.purple};
  padding: 32px 24px 48px;
  width: 327px;
`;

const UserHeader = styled.div`
  display: flex;
  gap: 19px;
  margin-bottom: 33px;

  img {
    width: 70px;

    height: 70px;
    border-radius: 50%;
  }

  p {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    height: 24px;
    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.dark.licorice : theme.colors.white};
  }

  h3 {
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    color: ${({ theme }) => theme.colors.dadgerBlue};
    margin-bottom: 6px;
  }

  span {
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.light.steel : theme.colors.white};
  }
`;

const Bio = styled.p`
  font-size: 13px;
  font-weight: 400;
  line-height: 25px;
  color: ${({ theme, modeTheme }) =>
    modeTheme === "light" ? theme.colors.steel : theme.colors.white};
  margin-bottom: 23px;
`;

const NumberInfos = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 8px;
  background: ${({ theme, modeTheme }) =>
    modeTheme === "light"
      ? theme.colors.light.ivory
      : theme.colors.dark.darkBlue};
  padding: 18px 14px 19px 15px;
  margin-bottom: 24px;
  border-radius: 10px;

  h4 {
    font-size: 11px;
    font-weight: 400;
    line-height: 16px;

    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.steel : theme.colors.white};
  }

  span {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;

    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.dark.licorice : theme.colors.white};
  }
`;

const SocNewtworks = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 13px;
  row-gap: 16px;
  align-items: center;
  color: ${({ theme, modeTheme }) =>
    modeTheme === "light" ? theme.colors.steel : theme.colors.white};

  div {
    /* fill-rule: "nonzero"; */
    /* mask: src={locationIcon} ; */

    /* background-color: red; */
    /* -webkit-mask: url(locationIcon) no-repeat center; */
    /* mask: url(${locationIcon}) no-repeat center; */

    background: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.steel : theme.colors.white};

    width: 20px;
    height: 20px;
  }

  span {
    color: ${({ theme, modeTheme, iconsArr }) =>
      !iconsArr[1][1]
        ? "#999"
        : modeTheme === "light"
        ? theme.colors.steel
        : theme.colors.white};

    &:nth-child(4):hover {
      text-decoration-line: underline;
    }
  }
`;

export default App;
