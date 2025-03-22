import { StateManager } from './StateManager';

export class RideManager {
  private _libState: StateManager;
  private _rideId: string | null = null;
  private _rideDistanceByUser = 0;
  constructor(libState: StateManager) {
    this._libState = libState;
  }

  setRideId(rideId: string | null) {
    this._rideId = rideId;
  }

  setRideDistanceByUser(rideDistanceByUser: number) {
    this._rideDistanceByUser = rideDistanceByUser;
  }

  get rideId() {
    return this._rideId;
  }

  get rideDistanceByUser() {
    return this._rideDistanceByUser;
  }
}
