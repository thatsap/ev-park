import { Role } from '../../types';
import { UiComp } from '../../userInterface/UiState/UiComp';
import { UiCompDev } from '../../userInterface/UiStateDev/UiCompDev';
import { Maps } from '../Map/Map';

export const RoleViewer = ({ role }: { role: Role }) => {
  return role === Role.Developer ? (
    <>
      <UiCompDev />
    </>
  ) : role === Role.USER ? (
    <>
      <UiComp />
      <Maps />
    </>
  ) : null;
};
