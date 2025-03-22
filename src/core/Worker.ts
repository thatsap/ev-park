import { EvCase } from "../cases/EvCases";
import { BillingDetails } from "../types";

export class Worker {
  private _id: string;
  private _chargingStatus: boolean;
  private _chargingTime: number;
  private _attachedEv: EvCase;
  private _timeRideStarted: number;
  private _distanceTravelled: number = 0;
  private _idleTime: number = 0;

  constructor(id: string, ev: EvCase, timeRideStarted: number) {
    this._id = id;
    this._attachedEv = ev;
    this._chargingStatus = ev.evInfo.chargingStatus;
    this._chargingTime = 0;
    this._timeRideStarted = timeRideStarted;
  }

  addDistanceTravelled(distance: number) {
    this._distanceTravelled += distance;

    if (this._attachedEv) {
      this._attachedEv.reduceRange(distance);
    }
  }

  addIdleTime(idleTime: number) {
    this._idleTime += idleTime;
  }

  get idleTime() {
    return this._idleTime;
  }

  get distanceTravelled() {
    return this._distanceTravelled;
  }

  get id() {
    return this._id;
  }

  get billingDetails(): BillingDetails {
    return {
      basicFare: this._distanceTravelled * this._attachedEv.evInfo.costToKm,
      surgeCharge: 0,
      penaltyCharge: (this.idleTime / 60) * 3,
      subTotal: this._distanceTravelled * this._attachedEv.evInfo.costToKm,
      gst: this._distanceTravelled * this._attachedEv.evInfo.costToKm * 0.18,
      finalFare:
        this._distanceTravelled * this._attachedEv.evInfo.costToKm +
        this._distanceTravelled * this._attachedEv.evInfo.costToKm * 0.18,
    };
  }

  get workerDetails() {
    return {
      id: this._id,
      timeRideStarted: this._timeRideStarted,
      distanceTravelled: this._distanceTravelled,
      idleTime: this._idleTime,
      ev: this._attachedEv.evInfo,
    };
  }
}
