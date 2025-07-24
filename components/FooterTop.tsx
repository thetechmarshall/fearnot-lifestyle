import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: Props[] = [
  {
    title: "Visit Us",
    subtitle: "Owerri, Imo State, Nigeria.",
    icon: (
      <MapPin className="text-white/80 group-hover:text-white transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+234 80 0000 0000",
    icon: (
      <Phone className="text-white/80 group-hover:text-white transition-colors" />
    ),
  },
  {
    title: "Delivery Hours",
    subtitle: "Mon - Sat: 10:00 AM - 6:00 PM",
    icon: (
      <Clock className="text-white/80 group-hover:text-white transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "fearnotlifestyle@gmail.com",
    icon: (
      <Mail className="text-white/80 group-hover:text-white transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {data?.map((item, index) => (
        <ContactItem
          key={index}
          icon={item?.icon}
          title={item?.title}
          subtitle={item?.subtitle}
        />
      ))}
    </div>
  );
};

const ContactItem = ({ icon, title, subtitle}: Props) => {
  return <div className="flex items-center gap-3 group p-4 transition-colors">
    {icon}
    <div>
        <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-white/90 text-sm pt-1 group-hover:text-white transition-colors">{subtitle}</p>
    </div>
  </div>;
};

export default FooterTop;
