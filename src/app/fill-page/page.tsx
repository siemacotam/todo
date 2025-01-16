import UserDataDialog from "@/components/user/user-data-dialog";
import ListPage from "@/views/list-page";

export default function Home() {
  return (
    <>
      <ListPage />
      <UserDataDialog open />
    </>
  );
}
