"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRecoilState } from "recoil";
import { userState } from "@/store/atoms/user";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserState {
  username: {
    username?: string;
    email?: string;
    userId?: string;
  };
  loading: boolean;
}

const Profilebutton = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState<UserState>(userState);

  const logoutHandler = async () => {
    const res = await axios.get("api/user/logout");
    console.log(res.data);

    window.location.reload();
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarFallback>X</AvatarFallback>
            <AvatarImage src="data:image/jpeg;base64,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" />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] flex flex-col gap-4 ">
          {!user.username && (
            <div className="flex flex-col gap-4">
              <Button variant={"ghost"} onClick={() => router.push("/signup")}>
                Signup
              </Button>
              <Button onClick={() => router.push("/signin")}>Signin</Button>
            </div>
          )}
          {user.username && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between items-center">
                <span className="font-bold text-2xl">
                  <span className="text-purple-600">Hi </span>
                  {user.username.username}
                </span>
                <Button variant={"secondary"}>profile</Button>
              </div>
              <div className="m-auto">
                <Button size={"sm"} onClick={logoutHandler}>
                  logout
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Profilebutton;
