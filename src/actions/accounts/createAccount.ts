"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Create account function
export const createAccount = async (formdata: FormData) => {
  const account_type = formdata.get("account_type");
  if (account_type === "supplier") {
    const res = await createSupplier(formdata);
    return res;
  } else if (account_type === "customer") {
    const res = await createCustomer(formdata);
    return res;
  } else {
    return { success: false, message: "Please select account type" };
  }
};

// Create supplier function
export const createSupplier = async (formdata: FormData) => {
  const account_name = formdata.get("account_name");
  const contact_no = formdata.get("contact_no");
  const vat = formdata.get("vat");
  const address = formdata.get("address");

  try {
    if (account_name && contact_no && vat && address) {
      const supplier = await prisma.supplier.create({
        data: {
          supplier_name: account_name as string, // You can use type assertion here
          contact_no: contact_no as string,
          vat_no: vat as string,
          address: address as string,
          amount_payable: 0,
        },
      });
      revalidatePath("/suppliers");
      // Success Messaage
      return {
        success: true,
        message: "Supplier's account created successfully.",
      };
    } else {
      // Validation
      return { success: false, message: "All fields are required." };
    }
  } catch (e) {
    console.log(e); // Logs the whole error
    // Handles Prisma Error
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { success: false, message: "Vat No. or Name already exists" };
      }
    }
    // If not found returns internal server error
    return { success: false, message: "Internal server error" };
  } finally {
    await prisma.$disconnect();
  }
};

// Create Customer function
export const createCustomer = async (formdata: FormData) => {
  const account_name = formdata.get("account_name");
  const contact_no = formdata.get("contact_no");
  const vat = formdata.get("vat");
  const address = formdata.get("address");

  try {
    if (account_name && contact_no && vat && address) {
      const customer = await prisma.customer.create({
        data: {
          customer_name: account_name as string, // You can use type assertion here
          contact_no: contact_no as string,
          vat_no: vat as string,
          address: address as string,
          amount_receivable: 0,
        },
      });
      revalidatePath("/customers");
      return {
        success: true,
        message: "Customer's account created successfully.",
      };
    } else {
      return { success: false, message: "All fields are required." };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "Internal server error." };
  } finally {
    await prisma.$disconnect();
  }
};