import React from "react";
import PurchaseForm from "@/components/purchase/PurchaseForm";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const suppliers = await prisma.supplier.findMany();
  const products = await prisma.item.findMany();
  await prisma.$disconnect();

  return (
    <div className="">
      <div className="my-4 justify-around w-full">
        <PurchaseForm suppliers={suppliers} products={products} />
      </div>
    </div>
  );
};

export default page;
