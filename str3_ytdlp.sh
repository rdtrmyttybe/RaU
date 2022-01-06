#!/bin/bash
# Ask the user for login details
for (( ; ; ))
do

# streamlink --http-cookie "__Secure-3PSID=DQhbLWG7tvhXmwEB35veNwqE2Ygx7BbMi7oqQ7J78eWwQyH5eF_tqaKmQTRGry1RLBeFgA." --stream-timeout 240 --retry-streams 30 --hls-duration 04:00:00 "$ytlink" "720p" -O | ffmpeg -re -i pipe:0 -c copy -f flv rtmp://live.restream.io/live/re_320318_054b74b022085adc8ba3

yt-dlp --hls-use-mpegts --hls-prefer-ffmpeg --skip-unavailable-fragments --no-part -o - -f "bv*[height<=720]+ba/b[height<=720] / wv*+ba/w" --cookies cookies.txt $1 | ffmpeg -re -i pipe: -http_persistent 0 -c copy -f flv rtmp://5.tcp.eu.ngrok.io:17771/live/r9pro

sleep 15

done

