import Image from "next/image";
import deleteIcon from "@/assets/trash.svg";

interface DeleteButtonProps {
  handleClick: () => void;
  loading: boolean;
}

const DeleteButton = ({ handleClick, loading }: DeleteButtonProps) => {
  return (
    <button
      disabled={loading}
      onClick={handleClick}
      className="w-[106px] flex justify-center items-center h-[36px] rounded-[6px] bg-white"
    >
      <div className="flex items-center gap-1 cursor-pointer">
        <Image src={deleteIcon} height={14} width={14} alt="trash icon" />
        <p className="text-sm text-red-600 ">Delete</p>
      </div>
    </button>
  );
};

export default DeleteButton;
