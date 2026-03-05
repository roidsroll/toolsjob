'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Briefcase, Calculator, ArrowLeft, Lock, ChevronRight } from 'lucide-react';

const professions = [
  { id: 'network-engineer', label: 'Network Engineer', icon: <ShieldCheck className="w-4 h-4 mr-3" /> },
  { id: 'business-marketing', label: 'Business Marketing', icon: <Briefcase className="w-4 h-4 mr-3" /> },
  { id: 'accounting', label: 'Accounting', icon: <Calculator className="w-4 h-4 mr-3" /> },
];

export default function LoginPage() {
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const router = useRouter();

  const handleLogin = () => {
    if (selectedProfession) {
      router.push(`/${selectedProfession}`);
    }
  };

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
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Identification Required</p>
        </div>

        <Card className="border-2 border-black rounded-none shadow-none bg-white p-2">
          <CardHeader className="space-y-1 pb-6 pt-6">
            <CardTitle className="text-sm font-black uppercase tracking-widest">Selection</CardTitle>
            <CardDescription className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
              Assign your workspace role
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Select onValueChange={(value) => setSelectedProfession(value)}>
                <SelectTrigger className="h-14 rounded-none border-neutral-200 focus:border-black focus:ring-0 transition-all font-bold text-xs uppercase tracking-widest">
                  <SelectValue placeholder="--- CHOOSE PROFESSION ---" />
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
          </CardContent>

          <CardFooter className="pb-6">
            <Button 
              className={`w-full h-14 rounded-none text-xs font-black uppercase tracking-[0.2em] transition-all group ${
                selectedProfession 
                  ? "bg-black text-white hover:bg-neutral-800" 
                  : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
              }`} 
              disabled={!selectedProfession}
              onClick={handleLogin}
            >
              Authorize Access
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
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
