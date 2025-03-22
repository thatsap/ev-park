import { EvInfo, EvType } from "../types";

export class EvCase {
  // total distance travlled, hazard , tire pressure , cost to km , features and mainenance needed , chargin status , range,type of vehicle,maxRange
  private _id: string;
  private _name: string;
  private _totalDistanceTravelled: number;
  private _hazard: string;
  private _tirePressure: number;
  private _costToKm: number;
  private _features: string;
  private _mainenanceNeeded: string;
  private _chargingStatus: boolean;
  private _range: number;
  private _typeOfVehicle: EvType;
  private _maxRange: number;
  private _image: string;
  private _chargingPercentage: number;
  constructor(evInfo: EvInfo) {
    this._id = evInfo.id;
    this._name = evInfo.name;
    this._totalDistanceTravelled = evInfo.totalDistanceTravelled;
    this._hazard = evInfo.hazard;
    this._tirePressure = evInfo.tirePressure;
    this._costToKm = evInfo.costToKm;
    this._features = evInfo.features;
    this._mainenanceNeeded = evInfo.maintenanceNeeded;
    this._chargingStatus = evInfo.chargingStatus;
    this._range = (evInfo.maxRange * evInfo.chargingPercentage) / 100;
    this._typeOfVehicle = evInfo.typeOfVehicle;
    this._maxRange = evInfo.maxRange;
    this._image = evInfo.image;
    this._costToKm = evInfo.costToKm;
    this._chargingPercentage = evInfo.chargingPercentage;
  }

  get evInfo(): EvInfo {
    return {
      id: this._id,
      name: this._name,
      totalDistanceTravelled: this._totalDistanceTravelled,
      hazard: this._hazard,
      tirePressure: this._tirePressure,
      costToKm: this._costToKm,
      features: this._features,
      maintenanceNeeded: this._mainenanceNeeded,
      chargingStatus: this._maxRange != this._range,
      range: this._range,
      typeOfVehicle: this._typeOfVehicle,
      maxRange: this._maxRange,
      image: this._image,
      chargingPercentage: this._chargingPercentage,
    };
  }

  reduceRange(distance: number) {
    this._range -= distance;
  }

  increaseCharging() {
    //increase 5 km in range
    if (this._range + 5 > this._maxRange) {
      this._range = this._maxRange;
    } else {
      this._range += 5;
    }
  }
}
