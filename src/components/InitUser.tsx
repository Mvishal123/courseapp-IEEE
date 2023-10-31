"use client";
import { BASE_URL } from "@/config";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/user";
import { useEffect } from "react";
import axios from "axios";

export const InitUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const init = () => {
    // console.log("user value 1 -> ", user.username);

    axios
      .get(`${BASE_URL}/api/user/me`)
      .then((res) => {
        console.log("res in init user -> ", res.data.data);

        setUser({
          username: res.data.data,
          loading: false,
        });
      })
      .catch((error: any) => {
        console.log("error in init user -> ", error);

        setUser({
          username: "",
          loading: false,
        });
      });
  };

  // console.log("response: ", res.data);

  //   if (!res.data.data.username) {
  //     setUser({
  //       username: "",
  //       loading: false,
  //     });
  //   } else {
  //     setUser({
  //       username: res.data.data,
  //       loading: false,
  //     });
  //   }
  // } catch (error: any) {
  //   setUser({
  //     username: "",
  //     loading: false,
  //   });
  // }

  // const user = useRecoilValue(userState);
  useEffect(() => {
    init();
  }, []);

  return <></>
};
