import { dbConnect } from "@/lib/db";
import User from "@/model/model_user";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("app/api/register/route: Request Body:", body);

    const { email, password, name, username } = body;

    if (!email || !password || !name || !username) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      User_Id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      username,
      picture: "/avatar.svg",
    });

    await user.save();
    return NextResponse.json("User created", { status: 200 });
  } catch (err: any) {
    console.error("app /api/register/route: Error creating user:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
