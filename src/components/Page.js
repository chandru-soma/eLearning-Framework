import React, { useContext } from 'react';
import CourseContext from '../context/CourseContext';
import StaticTemplate from '../templates/StaticTemplate';
import TextImageLeftTemplate from '../templates/TextImageLeftTemplate';
import TextImageRightTemplate from '../templates/TextImageRightTemplate';
import MediaTemplate from '../templates/MediaTemplate';
import TabTemplate from '../templates/TabTemplate';
import ButtonPopupTemplate from '../templates/ButtonPopupTemplate';
import ExpandoTemplate from '../templates/ExpandoTemplate';
import HotspotTemplate from '../templates/HotspotTemplate';
import FlipCardTemplate from '../templates/FlipCardTemplate';
import ConversationTemplate from '../templates/ConversationTemplate';
import SingleChoiceTemplate from '../templates/SingleChoiceTemplate';
import MultipleChoiceTemplate from '../templates/MultipleChoiceTemplate';
import FillInBlanksTemplate from '../templates/FillInBlanksTemplate';
import DropdownTemplate from '../templates/DropdownTemplate';
import DragDropTemplate from '../templates/DragDropTemplate';
import ScenarioBranchingTemplate from '../templates/ScenarioBranchingTemplate';
import AssessmentTemplate from '../templates/AssessmentTemplate';

const templateComponents = {
  static: StaticTemplate,
  textImageLeft: TextImageLeftTemplate,
  textImageRight: TextImageRightTemplate,
  media: MediaTemplate,
  tab: TabTemplate,
  buttonPopup: ButtonPopupTemplate,
  expando: ExpandoTemplate,
  hotspot: HotspotTemplate,
  flipCard: FlipCardTemplate,
  conversation: ConversationTemplate,
  singleChoice: SingleChoiceTemplate,
  multipleChoice: MultipleChoiceTemplate,
  fillInBlanks: FillInBlanksTemplate,
  dropdown: DropdownTemplate,
  dragDrop: DragDropTemplate,
  scenarioBranching: ScenarioBranchingTemplate,
  assessment: AssessmentTemplate,
};

const Page = ({ topicId, pageId, isActive, onNext }) => {
  const { courseData, markPageVisited, visitedPages } = useContext(CourseContext);

  const topic = courseData.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error('Page: Topic not found:', topicId);
    return <div>Error: Topic not found</div>;
  }

  const page = topic.pages.find((p) => p.id === pageId);
  if (!page) {
    console.error('Page: Page not found:', pageId);
    return <div>Error: Page not found</div>;
  }

  const TemplateComponent = templateComponents[page.type];
  if (!TemplateComponent) {
    console.error('Page: Invalid template type:', page.type);
    return <div>Error: Invalid template type</div>;
  }

  // Check if page is visited
  const isVisited = visitedPages[`${topicId}-${pageId}`];

  // Debug page rendering
  console.log('Page rendering:', { topicId, pageId, page, templateType: page.type, isActive, isVisited });

  return (
    <div className="page">
      <div className="border border-gray-200 rounded-lg p-4">
        <TemplateComponent
          content={page.content}
          isActive={isActive}
          onNext={() => {
            if (isActive && !isVisited) {
              markPageVisited(topicId, pageId);
              onNext();
            }
          }}
          topicId={topicId}
          pageId={pageId}
        />
      </div>
      {!isVisited && isActive && topicId !== 'assessment' && (
        <button
          className="fixed bottom-0 left-0 right-0 w-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 z-20"
          onClick={() => {
            markPageVisited(topicId, pageId);
            onNext();
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Page;