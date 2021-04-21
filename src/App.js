import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import './custom_antd.less';
import "./App.css";
import Join from "./component/Join";
import Login from "./component/Login";
import Main from "./component/Main";
import Loading from "./component/Loading";
import { Layout, Button, BackTop } from "antd";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser, clearUser } from "./redux/actions/user_action";
import * as antIcon from "react-icons/ai";



const { Sider, Content, Header } = Layout;
function App(props) {

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
            <Link to="/join">
                join
            </Link>
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
            <Link to="/join">
                join
            </Link>
          </Header>
          <Layout>
            <div className="content-box">              
              <Content>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/join" component={Join} />
                  <Route exact path="/" component={Main} />
                </Switch>
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
