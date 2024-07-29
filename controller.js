require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const pool = require('./db'); // PostgreSQL pool instance
const {checkIfUserExist, checkIfDiscussionExist} = require('./utils');

// Like Discussion
exports.likeDiscussion = async (req, res) => {
    const { user_id } = req.body;
    const { id } = req.params;
    const likeId = uuidv4();

    try {
        const user = await checkIfUserExist(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const discussion = await checkIfDiscussionExist(id);
        if (!discussion) {
            return res.status(404).json({ error: 'Discussion not found' });
        }

        const newLike = await pool.query(
            "INSERT INTO discussion_likes (id, user_id, discussion_id) VALUES ($1, $2, $3) RETURNING *",
            [likeId, user_id, id]
        );
        res.status(201).json(newLike.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Comment on Discussion
exports.commentOnDiscussion = async (req, res) => {
    const { user_id, text } = req.body;
    const { id } = req.params;
    const commentId = uuidv4();

    try {
        const user = await checkIfUserExist(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const discussion = await checkIfDiscussionExist(id);
        if (!discussion) {
            return res.status(404).json({ error: 'Discussion not found' });
        }

        const newComment = await pool.query(
            "INSERT INTO comments (id, user_id, discussion_id, text) VALUES ($1, $2, $3, $4) RETURNING *",
            [commentId, user_id, id, text]
        );
        res.status(201).json(newComment.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Like Comment
exports.likeComment = async (req, res) => {
    const { user_id } = req.body;
    const { id } = req.params;
    const likeId = uuidv4();

    try {
        const user = await checkIfUserExist(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newLike = await pool.query(
            "INSERT INTO comment_likes (id, user_id, comment_id) VALUES ($1, $2, $3) RETURNING *",
            [likeId, user_id, id]
        );
        res.status(201).json(newLike.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Reply to Comment
exports.replyToComment = async (req, res) => {
    const { user_id, text, discussion_id } = req.body;
    const { id } = req.params;
    const replyCommentId = uuidv4();

    try {
        const user = await checkIfUserExist(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const discussion = await checkIfDiscussionExist(discussion_id);
        if (!discussion) {
            return res.status(404).json({ error: 'Discussion not found' });
        }

        await pool.query(
            "INSERT INTO comments (id, user_id, discussion_id, text) VALUES ($1, $2, $3, $4) RETURNING *",
            [replyCommentId, user_id, discussion_id, text]
        );

        const newReply = await pool.query(
            "INSERT INTO comment_replies (reply_comment_id, comment_id) VALUES ($1, $2) RETURNING *",
            [replyCommentId, id]
        );
        res.status(201).json(newReply.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Comment
exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const updatedComment = await pool.query(
            "UPDATE comments SET text = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            [text, id]
        );
        res.status(200).json(updatedComment.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM comment_replies WHERE comment_id = $1", [id]);
        await pool.query("DELETE FROM comments WHERE id = $1", [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


