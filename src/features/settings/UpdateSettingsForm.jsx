import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getSettings, updateSetting } from '../../services/apiSettings';
import { toast } from 'react-hot-toast';

function UpdateSettingsForm() {
  const queryClient = useQueryClient();
  const { isLoading, data = {} } = useQuery('sittings', getSettings);
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = data;

  const { mutate, isLoading: isUpdating } = useMutation(updateSetting, {
    onSuccess: () => {
      queryClient.invalidateQueries("sittings");
      toast.success("Settings successfully updated!");
    },
    onError: (err) => toast.error("Unable to update settings"),
  })

  function handleBlur(e, field) {
    const { value } = e.target;

    if (!value) return;
    mutate({ [field]: value });
  }
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, 'minBookingLength')}
          disabled={isUpdating}
          id='min-nights'
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlur(e, 'maxBookingLength')}
          disabled={isUpdating}
          id='max-nights'
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleBlur(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
          id='max-guests'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, 'breakfastPrice')}
          disabled={isUpdating}
          id='breakfast-price'
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
