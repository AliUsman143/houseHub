import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    await connectDB();
    const { name, propertyAddress } = await request.json();
    
    if (!name || !propertyAddress) {
      return NextResponse.json(
        { error: 'Name and property address are required' },
        { status: 400 }
      );
    }

    const newUser = new User({ name, propertyAddress });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}