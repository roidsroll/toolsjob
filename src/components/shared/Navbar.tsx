"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, X, Zap ,Pencil, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Pencil className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-black">
              ToolsJob
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!session ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth">Login</Link>
                </Button>
                <Button size="sm" className="bg-black text-white hover:bg-gray-800" asChild>
                  <Link href="/auth">Get Started</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="Avatar" width={24} height={24} className="w-6 h-6 rounded-full border border-black/10 grayscale" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="text-xs font-bold uppercase tracking-widest truncate max-w-[100px]">{session.user?.name?.split(' ')[0]}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => signOut()} title="Logout" className="hover:text-red-600">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* Sheet Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-lg">ToolsJob</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Sheet Links */}
                <div className="flex flex-col p-4 gap-1 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Sheet Footer CTA */}
                <div className="p-4 border-t flex flex-col gap-2">
                  {!session ? (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/auth" onClick={() => setIsOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button className="w-full bg-black text-white hover:bg-gray-800" asChild>
                        <Link href="/auth" onClick={() => setIsOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {session.user?.image && <Image src={session.user.image} alt="Avatar" width={32} height={32} className="w-8 h-8 rounded-full border border-black/10 grayscale" />}
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest">{session.user?.name}</p>
                          <p className="text-[10px] text-gray-500 truncate">{session.user?.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => { signOut(); setIsOpen(false); }}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Deauthorize
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}