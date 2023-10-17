import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { createCabins } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation(
    createCabins,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cabins");
        toast.success("New cabin successfully created!");
      },
      onError: (err) => toast.error("Unable to create cabin"),
    }
  );
  return { isCreating, createCabin };
}
