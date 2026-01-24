import React from 'react';

interface UpdateHeaderProps {
  updateType: string;
  horseName: string;
  updateDate: string;
}

export function UpdateHeader({ updateType, horseName, updateDate }: UpdateHeaderProps) {
  return (
    <header className="border-b border-black pb-3 mb-6">
      <div className="text-[10px] font-semibold tracking-[3px] uppercase text-neutral-500">
        {updateType}
      </div>
      <div className="text-[10px] font-medium text-neutral-400 mt-1 uppercase">
        {horseName} • {updateDate}
      </div>
    </header>
  );
}
