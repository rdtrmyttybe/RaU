#!/bin/bash
# Ask the user for login details
yt-dlp --hls-use-mpegts --hls-prefer-ffmpeg --skip-unavailable-fragments --no-part -o - -f "bv*[height<=720]+ba/b[height<=720] / wv*+ba/w" --cookies cookies.txt $1 | ffmpeg -re -i pipe: -http_persistent 0 -c copy -f flv rtmp://5.tcp.eu.ngrok.io:17771/live/r9pro
