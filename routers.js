const express = require('express');

const db = require('./data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json
        ({ message: 'The posts information could not be retrieved.' });
    }
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const post = await db.findById(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json 
            ({ message: 'The post with the specified ID does not exist'})
        }
       
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'The post information could not be retrieved.' });
    }
      
})

router.post('/', async (req, res) => {
    const post = req.body;
    if (!post.title || !post.contents) {
        res.status(400).json
        ({ message: 'Please provide title and contents for the post.' })
    } else {
        try {
            const edit = await db.insert(post);
            const newPost = await db.findById(edit.id);
            res.status(200).json(newPost);
        } catch(error) {
            console.log(error);
            res.send(500).json({ message: "error"});
        }
    }
    
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await db.findById(id);
        if (post) {
            const deleted = await db.remove(id);
            if (deleted) {
                res.status(201).json.json(post);
            } else {
                res.status(500).json
                ({ message: 'The post could not be removed' })
            }
        } else {
            res.status(404).json
            ({ message: 'The post with the specified ID does not exist.'})
        }
    } catch(error) {
        console.log(error);
        res.send(500).json
        ({ message: 'Something went wrong with your request.'})
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const edit = await db.update(id, body);
        const newPost = await db.findById(id);
        res.status(202).json(newPost);
    } catch(error) {
        console.log(error);
        res.send(500).json({ message: 'error' });
    }
});

module.exports = router;