import { ControllerRenderProps } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';

export type FormElementProps = {
  id?: string;
  name: string;
  label: string;
  disabled?: boolean;
  error?: string;
  description?: string;
};

export type ControlledFormElementProps<
  TFieldValues extends FieldValues = FieldValues
> = FormElementProps &
  Omit<ControllerRenderProps<TFieldValues>, 'ref' | 'name'>;
