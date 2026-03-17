'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Briefcase, Calculator, ArrowLeft, Lock, ChevronRight, LogOut, Github, Facebook, Video } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";

const professions = [
  { id: 'network-engineer', label: 'Network Engineer', icon: <ShieldCheck className="w-4 h-4 mr-3" /> },
  { id: 'business-marketing', label: 'Business Marketing', icon: <Briefcase className="w-4 h-4 mr-3" /> },
  { id: 'accounting', label: 'Accounting', icon: <Calculator className="w-4 h-4 mr-3" /> },
  { id: 'content-creator', label: 'Content Creator', icon: <Video className="w-4 h-4 mr-3" /> },
];

export default function LoginPage() {
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [imgError, setImgError] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogin = () => {
    if (selectedProfession) {
      router.push(`/${selectedProfession}`);
    }
  };

  const isLoading = status === "loading";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-6 selection:bg-black selection:text-white">
      {/* Back to Home */}
      <Link href="/" className="absolute top-10 left-10 flex items-center gap-2 group text-neutral-400 hover:text-black transition-all">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Return</span>
      </Link>

      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 border-2 border-black flex items-center justify-center mb-6">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-center mb-2">Gate Entry</h1>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            {session ? "Authenticated" : "Identification Required"}
          </p>
        </div>

        <Card className="border-2 border-black rounded-none shadow-none bg-white p-2">
          <CardHeader className="space-y-1 pb-6 pt-6 text-center">
            <CardTitle className="text-sm font-black uppercase tracking-widest">
              {session ? `Welcome, ${session.user?.name?.split(' ')[0]}` : "Authentication"}
            </CardTitle>
            <CardDescription className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
              {session 
                ? "Choose your workspace role to proceed" 
                : "Sign in with your corporate account"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!session ? (
              <div className="space-y-3">
                <Button 
                  onClick={() => signIn("google")}
                  className="w-full h-14 rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Verifying..."
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google Account
                    </>
                  )}
                </Button>

                <Button 
                  onClick={() => signIn("github")}
                  className="w-full h-14 rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                  disabled={isLoading}
                >
                  <Github className="w-4 h-4" />
                  GitHub Account
                </Button>

                <Button 
                  onClick={() => signIn("facebook")}
                  className="w-full h-14 rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                  disabled={isLoading}
                >
                  <Facebook className="w-4 h-4 fill-current" />
                  Facebook Account
                </Button>

                <Button 
                  onClick={() => signIn("tiktok")}
                  className="w-full h-14 rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                  disabled={isLoading}
                >
                  <svg 
                    className="w-4 h-4 fill-current" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.525.02c1.31-.032 2.61.123 3.864.46v4.352c-.822-.262-1.68-.38-2.535-.353-.87.03-1.724.237-2.51.61-.413.204-.79.475-1.12.804-.33.328-.59.715-.77 1.14-.18.425-.268.883-.26 1.343l.01 4.332-.01 5.385c-.01 1.05-.333 2.07-.927 2.924-.594.854-1.442 1.487-2.42 1.808-.98.322-2.036.37-3.036.14-1.0-.23-1.9-.766-2.583-1.545-.683-.78-.1.082-.62-.977-.52-1.06-.63-2.31-.31-3.447.32-1.137 1.04-2.124 2.02-2.775.98-.65 2.15-.916 3.29-.747v4.4c-.655-.143-1.34-.055-1.933.248-.593.303-1.047.82-1.282 1.44-.235.623-.222 1.312.036 1.927.258.615.733 1.104 1.332 1.373.6.27 1.282.288 1.895.05.614-.24 1.124-.694 1.428-1.28.305-.587.397-1.264.26-1.905l.02-12.795c4.103.013 7.425 3.322 7.425 7.425v.195h4.37V7.51a8.667 8.667 0 0 0 4.23-1.574A8.683 8.683 0 0 0 23.97 1.91V0c-1.31.03-2.61-.123-3.86-.46a11.123 11.123 0 0 1-5.06-3.89h-2.525z"/>
                  </svg>
                  TikTok Account
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-100">
                  {session.user?.image && !imgError ? (
                    <Image 
                      src={session.user.image} 
                      alt="" 
                      width={40}
                      height={40}
                      className="w-10 h-10 border border-black object-cover" 
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-10 h-10 border border-black flex items-center justify-center bg-black text-white font-black text-xs">
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest truncate">{session.user?.name}</p>
                    <p className="text-[8px] font-medium text-neutral-400 uppercase tracking-widest truncate">{session.user?.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Select onValueChange={(value) => setSelectedProfession(value)}>
                    <SelectTrigger className="h-14 rounded-none border-black border focus:ring-0 transition-all font-bold text-xs uppercase tracking-widest">
                      <SelectValue placeholder="--- SELECT ROLE ---" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-black border-2 p-1">
                      {professions.map((prof) => (
                        <SelectItem 
                          key={prof.id} 
                          value={prof.id}
                          className="rounded-none h-12 focus:bg-black focus:text-white cursor-pointer transition-colors"
                        >
                          <div className="flex items-center text-[10px] font-black uppercase tracking-widest">
                            {prof.icon}
                            {prof.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-2 pb-6">
            {session && (
              <>
                <Button 
                  className={`w-full h-14 rounded-none text-xs font-black uppercase tracking-[0.2em] transition-all group ${
                    selectedProfession 
                      ? "bg-black text-white hover:bg-neutral-800" 
                      : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                  }`} 
                  disabled={!selectedProfession}
                  onClick={handleLogin}
                >
                  Enter Workspace
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <button 
                  onClick={() => signOut()}
                  className="mt-2 text-[8px] font-bold text-neutral-400 uppercase tracking-[0.2em] hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  Deauthorize
                </button>
              </>
            )}
          </CardFooter>
        </Card>

        <div className="mt-12 flex justify-center opacity-10">
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-black rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
