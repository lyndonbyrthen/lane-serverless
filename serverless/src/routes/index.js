const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const dateformat = require('dateformat');

router.use(compression());
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const getData = async req => {
  const data = {};
  data.sectionId = /^\/(.*)/.exec(req.path)[1];

  data.env = req.app.get('env');

  data.assetPath = req.app.get('assetPath');

  data.dateformat = dateformat;

  return data;
}

const renderView = async (req, res, next, data) => {
  const templatePath = data.sectionId ? `pages/${data.sectionId}` : 'pages/home';
  res.render(templatePath, data);
}

router.get('/', async (req, res, next) => {
  const data = await getData(req);
  renderView(req, res, next, data);
});

router.get('/audiovisualizer', async (req, res, next) => {
  const data = await getData(req);
  renderView(req, res, next, data);
});

router.get('/graphbuilder', async (req, res, next) => {
  const data = await getData(req);
  renderView(req, res, next, data);
});

module.exports = router;
