import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md fixed w-full bg-white">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" height={30} width={30} />
        <h2 className="text-xl font-semibold">AI Video Generator</h2>
      </div>
      <div className="flex items-center gap-3">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
