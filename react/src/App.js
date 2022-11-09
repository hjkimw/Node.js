import { Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import Main from "./common/Main";
import List from "./community/List";
import Create from "./community/Create";
import Detail from "./community/Detail";
import Edit from "./community/Edit";
import GlobalStyle from "./GlobalStyle";
import Join from "./user/Join";
import Login from "./user/Login";
import firebase from "./firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //firebase로 현재 auth상태변화를 감지해서 파라미터로 해당 상태값을 전달
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo === null) dispatch(logoutUser);
      else dispatch(loginUser(userInfo.multiFactor.user));
    });
  }, []);

  useEffect(() => {
    //firebase의 로그인된 유저정보를 제거해서 강제 로그아웃 처리 (테스트용도)
    //firebase.auth().signOut();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:num" element={<Detail />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit/:num" element={<Edit />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
