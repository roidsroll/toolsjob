'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Network, Hash, ShieldCheck, Activity } from 'lucide-react';
import { calculateSubnet, SubnetResult, copyToClipboard } from '@/utils/network-logic';

export function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState(24);
  const [result, setResult] = useState<SubnetResult | null>(null);

  useEffect(() => {
    setResult(calculateSubnet(ip, cidr));
  }, [ip, cidr]);

  const OutputRow = ({ label, value, icon: Icon }: any) => (
    <div className="flex items-center justify-between p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/50 group hover:border-blue-500/30 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 group-hover:text-blue-500 transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">{label}</p>
          <p className="text-sm font-mono font-bold text-zinc-100">{value || '---'}</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-zinc-600 hover:text-blue-500" 
        onClick={() => copyToClipboard(value)}
      >
        <Copy className="w-3.5 h-3.5" />
      </Button>
    </div>
  );

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 shadow-2xl overflow-hidden group">
      <CardHeader className="border-b border-zinc-800/50 bg-zinc-950/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-black tracking-tight">IP SUBNET CALCULATOR</CardTitle>
            <CardDescription className="text-xs font-medium text-zinc-500 tracking-wide">
              Real-time CIDR Calculation Engine
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">IPv4 Address</label>
            <Input 
              value={ip} 
              onChange={(e) => setIp(e.target.value)}
              className="bg-zinc-950 border-zinc-800 h-11 focus:border-blue-500/50 transition-all"
              placeholder="e.g. 192.168.1.1"
            />
          </div>
          <div className="w-24 space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">CIDR</label>
            <Input 
              type="number" 
              value={cidr} 
              onChange={(e) => setCidr(Number(e.target.value))}
              className="bg-zinc-950 border-zinc-800 h-11 focus:border-blue-500/50 transition-all"
              max={32} min={0}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <OutputRow label="Network Address" value={result?.network} icon={Network} />
          <OutputRow label="Broadcast Address" value={result?.broadcast} icon={Activity} />
          <OutputRow label="Subnet Mask" value={result?.mask} icon={ShieldCheck} />
          <OutputRow label="Host Range" value={result?.hostRange} icon={Hash} />
        </div>
        
        <div className="pt-2">
          <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
             <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Available Hosts</span>
                <span className="text-2xl font-black text-blue-500">{result?.totalHosts?.toLocaleString()}</span>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
