import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { createCabins } from "../../services/apiCabins";
export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation(
    ({ newCabin, id }) => createCabins(newCabin, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cabins");
        toast.success("Cabin successfully edited!");
      },
      onError: (err) => toast.error("Unable to edit cabin"),
    }
  );
  return { isEditing, editCabin };
}
