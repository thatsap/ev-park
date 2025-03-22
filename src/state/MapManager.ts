import { makeAutoObservable } from 'mobx';
import L from 'leaflet';
import { enqueueSnackbar } from 'notistack';
import { MapUtils } from '../utils/MapUtils';
import { LatLngLiteral } from '../types';
import { StateManager } from './StateManager';
export class MapManager {
  _debugMode = false;
  _position: LatLngLiteral | null = null;
  _debugMarkers: LatLngLiteral[] = [];
  _animatedMarker: LatLngLiteral | null = null;
  _animationActive = false;
  _animationIntervalRef: number | null = null;
  private _libState: StateManager;
  private _triggerBillingDetails = false;

  // Static green box locations (with additional nearby points)
  staticBoxLocations: LatLngLiteral[] = [
    { lat: 23.154337, lng: 72.66582 },
    { lat: 23.153922, lng: 72.666957 },
    { lat: 23.154899, lng: 72.667934 },
    { lat: 23.157493, lng: 72.666628 },
    { lat: 23.154967, lng: 72.66123 },
    { lat: 23.1552, lng: 72.664 },
    { lat: 23.1555, lng: 72.667 },
    { lat: 23.156, lng: 72.665 },
    { lat: 23.117824, lng: 72.5843968 },
    { lat: 23.1176, lng: 72.5839 },
    { lat: 23.1181, lng: 72.5843 },
    { lat: 23.1184, lng: 72.585 },
    { lat: 23.1187, lng: 72.5847 },
    { lat: 23.119, lng: 72.5853 },
    { lat: 23.1194, lng: 72.5844 },
    { lat: 23.1197, lng: 72.585 },
    { lat: 23.1201, lng: 72.5848 },
    { lat: 23.1204, lng: 72.5854 },
    { lat: 23.1208, lng: 72.5845 },
    { lat: 23.1211, lng: 72.5851 },
    { lat: 23.1214, lng: 72.5846 },
    { lat: 23.1217, lng: 72.5852 },
  ];

  constructor(libState: StateManager) {
    makeAutoObservable(this);
    this._libState = libState;
  }

  setDebugMode(mode: boolean) {
    this._debugMode = mode;
  }

  setTriggerBillingDetails() {
    this._triggerBillingDetails = !this._triggerBillingDetails;
  }

  setPosition(pos: LatLngLiteral) {
    this._position = pos;
  }

  addDebugMarker(marker: LatLngLiteral) {
    this._debugMarkers.push(marker);
  }

  // Return static green boxes based on a given half‑size.
  getStaticGreenBoxes(
    halfSize = 0.000045,
  ): Array<[LatLngLiteral, LatLngLiteral]> {
    return this.staticBoxLocations.map((center) =>
      MapUtils.getGreenBoxBoundsForCenter(center, halfSize),
    );
  }

  get triggerBillingDetails() {
    return this._triggerBillingDetails;
  }

  // Run animation for the current position marker.
  runAnimation() {
    if (this._debugMode) {
      console.log('Animation cannot run: Debug mode is active.');
      return;
    }
    if (!this._position) return;

    const staticGreenBoxes = this.getStaticGreenBoxes();
    // Check if current position is inside any static green box.
    const currentInside = staticGreenBoxes.find((box) =>
      MapUtils.isInsideBox(this._position!, box),
    );
    if (!currentInside) {
      console.log(
        'Current position is not inside any green box. Animation will not run.',
      );
      enqueueSnackbar('Current position is not inside any green box.', {
        variant: 'error',
      });
      return;
    }
    // Choose a destination green box that does NOT contain the current position.
    const candidateBoxes = staticGreenBoxes.filter(
      (box) => !MapUtils.isInsideBox(this._position!, box),
    );
    if (candidateBoxes.length === 0) {
      console.log('No candidate destination green box available.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * candidateBoxes.length);
    const destBox = candidateBoxes[randomIndex];
    const destination = MapUtils.getBoxCenter(destBox);
    console.log('Animation start:', this._position);
    console.log('Animation destination:', destination);

    // Generate a zig‑zag path.
    const steps = 100;
    const path = MapUtils.generateZigZagPath(
      this._position,
      destination,
      steps,
    );
    let totalDistance = 0;
    for (let i = 1; i < path.length; i++) {
      const distanceToAdd = L.latLng(path[i - 1]).distanceTo(L.latLng(path[i]));
      totalDistance += distanceToAdd;
      this._libState.apiManager.updateWorkerDistance(
        this._libState.rideManager.rideId as string,
        (distanceToAdd as number) / 1000,
      );
    }
    console.log('Total distance to cover (meters):', totalDistance);

    this._animationActive = true;
    let currentStep = 0;
    if (this._animationIntervalRef) {
      clearInterval(this._animationIntervalRef);
    }
    this._animationIntervalRef = window.setInterval(() => {
      currentStep++;
      if (currentStep >= path.length) {
        clearInterval(this._animationIntervalRef!);
        this._animationIntervalRef = null;
        this._animationActive = false;
        this.setPosition(destination);
        console.log(
          'Animation complete. Total distance covered (meters):',
          totalDistance,
        );
        this.setTriggerBillingDetails();
      } else {
        this._animatedMarker = path[currentStep];
      }
    }, 50);
  }
}
