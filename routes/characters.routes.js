const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters.hbs", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character.hbs')
})


// update get route 

router.get('/characters/:id/edit', (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            // res.render("characters/details-character", { character: responseFromAPI.data });
            res.render('characters/edit-character.hbs', { character: responseFromAPI.data })
        })
        .catch(err => console.error(err))

})


// elete get route 

router.get('/characters/:id/delete', (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        res.render('characters/delete.hbs', { character: responseFromAPI.data })
    })
    .catch(err => console.error(err))
})

//this was here at the beginning of the lab

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

/*I started here -> created a get route to render the form but had to move it up because the ID route was going first and was canceling my /create route
and then created a post to send the info and redirect to the list again to see the new character there  */

router.post('/characters/create', (req, res, next) => {
    axios.post('https://ih-crud-api.herokuapp.com/characters', {
        name: req.body.name,
        occupation: req.body.occupation,
        weapon: req.body.weapon,
        debt: true
    })
        .then(responseFromAPI => {
            res.redirect('/characters')
        })

        .catch(err => console.error(err))

})


// update route 

router.post('/characters/:id/update', (req, res, next) => {
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, {
        name: req.body.name,
        occupation: req.body.occupation,
        weapon: req.body.weapon,
        debt: true
    })
        .then(responseFromAPI => {
            res.redirect(`/characters/${req.params.id}`)
        })

        .catch(err => console.error(err))

})

// delete route 


router.post('/characters/:id/delete', (req, res, next) => {
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            res.redirect('/characters')
        })

        .catch(err => console.error(err))

})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters