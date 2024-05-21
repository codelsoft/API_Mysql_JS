const express = require('express');
const postsController = require('../controllers/post.controller')

const router = express.Router()

router.post("/", postsController.save);
router.get("/:id", postsController.getPost);
router.get("/", postsController.allPost);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.deletePost);






module.exports = router;