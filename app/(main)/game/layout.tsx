export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full w-full">
      <div className={`flex flex-col`}>{children}</div>
    </section>
  );
}
