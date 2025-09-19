import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { db } from "~/server/db"
import { Polar } from "@polar-sh/sdk"; 
import { env } from "~/env";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { isBreakStatement } from "typescript";
const polarClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server: env.POLAR_SERVER
});

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true, 
      }, 
      plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "436ae17c-46cf-4fa8-be31-1a087101e227", // ID of Product from Polar Dashboard
                            slug: "small" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        },
                        {
                            productId: "c51b24f9-4460-4d50-8d95-c1e3ed88669e", // ID of Product from Polar Dashboard
                            slug: "medium" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        },
                        {
                            productId: "d2f7d26c-7d62-45de-9614-ba29367f6159", // ID of Product from Polar Dashboard
                            slug: "large" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
                        },
                    ],
                    successUrl: "/",
                    authenticatedUsersOnly: true
                }),
                portal(),
                
                webhooks({
                    secret: env.POLAR_WEBHOOK_SECRET ?? env.POLAR_ACCESS_TOKEN,
                    onOrderPaid: async (order) => {
                        const externalCustomerId = order.data.customer.externalId;

                        if(!externalCustomerId)
                        {
                            console.error("NO external customer ID found.")
                            throw new Error("No external cut id found")
                        }
                        const productId = order.data.productId;
                        let creditstoAdd=0;

                        switch(productId) {
                            case "436ae17c-46cf-4fa8-be31-1a087101e227":
                                creditstoAdd = 10;
                                break;
                            case "c51b24f9-4460-4d50-8d95-c1e3ed88669e":
                                creditstoAdd = 25;
                                break;
                            case "d2f7d26c-7d62-45de-9614-ba29367f6159":
                                creditstoAdd = 20;
                                break;
                        }
                        await db.user.update({
                            where: {id: externalCustomerId},
                            data: {
                                credits: {
                                    increment: creditstoAdd,
                                },
                            },
                        })
                    }
                }),
            ],
        })
    ]
});
