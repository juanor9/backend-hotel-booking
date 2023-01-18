import { Schema, model, Document } from 'mongoose';

export interface BookingDocument extends Document {
  checkInDate: Date,
  checkOutDate: Date,
  guestsNumber: Number,
  city?: String,
  pricePerNight?: Number,
  offerPrice?: Number,
  paymentDetail?: Object,
}

const paymentDetail = new Schema({
  price: {
    type: Number,
  },
  paymentMethod: {
    type: Object,
  }
})

const BookingSchema = new Schema({
  idHotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  guestsNumber: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
  },
  offerPrice: {
    type: String,
  },
  pricePerNight: {
    type: String,
  },
  paymentDetail: {
    type: paymentDetail,
  },
},{
  timestamps: true,
  versionKey: false,
});

const Booking = model<BookingDocument>('Booking', BookingSchema);

export default Booking;
