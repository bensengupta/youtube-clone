"use client";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import type {
  FieldPath,
  FieldValues,
  FieldArrayPath,
  FieldArray,
  Path,
  ArrayPath,
  PathValue,
} from "./types";
import * as R from "ramda";
import { Simplify } from "type-fest";

const fieldPathToPathArray = (fieldPath: string): (string | number)[] =>
  fieldPath
    .split(/[,[\].]+?/)
    .map((part) => (part.match(/^\d*$/) ? Number(part) : part));

const get = <T, P extends Path<T> | ArrayPath<T>>(obj: T, path: P) =>
  R.path<PathValue<T, P>>(fieldPathToPathArray(path), obj);

const set = <T, P extends Path<T> | ArrayPath<T>>(
  obj: T,
  path: P,
  val: PathValue<T, P>
): T => R.assocPath(fieldPathToPathArray(path), val, obj);

type SubmitCallback<TFieldValues extends FieldValues> = (
  values: TFieldValues
) => void;

type FormState<TFieldValues extends FieldValues> = unknown;

export interface FormControl<TFieldValues extends FieldValues> {
  values: TFieldValues;
  setValues: Dispatch<SetStateAction<TFieldValues>>;
  formState: FormState<TFieldValues>;
  setFormState: Dispatch<SetStateAction<FormState<TFieldValues>>>;
}

type UseFormProps<TFieldValues extends FieldValues> = {
  defaultValues: TFieldValues;
};

interface UseFormReturn<TFieldValues extends FieldValues>
  extends Pick<FormControl<TFieldValues>, "values" | "setValues"> {
  handleSubmit: (callback: SubmitCallback<TFieldValues>) => () => void;
  control: FormControl<TFieldValues>;
}

export function useForm<TFieldValues extends FieldValues>(
  props: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
  const { defaultValues } = props;

  const [values, setValues] = useState<TFieldValues>(defaultValues);
  const [formState, setFormState] = useState<FormState<TFieldValues>>({});

  useEffect(() => {
    console.log("useForm values", values);
  }, [values]);

  const handleSubmit = useCallback(
    (callback: SubmitCallback<TFieldValues>) => {
      return () => {
        callback(values);
      };
    },
    [values]
  );

  const control = useMemo(
    () => ({
      values,
      setValues,
      formState,
      setFormState,
    }),
    [formState, values]
  );

  return { values, setValues, handleSubmit, control };
}

interface UseFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  name: TName;
  control: FormControl<TFieldValues>;
}

export function useFormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(props: UseFormFieldProps<TFieldValues, TName>) {
  const { control, name } = props;
  const { values, setValues } = control;

  const value = get(values, name);

  const onChange = useCallback(
    (event: { target: { value: PathValue<TFieldValues, TName> } }) => {
      const { value } = event.target;

      setValues((values) => set(values, name, value));
    },
    [name, setValues]
  );

  return { value, onChange };
}

interface UseFormFieldArrayProps<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>
> {
  name: TFieldArrayName;
  control: FormControl<TFieldValues>;
}

export function useFormFieldArray<
  TFieldValues extends FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues>
>(props: UseFormFieldArrayProps<TFieldValues, TFieldArrayName>) {
  const { control, name } = props;
  const { values, setValues } = control;

  type Item = FieldArray<TFieldValues, TFieldArrayName>;

  const fields = (get(values, name) ?? []) as Item[];

  const append = useCallback(
    (item: Item) => {
      setValues((vals) => {
        const fieldArray = (get(vals, name) ?? []) as Item[];
        const newFieldArray = [...fieldArray, item];

        return set(
          vals,
          name,
          newFieldArray as PathValue<TFieldValues, TFieldArrayName>
        );
      });
    },
    [name, setValues]
  );

  return { fields, append };
}
