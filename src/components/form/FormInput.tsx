import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const FormInput = ({
  errors,
  register,
  placeholder,
}: {
  errors: any;
  register: any;
  placeholder?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip open={!!errors}>
        <TooltipTrigger asChild>
          <Input
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
