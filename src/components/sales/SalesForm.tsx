"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import SubmitButton from "../SubmitButton";

import { productSchemaType } from "@/constants/products/types";
import PurchaseList from "./SalesList";
import { toast } from "../ui/use-toast";
import { customerSchemaType } from "@/constants/customers/types";

type TSalesFormProps = {
  customers: customerSchemaType[];
  products: productSchemaType[];
};
import { addSalesRecord } from "@/actions/sales.action";

const SalesForm: React.FC<TSalesFormProps> = ({ customers, products }) => {
  type singleProduct = {
    productID: string;
    productQty: string;
    productUnitPrice: string;
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [productList, setProductList] = useState<singleProduct[]>([]);
  const [productID, setProductID] = useState("");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const [date, setDate] = useState("");
  const [partialPayment, setPartialPayment] = useState("");
  const [customer, setCustomer] = useState("");
  const [salesType, setSalesType] = useState("");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 w-full justify-between">
      <form
        action={async () => {
          const { message, success } = await addSalesRecord({
            productList,
            totalAmount: totalPrice + Number(discount),
            totalAmountAfterDiscount: totalPrice,
            discount: Number(discount),
            customerId: Number(customer),
            salesType,
            date,
          });
          toast({
            title: message,
            variant: success ? "success" : "destructive",
          });
          if (success) {
            setTotalPrice(0);
            setProductList([]);
            setProductID("");
            setQty("");
            setUnitPrice("");
            setDiscount("");
            setDate("");
            setPartialPayment("");
            setCustomer("");
            setSalesType("");
          }
        }}
        className="w-full"
      >
        <h1 className="text-2xl py-4">Add Sales Record</h1>
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="supplier">Supplier</Label>
            <select
              name="customer"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option
                className="dark:bg-primary-foreground rounded-t-lg"
                disabled
                value=""
              >
                Select a Customer
              </option>
              {customers.map((c) => (
                <option
                  className="dark:bg-primary-foreground"
                  key={c.customer_id}
                  value={c.customer_id.toString()}
                >
                  {c.customer_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="discount">Discount</Label>
            <div className="items-center gap-2 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <span>Rs.</span>
              <input
                className="w-full focus:outline-none bg-transparent"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                id="discount"
                name="discount"
                type="number"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="purchase_type">Sales Type</Label>
            <select
              name="purchase_type"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={salesType}
              onChange={(e) => setSalesType(e.target.value)}
            >
              <option className="dark:bg-primary-foreground" value="" disabled>
                Select transaction type
              </option>
              <option className="dark:bg-primary-foreground" value="cash">
                Cash
              </option>
              <option className="dark:bg-primary-foreground" value="credit">
                Credit
              </option>
              <option className="dark:bg-primary-foreground" value="partial">
                Partial Payment
              </option>
            </select>
          </div>
          {salesType === "partial" ? (
            <div>
              <Label htmlFor="partial_payment">Partial Payment</Label>
              <div className="items-center gap-2 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                <span>Rs.</span>
                <input
                  value={partialPayment}
                  onChange={(e) => setPartialPayment(e.target.value)}
                  className="w-full focus:outline-none bg-transparent"
                  id="partial_payment"
                  name="partial_payment"
                  type="number"
                />
              </div>
            </div>
          ) : null}
          <div>
            <Label htmlFor="purchase_date">Purchase Date</Label>
            <input
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              type="date"
              name="date"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <SubmitButton name="Add Record" loadingName="Adding Record" />
      </form>

      {/* .............................. Product List Section ................................. */}
      <PurchaseList
        discount={discount}
        productID={productID}
        setProductID={setProductID}
        setProductList={setProductList}
        products={products}
        qty={qty}
        setQty={setQty}
        productList={productList}
        totalPrice={totalPrice}
        setUnitPrice={setUnitPrice}
        unitPrice={unitPrice}
        setTotalPrice={setTotalPrice}
      />
    </div>
  );
};

export default SalesForm;
