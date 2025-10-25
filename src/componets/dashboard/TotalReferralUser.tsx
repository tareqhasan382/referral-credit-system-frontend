"use client";

import React, { useEffect, useState } from "react";
import { Users, Gift,ShoppingBag, Copy, Check } from "lucide-react";
import useReferralStore from "@/store/useReferralStore";
import useAuthStore from "@/store/useAuthStore";
import LoginModal from "@/componets/LoginModal";
import useCartStore from "@/store/useCartStore";
import CartModal from "@/componets/CartModal";

const TotalReferralUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<string[] | null>(null);
    const [copied, setCopied] = useState<boolean>(false);
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((s) => s.token);
    const getReferrals = useReferralStore(
        (state) => (state as unknown).getReferrals as () => Promise<void>
    );
    const { items, totalItems,totalPrice  } = useCartStore();
    const [isOpen, setIsOpen] = useState(false);
    // console.log("totalItems--->", totalItems);
    // console.log("items--->", items?.length);
    // console.log("totalPrice--->", totalPrice);

    const handleClose = () => {
        setIsModalOpen(false);
    };
    const handleDeactivate = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (!user?.email) {
            setIsModalOpen(true);
        }else {
            setIsModalOpen(false);
        }
    }, [user?.email]);
    const fetchReferrals = async () => {
        try {
            const res = await getReferrals();
            setData(res);
        } catch (error) {
            console.error("Failed to fetch referrals:", error);
        }
    };

    useEffect(() => {
        if (token) fetchReferrals();
    }, [token]);

    // Copy referral code
    const handleCopy = () => {
        if (!user?.referralCode) return;
        navigator.clipboard.writeText(user.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white p-6 shadow-lg border border-gray-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className={"w-full"}>
                    <div className={" flex flex-row items-center justify-between"}>
                    <h2 className="text-2xl font-bold text-gray-800">Referral Overview</h2>
                        <div className={"flex flex-row items-center gap-2"}>

                            <div className="relative cursor-pointer" onClick={() => setIsOpen(true)}>
                                <ShoppingBag size={28} className="text-gray-700 hover:text-gray-900 transition" />

                                {/* Badge */}
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
        {totalItems}
      </span>
                                )}
                            </div>
                          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              onClick={() => setIsModalOpen(true)}
                          >
                              Sign in
                          </button>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <span>Referral Code:</span>
                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
              <span className="font-mono font-medium text-indigo-600">
                {user?.referralCode || "—"}
              </span>
                            <button
                                onClick={handleCopy}
                                className="p-1 text-gray-500 hover:text-indigo-600 transition"
                                title="Copy Code"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                        {copied && (
                            <span className="text-green-600 text-xs font-medium ml-1">
                Copied!
              </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total Referred Users */}
                <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                        <Users size={22} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Referred Users</p>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {data?.totalReferredUsers ?? 0}
                        </h3>
                    </div>
                </div>

                {/* Users Who Purchased */}
                <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                        <ShoppingBag size={22} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Users Purchased</p>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {data?.referredUsersWhoPurchased ?? 0}
                        </h3>
                    </div>
                </div>

                {/* Total Credits Earned */}
                <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                        <Gift size={22} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Credits Earned</p>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {data?.totalCreditsEarned ?? 0}
                        </h3>
                    </div>
                </div>
            </div>
            <LoginModal isOpen={isModalOpen} onClose={handleClose} onDeactivate={handleDeactivate}/>
            <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default TotalReferralUser;
