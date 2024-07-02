import { SignUp } from "@clerk/nextjs";
import Auth from "../../layouts/Auth";

export default function Page() {
  return (
    <Auth>
      <div className="flex items-center justify-center">
        <SignUp afterSignInUrl="/auth/afterSign" />
      </div>
    </Auth>
  );
}
