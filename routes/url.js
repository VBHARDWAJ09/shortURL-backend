const express = require('express');
const { shortUrl, getRedirectUrl, getUrlAnalysis, getUrlData } = require('../controller/url');
const router = express.Router()
const { createUrlValidations } = require('../validations/url')
const { authorized } = require('../services/authServices')


router.post('/url', [createUrlValidations, authorized], shortUrl)

router.get('/details/:page', [authorized], getUrlAnalysis)

router.get('/url-details/:id', [authorized], getUrlData)

router.get('/:shortUrl', getRedirectUrl)

module.exports = router;