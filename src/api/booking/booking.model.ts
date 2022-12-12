import { Schema, model, Document } from 'mongoose';

export interface BookingDocument extends Document {
  checkInDate: Date,
  checkOutDate: Date,
  guestsNumber: Number,
  paymentDetail: Object,
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
    ref: 'hotels',
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'users',
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
  paymentDetail: {
    type: paymentDetail,
    required: true,
  },
},{
  timestamps: true,
  versionKey: false,
});

const Booking = model<BookingDocument>('Booking', BookingSchema);

export default Booking;
