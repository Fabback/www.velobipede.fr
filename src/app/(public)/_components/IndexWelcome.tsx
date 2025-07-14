import DownloadButton from "@/components/DownloadButton";
import {
  Button,
  ButtonProps,
  Card,
  Divider,
  Grid,
  GridCol,
  PolymorphicComponentProps,
  Space,
  Title,
} from "@mantine/core";
import { IconFileTypePdf, IconMail, IconPhone } from "@tabler/icons-react";
import next from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

function WelcomeButtonItem({
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

export default function IndexWelCome() {
  return (
    <div className="relative p-5">
      <div className="page-vertical-flow">
        <Image
          className="z-0 object-cover object-center opacity-30"
          alt=""
          placeholder="blur"
          blurDataURL={"/assets/images/cargo_parc_blur.jpg"}
          src={"/assets/images/cargo_parc.jpg"}
          fill={true}
        ></Image>

        <Card className="mx-auto w-[90%] max-w-[500px] gap-2 rounded-2xl pb-4">
          <div>
            <Title order={2} className="text-center">
              Votre atelier vélo, vous l&apos;aimez comment ?
            </Title>
            <Divider my="md" />
            <p>
              Réparateur de cycles, je me déplace sur{" "}
              <strong>Le Mans (lieu de travail, ou à domicile)</strong> au
              guidon de mon fier destrier, suivant la complexité
              j&apos;interviens sur place ou j&apos;emporte votre vélo à mon
              atelier grâce à ma remorque.
            </p>
            <p>
              Contactez-moi je serais ravi de vous présenter mon offre de
              service plus longuement (un petit avant goût ci-dessous).
            </p>
          </div>

          <Grid>
            <WelcomeButtonItem href="tel:+33671495561">
              <IconPhone className="mr-2" />
              06 71 49 55 61
            </WelcomeButtonItem>

            <WelcomeButtonItem href="mailto:Le%20V%C3%A9lobip%C3%A8de<contact@velobipede.fr>?subject=Contact%20site&body=Je%20d%C3%A9cris%20mon%20probl%C3%A8me%0D%0AJe%20donne%20mes%20coordonn%C3%A9es">
              <IconMail className="mr-2" />
              contact@velobipede.fr
            </WelcomeButtonItem>

            <WelcomeButtonItem
              download={true}
              type="application/pdf"
              href={`/downloads/LeVelobipede_Tarification_2021-08-01.pdf`}
            >
              <IconFileTypePdf className="mr-2" />
              Tarifs
            </WelcomeButtonItem>

            <WelcomeButtonItem
              download={true}
              type="application/pdf"
              href={`/downloads/LeVelobipede_CGRV_202109.pdf`}
            >
              <IconFileTypePdf className="mr-2" />
              Conditions générales
            </WelcomeButtonItem>
          </Grid>
        </Card>
      </div>
    </div>
  );
}
