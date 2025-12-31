"use client";
import NextLink from "next/link";
import { useRouter, usePathname, useParams as useNextParams } from "next/navigation";
import React from "react";

type LinkProps = React.PropsWithChildren<{
  to: string;
  className?: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
}>;

export function Link({ to, children, className, prefetch, replace, scroll }: LinkProps) {
  return (
    <NextLink href={to} className={className} prefetch={prefetch} replace={replace} scroll={scroll}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (href: string) => router.push(href);
}

export function useLocation() {
  const pathname = usePathname();
  return { pathname } as { pathname: string };
}

export function useParams<T extends Record<string, string>>() {
  return useNextParams() as unknown as T;
}
