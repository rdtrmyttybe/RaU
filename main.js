const fs = require('fs'),
    request = require('request'),
    group = '202409472',
    token = 'c3b31136dcaa390c63aaf21d79aad83792858504dc18c545a657a4a873450c68bef191210280b07e6b5c8',
    album = "13",
    description = '',
    folder = "videos/",
    arr = [];

// ---------------------------------------------------------------- 
fs.readdirSync(folder).forEach(file => {
    let fileStat = fs.statSync(folder + '/' + file).isDirectory();
    if (!fileStat) {
        arr.push(file);
    }
});
let index = 0;
if (index < arr.length) {
    console.debug(arr);
    getUploadURL(arr[index++]);
} else {
    console.error('[Ошибка] - В папке нет файлов.')
}
// ---------------------------------------------------------------- 
function getUploadURL(file) {
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
            request(options, (error, response, body) => {
                if (!error) {
                    var code = response && response.statusCode;
                    console.debug('StatusCode:', code);
                    console.debug('Body: ');
                    console.debug(JSON.parse(body));

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
                            console.info('[Информация] - Завершение работы...');
                        }
//                         move(file);
                    } else {
                        console.error('[Ошибка!] - Код: ' + code);
                    }
                } else {
                    console.error('[Ошибка!] - 1:', error);
                };
            })
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
