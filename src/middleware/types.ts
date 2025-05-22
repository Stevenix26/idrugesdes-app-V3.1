import { UserRole } from "@prisma/client";

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: string;
    user?: {
      role: UserRole;
    };
  };
}

export interface MiddlewareConfig {
  matcher: string[];
}

export interface RouteConfig {
  publicRoutes: string[];
  protectedApiRoutes: string[];
}
