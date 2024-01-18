import { Role } from './Role';

export type User = {
  _id: string;
  name: string;
  email: string;
  imageURL?: string;
  password: string;
  role: Role;
  phoneNumber: string; // Ensure phoneNumber is not optional (?)
  carts: string[];
};

