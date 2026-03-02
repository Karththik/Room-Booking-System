const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user.id
    });

    res.json(property);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllProperties = async (req, res) => {
  const filter = {};

  if (req.query.gender) filter.genderAllowed = req.query.gender;
  if (req.query.type) filter.propertyType = req.query.type;

  const properties = await Property.find(filter);
  res.json(properties);
};

exports.getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.json(property);
};