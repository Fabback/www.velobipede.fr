import {
  Icon,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Link from "next/link";

type SocialLinkItemData = {
  icon: Icon;
  href: string;
  title: string;
};

function FooterSocialLinkItem(data: SocialLinkItemData) {
  return (
    <Link href={data.href} target="_blank" title={data.title} prefetch={false}>
      <svg
        viewBox="0 0 48 48"
        width="48"
        height="48"
        style={{ cursor: "pointer" }}
      >
        <circle cx="24" cy="24" r="24" fill="white" />
        <data.icon color="black" x={9} y={10} width={28} height={28} />
      </svg>
    </Link>
  );
}

export default function FooterSocialLinks() {
  const socialLinks: SocialLinkItemData[] = [
    {
      icon: IconBrandFacebook,
      title: "Visitez ma page Facebook",
      href: "https://www.facebook.com/LeVelobipede/",
    },
    {
      icon: IconBrandInstagram,
      title: "Visites ma page Instagram",
      href: "https://www.instagram.com/le.velobipede/",
    },
  ];

  return (
    <div className="flex flex-row justify-end gap-2">
      {socialLinks.map((data, idx) => {
        return (
          <div key={data.title}>
            <FooterSocialLinkItem {...data} />
          </div>
        );
      })}
    </div>
  );
}
