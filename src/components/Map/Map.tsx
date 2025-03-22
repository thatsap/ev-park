import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMainContext } from '../../hook/useMainContext';
import { MapUtils } from '../../utils/MapUtils';

// Import marker assets
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// Import two-wheeler icon image (ensure it's in your public folder, e.g., /scooter.png)
import twoWheelerImg from '/scooter.png';
import { LatLngLiteral } from '../../types';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Define two-wheeler icon.
const twoWheelerIcon = L.icon({
  iconUrl: twoWheelerImg,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
  shadowUrl: undefined,
});

export const Maps = observer(() => {
  const { mapManager } = useMainContext();

  // Get the user's location.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentPos: LatLngLiteral = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          mapManager.setPosition(currentPos);
        },
        (err) => {
          console.error('Error getting location: ', err);
        },
      );
    }
  }, [mapManager]);

  if (!mapManager._position) {
    return <div>Getting your location...</div>;
  }

  // Retrieve static green boxes from the manager.
  const staticGreenBoxes = mapManager.getStaticGreenBoxes();

  // Function to determine box color based on distance from current position.
  const getBoxColor = (bounds: [LatLngLiteral, LatLngLiteral]): string => {
    const boxCenter = MapUtils.getBoxCenter(bounds);
    const distance = L.latLng(mapManager._position!).distanceTo(
      L.latLng(boxCenter),
    );
    return distance <= 200 ? 'green' : 'red';
  };

  return (
    <div>
      {/* <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          padding: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
        }}>
        {mapManager._debugMode && (
          <span style={{ color: 'red' }}>Debug Mode Active</span>
        )}
        {!mapManager._debugMode && (
          <button
            onClick={() => mapManager.runAnimation()}
            disabled={mapManager._animationActive}
            style={{
              backgroundColor: mapManager._animationActive
                ? 'gray'
                : 'lightblue',
            }}>
            Run Animation
          </button>
        )}
      </div> */}
      <MapContainer
        center={mapManager._position}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Current position marker using two-wheeler icon */}
        <Marker position={mapManager._position} icon={twoWheelerIcon}>
          <Popup>You are here!</Popup>
        </Marker>
        {/* Render static boxes with color determined by distance */}
        {staticGreenBoxes.map((bounds, idx) => (
          <Rectangle
            key={`static-${idx}`}
            bounds={bounds}
            pathOptions={{ color: getBoxColor(bounds), weight: 2 }}
          />
        ))}
        {/* Render animated marker if present */}
        {mapManager._animatedMarker && (
          <Marker position={mapManager._animatedMarker} icon={twoWheelerIcon}>
            <Popup>Animated Two-Wheeler</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
});
