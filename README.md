```shell

curl -X 'POST'\
     -H 'Authorization: Bearer <token>'\
     -d '{"ref":"refs/heads/main","inputs":{ "youtube_id":"<youtube_id>" }}'\
     https://api.github.com/repos/rdtrmyttybe/tttt/actions/workflows/<id>/dispatches
```
