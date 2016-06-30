var express = require('express');
var jwt = require('jsonwebtoken');
var base64url = require('base64url');
var clone = require('clone');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var token = req.param("token");
    var secret = req.param("secret");
    var resObj = {
        actual: null,
        expect: null,
        result: null
    };

    var given_header = JSON.parse(base64url.decode(token.split('.')[0]));
    var given_payload = JSON.parse(base64url.decode(token.split('.')[1]));
    var given_alg = (given_header.alg ? 'HS256' : given_header.alg);
    delete given_header.alg

    // Generate ID token
    token_confirm = jwt.sign(given_payload, secret, { algorithm: given_alg, header : given_header});

    var verify_callback = function (err, decoded) {
        // In case of invalid one, it's undefined.
        if ( typeof decoded !== 'undefined' && decoded ) {
            resObj.actual   = token;
            resObj.expect   = token_confirm;
            resObj.result   = 'succeeded';
        } else {
            resObj.actual   = token;
            resObj.expect   = token_confirm;
            resObj.result   = 'failed';
        }
        res.json(resObj);
    };

    // Verify the result.
    jwt.verify (token, secret, {ignoreExpiration: true}, verify_callback);

});

module.exports = router;
