var express = require('express');
var router = express.Router();

var speakeasy = require('speakeasy');
var secret = speakeasy.generateSecret();
var QRCode = require('qrcode');
var image_tag = '';
QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
  // Display this data URL to the user in an <img> tag
  image_tag = '<img src="' + data_url + '">';
});

// 1. Scan QR Code with Google Authenticator.
router.get('/qrcode', function(req, res, next) {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from(image_tag));
});

// 2. Post token to authenticate
router.post('/authenticate', function(req, res, next) {
  var token = req.body.token;
  var verified = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token
  });

  res.json({
    success: verified
  })
});

module.exports = router;
