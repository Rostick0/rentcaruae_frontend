import { defineEventHandler, readRawBody } from "h3";
import { checkComponentExists } from "../utils/checkComponent";

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event);
  const { componentPath } = JSON.parse(body);

  return checkComponentExists(componentPath);
});
