import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  toolTipClassName?: string;
}

const socialLink = [
  {
    title: "Instagram",
    href: "/",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "/",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Whatsapp",
    href: "/",
    icon: <FaWhatsapp className="w-5 h-5" />,
  },
  {
    title: "Twitter",
    href: "/",
    icon: <Twitter className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, toolTipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link
                href={item?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-white hoverEffect",
                  iconClassName
                )}
              >
                {item?.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-white text-darkColor font-semibold",
                toolTipClassName
              )}
            >
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
