"use client";
import { DataTable } from "@/components/DataTable";
import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAPIQuery } from "@/hooks/query";
import { Batch, Customer, Product } from "@/types/product.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleAlert, SquarePen, Trash } from "lucide-react";

export default function Page() {
  const route = "/customer";
  const key = ["customers"];
  const { data: res, isLoading } = useAPIQuery(route, key);

  if (isLoading || !res) return <DataTableSkeleton />;

  const columns: ColumnDef<Customer>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "__v",
      header: "SN",
      cell: (item) => Number(item.row.id) + 1,
      enableSorting: false,
    },

    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Design Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: (item) => (
        <div className="capitalize">{item.getValue() as string}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (item) => item.getValue(),
      enableSorting: false,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: (item) => item.getValue(),
      enableSorting: false,
    },

    {
      accessorKey: "createdAt",
      header: "Added",
      cell: (item) => (item.getValue() as Date).toLocaleString().split("T")[0],
      enableSorting: false,
    },
    {
      accessorKey: "_id",
      header: "Action",
      cell: (item) => (
        <div className="flex gap-2">
          <CircleAlert className="text-muted-foreground" size={18} />
          <Trash size={18} className="text-destructive" />
          <SquarePen size={18} className="text-blue-500 dark:text-blue-400" />
        </div>
      ),
      enableSorting: false,
    },
  ];

  return (
    <DataTable
      searchKey="name"
      columns={columns}
      data={res.data.data}
      createLink="/sales/new/customer"
    />
  );
}
