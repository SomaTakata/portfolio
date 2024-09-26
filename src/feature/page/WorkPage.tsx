import WorkCard from "../components/WorkCard";
import ClientLayout from "../../client/ClientLayout";

const workItems = [
  {
    title: "フロントエンド",
    year: "2024",
    projectName: "NginLink",
    projectLink: "https://github.com/SomaTakata/ngin-link",
    imageSrc: "/nginlink.png",
  },
  {
    title: "フロントエンド",
    year: "2024",
    projectName: "DevQuest",
    projectLink: "https://github.com/SomaTakata/dev-quest",
    imageSrc: "/devquest.png",
  },
  {
    title: "フロントエンド",
    year: "2024",
    projectName: "都道府県人口推移",
    projectLink: "https://github.com/SomaTakata/yumemi-coding-test",
    imageSrc: "/population.png",
  },
];

const WorkPage = () => (
  <ClientLayout>
    <section className="flex z-10 min-h-screen w-full bg-white flex-col gap-6 px-5 py-14 pb-20 sm:gap-12 sm:px-10 md:px-14 md:py-32 lg:gap-16 lg:border-t-[3px]">
      <h2 className="font-roboto text-4xl font-black tracking-widest text-white text-stroke sm:text-5xl">
        WORK
      </h2>

      <div className="grid w-full grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {workItems.map((work) => (
          <WorkCard
            key={work.projectLink}
            title={work.title}
            year={work.year}
            projectName={work.projectName}
            projectLink={work.projectLink}
            imageSrc={work.imageSrc}
          />
        ))}
      </div>
    </section>
  </ClientLayout>
);

export default WorkPage;
