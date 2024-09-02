import prisma from "@/app/utils/db"; // Assuming prisma is correctly set up in this path
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Reached /api/auth/creation endpoint");

        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            console.error("Failed to retrieve user:", user);
            throw new Error("User not found or user ID is missing");
        }

        console.log("User data:", user);

        let dbUser = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    id: user.id,
                    firstName: user.given_name ?? "",
                    lastName: user.family_name ?? "",
                    email: user.email ?? "",
                    profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
                    customerId: user.customerId ?? "", 
                },
            });
            console.log("User created in the database:", dbUser);
        } else {
            console.log("User already exists in the database:", dbUser);
        }

        return NextResponse.redirect("http://localhost:3000/dashboard");

    } catch (error) {
        console.error("Error occurred:", error.message);
        return NextResponse.error();
    }
}