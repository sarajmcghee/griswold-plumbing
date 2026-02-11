# Acceptance Criteria Checklist

## A) Information Architecture + Navigation
- [ ] Primary nav contains: Home, Services, Book Online, Get a Quote, About, Contact.
- [ ] Sticky mobile actions include: Call, Book Online, Get a Quote.
- [ ] Footer includes Services, Service Area, Reviews, FAQ, About, Contact.
- [ ] All key pages exist and are linked: Home, Services index, Service detail pages, Book Online, Get a Quote, About, Contact, Service Area, Reviews, FAQ.

## B) Home Page UX + Content
- [ ] Hero displays trust-focused headline, local subhead, and two primary CTAs.
- [ ] Click-to-call is visible above the fold on mobile.
- [ ] Trust section includes licensed/insured and guarantee messaging.
- [ ] Services snapshot links to service detail pages.
- [ ] Reviews preview section includes rating and testimonials.
- [ ] Service area teaser links to full service area page.

## C) Services Pages
- [ ] Services index shows all core services with concise blurbs.
- [ ] Every service detail page includes: hero, symptoms/solutions, scope, FAQ, and conversion CTA.
- [ ] Each service detail page has `Book This Service` and `Get a Quote` CTAs.
- [ ] Related services links are present.

## D) Scheduling Flow (`/book-online`)
- [ ] Form contains all required scheduling fields.
- [ ] Required fields are validated with inline error messages.
- [ ] Submission prevents duplicate sends.
- [ ] Successful submit routes to booking thank-you state/page.
- [ ] User sees expected response/confirmation timeline.
- [ ] Urgent users can switch to click-to-call in one tap.

## E) Quote Flow (`/get-a-quote`)
- [ ] Form contains all required quote fields.
- [ ] Photo upload supports multiple images and validates file type/size.
- [ ] At least one photo is required.
- [ ] Upload progress state is visible during submission.
- [ ] Successful submit routes to quote thank-you state/page.
- [ ] Urgent users can call directly from this page.

## F) Trust + Local Signals
- [ ] Licensed/insured claims are displayed on Home and About pages.
- [ ] Reviews/testimonials appear on Home and dedicated Reviews page.
- [ ] Real business photos are used (team, truck, or completed work).
- [ ] Service area is clearly listed by city/ZIP.
- [ ] Contact page includes business hours and response expectations.

## G) Mobile UX Standards
- [ ] All CTAs are thumb-friendly and clearly labeled.
- [ ] Forms are single-column and easy to complete on mobile.
- [ ] Phone numbers are tap-to-call links.
- [ ] Page load and interactions are smooth on mobile viewport.

## H) Analytics + Tracking (Recommended Minimum)
- [ ] Track click-to-call taps.
- [ ] Track Book Online form start + submit.
- [ ] Track Get a Quote form start + submit.
- [ ] Track service detail CTA clicks.
- [ ] Confirm thank-you page views are firing as conversion events.

## I) Content Quality
- [ ] Copy is simple, direct, and free of fluff.
- [ ] No generic placeholder text remains except approved tokens like [Business Name], [Phone Number], [Service Area].
- [ ] Grammar, spelling, and CTA labels are consistent across pages.
