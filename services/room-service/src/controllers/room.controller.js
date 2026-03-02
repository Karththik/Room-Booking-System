const Room = require("../models/Room");
const Property = require("../models/Property");

exports.createRoom = async (req, res) => {
  const property = await Property.findById(req.params.propertyId);

  // 🔥 owner OR sub-owner
  if (
    property.owner.toString() !== req.user.id &&
    property.rentedBy?.toString() !== req.user.id
  ) {
    return res.status(403).json("Not allowed");
  }

  const room = await Room.create({
    ...req.body,
    property: req.params.propertyId
  });

  res.json(room);
};

exports.getRoomsByProperty = async (req, res) => {
  const rooms = await Room.find({ property: req.params.propertyId });
  res.json(rooms);
};