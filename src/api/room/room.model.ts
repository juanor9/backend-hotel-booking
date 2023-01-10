import { Schema, model, Document } from "mongoose";

export interface RoomDocument extends Document{
  roomType: String,
  image?: String,
  bedType: String,
  amenitiesShower?: Boolean,
  amenitiesTV?: Boolean,
  amenitiesCouch?: Boolean,
  amenitiesPool?: Boolean,
  pricePerNight: Number,
  offerPrice?: Number,
}

const roomSchema = new Schema({
  roomType: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  bedType: {
    type: String,
    require: true,
  },
  amenitiesShower: {
    type: Boolean,
    default: false,
  },
  amenitiesTV: {
    type: Boolean,
    default: false,
  },
  amenitiesCouch: {
    type: Boolean,
    default: false,
  },
  amenitiesPool: {
    type: Boolean,
    default: false,
  },
  pricePerNight: {
    type: Number,
    require: true,
  },
  offerPrice: {
    type: Number,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
  }
}, {timestamps: true,});

const Room = model("Room", roomSchema);

export default Room;
