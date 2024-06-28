import { SignUp } from "@clerk/nextjs";

export default function Page() {
  console.log("signin");

  return (
    // <Auth>
    <div className="flex items-start justify-center h-screen align-middle bg-red-900">
      <SignUp />
    </div>

    // {/* </Auth> */}
  );
}
