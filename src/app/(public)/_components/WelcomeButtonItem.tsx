"use client";

import {
  Button,
  ButtonProps,
  GridCol,
  PolymorphicComponentProps,
} from "@mantine/core";
import Link from "next/link";

export default function WelcomeButtonItem({
  children,
  ...buttonProps
}: PolymorphicComponentProps<typeof Link, ButtonProps>) {
  return (
    <GridCol span={{ base: 12, sm: 6 }}>
      <Button
        {...buttonProps}
        component={Link}
        className="block h-10 w-full text-sm font-normal"
      >
        {children}
      </Button>
    </GridCol>
  );
}
