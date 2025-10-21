import { Metadata } from "next";
import { title, description } from "../lib/metadata";
import Rocket from "../components/rocket";

export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_URL ?? "";
  return {
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: `${url}/icon.png`,
        ogTitle: title,
        ogDescription: description,
        ogImageUrl: `${url}/icon.png`,
        button: {
          // existing button config
        },
      }),
    },
  };
}

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center px-4">
      <span className="text-2xl">{title}</span>
      <span className="text-muted-foreground">{description}</span>
      <div className="mt-8">
        <Rocket />
      </div>
    </main>
  );
}
