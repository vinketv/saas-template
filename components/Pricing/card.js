import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export const Cards = async () => {
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
      name: "Pro",
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
      name: "Business",
      description: "Best option for personal use & for your next project.",
      price: "Contact us",
      recurence: false,
      option: [
        "Individual configuration",
        "No setup, or hidden fees",
        {
          name: "Team size: ",
          description: "Unlimited",
        },
        {
          name: "Premium support: ",
          description: "Unlimited",
        },
        {
          name: "Free updates: ",
          description: "Unlimited",
        },
      ],
    },
  ];
  return (
    <>
      <section className="bg-slate-100 h-full overflow-auto">
        <div className="flex flex-col py-4 px-4 mx-auto lg:h-full max-w-screen-xl lg:align-middle lg:justify-center bg-slate-100">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 bg-slate-100">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black dark:text-white">
              Please select a plan
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div>
          <div className="space-y-8 sm:grid xl:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
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

                {feature.name === "Pro" ? (
                  <form>
                    <Button
                      className="bg-primary hover:bg-primary/75"
                      formAction={async () => {
                        "use server";
                        const authSession = await auth();
                        const user = await prisma.user.findUnique({
                          where: {
                            id: authSession?.user?.id ?? "",
                          },
                          select: {
                            stripeCustomerId: true,
                          },
                        });

                        const stripeCustomerId =
                          user?.stripeCustomerId ?? undefined;

                        const session = await stripe.checkout.sessions.create({
                          customer: stripeCustomerId,
                          mode: "subscription",
                          payment_method_types: ["card", "link"],
                          line_items: [
                            {
                              price:
                                process.env.NODE_ENV === "development"
                                  ? "price_1PEfXADuKVm8plmgsD5bYeEf"
                                  : "",
                              quantity: 1,
                            },
                          ],
                          success_url: "http://localhost:3000/success",
                          cancel_url: "http://localhost:3000/cancel",
                        });

                        if (!session.url) {
                          throw new Error("url session missing!");
                        }
                        redirect(session.url);
                      }}
                    >
                      Get started
                    </Button>
                  </form>
                ) : null}

                {feature.name === "Starter" ? (
                  <form>
                    <Button
                      className="bg-primary hover:bg-primary/75"
                      formAction={async () => {
                        "use server";
                        const authSession = await auth();
                        const user = await prisma.user.update({
                          where: {
                            id: authSession?.user?.id ?? "",
                          },
                          data: {
                            plan: "FREE",
                          },
                        });

                        redirect("/dashboard");
                      }}
                    >
                      Get started
                    </Button>
                  </form>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
