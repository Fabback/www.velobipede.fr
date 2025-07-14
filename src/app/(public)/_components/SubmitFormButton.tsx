import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@mantine/core";

export default function SubmitButtonForm({
  children,
  ...buttonProps
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...buttonProps}>
      {children ?? "Envoyer"}
    </Button>
  );
}
