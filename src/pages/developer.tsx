import { SingleInstanceApp } from '../App';
import { Role } from '../types';

export const Developer = () => {
  return <SingleInstanceApp role={Role.Developer} />;
};
