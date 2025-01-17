import Header from "./_component/Header";
import SideNav from "./_component/SideNav";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="hidden md:block bg-white mt-16 fixed">
        <SideNav />
      </div>
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
