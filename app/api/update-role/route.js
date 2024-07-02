// pages/api/updateRole.js

import { withAuth } from "@clerk/nextjs/api";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerkClient = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

const handler = withAuth(async (req, res) => {
  const { method } = req;
  const { userId, role } = req.body;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("Request received:", { userId, role });

  try {
    const user = await clerkClient.users.getUser(userId);
    console.log("User fetched:", user);

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role,
      },
    });

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "Failed to update user role" });
  }
});

export default handler;
