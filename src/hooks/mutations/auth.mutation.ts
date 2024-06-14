import { r } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await r.post({
        endpoint: "/auth/register",
        payload,
      });
    },
  });
};

export const useOTPVerification = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await r.post({
        endpoint: "/auth/otp",
        payload,
      });
    },
  });
};
