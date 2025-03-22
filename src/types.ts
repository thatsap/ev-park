export const enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
  Developer = 'developer',
}

export type LatLngLiteral = { lat: number; lng: number };

export type EvInfo = {
  id: string;
  name: string;
  totalDistanceTravelled: number;
  hazard: string;
  tirePressure: number;
  costToKm: number;
  features: string;
  maintenanceNeeded: string;
  chargingStatus: boolean;
  range: number;
  typeOfVehicle: EvType;
  maxRange: number;
  image: string;
};
export enum EvType {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export type BillingDetails = {
  basicFare: number;
  surgeCharge: number;
  penaltyCharge: number;
  subTotal: number;
  gst: number;
  finalFare: number;
};
