const Drivers = require("../models/drivers");
const socketManager = require('../helpers/socketEmits');

const getAllDrivers = async (req, res) => {
  const allMembers = await Drivers.find({});
  res.send(allMembers);
};

const createDriver = async (req, res) => {
  try {
    const newUser = new Drivers(req.body);
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
const updateDriver = async (req, res, io) => { // Pass 'io' as a parameter
  const { id } = req.params;
  const { available, location, passengers } = req.body;
  try {
    const updatedDriver = await Drivers.findByIdAndUpdate(
      id,
      { available, location, passengers },
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    
    socketManager.emitEvent('driverUpdated');
    res.status(200).json(updatedDriver);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating driver", error: error.message });
  }
};

const verifyDriver = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const driver = await Drivers.findOne({ phoneNumber });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    if (driver.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ id: driver._id, name: driver.fullName });
  } catch (error) {
    res.status(500).json({ message: "Error verifying driver", error: error.message });
  }
};


const deleteDriver = async (req, res) => {
  const deletedDriver = await Drivers.deleteOne({ _id: req.params.id });
  res.send(deletedDriver);
};

module.exports = {
  createDriver,
  verifyDriver,
  updateDriver,
  getAllDrivers,
  deleteDriver,
};
