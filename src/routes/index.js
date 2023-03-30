const express = require('express');
const router = express.Router();
const listItem = require('../models/List_item')

router.get('/list-items', async (req, res) => {
    try {
        const items = await listItem.find()
        return res.json(items)

    } catch (error) {
        return res.status(400).json({ error: "Error accessing database information" })
    }
})

router.delete('/list-item/:id', async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            res.status(400).json({ error: "ID is mandatory "})
        }

        const listDeleteItem = await listItem.findByIdAndDelete(id)
        return res.json(listDeleteItem)
    } catch (error) {
        return res.status(400).json({ error: "Error deleting information" })
    }
})

router.put('/list-item/:id', async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            res.status(400).json({ error: "ID is mandatory "})
        }

        const {name, quantity, checked} = req.body
    
        if(!name || name.length < 3){
             return res.status(400).json({ error: "Name is mandatory and needs to have more than 3 characters"})
         }
     
         if(!quantity || typeof(quantity) !== 'number'){
             return res.status(400).json({ error: "Quantity is mandatory and needs to be a number "})
         }

        const listItemUpdate = await listItem.findByIdAndUpdate(id,
        {
            name,
            quantity,
            checked: checked || false,  
        },
        {
            new: true
        }   
        )
            
        return res.json(listItemUpdate)

    } catch (error) {
        return res.status(400).json({ error: "Error to update" })
    }
})

router.get('/', (req, res ) => {
    res.send("Hello World 5")
})

router.post('/list-item', async (req, res) => {
   try{

    const {name, quantity, checked} = req.body
    
   if(!name || name.length < 3){
        return res.status(400).json({ error: "Name is mandatory and needs to have more than 3 characters"})
    }

    if(!quantity || typeof(quantity) !== 'number'){
        return res.status(400).json({ error: "Quantity is mandatory and needs to be a number "})
    }
 
    const newItem = await listItem.create({
        name,
        quantity,
        checked: checked || false,
    });

    return res.json(newItem)
   }catch(error){
    return res.status(400).json({ error: "Error to create" })
   }
})

module.exports = router