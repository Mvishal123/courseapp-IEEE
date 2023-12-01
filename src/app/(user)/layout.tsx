import UserHeader from "@/components/UserHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="z-50">
        <UserHeader />
      </div>
      <div>{children}</div>
    </div>
  );
}
