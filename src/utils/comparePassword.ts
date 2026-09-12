import bcrypt from "bcrypt";

export async function comparePassword(pwd: string, hash:string): Promise<boolean> {
    return await bcrypt.compare(pwd, hash);
}