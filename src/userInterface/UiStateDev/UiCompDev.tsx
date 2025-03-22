import { observer } from 'mobx-react-lite';

import { NavBar } from './NavBar/NavBar';
import { SideBar } from './SideBar/SideBar';

export const UiCompDev = observer(() => {
  return (
    <>
      <SideBar />
      <NavBar />
    </>
  );
});
