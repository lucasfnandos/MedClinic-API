import bcrypt from "bcrypt";

export async function hashPassword(senhaAberta: string): Promise<string> {
    const senhaHash = await bcrypt.hash(senhaAberta, 10);
    return senhaHash;
}