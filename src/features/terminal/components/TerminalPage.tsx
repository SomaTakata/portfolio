"use client";

import {
  Terminal,
  ExternalLink,
  BookOpen,
  Users,
  Globe,
  Smartphone,
  ShoppingCart,
  BarChart3,
  Music,
  Code2,
  User,
} from "lucide-react";
import { useState, useEffect, useRef, ReactNode } from "react";
import { useTranslations } from "next-intl";

const getNewsIcon = (iconType: string): ReactNode => {
  const iconClass = "size-4";
  switch (iconType) {
    case "BookOpen":
      return <BookOpen className={iconClass} />;
    case "Users":
      return <Users className={iconClass} />;
    default:
      return <BookOpen className={iconClass} />;
  }
};

const getProjectIcon = (iconType: string): ReactNode => {
  const iconClass = "size-4";
  switch (iconType) {
    case "globe":
      return <Globe className={iconClass} />;
    case "smartphone":
      return <Smartphone className={iconClass} />;
    case "cart":
      return <ShoppingCart className={iconClass} />;
    case "chart":
      return <BarChart3 className={iconClass} />;
    case "music":
      return <Music className={iconClass} />;
    case "book":
      return <BookOpen className={iconClass} />;
    case "code":
      return <Code2 className={iconClass} />;
    case "user":
      return <User className={iconClass} />;
    default:
      return <Globe className={iconClass} />;
  }
};

export default function TerminalPage() {
  const tSkills = useTranslations("skills");
  const tNews = useTranslations("news");
  const tProjects = useTranslations("projects");
  const tTerminal = useTranslations("terminal");

  const SKILLS_DATA = tSkills.raw("items");
  const NEWS_DATA = tNews.raw("items");
  const PROJECTS_DATA = tProjects.raw("items");
  const TERMINAL_TIMELINE_DATA = tTerminal.raw("timeline");
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [commandHistory, setCommandHistory] = useState<
    { command: string; response: React.ReactNode }[]
  >([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    let response: React.ReactNode = "";

    switch (lowerCommand) {
      case "help":
        response =
          "Available commands: help, ls, cat career.log, cat skills.json, cat news/, clear, whoami, pwd, date";
        break;
      case "ls":
        response = "career.log  skills.json  projects/  news/";
        break;
      case "cat career.log":
        response = (
          <div>
            {TERMINAL_TIMELINE_DATA.map((item, idx) => (
              <div key={idx} className="mb-3 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>[{item.date}]</span>
                  <span className="text-muted-foreground">
                    ─────────────────────────
                  </span>
                </div>
                <div className="ml-4 mt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                    <span
                      className={`font-semibold ${getTypeColor(item.type)}`}
                    >
                      {item.output}
                    </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  {item.description && (
                    <div className="text-muted-foreground text-xs mt-1 ml-6">
                      └─ {item.description}
                    </div>
                  )}
                </div>
                {idx < TERMINAL_TIMELINE_DATA.length - 1 && (
                  <div className="text-muted-foreground mt-2">
                    ├─────────────────────────────────────────
                  </div>
                )}
              </div>
            ))}
          </div>
        );
        break;
      case "cat skills.json":
        response = (
          <div className="space-y-3">
            <div className="text-cyan-500 dark:text-cyan-400 font-semibold mb-4">
              {"{"}
            </div>
            <div className="ml-4 space-y-4">
              <div className="text-yellow-500 dark:text-yellow-400">
                "skills": [
              </div>
              {SKILLS_DATA.map((skill, idx) => (
                <div key={idx} className="ml-8 space-y-1">
                  <div className="text-muted-foreground">{"{"}</div>
                  <div className="ml-4 space-y-1">
                    <div className="text-green-500 dark:text-green-400">
                      "name": "{skill.name}",
                    </div>
                    <div className="text-green-500 dark:text-green-400">
                      "experience": "{skill.experience}",
                    </div>
                    <div className="text-green-500 dark:text-green-400">
                      "proficiency": {skill.proficiency},
                    </div>
                    <div className="text-green-500 dark:text-green-400">
                      "description": "{skill.description}",
                    </div>
                    <div className="text-green-500 dark:text-green-400">
                      "category": "{skill.category}"
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    {"}"}
                    {idx < SKILLS_DATA.length - 1 ? "," : ""}
                  </div>
                </div>
              ))}
              <div className="text-yellow-500 dark:text-yellow-400">]</div>
            </div>
            <div className="text-cyan-500 dark:text-cyan-400 font-semibold">
              {"}"}
            </div>
          </div>
        );
        break;
      case "cat news/":
      case "cat news":
        response = (
          <div className="space-y-3">
            <div className="text-cyan-500 dark:text-cyan-400 font-semibold mb-4">
              Latest News & Articles
            </div>
            {NEWS_DATA.map((news, idx) => (
              <div
                key={idx}
                className="border-l-2 border-blue-400 pl-4 ml-2 mb-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  {getNewsIcon(news.iconType)}
                  <span>[{news.date}]</span>
                  <span className="bg-muted px-2 py-1 rounded text-xs">
                    {news.category}
                  </span>
                </div>
                <div className="mt-2">
                  <a
                    href={news.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 dark:text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 transition-colors"
                  >
                    {news.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <div className="text-muted-foreground text-sm mt-1">
                    {news.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "cat projects/":
        response = (
          <div className="space-y-3">
            <div className="text-cyan-500 dark:text-cyan-400 font-semibold mb-4">
              Projects
            </div>
            {PROJECTS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="border-l-2 border-green-400 pl-4 ml-2 mb-4"
              >
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  {getProjectIcon(item.iconType)}
                  <span>{item.period}</span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === "Live"
                        ? "bg-green-500/20 text-green-600"
                        : "bg-orange-500/20 text-orange-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="mt-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg text-primary">
                      {item.title}
                    </span>
                  </div>
                  {item.description && (
                    <div className="text-muted-foreground text-sm mt-1">
                      {item.description}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:underline"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </a>
                    )}
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:underline"
                      >
                        <Terminal size={14} />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "clear":
        setCommandHistory([]);
        return;
      case "whoami":
        response = "Software Engineer & Full-stack Developer";
        break;
      case "pwd":
        response = "/home/user/portfolio";
        break;
      case "date":
        response = new Date().toLocaleString();
        break;
      case "":
        return;
      default:
        response = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    setCommandHistory((prev) => [...prev, { command, response }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentCommand);
      setCurrentCommand("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex].command);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex].command);
        }
      }
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "education":
        return "🎓";
      case "work":
        return "💼";
      case "leadership":
        return "👑";
      default:
        return "📋";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "education":
        return "text-blue-400";
      case "work":
        return "text-green-400";
      case "leadership":
        return "text-yellow-400";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="max-w-full overflow-x-auto p-4 space-y-1 text-green-500 dark:text-green-400 font-mono text-sm">
      {commandHistory.map((entry, idx) => (
        <div key={idx} className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 dark:text-blue-400">
              user@portfolio
            </span>
            <span className="text-primary">~</span>
            <span className="text-yellow-500  dark:text-yellow-400">$</span>
            <span className="text-green-500 dark:text-green-400">
              {entry.command}
            </span>
          </div>
          <div className="text-muted-foreground ml-4">{entry.response}</div>
        </div>
      ))}

      {!isTyping && (
        <div className="flex items-center gap-2">
          <span className="text-blue-500 dark:text-blue-400">
            user@portfolio
          </span>
          <span className="text-primary">~</span>
          <span className="text-yellow-500  dark:text-yellow-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-green-500 dark:text-green-400 outline-none flex-1 font-mono"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      )}
    </div>
  );
}
