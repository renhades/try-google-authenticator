# Try-google-authenticator

## How to startup

  ```shell
  npm install && npm start
  ```

## Features

- Generate QR code with secret so user can scan to Google Authenticator app.
  - Visit http://localhost:3000/2fa/qrcode
- User can verify the token which is from Google Authenticator app.
  ```shell
  POST /2fa/authenticate HTTP/1.1
  Host: localhost:3000
  Content-Type: application/json
  Content-Length: 25

  {
    "token": "123456"
  }
  ```
