var express = require('express');
var router = express.Router();



var express = require('express')
var router = express.Router()

const listhscore = [{
    name: toure,
    hiscore: 0
},{
    name:test,
    hiscore:0
}];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/score', (req, res) => {
  res.json(listhscore)
});


module.exports = router;
