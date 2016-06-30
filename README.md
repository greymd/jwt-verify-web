# jwt-verify-web
Samll web application for checking JWT verification.

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

```sh
$ curl -so- localhost:3000/verify -d 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ._bRCgWUaZVnTbSUlyHpIWzOBOHSPv7QyXnodebsP8kw' -d 'secret=test' -X GET | jq .
{
  "actual": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ._bRCgWUaZVnTbSUlyHpIWzOBOHSPv7QyXnodebsP8kw",
  "expect": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImZvbyI6ImJhciIsInByZSI6ImN1cmUifQ.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tLyIsInN1YiI6Im15c3ViIiwiYXVkIjoibXljbGllbnQiLCJleHAiOjE0NjcyNzM3MDQsIm5vbmNlIjoiIiwiaWF0IjoxNDY3MjczNDA0fQ.41xw9bsrFaqjsCIm40ElGp35wMymncS29PcrdEkyp04",
  "result": "failed"
}
```
