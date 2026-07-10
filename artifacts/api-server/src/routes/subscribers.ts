import { Router, type IRouter } from "express";
import { CreateSubscriberBody } from "@workspace/api-zod";
import { db, subscribersTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/subscribers", async (req, res) => {
  const parsed = CreateSubscriberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid email" });
    return;
  }

  try {
    const [created] = await db
      .insert(subscribersTable)
      .values({ email: parsed.data.email })
      .returning();

    res.status(201).json({ id: created.id, email: created.email });
  } catch (err: unknown) {
    const cause =
      typeof err === "object" && err !== null && "cause" in err
        ? (err as { cause?: unknown }).cause
        : undefined;
    const code =
      (typeof err === "object" && err !== null && "code" in err
        ? (err as { code?: string }).code
        : undefined) ??
      (typeof cause === "object" && cause !== null && "code" in cause
        ? (cause as { code?: string }).code
        : undefined);

    if (code === "23505") {
      res.status(409).json({ message: "Email already subscribed" });
      return;
    }

    req.log.error({ err }, "Failed to create subscriber");
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
