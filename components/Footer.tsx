import Container from "./Container";
import FooterTop from "./FooterTop";
import SocialMedia from "./SocialMedia";
import { categoriesData, quickLinksData } from "@/Constants";
import Link from "next/link";
import { Separator } from "./ui/separator";
import LogoWhite from "./LogoWhite";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  return (
    <footer className="bg-darkColor border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Logo and Links */}
          <div className="grid space-y-4">
            <LogoWhite className="text-2xl text-white">
              FearNot Lifestyle
            </LogoWhite>
            <p className="text-white text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              eligendi asperiores alias fugit in adipisci iure molestias ipsa.
            </p>
            <SocialMedia
              className="text-white/80"
              iconClassName="border-white/80 hover:border-white hover:text-white"
              toolTipClassName="bg-white text-darkColor"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {quickLinksData?.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-white/80 font-medium text-sm hover:text-white hoverEffect"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories Link */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              {categoriesData?.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-white/80 font-medium text-sm hover:text-white hoverEffect"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* News letter */}
          <div>
            <NewsletterForm />
          </div>
        </div>
        <div className="pt-6">
          <Separator />
          <p className="text-center text-sm text-white/80 py-4">
            Copyright © {new Date().getFullYear()} FearNot Lifestyle. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
