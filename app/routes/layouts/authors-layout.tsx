import { Outlet } from 'react-router';
import SideBar from '~/components/author-sidebar/Sidebar';
import { AuthorUrlProvider } from '../../../Context/AuthorUrlContext';
import { AuthorSideProvider } from '../../../Context/AuthorSideContext';
const AuthorsLayout = () => {
  return (
    <div className="flex mx-auto space-x-5 ">
      <AuthorUrlProvider>
        <AuthorSideProvider>
          <div className="flex-1 mx-auto max-w-screen lg:max-w-auto">
            {' '}
            <Outlet />
          </div>
          <SideBar />
        </AuthorSideProvider>
      </AuthorUrlProvider>
    </div>
  );
};

export default AuthorsLayout;
