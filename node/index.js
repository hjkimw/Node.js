const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, "../react/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//community전용 라우터 연결
app.use("/api/community", require("./router/communityRouter.js"));
//user전용 라우터 연결
app.use("/api/user", require("./router/userRouter.js"));

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://jin:1564@cluster0.fgc7wjy.mongodb.net/?retryWrites=true&w=majority"
    )
    //접속 성공시
    .then(() =>
      console.log(`Server app listening on port ${port} with MongoDB`)
    )
    //접속 실패시
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  //서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
  res.sendFile(path.join(__dirname, "../react/build/index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../react/build/index.html"));
});
