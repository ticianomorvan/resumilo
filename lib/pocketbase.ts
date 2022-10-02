import Pocketbase from "pocketbase";

export const client = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE)