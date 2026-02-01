import {
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Code,
  Sparkles,
} from "lucide-react";
import { ReactNode } from "react";

export interface TimelineItem {
  iconType:
    | "calendar"
    | "briefcase"
    | "graduation"
    | "award"
    | "book"
    | "code"
    | "sparkles";
  period: string;
  title: string;
  description?: string;
  link: string;
}

interface TimelineItemComponentProps {
  item: TimelineItem;
  index: number;
}

const getIcon = (iconType: string): ReactNode => {
  const iconClass = "size-4";
  switch (iconType) {
    case "calendar":
      return <Calendar className={iconClass} />;
    case "briefcase":
      return <Briefcase className={iconClass} />;
    case "graduation":
      return <GraduationCap className={iconClass} />;
    case "award":
      return <Award className={iconClass} />;
    case "book":
      return <BookOpen className={iconClass} />;
    case "code":
      return <Code className={iconClass} />;
    case "sparkles":
      return <Sparkles className={iconClass} />;
    default:
      return <Calendar className={iconClass} />;
  }
};

export function TimelineItemComponent({ item }: TimelineItemComponentProps) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 group md:hover:border hover:bg-muted/30 border-dashed px-0 py-6 border-b  md:p-6"
    >
      <span className="flex items-center shrink-0 text-muted-foreground border-muted-foreground/50 border-dashed justify-center w-10 h-10 bg-background border-1 rounded-full">
        {getIcon(item.iconType)}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">{item.period}</span>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
      </div>
    </a>
  );
}
