  import connectDB from "../../../lib/mongoose";
  import AddProfileUser from "@/models/AddProfile";
  import { NextResponse } from "next/server";

  export async function GET() {
    try {
      await connectDB();
      const profiles = await AddProfileUser.find().sort({ createdAt: -1 });
      
      return NextResponse.json(
        { 
          profiles: profiles.map(profile => ({
            id: profile._id.toString(),
            username: profile.username,
            email: profile.email,
            phoneNo: profile.phoneNo,
            profilePicture: profile.profilePicture || "https://placehold.co/40x40/cccccc/ffffff?text=U"
          }))
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return NextResponse.json(
        { error: "Failed to fetch profiles" },
        { status: 500 }
      );
    }
  }