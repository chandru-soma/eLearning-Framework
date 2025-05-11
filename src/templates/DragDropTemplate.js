import React, { useState, useContext } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import CourseContext from '../context/CourseContext';

const DragDropTemplate = ({ content, isActive, onNext, topicId, pageId }) => {
  const { settings } = useContext(CourseContext);
  const [items, setItems] = useState(content.items || []);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!content || !Array.isArray(content.items) || !Array.isArray(content.correctOrder)) {
    console.error('DragDropTemplate: content or content.items is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid drag-drop content</div>;
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!isActive || submitted || !over) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const newItems = [...items];
    newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, items[oldIndex]);
    setItems(newItems);
  };

  const handleCheckOrder = () => {
    if (!isActive) return;
    const currentOrder = items.map((item) => item.id);
    const isCorrect = currentOrder.join('') === content.correctOrder.join('');
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect. Try again.');
    setSubmitted(true);
  };

  return (
    <div className="drag-drop-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Arrange in Order'}</h2>
      <p className="mb-4">{content.question || 'No question available'}</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                content={item.content}
                disabled={!isActive || submitted}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {!submitted && isActive && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCheckOrder}
        >
          Check Order
        </button>
      )}
      {(submitted || !settings.interactiveLocked) && isActive && onNext()}
      {feedback && <p className="mt-4 text-gray-700">{feedback}</p>}
    </div>
  );
};

export default DragDropTemplate;