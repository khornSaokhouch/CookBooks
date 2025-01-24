"use server";

import { query } from "@/app/lib/db";

// Fetch user by ID
export async function getUserById(userId: number) {
  try {
    const rows = (await query("SELECT * FROM user WHERE user_id = ?", [
      userId,
    ])) as any[];
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data.");
  }
}

// Update user by ID
export async function updateUser(userId: number, userData: any) {
  try {
    const { user_name, email, about_me, image_url } = userData;

    // Validate required fields
    if (!user_name || !email) {
      return { success: false, error: "Name and email are required." };
    }

    // Check if the email already exists for another user (skip if it belongs to the same user)
    const existingUserWithEmail = (await query(
      "SELECT * FROM user WHERE email = ? AND user_id != ?",
      [email, userId]
    )) as any[];

    if (existingUserWithEmail.length > 0) {
      return {
        success: false,
        error: "Email already exists. Please use a different email.",
      };
    }

    // Convert undefined values to null for optional fields
    const updatedAboutMe = about_me === undefined ? null : about_me;
    const updatedImageUrl = image_url === undefined ? null : image_url;

    // Update user data
    await query(
      "UPDATE user SET user_name = ?, email = ?, about_me = ?, image_url = ? WHERE user_id = ?",
      [user_name, email, updatedAboutMe, updatedImageUrl, userId]
    );

    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Error updating user data:", error);
    return { success: false, error: "Failed to update user data." };
  }
}
