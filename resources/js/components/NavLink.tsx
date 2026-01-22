import { Link } from "@inertiajs/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  activeClassName?: string;
  active?: boolean;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, active, href, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, active && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
