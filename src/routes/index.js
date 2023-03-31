const express = require('express');
const router = express.Router();
const listItem = require('../models/List_item')


router.get("/", (req, res) => {
    res.send("Hello World!");
  });

router.get('/list-item', async (req, res) => {
    try {
        const { username } = req.headers
        
        if(!username){
            return res.status(401).json({ error: "Username is required"})
        }

        const items = await listItem.find({
            username,
        })
        return res.json(items)

    } catch (error) {
        return res.status(400).json({ error: "Error accessing database information" })
    }
})

router.post('/list-item', async (req, res) => {
    try{
        const { username } = req.headers
        if(!username){
            return res.status(401).json({ error: "Username is required"})
        }

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
            username,
        });
    
        return res.json(newItem)
    }catch(error){
     return res.status(400).json({ error: "Error to create" })
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


module.exports = router