"use client"
import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

export default function Upgrade() {
    const upgrade = async () => {
        await authClient.checkout({
            products: [
                "436ae17c-46cf-4fa8-be31-1a087101e227",
                "c51b24f9-4460-4d50-8d95-c1e3ed88669e",
                "d2f7d26c-7d62-45de-9614-ba29367f6159"
            ],
        });
    }
    return (
    <Button variant="outline" 
            size="sm"
            className="ml-2 cursor-pointer text-orange-400"
            onClick={upgrade}
    >
        Upgrade
    </Button>
    );
}