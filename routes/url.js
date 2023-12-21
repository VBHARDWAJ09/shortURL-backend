const express = require('express');
const { shortUrl, getRedirectUrl, getUrlAnalysis, getUrlData } = require('../controller/url');
const router = express.Router()
const { createUrlValidations } = require('../validations/url')


router.post('/url', [createUrlValidations], shortUrl)

router.get('/:shortUrl', getRedirectUrl)

router.get('/details/:page', getUrlAnalysis)

router.get('/url-details/:id', getUrlData)

module.exports = router;