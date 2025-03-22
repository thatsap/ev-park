import { makeAutoObservable } from 'mobx';

import { StateManager } from './StateManager';

export class ViewManager {
  _libState: StateManager;
  _viewVehicles = false;
  _viewFareDetails = false;
  _distance = false;
  _triggerAnimation = false;
  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }
  get libState() {
    return this._libState;
  }

  get viewVehicles() {
    return this._viewVehicles;
  }
  get viewFareDetails() {
    return this._viewFareDetails;
  }

  get distance() {
    return this._distance;
  }

  get triggerAnimation() {
    return this._triggerAnimation;
  }

  setDistance(distance: boolean) {
    this._distance = distance;
  }

  setViewFareDetails(viewFareDetails: boolean) {
    this._viewFareDetails = viewFareDetails;
  }

  setViewVehicles(viewVehicles: boolean) {
    this._viewVehicles = viewVehicles;
  }

  setTriggerAnimation() {
    this._triggerAnimation = !this._triggerAnimation;
  }
}
