const Bed = require("../models/Bed");
const Room = require("../models/Room");


// CREATE BED
exports.createBed = async (req, res) => {
  try {

    const imagePaths = req.files.map(
      file => "uploads/" + file.filename
    );

    const bed = await Bed.create({
      ...req.body,
      room: req.params.roomId,
      images: imagePaths
    });

    // push bed into room
    await Room.findByIdAndUpdate(
      req.params.roomId,
      { $push: { beds: bed._id } }
    );

    res.status(201).json(bed);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ALL BEDS
exports.getBeds = async (req, res) => {
  try {

    const beds = await Bed.find().populate("room");

    res.json(beds);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET BED BY ID
exports.getBedById = async (req, res) => {
  try {

    const bed = await Bed.findById(req.params.id)
      .populate("room");

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    res.json(bed);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE BED
exports.updateBed = async (req, res) => {
  try {

    const bed = await Bed.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(bed);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE BED
exports.deleteBed = async (req, res) => {
  try {

    await Bed.findByIdAndDelete(req.params.id);

    res.json({ message: "Bed deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchBeds = async (req, res) => {
  try {

    const { minPrice, maxPrice } = req.query;

    const filter = {};

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const beds = await Bed.find(filter)
      .populate({
        path: "room",
        populate: {
          path: "property"
        }
      });

    res.json(beds);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableBeds = async (req, res) => {
  try {

    const beds = await Bed.find({
      isAvailable: true
    })
      .populate({
        path: "room",
        populate: {
          path: "property"
        }
      });

    res.json(beds);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};