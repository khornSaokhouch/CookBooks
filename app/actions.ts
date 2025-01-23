"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "@/app/lib/db";
import bcrypt from "bcrypt";

// 🟢 LOGIN FUNCTION
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Login attempt:", { email, password }); // Log login attempt

  if (!email || !password) {
    console.log("❌ Email and password are required.");
    return { ok: false, error: "Email and password are required." };
  }

  let user;
  try {
    console.log("🔍 Fetching user from database...");
    const users = (await query("SELECT * FROM user WHERE email = ?", [
      email,
    ])) as any[];
    console.log("✅ Query result:", users); // Log the query result
    user = users[0];

    if (!user) {
      console.log("❌ User not found.");
      return { ok: false, error: "User not found." };
    }

    console.log("✅ User found:", user); // Log the user data
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", passwordMatch); // Log the password comparison result

    if (!passwordMatch) {
      console.log("❌ Invalid password.");
      return { ok: false, error: "Invalid password." };
    }

    console.log("✅ Password match successful.");
    try {
      const userData = {
        id: user.user_id.toString(),
        user_name: user.user_name,
        email: user.email,
        role: user.role,
      };

      await (
        await cookies()
      ).set("user", JSON.stringify(userData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      console.log("✅ Cookie set successfully:", userData); // Log the cookie data
    } catch (error) {
      console.error("❌ Failed to set cookie:", error);
      return { ok: false, error: "Failed to set cookie. Please try again." };
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    return {
      ok: false,
      error: "An error occurred during login. Please try again.",
    };
  }

  // Ensure redirection based on user role
  return {
    ok: true,
    success: true,
    redirect: user.role === "Admin" ? "/dashboard" : "/",
  };
}

// 🟢 REGISTER FUNCTION
export async function register(formData: FormData) {
  const user_name = formData.get("name") as string; // Use `user_name` instead of `name`
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("📝 Registration attempt:", { user_name, email, password });

  if (!user_name || !email || !password) {
    console.log("❌ All fields are required.");
    return { error: "All fields are required." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    console.log("🔍 Checking if email already exists...");
    const existingUser = (await query("SELECT * FROM user WHERE email = ?", [
      email,
    ])) as any[];
    if (existingUser.length > 0) {
      console.log("❌ Email already exists.");
      return { error: "Email already exists. Please use a different email." };
    }

    console.log("✅ Inserting new user into the database...");
    await query(
      "INSERT INTO user (user_name, email, password, role, status) VALUES (?, ?, ?, ?, ?)",
      [user_name, email, hashedPassword, "User", true]
    );

    console.log("✅ Registration successful.");
    const newUser = {
      user_name,
      email,
      role: "User", // Ensure role is set correctly
    };

    await (
      await cookies()
    ).set("user", JSON.stringify(newUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      success: true,
      user: newUser,
      message: "Registration successful!",
    };
  } catch (error) {
    console.error("❌ Registration error:", error);
    return { error: "Registration failed. Please try again." };
  }
}

// 🟢 LOGOUT FUNCTION
export async function logout() {
  const user = (await cookies()).get("user");
  if (!user) {
    return redirect("/");
  }

  (await cookies()).delete("user");
  return redirect("/");
}
