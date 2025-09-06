const { Schema, model } = require("mongoose");

//Defining the structure of a user in MongoDB

let userSchema = new Schema(
  {
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    Age: {type: Number, required: true, min: 0, max: 120},
    DOB: {type: Date,required: true},
    Gender: { type: String, enum: ["Male", "Female"], required: true },
    Phone: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Address: { type: String },
    City: { type: String },
    State: { type: String },
    Zipcode: { type: String },
    Country: { type: String },
    Department: { type: String },
    Title: { type: String },
    CompanyName: { type: String },
  },
  {
    timestamps: true, //* automatically adds createdAt & updateAt
  }
);

module.exports = model("User", userSchema);
