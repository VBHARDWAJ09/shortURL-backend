const { validationResult, Result, body } = require('express-validator')
const { filterKeysFromArray } = require('../services/commonServices')
const ShortUniqueId = require('short-unique-id')
const urlModal = require('../model/url')
const he = require('he');

module.exports.shortUrl = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const { url } = req.body
            const decodedUrl = he.decode(url)
            const UrlExist = await urlModal.findOne({ fullUrl: decodedUrl })
            if (!UrlExist) {
                const uid = new ShortUniqueId({ length: 10 });
                const shortId = uid.rnd();
                await urlModal.create({ shortUrlId: shortId, fullUrl: decodedUrl.toString(), clicks: 0 })
                return res.status(200).json({ msg: `Short Url has been generated`, shortUrl: shortId, decodedUrl })
            } else {
                return res.status(200).json({ msg: `Short Url has been generated`, shortUrl: UrlExist.shortUrlId, decodedUrl: UrlExist.fullUrl })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    } else {
        return res.status(400).json({ errors: filterKeysFromArray(errors.array(), ['msg']) })
    }
}

module.exports.getRedirectUrl = async (req, res) => {
    const { shortUrl } = req.params;
    if (shortUrl) {
        try {
            const urlData = await urlModal.findOneAndUpdate({ shortUrlId: shortUrl }, { $inc: { clicks: 1 } }).select('-_id fullUrl')
            if (urlData) {
                return res.status(200).json({ redirect_url: urlData.fullUrl })
            } else {
                return res.status(201).json({ msg: `No Url Exist` })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    } else {
        return res.status(400).json({ errors: [{ msg: "shortUrl is missing" }] })
    }
}

module.exports.getUrlAnalysis = async (req, res) => {
    const { page } = req.params;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    try {
        const count = await urlModal.find({}).countDocuments()
        const response = await urlModal.find({}).skip(skip).limit(perPage).sort({ updatedAt: -1 }).select('fullUrl')
        return res.status(200).json({ data: response, perPage, count })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports.getUrlData = async (req, res) => {
    const { id } = req.params;
    try {
        const urlData = await urlModal.findOne({ _id: id }).select('-_id shortUrlId fullUrl clicks')
        if (urlData) {
            return res.status(200).json({ urlData })
        } else {
            return res.status(200).json({ msg: `No Url Exist` })
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}