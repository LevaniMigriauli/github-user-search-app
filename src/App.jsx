import axios from "axios";
import { useRef, useEffect, useState, Fragment } from "react";
import iconSearch from "./assets/imgs/icon-search.svg";
import moon from "./assets/imgs/icon-moon.svg";
import sun from "./assets/imgs/icon-sun.svg";
import locationIcon from "./assets/imgs/icon-location.svg";
import websiteIcon from "./assets/imgs/icon-website.svg";
import twitterIcon from "./assets/imgs/icon-twitter.svg";
import companyIcon from "./assets/imgs/icon-company.svg";

// import GlobalStyles from "./components/GlobalStyles";
import styled, { ThemeProvider } from "styled-components";
import { breakpoints, defaultTheme } from "./assets/themes/defaultTheme";
import moment from "moment";
import { createGlobalStyle } from "styled-components";

const user = axios.create({
  baseURL: "https://api.github.com/users/",
  // headers: {
  //   "User-Agent": "request",
  // },
});

function App() {
  // const userInputValue = useRef("octocat");
  const [userInputValue, setUserInputValue] = useState("octocat");
  const [userObj, setUSerObj] = useState({});

  const [searchBtnColor, setSearchBtnColor] = useState(
    defaultTheme.colors.dadgerBlue
  );

  const [modeTheme, setModeTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [error, setError] = useState("");

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

  useEffect(() => {
    localStorage.setItem("theme", modeTheme);
  }, [modeTheme]);

  async function submitHandler(e) {
    try {
      e.preventDefault();
      if (userInputValue) {
        const response = await user.get(`${userInputValue || "octocat"}`);
        const repo = await response.data;
        repo && setUSerObj(repo);
        setUserInputValue("");
        setError("");
        setSearchBtnColor(defaultTheme.colors.dadgerBlue);
      }
    } catch {
      setSearchBtnColor("#60ABFF");
      setError("No Result");
    }
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

  console.log(searchBtnColor);
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <MainContainer modeTheme={modeTheme}>
        <Center>
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
              <div
                style={{
                  webkitMask: `url(${
                    modeTheme === "light" ? moon : sun
                  }) no-repeat center`,
                  mask: `url(${
                    modeTheme === "light" ? moon : sun
                  }) no-repeat center`,
                  // width: "20px",
                  // height: "20px",
                  // background: "red",
                  width: "20px",
                  height: "20px",
                }}
              ></div>
            </button>
          </Header>
          <Form
            id="form"
            onSubmit={submitHandler}
            modeTheme={modeTheme}
            searchBtnColor={searchBtnColor}
          >
            <img src={iconSearch} alt="" />
            <input
              // ref={userInputValue}
              onFocus={() => setSearchBtnColor("#60abff")}
              onBlur={() => setSearchBtnColor(defaultTheme.colors.dadgerBlue)}
              value={userInputValue}
              onChange={(e) => {
                e.target.value.length < 17 && setUserInputValue(e.target.value);
                setSearchBtnColor("#60abff");
              }}
              placeholder="Search GitHub username…"
            />
            <span style={{ color: "red" }}>{error}</span>
            <button type="submit">Search</button>
          </Form>
          <Main modeTheme={modeTheme}>
            <UserHeader modeTheme={modeTheme}>
              <img src={avatar_url} alt="User profile photo" />
              <div>
                <p>{name}</p>
                <h3>@{login}</h3>
                {window.innerWidth > 800 || (
                  <span>Joined {userCreateDate}</span>
                )}
              </div>
              {window.innerWidth <= 800 || (
                <span style={{ justifySelf: "end", marginTop: "12px" }}>
                  Joined {userCreateDate}
                </span>
              )}
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
            <SocNewtworks
              networkInfo={iconsArr[1][1]}
              modeTheme={modeTheme}
              iconsArr={iconsArr}
            >
              {/* {console.log(iconsArr[1][1] ? iconsArr[1][1] : 5)} */}
              {/* <img alt="location icon" /> */}
              {iconsArr.map((networkInfo, index) => {
                return (
                  <Fragment key={index}>
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
                      // networkInfo={iconsArr[1][1]}
                      // modeTheme={modeTheme}
                      // iconsArr={iconsArr}
                      style={{
                        color: !networkInfo[1]
                          ? "#999"
                          : modeTheme === "light"
                          ? defaultTheme.colors.steel
                          : defaultTheme.colors.white,
                      }}
                      // key={index}
                    >
                      {/* {console.log(
                        networkInfo[1],
                        networkInfo[1] ? typeof networkInfo[1] : ""
                      )} */}
                      {networkInfo[1] || "Not available"}
                    </span>
                  </Fragment>
                );
              })}
            </SocNewtworks>
          </Main>
        </Center>
      </MainContainer>
    </ThemeProvider>
  );
}

const MainContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
  font-family: "Space Mono", monospace;
  font-weight: 400;
  /* min-width: 375px; */
  /* height: 100vh; */
  width: 100%;
  padding: 31px 24px 79px 24px;
  background: ${({ theme, modeTheme }) =>
    modeTheme === "light"
      ? theme.colors.light.ivory
      : theme.colors.dark.darkBlue};
  display: flex;
  justify-content: center;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 144px 98px 236px 98px;
    /* height: 100vh; */
  }
`;

const Center = styled.div`
  width: 327px;

  @media (min-width: ${breakpoints.tablet}) {
    width: 580px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 800px;
  }
`;

const Header = styled.header`
  font-family: "Space Mono", monospace;
  font-weight: 700;

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

    &:hover {
      color: ${({ theme, modeTheme }) =>
        modeTheme === "light" ? "#222731" : "#90A4D4"};

      div {
        background: ${({ theme, modeTheme }) =>
          modeTheme === "light" ? "#222731" : "#90A4D4"};
      }
    }

    span {
      letter-spacing: 2.5px;
    }

    div {
      background: ${({ theme, modeTheme }) =>
        modeTheme === "light" ? theme.colors.steel : theme.colors.white};
    }
  }
`;

const Form = styled.form`
  /* width: 327px; */
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
  position: relative;

  @media (min-width: ${breakpoints.tablet}) {
    height: 69px;
  }

  img {
    width: 17.7px;
    margin: 20px 11px 22px 16px;

    @media (min-width: ${breakpoints.tablet}) {
      width: 24px;
      margin: 23px 24px 22px 32px;
    }
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

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 18px;
      width: 254px;
      margin-right: 144px;
    }

    @media (min-width: ${breakpoints.desktop}) {
      margin-right: 340px;
    }
  }

  span {
    font-size: 13px;
    position: absolute;
    right: 95px;
    top: 50%;
    transform: translateY(-50%);

    @media (min-width: ${breakpoints.tablet}) {
      right: 125px;
    }
  }

  button {
    font-family: "Space Mono", monospace;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    color: ${({ theme }) => theme.colors.white};
    padding: 12.5px 14px 12.5px 18px;
    margin: 6.5px 7px 7.5px 0;
    border: none;
    background: ${({ searchBtnColor }) => searchBtnColor};
    border-radius: 10px;

    &:hover {
      background: #60abff;
    }

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 16px;
      line-height: 24px;
      padding: 12.5px 23px 13.5px 24px;
    }
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

  @media (min-width: ${breakpoints.tablet}) {
    padding: 40px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    padding: 48px 48px 48px 202px;
  }
`;

const UserHeader = styled.div`
  display: flex;
  gap: 19px;
  margin-bottom: 33px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 24px;
  }
  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    column-gap: 37px;
    position: relative;
    margin-bottom: 20px;
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;

    @media (min-width: ${breakpoints.tablet}) {
      width: 117px;
      height: 117px;
    }
    @media (min-width: ${breakpoints.desktop}) {
      position: absolute;
      left: -154px;
    }
  }

  div {
    @media (min-width: ${breakpoints.tablet}) {
      padding-top: 12px;
    }

    @media (min-width: ${breakpoints.desktop}) {
      padding-top: 4px;
    }
    p {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      height: 24px;
      color: ${({ theme, modeTheme }) =>
        modeTheme === "light"
          ? theme.colors.dark.licorice
          : theme.colors.white};

      @media (min-width: ${breakpoints.tablet}) {
        font-size: 26px;
        line-height: 39px;
        margin-bottom: 2px;
      }
    }

    h3 {
      font-weight: 400;
      font-size: 13px;
      line-height: 19px;
      color: ${({ theme }) => theme.colors.dadgerBlue};
      margin-bottom: 6px;

      @media (min-width: ${breakpoints.tablet}) {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }

  span {
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.light.steel : theme.colors.white};

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 15px;
      line-height: 22px;
    }
  }
`;

const Bio = styled.p`
  font-size: 13px;
  font-weight: 400;
  line-height: 25px;
  color: ${({ theme, modeTheme }) =>
    modeTheme === "light" ? theme.colors.steel : theme.colors.white};
  margin-bottom: 23px;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 15px;
    margin-bottom: 32px;
  }
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

  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
    padding: 15px 0 17px 32px;
    row-gap: 1px;
  }

  h4 {
    font-size: 11px;
    font-weight: 400;
    line-height: 16px;

    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.steel : theme.colors.white};

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 13px;
      line-height: 19px;
    }
  }

  span {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: ${({ theme, modeTheme }) =>
      modeTheme === "light" ? theme.colors.dark.licorice : theme.colors.white};

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 22px;
      line-height: 33px;
    }
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

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 20px 1fr 20px 1fr;
  }

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

    &:nth-child(3) {
      @media (min-width: ${breakpoints.tablet}) {
        order: 5;
        grid-column: 1/2;
        grid-row: 2/3;
      }
    }

    &:nth-child(5) {
      @media (min-width: ${breakpoints.tablet}) {
        order: 3;
        grid-column: 3/4;
        grid-row: 1/2;
      }
    }
    &:nth-child(7) {
      @media (min-width: ${breakpoints.tablet}) {
        order: 7;
        grid-column: 3/4;
        grid-row: 2/3;
      }
    }
  }

  span {
    font-size: 13px;
    color: ${({ theme, modeTheme, iconsArr }) =>
      !iconsArr[1][1]
        ? "#999"
        : modeTheme === "light"
        ? theme.colors.steel
        : theme.colors.white};

    @media (min-width: ${breakpoints.tablet}) {
      font-size: 15px;
    }

    &:nth-child(4) {
      @media (min-width: ${breakpoints.tablet}) {
        order: 6;
        grid-column: 2/3;
        grid-row: 2/3;
      }

      &:hover {
        text-decoration-line: ${({ networkInfo }) =>
          networkInfo ? "underline" : "none"};
      }
    }

    &:nth-child(6) {
      @media (min-width: ${breakpoints.tablet}) {
        order: 4;
        grid-column: 4/5;
        grid-row: 1/2;
      }
    }
    &:last-child {
      @media (min-width: ${breakpoints.tablet}) {
        order: 8;
        grid-column: 4/5;
        grid-row: 2/3;
      }
    }
  }
`;

const GlobalStyles = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #141d2f;
    height: 100vh;
}
`;

export default App;
