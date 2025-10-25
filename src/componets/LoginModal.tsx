import React, { useState } from 'react';
import LoginForm from "@/componets/LoginForm";
import RegisterForm from "@/componets/RegisterForm";
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeactivate?: () => void;
}

type AuthView = 'login' | 'register';

const LoginModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [currentView, setCurrentView] = useState<AuthView>('login');
    if (!isOpen) {
        return null;
    }

    const title = currentView === 'login' ? 'Welcome Back!' : 'Create an Account';

    const switchMessage = currentView === 'login'
        ? "Don't have an account?"
        : "Already have an account?";

    const switchActionText = currentView === 'login' ? 'Sign Up' : 'Log In';
    const switchActionView: AuthView = currentView === 'login' ? 'register' : 'login';
    const handleRegisterSuccess = () => {
        setCurrentView('login');
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 p-4">

            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto transform transition-all">
                <div className="p-6">

                    <div className="mb-6 text-center">

                        <h3 className="text-2xl font-bold text-gray-900">
                            {title}
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {currentView === 'login' ? <LoginForm onClose={onClose} /> : <RegisterForm  onSuccess={handleRegisterSuccess}/>}
                    </div>
                    <div className="mt-6 text-center text-sm">
                        <p>
                            {switchMessage}
                            <button
                                type="button"
                                className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                                onClick={() => setCurrentView(switchActionView)}
                            >
                                {switchActionText}
                            </button>
                        </p>
                    </div>

                </div>

                <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg border-t">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

            </div>

        </div>
    );
};

export default LoginModal;