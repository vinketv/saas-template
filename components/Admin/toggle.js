"use client";

// toggle.js
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Selected from "./selected";

export function ToggleButton({ user }) {
  const [modal, setModal] = useState(false);
  const { toast } = useToast();

  const toggleDrawer = () => {
    setModal(!modal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id, // Assurez-vous que cette ID est disponible dans le scope.
          data: data,
        }),
      });

      if (!response.ok) {
        const text = await response.text(); // Lire comme texte en premier
        toast({
          variant: "destructive",
          description: text,
          status: "error",
        });
      } else {
        console.log("User updated successfully");
        // Gérer le succès ici
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      toast({
        variant: "destructive",
        description: `Failed to fetch data: ${error.message}`,
        status: "error", // Vous pouvez ajouter un statut pour personnaliser l'apparence du toast
      });
    }
  };

  return (
    <>
      {/* <!-- Modal toggle button --> */}
      <a
        onClick={() => toggleDrawer()}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
      >
        Edit user
      </a>
      {/* <!-- Modal edit user --> */}
      <div
        tabIndex="-1"
        aria-hidden="true"
        className={`top-0 left-0 z-50 w-screen h-screen p-4 bg-[rgba(0,0,0,0.5)] ${
          modal ? "fixed" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-2xl max-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* <!-- Modal content --> */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow-md dark:bg-gray-700"
          >
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit user
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleDrawer}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={user.username}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Bonnie"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <Selected role={user.role}></Selected>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@company.com"
                    defaultValue={user.email}
                    required=""
                  />
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Change
              </button>
              {user.role != "banned" ? (
                <span className="text-white cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Ban
                </span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
