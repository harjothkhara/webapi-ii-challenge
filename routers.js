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
        if (post[0]) {
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
            const newPost = await db.insert(post);
            const findNewPost = await db.findById(newPost.id);
            res.status(201).json(findNewPost);
        } catch(error) {
            console.log(error);
            res.status(500).json
            ({ message: "There was an error while saving the post to the database"});
        }
    }
    
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await db.findById(id);
        const deletedPost = await db.remove(id);
        if (deletedPost) {
            res.status(201).json(post);
        } else {
            res.status(500).json
            ({ error: 'The post could not be removed'})
        }
    } catch(error) {
        console.log(error);
        res.send(404).json
        ({ message: 'The post with the specified ID does not exist.'})
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    if (!body.title || !body.contents) {
        res.status(400).json
        ({ message: 'Please provide title and contents for the post.'})
    } else {
        try {
            const edit = await db.update(id, body);
           const newPost = await db.findById(id);
           if (Object.keys(newPost).length) {
            res.status(200).json(newPost);
           } else {
                res.status(404).json
                ({ message: 'The post with the specified ID does not exist.'})
            }
           
    } catch(error) {
        console.log(error);
        res.status(500).json
        ({ message: 'The post information could not be modified.' });
    }
 } 
     
});

module.exports = router;