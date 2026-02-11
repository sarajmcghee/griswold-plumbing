# Form Field Specifications

## General Form UX Requirements (Mobile-First)
- Single-column layout on mobile.
- Large tap targets and clear labels.
- Show only necessary fields first.
- Inline validation with plain-language error messages.
- Use input masks for phone and ZIP.
- Confirm success with clear next-step message.

## 1) Scheduling Form (`/book-online`)

### Required Fields
1. Full Name
- Type: text
- Validation: 2-80 chars

2. Phone Number
- Type: tel
- Validation: US phone format

3. Email
- Type: email
- Validation: valid email format

4. Service Address
- Type: text
- Validation: 5-120 chars

5. City
- Type: text

6. ZIP Code
- Type: text
- Validation: 5-digit or ZIP+4

7. Service Needed
- Type: select
- Options: Drain, Water Heater, Leak Repair, Sewer, Fixtures, Emergency, Other

8. Describe the Problem
- Type: textarea
- Validation: min 20 chars

9. Preferred Date
- Type: date picker

10. Preferred Time Window
- Type: select/radio
- Options: Morning, Midday, Afternoon, Evening (if offered)

11. Consent to Contact
- Type: checkbox
- Label: consent for call/text/email regarding service request

### Optional Fields
- Secondary phone
- Gate/access instructions
- Referred by

### Submission Behavior
- Button label: `Request Appointment`
- On submit:
  - show loading state
  - block duplicate submissions
  - route to thank-you page
  - trigger confirmation SMS/email (if integrated)

## 2) Quote Form (`/get-a-quote`)

### Required Fields
1. Full Name
- Type: text

2. Phone Number
- Type: tel

3. Email
- Type: email

4. Service Address
- Type: text

5. City
- Type: text

6. ZIP Code
- Type: text

7. Issue Type
- Type: select
- Options: Leak, Drain/Clog, Water Heater, Sewer, Fixture, Other

8. Describe the Issue
- Type: textarea
- Guidance prompt: where issue is, when it started, current impact
- Validation: min 30 chars

9. Photo Upload
- Type: file input (multiple)
- Accept: `.jpg,.jpeg,.png,.heic,.webp`
- Max files: 6
- Max size per file: 10 MB
- Required minimum: 1 photo

10. Consent to Contact
- Type: checkbox

### Optional Fields
- Preferred callback time
- Video upload (optional phase 2)
- Budget range (optional)

### Upload Helper Text
- `For faster review, include one wide photo and one close-up of the problem area.`

### Submission Behavior
- Button label: `Send Request`
- On submit:
  - show upload progress
  - validate file type/size client-side
  - show success state with response timeline
  - route to thank-you page

## Data/Backend Requirements
- Persist submissions with timestamp and source page.
- Store uploaded media securely with unique filenames.
- Include spam protection (honeypot + rate limit + CAPTCHA as needed).
- Send admin notifications (email/SMS) on new submission.
- Log form errors for troubleshooting.
