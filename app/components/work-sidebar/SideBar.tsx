import OpenAccessPart from './OpenAccessPart';
import Topic from './Topic';
import YearPart from './YearPart';

const SideBar = () => {
  return (
    <aside className="side" aria-label="Sidebar" role="complementary">
      <OpenAccessPart />
      <YearPart />
      <Topic />
    </aside>
  );
};

export default SideBar;
