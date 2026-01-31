import { cn } from "@/utils/utils";
import { Sparkle } from "lucide-react";

export interface SkillItem {
  name: string;
  experience: string;
  proficiency: number;
  description: string;
  category: string;
  link?: string;
}

interface SkillItemComponentProps {
  skill: SkillItem;
  index: number;
  totalItems: number;
}

export function SkillItemComponent({
  skill,
  index,
  totalItems,
}: SkillItemComponentProps) {
  const containerClass = cn(
    "relative w-full p-6 hover:bg-muted/30 transition-all group/item border-dashed",
    {
      "border-b": index < totalItems - 1,
      "lg:border-b-0": index >= totalItems - 2,
      "lg:border-b": index < totalItems - 2,
    },
    {
      "lg:border-r": index % 2 === 0 && index !== totalItems - 1,
    },
  );

  const content = (
    <>
      {(index === 0 || index === totalItems - 1) && (
        <Sparkle
          className={cn("absolute w-4 h-4 z-10 fill-current hidden md:block", {
            "-bottom-2 -right-2": index === 0,
            "-top-2 -left-2": index === totalItems - 1,
          })}
        />
      )}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-full">
                {skill.category}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {skill.experience}
            </span>
          </div>
          <div className="text-right">
            {/* Show a discrete level label instead of percentage */}
            {(() => {
              // 4段階表示に変更（"Expert" を除去）
              const levelIndex = Math.min(
                3,
                Math.max(0, Math.floor(skill.proficiency / 25)),
              );
              const levelNames = [
                "Beginner",
                "Novice",
                "Intermediate",
                "Advanced",
              ];
              return (
                <span className="text-sm font-medium text-primary">
                  {levelNames[levelIndex]}
                </span>
              );
            })()}
          </div>
        </div>

        {/* Replace continuous percentage bar with 4 discrete segments */}
        <div className="flex items-center gap-2 mt-2">
          {(() => {
            const segments = 4;
            const filled = Math.min(
              segments,
              Math.max(0, Math.round((skill.proficiency / 100) * segments)),
            );
            return Array.from({ length: segments }).map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={cn(
                  "inline-block w-8 h-2 rounded-full",
                  i < filled ? "bg-primary" : "bg-muted/40",
                )}
              />
            ));
          })()}
        </div>

        {skill.description && (
          <p className="text-sm text-muted-foreground">{skill.description}</p>
        )}
      </div>
    </>
  );

  if (skill.link) {
    return (
      <a
        href={skill.link}
        target="_blank"
        rel="noopener noreferrer"
        className={containerClass}
      >
        {content}
      </a>
    );
  }

  return <div className={containerClass}>{content}</div>;
}
