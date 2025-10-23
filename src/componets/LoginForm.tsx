"use client"
import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import useAuthStore from "@/store/useAuthStore";
import {LoginPayload} from "@/types/auth";



const LoginForm: React.FC = () => {
    const loginUser = useAuthStore(state => (state as any).loginUser as (payload: LoginPayload) => Promise<void>);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('All fields are required.');
            return;
        }
        try {
            setIsLoading(true);
            const payload: LoginPayload = { email, password };
            await loginUser(payload);
            setEmail('');
            setPassword('');

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown registration error occurred.';
            console.error("Registration failed:", error);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [ email, password, loginUser]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Login Account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    New user?{' '}
                    <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Error Message Display */}
                    {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Password (min 8 characters)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`group relative flex justify-center w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                            isLoading
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging...
              </span>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;