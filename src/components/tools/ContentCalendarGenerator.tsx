'use client';

import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Settings,
  Calendar as CalendarIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { platformIcons, PlatformName } from '@/components/shared/PlatformIcons';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


// --- Types and Constants ---
type Platform = PlatformName;
type Frequency = 'daily' | 'thrice_weekly' | 'twice_weekly' | 'weekly';
type ContentType = 'Reels' | 'Story' | 'Post' | 'Carousel';

const PLATFORMS: Platform[] = ['Instagram', 'TikTok', 'Facebook', 'Linkedin', 'Twitter'];
const FREQUENCIES: { id: Frequency; label: string }[] = [
  { id: 'daily', label: 'Sehari Sekali' },
  { id: 'thrice_weekly', label: '3x Seminggu' },
  { id: 'twice_weekly', label: '2x Seminggu' },
  { id: 'weekly', label: 'Seminggu Sekali' },
];
const CONTENT_TYPES: ContentType[] = ['Reels', 'Story', 'Post', 'Carousel'];

const platformColors: Record<Platform, string> = {
  Instagram: '#E1306C',
  TikTok: '#000000',
  Facebook: '#1877F2',
  Linkedin: '#0A66C2',
  Twitter: '#1DA1F2',
};

// --- Helper Functions ---
const getScheduleForMonth = (
  year: number,
  month: number, // 0-indexed
  frequency: Frequency,
  platform: Platform,
  contentType: ContentType
): any[] => {
  const events = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const title = `${platform} ${contentType}`;

  const getDayOfWeek = (day: number) => new Date(year, month, day).getDay(); // 0=Sun, 6=Sat

  for (let day = 1; day <= daysInMonth; day++) {
    let shouldPost = false;
    const dayOfWeek = getDayOfWeek(day);

    switch (frequency) {
      case 'daily':
        shouldPost = true;
        break;
      case 'thrice_weekly': // Mon, Wed, Fri
        if ([1, 3, 5].includes(dayOfWeek)) shouldPost = true;
        break;
      case 'twice_weekly': // Tue, Thu
        if ([2, 4].includes(dayOfWeek)) shouldPost = true;
        break;
      case 'weekly': // Sunday
        if (dayOfWeek === 0) shouldPost = true;
        break;
    }

    if (shouldPost) {
      events.push({
        title,
        date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        backgroundColor: platformColors[platform],
        borderColor: platformColors[platform],
        textColor: '#FFFFFF',
        extendedProps: {
          platform,
        },
      });
    }
  }
  return events;
};

// --- Main Component ---
export default function ContentCalendarGenerator() {
  const [date, setDate] = useState(new Date());
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [frequency, setFrequency] = useState<Frequency>('daily');
  const [contentType, setContentType] = useState<ContentType>('Post');
  const [events, setEvents] = useState<any[]>([]);

  const calendarRef = useRef<FullCalendar>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  const generateSchedule = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const newEvents = getScheduleForMonth(
      year,
      month,
      frequency,
      platform,
      contentType
    );
    setEvents(newEvents);
    
    // Go to the specified date in the calendar
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
        calendarApi.gotoDate(date);
    }
  };

  const handleExport = (format: 'png' | 'pdf') => {
    if (calendarContainerRef.current) {
        // Temporarily remove shadow for cleaner export
      const originalShadow = calendarContainerRef.current.style.boxShadow;
      calendarContainerRef.current.style.boxShadow = 'none';

      html2canvas(calendarContainerRef.current, {
        useCORS: true,
        scale: 2, // Higher resolution
      }).then((canvas) => {
        if (format === 'png') {
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = `content-calendar-${date.getFullYear()}-${date.getMonth() + 1}.png`;
          link.click();
        } else {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save(`content-calendar-${date.getFullYear()}-${date.getMonth() + 1}.pdf`);
        }

        // Restore shadow after export
        if(calendarContainerRef.current) {
            calendarContainerRef.current.style.boxShadow = originalShadow;
        }
      });
    }
  };
  
  const handleMonthChange = (increment: number) => {
      setDate(currentDate => {
          const newDate = new Date(currentDate);
          newDate.setMonth(newDate.getMonth() + increment);
          return newDate;
      })
  }

  return (
    <div className="w-full my-12 bg-white pt-8 border-t-2 border-black/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-1">
        <div>
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 md:w-8 md:h-8"/>
            Auto Content Calendar
          </h2>
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            AI-Powered Schedule Generator
          </p>
        </div>
      </div>

      {/* --- Input Form --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
        {/* Month/Year Picker */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Bulan & Tahun</label>
          <div className="flex items-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
            <button onClick={() => handleMonthChange(-1)} className="p-3 border-r-2 border-black hover:bg-neutral-100"><ChevronLeft size={16}/></button>
            <input
              type="text"
              readOnly
              value={date.toLocaleString('default', { month: 'long', year: 'numeric' })}
              className="w-full text-center font-bold uppercase text-sm p-3 focus:outline-none"
            />
            <button onClick={() => handleMonthChange(1)} className="p-3 border-l-2 border-black hover:bg-neutral-100"><ChevronRight size={16}/></button>
          </div>
        </div>

        {/* Platform */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Platform</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-2 border-black p-3.5 font-bold uppercase text-sm focus:outline-none appearance-none cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white active:bg-neutral-100"
              >
                <div className="flex items-center gap-2">
                  {React.createElement(platformIcons[platform], { className: 'w-4 h-4' })}
                  <span className="hidden sm:inline">{platform}</span>
                </div>
                <ChevronRight size={16} className="opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none">
              {PLATFORMS.map((p) => {
                const Icon = platformIcons[p];
                return (
                  <DropdownMenuItem
                    key={p}
                    onSelect={() => setPlatform(p)}
                    className="font-bold uppercase text-sm cursor-pointer"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {p}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Frequency */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Frekuensi Post</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)} className="w-full border-2 border-black p-3.5 font-bold uppercase text-sm focus:outline-none appearance-none cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {FREQUENCIES.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>
        
        {/* Content Type */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 ml-1">Jenis Konten</label>
          <select value={contentType} onChange={(e) => setContentType(e.target.value as ContentType)} className="w-full border-2 border-black p-3.5 font-bold uppercase text-sm focus:outline-none appearance-none cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {CONTENT_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button onClick={generateSchedule} className="w-full sm:w-auto flex-grow bg-black text-white font-black uppercase py-4 px-8 text-sm tracking-widest border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2">
            <Settings size={16}/> Generate Schedule
        </button>
        <button onClick={() => handleExport('png')} className="w-full sm:w-auto bg-blue-500 text-white font-black uppercase py-4 px-6 text-xs tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2">
            <Download size={14}/> PNG
        </button>
        <button onClick={() => handleExport('pdf')} className="w-full sm:w-auto bg-red-500 text-white font-black uppercase py-4 px-6 text-xs tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2">
            <Download size={14}/> PDF
        </button>
      </div>


      {/* --- Calendar Output --- */}
      <div ref={calendarContainerRef} className="p-2 sm:p-6 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {events.length > 0 ? (
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            initialDate={date}
            events={events}
            height="auto"
            headerToolbar={false} // Use custom header
            eventContent={(eventInfo) => {
              const eventPlatform = eventInfo.event.extendedProps.platform as PlatformName;
              const Icon = platformIcons[eventPlatform];
              return (
                <div className="p-1.5 text-xs font-bold w-full overflow-hidden flex items-center gap-1.5">
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap text-ellipsis">
                    {eventInfo.event.title.replace(`${eventPlatform} `, '')}
                  </span>
                </div>
              );
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-neutral-300 gap-3 text-center">
            <CalendarIcon className="w-12 h-12 text-neutral-300" />
            <p className="text-sm font-black uppercase tracking-widest text-neutral-500 mt-2">Generate a schedule to see your calendar</p>
            <p className="text-xs text-neutral-400">Pilih opsi di atas dan klik "Generate Schedule"</p>
          </div>
        )}
      </div>
    </div>
  );
}

