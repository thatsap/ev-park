import { makeAutoObservable } from 'mobx';
import { StateManager } from './StateManager';
import { EvInfo } from '../types';

export class ApiManager {
  private _libState: StateManager;
  private _apiBaseUrl = 'http://localhost:3000';
  constructor(libState: StateManager) {
    this._libState = libState;
    makeAutoObservable(this);
  }

  fetchEvs = async () => {
    return await fetch(`${this._apiBaseUrl}/api/evs`).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load vehicle data');
      }
      return response.json();
    });
  };
  // API to add a new worker
  // Endpoint: POST /api/add-worker
  // Request Body: { id: string, ev: EvCase, timeRideStarted: number }
  // Description: Adds a new worker to the system with the provided id, EV case, and time the ride started.

  addWorker = async (id: string, evId: string, timeRideStarted: number) => {
    this._libState.rideManager.setRideId(id);
    return await fetch(`${this._apiBaseUrl}/api/add-worker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, evId, timeRideStarted }),
    });
  };

  // API to remove an existing worker
  // Endpoint: POST /api/remove-worker
  // Request Body: { id: string }
  // Description: Removes the worker with the specified id from the system.

  removeWorker = async (id: string) => {
    return await fetch(`${this._apiBaseUrl}/api/remove-worker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  };

  // API to update the distance travelled by a worker
  // Endpoint: POST /api/update-worker-distance
  // Request Body: { id: string, distance: number }
  // Description: Updates the distance travelled by the worker with the specified id.

  updateWorkerDistance = async (id: string, distance: number) => {
    return await fetch(`${this._apiBaseUrl}/api/update-worker-distance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, distance }),
    });
  };

  // API to update the idle time of a worker
  // Endpoint: POST /api/update-worker-idle-time
  // Request Body: { id: string, idleTime: number }
  // Description: Updates the idle time for the worker with the specified id.

  updateWorkerIdleTime = async (id: string, idleTime: number) => {
    return await fetch(`${this._apiBaseUrl}/api/update-worker-idle-time`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, idleTime }),
    });
  };

  // API to retrieve billing details for a worker
  // Endpoint: POST /api/get-billing-details
  // Request Body: { id: string }
  // Description: Retrieves and returns the billing details for the worker with the specified id.

  getBillingDetails = async (id: string) => {
    const response = await fetch(
      `${this._apiBaseUrl}/api/get-billing-details`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      },
    );
    return response.json();
  };

  // API to get details of a worker
  // Endpoint: POST /api/get-worker-details
  // Request Body: { id: string }
  // Description: Retrieves and returns the details of the worker with the specified id.

  getWorkerDetails = async (id: string) => {
    return await fetch(`${this._apiBaseUrl}/api/get-worker-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  };
}
