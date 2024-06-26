export const Princing = async () => {
  const list = [
    {
      name: "Starter",
      description: "Best option for personal use & for your next project.",
      price: "Free",
      recurence: false,
      option: [
        "Individual configuration",
        "No setup, or hidden fees",
        {
          name: "Team size: ",
          description: "1 developer",
        },
        {
          name: "Premium support: ",
          description: "6 months",
        },
        {
          name: "Free updates: ",
          description: "6 months",
        },
      ],
    },
    {
      name: "Company",
      description: "Relevant for multiple users, extended & premium support.",
      price: "$99",
      recurence: "month",
      option: [
        "Individual configuration",
        "No setup, or hidden fees",
        {
          name: "Team size: ",
          description: "10 developer",
        },
        {
          name: "Premium support: ",
          description: "24 months",
        },
        {
          name: "Free updates: ",
          description: "24 months",
        },
      ],
    },
    {
      name: "Enterprise",
      description:
        "Best for large scale uses and extended redistribution rights.",
      price: "$499",
      recurence: "month",
      option: [
        "Individual configuration",
        "No setup, or hidden fees",
        {
          name: "Team size: ",
          description: "100+ developer",
        },
        {
          name: "Premium support: ",
          description: "36 months",
        },
        {
          name: "Free updates: ",
          description: "36 months",
        },
      ],
    },
  ];
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-16 px-4 mx-auto max-w-screen-xl lg:py-32 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black dark:text-white">
              Designed for business teams like yours
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/* <!-- Pricing Card --> */}

            {list.map((feature, id) => (
              <div
                key={id}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-black bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
              >
                <h3 className="mb-4 text-2xl font-semibold text-black">
                  {feature.name}
                </h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  {feature.description}
                </p>
                {feature.recurence ? (
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">
                      {feature.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /{feature.recurence}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">
                      {feature.price}
                    </span>
                  </div>
                )}

                {/* <!-- List --> */}
                <ul role="list" className="mb-8 space-y-4 text-left">
                  {feature.option.map((feature, id) => (
                    <li key={id} className="flex items-center space-x-3">
                      {/* <!-- Icon --> */}
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {feature.name ? (
                        <span>
                          {feature.name}{" "}
                          <span className="font-semibold">
                            {feature.description}
                          </span>
                        </span>
                      ) : (
                        <span>{feature}</span>
                      )}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="text-white bg-primary hover:bg-primary/75 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
                >
                  Get started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
