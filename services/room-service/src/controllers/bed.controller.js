const Bed = require("../models/Bed");
const Room = require("../models/Room");
const Property = require("../models/Property");

exports.createBed = async (req, res) => {
  const room = await Room.findById(req.params.roomId);
  const property = await Property.findById(room.property);

  if (
    property.owner.toString() !== req.user.id &&
    property.rentedBy?.toString() !== req.user.id
  ) {
    return res.status(403).json("Not allowed");
  }

  const bed = await Bed.create({
    ...req.body,
    room: req.params.roomId
  });

  res.json(bed);
};

exports.getBedsByRoom = async (req, res) => {
  const beds = await Bed.find({ room: req.params.roomId });
  res.json(beds);
};