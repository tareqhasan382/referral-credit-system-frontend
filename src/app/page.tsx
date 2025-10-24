"use client"

import useAuthStore from "@/store/useAuthStore";
import {useEffect, useState} from "react";


export default function Home() {
    const user = useAuthStore((state) => state.user);
    const [isHydrated, setIsHydrated] = useState(false);
    // wait for Zustand hydration
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <div>Loading...</div>;
    }

     // Set to true to display immediately

  return (
    <div>
      <h1 className="text-base font-bold bg-orange-500 h-[300px] ">Hello World!   <hr/> <hr/>
          <p>{user?._id}</p>
          <p>{user?.name}</p>
          <p>{user?.email}</p>

      </h1>

      <h1 className="text-base font-bold bg-green-500 h-[300px]">Hello World!</h1>
      <h1 className="text-base font-bold bg-blue-500 h-[300px]">Hello World!</h1>
      <h1 className="text-base font-bold bg-amber-400 h-[300px]">Hello World!</h1>
    </div>
  );
}
