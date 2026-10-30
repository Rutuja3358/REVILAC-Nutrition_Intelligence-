# REVILAC Nutrition Intelligence — Premium Visual Experience

## Added to the existing project
- Cinematic emerald report-story hero with clear Capture → Check → Understand → Follow-up journey.
- Lightweight inline SVG nutrition/body-systems educational map with working topic selection linked to the existing Nutrition Intelligence topic selector.
- Live dashboard indicators connected to the existing report/follow-up counts and optional display-name profile field. These are activity indicators, not nutrient adequacy scores or diagnoses.
- Responsive styling for mobile and desktop, keyboard-visible focus, accessible labels, and reduced-motion support.
- Service-worker cache revision changed so returning installations can fetch the updated interface.

## Preserved
- Existing report upload, extraction, manual review, safety gates, timeline, nutrition workbench, local storage, export, reminders, and existing navigation.
- No recipe-planner pivot, no external image dependency, no new account requirement.

## Validation
- `npm run test:syntax`
- `npm test`
- `npm run build:pages`
- New automated checks verify the visual blocks, topic controls, live-data hook, mobile responsiveness, and safety wording.

## Honest limitations
This is a visual and interaction upgrade to the development prototype. It does not provide a validated 3D anatomical model, clinical diagnosis, validated nutrient-deficiency detection, full browser/device end-to-end testing, or clinical/security clearance. Use synthetic demo records until appropriate validation is complete.
