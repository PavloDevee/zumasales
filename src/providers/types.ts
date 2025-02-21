import { ReactNode } from 'react';

export interface IState {
  userState: Partial<User>;
  setUserState: React.Dispatch<React.SetStateAction<any>>;
  cookies: { idToken?: string };
  setCookie: (name: "idToken", value: string | undefined, options?: object) => void;
  removeCookie: (name: "idToken", options?: object) => void;
  data: Inspection[];
  setData: (data: Inspection[]) => void;
  userRole: Role;
}

export interface IProps {
  children: ReactNode;
}

export enum Role {
  Admin = "admin",
  User = "user",
  Moderator = "moderator"
}

export enum inspectionStatus {
  pending = 'pending',
  progress = 'progress',
  completed = 'completed',
  canceled = 'canceled',
  review = 'review'
}

export interface Machine {
  make?: string;
  model?: string;
  serialnumber?: string;
  yearmake?: string;
  condition?: string;
  machinetype?: string;
  custom?: string;
  batteries?: string;
  tires?: string;
  pictures?: Array<Pictures>
}

export interface User {
  displayName: string;
  email: string;
  uid?: string;
  inspections?: Record<string, Inspection>;
  role?: Role;
}

export interface Inspection {
  batteries: string;
  condition: string;
  createdAt: number;
  custom: string;
  machinetype: string;
  make: string;
  model: string;
  note: string;
  serialnumber: string;
  status: string;
  tires: string;
  vendorEmail: string;
  yearmake: string;
  id: string;
  email: string;
  uid: string;
  pictures?: Array<Pictures>;
}

export interface Pictures {
  img: File;
  desc: string;
  urlImg: string;
}
