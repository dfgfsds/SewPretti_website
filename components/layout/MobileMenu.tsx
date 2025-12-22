"use client"

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import Image from 'next/image';
import logo from '../../public/img/new_logo.png';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // 👈 ADD
  const { user }: any = useUser();
  const isLoggedIn = Boolean(user?.data?.id);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          {/* <SheetTitle className="text-left">
            <span className="text-xl font-bold">
              <span className="text-red-600">Syed </span> 
              <span className="text-red-600">Gifts</span>
            </span>
          </SheetTitle> */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              height={100}
              width={100}
              alt="SewPretti logo"
            />
          </Link>
        </SheetHeader>
        {/* <nav className="flex flex-col mt-8 space-y-4">
          <MobileLink href="/" setOpen={setOpen}>Home</MobileLink>
          <MobileLink href="/products" setOpen={setOpen}>Shop</MobileLink>
          <MobileLink href="/categories" setOpen={setOpen}>Categories</MobileLink>
          <MobileLink href="/about" setOpen={setOpen}>About Us</MobileLink>
          <MobileLink href="/contact" setOpen={setOpen}>Contact</MobileLink>
          <MobileLink href="/blog" setOpen={setOpen}>Blog</MobileLink>
        </nav> */}
        <nav className="flex flex-col mt-8 space-y-4">
          <MobileLink href="/" pathname={pathname} setOpen={setOpen}>Home</MobileLink>
          <MobileLink href="/products" pathname={pathname} setOpen={setOpen}>Shop</MobileLink>
          <MobileLink href="/categories" pathname={pathname} setOpen={setOpen}>Categories</MobileLink>
          <MobileLink href="/about" pathname={pathname} setOpen={setOpen}>About Us</MobileLink>
          <MobileLink href="/contact" pathname={pathname} setOpen={setOpen}>Contact</MobileLink>
          <MobileLink href="/blog" pathname={pathname} setOpen={setOpen}>Blog</MobileLink>
          {isLoggedIn && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLogoutModal(true)}
              className="
      flex items-center gap-2
      text-white
      bg-red-600
      hover:bg-red-500 hover:text-white
      transition-all duration-200
      px-3 py-2
      rounded-md
    "
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// function MobileLink({
//   href,
//   children,
//   setOpen
// }: {
//   href: string;
//   children: React.ReactNode;
//   setOpen: (open: boolean) => void;
// }) {
//   return (
//     <Link
//       href={href}
//       onClick={() => setOpen(false)}
//       className="block py-2 text-lg font-medium hover:text-red-600 transition-colors"
//     >
//       {children}
//     </Link>
//   );
// }

function MobileLink({
  href,
  children,
  setOpen,
  pathname
}: {
  href: string;
  children: React.ReactNode;
  setOpen: (open: boolean) => void;
  pathname: string;
}) {
  const isActive =
    pathname === href ||
    (href !== "/" && pathname.startsWith(href)); // 👈 important

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`
        block py-2 text-lg font-medium transition-colors
        ${isActive
          ? "text-red-600 font-semibold"
          : "text-gray-800 hover:text-red-600"}
      `}
    >
      {children}
    </Link>
  );
}
