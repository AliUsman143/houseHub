import connectDB from "../../../lib/mongoose";
import AddProfileUser from "@/models/AddProfile";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const phoneNo = formData.get('phoneNo');
    const password = formData.get('password');
    const profilePicture = formData.get('profilePicture');

    if (!username || !email || !phoneNo || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await AddProfileUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    let imageUrl = '';
    if (profilePicture && profilePicture.size > 0) {
      const arrayBuffer = await profilePicture.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // Implement your file upload logic here
      // imageUrl = await uploadImageToCloudinary(buffer);
      imageUrl = `data:${profilePicture.type};base64,${buffer.toString('base64')}`;
    }

    const newProfile = new AddProfileUser({
      username,
      email,
      phoneNo,
      password,
      profilePicture: imageUrl
    });

    await newProfile.save();

    return NextResponse.json(
      { 
        message: "Profile created successfully",
        profile: {
          username,
          email,
          phoneNo,
          profilePicture: imageUrl
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}

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