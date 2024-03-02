import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').unique(),
    password: text('password'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

