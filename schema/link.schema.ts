import { z } from "zod";

const urlRegex =
  /^(?!.*(?:localhost|127\.0\.0\.1))(?:(?:https?|ftp):\/\/)?[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*$/;

export const linkSchema = z.object({
  original: z.string().regex(urlRegex, "Invalid URL"),
});
