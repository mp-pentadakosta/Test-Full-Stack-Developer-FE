import { FiHome } from "react-icons/fi";
import { LuUsersRound } from "react-icons/lu";
import { IoIosApps } from "react-icons/io";

export const siteConfig = {
  name: "Base Next Js",
  description: "Make beautiful websites regardless of your design experience.",
  logo: "/img/logo.svg",
  navItems: [
    {
      label: "Home",
      href: "/home",
      icon: <FiHome color={`#F3F4F6`} size={20} />,
      child: [],
    },
    {
      label: "Customers",
      href: "/customer",
      icon: <LuUsersRound color={`#F3F4F6`} size={20} />,
      child: [],
    },
    {
      label: "Apps",
      href: "",
      icon: <IoIosApps color={`#F3F4F6`} size={20} />,
      child: [
        {
          label: "Apps 1",
          href: "/apps-1",
        },
        {
          label: "Apps 2",
          href: "/apps-2",
        },
      ],
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
