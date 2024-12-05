const express = require('express');
const router = express.Router();
const actions = require('../controller/actions');

// Categories Routes
router.post('/api/groupings', actions.createGroupings);
router.get('/api/groupings', actions.getGroupings);

// Transaction Routes
router.post('/api/entry', actions.createEntry);
router.get('/api/entry', actions.getEntries);
router.delete('/api/entry', actions.removeEntry);

// Labels Route
router.get('/api/tags', actions.getTags);

module.exports = router;
