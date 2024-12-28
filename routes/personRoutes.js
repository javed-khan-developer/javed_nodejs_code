const express = require('express')
const router = express.Router()
const Person = require("../models/Person")
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
//Post route to add a person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;  ///assuming the request body contains the person data 
        //create a new person document using the mongoose model
        const newPerson = new Person(data)
        //save the new person to the database 
        const response = await newPerson.save();
        console.log('data saved');
        const token = generateToken(response.username);
        console.log('Token is : ', token);
        res.status(200).json({ response: response, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
)

//Get method to get the person data
router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('data fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })

    }

})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;// Extract the work type from url parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType })
            console.log('Person data fetched')
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid WorkType' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body; //updated data for the person
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }
        console.log('data updated')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }

})
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)
        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }
        console.log('Person data deleted successfully')
        res.status(200).json({ message: 'Person data deleted successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router;
