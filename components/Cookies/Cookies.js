"use client";

import { useEffect, useState } from "react";

export default function Cookies() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({ analytics: true, marketing: true })
    );
    setShowModal(false);
  };

  const handleDecline = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({ analytics: false, marketing: false })
    );
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <>
      <div className="fixed bottom-0 right-0 md:bottom-4 md:right-4  h-auto md:w-1/2 xl:w-1/4 rounded shadow-2xl bg-white">
        <div className="flex flex-col justify-center text-center">
          <div className="m-7">
            <h4 className="text-primary text-lg font-semibold">Cookies</h4>
            <p className="text-sm">
              This website uses cookies in order to offer you the most relevant
              information. Please accept cookies for optimal performance. Read
              our privacy policy.
            </p>
          </div>
          <div className="border-b-2 border-slate-200 w-1/2 m-auto"></div>
          <div className="flex flex-row gap-4 justify-center my-5">
            <button
              onClick={handleDecline}
              className="p-2 cursor-pointer bg-primary/25 rounded-md px-3.5 py-2.5 text-sm font-semibold text-primary"
            >
              decline
            </button>
            <button
              onClick={handleAccept}
              className="p-2 cursor-pointer bg-primary rounded-md px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-primary/75"
            >
              Agree
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
