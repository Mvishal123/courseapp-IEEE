import UserHeader from "@/components/UserHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="bg-[#f1f5f9] ">
        <UserHeader />
      </div>
      <div>{children}</div>
    </div>
  );
}
