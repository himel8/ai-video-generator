import Header from "./_component/Header";
import SideNav from "./_component/SideNav";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="hidden md:block bg-white mt-[65px] fixed h-screen w-64">
        <SideNav />
      </div>
      <div>
        <Header />
        <div className="md:ml-64 p-10 pt-20">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
