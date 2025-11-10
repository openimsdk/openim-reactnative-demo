import { BaseInputItem, BaseInputItemProps } from "../base-input-item/BaseInputItem";

export function EmailInputItem({ ...props }: BaseInputItemProps) {
  return (
    <BaseInputItem {...props} inputMode="email" />
  );
}
