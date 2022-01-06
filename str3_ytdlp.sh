#!/bin/bash
# Ask the user for login details
yt-dlp --hls-use-mpegts --hls-prefer-ffmpeg --skip-unavailable-fragments --no-part -o - -f "bv*[height<=720]+ba/b[height<=720] / wv*+ba/w" --cookies cookies.txt $1 | ffmpeg -re -i pipe: -http_persistent 0 -c copy -f flv rtmp://live.restream.io/live/re_4173608_5bac44ffaa22ce77e041
