import Image from "next/image";
import { Name } from "./name";
import { Description } from "@radix-ui/react-dialog";

interface CardProfileProps {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
  }
}
export function CardProfile({ user }: CardProfileProps) {
  return (
    <section className="w-full flex flex-col items-center mx-auto px-4">
      <div>
        <Image
          src={user.image ?? "https://github.com/devfraga.png"}
          alt="Matheus Fraga"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full select-none object-cover"
        />

      </div>
      <div>
        <Name
          initialName={user.name ?? "Digite seu nome"}
        />
        <Description
          initialDescription={user.bio ?? "Digite sua biografia"}
        />
      </div>
    </section>
  )
}