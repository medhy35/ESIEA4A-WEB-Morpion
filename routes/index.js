var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();

const list = [{
    player: 'elem1',
    nbvictory: 0
},{
    player: 'elem2',
    nbvictory: 0
}];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// table de score
router.get('/hscore',(req,res)=> {
    res.json(hscore);
});

router.post('/hscore', (req, res) => {
    hscore.push({
        nom1: req.body.name1,
        score: req.body.score,

    })
    res.send('OK')
});
*/
router.post('/admin',(req,res) => {
   const username = req.body.username;
    const password = req.body.password;
    if(username === 'admin' && password === 'secret'){
        // user connecté
    } else {
        res.status(400).send('Erreur de code ou de mot de passe');
    }
});

router.get('/score', (req, res) => {
  res.json(listhscore)
});


module.exports = router;
