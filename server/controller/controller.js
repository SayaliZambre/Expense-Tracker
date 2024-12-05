const model = require('../models/model');

// Utility function for sending error responses
const handleError = (res, err, message, status = 500) => {
    res.status(status).json({ message: `${message}: ${err.message}` });
};

// POST: http://localhost:8080/api/categories
const createCategories = async (req, res) => {
    try {
        const category = new model.Categories({
            type: "Investment",
            color: "#FCBE44"
        });

        const savedCategory = await category.save();
        res.json(savedCategory);
    } catch (err) {
        handleError(res, err, "Error while creating categories", 400);
    }
};

// GET: http://localhost:8080/api/categories
const getCategories = async (req, res) => {
    try {
        const categories = await model.Categories.find({});
        const filteredData = categories.map(({ type, color }) => ({ type, color }));
        res.json(filteredData);
    } catch (err) {
        handleError(res, err, "Error while fetching categories");
    }
};

// POST: http://localhost:8080/api/transaction
const createTransaction = async (req, res) => {
    if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

    try {
        const { name, type, amount } = req.body;
        const transaction = new model.Transaction({
            name,
            type,
            amount,
            date: new Date()
        });

        const savedTransaction = await transaction.save();
        res.json(savedTransaction);
    } catch (err) {
        handleError(res, err, "Error while creating transaction", 400);
    }
};

// GET: http://localhost:8080/api/transaction
const getTransactions = async (req, res) => {
    try {
        const transactions = await model.Transaction.find({});
        res.json(transactions);
    } catch (err) {
        handleError(res, err, "Error while fetching transactions");
    }
};

// DELETE: http://localhost:8080/api/transaction
const deleteTransaction = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Request body not Found" });

    try {
        await model.Transaction.deleteOne(req.body);
        res.json("Record Deleted...!");
    } catch (err) {
        handleError(res, err, "Error while deleting transaction");
    }
};

// GET: http://localhost:8080/api/labels
const getLabels = async (req, res) => {
    try {
        const aggregatedData = await model.Transaction.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            { $unwind: "$categories_info" }
        ]);

        const labeledData = aggregatedData.map(({ _id, name, type, amount, categories_info }) => ({
            _id,
            name,
            type,
            amount,
            color: categories_info.color
        }));

        res.json(labeledData);
    } catch (err) {
        handleError(res, err, "Lookup Collection Error", 400);
    }
};

module.exports = {
    createCategories,
    getCategories,
    createTransaction,
    getTransactions,
    deleteTransaction,
    getLabels
};
