import { makeAutoObservable } from 'mobx';

import { ViewManager } from './ViewManager';
import { AuthManager } from './AuthManager';
import { MapManager } from './MapManager';
import { ApiManager } from './ApiManager';
import { RideManager } from './RideManager';

export class StateManager {
  constructor() {
    makeAutoObservable(this);
  }

  private _viewManager = new ViewManager(this);

  get viewManager() {
    return this._viewManager;
  }

  private _authManager = new AuthManager();

  get authManager() {
    return this._authManager;
  }

  private _mapManager = new MapManager(this);

  get mapManager() {
    return this._mapManager;
  }

  private _apiManager = new ApiManager(this);

  get apiManager() {
    return this._apiManager;
  }

  private _rideManager = new RideManager(this);

  get rideManager() {
    return this._rideManager;
  }
}
