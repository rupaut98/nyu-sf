export const CONVERSATION_HISTORY = [
  {
    section: "Introduction",
    messages: [
      {
        speaker: "Aria (AI Recruiter)",
        message: "Hello Rupak! I'm Aria, an AI recruiter with InnovateAI Solutions. I'll be conducting your initial screening interview for the Machine Learning Engineer position. We'll be discussing your experience with ML, particularly in NLP and LLMs, as well as your technical background and problem-solving approach. How are you today?",
        timestamp: "2024-03-15T10:00:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "Hi Aria! I'm doing well, thank you. I'm particularly excited about this opportunity as it aligns well with my experience in LLM fine-tuning and NLP from my time at OmniSynkAI.",
        timestamp: "2024-03-15T10:00:30Z"
      }
    ]
  },
  {
    section: "Technical Experience - LLM & NLP",
    messages: [
      {
        speaker: "Aria (AI Recruiter)",
        message: "Let's start with your LLM experience. Could you walk me through the BERT-based LLM fine-tuning project at OmniSynkAI? I'm particularly interested in your approach to data preparation, model selection, and evaluation metrics.",
        timestamp: "2024-03-15T10:01:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "Of course. The project involved fine-tuning a BERT model for product feature extraction and description generation. For data preparation, we collected over 100,000 product entries across various categories. We implemented a robust data cleaning pipeline that included:\n\n1. Text normalization and standardization\n2. Custom tokenization for product-specific terminology\n3. Handling of multilingual product descriptions\n\nFor model selection, we evaluated several BERT variants including DistilBERT and RoBERTa, ultimately choosing BERT-base due to its balance of performance and computational requirements. We fine-tuned using a combination of masked language modeling and next sentence prediction tasks.\n\nFor evaluation, we used:\n- ROUGE scores for description generation\n- F1 scores for feature extraction\n- Custom metrics for business-specific requirements\n\nWe achieved 95% accuracy in feature extraction and significantly improved description quality based on human evaluation.",
        timestamp: "2024-03-15T10:01:45Z"
      },
      {
        speaker: "Aria (AI Recruiter)",
        message: "That's quite comprehensive. Could you elaborate on any challenges you faced with the model's inference time in production and how you addressed them?",
        timestamp: "2024-03-15T10:02:15Z"
      },
      {
        speaker: "Rupak Raut",
        message: "The main challenge was meeting our sub-100ms inference time requirement for real-time product processing. We implemented several optimizations:\n\n1. Model quantization: Reduced model size by 75% while maintaining 93% of accuracy\n2. Redis caching: Implemented intelligent caching for frequent queries\n3. Batch processing: Developed a queue system for bulk processing\n4. GPU optimization: Used CUDA optimization and TensorRT\n\nThese improvements reduced our average inference time from 300ms to 70ms while handling 3x more concurrent requests.",
        timestamp: "2024-03-15T10:03:00Z"
      }
    ]
  },
  {
    section: "Cloud Architecture & Scaling",
    messages: [
      {
        speaker: "Aria (AI Recruiter)",
        message: "Let's discuss your experience with cloud infrastructure. How did you handle the deployment and scaling of ML models across different cloud platforms?",
        timestamp: "2024-03-15T10:04:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "I've worked extensively with AWS, Azure, and GCP for ML model deployment. At OmniSynkAI, we used a multi-cloud approach:\n\n1. AWS:\n- Used SageMaker for model training and deployment\n- Implemented ECS with Fargate for containerized inference endpoints\n- Set up Auto Scaling groups based on CPU/GPU utilization\n- Used CloudWatch for monitoring and alerting\n\n2. Azure:\n- Deployed backend services using Azure Kubernetes Service (AKS)\n- Implemented Azure Cache for Redis for response time optimization\n- Used Azure Monitor for performance tracking\n\n3. Infrastructure as Code:\n- Used Terraform for infrastructure provisioning\n- Implemented GitOps workflow with GitHub Actions\n- Maintained separate staging and production environments",
        timestamp: "2024-03-15T10:05:00Z"
      },
      {
        speaker: "Aria (AI Recruiter)",
        message: "Could you share a specific example of a scaling challenge you encountered and how you resolved it?",
        timestamp: "2024-03-15T10:06:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "During Black Friday, we experienced a 10x spike in inference requests. Here's how we handled it:\n\n1. Predictive Scaling:\n- Analyzed historical data to predict load patterns\n- Implemented proactive scaling using AWS Auto Scaling schedules\n\n2. Load Distribution:\n- Set up AWS Global Accelerator for traffic distribution\n- Implemented circuit breakers to prevent cascade failures\n\n3. Cost Optimization:\n- Used Spot instances for non-critical workloads\n- Implemented automatic shutdown of idle resources\n\nThis approach helped us maintain 99.99% uptime during peak load while keeping costs under control.",
        timestamp: "2024-03-15T10:07:00Z"
      }
    ]
  },
  {
    section: "System Design & Architecture",
    messages: [
      {
        speaker: "Aria (AI Recruiter)",
        message: "Let's discuss system design. Could you explain the architecture of the CleanLabel project, particularly how you handled real-time ingredient classification?",
        timestamp: "2024-03-15T10:08:00Z"
      },
      {
        speaker: "Rupak Raut",
        message: "The CleanLabel project used a microservices architecture with the following components:\n\n1. Frontend:\n- Next.js for SSR and optimal performance\n- Redux for state management\n- Real-time updates using WebSocket\n\n2. Backend Services:\n- .NET Core microservices for core business logic\n- Python service for ML inference\n- GraphQL API gateway for efficient data fetching\n\n3. ML Pipeline:\n- Custom NER model using AWS Comprehend\n- Real-time ingredient classification using ensemble approach\n- Automated retraining pipeline for continuous improvement\n\n4. Data Storage:\n- MongoDB for ingredient database\n- Redis for caching and real-time features\n- Elasticsearch for fast ingredient search\n\n5. Monitoring & Logging:\n- ELK stack for log aggregation\n- Prometheus & Grafana for metrics\n- Custom alerting system for accuracy drops",
        timestamp: "2024-03-15T10:09:00Z"
      }
    ]
  }
]; 