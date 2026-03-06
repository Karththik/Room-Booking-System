const Room = require("../models/Room");
const Property = require("../models/Property");

// CREATE ROOM
exports.createRoom = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => "uploads/" + file.filename);

    const room = await Room.create({
      ...req.body,
      property: req.params.propertyId,
      images: imagePaths,
    });

    // push room into property
    await Property.findByIdAndUpdate(req.params.propertyId, {
      $push: { rooms: room._id },
    });

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL ROOMS
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("property");

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ROOM BY ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate("property")
      .populate("beds");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE ROOM
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE ROOM
exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);

    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      isAvailable: true,
    }).populate("property");

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchRooms = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, capacity } = req.query;

    const roomFilter = {};
    const propertyFilter = {};

    if (minPrice || maxPrice) {
      roomFilter.price = {};
      if (minPrice) roomFilter.price.$gte = Number(minPrice);
      if (maxPrice) roomFilter.price.$lte = Number(maxPrice);
    }

    if (capacity) {
      roomFilter.capacity = { $gte: Number(capacity) };
    }

    if (location) {
      propertyFilter.location = { $regex: location, $options: "i" };
    }

    const rooms = await Room.find(roomFilter).populate({
      path: "property",
      match: propertyFilter,
    });

    const filteredRooms = rooms.filter((r) => r.property !== null);

    res.json(filteredRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
