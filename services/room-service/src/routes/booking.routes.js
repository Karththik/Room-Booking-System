const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const ctrl = require("../controllers/booking.controller");

// USER BOOKING
router.post("/create", auth, role("student", "tourist"), ctrl.createBooking);

// USER BOOKINGS
router.get("/my", auth, ctrl.myBookings);

// OWNER PENDING BOOKINGS
router.get("/owner/pending",auth,role("owner", "admin"),ctrl.ownerPendingBookings,);

// OWNER CONFIRM
router.put("/confirm/:id", auth, role("owner", "admin"), ctrl.confirmBooking);

// OWNER REJECT
router.put("/reject/:id", auth, role("owner", "admin"), ctrl.rejectBooking);

// CANCEL BOOKING
router.put("/cancel/:id", auth, ctrl.cancelBooking);

module.exports = router;
