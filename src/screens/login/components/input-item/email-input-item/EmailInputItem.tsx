import BaseInputItem, { BaseInputItemProps } from "../base-input-item/BaseInputItem";

export default function EmailInputItem({ ...props }: BaseInputItemProps) {
  return (
    <BaseInputItem {...props} inputMode="email" />
  );
}