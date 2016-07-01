# jwt-verify-web
Simple web application for checking JWT verification.

# Usage

## Preparation
```sh
$ git clone git@github.com:greymd/jwt-verify-web.git
$ cd jwt-verify-web
$ npm install

# Server server
$ npm start
```

## API Specification

### Request

Endpoint : ``/verify``

| Param  | Description                                |
| -----  | -----------                                |
| token  | JWT ID Token                               |
| secret | Secret key which used for generating hash. |

### Response

Format : JSON

| Param  | Description                                                                                                                   |
| -----  | -----------                                                                                                                   |
| actual | JWT ID Token which actually given as `token`.                                                                                 |
| expect | ID Token which the application generates from `token` and `secret`. This information might be useful if `result` is "failed". |
| result | If the token is valid, it will be "succeeded". If not "failed".                                                               |

## Verify JWT ID Token

Call API and get the value.
### Valid Token
```sh
$ curl -so- localhost:3000/verify \
-d 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ._bRCgWUaZVnTbSUlyHpIWzOBOHSPv7QyXnodebsP8kw' \
-d 'secret=testkey' \
-X GET
{
  "actual": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ._bRCgWUaZVnTbSUlyHpIWzOBOHSPv7QyXnodebsP8kw",
  "expect": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ._bRCgWUaZVnTbSUlyHpIWzOBOHSPv7QyXnodebsP8kw",
  "result": "succeeded"
}
```

If the token is valid, "result" will be "succeeded". If not, "failed".

### Invalid Token

Call API with invalid secret key `test`.

```sh
$ curl -so- localhost:3000/verify -d 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ._bRCgWUaZVnTbSUlyHpIWzOBOHSPv7QyXnodebsP8kw' -d 'secret=test' -X GET | jq .
{
  "actual": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ._bRCgWUaZVnTbSUlyHpIWzOBOHSPv7QyXnodebsP8kw",
  "expect": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ.41xw9bsrFaqjsCIm40ElGp35wMymncS29PcrdEkyp04",
  "result": "failed"
}
```

### License
This software is released under the MIT License.
