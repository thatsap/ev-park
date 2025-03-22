import { LatLngLiteral } from '../types';

export class MapUtils {
  static isInsideBox(
    point: LatLngLiteral,
    bounds: [LatLngLiteral, LatLngLiteral],
  ): boolean {
    const { lat, lng } = point;
    const minLat = Math.min(bounds[0].lat, bounds[1].lat);
    const maxLat = Math.max(bounds[0].lat, bounds[1].lat);
    const minLng = Math.min(bounds[0].lng, bounds[1].lng);
    const maxLng = Math.max(bounds[0].lng, bounds[1].lng);
    return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
  }

  // Create a small green box bounds based on a given center and half‑size.
  static getGreenBoxBoundsForCenter(
    center: LatLngLiteral,
    halfSize: number,
  ): [LatLngLiteral, LatLngLiteral] {
    return [
      { lat: center.lat - halfSize, lng: center.lng - halfSize },
      { lat: center.lat + halfSize, lng: center.lng + halfSize },
    ];
  }

  // Utility to compute the center of a box.
  static getBoxCenter(bounds: [LatLngLiteral, LatLngLiteral]): LatLngLiteral {
    return {
      lat: (bounds[0].lat + bounds[1].lat) / 2,
      lng: (bounds[0].lng + bounds[1].lng) / 2,
    };
  }

  // Generate a zig‑zag path (with sine‑wave offset) between start and destination.
  static generateZigZagPath(
    start: LatLngLiteral,
    destination: LatLngLiteral,
    steps: number,
  ): LatLngLiteral[] {
    const path: LatLngLiteral[] = [];
    const dx = destination.lat - start.lat;
    const dy = destination.lng - start.lng;
    const baseLatStep = dx / steps;
    const baseLngStep = dy / steps;
    // Perpendicular vector for offset.
    const perpLat = -baseLngStep;
    const perpLng = baseLatStep;
    // Set amplitude (adjust as needed).
    const stepDistance = Math.sqrt(baseLatStep ** 2 + baseLngStep ** 2);
    const amplitude = stepDistance * 0.5;
    for (let i = 0; i <= steps; i++) {
      let lat = start.lat + baseLatStep * i;
      let lng = start.lng + baseLngStep * i;
      const offsetFactor = Math.sin((i / steps) * Math.PI * 4); // 4 oscillations along the path
      lat += perpLat * amplitude * offsetFactor;
      lng += perpLng * amplitude * offsetFactor;
      path.push({ lat, lng });
    }
    return path;
  }
}
