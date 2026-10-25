# 0002. Slide Architecture, Tool Boundaries, and Action-Oriented Lab Layout

## Context
With a 3-hour workshop duration, we evaluated whether to constrain the total slide count and how to structure Section 01 tooling boundaries and Section 04 hands-on labs.

## Decision
1. **Flexible Slide Count**: Total slide count is not artificially constrained. Topics are split across sequential slides whenever necessary to maintain the "One Idea Per Slide" principle, generous typography ($\ge 14\text{px}$ body, $\ge 13.4\text{px}$ badges), and zero vertical overflow.
2. **No Break Slides**: Formal breaks are announced verbally by the instructor rather than having dedicated placeholder slides in the deck.
3. **Section Timing Indicators**: Section divider slides feature estimated time allocations (`[25 min]`, `[45 min]`, `[40 min]`, `[60 min]`).
4. **Tool Boundary Comparison (Slide 3)**: A dedicated 2-way comparison layout (WireMock Downstream Virtualization vs In-Memory Go Interface Mocks) is inserted in Section 01 directly after "What is WireMock?" to cleanly separate in-process unit mocks from real network virtualization.
5. **Action-Oriented Lab Slides**: Section 04 lab challenges present business requirements and acceptance criteria on the left, paired with runnable tasks and verification commands on the right, referencing solution files in `labs/`.

## Consequences
- Keeps the slide deck 100% active and content-dense without dead filler slides.
- Learners gain clear mental models of when to use WireMock versus other testing tools.
