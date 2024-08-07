import ModalBtn from "@/components/modal-btn";
import { getModalProduct } from "./actions";
import { notFound } from "next/navigation";
import Image from "next/image";

const Modal = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getModalProduct(id);
  if (!product) {
    return notFound();
  }
  return (
    <div className="absolute w-full h-full z-50 flex  justify-center items-center bg-black bg-opacity-60 left-0 top-0">
      <ModalBtn />
      <div className="max-w-screen-sm h-full w-full flex flex-col gap-5 justify-center">
        <div className="aspect-square rounded-md overflow-hidden">
          <div className="relative aspect-square ">
            <Image
              className="object-cover"
              fill
              src={product.photo}
              alt={product.title}
            />
          </div>
        </div>
        <div className="w-100 text-3xl font-bold rounded-md break-words">
          {product.title}
        </div>
        <div className="w-100 text-lg font-semibold rounded-md break-words">
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default Modal;
