'use client';

import React from 'react';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, User, ShieldCheck, BarChart2 } from 'lucide-react';

export default function ContentCreatorPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-white text-black p-8 selection:bg-black selection:text-white">
      <Link href="/auth" className="flex items-center gap-2 mb-12 group text-neutral-400 hover:text-black transition-all inline-flex">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to Console</span>
      </Link>

      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-l-8 border-black pl-8 py-4">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Content Creator Console</h1>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-[0.3em]">Workspace Profile / TikTok Analytics</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <Card className="md:col-span-1 border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
            <div className="aspect-square bg-neutral-100 border-b-4 border-black relative">
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || "User"} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-16 h-16 text-neutral-300" />
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-black mb-1 truncate">@{(session?.user as any)?.username || "username"}</h2>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest truncate">{session?.user?.name || "Display Name"}</p>
            </CardContent>
          </Card>

          {/* TikTok Stats & Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border-4 border-black p-4 flex flex-col items-center justify-center bg-[#FE2C55] text-white">
                <span className="text-[8px] font-black uppercase tracking-widest mb-1">Followers</span>
                <span className="text-xl font-black italic">{(session?.user as any)?.followers?.toLocaleString() || "0"}</span>
              </div>
              <div className="border-4 border-black p-4 flex flex-col items-center justify-center bg-black text-white">
                <span className="text-[8px] font-black uppercase tracking-widest mb-1">Likes</span>
                <span className="text-xl font-black italic">{(session?.user as any)?.likes?.toLocaleString() || "0"}</span>
              </div>
              <div className="border-4 border-black p-4 flex flex-col items-center justify-center bg-white text-black">
                <span className="text-[8px] font-black uppercase tracking-widest mb-1">Following</span>
                <span className="text-xl font-black italic">{(session?.user as any)?.following?.toLocaleString() || "0"}</span>
              </div>
              <div className="border-4 border-black p-4 flex flex-col items-center justify-center bg-neutral-100 text-black">
                <span className="text-[8px] font-black uppercase tracking-widest mb-1">Videos</span>
                <span className="text-xl font-black italic">{(session?.user as any)?.videos?.toLocaleString() || "0"}</span>
              </div>
            </div>

            <Card className="border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <CardHeader className="border-b-4 border-black py-4">
                <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-3">
                  <Video className="w-4 h-4" />
                  TikTok Workspace Account
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Username</h4>
                    <p className="font-black text-2xl">@{(session?.user as any)?.username}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-neutral-100 border-2 border-black p-6 italic">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-relaxed text-center">
                Note: Real-time statistics are fetched directly from your Tiktok Account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
