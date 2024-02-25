import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, setShowEdit, onCloseModel }) {
  const { id: editCabinId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editCabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorkable = isEditing || isCreating;

  const onSubmit = (data) => {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newcabin: { ...data, image }, id: editCabinId },
        {
          onSuccess: () => {
            setShowEdit((pre) => !pre);
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModel?.();
          },
        }
      );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModel ? "modal" : "regular"}
    >
      <FormRow label="CabinName" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorkable}
          {...register("name", {
            required: "The Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorkable}
          {...register("maxCapacity", {
            required: "The field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorkable}
          {...register("regularPrice", {
            required: "The Field is required",
            min: {
              value: 10,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorkable}
          defaultValue={0}
          {...register("discount", {
            required: "The Field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount always less than or equal to reqular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorkable}
          defaultValue=""
          {...register("description", {
            required: "The Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          disabled={isWorkable}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "The Field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorkable}
          onClick={() => {
            isEditSession ? setShowEdit((pre) => !pre) : onCloseModel?.();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isWorkable}>
          {isEditSession ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
