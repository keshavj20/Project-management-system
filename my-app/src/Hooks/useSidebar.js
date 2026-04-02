
import { LibraryBig, ListChecks } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { UsersRound } from "lucide-react";
import { ClipboardCheck } from "lucide-react";
// Create context
// const SidebarContext = createContext();                                                                                  

export const useSidebar = () => {
  const [searchParams] = useSearchParams();
  const getSidebarItems = (pathname) => {
    const pathParts = pathname.split("/").filter(Boolean);
    const basePath = pathParts[0];
    const projectId = searchParams.get("projectId");
const isActive = (path) => location.pathname + location.search === path;
    if (basePath === "my-project" && projectId) {
      return [
        {
          text: "Tasks",
          icon: React.createElement(ClipboardCheck),
          path: `/my-project/detail/task?projectId=${projectId}`,
          active: isActive(`/my-project/detail/task?projectId=${projectId}`),
        },
        {
          text: "Team",
          icon: React.createElement(UsersRound),
          path: `/my-project/detail/team?projectId=${projectId}`,
          active: isActive(`/my-project/detail/team?projectId=${projectId}`)
        },
      ];
    }

    const defaultMenu = [
      {
        text: "My Project",
        icon: React.createElement(LibraryBig),
        path: "/my-project",
        active: isActive("/my-project")
      },
      {
        text: "My Task",
        icon: React.createElement(ListChecks),
        path: "/my-task",
        active:isActive("/my-task")
      },
    ];

    return defaultMenu;
  };

  return { getSidebarItems };
};
