import pocketsService from "@/services/pockets/tasks.service";
import { useUserStore } from "@/stores/user-store";

export const useCRUDActions = () => {
  const { pickedPocket, removePocket } = useUserStore();

  const deletePocket = async () => {
    const res = await pocketsService
      .delete({ id: pickedPocket })
      .catch((err) => {
        console.log(err);
      });

    if (res) {
      removePocket(pickedPocket);
    }
  };

  return { deletePocket };
};
