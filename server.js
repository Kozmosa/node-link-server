const express = require('express');
const fs = require('fs')

function log(text) {
    console.log(text)
}

function ConnDb() {
    // Read DB File
    let jsonBuffer = fs.readFileSync('./database.json')
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

    //设置跨域访问
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
        res.header('X-Frame-Options', 'ALLOW-FROM *')
        res.header('X-Powered-By', ' 3.2.1')
        // res.header('Content-Type', 'application/json;charset=utf-8');
        next();
    });

    app.get('/', function (req, res) {
        res.sendFile(`${__dirname}/public/index.html`)
    });

    app.get('/test', function (req, res) {
        res.sendFile(`${__dirname}/public/test.html`)
    })
    app.get('/video', function (req, res) {
        log(req.query.fd)
        let url = GetLink(db, req.query.fd)
        if (url == -1) {
            log(`File Not Found, fd: ${req.query.fd}`)
            res.send('404 Not Found')
        } else {
            res.send("<!DOCTYPE html><html lang=\'zh\'><head><meta charset=\'UTF-8\'><meta name=\'viewport\' content=\'width=device-width,initial-scale=1\'><meta http-equiv=\'X-UA-Compatible\' content=\'ie=edge\'><title>Jump<\/title><\/head><body><script>window.locationbar.visible = false;window.location.href = '" + url + "';<\/script><\/body><\/html>\n")
        }
    })

    app.get('/watch-video', function (req, res) {
        let url = GetLink(db, req.query.fd)
        res.send("<!DOCTYPE html><html lang='zh'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>视频播放</title></head><body><video width='100%' height='100%' src='" + url + "' autoplay controls></video></body></html>")
    })

    // 启动服务器
    app.listen(4000, function () {
        console.log('Server running on port 4000');
    });
}

// 主函数启动
main();