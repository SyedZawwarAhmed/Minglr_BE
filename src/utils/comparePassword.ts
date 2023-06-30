import bcrypt from "bcrypt";

export async function comparePassword(passwordToVerify: string, passwordToVerifyWith: string): Promise<boolean> {
  return await bcrypt.compare(passwordToVerify, passwordToVerifyWith);
}
