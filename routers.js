const express = require('express');

const db = require('./data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({ message: 'error' });
    }
})

router.get('/id', async(req, res) => {
    const { id } = req.params;
    try{
        const post = await db.findById(id);
        res.status(200).json(post);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'error' });
    }
      
})

module.exports = router;