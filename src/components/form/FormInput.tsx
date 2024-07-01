import React, { InputHTMLAttributes } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const FormInput = ({
  type,
  errors,
  register,
  placeholder,
}: {
  type?: "number" | "text" | "password";
  errors: any;
  register: any;
  placeholder?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip open={!!errors}>
        <TooltipTrigger asChild>
          <Input
            type={type ? type : "text"}
            className={cn(!!errors ? "border-destructive" : "")}
            {...register}
            placeholder={placeholder}
          />
        </TooltipTrigger>
        <TooltipContent
          className="bg-transparent text-destructive p-0 m-0 leading-none"
          align="end"
        >
          <p>{errors?.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FormInput;
