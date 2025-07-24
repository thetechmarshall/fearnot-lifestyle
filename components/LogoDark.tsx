import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import logoWhite from "@/images/logoWhite.png"

interface Props {
  children: React.ReactNode;
  className?: string;
}

const LogoDark = ({ children, className }: Props) => {
  return (
    <Link href={"/"}>
      <div className="flex justify-start items-center gap-2.5 hover:scale-105 hoverEffect">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-darkColor rounded-full flex items-center justify-center drop-shadow-amber-50">
          <Image src={logoWhite} alt="logo" className="w-4 md:w-6 h-4 md:h-6" />
        </div>
        <h2
          className={cn(
            "text-xl md:text-2xl text-darkColor font-black font-brushstrike uppercase tracking-wider",
            className
          )}
        >
          {children}
        </h2>
      </div>
    </Link>
  );
};

export default LogoDark;
