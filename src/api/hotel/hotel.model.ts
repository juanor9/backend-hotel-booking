import { Schema, model, Document } from "mongoose";

export interface HotelDocument extends Document{
  name: String,
  images: Array<String>,
  location: Object,
  contact: Object,
  about: String,
  pricePerNight: Number,
  features: Array<String>,
  checkin: String,
  checkout: String,
  offers: Array<Object>,
  rooms: Array<Object>,
  createdAt: Date;
  updatedAt: Date;
}

const hotelLocationSchema = new Schema({
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  latitude: {
    type: String,
    require: true,
  },
  longitude: {
    type: String,
    require: true,
  },
});

const hotelContactSchema = new Schema({
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  socialMedia: {
    type: Array,
  },
});

const offerSchema = new Schema({
  active: {
    type: Boolean,
    require: true,
  },
  offerPrice: {
    type: Number,
    require: true,
  },
});

const roomAmenitiesSchema = new Schema({
  bedKind: {
    type: String,
    require: true,
  },
  tv: {
    type: String,
  },
  couch: {
    type: Boolean,
  },
  poolView: {
    type: Boolean,
  },
  shower: {
    type: Boolean,
  },
});

const roomSchema = new Schema({
  _roomId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  guestNumber: {
    type: Number,
    require: true,
    min: 1,
  },
  name: {
    type: String,
    require: true,
  },
  about: {
    type: String,
  },
  roomImages: {
    type: Array,
    require: true,
  },
  features: {
    type: Array,
  },
  price: {
    type: Number,
    require: true,
  },
  amenities: {
    type: roomAmenitiesSchema,
    require: true,
  },
  offers: [
    {
      type: offerSchema,
    },
  ],
});

const hotelSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  images: {
    type: Array,
    require: true,
  },
  location: {
    type: hotelLocationSchema,
    require: true,
  },
  contact: {
    type: hotelContactSchema,
  },
  about: {
    type: String,
    require: true,
  },
  pricePerNight: {
    type: Number,
    require: true,
  },
  features: {
    type: Array,
  },
  checkin: {
    type: String,
    require: true,
  },
  checkout: {
    type: String,
    require: true,
  },
  offers: [
    {
      type: offerSchema,
    },
  ],
  rooms: [{
    type: roomSchema,
    require: true,
  }]
}, {timestamps: true,});

const Hotel = model("Hotel", hotelSchema);

export default Hotel;
