const Staff = require("../models/users");

const getAllStaff = async (req, res) => {
  const allMembers = await Staff.find({});
  res.send(allMembers);
};

const createStaff = async (req, res) => {
  try {
    const newUser = new Staff(req.body);
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      // Send a custom error response to the client
      res.status(400).send("This user is already registred!");
    } else {
      res.status(500).send("Error: " + err.message);
    }
  }
};
const createOrUpdateStaff = async (req, res) => {
  const { tg_id, ...rest } = req.body;
  
  try {
    let user = await Staff.findOne({ tg_id });
    let isExists = true;
    if (user) {
      // Update existing user

      user = await Staff.findOneAndUpdate(
        { tg_id },
        rest,
        { new: true } // Return the updated document
      );
      isExists = true;
    } else {
      // Create new user
      user = new Staff({ tg_id, ...rest });
      user = await user.save();
      isExists = false;
    }
    res.send({user:user, isExists:isExists });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err.message);
  }
};
const updateStaff = async (req, res) => {
  try {
    const updatedUser = await Staff.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.send( );
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

const deleteStaff = async (req, res) => {
  const deletedUser = await Staff.deleteOne({ _id: req.params.id });
  res.send(deletedUser);
};

module.exports = {
  deleteStaff,
  createOrUpdateStaff,
  updateStaff,
  createStaff,
  getAllStaff,
};
