const { Schema, model } =  require("mongoose");

const subSchema = new Schema(
  {
    subscription_id: String,
  }
);

const EventSubscriptions = model("eventSubcriptions", subSchema)

module.exports = EventSubscriptions;


