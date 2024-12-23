const express = require('express')
const router = express.Router()
const Menu = require("./../models/Menu")

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data)
    const response = await newMenu.save();
    console.log('data saved')
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await Menu.find()
    console.log('data fetched')
    res.status(200).json(data)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })

  }
})

router.get('/:taste', async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == 'Sweet' || taste == 'Sour' || taste == 'Spicy') {
      const data = await Menu.find({ taste: taste })
      console.log('Menu data fetched')
      res.status(200).json(data)
    } else {
      res.status(404).json({ error: 'Invalid Taste Type' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.put('/:id', async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenu = req.body;
    const response = await Menu.findByIdAndUpdate(menuId, updatedMenu, {
      new: true,
      runValidators: true
    })
    if (!response) {
      return res.status(404).json({ message: 'Menu Not Found' })
    }
    console.log('Menu data Updated')
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await Menu.findByIdAndDelete(menuId)
    if (!response) {
    return  res.status(404).json({ message: "Menu Not Found" })
    }
    console.log('Menu deleted Successfully')
    res.status(200).json({message:'Menu data deleted successfully'})

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })

  }
})

module.exports = router;
