import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, content, disabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 bg-gray-200 rounded-lg ${disabled ? 'opacity-50' : ''}`}
    >
      {content || `Item ${id}`}
    </div>
  );
};