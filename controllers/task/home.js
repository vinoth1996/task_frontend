const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/login', function(req, res){
    const body = req.body;
    // console.log("session " + JSON.stringify(req.session))
    // console.log(body);
    var jsonResp = {};
    console.log("its connecting");
    // console.log("email:" + JSON.stringify(body.email) + "password:" + JSON.stringify(body.password));
    var options = {
        uri: 'http://localhost:8000/login',
        method: 'POST',
        json: {
            "EmailId": body.email,
            "Password": body.password
        }
    }
    var r = request.post(options, function(err, resp) {
        // console.log(resp.body.data.EmailId);
        if(resp.body.status == "success") {
            jsonResp.status = resp.body.status
            jsonResp.info = resp.body.info
            req.session.userName = resp.body.data.UserName
            req.session.EmailId = resp.body.data.EmailId
            res.send(JSON.stringify(jsonResp));
        } else {
            jsonResp.status = resp.body.status
            jsonResp.info = resp.body.info
            res.send(JSON.stringify(jsonResp));
        }
    })
    // console.log("response:" + jsonResp.status)
    // res.send(JSON.stringify(jsonResp));
})

router.get('/dashboard', function(req, res){
    console.log("connecting to dashboard");
    res.render('./dashboard/home', {
        layout: '../dashboard/layouts/main',
        userName: req.session.userName,
        emailId: req.session.EmailId,
        title: 'All Task'
    });
})

router.post('/allTask', function(req, res){
    var jsonResp = {};
    var options = {
        uri: 'http://localhost:8000/allTask/1',
        method: 'GET'
    }
    var r = request.get(options, function(err, resp) {
        // var b = JSON.parse(resp.body).status
        // console.log(b)
        if(JSON.parse(resp.body).status == "success") {
            jsonResp.status = JSON.parse(resp.body).status
            jsonResp.info = JSON.parse(resp.body).info
            jsonResp.data = JSON.parse(resp.body).data
            res.send(JSON.stringify(jsonResp));
        } else {
            jsonResp.status = JSON.parse(resp.body).status
            jsonResp.info = JSON.parse(resp.body).info
            res.send(JSON.stringify(jsonResp));
        }
        // console.log(JSON.stringify(jsonResp))
    })
})

router.post('/incompleteTasks', function(req, res){
    var jsonResp = {};
    var options = {
        uri: 'http://localhost:8000/taskBasedOnStatus/1/InProgress',
        method: 'GET'
    }
    var r = request.get(options, function(err, resp) {
        // var b = JSON.parse(resp.body).status
        // console.log(b)
        if(JSON.parse(resp.body).status == "success") {
            jsonResp.status = JSON.parse(resp.body).status
            jsonResp.info = JSON.parse(resp.body).info
            jsonResp.data = JSON.parse(resp.body).data
            res.send(JSON.stringify(jsonResp));
        } else {
            jsonResp.status = JSON.parse(resp.body).status
            jsonResp.info = JSON.parse(resp.body).info
            res.send(JSON.stringify(jsonResp));
        }
    })
})

router.get('/incompleteTask', (req, res) => {
    res.render('./dashboard/incompleteTask', {
        layout: '../dashboard/layouts/main',
        userName: req.session.userName,
        emailId: req.session.EmailId,
        title: 'Task InProgress'
    });
});

router.post('/completedTasks', function(req, res){
    var jsonResp = {};
    var options = {
        uri: 'http://localhost:8000/taskBasedOnStatus/1/completed',
        method: 'GET'
    }
    var r = request.get(options, function(err, resp) {
        // var b = JSON.parse(resp.body).status
        // console.log(b)
        if(JSON.parse(resp.body).status == "success") {
            jsonResp.status = JSON.parse(resp.body).status
            jsonResp.info = JSON.parse(resp.body).info
            jsonResp.data = JSON.parse(resp.body).data
            res.send(JSON.stringify(jsonResp));
        } else {
            jsonResp.status = JSON.parse(resp.body).status
            jsonResp.info = JSON.parse(resp.body).info
            res.send(JSON.stringify(jsonResp));
        }
    })
})

router.get('/completedTask', (req, res) => {
    res.render('./dashboard/completedTask', {
        layout: '../dashboard/layouts/main',
        userName: req.session.userName,
        emailId: req.session.EmailId,
        title: 'Completed Task'
    });
});

router.get('/loginPage', (req, res) => {
});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(function(err) {
            if(err) {
                console.log(err)
            } else {
                res.redirect('/login');
            }
        })
    }
});

module.exports = router;