# REVILAC Nutrition Intelligence v3.11 — Patient-led daily wellness routine

## Added
- Dedicated **My daily plan** navigation page.
- Multiple-choice onboarding for goal, dietary pattern, activity, sleep, wake/bed times, language and safety context.
- Selectable daily task categories: hydration prompts, meals, comfortable movement, optional gentle yoga, breathing/meditation, sleep wind-down and daily check-in.
- Local daily task list with completion, snooze, skip and reset check-in actions.
- Optional browser notification permission and a conservative near-time notification check while the app is open.
- Expanded local profile fields for birth year, email, mobile and accessibility preference.
- `test_wellness_plan.js` added to the automated test command.

## Important limitations
- Data is saved in local browser storage; these fields do not create a verified account or secure cloud profile.
- Email/SMS OTP, secure multi-user authentication, cloud sync and account recovery are not implemented.
- Browser reminders are not guaranteed when the app is closed or suspended; hosted PWA/native integration and real-device testing are still required for reliable daily delivery.
- Plan content is general wellness education, not a diagnosis, prescription or clinically validated exercise/nutrition plan.
- OCR quality, live external APIs, security and clinical validity remain unverified by this update.
