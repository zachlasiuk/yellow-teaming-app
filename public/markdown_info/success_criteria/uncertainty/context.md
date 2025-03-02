# Handling Uncertainty in Technology

## Overview

Many technologies, especially generative AI, struggle with uncertainty, often presenting incorrect or speculative information with unwarranted confidence. This can mislead users, erode trust, and create harmful real-world consequences. Handling uncertainty well means acknowledging limitations, providing sources, and allowing users to assess credibility rather than being deceived by a false sense of certainty.

### Acknowledge what the system does not know

Uncertainty should be made explicit rather than hidden. Systems should:
- Clearly indicate when an answer is probabilistic or speculative.
- Provide source attribution or confidence levels for generated content.
- Allow users to verify or challenge AI-generated information.

### Avoid misleading users with false confidence

When AI or other automated systems present guesses as facts, they contribute to misinformation. Preventing this requires:
- Transparency in AI outputs, including visible disclaimers where uncertainty exists.
- Mechanisms for users to provide feedback on incorrect or misleading outputs.
- Guardrails to prevent confident fabrication, particularly in high-stakes areas like healthcare and finance.

---

## Design Patterns

| Application           | DO                                                                                       | DO NOT                                                                 |
|----------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------------|
| AI-Generated Content | ✅ Clearly mark AI-generated content and indicate confidence levels.         | ❌ Present AI-generated information as absolute truth without caveats.  |
| Search & Discovery  | ✅ Provide sources and allow users to trace information back to origins.     | ❌ Display unverified AI responses without links to credible sources.  |
| Conversational AI   | ✅ Use disclaimers when AI provides speculative or incomplete responses.     | ❌ Generate confident-sounding but incorrect or misleading statements.  |
| Decision Support    | ✅ Show probability estimates for AI-driven recommendations.                 | ❌ Hide uncertainty and present speculative results as definitive.      |

