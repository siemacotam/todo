import AddTaskButton from "@/components/buttons/add-task-button";
import Tasks from "@/components/tasks/tasks";
import PocketSection from "@/components/pockets/pockets-section";

const ListPage = () => {
  return (
    <div className="h-screen w-full flex bg-gray-50 p-0 md:p-[10px]">
      <div className="h-full">
        <PocketSection />
      </div>
      <Tasks />
      <AddTaskButton />
    </div>
  );
};

export default ListPage;
