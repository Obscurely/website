import React, { useState, useCallback, useMemo } from "react";
import { checkEmail } from "@utils/portfolio/contact";
import { toast } from "sonner";

const API_ENDPOINT = "/api/contact";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const INITIAL_TOUCHED_STATE = {
  name: true,
  email: true,
  subject: true,
  message: true,
};

export const useContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Minimum 2 characters" : "";
      case "email":
        return !checkEmail(value) ? "Invalid email" : "";
      case "subject":
        return value.trim().length < 3 ? "Minimum 3 characters" : "";
      case "message":
        return value.trim().length < 10 ? "Minimum 10 characters" : "";
      default:
        return "";
    }
  }, []);

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, formData[name as keyof FormData]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [formData, validateField]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    for (const [key, value] of Object.entries(formData)) {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(INITIAL_TOUCHED_STATE);
    return isValid;
  }, [formData, validateField]);

  const isFormValid = useMemo((): boolean => {
    // Check if all required fields have values
    const hasAllValues = Object.values(formData).every(
      (value) => value.trim().length > 0
    );

    // Check current field values against validation rules in real-time
    const hasNoValidationErrors = Object.entries(formData).every(
      ([key, value]) => {
        const error = validateField(key, value);
        return !error;
      }
    );

    return hasAllValues && hasNoValidationErrors;
  }, [formData, validateField]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 429) {
            toast.error("Too many requests. Please try again later.");
          } else if (response.status === 400) {
            toast.error(data.error || "Please check your input and try again.");
          } else {
            toast.error(
              data.error || "Failed to send message. Please try again later."
            );
          }
          return;
        }

        // Success
        setIsSubmitted(true);
        toast.success("Message sent successfully!");
        setFormData(INITIAL_FORM_DATA);
        setTouched({});
        setErrors({});
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, formData]
  );

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setFormData(INITIAL_FORM_DATA);
    setTouched({});
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isFormValid,
  };
};
