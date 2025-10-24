"use client"
import useAuthStore from "@/store/useAuthStore";
import {useEffect, useState} from "react";

const Profile =()=>{
    const user = useAuthStore((state) => state.user);
    const [isHydrated, setIsHydrated] = useState(false);
    // wait for Zustand hydration
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return <div>Loading...</div>;
    }
    return <div>
        <h1>Profile</h1>
        <div>
            <p>{user?._id}</p>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.referralCode}</p>
        </div>
    </div>
}

export default Profile;