import db from "@/lib/db";

export async function getModalProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });
  return product;
}
