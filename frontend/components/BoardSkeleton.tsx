import { initialBoard } from "@/lib/dummy-data";

export function BoardSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="shrink-0 border-b-4 border-accent bg-navy px-6 py-5">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Project Board
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Drag cards between columns to update status
        </p>
      </header>

      <div
        className="flex flex-1 gap-4 overflow-x-auto p-6"
        data-testid="board-columns"
      >
        {initialBoard.columns.map((column) => (
          <section
            key={column.id}
            className="flex w-72 shrink-0 flex-col rounded-xl bg-column-bg shadow-sm"
            data-testid={`column-${column.id}`}
          >
            <div className="h-1 rounded-t-xl bg-accent" />
            <header className="px-4 pt-4 pb-2">
              <h2 className="text-sm font-semibold text-navy">{column.title}</h2>
              <p className="mt-1 text-xs text-gray">
                {column.cards.length}{" "}
                {column.cards.length === 1 ? "card" : "cards"}
              </p>
            </header>
            <div className="flex flex-1 flex-col gap-3 px-3 pb-3">
              {column.cards.map((card) => (
                <article
                  key={card.id}
                  className="rounded-lg border border-black/5 bg-card-bg p-4 shadow-sm"
                  data-testid={`card-${card.id}`}
                >
                  <h3 className="text-sm font-semibold text-navy">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">
                    {card.details}
                  </p>
                </article>
              ))}
            </div>
            <footer className="px-3 pb-4">
              <div className="w-full rounded-lg border border-dashed border-primary/40 py-2 text-center text-sm font-medium text-primary">
                Add card
              </div>
            </footer>
          </section>
        ))}
      </div>
    </div>
  );
}
