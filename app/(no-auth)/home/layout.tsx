export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full w-full">
      <div className={`flex flex-col px-4 lg:px-8 py-4`}>{children}</div>
    </section>
  );
}
