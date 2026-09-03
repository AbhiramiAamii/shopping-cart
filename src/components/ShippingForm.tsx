import { useState } from "react";
import {
  shippingSchema,
  emptyShippingForm,
  type ShippingFormValues,
} from "../schemas/shippingSchema";
import {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  INPUT_BASE,
  INPUT_ERROR,
  LABEL_BASE,
} from "../styles/classNames";

type FieldErrors = Partial<Record<keyof ShippingFormValues, string>>;

interface ShippingFormProps {
  initialValues?: ShippingFormValues;
  onSubmit: (values: ShippingFormValues) => void;
  onBack: () => void;
}

function ShippingForm({ initialValues, onSubmit, onBack }: ShippingFormProps) {
  const [values, setValues] = useState<ShippingFormValues>(
    initialValues ?? emptyShippingForm,
  );
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = (currentValues: ShippingFormValues): FieldErrors => {
    const result = shippingSchema.safeParse(currentValues);
    if (result.success) return {};

    const fieldErrors = result.error.flatten().fieldErrors;
    const nextErrors: FieldErrors = {};

    (Object.keys(currentValues) as Array<keyof ShippingFormValues>).forEach(
      (field) => {
        const message = fieldErrors[field]?.[0];
        if (message) nextErrors[field] = message;
      },
    );

    return nextErrors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const field = name as keyof ShippingFormValues;

    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    if (errors[field]) {
      const nextErrors = validate(nextValues);
      setErrors((previous) => ({ ...previous, [field]: nextErrors[field] }));
    }
  };

  const handleSubmit = () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const result = shippingSchema.safeParse(values);
    if (result.success) {
      onSubmit(result.data);
    }
  };

  const renderField = (
    field: keyof ShippingFormValues,
    label: string,
    type: string = "text",
    maxLength?: number,
  ) => {
    const errorId = `${field}-error`;
    const hasError = Boolean(errors[field]);

    return (
      <div className="form-field">
        <label htmlFor={field} className={LABEL_BASE}>
          {label}
        </label>
        <input
          id={field}
          name={field}
          type={type}
          value={values[field]}
          onChange={handleChange}
          maxLength={maxLength}
          className={hasError ? INPUT_ERROR : INPUT_BASE}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        />
        {hasError && (
          <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-sky">
      <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderField("fullName", "Full name", "text", 60)}
        {renderField("email", "Email", "email", 100)}
        {renderField("phone", "Phone number", "tel", 20)}
        {renderField("address", "Address", "text", 200)}
        {renderField("city", "City", "text", 60)}
        {renderField("postalCode", "Postal code", "text", 10)}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button type="button" onClick={onBack} className={BUTTON_SECONDARY}>
          Back to cart
        </button>
        <button type="button" onClick={handleSubmit} className={BUTTON_PRIMARY}>
          Continue to payment
        </button>
      </div>
    </div>
  );
}

export default ShippingForm;
