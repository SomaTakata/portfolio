import { ExternalLink, Calendar, BookOpen, Users } from "lucide-react";
import { ReactNode } from "react";

export interface NewsItem {
  iconType: "BookOpen" | "Users";
  date: string;
  title: string;
  description?: string;
  category: string;
  link?: string;
  type: string;
}

interface NewsItemComponentProps {
  item: NewsItem;
  index: number;
}

const getIcon = (iconType: string) => {
  const iconMap: { [key: string]: React.FC<any> } = {
    BookOpen,
    Users,
  };
  const IconComponent = iconMap[iconType];
  return IconComponent ? (
    <IconComponent className="w-5 h-5 text-muted-foreground/60" />
  ) : null;
};

export function NewsItemComponent({ item, index }: NewsItemComponentProps) {
  return (
    <div
      className={
        `flex items-center w-full gap-4 group border-b border-dashed py-6 md:px-6 hover:bg-muted/30 ` +
        (index === 0 ? "hover:border" : "hover:border")
      }
    >
      <div className="flex items-start gap-4 w-full">
        <span className="flex items-center text-muted-foreground border-muted-foreground/50 border-dashed justify-center w-10 h-10 bg-background border-1 rounded-full group-hover:bg-background group-hover:text-foreground flex-shrink-0">
          {getIcon(item.iconType)}
        </span>

        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-600">
              {item.type}
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

          {item.description && (
            <p className="text-sm text-muted-foreground mb-3">
              {item.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-3">
              <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                {item.category}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink size={14} />
                  View Details
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border border-dashed border-transparent rounded-lg pointer-events-none"></div>
    </div>
  );
}
