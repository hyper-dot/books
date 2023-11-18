import SalesForm from "@/components/sales/SalesForm";
import React from "react";
import { prisma } from "@/lib/prisma";

const page = async () => {
  const customers = await prisma.customer.findMany();
  const products = await prisma.item.findMany();
  return (
    <>
      <SalesForm customers={customers} products={products} />
    </>
  );
};

export default page;
