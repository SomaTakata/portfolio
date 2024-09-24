import LinkCard from "./LinkCard";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";

const linkItems = [
  {
    name: "X",
    icon: <XIcon className="size-8 sm:size-16 " />,
    href: "https://twitter.com",
  },
  {
    name: "Github",
    icon: <GitHubIcon className="size-8 sm:size-16 " />,
    href: "https://github.com",
  },
  {
    name: "Zenn",
    icon: (
      <span className="text-xl font-bold text-black sm:text-4xl lg:text-5xl">
        Zenn
      </span>
    ),
    href: "https://zenn.dev",
  },
];

const LinkSection = () => (
  <section className="flex flex-col gap-6 border-b-2 border-black  bg-gray-100 px-5 py-14  sm:gap-12 sm:px-10 md:px-14  md:py-32 lg:gap-16  lg:border-b-[3px]">
    <div className="grid w-full grid-cols-3 gap-8 lg:grid-cols-3 xl:grid-cols-3">
      {linkItems.map((link, index) => (
        <LinkCard key={index} icon={link.icon} href={link.href} />
      ))}
    </div>
  </section>
);

export default LinkSection;
