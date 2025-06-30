import connectDB from "../../../lib/mongoose";
import AddProfileUser from "@/models/AddProfile";
import { NextResponse } from "next/server";
import { saveFileLocally } from "@/lib/fileUpload";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

export async function POST(request) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const phoneNo = formData.get('phoneNo');
    const password = formData.get('password');
    const profilePicture = formData.get('profilePicture');

    // Validation
    if (!username || !email || !phoneNo || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await AddProfileUser.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Handle file upload
    let imagePath = '';
    if (profilePicture && profilePicture.size > 0) {
      const arrayBuffer = await profilePicture.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imagePath = await saveFileLocally(buffer, profilePicture.name);
    }

    // Create new profile (remember to hash password in production!)
    const newProfile = new AddProfileUser({
      username,
      email,
      phoneNo,
      password,
      profilePicture: imagePath || undefined
    });

    await newProfile.save();

    return NextResponse.json(
      { 
        message: "Profile created successfully",
        profile: {
          id: newProfile._id,
          username,
          email,
          phoneNo,
          profilePicture: imagePath
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create profile" },
      { status: 500 }
    );
  }
}


// import connectDB from "../../../lib/mongoose";
// import AddProfileUser from "@/models/AddProfile";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     await connectDB();
//     const { username, email, phoneNo } = await request.json();

//     // Validate input
//     if (!username || !email || !phoneNo) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     // Create new user profile
//     const newUser = new AddProfileUser({ username, email, phoneNo });
//     await newUser.save();

//     return NextResponse.json({ message: "Profile created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating profile:", error);
//     return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
//   }
// }