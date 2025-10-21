
'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SideNav() {

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // On client mount
  useEffect(() => {
    const saved = window.localStorage.getItem('sidebarExpanded');
    if (saved !== null) {
      setIsSidebarExpanded(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('sidebarExpanded', JSON.stringify(isSidebarExpanded));
  }, [isSidebarExpanded]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'sidebarExpanded',
        JSON.stringify(isSidebarExpanded),
      );
    }
  }, [isSidebarExpanded]);

  return (
    <div className="pr-4">
      <div
        className={cn(
          isSidebarExpanded ? 'w-[200px]' : 'w-[68px]',
          'border-r transition-all duration-300 ease-in-out transform hidden sm:flex h-full bg-accent',
        )}
      >
        <aside className="flex h-full flex-col w-full wrap-break-word px-4 overflow-x-hidden columns-1">
          {/* Top */}
          <div className="mt-4 relative pb-2">
            <div className="flex flex-col space-y-1">
             <h1>Dashboard</h1>
            </div>
          </div>
          {/* Bottom */}
          
        </aside>
        <div className="mt-[calc(calc(90vh)-40px)] relative">
          <button
            type="button"
            className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center border border-muted-foreground/20 rounded-full bg-accent shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeft size={16} className='stroke-foreground'/>
            ) : (
              <ChevronRight size={16} className='stroke-foreground'/>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

