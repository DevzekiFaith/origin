import React from "react";
import {
  Zap,
  Target,
  Briefcase,
  TrendingUp,
  Shield,
  Heart,
  Search,
  ChevronRight,
  PlayCircle
} from "lucide-react";

export interface Resource {
  name: string;
  url: string;
  content?: string;
  type?: 'pdf' | 'video' | 'article' | 'exercise' | 'template' | 'download';
  downloadable?: boolean;
}

export interface ModuleDetail {
  title: string;
  description: string;
  objectives: string[];
  content: string;
  topics?: string[]; // New structured topics
  activities: string[];
  resources: Resource[];
  estimatedTime: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  ageRange: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgGradient: string;
  imageUrl?: string;
  featured?: boolean;
  status?: string;
  duration?: string;
  priceUSD?: number;
  priceNGN?: number;
  isFree?: boolean; // Indicates if course is available to free users
  modules?: string[];
  outcomes?: string[];
  youtubeVideoUrl?: string; // Simple YouTube integration
  detailedModules?: ModuleDetail[]; // Detailed module content
  trackId?: string; // Links course to a learning track
  // Udemy/Domestika style metadata
  instructor?: string;
  instructorTitle?: string;
  rating?: number;
  reviewCount?: number;
  studentCount?: number;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  isBestseller?: boolean;
  isNew?: boolean;
  language?: string;
  lastUpdated?: string;
}

export const QUARTERLY_PASS_PRICE_USD = 49;

export const courses: Course[] = [
  {
    id: "problem-solving",
    title: "8 Ways to Develop Solution Mindset",
    description: "Develop a systematic approach to solving problems creatively and effectively. Learn critical thinking skills, analytical frameworks, and practical strategies for overcoming challenges in life and work.",
    fullDescription: "Problem solving is at the heart of success in every field. This course teaches you to approach problems systematically, think critically, and develop creative solutions. You'll learn proven frameworks, analytical tools, and mental models that help you tackle complex challenges with confidence and clarity.",
    ageRange: "12-45",
    icon: Zap,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    featured: true,
    duration: "5 weeks",
    priceUSD: 14,
    trackId: "classical-thinking",
    instructor: "Zeki Ubor & The Becoming Institute",
    instructorTitle: "The Becoming Institute",
    rating: 4.9,
    reviewCount: 892,
    studentCount: 5621,
    level: "Intermediate",
    isBestseller: true,
    language: "English",
    lastUpdated: "2026",
    modules: [
      "Problem Solving Fundamentals",
      "Critical Thinking Skills",
      "Analytical Frameworks",
      "Creative Problem Solving",
      "Decision Making Tools",
      "Overcoming Mental Blocks",
      "Collaborative Problem Solving",
      "Real-World Applications"
    ],
    outcomes: [
      "Approach problems systematically",
      "Think critically and analytically",
      "Generate creative solutions",
      "Make better decisions under pressure",
      "Solve complex real-world problems",
      "Build confidence in problem-solving"
    ],
    youtubeVideoUrl: "https://www.youtube.com/watch?v=J-gKJDk0E7Y", // "How to solve any problem" video
    detailedModules: [
      {
        title: "Problem Solving Fundamentals",
        icon: Zap,
        description: "Learn the core principles of systematic problem solving and develop a structured approach to tackling challenges.",
        objectives: [
          "Understand what constitutes a problem",
          "Learn the difference between symptoms and root causes",
          "Develop a systematic approach to problem identification"
        ],
        topics: [
          "Problem Definition: Articulating the core issue",
          "Root Cause Analysis: Digging beyond symptoms",
          "Problem Framing: Multi-perspective analysis",
          "Solution Criteria: Evaluating success"
        ],
        content: `Problem solving is at the heart of innovation and progress. Every great invention, every successful business, and every personal breakthrough starts with the ability to identify and solve problems effectively.

The key insight is that most people jump to solutions without properly understanding the problem. This module teaches you to slow down, analyze thoroughly, and approach problems with clarity and confidence.`,
        activities: [
          "Identify 3 problems in your daily life and practice defining them clearly",
          "Use the 5-Why technique to find root causes of common issues",
          "Practice reframing a problem from 3 different perspectives",
          "Complete the interactive problem-solving exercise below"
        ],
        resources: [
          { name: "5 Whys Technique Explained (Video)", url: "https://www.youtube.com/watch?v=UbDt2FKRQNs", type: "video" },
          { name: "Problem Definition Framework (Article)", url: "https://hbr.org/2021/06/how-to-define-a-problem", type: "article" },
          { name: "Root Cause Analysis Guide (Article)", url: "https://asq.org/quality-resources/root-cause-analysis", type: "article" },
          { name: "Problem-Solving Worksheet", url: "#", type: "template", downloadable: true, content: "Problem-Solving Worksheet\n\n1. Problem Statement:\n   - What is the issue?\n   - When does it occur?\n   - Who is affected?\n\n2. Root Cause Analysis (5 Whys):\n   - Why #1:\n   - Why #2:\n   - Why #3:\n   - Why #4:\n   - Why #5:\n\n3. Potential Solutions:\n   - Solution 1:\n   - Solution 2:\n   - Solution 3:\n\n4. Evaluation Criteria:\n   - Cost:\n   - Time:\n   - Resources:\n   - Impact:\n\n5. Selected Solution:\n   - Why this solution:\n   - Implementation steps:\n   - Success metrics:" },
          { name: "Daily Problem Log", url: "#", type: "exercise", downloadable: true, content: "Daily Problem Log\n\nDate: ___________\n\nProblems Identified Today:\n1. \n2. \n3. \n\nFor each problem, apply:\n- Clear definition:\n- Root cause (5 Whys):\n- Potential solutions:\n- Best solution chosen:\n\nReflection:\nWhat did I learn today about my problem-solving approach?" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Critical Thinking Skills",
        description: "Develop your ability to analyze information objectively and make reasoned judgments.",
        objectives: [
          "Learn to evaluate information sources",
          "Develop logical reasoning skills",
          "Understand cognitive biases and how to avoid them"
        ],
        topics: [
          "Information Evaluation: Assessing credibility",
          "Logical Reasoning: Building evidence-based arguments",
          "Cognitive Biases: Avoiding thinking traps",
          "Critical Questions: Essential analytical inquiries"
        ],
        content: `Critical thinking is the foundation of good decision-making. It's the ability to objectively analyze information, question assumptions, and make reasoned judgments.

Critical thinking is a skill that improves with practice. The more you apply these techniques, the more natural they become.`,
        activities: [
          "Evaluate the credibility of 5 different news sources",
          "Practice identifying logical fallacies in arguments",
          "Create a critical thinking checklist for daily decisions",
          "Complete the critical thinking assessment exercise"
        ],
        resources: [
          { name: "Critical Thinking Explained (Video)", url: "https://www.youtube.com/watch?v=6dl_UJcOy1I", type: "video" },
          { name: "Cognitive Bias Guide (Article)", url: "https://thedecisionlab.com/bias-directory/", type: "article" },
          { name: "Logical Fallacies Guide (Article)", url: "https://yourlogicalfallacyis.com/", type: "article" },
          { name: "Critical Thinking Checklist", url: "#", type: "template", downloadable: true, content: "Critical Thinking Checklist\n\nBefore making a decision, ask:\n\n1. What is the source of this information?\n2. What evidence supports this claim?\n3. Are there alternative explanations?\n4. What biases might be influencing this?\n5. What are the counter-arguments?\n6. What assumptions am I making?\n7. What would change my mind?\n\nDaily Critical Thinking Exercise:\n- News story I read today:\n- Source credibility check:\n- Evidence evaluation:\n- Bias identification:\n- Conclusion:" },
          { name: "Logical Fallacies Reference Card", url: "#", type: "template", downloadable: true, content: "Common Logical Fallacies\n\n1. Ad Hominem: Attacking the person instead of the argument\n2. Straw Man: Misrepresenting someone's argument\n3. Appeal to Authority: Relying on authority rather than evidence\n4. False Dilemma: Presenting only two options when more exist\n5. Slippery Slope: Assuming one thing leads to another without evidence\n6. Circular Reasoning: Conclusion is included in the premise\n7. Hasty Generalization: Making broad conclusions from limited evidence\n8. Appeal to Emotion: Using emotion instead of logic\n9. Tu Quoque: 'You too' fallacy\n10. Red Herring: Distracting from the real issue\n\nPractice: Identify 3 fallacies in daily conversations or media" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Analytical Frameworks",
        icon: TrendingUp,
        description: "Learn proven frameworks for breaking down complex problems and finding effective solutions.",
        objectives: [
          "Master different analytical frameworks",
          "Learn when to apply each framework",
          "Practice applying frameworks to real problems"
        ],
        topics: [
          "SWOT Analysis: Strategic assessment",
          "Fishbone Diagram: Root cause mapping",
          "Decision Matrix: Comparative evaluation",
          "Mind Mapping: Visual exploration",
          "Force Field Analysis: Change drivers"
        ],
        content: `Different problems require different approaches. This module introduces you to several powerful analytical frameworks that can help you tackle any challenge.

Each framework has its strengths and is best applied to specific types of problems.`,
        activities: [
          "Apply SWOT analysis to a personal goal",
          "Use a decision matrix to choose between 3 options",
          "Create a mind map for a complex problem",
          "Complete the framework selection exercise"
        ],
        resources: [
          { name: "SWOT Analysis Guide (Article)", url: "https://www.mindtools.com/pages/article/newTMC_05.htm", type: "article" },
          { name: "Decision Matrix Template (Tool)", url: "https://www.vertex42.com/ExcelTemplates/decision-matrix.html", type: "template" },
          { name: "Mind Mapping Tutorial (Video)", url: "https://www.youtube.com/watch?v=MlabrWv25q0", type: "video" },
          { name: "SWOT Analysis Template", url: "#", type: "template", downloadable: true, content: "SWOT Analysis Template\n\nProject/Goal: __________________\n\nSTRENGTHS (Internal, Positive)\n- What do you do well?\n- What unique resources do you have?\n- What do others see as your strengths?\n\nWEAKNESSES (Internal, Negative)\n- What could you improve?\n- What resources are you lacking?\n- What do others see as your weaknesses?\n\nOPPORTUNITIES (External, Positive)\n- What opportunities are available?\n- What trends could you take advantage of?\n- How can you turn strengths into opportunities?\n\nTHREATS (External, Negative)\n- What threats could harm you?\n- What are your competitors doing?\n- What obstacles do you face?\n\nAction Plan:\n1. \n2. \n3. " },
          { name: "Decision Matrix Worksheet", url: "#", type: "exercise", downloadable: true, content: "Decision Matrix Worksheet\n\nDecision to make: __________________\n\nCriteria (rate importance 1-5):\n1. ___________ (Importance: ___)\n2. ___________ (Importance: ___)\n3. ___________ (Importance: ___)\n4. ___________ (Importance: ___)\n\nOptions:\nOption A | Option B | Option C\n---------|---------|---------\nScore for each criterion:\n\nTotal Score:\nOption A: ___\nOption B: ___\nOption C: ___\n\nDecision: _________\nReason: ___________" }
        ],
        estimatedTime: "55 minutes"
      },
      {
        title: "Creative Problem Solving",
        icon: PlayCircle,
        description: "Unlock your creativity and learn techniques for generating innovative solutions.",
        objectives: [
          "Learn creative thinking techniques",
          "Overcome mental blocks",
          "Generate innovative solutions"
        ],
        content: `Creativity is not just for artists—it's essential for effective problem solving. This module teaches you how to break free from conventional thinking and generate innovative solutions.

You'll discover:

Brainstorming Techniques: Rules for effective idea generation
Lateral Thinking: Creative approaches to problem solving
SCAMPER Method: Systematic creativity technique
Analogical Thinking: Using metaphors and analogies
Mindfulness Practices: Techniques to clear mental blocks

Creativity is a skill that can be developed and strengthened with practice.`,
        activities: [
          "Brainstorm 50 uses for a paperclip",
          "Use SCAMPER to improve a common product",
          "Practice a 10-minute mindfulness exercise"
        ],
        resources: [
          { name: "SCAMPER Technique Explained (Article)", url: "https://www.mindtools.com/pages/article/newCT_02.htm", type: "article" },
          { name: "Brainstorming Techniques (Video)", url: "https://www.youtube.com/watch?v=zD3Fg_g4h3Y", type: "video" },
          { name: "Mindfulness for Creativity (Article)", url: "https://positivepsychology.com/mindfulness-creativity/", type: "article" },
          { name: "SCAMPER Creative Worksheet", url: "#", type: "template", downloadable: true, content: "SCAMPER Creative Problem-Solving Worksheet\n\nProblem/Product to Improve: __________________\n\nS — SUBSTITUTE\nWhat can you substitute or swap?\n- Material: ___________\n- Process: ___________\n- Person: ___________\n\nC — COMBINE\nWhat can you combine or merge?\n- Combine with: ___________\n- Merge purposes: ___________\n\nA — ADAPT\nWhat can you adapt or adjust?\n- From another industry: ___________\n- From nature: ___________\n\nM — MODIFY / MAGNIFY / MINIFY\nWhat can you change in size, shape, or attributes?\n- Make bigger: ___________\n- Make smaller: ___________\n- Change form: ___________\n\nP — PUT TO OTHER USES\nHow else can it be used?\n- New market: ___________\n- Unexpected use: ___________\n\nE — ELIMINATE\nWhat can you remove or simplify?\n- Remove step: ___________\n- Simplify: ___________\n\nR — REVERSE / REARRANGE\nWhat if you reversed the order or rearranged elements?\n- Reverse: ___________\n- Rearrange: ___________\n\nBest Idea Generated: __________________\nNext Step: __________________" },
          { name: "Creative Thinking Brainstorm Log", url: "#", type: "exercise", downloadable: true, content: "Creative Thinking Brainstorm Log\n\nChallenge/Problem: __________________\n\nRound 1 — Wild Ideas (no filtering, 5 minutes)\n1. \n2. \n3. \n4. \n5. \n6. \n7. \n8. \n9. \n10. \n\nRound 2 — Build on Best Ideas\nIdea A expanded: ___________\nIdea B expanded: ___________\nIdea C expanded: ___________\n\nRound 3 — Combine & Refine\nCombined concept: ___________\n\nTop 3 Solutions:\n1. ___________\n2. ___________\n3. ___________\n\nChosen Solution & Why: __________________" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Decision Making Tools",
        icon: Target,
        description: "Learn practical tools for making better decisions under pressure.",
        objectives: [
          "Master decision-making frameworks",
          "Learn to handle uncertainty",
          "Make confident decisions"
        ],
        content: `Good problem solving requires good decision making. This module provides you with practical tools and frameworks for making effective decisions, even in uncertain or high-pressure situations.

You'll learn:

Pros/Cons Analysis: Balanced evaluation technique
Decision Trees: Visual decision mapping
Expected Value: Mathematical approach to uncertainty
Pre-mortem Analysis: Anticipating potential failures
Satisficing: Good enough decision making

These tools will help you make better decisions consistently.`,
        activities: [
          "Create a decision tree for a major life choice",
          "Conduct a pre-mortem analysis for a project",
          "Use expected value to evaluate a risky decision"
        ],
        resources: [
          { name: "Decision Tree Tutorial (Video)", url: "https://www.youtube.com/watch?v=Na8A9E5e1fM", type: "video" },
          { name: "Pre-mortem Analysis Guide (Article)", url: "https://hbr.org/2007/09/performing-a-project-premortem", type: "article" },
          { name: "Expected Value Calculator (Tool)", url: "https://www.omnicalculator.com/statistics/expected-value", type: "template" },
          { name: "Decision Tools Comparison Sheet", url: "#", type: "template", downloadable: true, content: "Decision Tools Comparison Sheet\n\nWhen to use each tool:\n\n1. PROS / CONS LIST\nBest for: Simple personal decisions\nTime needed: 5-15 minutes\nSteps: List all pros, list all cons, weigh which side is stronger\nMy decision: ___________\n\n2. DECISION TREE\nBest for: Sequential decisions with multiple outcomes\nTime needed: 15-30 minutes\nSteps: Map out each choice branch, assign probabilities, calculate expected value\nMy decision: ___________\n\n3. PRE-MORTEM ANALYSIS\nBest for: High-stakes decisions before implementation\nTime needed: 20-40 minutes\nSteps: Imagine it failed, list all reasons why, fix them before you start\nMy decision: ___________\n\n4. SATISFICING\nBest for: Low-stakes decisions with many options\nTime needed: 5-10 minutes\nSteps: Define minimum criteria, pick first option that meets them\nMy decision: ___________\n\nMy Go-To Tool for Most Decisions: __________________" },
          { name: "Pre-Mortem Analysis Worksheet", url: "#", type: "exercise", downloadable: true, content: "Pre-Mortem Analysis Worksheet\n\nDecision / Project: __________________\n\nStep 1 — Imagine It's 6 Months Later and This FAILED\nWrite the headline: \"[Project] Failed Because...\"\n___________\n\nStep 2 — List Every Reason It Could Fail\n1. ___________\n2. ___________\n3. ___________\n4. ___________\n5. ___________\n6. ___________\n\nStep 3 — Rank by Probability (High / Medium / Low)\nRisk 1: ___________ Probability: ___\nRisk 2: ___________ Probability: ___\nRisk 3: ___________ Probability: ___\n\nStep 4 — Prevention Plan\nFor each high-probability risk, what will you do now?\nRisk 1 Prevention: ___________\nRisk 2 Prevention: ___________\nRisk 3 Prevention: ___________\n\nStep 5 — Go / No-Go Decision\nAfter this analysis, I will: GO / MODIFY / STOP\nReason: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Overcoming Mental Blocks",
        description: "Learn to identify and overcome common barriers to effective problem solving.",
        objectives: [
          "Identify personal mental blocks",
          "Learn techniques to overcome them",
          "Build problem-solving resilience"
        ],
        content: `Mental blocks can prevent us from solving problems effectively. This module helps you identify common barriers and develop strategies to overcome them.

You'll explore:

Cognitive Biases: Hidden thinking traps
Emotional Barriers: Fear, anxiety, frustration
Environmental Factors: Distractions and constraints
Motivational Blocks: Lack of confidence or interest
Time Pressure: Decision fatigue and rushed thinking

Understanding these blocks is the first step to overcoming them.`,
        activities: [
          "Identify your top 3 mental blocks",
          "Practice a technique for each block type",
          "Create a personal mental block prevention plan"
        ],
        resources: [
          { name: "Overcoming Mental Blocks (Article)", url: "https://www.verywellmind.com/overcoming-mental-blocks-3145179", type: "article" },
          { name: "Cognitive Bias Examples (Article)", url: "https://thedecisionlab.com/bias-directory/", type: "article" },
          { name: "How to Overcome a Mental Block (Video)", url: "https://www.youtube.com/watch?v=QVeIOqeqg5g", type: "video" },
          { name: "My Mental Block Inventory", url: "#", type: "exercise", downloadable: true, content: "My Mental Block Inventory\n\nDate: ___________\n\nPart 1: Identify Your Blocks\nFor each category, rate how often it stops you (1 = rarely, 5 = always):\n\nCognitive Biases\n- Confirmation bias (only seeing what I already believe): ___/5\n- All-or-nothing thinking: ___/5\n- Catastrophising (assuming the worst): ___/5\n\nEmotional Barriers\n- Fear of failure: ___/5\n- Fear of judgment: ___/5\n- Overwhelm/anxiety: ___/5\n\nEnvironmental Blocks\n- Distractions/noise: ___/5\n- Wrong environment: ___/5\n\nMotivational Blocks\n- Lack of clarity on the goal: ___/5\n- Low energy/burnout: ___/5\n\nPart 2: My Top 3 Blocks\n1. ___________\n2. ___________\n3. ___________\n\nPart 3: Unblock Strategies\nFor Block 1: ___________\nFor Block 2: ___________\nFor Block 3: ___________\n\nThis Week I Will Practice: __________________" },
          { name: "Mental Block Prevention Plan", url: "#", type: "template", downloadable: true, content: "Mental Block Prevention Plan\n\nMy Biggest Mental Block: __________________\n\nTriggers (when does it happen?):\n- Situation 1: ___________\n- Situation 2: ___________\n- Situation 3: ___________\n\nWarning Signs (how do I know it's starting?):\n- Physical sign: ___________\n- Thought pattern: ___________\n- Behaviour sign: ___________\n\nMy Interruption Technique:\nWhen I notice the block, I will immediately: ___________\n\nReplacement Habit:\nInstead of getting blocked, I will: ___________\n\n30-Day Practice Log:\nWeek 1: Used technique ___ times. Result: ___________\nWeek 2: Used technique ___ times. Result: ___________\nWeek 3: Used technique ___ times. Result: ___________\nWeek 4: Used technique ___ times. Result: ___________\n\nProgress Review: ___________" }
        ],
        estimatedTime: "40 minutes"
      },
      {
        title: "Collaborative Problem Solving",
        description: "Learn how to solve problems effectively with teams and groups.",
        objectives: [
          "Master group problem-solving techniques",
          "Handle team dynamics",
          "Facilitate effective collaboration"
        ],
        content: `Many problems are too complex for individuals to solve alone. This module teaches you how to harness the power of teams and groups for better problem solving.

You'll learn:

Group Dynamics: Understanding team interactions
Facilitation Techniques: Leading group problem-solving sessions
Conflict Resolution: Managing disagreements constructively
Diverse Perspectives: Leveraging different viewpoints
Consensus Building: Reaching group agreement

Effective collaboration can lead to better solutions than any individual could create alone.`,
        activities: [
          "Facilitate a group problem-solving session",
          "Practice conflict resolution in a team setting",
          "Lead a consensus-building exercise"
        ],
        resources: [
          { name: "Group Facilitation Guide (Article)", url: "https://www.mindtools.com/pages/article/group-facilitation.htm", type: "article" },
          { name: "Conflict Resolution Techniques (Video)", url: "https://www.youtube.com/watch?v=KY5a1aJ8b3I", type: "video" },
          { name: "Team Building Activities (Article)", url: "https://www.teambuilding.co.uk/", type: "article" },
          { name: "Group Problem-Solving Session Guide", url: "#", type: "template", downloadable: true, content: "Group Problem-Solving Session Guide\n\nSession Date: ___________\nFacilitator: ___________\nAttendees: ___________\nProblem to Solve: __________________\n\nPHASE 1 — DEFINE (10 min)\nProblem statement agreed by group:\n___________\n\nWhat does success look like?\n___________\n\nPHASE 2 — GENERATE IDEAS (15 min)\nRules: No criticism, all ideas welcome, build on others\nIdeas raised:\n1. \n2. \n3. \n4. \n5. \n\nPHASE 3 — EVALUATE (10 min)\nCriteria for best solution (agree as a group):\n1. ___________\n2. ___________\nTop 3 ideas after evaluation:\n1. \n2. \n3. \n\nPHASE 4 — DECIDE & ASSIGN (5 min)\nChosen solution: ___________\nOwner: ___________\nDeadline: ___________\nReview date: ___________\n\nOpen questions / parking lot: ___________" },
          { name: "Consensus Builder Template", url: "#", type: "exercise", downloadable: true, content: "Consensus Builder Template\n\nDecision to Make: __________________\n\nStep 1 — Each person rates each option (1-5):\nOption A: ___________ | Name 1: ___ | Name 2: ___ | Name 3: ___ | Total: ___\nOption B: ___________ | Name 1: ___ | Name 2: ___ | Name 3: ___ | Total: ___\nOption C: ___________ | Name 1: ___ | Name 2: ___ | Name 3: ___ | Total: ___\n\nStep 2 — Discuss the lowest-rated options\nConcerns raised: ___________\nModifications suggested: ___________\n\nStep 3 — Re-vote after discussion\nFinal Option A: ___ | Final Option B: ___ | Final Option C: ___\n\nStep 4 — Document the decision\nGroup Decision: __________________\nRationale: ___________\nDissenting views acknowledged: ___________\nAll agree to support: Yes / Partially / No\n\nNext Steps: ___________" }
        ],
        estimatedTime: "55 minutes"
      },
      {
        title: "Real-World Applications",
        description: "Apply problem-solving skills to real-world scenarios and challenges.",
        objectives: [
          "Apply skills to complex real-world problems",
          "Learn from case studies",
          "Develop comprehensive problem-solving approach"
        ],
        content: `Theory is important, but application is where real learning happens. This final module brings together all the skills you've learned and applies them to real-world scenarios.

You'll explore:

Case Studies: Real problem-solving successes and failures
Industry Applications: Problem solving in different fields
Personal Challenges: Applying skills to life problems
Systematic Approach: Complete problem-solving methodology
Continuous Improvement: Learning from experience

This module helps you integrate all the skills into a comprehensive problem-solving approach.`,
        activities: [
          "Analyze a famous problem-solving case study",
          "Apply the complete methodology to a personal problem",
          "Create a problem-solving action plan"
        ],
        resources: [
          { name: "Problem-Solving Case Studies (Article)", url: "https://hbr.org/topic/problem-solving", type: "article" },
          { name: "Action Plan Template (Tool)", url: "https://www.atlassian.com/software/confluence/templates/action-plan", type: "template" },
          { name: "Full Problem-Solving Method (Video)", url: "https://www.youtube.com/watch?v=0bRNyRhCbzI", type: "video" },
          { name: "My Problem-Solving Action Plan", url: "#", type: "template", downloadable: true, content: "My Problem-Solving Action Plan\n\nDate: ___________\n\nProblem Statement (clear, specific): __________________\n\nRoot Cause (from 5-Whys analysis): __________________\n\nSolution Chosen: __________________\n\nWhy This Solution: ___________\n\nImplementation Steps:\n\nStep 1: ___________\n- Who: ___________\n- By When: ___________\n- Resources needed: ___________\n\nStep 2: ___________\n- Who: ___________\n- By When: ___________\n- Resources needed: ___________\n\nStep 3: ___________\n- Who: ___________\n- By When: ___________\n- Resources needed: ___________\n\nPotential Obstacles:\n1. ___________ → Mitigation: ___________\n2. ___________ → Mitigation: ___________\n\nHow I'll Know It's Working:\nMetric 1: ___________\nMetric 2: ___________\n\nReview Date: ___________\n\nLessons Learned (after implementation): ___________" },
          { name: "Course Completion Reflection", url: "#", type: "exercise", downloadable: true, content: "Course Completion Reflection — 8 Ways to Develop Solution Mindset\n\nDate Completed: ___________\n\nThe 8 Ways I've Learned:\n1. Problem Solving Fundamentals\n2. Critical Thinking Skills\n3. Analytical Frameworks\n4. Creative Problem Solving\n5. Decision Making Tools\n6. Overcoming Mental Blocks\n7. Collaborative Problem Solving\n8. Real-World Applications\n\nMy Top 3 Takeaways:\n1. ___________\n2. ___________\n3. ___________\n\nSkill I've Improved Most: __________________\n\nSkill I Still Want to Work On: __________________\n\nOne Problem I've Already Solved Better: __________________\n\nMy 30-Day Practice Commitment:\n___________\n\n90-Day Goal Using These Skills:\n___________" }
        ],
        estimatedTime: "60 minutes"
      }
    ],
  },
  {
    id: "decision-making",
    title: "9 Ways to Master Decision-Making",
    description: "Develop critical thinking skills and frameworks for making better decisions under pressure. Learn to analyze situations, weigh options, and choose paths that lead to success.",
    fullDescription: "Every day, we make countless decisions that shape our lives. This course provides you with proven frameworks and tools to make better decisions, especially under pressure. You'll learn how to gather information effectively, analyze options objectively, and implement decisions with confidence.",
    ageRange: "12-45",
    icon: Target,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: false,
    duration: "5 weeks",
    priceUSD: 14,
    trackId: "leadership",
    instructor: "The Becoming Institute",
    instructorTitle: "Human Architecture Specialist",
    rating: 4.8,
    reviewCount: 723,
    studentCount: 4231,
    level: "Intermediate",
    language: "English",
    lastUpdated: "2026",
    modules: [
      "Decision-Making Fundamentals",
      "Critical Thinking Skills",
      "Information Gathering",
      "Analysis Frameworks",
      "Inversion Thinking",
      "Risk Assessment",
      "Decision Implementation",
      "Learning from Outcomes",
      "Advanced Techniques"
    ],
    outcomes: [
      "Make faster, better decisions",
      "Reduce decision fatigue",
      "Handle pressure effectively",
      "Learn from past decisions",
      "Build confidence in your choices"
    ],
    youtubeVideoUrl: "https://www.youtube.com/watch?v=8GQZuzIdeQQ", // Ruth Chang — "How to Make Hard Choices" (TED) — 14M+ views
    detailedModules: [
      {
        title: "Decision-Making Fundamentals",
        description: "Learn the basic principles of effective decision-making and understand the decision-making process.",
        objectives: [
          "Understand the decision-making process",
          "Learn to identify decision criteria",
          "Develop confidence in making choices"
        ],
        content: `Every day, we make countless decisions that shape our lives and futures. Effective decision-making is a skill that can be learned and improved with practice.

This foundational module covers:

Decision Types: Understanding different kinds of decisions
Decision Criteria: How to identify what matters most
Decision Process: A systematic approach to making choices
Decision Quality: How to know if you've made a good decision

The goal is to move from impulsive or emotional decisions to thoughtful, strategic choices that serve your long-term goals.`,
        activities: [
          "Categorize 10 recent decisions by type",
          "Create a personal decision-making framework",
          "Practice making a small decision using the framework",
          "Complete the decision-making exercise worksheet"
        ],
        resources: [
          { name: "Decision-Making Framework (Article)", url: "https://hbr.org/2019/06/how-to-make-better-decisions", type: "article" },
          { name: "Decision Types Explained (Video)", url: "https://www.youtube.com/watch?v=d7Jnmi2BkS8", type: "video" },
          { name: "Decision Quality Checklist (Tool)", url: "https://www.mindtools.com/pages/article/newTED_00.htm", type: "template" },
          { name: "Decision-Making Worksheet", url: "#", type: "exercise", downloadable: true, content: "Decision-Making Worksheet\n\nDecision to make: __________________\n\nDecision Type:\n- Routine\n- Strategic\n- Crisis\n- Ethical\n\nDecision Criteria (rate importance 1-5):\n1. ___________ (Importance: ___)\n2. ___________ (Importance: ___)\n3. ___________ (Importance: ___)\n\nOptions:\nOption A: _______________\nOption B: _______________\nOption C: _______________\n\nEvaluation:\nOption A Score: ___\nOption B Score: ___\nOption C Score: ___\n\nDecision: _________\nConfidence Level: ___/10\n\nImplementation Plan:\n1. \n2. \n3. " },
          { name: "Daily Decision Log", url: "#", type: "exercise", downloadable: true, content: "Daily Decision Log\n\nDate: ___________\n\nDecisions Made Today:\n1. Decision: ___________\n   Type: ___________\n   Process Used: ___________\n   Outcome: ___________\n\n2. Decision: ___________\n   Type: ___________\n   Process Used: ___________\n   Outcome: ___________\n\n3. Decision: ___________\n   Type: ___________\n   Process Used: ___________\n   Outcome: ___________\n\nReflection:\nWhat decision-making patterns do I notice?\nWhat can I improve tomorrow?" }
        ],
        estimatedTime: "40 minutes"
      },
      {
        title: "Critical Thinking Skills",
        description: "Develop your ability to analyze information objectively and make reasoned judgments.",
        objectives: [
          "Learn to evaluate information sources",
          "Develop logical reasoning skills",
          "Understand cognitive biases and how to avoid them"
        ],
        content: `Critical thinking is the foundation of good decision-making. It's the ability to objectively analyze information, question assumptions, and make reasoned judgments.

This module covers:

Information Evaluation: How to assess the credibility of sources
Logical Reasoning: Building arguments based on evidence
Cognitive Biases: Common mental shortcuts that lead to poor decisions
Critical Questions: What questions to ask when evaluating information

Critical thinking is a skill that improves with practice. The more you apply these techniques, the more natural they become.`,
        activities: [
          "Evaluate the credibility of 5 different news sources",
          "Practice identifying logical fallacies in arguments",
          "Create a critical thinking checklist for daily decisions",
          "Complete the critical thinking assessment exercise"
        ],
        resources: [
          { name: "Critical Thinking Explained (Video)", url: "https://www.youtube.com/watch?v=6dl_UJcOy1I", type: "video" },
          { name: "Cognitive Bias Guide (Article)", url: "https://thedecisionlab.com/bias-directory/", type: "article" },
          { name: "Logical Fallacies Guide (Article)", url: "https://yourlogicalfallacyis.com/", type: "article" },
          { name: "Critical Thinking Checklist", url: "#", type: "template", downloadable: true, content: "Critical Thinking Checklist\n\nBefore making a decision, ask:\n\n1. What is the source of this information?\n2. What evidence supports this claim?\n3. Are there alternative explanations?\n4. What biases might be influencing this?\n5. What are the counter-arguments?\n6. What assumptions am I making?\n7. What would change my mind?\n\nDaily Critical Thinking Exercise:\n- News story I read today:\n- Source credibility check:\n- Evidence evaluation:\n- Bias identification:\n- Conclusion:" },
          { name: "Logical Fallacies Reference Card", url: "#", type: "template", downloadable: true, content: "Common Logical Fallacies\n\n1. Ad Hominem: Attacking the person instead of the argument\n2. Straw Man: Misrepresenting someone's argument\n3. Appeal to Authority: Relying on authority rather than evidence\n4. False Dilemma: Presenting only two options when more exist\n5. Slippery Slope: Assuming one thing leads to another without evidence\n6. Circular Reasoning: Conclusion is included in the premise\n7. Hasty Generalization: Making broad conclusions from limited evidence\n8. Appeal to Emotion: Using emotion instead of logic\n9. Tu Quoque: 'You too' fallacy\n10. Red Herring: Distracting from the real issue\n\nPractice: Identify 3 fallacies in daily conversations or media" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Information Gathering",
        description: "Learn effective techniques for collecting and organizing information for better decisions.",
        objectives: [
          "Master information gathering techniques",
          "Learn to organize and prioritize information",
          "Avoid information overload"
        ],
        content: `Good decisions require good information. This module teaches you how to gather, organize, and prioritize information effectively.

You'll learn:

Research Techniques: Systematic information gathering
Source Evaluation: Assessing information quality
Data Organization: Structuring information for analysis
Information Prioritization: Focusing on what matters most
Avoiding Overload: Managing information volume

The key is gathering the right information, not just more information.`,
        activities: [
          "Research a topic using multiple source types",
          "Create an information organization system",
          "Practice prioritizing information for a decision",
          "Complete the information gathering exercise"
        ],
        resources: [
          { name: "Research Methods Guide (Article)", url: "https://libguides.mit.edu/researchmethods", type: "article" },
          { name: "Information Organization Tools (Article)", url: "https://www.notion.so/product/notion-ai", type: "article" },
          { name: "Source Evaluation Checklist (Tool)", url: "https://www.craaptest.org/", type: "template" },
          { name: "Research Planning Worksheet", url: "#", type: "exercise", downloadable: true, content: "Research Planning Worksheet\n\nResearch Topic: __________________\n\nResearch Questions:\n1. \n2. \n3. \n\nInformation Sources Needed:\n- Primary Sources: ___________\n- Secondary Sources: ___________\n- Expert Sources: ___________\n\nSource Evaluation Criteria:\n- Currency: ___/5\n- Relevance: ___/5\n- Authority: ___/5\n- Accuracy: ___/5\n- Purpose: ___/5\n\nInformation Organization:\nKey Themes:\n1. \n2. \n3. \n\nPriority Information:\n- Must Have: ___________\n- Nice to Have: ___________\n- Optional: ___________" },
          { name: "Source Evaluation Template", url: "#", type: "template", downloadable: true, content: "Source Evaluation Template\n\nSource: __________________\n\nCRAAP Test:\nCurrency: When was this published? ___\nRelevance: Does this address my question? ___\nAuthority: Who is the author/publisher? ___\nAccuracy: Is the information supported by evidence? ___\nPurpose: Is the information fact or opinion? ___\n\nOverall Rating: ___/25\n\nUse in Decision:\n- Primary Source: Yes/No\n- Supporting Evidence: Yes/No\n- Background Context: Yes/No\n\nNotes: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Inversion Thinking",
        description: "Use inversion — thinking backwards from failure — to make smarter, safer decisions.",
        objectives: [
          "Understand the power of inversion as a decision tool",
          "Apply inversion to identify hidden risks",
          "Use negative thinking to arrive at positive outcomes"
        ],
        content: `Inversion is one of the most powerful and underused thinking tools available. Instead of asking \"How do I succeed?\", inversion asks \"How do I guarantee failure?\" — then you avoid those things.\n\nCharlie Munger, Warren Buffett's partner, credits inversion as one of his key mental models. It forces you to confront uncomfortable truths and blind spots that forward thinking misses.\n\nYou'll learn:\n\nThe Inversion Principle: Thinking backwards from failure\nAvoidance Lists: What NOT to do in decision-making\nPre-Mortem with Inversion: Imagining the worst, systematically\nFirst Principles via Inversion: Stripping away what doesn't work\nInversion in Negotiation: Avoiding bad deals by defining what you won't accept\n\nThe goal is not pessimism — it is clarity. Inversion gives you a clean picture of the problem by exposing what failure looks like.`,
        topics: [
          "The Inversion Principle: What does failure look like?",
          "Avoidance Lists: Identifying what not to do",
          "Pre-Mortem Thinking: Imagining failure before it happens",
          "First Principles via Inversion: Eliminating wrong assumptions",
          "Practical Inversion: Daily decision-making applications"
        ],
        activities: [
          "Take one current goal and write 10 ways to guarantee you fail at it — then reverse each",
          "Create your personal Avoidance List for decision-making",
          "Run a pre-mortem on a major upcoming decision using inversion",
          "Complete the Inversion Worksheet below"
        ],
        resources: [
          { name: "Charlie Munger on Inversion (Article)", url: "https://fs.blog/inversion/", type: "article" },
          { name: "Inversion Thinking Explained (Video)", url: "https://www.youtube.com/watch?v=IALuCkBWMa8", type: "video" },
          { name: "Mental Models for Better Decisions (Article)", url: "https://fs.blog/mental-models/", type: "article" },
          { name: "Inversion Thinking Worksheet", url: "#", type: "template", downloadable: true, content: "Inversion Thinking Worksheet\n\nDecision / Goal: __________________\n\nPart 1 — Forward Question\nWhat does success look like?\n___________\n\nPart 2 — The Inversion\nImagine complete failure. How would I guarantee the WORST outcome?\n1. ___________\n2. ___________\n3. ___________\n4. ___________\n5. ___________\n6. ___________\n7. ___________\n8. ___________\n9. ___________\n10. ___________\n\nPart 3 — Reverse the Failures\nFor each failure mode, what is the opposite (what prevents it)?\n1. Failure: ___________ → Prevention: ___________\n2. Failure: ___________ → Prevention: ___________\n3. Failure: ___________ → Prevention: ___________\n4. Failure: ___________ → Prevention: ___________\n5. Failure: ___________ → Prevention: ___________\n\nPart 4 — Avoidance List\nThe top 5 things I will NOT do in making this decision:\n1. ___________\n2. ___________\n3. ___________\n4. ___________\n5. ___________\n\nPart 5 — Refined Decision\nWith these insights, my improved approach is:\n___________" },
          { name: "Personal Avoidance List", url: "#", type: "exercise", downloadable: true, content: "Personal Avoidance List — Decision-Making\n\nInspired by Charlie Munger: \"All I want to know is where I'm going to die, so I'll never go there.\"\n\nMy Decision-Making Rules to AVOID:\n\nAvoidance Rule 1: I will not make decisions when:\n___________\n\nAvoidance Rule 2: I will not trust information that:\n___________\n\nAvoidance Rule 3: I will not choose an option that:\n___________\n\nAvoidance Rule 4: I will not proceed without:\n___________\n\nAvoidance Rule 5: I will not ignore:\n___________\n\nFrom Past Mistakes — What I Will Never Do Again:\n1. ___________\n2. ___________\n3. ___________\n\nReview this list before every major decision.\nLast updated: ___________" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Analysis Frameworks",
        description: "Learn proven frameworks for analyzing information and evaluating options.",
        objectives: [
          "Master analytical frameworks",
          "Learn to compare options systematically",
          "Make evidence-based decisions"
        ],
        content: `Analysis turns information into insight. This module provides you with powerful frameworks for analyzing information and evaluating options.

You'll master:

Cost-Benefit Analysis: Weighing pros and cons quantitatively
Multi-Criteria Decision Analysis: Complex decision evaluation
Risk Analysis: Assessing uncertainty and probability
Sensitivity Analysis: Testing decision robustness
Gap Analysis: Comparing current vs. desired states

These frameworks help you make decisions based on evidence rather than intuition.`,
        activities: [
          "Conduct a cost-benefit analysis for a purchase",
          "Use multi-criteria analysis for a career choice",
          "Perform risk analysis on a major decision",
          "Complete the analysis framework exercise"
        ],
        resources: [
          { name: "Cost-Benefit Analysis Guide (Article)", url: "https://www.mindtools.com/pages/article/newTED_08.htm", type: "article" },
          { name: "Multi-Criteria Analysis Tool (Template)", url: "https://www.vertex42.com/ExcelTemplates/multi-criteria-decision-matrix.html", type: "template" },
          { name: "Risk Assessment Template (Tool)", url: "https://www.projectmanagement.com/templates/risk-assessment-template", type: "template" },
          { name: "Cost-Benefit Analysis Worksheet", url: "#", type: "exercise", downloadable: true, content: "Cost-Benefit Analysis Worksheet\n\nDecision: __________________\n\nCosts (Negative Impacts):\nFinancial Costs:\n- Cost 1: $_________ (Impact: ___/10)\n- Cost 2: $_________ (Impact: ___/10)\n- Cost 3: $_________ (Impact: ___/10)\n\nTime Costs:\n- Time 1: ___________ (Impact: ___/10)\n- Time 2: ___________ (Impact: ___/10)\n\nOpportunity Costs:\n- What you give up: ___________\n\nTotal Costs: $_________\n\nBenefits (Positive Impacts):\nFinancial Benefits:\n- Benefit 1: $_________ (Value: ___/10)\n- Benefit 2: $_________ (Value: ___/10)\n- Benefit 3: $_________ (Value: ___/10)\n\nIntangible Benefits:\n- Benefit 1: ___________ (Value: ___/10)\n- Benefit 2: ___________ (Value: ___/10)\n\nTotal Benefits: $_________\n\nNet Benefit: Benefits - Costs = $_________\n\nDecision: Go / No Go" },
          { name: "Multi-Criteria Decision Matrix", url: "#", type: "exercise", downloadable: true, content: "Multi-Criteria Decision Matrix\n\nDecision: __________________\n\nCriteria (Weight 1-5):\n1. ___________ (Weight: ___)\n2. ___________ (Weight: ___)\n3. ___________ (Weight: ___)\n4. ___________ (Weight: ___)\n5. ___________ (Weight: ___)\n\nOptions:\nOption A | Option B | Option C\n---------|---------|---------\nScore each option (1-10) for each criterion:\n\nCriterion 1: ___ | ___ | ___\nCriterion 2: ___ | ___ | ___\nCriterion 3: ___ | ___ | ___\nCriterion 4: ___ | ___ | ___\nCriterion 5: ___ | ___ | ___\n\nWeighted Scores:\nOption A: ___\nOption B: ___\nOption C: ___\n\nBest Option: _________" }
        ],
        estimatedTime: "55 minutes"
      },
      {
        title: "Risk Assessment",
        description: "Learn to identify, evaluate, and manage risks in decision-making.",
        objectives: [
          "Identify decision risks",
          "Evaluate risk probability and impact",
          "Develop risk mitigation strategies"
        ],
        content: `Every decision involves some level of risk. This module teaches you how to identify, assess, and manage risks effectively.

You'll learn:

Risk Identification: Finding potential problems
Risk Evaluation: Assessing probability and impact
Risk Tolerance: Understanding your risk preferences
Mitigation Strategies: Reducing risk exposure
Contingency Planning: Preparing for worst-case scenarios

Understanding risk helps you make more confident and realistic decisions.`,
        activities: [
          "Identify risks in 5 recent decisions",
          "Create a risk mitigation plan for a major decision",
          "Assess your personal risk tolerance",
          "Complete the risk assessment exercise"
        ],
        resources: [
          { name: "Risk Assessment Matrix (Tool)", url: "https://www.projectmanagement.com/templates/risk-assessment-matrix", type: "template" },
          { name: "Risk Mitigation Strategies (Article)", url: "https://hbr.org/2021/06/risk-intelligence", type: "article" },
          { name: "Contingency Planning Guide (Article)", url: "https://www.ready.gov/business-continuity-planning", type: "article" },
          { name: "Risk Assessment Worksheet", url: "#", type: "exercise", downloadable: true, content: "Risk Assessment Worksheet\n\nDecision: __________________\n\nPotential Risks:\nRisk 1: ___________\n- Probability: Low/Medium/High (1-3)\n- Impact: Low/Medium/High (1-3)\n- Risk Score: ___ (Probability × Impact)\n\nRisk 2: ___________\n- Probability: Low/Medium/High (1-3)\n- Impact: Low/Medium/High (1-3)\n- Risk Score: ___ (Probability × Impact)\n\nRisk 3: ___________\n- Probability: Low/Medium/High (1-3)\n- Impact: Low/Medium/High (1-3)\n- Risk Score: ___ (Probability × Impact)\n\nMitigation Strategies:\nFor Risk 1: ___________\nFor Risk 2: ___________\nFor Risk 3: ___________\n\nContingency Plans:\nIf Risk 1 occurs: ___________\nIf Risk 2 occurs: ___________\nIf Risk 3 occurs: ___________\n\nOverall Risk Level: Low/Medium/High\nProceed with Decision: Yes/No" },
          { name: "Personal Risk Tolerance Assessment", url: "#", type: "exercise", downloadable: true, content: "Personal Risk Tolerance Assessment\n\nRate your agreement (1-5) with each statement:\n\n1. I prefer certainty over potential high returns: ___\n2. I'm comfortable with ambiguity: ___\n3. I research thoroughly before deciding: ___\n4. I trust my gut instincts: ___\n5. I can handle losing money on investments: ___\n6. I prefer tried-and-true solutions: ___\n7. I'm willing to try new approaches: ___\n8. I need to feel 100% sure before acting: ___\n9. I learn from my mistakes quickly: ___\n10. I take calculated risks: ___\n\nRisk Profile:\n- Conservative (10-20): Prefers certainty, thorough research\n- Moderate (21-35): Balanced approach, considers risks\n- Aggressive (36-50): Comfortable with uncertainty, high risk tolerance\n\nYour Risk Profile: ___________\n\nDecision-Making Implications:\n- For conservative: Focus on thorough research, proven solutions\n- For moderate: Use risk-benefit analysis, consider alternatives\n- For aggressive: Can take calculated risks, learn from failures" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Decision Implementation",
        description: "Learn how to execute decisions effectively and manage the implementation process.",
        objectives: [
          "Create action plans",
          "Manage implementation challenges",
          "Monitor decision outcomes"
        ],
        content: `Making a decision is only the beginning. This module focuses on effectively implementing decisions and managing the execution process.

You'll learn:

Action Planning: Creating detailed implementation plans
Change Management: Handling transitions and resistance
Progress Monitoring: Tracking implementation success
Course Correction: Adjusting when things go wrong
Stakeholder Management: Keeping people informed and engaged

Successful implementation turns good decisions into great outcomes.`,
        activities: [
          "Create an action plan for a recent decision",
          "Monitor the implementation of a current decision",
          "Practice adjusting a plan when obstacles arise",
          "Complete the implementation planning exercise"
        ],
        resources: [
          { name: "Action Plan Template (Tool)", url: "https://www.atlassian.com/software/confluence/templates/action-plan", type: "template" },
          { name: "Implementation Checklist (Article)", url: "https://hbr.org/2021/06/how-to-execute-a-strategy", type: "article" },
          { name: "Progress Tracking Tools (Article)", url: "https://www.monday.com/templates/project-management", type: "article" },
          { name: "Action Plan Worksheet", url: "#", type: "exercise", downloadable: true, content: "Action Plan Worksheet\n\nDecision: __________________\n\nGoal: __________________\n\nAction Steps:\nStep 1: ___________\n- Owner: ___________\n- Deadline: ___________\n- Resources needed: ___________\n- Success criteria: ___________\n\nStep 2: ___________\n- Owner: ___________\n- Deadline: ___________\n- Resources needed: ___________\n- Success criteria: ___________\n\nStep 3: ___________\n- Owner: ___________\n- Deadline: ___________\n- Resources needed: ___________\n- Success criteria: ___________\n\nPotential Obstacles:\nObstacle 1: ___________\n- Mitigation: ___________\n\nObstacle 2: ___________\n- Mitigation: ___________\n\nSuccess Metrics:\n- Metric 1: ___________\n- Metric 2: ___________\n- Metric 3: ___________\n\nReview Schedule:\n- Check-in 1: ___________\n- Check-in 2: ___________\n- Final review: ___________" },
          { name: "Implementation Tracking Log", url: "#", type: "exercise", downloadable: true, content: "Implementation Tracking Log\n\nDecision: __________________\n\nStart Date: ___________\n\nProgress Tracking:\nWeek 1: ___________\n- Completed: ___________\n- Challenges: ___________\n- Adjustments made: ___________\n\nWeek 2: ___________\n- Completed: ___________\n- Challenges: ___________\n- Adjustments made: ___________\n\nWeek 3: ___________\n- Completed: ___________\n- Challenges: ___________\n- Adjustments made: ___________\n\nWeek 4: ___________\n- Completed: ___________\n- Challenges: ___________\n- Adjustments made: ___________\n\nFinal Review:\n- Decision outcome: ___________\n- Lessons learned: ___________\n- What worked well: ___________\n- What could be improved: ___________" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Learning from Outcomes",
        description: "Develop the ability to learn from decision outcomes and improve future decision-making.",
        objectives: [
          "Analyze decision outcomes",
          "Learn from successes and failures",
          "Build decision-making wisdom"
        ],
        content: `Every decision provides an opportunity to learn and improve. This module teaches you how to analyze outcomes and build wisdom from experience.

You'll discover:

Outcome Analysis: Evaluating what actually happened
Success Factors: Understanding what worked well
Failure Analysis: Learning from mistakes without blame
Pattern Recognition: Identifying recurring themes
Continuous Improvement: Building better decision-making habits

The goal is to get better at decision-making through deliberate learning.`,
        activities: [
          "Analyze the outcomes of 3 recent decisions",
          "Create a lessons-learned document",
          "Identify patterns in your decision-making history",
          "Complete the outcome analysis exercise"
        ],
        resources: [
          { name: "Outcome Analysis Framework (Article)", url: "https://hbr.org/2021/06/how-to-learn-from-your-mistakes", type: "article" },
          { name: "Lessons Learned Template (Tool)", url: "https://www.atlassian.com/software/confluence/templates/lessons-learned", type: "template" },
          { name: "Decision Improvement Plan (Article)", url: "https://hbr.org/2021/06/how-to-make-better-decisions", type: "article" },
          { name: "Decision Outcome Analysis Worksheet", url: "#", type: "exercise", downloadable: true, content: "Decision Outcome Analysis Worksheet\n\nDecision: __________________\n\nExpected Outcome: __________________\n\nActual Outcome: __________________\n\nGap Analysis:\n- What went as expected: ___________\n- What didn't go as expected: ___________\n- Why the gap occurred: ___________\n\nSuccess Factors:\n- What contributed to success: ___________\n- What could have been better: ___________\n\nLessons Learned:\n- What I would do differently: ___________\n- What I would repeat: ___________\n- Key insight: ___________\n\nApplication to Future Decisions:\n- How this changes my approach: ___________\n- New decision rule: ___________" },
          { name: "Decision Pattern Tracker", url: "#", type: "exercise", downloadable: true, content: "Decision Pattern Tracker\n\nTrack your decisions for 2 weeks to identify patterns:\n\nDate | Decision | Type | Process Used | Outcome | Confidence | Learning\n-----|----------|------|--------------|---------|------------|--------\n     |          |      |              |         |            |        \n     |          |      |              |         |            |        \n     |          |      |              |         |            |        \n     |          |      |              |         |            |        \n     |          |      |              |         |            |        \n     |          |      |              |         |            |        \n     |          |      |              |         |            |        \n\nPattern Analysis:\n- Best decision types for me: ___________\n- Processes that work best: ___________\n- Common mistakes: ___________\n- Confidence vs. outcome correlation: ___________\n\nImprovement Plan:\n- Process to adopt: ___________\n- Process to avoid: ___________\n- New habit to build: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Advanced Techniques",
        description: "Master advanced decision-making techniques for complex and high-stakes decisions.",
        objectives: [
          "Apply advanced decision techniques",
          "Handle complex multi-stakeholder decisions",
          "Make decisions under extreme uncertainty"
        ],
        content: `Complex decisions require sophisticated approaches. This advanced module introduces you to techniques for handling the most challenging decision scenarios.

You'll master:

Scenario Planning: Preparing for multiple futures
Game Theory: Strategic decision-making
Complex Systems Thinking: Understanding interconnected decisions
Ethical Decision Frameworks: Balancing competing values
Crisis Decision Making: High-pressure decision techniques

These advanced techniques prepare you for the most demanding decision situations.`,
        activities: [
          "Develop scenarios for a major life decision",
          "Apply game theory to a competitive situation",
          "Practice crisis decision-making simulation",
          "Complete the advanced techniques exercise"
        ],
        resources: [
          { name: "Scenario Planning Guide (Article)", url: "https://hbr.org/2021/06/scenario-planning", type: "article" },
          { name: "Game Theory Explained (Video)", url: "https://www.youtube.com/watch?v=MHS-htjGgSY", type: "video" },
          { name: "Ethical Decision Framework (Article)", url: "https://www.markkulacenter.org/ethics/ethics-decision-making-model", type: "article" },
          { name: "Scenario Planning Worksheet", url: "#", type: "exercise", downloadable: true, content: "Scenario Planning Worksheet\n\nDecision: __________________\n\nTime Horizon: 6 months / 1 year / 3 years / 5 years\n\nKey Uncertainties:\n1. ___________\n2. ___________\n3. ___________\n\nScenarios:\nScenario A (Best Case):\n- Assumptions: ___________\n- Probability: ___%\n- Strategy: ___________\n\nScenario B (Base Case):\n- Assumptions: ___________\n- Probability: ___%\n- Strategy: ___________\n\nScenario C (Worst Case):\n- Assumptions: ___________\n- Probability: ___%\n- Strategy: ___________\n\nSignposts to Monitor:\n- Signpost 1: ___________\n- Signpost 2: ___________\n- Signpost 3: ___________\n\nContingency Actions:\nIf Scenario A occurs: ___________\nIf Scenario B occurs: ___________\nIf Scenario C occurs: ___________" },
          { name: "Ethical Decision Framework", url: "#", type: "template", downloadable: true, content: "Ethical Decision Framework\n\nDecision: __________________\n\nStakeholders:\n1. ___________ (Impact: ___/10)\n2. ___________ (Impact: ___/10)\n3. ___________ (Impact: ___/10)\n\nEthical Principles:\n- Fairness: ___/10\n- Honesty: ___/10\n- Respect: ___/10\n- Responsibility: ___/10\n- Integrity: ___/10\n\nQuestions to Ask:\n1. Is this legal? Yes/No\n2. Is this fair to all stakeholders? Yes/No\n3. Would I be proud if this were public? Yes/No\n4. Would I want this done to me? Yes/No\n5. Does this align with my values? Yes/No\n\nDecision Score: ___/50\n\nDecision: Proceed / Modify / Reject\n\nRationale: ___________" }
        ],
        estimatedTime: "60 minutes"
      }
    ],
  },
  {
    id: "team-person",
    title: "8 Ways to Excel as a Team Person",
    description: "Learn the fundamentals of teamwork: communication, trust, accountability, and collaboration—skills that work in school, life, and work.",
    fullDescription: "Teamwork is a life skill. In this course, you’ll learn how to communicate clearly, collaborate effectively, handle conflict, and build trust—so you can perform well in any group setting from age 10 to 45.",
    ageRange: "10-45",
    icon: Briefcase,
    iconColor: "text-[#60a5fa]",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    featured: true,
    duration: "4 weeks",
    priceUSD: 14,
    youtubeVideoUrl: "https://www.youtube.com/watch?v=L2G93S0p5yA", // Amy Edmondson — "Building a Psychologically Safe Workplace" (TEDx) — Harvard professor
    trackId: "leadership",
    instructor: "The Becoming Institute",
    instructorTitle: "Leadership & Collaboration Lead",
    rating: 4.9,
    reviewCount: 1156,
    studentCount: 7892,
    level: "Beginner",
    isBestseller: true,
    language: "English",
    lastUpdated: "2026",
    modules: [
      "Team Basics: Roles & Responsibility",
      "Communication in Teams",
      "Trust & Reliability",
      "Conflict Resolution",
      "Feedback & Growth",
      "Collaboration & Problem Solving",
      "Leadership & Followership",
      "Building Team Culture"
    ],
    outcomes: [
      "Communicate clearly in group settings",
      "Build trust and reliability",
      "Resolve conflict constructively",
      "Give and receive feedback well",
      "Contribute meaningfully to any team"
    ],
    detailedModules: [
      {
        title: "Team Basics: Roles & Responsibility",
        icon: Briefcase,
        description: "Understand how teams work and what it means to be reliable.",
        objectives: ["Define team roles", "Build accountability habits", "Set expectations clearly"],
        content: "A team works when people know the goal, know their role, and do what they said they would do.\n\nIn this module you’ll learn how to clarify responsibilities, communicate expectations, and become dependable.",
        activities: ["Write a team role you’ve played before and what success looked like", "Create a simple responsibility checklist for a group task"],
        resources: [
          { name: "Team Roles Guide (Article)", url: "https://www.mindtools.com/pages/article/role-clarity.htm", type: "article" },
          { name: "Accountability Framework (Article)", url: "https://hbr.org/2021/06/building-accountability", type: "article" },
          { name: "Team Roles & Responsibility Worksheet", url: "#", type: "template", downloadable: true, content: "Team Roles & Responsibility Worksheet\n\nTeam / Project: __________________\nDate: ___________\n\nMy Role on This Team: __________________\n\nMy Core Responsibilities:\n1. ___________\n2. ___________\n3. ___________\n\nWhat Success Looks Like in My Role:\n___________\n\nWho I Depend On:\n- Name: ___________ | For: ___________\n- Name: ___________ | For: ___________\n\nWho Depends On Me:\n- Name: ___________ | For: ___________\n- Name: ___________ | For: ___________\n\nMy Accountability Commitments:\n- I will deliver ___________ by ___________\n- I will communicate progress by ___________\n- If I can't deliver, I will notify ___________ by ___________\n\nPotential Conflicts / Overlaps to Clarify:\n___________\n\nSigned: ___________ Date: ___________" }
        ],
        estimatedTime: "35 minutes"
      },
      {
        title: "Communication in Teams",
        icon: Heart,
        description: "Learn simple communication habits that prevent confusion and improve collaboration.",
        objectives: ["Use clarity-first communication", "Ask better questions", "Confirm understanding"],
        content: "Most team problems are communication problems.\n\nYou’ll practice clarity-first language, confirming understanding, and asking better questions.",
        activities: ["Rewrite 3 unclear messages into clear messages", "Practice the ‘repeat back’ method in a conversation"],
        resources: [
          { name: "Effective Communication Guide (Article)", url: "https://hbr.org/2021/06/how-to-communicate-effectively", type: "article" },
          { name: "Team Communication Clarity Log", url: "#", type: "exercise", downloadable: true, content: "Team Communication Clarity Log\n\nWhen to use this: After any important team communication\n\nDate: ___________\nSituation: __________________\n\nOriginal Message Sent:\n___________\n\nClarity Check — Did I include?\n□ Who this is for\n□ What I need / what's happening\n□ When it's needed by\n□ Why it matters\n□ What action is required\n\nResponse/Confirmation Received:\n___________\n\nWas my message understood correctly? Yes / Partially / No\n\nIf No — What was misunderstood?\n___________\n\nRewritten / Clearer Version:\n___________\n\nWhat I'll Do Differently Next Time:\n___________" }
        ],
        estimatedTime: "40 minutes"
      },
      {
        title: "Trust & Reliability",
        icon: Shield,
        description: "Build trust by being consistent and predictable in the best way.",
        objectives: ["Understand trust drivers", "Build reliability habits", "Repair broken trust"],
        content: "Trust is built in small moments: showing up, following through, and being honest.\n\nYou’ll learn how to build and rebuild trust through consistent behavior.",
        activities: ["Identify 2 trust-building actions you can do this week", "Write a simple trust repair message"],
        resources: [
          { name: "Building Trust Guide (Article)", url: "https://hbr.org/2021/06/the-trust-equation", type: "article" },
          { name: "Trust Building Action Tracker", url: "#", type: "exercise", downloadable: true, content: "Trust Building Action Tracker\n\nThe Trust Equation: Trust = (Credibility + Reliability + Intimacy) / Self-Orientation\n\nThis Week's Trust-Building Actions:\n\nCredibility (Do I know what I'm talking about?)\nAction I'll take: ___________\nResult: ___________\n\nReliability (Do I do what I say I'll do?)\nCommitment I'll make and keep this week: ___________\nDid I keep it? Yes / No\nIf No, what happened: ___________\n\nIntimacy (Do I make others feel safe?)\nOne thing I'll do to create psychological safety: ___________\n\nSelf-Orientation (Am I focused on others, not just myself?)\nOne way I'll put the team's needs first: ___________\n\nTrust Repair (if needed)\nSituation where trust was broken: ___________\nWhat I did to repair it: ___________\n\nWeekly Trust Score (self-rate 1-10): ___/10\nArea to improve next week: ___________" }
        ],
        estimatedTime: "35 minutes"
      },
      {
        title: "Conflict Resolution",
        icon: Target,
        description: "Turn disagreements into progress instead of drama.",
        objectives: ["Separate people from problems", "Use calm language", "Find win-win outcomes"],
        content: "Conflict is normal. The goal is to handle it with respect.\n\nYou’ll learn calm scripts and a simple resolution process.",
        activities: ["Use the ‘I feel / I need’ script for a real situation", "Map a conflict into needs vs positions"],
        resources: [
          { name: "Conflict Resolution Techniques (Video)", url: "https://www.youtube.com/watch?v=KY5a1aJ8b3I", type: "video" },
          { name: "Conflict Resolution Script & Planner", url: "#", type: "template", downloadable: true, content: "Conflict Resolution Script & Planner\n\nSituation: __________________\nPerson Involved: __________________\n\nBefore the Conversation:\nWhat do I actually need? (not want — need): ___________\nWhat might they need?: ___________\nWhat outcome would be win-win?: ___________\n\nDuring the Conversation — Use This Script:\n\nOpening: \"I'd like to talk about [situation]. Is now a good time?\"\nMy version: ___________\n\nShare your experience (NOT blame):\n\"When [specific behaviour happened], I felt [emotion] because [reason].\"\nMy version: ___________\n\nState your need:\n\"What I need going forward is [specific request].\"\nMy version: ___________\n\nInvite their perspective:\n\"How do you see this situation?\"\n\nFind common ground:\n\"It sounds like we both want [shared goal].\"\n\nAfter the Conversation:\nAgreement reached: ___________\nNext steps: ___________\nFollow-up date: ___________\n\nLesson learned: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Feedback & Growth",
        icon: TrendingUp,
        description: "Learn to give feedback that helps, and receive feedback without shutting down.",
        objectives: ["Give specific feedback", "Receive feedback productively", "Turn feedback into action"],
        content: "Feedback is information. When used well, it becomes fuel.\n\nYou’ll learn simple feedback frameworks and how to turn feedback into growth steps.",
        activities: ["Give one piece of feedback using a template", "Turn one feedback item into a 7‑day improvement plan"],
        resources: [
          { name: "Giving Feedback Guide (Article)", url: "https://hbr.org/2021/06/how-to-give-feedback", type: "article" },
          { name: "Feedback Framework Card (SBI Method)", url: "#", type: "template", downloadable: true, content: "Feedback Framework Card — SBI Method\n\nSBI = Situation → Behaviour → Impact\n\nGIVING FEEDBACK\n\nSituation (when/where specifically):\n\"During [specific time/place]...\"\nMy example: ___________\n\nBehaviour (what I observed — not interpreted):\n\"I noticed that you [specific action]...\"\nMy example: ___________\n\nImpact (the result/effect on me, team, or work):\n\"The impact of that was [specific result]...\"\nMy example: ___________\n\nRequest (optional — what you'd like to change):\n\"Going forward, could you...\"\nMy example: ___________\n\n---\n\nRECEIVING FEEDBACK\n\nWhen I receive feedback, I will:\n□ Listen without interrupting\n□ Ask: \"Can you give me a specific example?\"\n□ Say: \"Thank you. Let me think about that.\"\n□ NOT defend, deflect, or dismiss\n\nFeedback I received this week:\n___________\n\nAction I'm taking because of it:\n___________\n\n7-Day Improvement Plan:\nDay 1-2: ___________\nDay 3-4: ___________\nDay 5-7: ___________" }
        ],
        estimatedTime: "40 minutes"
      },
      {
        title: "Collaboration & Problem Solving",
        description: "Solve problems with others faster and better.",
        objectives: ["Brainstorm effectively", "Decide together", "Document decisions"],
        content: "Collaboration needs structure.\n\nYou’ll learn how to brainstorm, converge, and document decisions to avoid repeating meetings.",
        activities: ["Run a 10‑minute brainstorm using rules", "Create a decision note (who/what/when)"],
        resources: [
          { name: "Brainstorming Techniques (Article)", url: "https://www.mindtools.com/pages/article/newCT_00.htm", type: "article" },
          { name: "Team Collaboration Meeting Template", url: "#", type: "template", downloadable: true, content: "Team Collaboration Meeting Template\n\nMeeting Date: ___________\nFacilitator: ___________\nAttendees: ___________\nProblem / Decision: __________________\n\nPHASE 1 — INDIVIDUAL BRAINSTORM (5 min, silent)\nEach person writes their ideas independently first:\n___________\n\nPHASE 2 — SHARE ROUND-ROBIN (10 min)\nEach person shares one idea at a time (no comments yet):\nPerson 1: ___________\nPerson 2: ___________\nPerson 3: ___________\n\nPHASE 3 — BUILD & DISCUSS (10 min)\nWhich ideas can be combined or built on?\n___________\n\nPHASE 4 — CONVERGE (5 min)\nDot vote: Each person marks their top 3 ideas\nTop Ideas by Votes:\n1. ___________ (Votes: ___)\n2. ___________ (Votes: ___)\n3. ___________ (Votes: ___)\n\nPHASE 5 — DECIDE & DOCUMENT\nDecision: __________________\nOwner: ___________\nDeadline: ___________\nHow we'll know it worked: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Leadership & Followership",
        description: "Lead when it’s your turn and support when it’s not.",
        objectives: ["Recognize leadership moments", "Support leaders well", "Share leadership responsibly"],
        content: "Teams win when leadership is shared.\n\nYou’ll learn how to step up, step back, and support outcomes.",
        activities: ["Identify 3 ways to support a leader this week", "Write a simple leadership plan for a group task"],
        resources: [
          { name: "Leadership Skills Guide (Article)", url: "https://hbr.org/2021/06/what-is-leadership", type: "article" },
          { name: "Leadership & Followership Reflection", url: "#", type: "exercise", downloadable: true, content: "Leadership & Followership Reflection\n\nDate: ___________\n\nPART A — LEADERSHIP\n\nA leadership moment I had recently: ___________\n\nWhat I did well as a leader:\n___________\n\nWhat I could have done better:\n___________\n\nHow I helped the team move forward:\n___________\n\nPART B — FOLLOWERSHIP\n\nA situation where I was a follower recently: ___________\n\nHow I supported the leader:\n___________\n\nDid I speak up when I disagreed? How?\n___________\n\nHow I made the team better without leading:\n___________\n\nPART C — SHARED LEADERSHIP\n\nOne time I stepped up when needed: ___________\nOne time I stepped back to let others lead: ___________\n\nMy Leadership Style in 3 words:\n1. ___________\n2. ___________\n3. ___________\n\nThis Week I'll Practice: __________________" }
        ],
        estimatedTime: "35 minutes"
      },
      {
        title: "Building Team Culture",
        description: "Create an environment where people do their best work together.",
        objectives: ["Define team values", "Set norms", "Maintain culture under pressure"],
        content: "Culture is what happens when no one is watching.\n\nYou’ll learn how to set team norms and protect culture during stress.",
        activities: ["Write 5 team norms for a group", "Create a ‘reset’ plan for stressful moments"],
        resources: [
          { name: "Team Culture Guide (Article)", url: "https://hbr.org/2021/06/how-to-build-team-culture", type: "article" },
          { name: "Our Team Norms & Culture Card", url: "#", type: "template", downloadable: true, content: "Our Team Norms & Culture Card\n\nTeam Name: __________________\nCreated: ___________\n\nOUR 5 TEAM NORMS\n(Behaviours we all agree to uphold)\n\n1. We will always: ___________\n2. We will never: ___________\n3. When we disagree, we: ___________\n4. When someone makes a mistake, we: ___________\n5. We celebrate wins by: ___________\n\nOUR TEAM VALUES\n(3 words that define how we work)\n1. ___________\n2. ___________\n3. ___________\n\nCULTURE UNDER PRESSURE\nWhen things get stressful, our reset plan is:\n___________\n\nOur signal phrase when culture is slipping:\n\"___________ \" (e.g., 'Back to basics')\n\nOUR CULTURE CHECK (Monthly)\nAre we living our norms? Rate 1-5:\nNorm 1: ___/5 | Norm 2: ___/5 | Norm 3: ___/5 | Norm 4: ___/5 | Norm 5: ___/5\n\nOne thing to improve next month: ___________\n\nAll team members sign below to commit:\n___________ | ___________ | ___________ | ___________" }
        ],
        estimatedTime: "40 minutes"
      }
    ]
  },
  {
    id: "personal-adaptability",
    title: "8 Ways to Build Personal Adaptability",
    description: "Learn the fundamentals of adapting to change: resilience, flexible thinking, and steady progress.",
    fullDescription: "Change is guaranteed. This course teaches the fundamentals of adaptability—how to stay calm, adjust quickly, and keep moving forward in school, life, and work (ages 10–45).",
    ageRange: "10-45",
    icon: TrendingUp,
    iconColor: "text-teal-600",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
    featured: false,
    duration: "4 weeks",
    priceUSD: 14,
    youtubeVideoUrl: "https://www.youtube.com/watch?v=_X0mgOOSpLU", // Carol Dweck — "The Power of Believing You Can Improve" (TED) — Growth Mindset
    trackId: "character-values",
    instructor: "Zeki Ubor & The Becoming Institute",
    instructorTitle: "The Becoming Institute",
    rating: 4.8,
    reviewCount: 634,
    studentCount: 3892,
    level: "Beginner",
    language: "English",
    lastUpdated: "2026",
    modules: [
      "Understanding Change",
      "Resilience Basics",
      "Flexible Thinking",
      "Managing Stress & Energy",
      "Learning Fast",
      "Handling Setbacks",
      "Building Better Habits",
      "Planning for the Next Season"
    ],
    outcomes: [
      "Handle change calmly and confidently",
      "Recover faster from setbacks",
      "Build flexible thinking habits",
      "Keep momentum during uncertainty"
    ],
    detailedModules: [
      {
        title: "Understanding Change",
        description: "Learn why change happens and how to prepare for it mentally and emotionally.",
        objectives: [
          "Understand the nature of change",
          "Recognize your change response patterns",
          "Prepare mentally for transitions"
        ],
        content: `Change is inevitable, but how we respond to it determines our success. This module helps you understand the psychology of change and develop the mindset needed to navigate transitions effectively.`,
        activities: [
          "Identify 3 major changes you've experienced and how you handled them",
          "Create a personal change response journal",
          "Practice a grounding technique for stressful transitions"
        ],
        resources: [
          { name: "Understanding Change Psychology (Article)", url: "https://hbr.org/2021/06/how-to-handle-change", type: "article" },
          { name: "The Psychology of Change (Video)", url: "https://www.youtube.com/watch?v=yJPDp56pPRQ", type: "video" },
          { name: "My Change Response Journal", url: "#", type: "exercise", downloadable: true, content: "My Change Response Journal\n\nChange I'm currently navigating: __________________\n\nMy Initial Reaction (circle): Denial / Anger / Bargaining / Depression / Acceptance\n\nWhat Thoughts Are Coming Up?\n___________\n\nWhat Emotions Am I Feeling?\n___________\n\nWhat Am I Most Afraid Of?\n___________\n\nWhat's Actually Within My Control?\n- I can control: ___________\n- I cannot control: ___________\n\nWhat Would Help Me Move to Acceptance Faster?\n___________\n\nOne Small Action I Can Take Today:\n___________\n\nPeople Who Can Support Me Through This:\n1. ___________ | How they can help: ___________\n2. ___________ | How they can help: ___________\n\nWeek 1 Reflection: ___________\nWeek 2 Reflection: ___________\nWeek 3 Reflection: ___________\nWeek 4 Reflection: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Resilience Basics",
        description: "Build the foundation for bouncing back from setbacks and challenges.",
        objectives: [
          "Define resilience in your own words",
          "Identify your resilience strengths",
          "Practice basic resilience techniques"
        ],
        content: `Resilience is not about avoiding stress—it's about recovering from it. This module teaches you the foundational skills for building mental and emotional resilience.`,
        activities: [
          "Create a resilience inventory of your strengths",
          "Practice a 5-minute resilience exercise",
          "Identify 3 people who support your resilience"
        ],
        resources: [
          { name: "Building Resilience (Article)", url: "https://www.apa.org/topics/resilience", type: "article" },
          { name: "Building Resilience with Dr. Lucy Hone (Video)", url: "https://www.youtube.com/watch?v=NWH8N-BvhAw", type: "video" },
          { name: "My Resilience Inventory", url: "#", type: "template", downloadable: true, content: "My Resilience Inventory\n\nDate: ___________\n\nPART 1 — My Resilience Strengths\nRate each 1-5 (1=rarely, 5=always):\n\nEmotional Regulation: I manage my emotions well under stress: ___/5\nOptimism: I believe things will get better: ___/5\nSelf-Awareness: I know when I'm struggling: ___/5\nHelp-Seeking: I reach out for support when needed: ___/5\nAdaptability: I adjust my plans when needed: ___/5\nPurpose: I know why this matters: ___/5\n\nMy Strongest Resilience Area: __________________\nMy Weakest Resilience Area: __________________\n\nPART 2 — My Support Network\nPerson 1: ___________ | Type of support: ___________\nPerson 2: ___________ | Type of support: ___________\nPerson 3: ___________ | Type of support: ___________\n\nPART 3 — My Recovery Toolkit\nWhen I'm overwhelmed, I will: ___________\nWhen I feel like giving up, I will: ___________\nMy resilience anchor (what keeps me going): ___________\n\n5-Minute Resilience Technique I'll Practice Daily: ___________" }
        ],
        estimatedTime: "40 minutes"
      },
      {
        title: "Flexible Thinking",
        description: "Develop cognitive flexibility to adapt your thinking to new situations.",
        objectives: [
          "Practice reframing situations",
          "Challenge fixed mindsets",
          "Develop multiple perspectives"
        ],
        content: `Flexible thinking is the ability to adapt your mental approach to different situations. This module teaches you techniques for developing cognitive flexibility.`,
        activities: [
          "Reframe 3 negative situations into opportunities",
          "Practice the 'six thinking hats' technique",
          "Challenge one fixed belief you hold"
        ],
        resources: [
          { name: "Cognitive Flexibility Guide (Article)", url: "https://www.psychologytoday.com/us/basics/cognitive-flexibility", type: "article" },
          { name: "How to Develop a Growth Mindset (Video)", url: "https://www.youtube.com/watch?v=KUWn_TJTrnU", type: "video" },
          { name: "Reframing Practice Worksheet", url: "#", type: "exercise", downloadable: true, content: "Reframing Practice Worksheet\n\nInstructions: For each situation, write the fixed-mindset version, then reframe it with a flexible, growth-oriented lens.\n\nSITUATION 1\nEvent: ___________\nFixed Frame: \"This is terrible because...\" ___________\nFlexible Reframe: \"This is an opportunity to...\" ___________\nSmall Action This Opens Up: ___________\n\nSITUATION 2\nEvent: ___________\nFixed Frame: ___________\nFlexible Reframe: ___________\nSmall Action This Opens Up: ___________\n\nSITUATION 3\nEvent: ___________\nFixed Frame: ___________\nFlexible Reframe: ___________\nSmall Action This Opens Up: ___________\n\nSIX THINKING HATS Practice\nTopic: __________________\nWhite (Facts): ___________\nRed (Emotions): ___________\nBlack (Risks): ___________\nYellow (Benefits): ___________\nGreen (Creative ideas): ___________\nBlue (Next steps): ___________\n\nKey Insight from this exercise: ___________" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Managing Stress & Energy",
        description: "Learn practical techniques for managing stress and maintaining energy during change.",
        objectives: [
          "Identify personal stress triggers",
          "Practice stress management techniques",
          "Build energy management habits"
        ],
        content: `Stress management is essential for adaptability. This module provides practical techniques for handling stress and maintaining energy during transitions.`,
        activities: [
          "Create a personal stress trigger map",
          "Practice 3 stress management techniques",
          "Design an energy management routine"
        ],
        resources: [
          { name: "Stress Management Techniques (Article)", url: "https://www.mayoclinic.org/healthy-lifestyle/stress-management", type: "article" },
          { name: "Tony Schwartz on Energy Management (Video)", url: "https://www.youtube.com/watch?v=9u4VGwuC8OY", type: "video" },
          { name: "My Stress & Energy Management Plan", url: "#", type: "template", downloadable: true, content: "My Stress & Energy Management Plan\n\nDate: ___________\n\nPART 1 — Stress Trigger Map\nSituation that depletes me most: ___________\nPhysical signs I'm stressed: ___________\nMental signs I'm stressed: ___________\nBehavioural signs I'm stressed: ___________\n\nPART 2 — My Energy Drains vs. Gains\nEnergy Drains (things that deplete me):\n1. ___________\n2. ___________\n3. ___________\n\nEnergy Gains (things that restore me):\n1. ___________\n2. ___________\n3. ___________\n\nPART 3 — My Daily Energy Routine\nMorning (first 60 min): ___________\nMidday reset: ___________\nEvening wind-down: ___________\n\nPART 4 — My Stress Response Plan\nWhen I notice I'm stressed, within 2 minutes I will:\n___________\n\nIf stress continues for more than a day, I will:\n___________\n\nWeekly energy rating: ___/10\nOne thing to protect my energy this week: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Learning Fast",
        description: "Develop rapid learning skills to adapt quickly to new information and situations.",
        objectives: [
          "Practice accelerated learning techniques",
          "Develop information filtering skills",
          "Build quick adaptation habits"
        ],
        content: `The ability to learn quickly is a superpower in a changing world. This module teaches you techniques for rapid learning and adaptation.`,
        activities: [
          "Practice the Feynman technique on a new topic",
          "Create a personal learning system",
          "Complete a 24-hour learning challenge"
        ],
        resources: [
          { name: "Accelerated Learning Guide (Article)", url: "https://www.mindtools.com/pages/article/accelerated-learning.htm", type: "article" },
          { name: "The Feynman Technique (Video)", url: "https://www.youtube.com/watch?v=_f-qkGJBPts", type: "video" },
          { name: "Rapid Learning System Template", url: "#", type: "template", downloadable: true, content: "Rapid Learning System Template\n\nTopic I Need to Learn Quickly: __________________\nDeadline: ___________\nWhy This Matters: ___________\n\nSTEP 1 — FEYNMAN METHOD\nExplain the topic in simple terms as if teaching a 12-year-old:\n___________\n\nWhere my explanation broke down (gaps):\n___________\n\nWhat I need to study to fill those gaps:\n___________\n\nSTEP 2 — LEARN IN SPRINTS (Pomodoro)\nSprint 1 (25 min): Focus on: ___________ ✓/✗\nSprint 2 (25 min): Focus on: ___________ ✓/✗\nSprint 3 (25 min): Focus on: ___________ ✓/✗\n\nSTEP 3 — SPACED REPETITION SCHEDULE\nDay 1 review: ___________\nDay 3 review: ___________\nDay 7 review: ___________\nDay 21 review: ___________\n\nSTEP 4 — TEACH IT\nI explained this to: ___________\nTheir questions revealed I still need to learn: ___________\n\nFinal Confidence Rating: ___/10" }
        ],
        estimatedTime: "55 minutes"
      },
      {
        title: "Handling Setbacks",
        description: "Learn to bounce back from failures and disappointments with grace and determination.",
        objectives: [
          "Develop a setback recovery process",
          "Practice constructive self-reflection",
          "Build failure resilience"
        ],
        content: `Setbacks are inevitable, but they don't have to define you. This module teaches you how to handle failures constructively and bounce back stronger.`,
        activities: [
          "Create a setback recovery plan",
          "Practice constructive failure analysis",
          "Write a 'lessons learned' document from a recent setback"
        ],
        resources: [
          { name: "Bouncing Back from Failure (Article)", url: "https://hbr.org/2021/06/how-to-bounce-back-from-failure", type: "article" },
          { name: "The Gift of Failure — TEDx (Video)", url: "https://www.youtube.com/watch?v=xF2B6Nrjb3A", type: "video" },
          { name: "Setback Recovery Plan", url: "#", type: "template", downloadable: true, content: "Setback Recovery Plan\n\nDate: ___________\nThe Setback: __________________\n\nPART 1 — ACKNOWLEDGE (Don't skip this)\nHow I'm honestly feeling about this: ___________\nIt's okay that I feel this because: ___________\n\nPART 2 — ASSESS (Facts only)\nWhat actually happened (just the facts):\n___________\n\nWhat I contributed to this outcome:\n___________\n\nWhat external factors contributed:\n___________\n\nPART 3 — LEARN\nWhat this taught me: ___________\nWhat I'll do differently: ___________\nWhat skill/knowledge gap this revealed: ___________\n\nPART 4 — RECOVER\nOne small action I can take today to move forward:\n___________\n\nMy bounce-back goal for this week:\n___________\n\nMy bounce-back goal for this month:\n___________\n\nPerson I'll share this with for accountability:\n___________\n\nPART 5 — REFRAME\nIn 6 months, I think this setback will have taught me:\n___________" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Building Better Habits",
        description: "Create habits that support adaptability and continuous improvement.",
        objectives: [
          "Understand habit formation science",
          "Design adaptive habits",
          "Build habit maintenance systems"
        ],
        content: `Habits are the foundation of sustainable change. This module teaches you how to build habits that support adaptability and continuous growth.`,
        activities: [
          "Use the habit loop to design one new habit",
          "Create a habit tracking system",
          "Practice habit stacking for better routines"
        ],
        resources: [
          { name: "Atomic Habits Summary (Article)", url: "https://jamesclear.com/atomic-habits", type: "article" },
          { name: "The Science of Habit Formation (Video)", url: "https://www.youtube.com/watch?v=PZ7lDrwYdZc", type: "video" },
          { name: "Habit Design Worksheet", url: "#", type: "template", downloadable: true, content: "Habit Design Worksheet\n\nHabit I Want to Build: __________________\n\nPART 1 — THE HABIT LOOP\nCue (what triggers the habit?): ___________\nRoutine (the behaviour itself): ___________\nReward (what I get from it): ___________\n\nPART 2 — MAKE IT OBVIOUS\nI will [behaviour] at [time] in [location]:\n___________\n\nHabit Stack (attach to existing habit):\nAfter I [current habit], I will [new habit]:\n___________\n\nPART 3 — MAKE IT ATTRACTIVE\nI'll reward myself with ___________ after completing the habit\n\nPART 4 — MAKE IT EASY\nSmallest possible version of this habit (2-minute rule):\n___________\n\nFriction I'll reduce: ___________\n\nPART 5 — MAKE IT SATISFYING\nHow I'll track it: ___________\nMy streak goal: ___________ days\n\n30-DAY HABIT TRACKER\nWeek 1: M T W T F S S (circle each day done)\nWeek 2: M T W T F S S\nWeek 3: M T W T F S S\nWeek 4: M T W T F S S\n\nReview: Did this habit stick? ___/30 days\nAdjustments for next month: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Planning for the Next Season",
        description: "Develop strategic planning skills to prepare for future changes and opportunities.",
        objectives: [
          "Practice scenario planning",
          "Create adaptive goal systems",
          "Build future-readiness habits"
        ],
        content: `The best way to handle the future is to prepare for it. This module teaches you strategic planning techniques for navigating uncertainty.`,
        activities: [
          "Create 3 scenarios for your next 6 months",
          "Design adaptive goals for different outcomes",
          "Build a future-readiness checklist"
        ],
        resources: [
          { name: "Scenario Planning Guide (Article)", url: "https://hbr.org/2021/06/scenario-planning", type: "article" },
          { name: "Strategic Planning for Life (Video)", url: "https://www.youtube.com/watch?v=j_8NQi-LJtE", type: "video" },
          { name: "My Next Season Planner", url: "#", type: "template", downloadable: true, content: "My Next Season Planner\n\nPlanning Date: ___________\nSeason / Period: ___________\n\nPART 1 — REVIEW OF LAST SEASON\nBiggest win: ___________\nBiggest lesson: ___________\nWhat I want to leave behind: ___________\n\nPART 2 — THREE SCENARIOS FOR NEXT SEASON\n\nScenario A — BEST CASE (everything goes right):\nAssumptions: ___________\nStrategy if this happens: ___________\n\nScenario B — BASE CASE (realistic, likely):\nAssumptions: ___________\nStrategy if this happens: ___________\n\nScenario C — WORST CASE (major disruption):\nAssumptions: ___________\nStrategy if this happens: ___________\n\nPART 3 — ADAPTIVE GOALS\nGoal that works across all scenarios: ___________\nGoal for Scenario A only: ___________\nGoal for Scenario B/C: ___________\n\nPART 4 — FUTURE-READINESS CHECKLIST\n□ I have a clear 3-month priority\n□ I know what I'll stop doing\n□ I have a support system in place\n□ I have a plan if things go wrong\n□ I've scheduled monthly reviews\n\nMy Commitment for This Season: ___________" }
        ],
        estimatedTime: "55 minutes"
      }
    ]
  },
  {
    id: "self-image",
    title: "8 Ways to Strengthen Self-Image",
    description: "Build a strong self-image: confidence, identity, and the fundamentals of self-belief.",
    fullDescription: "Self-image shapes decisions, habits, and outcomes. This course teaches the fundamentals of self-image, confidence, and self-belief for ages 10–45.",
    ageRange: "10-45",
    icon: Shield,
    iconColor: "text-purple-600",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    featured: true,
    duration: "4 weeks",
    priceUSD: 14,
    youtubeVideoUrl: "https://www.youtube.com/watch?v=Ks-_Mh1QhMc", // Amy Cuddy — "Your Body Language May Shape Who You Are" (TED) — 68M+ views
    trackId: "character-values",
    instructor: "Zeki Ubor & The Becoming Institute",
    instructorTitle: "The Becoming Institute",
    rating: 4.9,
    reviewCount: 1432,
    studentCount: 9821,
    level: "Beginner",
    isBestseller: true,
    language: "English",
    lastUpdated: "2026",
    modules: [
      "What Self-Image Is",
      "Confidence & Competence",
      "Self-Talk Fundamentals",
      "Identity & Values",
      "Boundaries & Respect",
      "Discipline & Consistency",
      "Resilience & Recovery",
      "Your Self-Image Plan"
    ],
    outcomes: [
      "Develop healthier self-talk",
      "Build real confidence through action",
      "Strengthen identity and values",
      "Create a personal self-image plan"
    ],
    detailedModules: [
      {
        title: "What Self-Image Is",
        description: "Understand the concept of self-image and how it shapes your life.",
        objectives: [
          "Define self-image in your own words",
          "Understand how self-image affects behavior",
          "Identify your current self-image"
        ],
        content: `Self-image is the mental picture you hold of yourself. It influences every decision you make and every action you take. This module helps you understand and reshape your self-image for better outcomes.`,
        activities: [
          "Write a description of your current self-image",
          "Identify 3 ways your self-image affects your decisions",
          "Create a vision of your ideal self-image"
        ],
        resources: [
          { name: "Self-Image Psychology (Article)", url: "https://www.verywellmind.com/what-is-self-image-2797910", type: "article" },
          { name: "The Psychology of Self-Concept (Video)", url: "https://www.youtube.com/watch?v=qp0HIF3SfI4", type: "video" },
          { name: "My Self-Image Snapshot", url: "#", type: "exercise", downloadable: true, content: "My Self-Image Snapshot\n\nDate: ___________\n\nPART 1 — HOW I SEE MYSELF NOW\nComplete these sentences honestly:\n\nI am the kind of person who: ___________\nI am NOT the kind of person who: ___________\nPeople who know me well would describe me as: ___________\nI believe I am capable of: ___________\nI believe I am NOT capable of: ___________\n\nPART 2 — WHERE THIS CAME FROM\nOne belief about myself that came from childhood: ___________\nOne belief that came from a failure or criticism: ___________\nOne belief that came from a success: ___________\n\nPART 3 — MY IDEAL SELF-IMAGE\nIn 2 years, I want to see myself as: ___________\nThe biggest gap between who I am now and who I want to be: ___________\n\nPART 4 — ONE SHIFT TO MAKE THIS WEEK\nBelief to replace: ___________\nNew belief to practice: ___________\nAction that proves the new belief: ___________" }
        ],
        estimatedTime: "40 minutes"
      },
      {
        title: "Confidence & Competence",
        description: "Build real confidence through skill development and achievement.",
        objectives: [
          "Understand the confidence-competence loop",
          "Develop skills that build confidence",
          "Practice confidence-building actions"
        ],
        content: `True confidence comes from competence. This module teaches you how to build real confidence through skill development and meaningful achievements.`,
        activities: [
          "Identify 3 skills you want to develop",
          "Create a skill-building plan",
          "Practice one confidence-building action daily"
        ],
        resources: [
          { name: "Building Real Confidence (Article)", url: "https://hbr.org/2021/06/how-to-build-confidence", type: "article" },
          { name: "How Confidence Works (Video)", url: "https://www.youtube.com/watch?v=l_NYrWqUR40", type: "video" },
          { name: "Confidence-Competence Action Tracker", url: "#", type: "template", downloadable: true, content: "Confidence-Competence Action Tracker\n\nThe Rule: Confidence follows action. You cannot think your way to confidence — you must DO your way there.\n\nSkill I'm Building: __________________\n\nSTARTING POINT\nCompetence level today: ___/10\nConfidence level today: ___/10\n\nWEEKLY ACTION LOG\n\nWeek 1\nAction I took: ___________\nWhat I did well: ___________\nWhat I'll improve: ___________\nCompetence: ___/10 | Confidence: ___/10\n\nWeek 2\nAction I took: ___________\nWhat I did well: ___________\nWhat I'll improve: ___________\nCompetence: ___/10 | Confidence: ___/10\n\nWeek 3\nAction I took: ___________\nWhat I did well: ___________\nWhat I'll improve: ___________\nCompetence: ___/10 | Confidence: ___/10\n\nWeek 4\nAction I took: ___________\nWhat I did well: ___________\nWhat I'll improve: ___________\nCompetence: ___/10 | Confidence: ___/10\n\nEND OF MONTH\nCompetence gained: ___/10\nConfidence gained: ___/10\nBiggest insight: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Self-Talk Fundamentals",
        description: "Transform your inner dialogue from critical to supportive.",
        objectives: [
          "Identify negative self-talk patterns",
          "Practice positive self-talk techniques",
          "Build supportive inner dialogue habits"
        ],
        content: `Your inner dialogue shapes your reality. This module teaches you how to transform negative self-talk into supportive, empowering inner dialogue.`,
        activities: [
          "Track your self-talk for one day",
          "Practice reframing negative thoughts",
          "Create positive self-talk affirmations"
        ],
        resources: [
          { name: "Positive Self-Talk Guide (Article)", url: "https://www.verywellmind.com/positive-self-talk", type: "article" },
          { name: "How to Change Negative Self-Talk (Video)", url: "https://www.youtube.com/watch?v=swsYaVjMZyY", type: "video" },
          { name: "Self-Talk Transformation Worksheet", url: "#", type: "exercise", downloadable: true, content: "Self-Talk Transformation Worksheet\n\nDate: ___________\n\nPART 1 — CATCH IT (Track your inner voice for one day)\nNegative Self-Talk I noticed:\n1. \"___________ \" → When: ___________\n2. \"___________ \" → When: ___________\n3. \"___________ \" → When: ___________\n\nPART 2 — CHECK IT (Is this thought true?)\nFor each negative thought:\nThought 1: Is it 100% true? ___. Evidence for: ___. Evidence against: ___\nThought 2: Is it 100% true? ___. Evidence for: ___. Evidence against: ___\nThought 3: Is it 100% true? ___. Evidence for: ___. Evidence against: ___\n\nPART 3 — CHANGE IT (Reframe — not toxic positivity, just balanced truth)\nOld Thought: \"___________\"\nBalanced Replacement: \"___________\"\n\nOld Thought: \"___________\"\nBalanced Replacement: \"___________\"\n\nOld Thought: \"___________\"\nBalanced Replacement: \"___________\"\n\nPART 4 — MY 3 ANCHOR AFFIRMATIONS\n(Written in first person, present tense, based on evidence)\n1. ___________\n2. ___________\n3. ___________\n\nI will read these every morning for 21 days: □ Day 1–7 □ Day 8–14 □ Day 15–21" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Identity & Values",
        description: "Clarify who you are and what matters most to you.",
        objectives: [
          "Identify your core values",
          "Clarify your identity",
          "Align actions with values"
        ],
        content: `Knowing who you are and what you value is essential for a strong self-image. This module helps you clarify your identity and live in alignment with your values.`,
        activities: [
          "Complete a values assessment exercise",
          "Write a personal identity statement",
          "Identify areas where your actions don't match your values"
        ],
        resources: [
          { name: "Values Assessment Tool (Article)", url: "https://www.mindtools.com/pages/article/newTED_01.htm", type: "article" },
          { name: "Discover Your Core Values (Video)", url: "https://www.youtube.com/watch?v=jA3jxxSW9T8", type: "video" },
          { name: "My Identity & Values Blueprint", url: "#", type: "template", downloadable: true, content: "My Identity & Values Blueprint\n\nDate: ___________\n\nPART 1 — CORE VALUES\nFrom the list below, circle your top 10, then star your top 5:\nHonesty | Courage | Loyalty | Growth | Family | Freedom | Creativity | Service | Excellence | Integrity | Adventure | Kindness | Justice | Resilience | Faith | Discipline | Compassion | Ambition | Peace | Wisdom\n\nMy Top 5 Values:\n1. ___________ — Why it matters: ___________\n2. ___________ — Why it matters: ___________\n3. ___________ — Why it matters: ___________\n4. ___________ — Why it matters: ___________\n5. ___________ — Why it matters: ___________\n\nPART 2 — MY IDENTITY STATEMENT\nI am someone who: ___________\nI stand for: ___________\nI will not compromise on: ___________\nI am becoming: ___________\n\nPART 3 — VALUES IN ACTION\nAre my daily actions aligned with my values?\nValue 1 in action: ___________ (Yes / Partially / No)\nValue 2 in action: ___________ (Yes / Partially / No)\nValue 3 in action: ___________ (Yes / Partially / No)\n\nBiggest gap between my values and my behaviour:\n___________\n\nOne thing I'll change this week to live my values more fully:\n___________" }
        ],
        estimatedTime: "55 minutes"
      },
      {
        title: "Boundaries & Respect",
        description: "Learn to set healthy boundaries that protect your self-image.",
        objectives: [
          "Understand the importance of boundaries",
          "Practice setting boundaries",
          "Learn to respect others' boundaries"
        ],
        content: `Healthy boundaries protect your self-image and self-respect. This module teaches you how to set and maintain boundaries that support your wellbeing.`,
        activities: [
          "Identify 3 areas where you need better boundaries",
          "Practice setting a boundary in a relationship",
          "Create a personal boundary framework"
        ],
        resources: [
          { name: "Setting Healthy Boundaries (Article)", url: "https://www.psychologytoday.com/us/blog/the-intelligence-divide/201805/why-boundaries-are-important", type: "article" },
          { name: "How to Set Healthy Boundaries (Video)", url: "https://www.youtube.com/watch?v=rtsHUeKnSxs", type: "video" },
          { name: "My Boundary Framework", url: "#", type: "template", downloadable: true, content: "My Boundary Framework\n\nDate: ___________\n\nPART 1 — BOUNDARY AUDIT\nAreas where my boundaries need work (rate 1-5):\nTime: ___/5 | Energy: ___/5 | Money: ___/5 | Privacy: ___/5 | Relationships: ___/5\n\nMy biggest boundary challenge right now: ___________\n\nPART 2 — DEFINING MY BOUNDARIES\nThis is okay: ___________\nThis is NOT okay: ___________\nWhen ___________ happens, I will say/do: ___________\n\nPART 3 — BOUNDARY-SETTING SCRIPTS\n\nFor saying no to requests:\n\"I appreciate you thinking of me, but I'm not able to ___________ right now.\"\nMy version: ___________\n\nFor communicating a limit:\n\"I'm happy to ___________, but I can't ___________.\"\nMy version: ___________\n\nFor enforcing a boundary:\n\"I said I wasn't comfortable with ___________. I need that to stop.\"\nMy version: ___________\n\nPART 4 — PRACTICE LOG\nBoundary I set this week: ___________\nHow I felt setting it: ___________\nResult: ___________\nWhat I'll do again: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Discipline & Consistency",
        description: "Build the discipline to maintain positive self-image habits.",
        objectives: [
          "Understand the science of discipline",
          "Build consistency habits",
          "Practice self-discipline techniques"
        ],
        content: `Discipline is the bridge between goals and achievement. This module teaches you how to build the self-discipline needed to maintain positive self-image habits.`,
        activities: [
          "Create a daily discipline routine",
          "Practice the 5-second rule for motivation",
          "Build a consistency tracking system"
        ],
        resources: [
          { name: "Building Self-Discipline (Article)", url: "https://hbr.org/2021/06/how-to-build-self-discipline", type: "article" },
          { name: "The Science of Self-Control (Video)", url: "https://www.youtube.com/watch?v=TGFJSGADzLU", type: "video" },
          { name: "My Discipline & Consistency Tracker", url: "#", type: "exercise", downloadable: true, content: "My Discipline & Consistency Tracker\n\nHabit / Commitment: __________________\nStart Date: ___________\n\nMY DAILY NON-NEGOTIABLES\n(3 things I commit to every day, no matter what)\n1. ___________\n2. ___________\n3. ___________\n\n30-DAY TRACKER\nInstructions: Mark ✓ (done), ✗ (missed), or ~ (partial)\n\nDay  | Non-Neg 1 | Non-Neg 2 | Non-Neg 3 | Notes\n-----|-----------|-----------|-----------|------\n1    |           |           |           |\n2    |           |           |           |\n3    |           |           |           |\n4    |           |           |           |\n5    |           |           |           |\n6    |           |           |           |\n7    |           |           |           |\n8-14 | Week 2 totals: ___ / 21              |\n15-21| Week 3 totals: ___ / 21              |\n22-30| Week 4 totals: ___ / 27              |\n\nMONTH REVIEW\nDays completed all 3: ___ / 30\nBiggest obstacle to discipline: ___________\nWhat helped most: ___________\nAdjustment for next month: ___________" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Resilience & Recovery",
        description: "Learn to bounce back from setbacks without damaging your self-image.",
        objectives: [
          "Develop resilience strategies",
          "Practice self-compassion",
          "Build recovery routines"
        ],
        content: `Setbacks can damage your self-image if you let them. This module teaches you how to bounce back from challenges while maintaining a positive self-image.`,
        activities: [
          "Practice self-compassion after a setback",
          "Create a recovery routine",
          "Identify your resilience strengths"
        ],
        resources: [
          { name: "Building Resilience (Article)", url: "https://www.apa.org/topics/resilience", type: "article" },
          { name: "Self-Compassion with Dr. Kristin Neff (Video)", url: "https://www.youtube.com/watch?v=IvtZBUSplr4", type: "video" },
          { name: "Resilience & Recovery Toolkit", url: "#", type: "template", downloadable: true, content: "Resilience & Recovery Toolkit\n\nFor use when you've experienced a setback or failure that's affecting your self-image.\n\nPART 1 — SELF-COMPASSION CHECK-IN\nIf my best friend went through this, what would I say to them?\n___________\n\nNow say that to yourself: ___________\n\nPART 2 — REALITY CHECK\nIs this setback permanent? (Usually no) ___\nIs it about my whole identity? (Usually no) ___\nWhat is the most realistic interpretation of what happened?\n___________\n\nPART 3 — MY RECOVERY ROUTINE\nToday I will: ___________\nThis week I will: ___________\nI will NOT beat myself up about: ___________\n\nPART 4 — REBUILD YOUR SELF-IMAGE\nA strength this setback didn't take away: ___________\nA past setback I recovered from: ___________\nProof that I am resilient: ___________\n\nPART 5 — THE BOUNCE-BACK PLAN\nDay 1: ___________\nDay 3: ___________\nDay 7: ___________\nDay 14: ___________\n\nCheck-in question: Am I making progress or ruminating?\n___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Your Self-Image Plan",
        description: "Create a comprehensive plan for building and maintaining a strong self-image.",
        objectives: [
          "Integrate all self-image concepts",
          "Create a personal development plan",
          "Build long-term maintenance strategies"
        ],
        content: `This final module brings everything together. You'll create a comprehensive plan for building and maintaining a strong, healthy self-image over the long term.`,
        activities: [
          "Create a self-image development plan",
          "Design a maintenance routine",
          "Set long-term self-image goals"
        ],
        resources: [
          { name: "Personal Development Planning (Article)", url: "https://hbr.org/2021/06/how-to-create-a-personal-development-plan", type: "article" },
          { name: "Creating Your Personal Development Plan (Video)", url: "https://www.youtube.com/watch?v=6XG7eBVPH2E", type: "video" },
          { name: "My Self-Image Development Plan", url: "#", type: "template", downloadable: true, content: "My Self-Image Development Plan\n\nCreated: ___________\n\nPART 1 — WHERE I AM TODAY\nSelf-image score today: ___/10\nMy biggest self-image strength: ___________\nMy biggest self-image challenge: ___________\n\nPART 2 — WHERE I WANT TO BE (90 DAYS)\nSelf-image score I'm aiming for: ___/10\nThe person I'm becoming: ___________\nHow I'll know I've arrived: ___________\n\nPART 3 — THE 8 PILLARS CHECK-IN\n1. Self-Image Understanding: ___/10 | Action: ___________\n2. Confidence & Competence: ___/10 | Action: ___________\n3. Self-Talk: ___/10 | Action: ___________\n4. Identity & Values: ___/10 | Action: ___________\n5. Boundaries & Respect: ___/10 | Action: ___________\n6. Discipline & Consistency: ___/10 | Action: ___________\n7. Resilience & Recovery: ___/10 | Action: ___________\n\nPART 4 — MY 90-DAY FOCUS\nTop 3 pillars to work on: ___________\nOne daily habit that supports my self-image: ___________\nOne weekly practice: ___________\nOne thing I'm eliminating that damages my self-image: ___________\n\nPART 5 — MAINTENANCE PLAN\nMonthly self-image review date: ___________\nMy accountability partner: ___________\nThis plan expires and gets renewed on: ___________" },
          { name: "Course Completion Commitment Card", url: "#", type: "exercise", downloadable: true, content: "Course Completion Commitment Card\n8 Ways to Strengthen Self-Image\n\n\"I, ___________, commit to the following:\"\n\nI understand that my self-image shapes my decisions, actions, and outcomes.\n\nI commit to:\n□ Practising positive self-talk daily\n□ Acting in alignment with my core values\n□ Setting and maintaining healthy boundaries\n□ Building skills that grow my real confidence\n□ Showing myself compassion when I fall short\n□ Reviewing my self-image plan monthly\n\nMy Self-Image Mantra:\n\"___________\"\n\nSigned: ___________\nDate: ___________\n\nReview dates:\n30 days: ___________ Status: ___________\n60 days: ___________ Status: ___________\n90 days: ___________ Status: ___________" }
        ],
        estimatedTime: "60 minutes"
      }
    ]
  },
  {
    id: "communication",
    title: "8 Ways to Improve Communication",
    description: "Learn communication fundamentals: clarity, listening, confidence, and influence.",
    fullDescription: "Communication is the universal skill. This course teaches fundamentals—speaking clearly, listening deeply, and expressing ideas with confidence—for ages 10–45.",
    ageRange: "10-45",
    icon: Heart,
    iconColor: "text-rose-600",
    bgGradient: "from-[#60a5fa]/30 to-[#121212]",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
    featured: false,
    duration: "4 weeks",
    priceUSD: 14,
    youtubeVideoUrl: "https://www.youtube.com/watch?v=eIho2S0ZahI", // Julian Treasure — "How to Speak So That People Want to Listen" (TED) — 45M+ views
    trackId: "leadership",
    instructor: "The Becoming Institute",
    instructorTitle: "Communication & Strategy Lead",
    rating: 4.8,
    reviewCount: 891,
    studentCount: 5634,
    level: "Beginner",
    language: "English",
    lastUpdated: "2026",
    modules: [
      "Clarity & Structure",
      "Listening Fundamentals",
      "Confidence in Speaking",
      "Asking Better Questions",
      "Difficult Conversations",
      "Non‑Verbal Communication",
      "Influence & Persuasion Basics",
      "Communication Habits for Life"
    ],
    outcomes: [
      "Speak with clarity and confidence",
      "Listen and respond effectively",
      "Handle difficult conversations",
      "Build lifelong communication habits"
    ],
    detailedModules: [
      {
        title: "Clarity & Structure",
        description: "Learn to structure your communication for maximum clarity and impact.",
        objectives: [
          "Master the clarity-first principle",
          "Structure messages effectively",
          "Eliminate confusion in communication"
        ],
        content: `Clear communication starts with clear thinking. This module teaches you how to structure your thoughts and messages for maximum clarity and impact.`,
        activities: [
          "Practice the pyramid principle for structuring messages",
          "Rewrite 3 unclear messages into clear ones",
          "Create a personal communication template"
        ],
        resources: [
          { name: "Clarity in Communication (Article)", url: "https://hbr.org/2021/06/how-to-communicate-with-clarity", type: "article" },
          { name: "The Pyramid Principle — Structured Communication (Video)", url: "https://www.youtube.com/watch?v=mQmMFhxqMuE", type: "video" },
          { name: "Message Clarity Rewrite Worksheet", url: "#", type: "exercise", downloadable: true, content: "Message Clarity Rewrite Worksheet\n\nThe Clarity Rule: If the reader has to re-read it, rewrite it.\n\nEXERCISE 1\nOriginal message: ___________\nClear version (What? Who? When? Why?): ___________\n\nEXERCISE 2\nOriginal message: ___________\nClear version: ___________\n\nEXERCISE 3\nOriginal message: ___________\nClear version: ___________\n\nPYRAMID PRINCIPLE PRACTICE\nTopic / Message: __________________\n\nMain Point (first, one sentence): ___________\n\nSupporting Point 1: ___________\nEvidence: ___________\n\nSupporting Point 2: ___________\nEvidence: ___________\n\nSupporting Point 3: ___________\nEvidence: ___________\n\nCall to Action: ___________\n\nMY COMMUNICATION TEMPLATE\nFor [situation], my default structure is:\n1. ___________\n2. ___________\n3. ___________" },
          { name: "Personal Communication Style Guide", url: "#", type: "template", downloadable: true, content: "Personal Communication Style Guide\n\nDate: ___________\n\nMy Communication Strengths:\n1. ___________\n2. ___________\n\nMy Communication Weaknesses:\n1. ___________\n2. ___________\n\nMy Default Communication Style (circle): Direct | Diplomatic | Detailed | Big Picture\n\nWhen I communicate best: ___________\nWhen I communicate worst: ___________\n\nMy Clarity Checklist (before sending any important message):\n□ Is the main point in the first sentence?\n□ Is the action required clear?\n□ Is the deadline / timeline stated?\n□ Is it free of unnecessary words?\n□ Would a stranger understand it?\n\nOne Communication Habit I'm Building:\n___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Listening Fundamentals",
        description: "Develop active listening skills that make others feel heard and understood.",
        objectives: [
          "Practice active listening techniques",
          "Develop empathetic listening habits",
          "Improve comprehension and retention"
        ],
        content: `Listening is the most important communication skill. This module teaches you how to listen actively, empathetically, and effectively.`,
        activities: [
          "Practice active listening in 3 conversations",
          "Use the 'reflect and confirm' technique",
          "Identify your listening barriers"
        ],
        resources: [
          { name: "Active Listening Guide (Article)", url: "https://www.mindtools.com/pages/article/active-listening.htm", type: "article" },
          { name: "The Art of Active Listening (Video)", url: "https://www.youtube.com/watch?v=rzsVh8YwZEQ", type: "video" },
          { name: "Active Listening Practice Log", url: "#", type: "exercise", downloadable: true, content: "Active Listening Practice Log\n\nInstructions: After each important conversation, complete one entry.\n\nCONVERSATION 1\nDate: ___________ | With: ___________\nTopic: ___________\n\nDid I let them finish without interrupting? Yes / No\nDid I summarise back what they said? Yes / No\nMy summary: \"So what I'm hearing is... ___________\"\nWere they satisfied with my summary? Yes / No / Partially\nWhat I missed or misunderstood: ___________\nKey emotion behind their message: ___________\nWhat I'll do differently next conversation: ___________\n\nCONVERSATION 2\nDate: ___________ | With: ___________\nTopic: ___________\n\nDid I let them finish? Yes / No\nMy reflect-back: ___________\nKey emotion I noticed: ___________\nImprovement from last time: ___________\n\nCONVERSATION 3\nDate: ___________ | With: ___________\nMy listening score this time: ___/10\nBiggest improvement I've made: ___________" }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Confidence in Speaking",
        description: "Build the confidence to speak up in any situation.",
        objectives: [
          "Overcome speaking anxiety",
          "Develop vocal presence",
          "Practice confident speaking techniques"
        ],
        content: `Confidence in speaking is a skill that can be learned. This module provides techniques for building speaking confidence and overcoming anxiety.`,
        activities: [
          "Practice vocal exercises for presence",
          "Use the 3-second rule for speaking up",
          "Record and review your speaking practice"
        ],
        resources: [
          { name: "Building Speaking Confidence (Article)", url: "https://hbr.org/2021/06/how-to-speak-with-confidence", type: "article" },
          { name: "How to Speak with Confidence — Julian Treasure (Video)", url: "https://www.youtube.com/watch?v=eIho2S0ZahI", type: "video" },
          { name: "Speaking Confidence Practice Tracker", url: "#", type: "exercise", downloadable: true, content: "Speaking Confidence Practice Tracker\n\nThe Rule: Confidence in speaking only comes from speaking. Practice daily.\n\nWEEK 1 — VOCAL WARM-UPS\nMorning vocal exercises I practiced:\nDay 1: Humming 2 min ✓/✗ | Tongue twisters ✓/✗\nDay 2: ✓/✗ | ✓/✗\nDay 3: ✓/✗ | ✓/✗\nDay 4: ✓/✗ | ✓/✗\nDay 5: ✓/✗ | ✓/✗\n\nWEEK 2 — SPEAK UP CHALLENGES\nChallenge 1: Spoke first in a group: ✓/✗ | How it felt: ___________\nChallenge 2: Introduced myself to someone new: ✓/✗ | How it felt: ___________\nChallenge 3: Asked a question in public: ✓/✗ | How it felt: ___________\nChallenge 4: Gave my opinion without hedging: ✓/✗ | How it felt: ___________\n\nWEEK 3 — RECORD & REVIEW\nI recorded myself speaking: ___________\nWhat I noticed:\n- Pacing: ___________\n- Volume: ___________\n- Filler words (um, uh, like): ___________\n- Eye contact / posture: ___________\nOne thing to improve: ___________\n\nConfidence Score:\nWeek 1: ___/10 | Week 2: ___/10 | Week 3: ___/10" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Asking Better Questions",
        description: "Learn to ask questions that unlock information and build relationships.",
        objectives: [
          "Master different question types",
          "Practice open-ended questioning",
          "Use questions strategically"
        ],
        content: `Good questions unlock information and build relationships. This module teaches you how to ask better questions in any situation.`,
        activities: [
          "Practice converting closed questions to open ones",
          "Use questioning frameworks in conversations",
          "Create a personal question bank"
        ],
        resources: [
          { name: "Art of Questioning (Article)", url: "https://hbr.org/2021/06/how-to-ask-better-questions", type: "article" },
          { name: "The Power of Asking Better Questions (Video)", url: "https://www.youtube.com/watch?v=OuMODjIEYGE", type: "video" },
          { name: "My Personal Question Bank", url: "#", type: "template", downloadable: true, content: "My Personal Question Bank\n\nKeep this with you. Use these in meetings, conversations, and interviews.\n\nOPENING QUESTIONS (to start conversations well)\n\"What's been most on your mind lately?\"\n\"What would make this conversation most useful for you?\"\n\"What does success look like for you here?\"\n\nYour custom openers:\n1. ___________\n2. ___________\n\nEXPLORING QUESTIONS (to go deeper)\n\"Can you tell me more about that?\"\n\"What's behind that?\"\n\"What have you tried so far?\"\n\"What does that mean to you?\"\n\nYour custom exploring questions:\n1. ___________\n2. ___________\n\nCHALLENGING QUESTIONS (to expand thinking)\n\"What would you do if that weren't possible?\"\n\"What's the opposite of that?\"\n\"What would someone who disagreed with you say?\"\n\nYour custom challenge questions:\n1. ___________\n2. ___________\n\nCLOSING QUESTIONS (to wrap up well)\n\"What's the most important thing you're taking from this?\"\n\"What's your next step?\"\n\"What do you need from me?\"\n\nYour custom closers:\n1. ___________\n2. ___________" }
        ],
        estimatedTime: "40 minutes"
      },
      {
        title: "Difficult Conversations",
        description: "Learn to handle challenging conversations with grace and effectiveness.",
        objectives: [
          "Prepare for difficult conversations",
          "Manage emotions during tough talks",
          "Achieve positive outcomes"
        ],
        content: `Difficult conversations are inevitable, but they don't have to be destructive. This module teaches you how to handle challenging conversations effectively.`,
        activities: [
          "Use the 'prepare, discuss, resolve' framework",
          "Practice emotional regulation techniques",
          "Role-play a difficult conversation scenario"
        ],
        resources: [
          { name: "Difficult Conversations Guide (Article)", url: "https://hbr.org/2021/06/how-to-have-difficult-conversations", type: "article" },
          { name: "How to Have Difficult Conversations (Video)", url: "https://www.youtube.com/watch?v=TrEVARXRxgI", type: "video" },
          { name: "Difficult Conversation Preparation Guide", url: "#", type: "template", downloadable: true, content: "Difficult Conversation Preparation Guide\n\nConversation Topic: __________________\nPerson: ___________\nDate / Time Planned: ___________\n\nPART 1 — PREPARE\nWhat do I want from this conversation? (Be specific):\n___________\n\nWhat do I think they want?\n___________\n\nWhat's the worst that could happen — and can I handle it?\n___________\n\nPART 2 — MY OPENING STATEMENT\nUse: \"I've been wanting to talk about [topic]. I want us both to come out of this in a better place. Can we talk?\"\n\nMy opening: ___________\n\nPART 3 — MY KEY POINTS (max 3, in order of importance)\n1. ___________\n2. ___________\n3. ___________\n\nPART 4 — MANAGING MY EMOTIONS\nIf I feel defensive, I will: ___________\nIf they get upset, I will: ___________\nMy 10-second reset technique: ___________\n\nPART 5 — AFTER THE CONVERSATION\nWhat went well: ___________\nWhat I'd do differently: ___________\nAgreement reached: ___________\nNext step: ___________" }
        ],
        estimatedTime: "55 minutes"
      },
      {
        title: "Non‑Verbal Communication",
        description: "Understand and use body language to enhance your communication.",
        objectives: [
          "Read non-verbal cues effectively",
          "Use body language strategically",
          "Align verbal and non-verbal messages"
        ],
        content: `Non-verbal communication conveys more than words. This module teaches you to read and use body language effectively.`,
        activities: [
          "Practice mirroring techniques",
          "Record and analyze your body language",
          "Identify non-verbal cues in others"
        ],
        resources: [
          { name: "Body Language Guide (Article)", url: "https://www.scienceofpeople.com/body-language", type: "article" },
          { name: "Your Body Language Shapes Who You Are — Amy Cuddy TED (Video)", url: "https://www.youtube.com/watch?v=Ks-_Mh1QhMc", type: "video" },
          { name: "Non-Verbal Communication Checklist", url: "#", type: "template", downloadable: true, content: "Non-Verbal Communication Checklist\n\nUse this before important conversations, presentations, or meetings.\n\nPOSTURE & PRESENCE\n□ Shoulders back, not hunched\n□ Standing / sitting tall (power pose before entering)\n□ Feet planted, not fidgeting\n\nFACIAL EXPRESSION\n□ Relaxed jaw (not clenched)\n□ Natural, warm expression (not forced smile)\n□ Eyebrows neutral (not furrowed)\n\nEYE CONTACT\n□ Making eye contact 60-70% of the time (not staring)\n□ Looking at the person when they speak (not at phone)\n□ Nodding to show I'm listening\n\nGESTURES\n□ Hands visible (not in pockets or crossed)\n□ Using open hand gestures (not pointing fingers)\n□ Gestures match my words\n\nVOICE QUALITIES\n□ Speaking at a measured pace (not rushing)\n□ Using pauses effectively\n□ Volume appropriate to the room\n□ Ending sentences downward (confidence), not upward (question)\n\nAFTER THE CONVERSATION — REVIEW\nBody language signal that worked well: ___________\nSignal to improve next time: ___________" }
        ],
        estimatedTime: "45 minutes"
      },
      {
        title: "Influence & Persuasion Basics",
        description: "Learn ethical techniques for influencing others and building consensus.",
        objectives: [
          "Understand influence principles",
          "Practice ethical persuasion",
          "Build consensus effectively"
        ],
        content: `Influence is about helping others see your perspective. This module teaches ethical techniques for influencing and persuading others.`,
        activities: [
          "Practice the 'reciprocity' principle",
          "Use storytelling for influence",
          "Apply Cialdini's principles in real situations"
        ],
        resources: [
          { name: "Influence Psychology (PDF Guide)", url: "/documents/influence-psychology.pdf", type: "pdf", downloadable: true },
          { name: "Persuasion Techniques (PDF Guide)", url: "/documents/persuasion-techniques.pdf", type: "pdf", downloadable: true }
        ],
        estimatedTime: "50 minutes"
      },
      {
        title: "Communication Habits for Life",
        description: "Build sustainable communication habits that serve you for a lifetime.",
        objectives: [
          "Create a communication improvement plan",
          "Build daily communication practices",
          "Develop long-term growth strategies"
        ],
        content: `Communication is a lifelong skill. This final module helps you create sustainable habits and a plan for continuous improvement.`,
        activities: [
          "Create a personal communication development plan",
          "Design daily communication practices",
          "Set long-term communication goals"
        ],
        resources: [
          { name: "Communication Mastery (PDF Guide)", url: "/documents/communication-mastery.pdf", type: "pdf", downloadable: true },
          { name: "Habit Building Guide (PDF Guide)", url: "/documents/habit-building-guide.pdf", type: "pdf", downloadable: true }
        ],
        estimatedTime: "60 minutes"
      }
    ]
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}




