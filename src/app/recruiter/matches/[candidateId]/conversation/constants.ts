export const CONVERSATION_HISTORY = [
  {
    section: "Introduction",
    messages: [
      {
        speaker: "Bipul (AI Recruiter)",
        message: "Hello Rupak! I'm Bipul, the AI recruiter at InnovateAI. I'll do a quick ML Engineer screening. How are you?",
        timestamp: "2024-03-15T10:00:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "Hi Bipul! I'm doing well and excited about this role given my LLM and NLP experience.",
        timestamp: "2024-03-15T10:00:30Z"
      }
    ]
  },
  {
    section: "Technical Experience - LLM & NLP",
    messages: [
      {
        speaker: "Bipul (AI Recruiter)",
        message: "Can you briefly describe your BERT fine-tuning work, focusing on data prep, model choice, and evaluation?",
        timestamp: "2024-03-15T10:01:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "We fine-tuned a BERT model for product extraction using 100k+ entries, custom tokenization, and achieved 95% accuracy.",
        timestamp: "2024-03-15T10:01:45Z"
      },
      {
        speaker: "Bipul (AI Recruiter)",
        message: "What challenge did you face with inference time?",
        timestamp: "2024-03-15T10:02:15Z"
      },
      {
        speaker: "Rupak Raut",
        message: "Inference was slow initially; quantization, caching, batch processing, and GPU tweaks dropped time to 70ms.",
        timestamp: "2024-03-15T10:03:00Z"
      }
    ]
  },
  {
    section: "Cloud Architecture & Scaling",
    messages: [
      {
        speaker: "Bipul (AI Recruiter)",
        message: "Tell me about your cloud deployment and scaling for ML models.",
        timestamp: "2024-03-15T10:04:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "I deployed on AWS, Azure, and GCP with containerized endpoints and auto-scaling for smooth operations.",
        timestamp: "2024-03-15T10:05:00Z"
      },
      {
        speaker: "Bipul (AI Recruiter)",
        message: "Can you give an example of a scaling challenge?",
        timestamp: "2024-03-15T10:06:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "During a major event, we faced a 10x spike; predictive scaling and load distribution maintained 99.99% uptime.",
        timestamp: "2024-03-15T10:07:00Z"
      }
    ]
  },
  {
    section: "System Design & Architecture",
    messages: [
      {
        speaker: "Bipul (AI Recruiter)",
        message: "Explain the CleanLabel project architecture, emphasizing real-time ingredient classification.",
        timestamp: "2024-03-15T10:08:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "We used a microservices setup with a Next.js frontend, .NET/Python backends, GraphQL API gateway, and MongoDB.",
        timestamp: "2024-03-15T10:09:00Z"
      }
    ]
  },
  {
    section: "Team Collaboration & Leadership",
    messages: [
      {
        speaker: "Bipul (AI Recruiter)",
        message: "How do you work with teams on ML projects?",
        timestamp: "2024-03-15T10:10:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "I collaborate across teams, lead standups, mentor juniors, and streamlined our code reviews.",
        timestamp: "2024-03-15T10:11:00Z"
      },
      {
        speaker: "Bipul (AI Recruiter)",
        message: "How do you handle technical disagreements?",
        timestamp: "2024-03-15T10:12:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "I rely on data-driven proofs and open discussions to reach consensus.",
        timestamp: "2024-03-15T10:13:00Z"
      }
    ]
  },
  {
    section: "Closing Discussion",
    messages: [
      {
        speaker: "Bipul (AI Recruiter)",
        message: "Thanks for sharing. Do you have questions about the role or process?",
        timestamp: "2024-03-15T10:14:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "I'd like to know about initial projects, team structure, and model experimentation.",
        timestamp: "2024-03-15T10:15:00Z"
      },
      {
        speaker: "Bipul (AI Recruiter)",
        message: "Great. You'll next meet our technical team. Expect an email with details.",
        timestamp: "2024-03-15T10:16:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "Thank you, Bipul. Looking forward to it.",
        timestamp: "2024-03-15T10:17:00Z"
      },
      {
        speaker: "Bipul (AI Recruiter)",
        message: "You're welcome. Good luck!",
        timestamp: "2024-03-15T10:18:00Z"
      }
    ]
  }
]; 