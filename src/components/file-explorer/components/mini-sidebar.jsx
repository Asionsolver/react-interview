import { RxDashboard } from "react-icons/rx";
const MiniSidebar = ({ onSidebarToggle }) => {
  return (
    <div className="bg-[#191515] text-white  relative border-r border-[#252121] w-14  flex items-center flex-col ">
      <div className="pt-3.5">
        <img src="/public/brand.svg" alt="brand-logo" className="w-6" />
      </div>

      <div className="mt-6">
        <div className="bg-[#272323] p-2 rounded-md" onClick={onSidebarToggle}>
          <RxDashboard size={20} />
        </div>
      </div>
    </div>
  );
};

export default MiniSidebar;
