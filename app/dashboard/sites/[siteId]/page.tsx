import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/utils/db";
import {
  Book,
  FileIcon,
  MoreHorizontal,
  PlusCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/app/components/dashboard/EmptyState";

// Define the type for the data returned by getData
type PostData = {
  Site: any;
  image: string | null;
  title: string;
  createdAt: Date;
  id: string;
};

async function getData(userId: string, siteId: string) {
  /* const data = await prisma.post.findMany({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      image: true,
      title: true,
      createdAt: true,
      id: true,
      Site: {
        select: {
          subdirectory: true,
        },
      },
    },
  }); */

  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          image: true,
          title: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return data;
}

export default async function SiteIdRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id, params.siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant={"secondary"}>
          <Link href={`/blog/${data?.subdirectory}`}>
            <Book className="size-4 mr-2" />
            View blog
          </Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href={`/dashboard/sites/${params.siteId}/settings`}>
            <Settings className="size-4 mr-2" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="size-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>

      {data?.posts.length === 0 ? (
        <EmptyState 
          title="You don't have any Articles Created!" 
          description= "Please Create article to see them."
          buttonText= "Create Article"
          href={`/dashboard/sites/${params.siteId}/create`}
        />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Article</CardTitle>
              <CardDescription>
                Manage your articles in a simple and intuitive interface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.posts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image ?? "/path/to/default/image.png"} // Fallback image
                          width={64}
                          height={64}
                          alt="Cover Image"
                          className="size-16 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500"
                        >
                          Published
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                        }).format(item.createdAt)}
                      </TableCell>

                      <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/sites/${params.siteId}/${item.id}`} 
                                    className="cursor-pointer"
                                >
                                Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href={`/dashboard/sites/${params.siteId}/${item.id}/delete`}>
                                  Delete
                                </Link>
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
