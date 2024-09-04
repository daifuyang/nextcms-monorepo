export interface Admin {
  id: number;
  loginName: string;
  email: string | null;
  phone: string | null;
  nickname: string;
  realName: string | null;
  gender: number; // 0 could represent male or female based on context, you can use an enum if needed
  birthday: string | null; // Assuming birthday is a string, could be Date if it's Date object
  userType: number; // You might want to use an enum for this if there are predefined user types
  name: string | null;
  avatar: string | null;
  loginIp: string;
  loginTime: string; // If loginTime is a timestamp, it might be a string or number
  status: number; // Could also be an enum for different status types
}
