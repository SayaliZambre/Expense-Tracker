const model = require('../models/database');

const respondWithError = (res, err, message, status = 500) => {
    res.status(status).json({ message: `${message}: ${err.message}` });
};

// POST
const createGroupings = async (req, res) => {
    try {
        const grouping = new model.Groupings({
            category: "Investment",
            marker: "#FCBE44"
        });

        const savedGrouping = await grouping.save();
        res.json(savedGrouping);
    } catch (err) {
        respondWithError(res, err, "Error while creating groupings", 400);
    }
};

// GET:
const getGroupings = async (req, res) => {
    try {
        const groupings = await model.Groupings.find({});
        const filteredData = groupings.map(({ category, marker }) => ({ category, marker }));
        res.json(filteredData);
    } catch (err) {
        respondWithError(res, err, "Error while fetching groupings");
    }
};

// POST:
const createEntry = async (req, res) => {
    if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

    try {
        const { label, category, value } = req.body;
        const entry = new model.Entry({
            label,
            category,
            value,
            timestamp: new Date()
        });

        const savedEntry = await entry.save();
        res.json(savedEntry);
    } catch (err) {
        respondWithError(res, err, "Error while creating entry", 400);
    }
};

// GET:
const getEntries = async (req, res) => {
    try {
        const entries = await model.Entry.find({});
        res.json(entries);
    } catch (err) {
        respondWithError(res, err, "Error while fetching entries");
    }
};

// DELETE:
const removeEntry = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Request body not Found" });

    try {
        await model.Entry.deleteOne(req.body);
        res.json("Record Removed...!");
    } catch (err) {
        respondWithError(res, err, "Error while removing entry");
    }
};

// GET: 
const getTags = async (req, res) => {
    try {
        const aggregatedData = await model.Entry.aggregate([
            {
                $lookup: {
                    from: "groupings",
                    localField: "category",
                    foreignField: "category",
                    as: "groupings_info"
                }
            },
            { $unwind: "$groupings_info" }
        ]);

        const labeledData = aggregatedData.map(({ _id, label, category, value, groupings_info }) => ({
            _id,
            label,
            category,
            value,
            marker: groupings_info.marker
        }));

        res.json(labeledData);
    } catch (err) {
        respondWithError(res, err, "Lookup Collection Error", 400);
    }
};

module.exports = {
    createGroupings,
    getGroupings,
    createEntry,
    getEntries,
    removeEntry,
    getTags
};
