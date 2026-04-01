const Property = require("../models/Property");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Bed = require("../models/Bed");

// CREATE
exports.createProperty = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => "uploads/" + file.filename);

    const property = await Property.create({
      ...req.body,
      owner: req.user.id,
      images: imagePaths,
    });

    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, gender } = req.query;

    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (gender) {
      filter.genderAllowed = gender;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter).populate("rooms");

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate({
      path: "rooms",
      populate: {
        path: "beds"
      }
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.ownerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;
    
    // Total properties owned
    const properties = await Property.find({ owner: ownerId });
    const propertyIds = properties.map(p => p._id);

    // Total rooms in those properties
    const rooms = await Room.find({ property: { $in: propertyIds } });
    const roomIds = rooms.map(r => r._id);

    // Total beds in those rooms
    const bedsCount = await Bed.countDocuments({ room: { $in: roomIds } });

    // Pending and confirmed bookings for these properties
    const pendingBookings = await Booking.countDocuments({ property: { $in: propertyIds }, status: "PENDING" });
    const confirmedBookings = await Booking.countDocuments({ property: { $in: propertyIds }, status: "CONFIRMED" });

    res.json({
      totalProperties: properties.length,
      totalRooms: rooms.length,
      totalBeds: bedsCount,
      pendingBookings,
      confirmedBookings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
