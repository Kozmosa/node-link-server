const express = require("express");
const fs = require("fs")

function log(text) {
    console.log(text)
}

function ConnDb() {
    // Read DB File
    let jsonBuffer = fs.readFileSync("./database.json")
    let jsonStr = jsonBuffer.toString()
    return JSON.parse(jsonStr)
}

function GetLink(db, fd) {
    if (db.urls[fd] == undefined) {
        return -1;
    } else {
        return db.urls[fd]
    }
}

function main() {
    const db = ConnDb()
    let app = express();

    // 路由
    app.get("/", (req, res) => {
        res.sendFile(`${__dirname}/public/index.html`)
    });

    app.get("/video", (req, res) => {
        log(req.query.fd)
        let url = GetLink(db, req.query.fd)
        if (url == -1) {
            log(`File Not Found, fd: ${req.query.fd}`)
            res.send("404 Not Found")
        } else {
            res.send(`<!DOCTYPE html><html lang=\"zh\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"><title>Jump<\/title><\/head><body><script>window.locationbar.visible = false;window.location.href = "${url}";<\/script><\/body><\/html>\n`)
        }
    })

    // 启动服务器
    app.listen(80 /* 端口号 */ , () => {
        console.log("Server running on port 80");
    });
}

// 主函数启动
main();