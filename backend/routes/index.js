var express = require('express');
const { signup, login, createProject, saveProject, getProjects, getProject, getUser, logout } = require('../controllers/userController');
const { githubAuth } = require('../controllers/githubAuthController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/github/callback', githubAuth);
router.post('/me', getUser);
router.post('/logout', logout);
router.post('/create-project', createProject);
router.post('/save-project', saveProject);
router.post('/get-projects', getProjects);
router.post('/get-project', getProject);



module.exports = router;