const Booking = require("../models/Booking");
const Property = require("../models/Property");
const Room = require("../models/Room");
const Bed = require("../models/Bed");


/*
================================
1️⃣ CREATE BOOKING (USER)
Status → PENDING
================================
*/
exports.createBooking = async (req, res) => {

  try {

    const { property, room, bed } = req.body;

    const booking = await Booking.create({
      user: req.user.id,
      property,
      room,
      bed,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      totalPrice: req.body.totalPrice,
      status: "PENDING"
    });

    res.status(201).json({
      message: "Booking request sent. Waiting for owner approval",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



/*
================================
2️⃣ USER BOOKINGS
================================
*/
exports.myBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      user: req.user.id
    })
      .populate("property")
      .populate("room")
      .populate("bed");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



/*
================================
3️⃣ OWNER VIEW PENDING BOOKINGS
================================
*/
exports.ownerPendingBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      status: "PENDING"
    })
      .populate("user")
      .populate("property")
      .populate("room")
      .populate("bed");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



/*
================================
4️⃣ CONFIRM BOOKING (OWNER)
================================
*/
exports.confirmBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    if (booking.status !== "PENDING") {
      return res.status(400).json({
        message: "Booking already processed"
      });
    }

    booking.status = "CONFIRMED";
    await booking.save();


    // update availability
    if (booking.room) {

      await Room.findByIdAndUpdate(
        booking.room,
        { isAvailable: false }
      );

    }

    if (booking.bed) {

      await Bed.findByIdAndUpdate(
        booking.bed,
        { isAvailable: false }
      );

    }

    if (!booking.room && !booking.bed) {

      await Property.findByIdAndUpdate(
        booking.property,
        { isAvailable: false }
      );

    }

    res.json({
      message: "Booking confirmed",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



/*
================================
5️⃣ REJECT BOOKING (OWNER)
================================
*/
exports.rejectBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.status = "REJECTED";

    await booking.save();

    res.json({
      message: "Booking rejected",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};



/*
================================
6️⃣ CANCEL BOOKING (USER)
Availability restored
================================
*/
exports.cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.status = "CANCELLED";
    await booking.save();


    if (booking.room) {

      await Room.findByIdAndUpdate(
        booking.room,
        { isAvailable: true }
      );

    }

    if (booking.bed) {

      await Bed.findByIdAndUpdate(
        booking.bed,
        { isAvailable: true }
      );

    }

    if (!booking.room && !booking.bed) {

      await Property.findByIdAndUpdate(
        booking.property,
        { isAvailable: true }
      );

    }

    res.json({
      message: "Booking cancelled",
      booking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};