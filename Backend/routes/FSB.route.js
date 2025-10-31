const mongoose = require('mongoose');

const FreeShippingBarModel = require('../schema/FreeShippingBar.schema');

const router = require('express').Router();


router.post("/create-fsb", async (req, res) => {
    try {
        const fsbData = new FreeShippingBarModel(req.body);
        const savedData = await fsbData.save();
        res.status(201).json({ success: true, data: savedData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/get-fsb/:store_id", async (req, res) => {
    try {
        const { store_id } = req.params;
        const fsbData = await FreeShippingBarModel.findOne({ store_id });
        if (!fsbData) {
            return res.status(404).json({ success: false, message: "Free Shipping Bar data not found" });
        }
        res.status(200).json({ success: true, data: fsbData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put("/update-fsb/:store_id", async (req, res) => {
    try {
        const { store_id } = req.params;
        const updatedData = await FreeShippingBarModel.findOneAndUpdate({ store_id },req.body,{ new: true });
        if (!updatedData) {
            return res.status(404).json({ success: false, message: "Free Shipping Bar data not found" });
        }
        res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;    