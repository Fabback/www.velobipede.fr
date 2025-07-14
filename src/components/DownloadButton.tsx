"use client";

import { ComponentProps, type MouseEvent } from "react";
import { showNotification } from "@mantine/notifications";
import { Button, type ButtonProps } from "@mantine/core";

type DownloadButtonProps = {
  fileName: string;
} & ButtonProps;

/**
 *
 * @param {DownloadButtonProps} contient "fileName" correspondant au nom du fichier présent dans "public/downloads"
 * @returns DownloadButton
 */
function DownloadButton({
  children,
  fileName,
  ...MantineButtonProps
}: DownloadButtonProps) {
  const handleDownload = async (e: MouseEvent) => {
    if (!fileName) return;

    const url = new URL("/api/download", window.location.origin);
    url.searchParams.append("fileName", fileName);

    const response = await fetch(url);

    if (response.status === 200) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);

      return;
    }

    showNotification({
      variant: "error",
      title: "Erreur téléchargement",
      message: "Erreur : le fichier ne peut être téléchargé",
    });
  };

  return (
    <Button {...MantineButtonProps} onClick={handleDownload}>
      {children}
    </Button>
  );
}

export default DownloadButton;
