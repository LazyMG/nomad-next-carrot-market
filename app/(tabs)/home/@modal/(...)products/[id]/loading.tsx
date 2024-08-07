import ModalBtn from "@/components/modal-btn";

const Loading = () => {
  return (
    <div className="absolute w-full h-full z-50 flex  justify-center items-center bg-black bg-opacity-60 left-0 top-0">
      <ModalBtn />
      <div className="animate-pulse max-w-screen-sm h-full w-full flex flex-col gap-5 justify-center">
        <div className="aspect-square bg-neutral-700 rounded-md flex justify-center items-center text-neutral-200"></div>
        <div className="h-6 w-80 bg-neutral-700 rounded-md" />
        <div className="h-6 w-100 bg-neutral-700 rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
