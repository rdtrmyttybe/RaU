const fs = require('fs'),
    request = require('request'),
    { formatBytes } = require('./convertBytes'),
    group = '202409472',
    token = 'c3b31136dcaa390c63aaf21d79aad83792858504dc18c545a657a4a873450c68bef191210280b07e6b5c8',
    description = '',
    folder = "videos/";


// ----------------------------------------------------------------
let index = 0;
let arr = [];
fs.readdir(folder, function () {
    fs.readdirSync(folder).forEach(file => {
        let fileStat = fs.statSync(folder + '/' + file).isDirectory();
        if (!fileStat) {
            arr.push(file);
        }
    });
    arr = arr.map(function (fileName) {
        return {
            name: fileName,
            time: fs.statSync(folder + '/' + fileName).mtime.getTime()
        };
    }).sort(function (a, b) {
        return a.time - b.time;
    }).map(function (v) {
        return v.name;
    });

    if (index < arr.length) {
        console.debug(arr);
        getUploadURL(arr[index++]);
    } else {
        console.error('[Ошибка] - В папке нет файлов.')
    }
});

// ---------------------------------------------------------------- 
function getUploadURL(file) {
    switch (file.match(/[^[\]]+(?=])/g)[1]) {
        /*           Vjlink             */
        case "UCOrraQ1wIEdkHCtZq3zH2oA":
        case "UCNcuCP5IAI6My3e5Z-vKkBQ":
            album = "12";
            break;
        /*          Щадилдо             */
        case "UC0hPfK3y7jrTuCqyxAYRy2Q":
        case "UCKaO5Kvxpx6xqNWJN5HGJww":
        case "UC-QG1Q_C3UnyqPsdWxPoKyg":
        case "UCp0kr5gFfRlekGAvQ6Bw14w":
        case "UC4CH6vB9sZ4xg71XVIOXZOw":
        case "UCXugNh7Ec66p_iYBQPfWd9Q":
        case "UCwAWTzNpCh_Qxap6z9fNlig":
        case "UCs2qH-ylrM2lm6bMHG5nsUw":
        case "UCXdyP8qQf26lsADsGp-itjw":
            album = "13";
            break;
        /*     Валентин Владимирович     */
        case "UCrEufIi5_5Yn0rk3BrbrFDQ":
        case "UCslZVm-WgC0KpEgdxiHk9Ng":
            album = "2";
            break;
        default:
            album = "";
            break;
    };

    var options = {
        method: 'GET',
        url: `https://api.vk.com/method/video.save?group_id=${group}` +
            `&album_id=${album}` +
            `&name=${encodeURIComponent(file.split('.').reverse().slice(1).reverse().join('.'))}` +
            `&description=${description}` +
            `&privacy_view=2` +
            `&access_token=${token}` +
            `&v=5.80`,
    };
    request(options, (error, response, body) => {
        if (!error) {
            var data = JSON.parse(body);
            console.debug(data);
            // ---------------------------------------------------------------- 
            formData = {};
            formData['file'] = fs.createReadStream(folder + "/" + file);
            var options = {
                method: 'POST',
                url: data.response.upload_url,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                formData: formData
            };
            // ---------------------------------------------------------------- 
            let r = request(options, (error, response, body) => {
                if (!error) {
                    var code = response && response.statusCode;
                    console.debug('StatusCode:', code);
                    console.debug('Body: ');
                    console.debug(JSON.parse(body));
                    clearInterval(q);
                    // var options = {
                    //     method: 'GET',
                    //     url: `https://api.vk.com/method/video.edit?owner_id=${group}` +
                    //         `&video_id=${album}` +
                    //         `&name=${encodeURIComponent(file.split('.').reverse().slice(1).reverse().join('.'))}` +
                    //         `&description=${description}` +
                    //         `&privacy_view=2` +
                    //         `&access_token=${token}` +
                    //         `&v=5.80`,
                    // };
                    // request(options, (error, response, body) => {

                    // })
                    if (code === 200) {
                        if (index < arr.length) {
                            getUploadURL(arr[index++])
                        } else {
                            console.info('[Информация] - Все файлы из папки загружены.');
                        }
//                         move(file);
                    } else {
                        console.error('[Ошибка!] - Код: ' + code);
                    }
                } else {
                    console.error('[Ошибка!] - 1:', error);
                };
            })

            let dispatchedOld = 0;
            let size = fs.lstatSync(folder + "/" + file).size;
            var q = setInterval(function () {
                var dispatched = r.req.connection._bytesDispatched;
                speed = dispatched - dispatchedOld;
                let percent = dispatched * 100 / size;
                process.stdout.write('\033c');
                console.log(data);
                console.log('Загружено на сервер ' + formatBytes(dispatched) + ' из ' + formatBytes(size) + " cо скоростью: " + formatBytes(speed) + "/сек." + "\nГотово: " + percent.toFixed(2) + "%")
                dispatchedOld = dispatched;
            }, 1000);
            // ---------------------------------------------------------------- 
        } else {
            console.error("[Ошибка!] - 2: " + error);
        };
    })
};
// ---------------------------------------------------------------- 
function move(index) {
    var oldPath = folder + '/' + index;
    var newPath = folder + '/Loaded/' + index;
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            throw err
        } else {
            console.info("[Информация] - Файл \"" + index + "\" загружен и перемещен в папку \"Loaded\"");
        }
    })
};
// ----------------------------------------------------------------
