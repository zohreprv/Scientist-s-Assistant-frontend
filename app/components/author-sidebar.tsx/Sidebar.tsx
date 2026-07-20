import Logo from '../logo';
import Country from './Country';
import HasOrcid from './HasOrcid';
import Institution from './Instituion';

const SideBar = () => {
  return (
    <aside className="side" aria-label="Sidebar" role="complementary">
      <Logo />
      <HasOrcid />
      <Institution />
      <Country />
    </aside>
  );
};

export default SideBar;
