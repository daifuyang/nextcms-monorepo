import response from "@/app/lib/response";

export function GET() {
    return response.success("welcome to the CMS API",{version: "1.0.0"});
}