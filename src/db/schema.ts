import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { pgTable, serial, text, varchar, UniqueConstraint } from 'drizzle-orm/pg-core';
import postgres from 'postgres';


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email').unique(),
    password: text('password'),
    created_at: text('created_at').default('now()'),
    updated_at: text('updated_at').$default(null)
}, (users) => {
    return {
        unique: new UniqueConstraint('unique_email', [users.email])
    }
})