const mongoose = require("mongoose");
const Joi = require("joi");

// schema for contact 
const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required."],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required."],
  },
  jobtitle: {
    type: String,
    required: [true, "jobtitle is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  phone: {
    type: Number,
    required: [true, "phone number is required."],
  },
  company: {
    type: String,
    required: [true, "company is required."],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contact = new mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).max(50).required(),
    lastname: Joi.string().min(4).max(50).required(),
    jobtitle: Joi.string().min(4).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(7).max(10000000000).required(),
    company: Joi.string().min(4).max(50).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateContact,
  Contact,
};
