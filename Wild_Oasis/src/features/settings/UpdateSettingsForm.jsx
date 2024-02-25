import { updateSetting } from "../../services/apiSettings";
import Spinner from "../../ui/Spinner";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useEditSetting } from "./useEditsetting";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      breakfastPrice,
      maxGuestPerBooking,
    } = {},
  } = useSettings();
  const { updateSetting, isEditing } = useEditSetting();

  if (isLoading) return <Spinner />;

  const handleUpdateSetting = (e, field) => {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  };
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isEditing}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isEditing}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isEditing}
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isEditing}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
