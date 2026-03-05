'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { copyToClipboard } from '@/utils/tool-logic';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  resultToCopy?: string;
}

export function ToolCard({ title, description, icon, children, resultToCopy }: ToolCardProps) {
  return (
    <Card className="rounded-none border-2 border-black bg-white shadow-none transition-all group">
      <CardHeader className="border-b-2 border-black bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-black text-white group-hover:bg-white group-hover:text-black transition-colors">
              {icon}
            </div>
            <div>
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">{title}</CardTitle>
              <CardDescription className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
          {resultToCopy && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-black hover:text-white rounded-none border border-black/5"
              onClick={() => copyToClipboard(resultToCopy)}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5">
        {children}
      </CardContent>
    </Card>
  );
}
