const { validateContact, Contact } = require("../models/Contact");
const auth = require("../middleware/auth");

const mongoose = require("mongoose");
const router = require("express").Router();

// create contact.
router.post("/contact", auth, async (req, res) => {
  const { error } = validateContact(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { firstname, lastname, jobtitle, email,phone, company } = req.body;

  try {
    const newContact = new Contact({
      firstname,
      lastname,
      jobtitle,
      email,
      phone,
      company,
      postedBy: req.user._id,
    });
    const result = await newContact.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
