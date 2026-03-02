const Booking = require("../models/Booking");
const Property = require("../models/Property");
const Room = require("../models/Room");
const Bed = require("../models/Bed");

exports.createBooking = async (req, res) => {
  try {
    const { property, room, bed } = req.body;

    const prop = await Property.findById(property);

    // 🔴 FULL PROPERTY BOOKING
    if (!room && !bed) {
      if (!prop.isAvailable) {
        return res.status(400).json("Property already rented");
      }

      prop.isAvailable = false;
      prop.rentedBy = req.user.id;
      await prop.save();
    }

    // 🔴 ROOM BOOKING
    if (room) {
      if (!prop.isAvailable) {
        // only sub-owner allowed
        if (prop.rentedBy.toString() === req.user.id) {
          return res.status(400).json("Owner cannot book own room");
        }
      }

      const r = await Room.findById(room);
      if (!r.isAvailable) {
        return res.status(400).json("Room not available");
      }

      r.isAvailable = false;
      await r.save();
    }

    // 🔴 BED BOOKING
    if (bed) {
      const b = await Bed.findById(bed);
      if (!b.isAvailable) {
        return res.status(400).json("Bed not available");
      }

      b.isAvailable = false;
      await b.save();
    }

    const booking = await Booking.create({
      ...req.body,
      user: req.user.id
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("property room bed");

  res.json(bookings);
};