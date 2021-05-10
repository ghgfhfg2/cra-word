import React, { useEffect, useState, useRef } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import './custom_antd.less';
import "./App.css";
import Join from "./component/Join";
import Login from "./component/Login";
import Main from "./component/Main";
import View from "./component/View";
import Loading from "./component/Loading";
import { Layout, Button, BackTop } from "antd";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser, clearUser } from "./redux/actions/user_action";
import * as antIcon from "react-icons/ai";
import styled from "styled-components";
export const IframeBox = styled.iframe`
  width:auto;min-width:300px;max-width:500px;
  height:500px;display:none;
`



const { Sider, Content, Header } = Layout;
function App(props) {
  const userInfo = useSelector((state) => state.user.currentUser);

  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/");
        dispatch(setUser(user));
      } else {
        history.push("/login");
        dispatch(clearUser());
      }
    });
  }, []);
  
  const searchFrame = useRef();
  const onSearch = () => {
    searchFrame.current.src = 'https://m.dietshin.com/calorie/calorie_main.asp?idx=';
    searchFrame.current.style.display = 'block';
  }  

  // 스크롤 이벤트 핸들러
  const [TopFix, setTopFix] = useState(false);
  const [TopFixLeft, setTopFixLeft] = useState(false);
  const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 100) {
      setTopFixLeft(true);
    } else {
      setTopFixLeft(false);
    }
    if (scrollTop >= 70) {
      setTopFix(true);
    } else {
      setTopFix(false);
    }
  };

  const onLogout = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  if (isLoading) {
    return (
      <>
        <Layout className={TopFix && "top-fix"}>
          <Header className="header-box">
            {!userInfo &&
            <Link to="/join">
                join
            </Link>
            }
          </Header>
          <Layout>
            <div className="content-box">
              
              <Content>
                <Loading />
              </Content>
            </div>
          </Layout>
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Layout className={TopFix && "top-fix"}>
          <Header className="header-box">
            {!userInfo &&
              <>
              <Link to="/join">
                  join
              </Link>
              <Link to="/login">
                  login
              </Link>
              </>
            }
            {userInfo &&
              <>
              {userInfo.displayName}
              <span onClick={onLogout}>
                  logout
              </span>
              </>
            }
            <Button onClick={onSearch}>검색</Button>
          </Header>
          <Layout>
            <div className="content-box">              
              <Content>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/join" component={Join} />
                  <Route exact path="/" component={Main} />
                  <Route path="/view/:name" component={View} />
                </Switch>
                <IframeBox id="iframe-box" ref={searchFrame}>
                </IframeBox>
              </Content>
              <BackTop>
                <Button
                  type="primary"
                  shape="circle"
                  className="btn-top-move"
                  icon={<antIcon.AiOutlineArrowUp />}
                />
              </BackTop>
            </div>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default App;
