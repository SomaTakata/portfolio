import { ReactNode } from "react";

export interface TimelineItem {
  icon: ReactNode;
  period: string;
  title: string;
  description?: string;
  link: string;
}

interface TimelineItemComponentProps {
  item: TimelineItem;
  index: number;
}

export function TimelineItemComponent({ item }: TimelineItemComponentProps) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 group hover:border hover:bg-muted/30 border-dashed p-6"
    >
      <span className="flex items-center shrink-0 text-muted-foreground border-muted-foreground/50 border-dashed justify-center w-10 h-10 bg-background border-1 rounded-full">
        {item.icon}
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
