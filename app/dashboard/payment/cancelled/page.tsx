import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function CanclledRoute() {
    return (
        <div className="w-full flex flex-1 justify-center items-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <XIcon className="size-12 p-2 rounded-full bg-red-500/50 text-red-500" />
                    </div>

                    <div className="mt-3 text-center sm:mt-5 w-full">
                            <h2 className="text-xl font-semibold">Payment Canclled</h2>
                            <p className="text-sm mt-2 text-muted-foreground tracking-tight">No worries, you want be charged please try again.</p>
                            <Button className="w-full mt-5" asChild>
                                <Link href="/dashboard">
                                    Go Back to Dashboard
                                </Link>
                            </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}