'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pin, Youtube, Instagram, Facebook, Calendar as CalendarIcon } from 'lucide-react';

export default function ContentCalendarGenerator() {
  const [platform, setPlatform] = useState('youtube');
  const [isPinActive, setIsPinActive] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const dbRef = React.useRef<IDBDatabase | null>(null);

  // Initialize and Load from IndexedDB
  React.useEffect(() => {
    const request = indexedDB.open('CalendarDB', 1);

    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('events')) {
        db.createObjectStore('events', { keyPath: 'id' });
      }
    };

    request.onsuccess = (e: any) => {
      const db = e.target.result;
      dbRef.current = db;
      
      const transaction = db.transaction('events', 'readonly');
      const store = transaction.objectStore('events');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        setEvents(getAllRequest.result);
      };
    };

    request.onerror = (e) => {
      console.error("IndexedDB Error:", e);
    };
  }, []);

  const saveEventToDB = (event: any) => {
    const db = dbRef.current;
    if (!db) {
      // Fallback: reopen if db is not ready
      const request = indexedDB.open('CalendarDB', 1);
      request.onsuccess = (e: any) => {
        const database = e.target.result;
        dbRef.current = database;
        const transaction = database.transaction('events', 'readwrite');
        const store = transaction.objectStore('events');
        store.put(event);
      };
      return;
    }

    const transaction = db.transaction('events', 'readwrite');
    const store = transaction.objectStore('events');
    const request = store.put(event);
    
    request.onerror = (e) => console.error("Save Error:", e);
    transaction.oncomplete = () => console.log("Event saved successfully");
  };

  const deleteEvent = (id: string) => {
    const db = dbRef.current;
    if (!db) return;

    const transaction = db.transaction('events', 'readwrite');
    const store = transaction.objectStore('events');
    store.delete(id);
    
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const getPlatformColor = (p: string) => {
    switch(p) {
      case 'youtube': return '#ef4444';
      case 'instagram': return '#db2777';
      case 'facebook': return '#2563eb';
      default: return '#000000';
    }
  };

  const handleDateClick = (arg: any) => {
    if (!isPinActive) return;

    const newEvent = {
      id: String(Date.now()),
      title: platform.toUpperCase(),
      start: arg.dateStr,
      backgroundColor: getPlatformColor(platform),
      borderColor: 'black',
      textColor: 'white',
      extendedProps: { platform }
    };

    setEvents(prev => [...prev, newEvent]);
    saveEventToDB(newEvent);
  };

  const handleEventClick = (info: any) => {
    if (confirm(`Delete post for ${info.event.title}?`)) {
      deleteEvent(info.event.id);
    }
  };

  const renderEventContent = (eventInfo: any) => {
    const p = eventInfo.event.extendedProps.platform;
    return (
      <div className="flex items-center justify-center w-full py-0.5">
        {p === 'youtube' && <Youtube className="w-3.5 h-3.5 text-white" />}
        {p === 'instagram' && <Instagram className="w-3.5 h-3.5 text-white" />}
        {p === 'facebook' && <Facebook className="w-3.5 h-3.5 text-white" />}
      </div>
    );
  };

  return (
    <Card className="w-full border-2 border-black rounded-none shadow-none bg-white overflow-hidden">
      <CardHeader className="border-b-2 border-black p-4 bg-neutral-50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <CardTitle className="text-xs font-black uppercase tracking-widest">Calendar Management</CardTitle>
          </div>
          <div className="flex gap-2 opacity-20">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-black rounded-full" />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Row 1: Platform & Pin Action */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="h-10 rounded-none border-black border-2 focus:ring-0 font-bold text-[10px] uppercase tracking-wider bg-white">
                <SelectValue placeholder="SELECT PLATFORM" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black border-2">
                <SelectItem value="youtube" className="text-[10px] font-bold uppercase">
                  <div className="flex items-center gap-2">
                    <Youtube className="w-3 h-3 text-red-600" />
                    YouTube
                  </div>
                </SelectItem>
                <SelectItem value="instagram" className="text-[10px] font-bold uppercase">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-3 h-3 text-pink-600" />
                    Instagram
                  </div>
                </SelectItem>
                <SelectItem value="facebook" className="text-[10px] font-bold uppercase">
                  <div className="flex items-center gap-2">
                    <Facebook className="w-3 h-3 text-blue-600" />
                    Facebook
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant={isPinActive ? "default" : "outline"} 
            size="icon"
            onClick={() => setIsPinActive(!isPinActive)}
            className={`h-10 w-10 rounded-none border-black border-2 transition-all ${
              isPinActive ? "bg-black text-white" : "hover:bg-black hover:text-white"
            }`}
          >
            <Pin className={`w-4 h-4 ${isPinActive ? "animate-pulse" : ""}`} />
          </Button>
        </div>

        {/* Calendar Section with Sizing for Mobile */}
        <div className={`border-2 border-black p-1 bg-white calendar-container overflow-hidden transition-all ${isPinActive ? "ring-4 ring-black/5 cursor-crosshair" : ""}`}>
          <style jsx global>{`
            .fc { font-family: inherit; font-size: 10px; }
            .fc .fc-toolbar { margin-bottom: 0.5rem !important; flex-wrap: wrap; gap: 4px; }
            .fc .fc-toolbar-title { font-size: 12px !important; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; }
            .fc .fc-button { 
              background: white !important; 
              color: black !important; 
              border: 1px solid black !important; 
              border-radius: 0 !important;
              font-size: 10px !important;
              font-weight: bold !important;
              text-transform: uppercase !important;
              padding: 2px 6px !important;
            }
            .fc .fc-button:hover { background: black !important; color: white !important; }
            .fc .fc-event { 
              border-radius: 0 !important; 
              border: 1.5px solid black !important; 
              padding: 0 !important; 
              cursor: pointer;
            }
            .fc th { background: #fafafa; padding: 4px 0 !important; font-weight: 900; text-transform: uppercase; font-size: 9px; }
            .fc td { border-color: #eee !important; }
            .fc-daygrid-day-number { font-weight: bold; padding: 2px !important; }
            .fc-day-today { background: #fffbeb !important; }
            .fc-event-main { width: 100%; display: flex; justify-content: center; }
          `}</style>
          
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'today'
            }}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            height="auto"
            aspectRatio={1.2}
            handleWindowResize={true}
            stickyHeaderDates={true}
          />
        </div>

        <div className="bg-black text-white p-2 text-center">
          <p className="text-[8px] font-black uppercase tracking-[0.3em]">
            {isPinActive ? "Mode: Pin Active - Click Date to Post" : "Sync Status: Operational"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
