import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-slate-100">
      <div className="flex w-full justify-between container py-4">
        <div>
          <h1 className="text-3xl font-bold">
            Skill<span className="text-purple-700">Sphere</span>
          </h1>
          <span>skillsphere@gmail.com</span>
        </div>
        <div className="flex flex-col">
          <Link href="/legal">legal</Link>
          <Link href="/privacypolicy">Privacy policy</Link>
          <Link href="/cookiespolicy">Cookies policy</Link>
        </div>
      </div>
      <div className="flex container justify-between py-4">
        <div>© SkillSphere {new Date().getFullYear()}</div>
        <div className="flex gap-2">
          <Link href="#" className="w-7">
            <Image src="icons/twitterf.svg" alt="" width={25} height={25} />
          </Link>
          <Link href="#" className="w-7">
            <Image src="icons/instagramf.svg" alt="" width={25} height={25} />
          </Link>
          <Link href="#" className="w-7">
            <Image src="icons/facebookf.svg" alt="" width={25} height={25} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
