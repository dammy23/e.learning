import { Router } from 'express';
import fetch from 'cross-fetch'; 



const pagesRouter = Router();


//pagesRouter.post('/lesson/create', ensureAuthenticated, LessonsController.create);


pagesRouter.get('/', (req, res) => {
    
    if(req.session.userid){
        res.render('dashboard',{ title: 'Dashboard', layout: 'auth' });
    }else{
    res.render('index');
    }
});

pagesRouter.get('/dashboard', (req, res) => {
    if(req.session.userid){
        res.render('dashboard',{ title: 'Dashboard', layout: 'auth' });
    }else{
        res.render('index');
    }
});

pagesRouter.get('/courses', (req, res) => {
    if(req.session.userid){
        fetch(req.protocol + '://' + req.get('host') +'/course/list', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(response => response.json())
          .then(data => {
            res.render('courses',{ data:data, title: 'Courses', layout: 'auth' });
          });
        
        
    }else{
        res.render('index');
    }
});

pagesRouter.get('/users', (req, res) => {

    if(req.session.userid){
        fetch(req.protocol + '://' + req.get('host') +'/user/list', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(response => response.json())
          .then(data => {
            res.render('users',{ users:data, title: 'Users', layout: 'auth' });
          });
        
        
    }else{
        res.render('index');
    }
});

pagesRouter.get('/lessons', (req, res) => {
    if(req.session.userid){
        fetch(req.protocol + '://' + req.get('host') +'/course/list', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          })
          .then(response => response.json())
          .then(data => {
            res.render('lessons',{ courses:data,title: 'Lessons', layout: 'auth' });
          });
        
    }else{
        res.render('index');
    }
});


pagesRouter.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


export default pagesRouter;