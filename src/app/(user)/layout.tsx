import UserHeader from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserHeader />
      <div>{children}</div>
    </div>
  );
}
