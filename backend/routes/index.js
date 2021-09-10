const express = require('express');
const router = express.Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;
