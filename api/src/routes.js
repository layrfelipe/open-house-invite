import express from "express";
import mongoose from "mongoose";

const giftSchema = new mongoose.Schema({
    description: {
        required: true,
        type: String
    },
    friend: {
        required: false,
        type: String
    }
})

const Gift = mongoose.model('Gift', giftSchema);

const router = express.Router();

router.get('/gifts', async (req, res) => {
    try {
        const allGifts = await Gift.find();
        res.status(200).json(allGifts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/gifts", async (req, res) => {
    const gifts = req.body;
  
    try {
      const insertedGifts = await Gift.insertMany(gifts);
      res.status(201).json(insertedGifts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.patch('/gifts/:id', async (req, res) => {
    const { friend } = req.body;

    try {
        const updatedGift = await Gift.findByIdAndUpdate(req.params.id, { friend: friend }, { new: true });
        if (!updatedGift) {
            return res.status(404).json({ message: 'Gift not found' });
        }
        res.status(200).json(updatedGift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/gifts/:id', async (req, res) => {
    try {
        const deletedGift = await Gift.findByIdAndDelete(req.params.id);
        if (!deletedGift) {
            return res.status(404).json({ message: 'Gift not found' });
        }
        res.status(200).json({ message: 'Gift deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;