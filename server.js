const http = require("http");
const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 8000 || 5000 || 3000; // 포트 번호를 환경 변수 또는 기본값으로 설정

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now()
    });
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`app listening at ${port}`);
});
