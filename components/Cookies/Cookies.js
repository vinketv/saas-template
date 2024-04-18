'use client'

import { useState, useEffect } from 'react';

export default function Cookies() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowModal(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', JSON.stringify({ analytics: true, marketing: true }));
        setShowModal(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', JSON.stringify({ analytics: false, marketing: false }));
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <>
            <div className="fixed bottom-4 right-4 w-3/4 h-auto md:w-1/2 xl:w-1/4 rounded shadow-2xl bg-white">
                <div className="flex flex-col justify-center text-center">
                    <div className="m-7">
                        <h4 className="text-slate-900 text-lg font-semibold">Cookies</h4>
                        <p className="text-sm">This website uses cookies to ensure you get the best experience on our platform. Cookies help us personalize content, provide social media features, and analyze our traffic. We also share information about your use of our site with our social media, advertising, and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.</p>
                    </div>
                    <div className="border-b-2 border-slate-200 w-1/2 m-auto"></div>
                    <div className="flex flex-row gap-4 justify-center my-5">
                        <button onClick={handleDecline} className="p-2 cursor-pointer bg-indigo-100 rounded-md px-3.5 py-2.5 text-sm font-semibold text-black">decline</button>
                        <button onClick={handleAccept} className="p-2 cursor-pointer bg-black rounded-md px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-black/75">Agree</button>
                    </div>
                </div>
            </div>
        </>
    );
};