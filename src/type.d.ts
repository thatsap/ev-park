// declare module
declare module 'leaflet';
declare module 'leaflet/dist/images/marker-icon.png';
declare module 'leaflet/dist/images/marker-icon-2x.png';
declare module 'leaflet/dist/images/marker-shadow.png';
declare module '*.png' {
  const value: string;
  export default value;
}
