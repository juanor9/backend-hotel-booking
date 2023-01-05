export type userProfileType = {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  profilePic: string;
  phone: number;
  birthday: Date;
  gender: string;
  address: string;
  city: string;
  zipCode: number;
  payingMethods: [Object];
};
