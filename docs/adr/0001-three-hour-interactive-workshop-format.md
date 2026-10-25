# 0001. 3-Hour Interactive Workshop Architecture & Lab Delivery

## Context
The WireMock Deep Dive workshop covers fundamental matching mechanics, advanced templating, stateful FSM chaos, and production virtualization patterns. We evaluated delivering this as a compact 75-minute overview lecture versus a 3-hour (180-minute) interactive hands-on workshop.

## Decision
We adopted a **3-hour interactive workshop delivery format** divided into 4 structured modules:
1. **Module 1: The Virtualization Imperative & Tool Boundaries** (25 min)
2. **Module 2: Core Mechanics & Precision Routing** (45 min)
3. **Module 3: Real-World Banking Production Recipes** (40 min)
   - *10-minute Scheduled Break*
4. **Module 4: Guided Hands-On Lab Challenges & DIY Face Biometrics** (60 min)

Lab challenge slides will state scenario requirements and acceptance criteria, while attendees author and run actual stub definitions in `labs/wiremock-stateless/` and `labs/wiremock-stateful/`.

## Consequences
- Requires attendees to have Docker and local dev environments pre-verified before Module 4.
- Allows participants to gain true muscle memory authoring JSON stubs, verifying with `.http` requests, and observing state resets rather than passively viewing completed slides.
