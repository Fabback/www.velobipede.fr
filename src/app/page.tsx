import { IconBackhoe } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="p-60">
      <div className="page-vertical-flow flex flex-col items-center">
        <IconBackhoe size={50} />
        <div className="text-4xl">En cours de construction</div>
      </div>
    </main>
  );
}
