// controllers/userController.js

const User = require('../models/User');
const Tenant = require('../models/Tenant');

exports.getUsers = async (req, res) => {
  const { tenantId } = req;

 
  try {
    const tenant = await Tenant.findOne({ name: tenantId });
    if (!tenant) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }


    const users = await User.find({ tenant: tenant._id });    
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {

    const userId = req.params.userId;
    const tenantId = req.tenantId;

     try {

      const tenant = await Tenant.findOne({ name: tenantId });
      const user = await User.findOne({ _id: userId, tenant: tenant._id });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal Server Error' });
     }
  };

  

exports.createUser = async (req, res) => {
  
  const tenantId = req.tenantId;
  const { email, mobile } = req.body;

  try {
    const tenant = await Tenant.findOne({ name: tenantId });
    if (!tenant) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }

    const user = new User({ tenant: tenant._id, email, mobile });
    await user.save();
    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.userId;
  const tenantId = req.tenantId;
  const { mobile, email } = req.body;

  try {
    const tenant = await Tenant.findOne({ name: tenantId });
    if (!tenant) {
      res.status(404).json({ error: 'Tenant not found' });
      return;
    }
    const user = await User.findOneAndUpdate({ _id: userId, tenant: tenant._id }, { mobile, email }, { new: true });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  const tenantId = req.tenantId;

  const tenant = await Tenant.findOne({ name: tenantId });
  if (!tenant) {
    res.status(404).json({ error: 'Tenant not found' });
    return;
  }
  try {
    const user = await User.findOneAndDelete({ _id: userId, tenant: tenant._id });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};