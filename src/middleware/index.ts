import {
  clerkMiddleware,
  publicRoutes,
  protectedApiRoutes,
} from "./auth/clerk";

// Re-export everything from clerk middleware for easy access
export {
  clerkMiddleware,
  publicRoutes,
  protectedApiRoutes,
  config,
} from "./auth/clerk";

// Export the default middleware
export default clerkMiddleware;
