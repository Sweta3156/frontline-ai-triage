// backend/models/triageSchema.js
export const triageResponseSchema = {
  type: "object",
  properties: {
    category: {
      type: "string",
      enum: ["Billing", "Technical Support", "Feature Request", "Account", "Spam/Adversarial", "General Query"],
      description: "Primary category of the message."
    },
    priority: {
      type: "string",
      enum: ["P0", "P1", "P2", "P3"],
      description: "P0 = Critical outage/security/legal, P1 = High impact/broken core flow, P2 = Normal question/request, P3 = Low priority/spam/unintelligible."
    },
    summary: {
      type: "string",
      description: "Brief factual summary (10-15 words). Never invent details not present."
    },
    suggested_action: {
      type: "string",
      description: "Concrete next step for automated systems or support agent."
    },
    needs_human: {
      type: "boolean",
      description: "True if low confidence, non-English/adversarial prompt, legal threat, or complex multi-issue."
    },
    confidence: {
      type: "number",
      description: "Confidence score between 0.0 and 1.0 based on clarity and grounding."
    }
  },
  required: ["category", "priority", "summary", "suggested_action", "needs_human", "confidence"]
};