"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { uploadProduct } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductType } from "./schema";

const AddProduct = () => {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const isOversizeImage = (file: File): boolean => {
    const MAX_FILE_SIZE = 1024 * 1024 * 5;
    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기가 5MB를 초과했습니다.");
      return true;
    }
    return false;
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    if (isOversizeImage(file)) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    setValue("photo", url);
  };

  const onSubmit = handleSubmit(async (data: ProductType) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("photo", data.photo);
    return uploadProduct(formData);
  });
  const onValid = async () => {
    await onSubmit();
  };
  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {errors.photo?.message}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <FormInput
          required
          placeholder="제목"
          type="text"
          {...register("title")}
          errors={[errors.title?.message ?? ""]}
        />
        <FormInput
          required
          placeholder="가격"
          type="number"
          {...register("price")}
          errors={[errors.price?.message ?? ""]}
        />
        <FormInput
          required
          placeholder="자세한 설명"
          type="text"
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
        />
        <FormButton text="작성 완료" />
      </form>
    </div>
  );
};

export default AddProduct;
