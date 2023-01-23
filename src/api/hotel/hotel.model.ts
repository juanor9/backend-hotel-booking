import { Schema, model, Document } from "mongoose";


export interface HotelDocument extends Document{
  name: String,
  imageProfile?: String,
  images?: Array<String>,
  country: String,
  city: String,
  address: String,
  geoLocation?: Array<Number>,
  phone: String,
  email: String,
  socialMedia?: Array<String>,
  about: String,
  pricePerNight: Number,
  offerPrice?: Number,
  feature1: String,
  feature2: String,
  checkin: String,
  checkout: String,
  rooms?: Array<Object>,
  createdAt?: Date;
  updatedAt?: Date;
}

const hotelSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  imageProfile: {
    type: String,
  },
  images: {
    type: Array,
  },
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
  geoLocation: {
    type:{
      type: String,
      default: 'Point'
    },
    coordinates:{
      type: [Number],
    }
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  socialMedia: {
    type: Array,
  },
  about: {
    type: String,
    require: true,
  },
  pricePerNight: {
    type: Number,
    require: true,
  },
  offerPrice: {
    type: Number,
  },
  feature1: {
    type: String,
    require: true,
  },
  feature2: {
    type: String,
    require: true,
  },
  checkin: {
    type: String,
    require: true,
  },
  checkout: {
    type: String,
    require: true,
  },
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room',
  }]
}, {timestamps: true,});

const Hotel = model("Hotel", hotelSchema);

export default Hotel;
