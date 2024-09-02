import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"
import { SubmitButton } from "../dashboard/SubmitButtons"
import Link from "next/link"
import { CreateSubscription } from "@/app/actions"

interface iAppProps {
    id: number,
    cardTitle: string,
    cardDescription: string,
    priceTitle: string,
    benefits: string[],
}

export const PricingPlans: iAppProps[] =[
    {
        id: 0,
        cardTitle: "FreeLancer",
        cardDescription: "The best pricing plan for people starting out.",
        benefits: [
            "Only 3 Site.",
            "Up to 20 Articles.",
            "Limited/ 1000 Visitors per Article"
        ],
        priceTitle: "Free",
    },
    {
        id: 1,
        cardTitle: "StartUp",
        cardDescription: "The Pricing plan for Professional.",
        priceTitle: '₹2500',
        benefits: [
            "Unlimeted Site",
            "Unlimeted Articles",
            "Unlimeted Visitors"
        ]
    } 
]

export function PricingTable() {
    return (
        <>
            <div className="max-w-3xl mx-auto text-center">
                <p className="font-semibold text-primary text-2xl">Pricing</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Pricing Plans for everyone and every budget!</h1>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">Choose the plan that best suits your needs and get started today! No hidden fees, cancel anytime.</p>

            <div className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-2">
                {PricingPlans.map((item) => (
                    <Card key={item.id} className={item.id === 1 ? 'border border-primary' : ""}>
                        <CardHeader>
                            <CardTitle>
                                {item.id === 1 ? (
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-primary">StartUp</h1>
                                        <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">Most Popular</p>
                                    </div>
                                ): <>{item.cardTitle}</>}
                            </CardTitle>
                            <CardDescription>{item.cardDescription}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mt-6 text-4xl font-bold tracking-tight text-primary">
                                {item.priceTitle}
                            </p>

                            <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                {item.benefits.map((benefits, index) => (
                                    <li key={index} className="flex gap-x-3">
                                        <CheckIcon className="text-primary size-4" />

                                        {benefits}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {item.id === 1 ? (
                                <form className="w-full" action={CreateSubscription}>
                                    <SubmitButton text="Buy Plan" className="mt-5 w-full" />
                                </form>
                            ): (
                                <Button variant="outline" className="mt-5 w-full">
                                    <Link href="/dashboard">Try for Free</Link>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}