"use server";
import { revalidatePath } from "next/cache";

import { cartProduct } from "@/constants/products/types";
import { prisma } from "@/lib/prisma";
import { addCashTransaction, findItemByID } from "./purchase.action";

type TSalesRecordDataType = {
  productList: cartProduct[];
  totalAmount: number;
  totalAmountAfterDiscount: number;
  discount: number;
  customerId: number;
  salesType: string;
  date: string;
};

const createSalesTransaction = async (product: cartProduct, sale: any) => {
  const { productQty, productID, productUnitPrice } = product;
  try {
    // add purchase transaction
    const saleRecord = await prisma.salesTransaction.create({
      data: {
        qty: Number(productQty),
        unit_price: Number(productUnitPrice),
        item_id: Number(productID),
        sales_id: sale.sales_id,
      },
    });
    return saleRecord;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const addSalesRecord = async (formData: TSalesRecordDataType) => {
  // Checks if product list is empty
  if (formData.productList.length == 0) {
    return { success: false, message: "Invalid product list" };
  }
  // Validates the date
  if (!formData.customerId) {
    return { success: false, message: "Customer is missing" };
  }
  // validated the purchase type
  if (!formData.salesType) {
    return { success: false, message: "Please specify transaction type" };
  }

  // Validates the transaction
  if (!formData.date) {
    return { success: false, message: "Please specify date of transaction" };
  }

  try {
    // Add purchase record
    const {
      discount,
      customerId,
      salesType,
      date,
      totalAmount,
      totalAmountAfterDiscount,
    } = formData;

    const sale = await prisma.sale.create({
      data: {
        sales_date: new Date(date).toISOString(),
        customer_id: customerId,
        total_amount: totalAmount,
        discount: discount,
        partial_payment: null,
        total_revenue: totalAmountAfterDiscount,
        sales_type: salesType,
      },
    });

    console.log(sale);

    // Add cash transaction
    if (salesType === "cash") {
      const res = await addCashTransaction(
        totalAmountAfterDiscount,
        "in",
        new Date(date).toISOString(),
      );
      if (!res) {
        return { success: false, message: "Couldn't record cash transaction" };
      }
      revalidatePath("/cash");
    }

    // Add record of each product
    for (let singleProduct of formData.productList) {
      const productRecord = await createSalesTransaction(singleProduct, sale);
      // handles error if product record not created
      if (!productRecord) {
        return { success: false, message: "Error while storing items data" };
      }

      // Handles error if item not found
      const oldItem = await findItemByID("item", productRecord.item_id);
      if (!oldItem) {
        return {
          success: false,
          message: "Couldn't find existing item having given id",
        };
      }

      const newItem = await prisma.item.update({
        where: {
          item_id: productRecord.item_id,
        },
        data: {
          stock: oldItem.stock - productRecord.qty,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: "Internal server error" };
  } finally {
    await prisma.$disconnect();
  }

  return { success: true, message: "Sales record created successfully !!" };
};
