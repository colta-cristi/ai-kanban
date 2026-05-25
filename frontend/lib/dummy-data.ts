import type { Board } from "./types";

export const initialBoard: Board = {
  columns: [
    {
      id: "col-1",
      title: "Backlog",
      cards: [
        {
          id: "card-1",
          title: "Research competitors",
          details: "Review top 5 Kanban tools and note UX patterns.",
        },
        {
          id: "card-2",
          title: "Define color tokens",
          details: "Document accent, primary, and secondary palette in CSS.",
        },
        {
          id: "card-3",
          title: "Sketch board layout",
          details: "Wireframe five columns with horizontal scroll.",
        },
      ],
    },
    {
      id: "col-2",
      title: "Ready",
      cards: [
        {
          id: "card-4",
          title: "Set up Next.js project",
          details: "Scaffold frontend with TypeScript and Tailwind.",
        },
        {
          id: "card-5",
          title: "Create shared types",
          details: "Card, Column, and Board interfaces in lib/types.",
        },
      ],
    },
    {
      id: "col-3",
      title: "In Progress",
      cards: [
        {
          id: "card-6",
          title: "Build column component",
          details: "Header with rename, card list, and add-card form.",
        },
        {
          id: "card-7",
          title: "Implement drag and drop",
          details: "Move cards within and across columns using dnd-kit.",
        },
      ],
    },
    {
      id: "col-4",
      title: "Review",
      cards: [
        {
          id: "card-8",
          title: "Polish card styling",
          details: "Shadows, hover states, and typography per brand guide.",
        },
      ],
    },
    {
      id: "col-5",
      title: "Done",
      cards: [
        {
          id: "card-9",
          title: "Write unit tests",
          details: "Cover board-actions and key component behaviors.",
        },
        {
          id: "card-10",
          title: "Add dummy seed data",
          details: "Populate board with realistic sample cards on load.",
        },
      ],
    },
  ],
};
