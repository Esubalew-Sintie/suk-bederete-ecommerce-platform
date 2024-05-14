// middleware.js
import {NextResponse} from "next/server";

export async function middleware(request) {
    // Directly use the access_token from the request cookies
    // const token = request.cookies.access_token;
    // const [userRole, setMerchantId] = useState(null);

		const userRole = localStorage.getItem("unique_id");
    // Removed the explicit logging and validation check for the token

    try {
        console.log(userRole + "user role");
        if (userRole) {
            setMerchantId("merchant");
        }
        else {
            setMerchantId("customer");

        }

        // Define protected routes and roles
        const protectedRoutes = {
            customer: ["/cart", "/checkout", "/order"],
            merchant: [
                "/admin/order",
                "/admin/inventory",
                "/admin/dashboard",
                "/admin/settings",
            ],
        };

        // Check if the user is trying to access a protected route
        if (protectedRoutes[userRole]?.includes(request.nextUrl.pathname)) {
            // Proceed to the requested page
            return NextResponse.next();
        } else {
            // Use absolute URLs for redirection
            let redirectUrl = new URL(
                "/admin/order",
                request.nextUrl.origin
            ).toString();
            if (userRole === "customer") {
                return NextResponse.redirect(redirectUrl);
            } else if (userRole === "merchant") {
                redirectUrl = new URL(
                    "/admin/dashboard",
                    request.nextUrl.origin
                ).toString();
                return NextResponse.redirect(redirectUrl);
            } else {
                // Default case, redirect to a generic error page
                const errorUrl = new URL("/error", request.nextUrl.origin).toString();
                return NextResponse.redirect(errorUrl);
            }
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        // Handle the error appropriately, e.g., redirect to an error page
        const errorUrl = new URL("/error", request.nextUrl.origin).toString();
        return NextResponse.redirect(errorUrl);
    }
}

async function fetchUserRoleFromDjango() {
    const response = await fetch(
        "http://localhost:8000/account/user-role/"
    );
    if (!response.ok) {
        throw new Error("Failed to fetch user role");
    }
    return await response.json().then((data) => data.role);
}

function validateToken(token) {
    // Implement your token validation logic here
    // Return true if the token is valid, false otherwise
    // Example: return jwt.decode(token, {complete: true}).payload.exp > Date.now() / 1000;
    return true;
}

// Supports both a single string value or an array of matchers
export const config = {
    matcher: [
        "/cart",
        "/checkout",
        "/order",
        "/admin/order",
        "/admin/inventory",
        "/admin/dashboard",
        "/admin/settings",
        "/error",
    ],
};
