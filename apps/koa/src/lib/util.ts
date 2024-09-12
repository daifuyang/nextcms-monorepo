import bcrypt from "bcrypt";

export function excludeFields(data: any, keys: string[]) {
  return Object.fromEntries(Object.entries(data).filter(([key]) => !keys.includes(key)));
}

export function serializeData(data: any) {
  return JSON.stringify(data, (key, value) => {
    typeof value === "bigint" ? value.toString() : value;
  });
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
