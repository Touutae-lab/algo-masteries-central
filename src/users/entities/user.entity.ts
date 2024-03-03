import { index, uniqueIndex, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username').unique(),
    email: varchar('email').unique(),
    password: text('password'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
}, (users) => {
    const usernameIdx = index("username_idx").on(users.username, users.email);

    // const emailIdx = index("email_idx").on(users.email);

    return {
        usernameIdx,
        // emailIdx
    }
});

