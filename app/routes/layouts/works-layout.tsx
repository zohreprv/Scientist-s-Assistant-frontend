import SideBar from '~/components/work-sidebar/SideBar';
import { Outlet } from 'react-router';
import { UrlProvider } from '../../../Context/UrlContext';
import { TopicProvider } from '../../../Context/TopicContext';
const WorksLayout = () => {
  return (
    <UrlProvider>
      <TopicProvider>
        <div className="flex mx-auto space-x-5">
          <div className="flex-1">
            <Outlet />
          </div>
          <SideBar />
        </div>
      </TopicProvider>
    </UrlProvider>
  );
};

export default WorksLayout;
