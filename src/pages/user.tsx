import { SingleInstanceApp } from '../App';
import { Role } from '../types';

export const User = () => {
  return <SingleInstanceApp role={Role.USER} />;
};
