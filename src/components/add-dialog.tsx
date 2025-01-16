import { ReactNode } from "react";

interface AddDialogProps {
  children: ReactNode;
}

const AddDialog = ({ children }: AddDialogProps) => (
  <>
    <div className="fixed w-screen h-screen bg-opacity-60 md:bg-opacity-60 backdrop-blur-sm"></div>
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col w-[340px] h-[400px] md:w-[400px] p-[14px] shadow-custom-shadow bg-white rounded-[19px] z-30">
      {children}
    </div>
  </>
);

export default AddDialog;
