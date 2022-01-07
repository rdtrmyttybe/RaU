
```js
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.github.com/repos/rdtrmyttybe/RaU/actions/workflows/ytRecVkUpload.yml/dispatches',
  'headers': {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': 'Bearer GITHUB__TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "ref": "main",
    "inputs": {
      "youtube_id": "YouTube__LiveStreamLink"
    }
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```
