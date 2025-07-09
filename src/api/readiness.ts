import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";

export function handlerReadiness(_req: Request, res: Response) {
	respondWithJSON(res, 200, { status: "ok" });
}
