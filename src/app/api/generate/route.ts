import { POST as openrouterPOST } from "@/lib/openrouter";

export async function POST(req: Request) {
  return openrouterPOST(req);
}


