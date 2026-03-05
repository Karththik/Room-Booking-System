const Booking = require("../models/Booking");
const Property = require("../models/Property");
const Room = require("../models/Room");
const Bed = require("../models/Bed");

exports.createBooking = async (req, res) => {
  try {

    const { property, room, bed } = req.body;

    const prop = await Property.findById(property);

    if (!prop) {
      return res.status(404).json({ message: "Property not found" });
    }

    // 🔴 FULL PROPERTY BOOKING
    if (!room && !bed) {

      if (!prop.isAvailable) {
        return res.status(400).json({ message: "Property already rented" });
      }

      prop.isAvailable = false;
      prop.rentedBy = req.user.id;

      await prop.save();
    }

    // 🔵 ROOM BOOKING
    if (room) {

      const roomData = await Room.findById(room);

      if (!roomData.isAvailable) {
        return res.status(400).json({ message: "Room already booked" });
      }

      roomData.isAvailable = false;

      await roomData.save();
    }

    // 🟢 BED BOOKING
    if (bed) {

      const bedData = await Bed.findById(bed);

      if (!bedData.isAvailable) {
        return res.status(400).json({ message: "Bed already booked" });
      }

      bedData.isAvailable = false;

      await bedData.save();

      // 🔥 Check if all beds in room booked
      const remainingBeds = await Bed.countDocuments({
        room: bedData.room,
        isAvailable: true
      });

      if (remainingBeds === 0) {
        await Room.findByIdAndUpdate(
          bedData.room,
          { isAvailable: false }
        );
      }
    }

    const booking = await Booking.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.myBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.user.id
    })
    .populate("property room bed");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};