"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconUser, IconLogout } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";

import React, { useRef, useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-4 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "blur(5px)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 0 16px rgba(34, 42, 53, 0.04), 0 1px 1px rgba(0, 0, 0, 0.03)",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-white/90 px-4 py-2 lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-neutral-600 transition duration-200 hover:text-neutral-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          key={`link-${idx}`}
          href={item.link}
          className="relative px-4 py-2 text-neutral-600 hover:text-[var(--primary)]"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[var(--secondary)]"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "blur(5px)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 0 16px rgba(34, 42, 53, 0.04), 0 1px 1px rgba(0, 0, 0, 0.03)",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white/90 px-0 py-2 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black cursor-pointer" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
        <span className="text-white text-lg font-bold">🫁</span>
      </div>
      <span className="font-bold text-[var(--primary)]">BreatheSense</span>
    </Link>
  );
};

interface NavbarButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const NavbarButton: React.FC<NavbarButtonProps> = ({
  href,
  children,
  className,
  variant = "primary",
  onClick,
  type = "button",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--primary-light)]",
    secondary: "bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
    dark: "bg-[var(--foreground)] text-white shadow-lg",
    gradient:
      "bg-gradient-to-b from-[var(--primary)] to-[var(--primary-light)] text-white shadow-lg",
  };

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 transition-colors"
      >
        <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center">
          <IconUser className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-[var(--foreground)] hidden md:block">
          {user.firstName}
        </span>
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-[var(--muted)] py-2 z-50"
          >
            <div className="px-4 py-2 border-b border-[var(--muted)]">
              <p className="text-sm font-medium text-[var(--foreground)]">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-[var(--foreground)]/60 capitalize">
                {user.role}
              </p>
            </div>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--background)] transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
            >
              <IconLogout className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BreatheSenseNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Features", link: "/#features" },
  ];

  const renderAuthButtons = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[var(--muted)] rounded-full animate-pulse"></div>
        </div>
      );
    }

    if (user) {
      return <UserMenu />;
    }

    return (
      <div className="flex items-center space-x-2">
        <NavbarButton href="/login" variant="secondary">
          Login
        </NavbarButton>
        <NavbarButton href="/signup" variant="primary">
          Get Started
        </NavbarButton>
      </div>
    );
  };

  const renderMobileAuthButtons = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[var(--muted)] rounded-full animate-pulse"></div>
        </div>
      );
    }

    if (user) {
      return (
        <div className="flex flex-col space-y-2 pt-4 border-t border-[var(--muted)]">
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-[var(--foreground)]">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-[var(--foreground)]/60 capitalize">
              {user.role}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-[var(--primary)] hover:bg-[var(--background)] rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={() => {
              // logout will be handled by the context
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
          >
            <IconLogout className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-2 pt-4">
        <NavbarButton href="/login" variant="secondary" className="w-full">
          Login
        </NavbarButton>
        <NavbarButton href="/signup" variant="primary" className="w-full">
          Get Started
        </NavbarButton>
      </div>
    );
  };

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        {renderAuthButtons()}
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              className="text-neutral-600 hover:text-neutral-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {renderMobileAuthButtons()}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
