const mongoose = require("mongoose");

// schema
const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    isSuperAdmin: { type: Boolean },
    isAdmin: { type: Boolean },
    alias: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

// indices
// text index for name
schema.index({ name: "text" });

// index for createdAt and updatedAt
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

// index for isSuperAdmin and isAdmin
schema.index({ isSuperAdmin: 1 });
schema.index({ isAdmin: 1 });

// reference model
// const Role = mongoose.model("Role", schema);

module.exports = mongoose.model("Role", schema);
