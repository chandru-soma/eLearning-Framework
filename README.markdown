# eLearning Framework

A React-based eLearning platform with Tailwind CSS, supporting interactive courses, progress tracking, gamification, and accessibility.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:3000`.

## Customization

- **Styles**: Update Tailwind classes in `src/styles.js` (e.g., `buttonStyles.primary`).
- **Course Content**: Edit `src/data/course.json` to add topics and pages:
  ```json
  {
    "topics": [
      {
        "id": "topic3",
        "title": "New Topic",
        "pages": [{ "id": "p1", "template": "static", "content": "Welcome" }]
      }
    ]
  }
  ```
- **Resources**: Update `src/data/resources.json` for Resources dropdown.

## Course Development

- **Add Templates**: Create new components in `src/components/` (e.g., `NewTemplate.js`).
- **Assets**: Place images, videos, PDFs in `public/assets/`.

## Accessibility

- ARIA attributes and keyboard navigation are implemented.
- Test with screen readers (e.g., NVDA).

## Gamification

- Points: 10 per page completed, shown on landing page.
- Badges: Earned for milestones (e.g., Topic 1 completion), shown on landing page.