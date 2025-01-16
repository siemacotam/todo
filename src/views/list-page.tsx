import Actions from "@/components/actions";
import Tasks from "@/components/tasks";
import UserDataDialog from "@/components/user/user-data-dialog";
import PocketSection from "@/components/pockets-section";

const ListPage = () => {
  return (
    <div className="h-screen w-full flex bg-gray-50 p-0 md:p-[10px]">
      <div className="h-full">
        <PocketSection />
      </div>
      <Tasks />
      <Actions />
      <UserDataDialog />
    </div>
  );
};

export default ListPage;
