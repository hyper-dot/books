"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { salesData } from "@/__mockdata__/sales";
import { CircleEllipsis } from "lucide-react";
import toast from "react-hot-toast";

const page = () => {
  return (
    <div className="py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SN</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesData.map((d, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{d.date}</TableCell>
              <TableCell>{d.product}</TableCell>
              <TableCell>{d.quantity}</TableCell>
              <TableCell>{d.customerId}</TableCell>
              <TableCell>{d.paymentMethod}</TableCell>
              <TableCell className="flex justify-end">
                <CircleEllipsis
                  size={18}
                  onClick={() => {
                    toast.success("Clicked successfully !!");
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
