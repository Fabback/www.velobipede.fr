import Image from "next/image";
import Link from "next/link";

import bav_logo_image from "@public/assets/images/BaV_logo_noir_160x160.png";
import cargo_silhouette_image from "@public/assets/images/velocargo.svg";

export default function SectionDecoAndBav() {
  return (
    <section className="page-vertical-flow mt-8">
      <div className="flex flex-col-reverse items-center gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div className="relative h-20 w-48">
          <Image
            src={cargo_silhouette_image}
            alt="Cargo silouette"
            className="cargo_silhouette"
            fill={true}
            style={{ left: 0, bottom: 0 }}
            priority
          />
        </div>

        <div className="relative w-[80%] sm:w-96 sm:p-0 sm:pl-1">
          <Image
            src={bav_logo_image}
            width={80}
            height={80}
            className="float-right m-1"
            alt="Logo Les Boites à Vélo"
          ></Image>

          <p>
            Pour plus d&apos;infos sur l&apos;entreprenariat à vélo,
            renseignez-vous auprès de l&apos;association{" "}
            <Link
              href="https://lesboitesavelo.org/"
              target="_blank"
              rel="noopener"
              prefetch={false}
            >
              Les Boites à Vélo
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
