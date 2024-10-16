import { apiClient } from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) =>
      await apiClient.post("/product", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
