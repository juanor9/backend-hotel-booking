import {DocumentDefinition, FilterQuery} from "mongoose";
import User, {UserDocument} from './user.model';

export function getUsers() {
  return User.find({});
}

export function getUserById(id: string) {
  return User.findById(id).populate("booking");
}

export function createUser(user: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>) {
  return User.create(user);
}

export function updateUser(id: string, user: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>) {
  return User.findByIdAndUpdate(id, user, {new: true});
}

export function deleteUser(id: string) {
  return User.findByIdAndDelete(id);
}

export function getUserFilter(filter: FilterQuery<UserDocument>) {
  const user = User.findOne(filter);
  return user;
}
