import { deleteCabins } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation(
    deleteCabins,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cabins");
        toast.success("Cabin successfully deleted!");
      },
      onError: (err) => toast.error(err.message),
    }
  );
  return { isDeleting, deleteCabin };
}
