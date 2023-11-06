"use client";
import { useSession, signOut } from "next-auth/react";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Profilebutton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignout = async () => {
    try {
      await signOut();
      toast.success("Logout successfull");
      router.push("/signin");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarFallback>X</AvatarFallback>
            {session && <AvatarImage src={`${session.user?.image}`} />}
            {!session && (
              <AvatarImage
                src={`/icons/profile.svg`}
                className="h-10 bg-slate-300 p-1"
              />
            )}
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] flex flex-col gap-4 ">
          {!session?.user && (
            <div className="flex flex-col gap-4">
              <Button variant={"ghost"} onClick={() => router.push("/signup")}>
                Signup
              </Button>
              <Button onClick={() => router.push("/signin")}>Signin</Button>
            </div>
          )}
          {session?.user && (
            <div className="flex flex-col gap-4">
              <Button variant={"ghost"} onClick={() => router.push("/profile")}>
                <User className="mr-2 " />
                Profile
              </Button>
              <Button
                onClick={async () => {
                  await signOut();
                  toast.success("Logout successfull");
                  router.push("/signin");
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Profilebutton;
