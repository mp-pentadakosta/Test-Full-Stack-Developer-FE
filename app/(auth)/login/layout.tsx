import { Link } from "@heroui/link";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-full">
      {children}
      <footer className="w-full flex items-center justify-center">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com?utm_source=next-app-template"
          title="heroui.com homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Tengkuang Onet</p>
        </Link>
      </footer>
    </section>
  );
}
