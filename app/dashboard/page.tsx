import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "../components/dashboard/EmptyState";
import prisma from "../utils/db"
import { requireUser } from "../utils/requireUser";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Defaultimage from "@/public/default.png"


async function getData(userId: string) {
   
    const [sites, articles] = await Promise.all([
            prisma.site.findMany({
                where: {
                    userId: userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 3
            }),
            prisma.post.findMany({
                    where: {
                        userId: userId,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 3
                }),
            ])

        return { sites, articles }
}


export default async function DashboardIndexPage() {
    const user = await requireUser();
    const {articles, sites} = await getData(user.id);
    return (
        <div>
            <h1 className="text-2xl font-semibold">Your Sites</h1>
            {sites.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {sites.map((item) => (
                    <Card key={item.id}>
                        <Image 
                        src={item.imageUrl ?? Defaultimage} 
                        alt={item.name}
                        className="rounded-t-lg object-cover w-full h-[200px]"
                        width={400}
                        height={200}
                        />
                    <CardHeader>
                        <CardTitle className="truncate">{item.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild>
                            <Link className="w-full" href={`/dashboard/sites/${item.id}`}>View Articles</Link>
                        </Button>  
                    </CardFooter>
                    </Card>
                ))}
            </div>
            ): (
                <EmptyState 
                title="You don't have any Sites Created." 
                description="You currently don't have any Sites. To view please create some to se them."
                href="/dashboard/sites/new"
                buttonText="Create Site"
            />
            )}

        <h1 className="text-2xl mt-10 font-semibold mb-5">Recent Articles</h1>
        {articles.length > 0 ? (
             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
             {articles.map((item) => (
                 <Card key={item.id}>
                     <Image 
                     src={item.image ?? Defaultimage} 
                     alt={item.title}
                     className="rounded-t-lg object-cover w-full h-[200px]"
                     width={400}
                     height={200}
                     />
                 <CardHeader>
                     <CardTitle className="truncate">{item.title}</CardTitle>
                     <CardDescription className="line-clamp-2">{item.smallDescription}</CardDescription>
                 </CardHeader>
                 <CardFooter>
                     <Button asChild>
                         <Link className="w-full" href={`/dashboard/sites/${item.siteId}/${item.id}`}>Edit Articles</Link>
                     </Button>  
                 </CardFooter>
                 </Card>
             ))}
         </div>
        ): (
            <EmptyState  
                title="You don't have any Articles Created." 
                description="You currently don't have any Articles. To view please create some to see them."
                href="/dashboard/sites"
                buttonText="Create Article"
            />
        )}
        </div>
    )
}