import { useIsAuthenticated, useGo } from "@refinedev/core";

export const Authenticated: React.FC<AuthenticatedProps> = ({ children, fallback, loading }) => {
  const { isLoading, data } = useIsAuthenticated();

  const go = useGo();

  if (isLoading) {
    return <>{loading}</> || null;
  }

  if (data.error) {
    if (!fallback) {
      go({ to: redirectTo, type: "replace" });
      return null;
    }

    return <>{fallback}</>;
  }

  if (data.authenticated) {
    return <>{children}</>;
  }

  return null;
};

type AuthenticatedProps = {
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
};