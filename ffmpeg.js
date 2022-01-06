const { exec } = require('child_process');

const args = process.argv.slice(2)[0]

function startStream(ytlink) {
    console.log(ytlink)
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

startStream(args)
