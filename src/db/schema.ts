import { relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),

  headline: text("headline"),
  bio: text("bio"),
  location: text("location"),
  tokenBalance: integer("token_balance").default(2).notNull(), // Bonus 2 jetons
  reputationScore: decimal("reputation_score", {
    precision: 3,
    scale: 2,
  }).default("5.00"),
  totalSessions: integer("total_sessions").default(0),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  mentorId: text("mentor_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  category: text("category").notNull(),
  tokenCost: integer("token_cost").notNull(),
  description: text("description"),
  duration: integer("duration").notNull().default(60),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  skillId: uuid("skill_id")
    .notNull()
    .references(() => skills.id),
  learnerId: text("learner_id")
    .notNull()
    .references(() => user.id),
  scheduledFor: timestamp("scheduled_for"),
  endTime: timestamp("end_time"),
  status: text("status").default("scheduled").notNull(), // 'scheduled', 'completed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  amount: integer("amount").notNull(),
  type: text("type").notNull(), // 'purchase', 'exchange', 'bonus'
  fiatAmount: decimal("fiat_amount", { precision: 10, scale: 2 }).default(
    "0.00",
  ),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id)
    .unique(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  skills: many(skills),
  bookings: many(bookings),
  transactions: many(transactions),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  mentor: one(user, { fields: [skills.mentorId], references: [user.id] }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  skill: one(skills, { fields: [bookings.skillId], references: [skills.id] }),
  learner: one(user, { fields: [bookings.learnerId], references: [user.id] }),
  review: one(reviews, {
    fields: [bookings.id],
    references: [reviews.bookingId],
  }),
}));

export const schema = {
  user,
  session,
  account,
  verification,
  skills,
  bookings,
  transactions,
  reviews,
};
