import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import argon2 from "argon2";

import { userSchema, type User } from "~/models";
import { db } from "~/db";
import { users } from "~/db/schema";
import { eq } from "drizzle-orm";

export let authenticator = new Authenticator<User>();

authenticator.use(
  new FormStrategy(async ({ form, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const newUser = userSchema.parse(formData);

    if (newUser.email !== "lucasamonrc@gmail.com") {
      throw new Error("Invalid email");
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, newUser.email))
      .limit(1);

    if (!user) {
      throw new Error("User not found");
    }

    const passwordHash = await argon2.verify(user.password, newUser.password);

    if (!passwordHash) {
      throw new Error("Invalid password");
    }

    return { id: user.id, email: user.email };
  })
);
