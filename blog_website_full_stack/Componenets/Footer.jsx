import { assets } from "@/Assets/assets";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-r from-slate-900 via-indigo-950 to-violet-950 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <Image src={assets.logo_light} alt="Blog logo" width={120} />
        <p className="text-sm text-indigo-200/80 text-center">
          All rights reserved · Copyright © Blogger
        </p>
        <div className="flex gap-3 opacity-90 hover:opacity-100 transition-opacity">
          <Image src={assets.facebook_icon} alt="Facebook" width={36} height={36} />
          <Image src={assets.twitter_icon} alt="Twitter" width={36} height={36} />
          <Image src={assets.googleplus_icon} alt="Google Plus" width={36} height={36} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
