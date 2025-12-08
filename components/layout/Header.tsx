"use client";
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, LogOut, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import logo from '../../public/img/new_logo.png';
import { useEffect, useState } from 'react';
import { useCartItem } from '@/context/CartItemContext';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function Header() {
  const [getUserId, setUserId] = useState<string | null>(null);
  const { cartItem }: any = useCartItem();
  const pathname = usePathname();
  const router = useRouter();
  const { user }: any = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    router.push('/auth/login');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };


  const isLoggedIn = Boolean(user?.data?.id);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left Section - Logo & Nav */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-6">
              <Image
                src={logo}
                height={100}
                width={100}
                alt="SewPretti logo"
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Shop' },
                { href: '/categories', label: 'Categories' },
                { href: '/about', label: 'About Us' },
                { href: '/blog', label: 'Blogs' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors ${pathname === href ||
                    (pathname.startsWith(href) && href !== '/')
                    ? 'text-red-600 font-semibold'
                    : 'hover:text-red-700'
                    }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              href={getUserId ? `/cart` : '/auth/login'}
              className={`text-sm font-medium transition-colors ${pathname === '/cart'
                ? 'text-red-600 font-semibold'
                : 'hover:text-red-700'
                }`}
            >
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-40" />
                {cartItem?.data?.length ? (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItem?.data?.length}
                  </span>
                ) : null}
              </Button>
            </Link>

            {/* User Section */}
            <div className="flex items-center gap-2">
              <Link
                href={isLoggedIn ? `/profile` : '/auth/login'}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${pathname === '/profile'
                  ? 'text-red-600 font-semibold'
                  : 'hover:text-red-700'
                  }`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-gray-200"
                >
                  <User className="h-5 w-5" />
                </Button>
                {user?.data?.id && (
                  <span className="text-sm">
                    {isLoggedIn ? user?.data?.name : 'User'}
                  </span>
                )}
              </Link>

              {/* Logout Button (only if logged in) */}
              {isLoggedIn && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-1 text-red-500 hover:text-white hover:bg-red-500 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[60]">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6 text-center relative">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XCircle className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Logout
            </h2>
            <p className="text-gray-500 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowLogoutModal(false)}
                variant="outline"
                className="px-5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5"
              >
                Yes, Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
