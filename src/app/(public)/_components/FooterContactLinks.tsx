import { Icon, IconMail, IconMap2, IconPhoneCall } from "@tabler/icons-react";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

type LinkItemData = {
  icon: Icon;
  text: string | ReactNode;
  href: string;
  title: string;
};
function FooterContactLinkItem(data: LinkItemData) {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <data.icon />
      <Link
        prefetch={false}
        href={data.href}
        title={data.title}
        className="text-white"
      >
        {data.text}
      </Link>
    </div>
  );
}

export default function FooterContactLinks() {
  const links: LinkItemData[] = [
    {
      icon: IconMail,
      text: "contact@velobipede.fr",
      title: "Envoyer un email",
      href: "mailto:Le%20V%C3%A9lobip%C3%A8de<contact@velobipede.fr>?subject=Contact%20site&body=Je%20d%C3%A9cris%20mon%20probl%C3%A8me%0D%0AJe%20donne%20mes%20coordonn%C3%A9es",
    },
    {
      icon: IconPhoneCall,
      text: "06.71.49.55.61",
      title: "Composer le 0671495561",
      href: "tel:+33671495561",
    },
    {
      icon: IconMap2,
      text: (
        <>
          Le Vélobipède
          <br />
          27 rue Georges Lizé
          <br />
          72100 Le Mans
        </>
      ),
      title: "Ouvrir dans Google Maps",
      href: "https://maps.app.goo.gl/1Tg936xBtQbsec647",
    },
  ];

  return (
    // <div className="mx-auto block sm:ml-0">
    <div className="mx-auto flex flex-col items-center justify-start gap-y-1.5 sm:ml-0 sm:items-start">
      {links.map((data, idx) => {
        return (
          <Fragment key={data.title}>
            <FooterContactLinkItem {...data} />
          </Fragment>
        );
      })}
    </div>
    // </div>
  );
}
