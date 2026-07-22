import SideBar from '~/components/work-sidebar/SideBar';
import { Outlet } from 'react-router';
import { UrlProvider } from '../../../Context/UrlContext';
import { WorkSideProvider } from '../../../Context/WorkSideContext';
const WorksLayout = () => {
  return (
    <UrlProvider>
      <WorkSideProvider>
        <div className="flex mx-auto space-x-5 ">
          <div className="flex-1 mx-auto max-w-screen lg:max-w-auto">
            <Outlet />
          </div>
          <SideBar />
        </div>
      </WorkSideProvider>
    </UrlProvider>
  );
};

export default WorksLayout;
