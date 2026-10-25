# 0003. Presentation Deck Anti-Repetition Consolidation and Streamlining

## Context
Across the 105 slides in `slides/slides.md`, the presentation deck accumulated several clusters of cognitive redundancy and structural fragmentation:
1. **Theory/Example Fragmentation**: Core WireMock operators were split across separate consecutive slides (e.g. abstract operator catalog on one slide, followed by a separate slide for the JSON mapping example).
2. **Handlebars Sprawl**: Handlebars templating was stretched across 12 consecutive micro-slides, slowing workshop pace.
3. **Burp Suite Interception Overlap**: 5 consecutive slides covered HTTP packet pausing and header tampering with overlapping descriptions.
4. **Narrative Redundancy**: The "Shared Database / Staging Flakiness" crisis narrative was repeated four times across the deck (Slide 2, Slide 7, Slide 79, Slide 80).

## Decision
1. **Side-by-Side Code Split Merges (Archetype D)**:
   - Merge URL/Path matching theory and JSON example into a single 2-column slide.
   - Merge Query Parameter filtering theory and JSON example into a single 2-column slide.
   - Merge Semantic Body Matching (`equalToJson`) theory and JSON example into a single 2-column slide.
   - Consolidate 3-tier Priority Precedence from 3 slides down to 2.
2. **Thematic Handlebars Consolidation (12 Slides ➔ 3 Slides + Practice Lab 4)**:
   - Consolidate micro-helpers into 3 dense, thematic power slides:
     - Slide A: Request Model & Payload Extraction
     - Slide B: Logic, Math & Dynamic Data
     - Slide C: Transform Catalog (Strings, Dates & RegEx)
   - Anchor **Practice Lab 4 (Handlebars Logic & Chaos Latency)** immediately after Slide B.
3. **Symmetrical 3-Tool Hands-On Challenges (Zero Answer on Slides)**:
   - Retain 1 Stateless DIY Challenge: *Biometric Face Scan Stub* (`POST /lab/api/ekyc/biometrics`).
   - Retain 1 Stateful DIY Challenge: *Order Fulfillment Lifecycle* (`order-lifecycle`).
   - Establish 1 MITM Proxy DIY Challenge: *In-Flight Fraud Tampering* (`POST /api/v1/transfers`).
   - In all three challenges, show requirements, rules, and cURL verification commands, but omit the solution mapping on the slide.
4. **Eliminate Narrative Duplication in Part 4**:
   - Remove the redundant *Shared Environment Problem* and *Hermetic Containerized Solution* conceptual slides from Part 4, moving directly from container engine mechanics into dynamic host port orchestration.

## Consequences
- Cuts passive reading slides and cognitive fatigue, keeping workshop momentum high.
- Keeps theory and implementation syntax side-by-side on a single screen.
- Establishes clear pedagogical symmetry across all three core workshop pillars.
- Reduces total slide count while preserving zero vertical overflow and complete line-anchor synchronization.
