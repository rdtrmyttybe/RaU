const { exec } = require('child_process');

function startStream(ytlink) {

    ls = exec(`bash str3_ytdlp.sh "${ytlink}"`);

    ls.stdout.on('data', (data) => {
        console.log(data);
    });
    ls.stderr.on('data', (data) => {
        console.error(data);
    });
    ls.on('close', (code) => {
        console.log(code);
    })
}

startStream('https://youtu.be/5pTKYtBaJSU')



// function start_stream(m3u8_link) {

//     ls = exec(`ffmpeg -re -i pipe: -http_persistent 0 -c copy -f flv rtmp://5.tcp.eu.ngrok.io:17771/live/r9pro`);


//     ls.stdout.on('data', (data) => {
//         console.log(data);
//     });
//     ls.stderr.on('data', (data) => {
//         console.error(data);
//     });
//     ls.on('close', (code) => {
//         console.log(code);
//     })
// }


// yt-dlp --hls-use-mpegts --hls-prefer-ffmpeg --skip-unavailable-fragments --no-part -o - -f "bv*[height<=720]+ba/b[height<=720] / wv*+ba/w" --cookies cookies.txt $ytlink | ffmpeg -re -i pipe: -http_persistent 0 -c copy -f flv rtmp://live.restream.io/live/re_4173632_70f5420c2d7c94a5f44b