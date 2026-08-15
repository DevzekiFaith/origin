import { Book, Shirt, PenTool, Award, LucideIcon } from "lucide-react";

export interface StoreProduct {
  id: number;
  name: string;
  category: "journals" | "ebooks" | "merch" | "hardcopy" | "courses";
  price: number;
  priceNGN?: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  icon: LucideIcon;
  gradient: string;
  imageUrl?: string;
  description: string;
  rawDescription?: string;
  pdfUrl?: string;
  bonusPdfs?: { name: string; url: string; size?: string }[];
}

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 1,
    name: "Origin Journal",
    category: "journals",
    price: 24.99,
    rating: 4.8,
    reviews: 234,
    icon: PenTool,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
    description: "Daily 90-day quarterly journal for personal growth and reflection",
    pdfUrl: "/documents/origin_90day_digital_master_kit.pdf",
    bonusPdfs: [
      { name: "Origin 90-Day Digital Master Kit (PDF)", url: "/documents/origin_90day_digital_master_kit.pdf", size: "Full 90-Day Kit" },
      { name: "Origin 7-Day Micro-Sprint Starter Guide (PDF)", url: "/documents/origin_7day_sprint_starter.pdf", size: "7-Day Sample" },
      { name: "Origin 90-Day Hardcover Edition Companion Guide (PDF)", url: "/documents/origin_90day_hardcover_companion.pdf", size: "Hardcover Digital Twin" }
    ],
    rawDescription: "<h3>We start with your dreams before educating you.</h3><p>Optimize your daily routines, track your progress, and align your daily execution through the 3-part Origin framework: <strong>Dream → Education → Purpose</strong>. Built for thinkers, builders, and high achievers.</p><br><h3>Included Digital & Interactive Access</h3><ul><li><strong>Interactive Life Design Planner:</strong> Test and customize your digital planner on the web at <a href='/planner' style='color:#60a5fa;text-decoration:underline;'>origin/planner</a>.</li><li><strong>Origin 90-Day Digital Master Kit (PDF):</strong> Complete 90-day fillable quarterly planner (Days 1–30 Dream, Days 31–60 Education, Days 61–90 Purpose) + Founder Audio Sprint Script.</li><li><strong>Free 7-Day Micro-Sprint Starter (PDF):</strong> Immediate 7-day quickstart focus guide.</li></ul>"
  },
  {
    id: 3,
    name: "Origin Hoodie",
    category: "merch",
    price: 49.99,
    rating: 4.7,
    reviews: 189,
    icon: Shirt,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/origin_hoodie_mockup.png",
    description: "Premium quality hoodie with Origin branding",
    rawDescription: "<h3>Premium quality hoodie with Origin branding</h3><p>Comfort meets purpose. This premium heavyweight hoodie features minimalist design with high-quality embroidery. Perfect for work, study, or travel.</p>"
  },
  {
    id: 4,
    name: "The Architecture of Becoming (Hardcopy)",
    category: "hardcopy",
    price: 29.99,
    priceNGN: 15000,
    rating: 4.9,
    reviews: 412,
    icon: Book,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/architecture_of_becoming_standing_v1.png",
    description: "The Definitive Blueprint for Human Architecture & Self-Evolution by The Becoming Institute. Pre-Order opens August 20 — Official Launch Next Year (₦5,000–₦15,000).",
    pdfUrl: "/documents/The_Human_Broadcast_Complete_Ebook.pdf",
    bonusPdfs: [
      { name: "The Human Broadcast (Complete E-Book)", url: "/documents/The_Human_Broadcast_Complete_Ebook.pdf", size: "Full PDF E-Book" },
      { name: "The Human Broadcast: Environment Matrix", url: "/documents/The_Human_Broadcast_Environment_Matrix.pdf", size: "PDF Matrix Guide" }
    ],
    rawDescription: `<h1>THE ARCHITECTURE OF BECOMING</h1><p><strong>The Definitive Blueprint for Human Architecture & Self-Evolution</strong></p><p><em>Published by The Becoming Institute • Pre-Order Opens August 20 | Official Launch Next Year</em></p><p><strong>Pre-Order Tier Pricing:</strong> ₦5,000 – ₦15,000 ($9.99 – $29.99)</p><br><p>Most people spend their entire lives occupying a reality designed by someone else's blueprint. <strong>The Architecture of Becoming</strong> is the master manual for taking the pen back—auditing your internal foundations, dismantling default conditioning, and engineering an undeniable life of influence, mastery, and succession.</p><br><h3>Inside the Hardcover Manual:</h3><ul><li><strong>1. Perception (The Lens of Reality):</strong> Rewire your cognitive baseline to identify leverage and opportunity in any environment.</li><li><strong>2. Usefulness (The Engine of Impact):</strong> Transform raw potential into deployed, high-impact utility that the global marketplace cannot ignore.</li><li><strong>3. Boundaries (The Architecture of Preservation):</strong> Establish impenetrable perimeters around your time, energy, and focus.</li><li><strong>4. Consent (The Mastery of Agreement):</strong> Take absolute ownership over your 'yes' and 'no' to curate high-ticket alignment.</li><li><strong>5. Value (The Currency of Significance):</strong> Audit your intrinsic worth and command premium positioning.</li><li><strong>6. Self-Mastery (The Ultimate Governance):</strong> Achieve complete emotional and cognitive control to dictate your external reality.</li></ul><br><h3>Exclusive Pre-Order Bonus Included</h3><p>When you pre-order starting August 20 or join the priority waitlist today, you receive <strong>immediate instant digital access</strong> to <em>The Human Broadcast (Complete E-Book)</em> & <em>Environment Matrix</em>—exclusive deep-dives on non-verbal authority, presence, and personal frequency.</p>`
  },
  {
    id: 5,
    name: "Life Design Planner",
    category: "journals",
    price: 29.99,
    rating: 4.6,
    reviews: 321,
    icon: PenTool,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80",
    description: "Plan and track your goals effectively",
  },
  {
    id: 7,
    name: "MONEY FARMING",
    category: "ebooks",
    price: 4.06,
    originalPrice: 10.00,
    rating: 4.9,
    reviews: 128,
    icon: Book,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/cover_money_farming.png",
    description: "Stop Chasing Money. Start Farming It. Discover the 7 timeless principles to plant, grow, and harvest sustainable wealth—without the financial stress.",
    pdfUrl: "/documents/money-farming.pdf",
    rawDescription: `<h1>Stop Chasing Money. Start Farming It.</h1><p><em>The 7 Principles for Planting, Growing, and Harvesting Wealth</em></p><p><br></p><h3>By Zeki Ubor</h3><p><br></p><h3>The Farmer's Secret</h3><p>One morning, a young man asked an elderly farmer: <em>"How do I become wealthy?"</em></p><p>The farmer handed him a handful of seeds and said: <em>"You cannot harvest what you never planted. You cannot expect abundance from neglected soil. And you cannot plant today and demand a harvest tomorrow."</em></p><p>Money follows the exact same laws. The wealthiest people in the world are not merely earners; <strong>they are farmers.</strong> They plant ideas, skills, businesses, relationships, and investments—nurturing them until a massive harvest becomes inevitable.</p><p><br></p><h3>The 7 Money Farming Principles Inside:</h3><ul><li><strong>Chapter 1: Understanding Money Farming —</strong> The Man Who Sold His Harvest (Chinedu's story in Enugu). Why people chase money vs how farmers grow assets.</li><li><strong>Chapter 2: Preparing Your Financial Soil —</strong> The Harvest That Never Came (Emeka's story in Lagos). The 4 layers of soil: Responsibility, Awareness, Vision, & Character.</li><li><strong>Chapter 3: Planting Wealth Seeds —</strong> The Mechanic Nobody Noticed (Musa's story in Port Harcourt). The 5 seeds: Skills, Knowledge, Relationships, Opportunities, & Reputation.</li><li><strong>Chapter 4: Nurturing Growth —</strong> The Bamboo Farmer's Dilemma & The Tailor (Ada's story). Harnessing Consistency, Discipline, Adaptation, & Patience.</li><li><strong>Chapter 5: Removing Financial Weeds —</strong> The Farm That Should Have Flourished (Okoro in Benin). Eliminating Lifestyle Inflation, Bad Debt, Procrastination, Fear, & Comparison.</li><li><strong>Chapter 6: Harvesting Wealth —</strong> The Farmer Who Refused to Celebrate (Chief Nwosu). Turning Income into Assets & Building Automated Systems.</li><li><strong>Chapter 7: Replanting for Generational Wealth —</strong> Pa Eze's Legacy. Transferring Wisdom, Building Systems, & Leaving a Lasting Impact.</li></ul><p><br></p><blockquote><strong>"Wealth is not something you chase. Wealth is something you cultivate." — Zeki Ubor</strong></blockquote><p><br></p><h3>Interactive Features Included:</h3><ul><li><strong>Built-in E-Book Reader:</strong> Read sample chapters, switch reading themes (Dark, Sepia, Light), and adjust typography inside your browser.</li><li><strong>Full 100-Page Digital PDF Download:</strong> Instant access to the complete digital manuscript, action steps, and reflection workbooks.</li><li><strong>Final Money Farming Declaration:</strong> A personal commitment framework for building sustainable wealth.</li>`
  },
  {
    id: 8,
    name: "8 Q&A TO SELLING",
    category: "ebooks",
    price: 3.00,
    originalPrice: 8.00,
    rating: 4.8,
    reviews: 94,
    icon: Book,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/8-qa-to-selling.png",
    description: "For Those Ready to Share Their Unique Value. Articulate your worth and ascend into the elite zone of singular contribution and scale.",
    pdfUrl: "/documents/8-qa-to-selling.pdf",
    rawDescription: `<h1>8 Q&A TO SELLING</h1><p><em>For Those Ready to Share Their Unique Value</em></p><p><br></p><p><strong>By Zeki Ubor</strong></p><p><br></p><p>About the Book</p><p>In a hyper-saturated global marketplace, raw ambition and hard work are no longer enough. The modern economy disproportionately rewards one specific metric: <strong>the strategic exchange of high-tier value.</strong> If you cannot clearly articulate your worth, the market will default to treating your expertise as a cheap, interchangeable commodity.</p><p>In <strong>8 Q&A to Selling</strong>, professional human architect and systems engineer Zeki Ubor strips away passive self-help cliches and transactional sales fluff to deliver a definitive, engineered blueprint for market authority. Built around a highly tactical 8-part question-and-answer framework, this book shifts your paradigm away from standard marketplace competition and pulls you into the elite zone of singular contribution and scale.</p><p>Whether you are an entrepreneur, creator, freelancer, or professional looking to break through income ceilings, this book provides the exact linguistic and operational tools required to transform your specialized skills into a world-class institutional asset.</p><p><br></p><h3>What You Will Discover Inside:</h3><ul><li><strong>The Blueprint of a Specialized Trade:</strong> How to identify, audit, and engineer your unique capability into an undeniable market solution.</li><li><strong>Precision Messaging Frameworks:</strong> The exact steps to reframe your copy and messaging so you cut through the digital noise and pull premium clients inbound pre-sold on your value.</li><li><strong>The 3 Pillars of Market Positioning:</strong> How to ascend from a low-tier commodity provider to a premium, legacy-defining category of one.</li><li><strong>The Physics of Momentum:</strong> Strategies to build data-driven stamina, eliminate operational friction, and generate an unstoppable acceleration loop in your business.</li><li><strong>Scalable Value Liquidity:</strong> How to build systems that distribute immense upfront value to thousands of people simultaneously, establishing an unassailable trust monopoly.</li></ul><p><br></p><h3>Who This Book Is For:</h3><ul><li><strong>Entrepreneurs & Founders</strong> looking to scale their value distribution and dominate their industry vertical.</li><li><strong>Freelancers & Consultants</strong> tired of fighting in a race-to-the-bottom price war who are ready to command premium pricing.</li><li><strong>High-Performing Outliers</strong> ready to stop trading physical hours for money and start architecting a multi-generational legacy.</li></ul><br><blockquote><strong>"The marketplace is waiting—not for perfection, but for authenticity. What will you bring to it?"</strong></blockquote><br><h3>Claim Your Copy Now</h3><p>Stop blending into the noise. Scroll up, click <strong>Buy Now</strong>, and unlock the definitive engineering manual to mastering your trade, capturing your market, and maximizing your unique value.</p>`
  },
  {
    id: 9,
    name: "House of Choice",
    category: "ebooks",
    price: 4.50,
    originalPrice: 12.00,
    rating: 4.9,
    reviews: 112,
    icon: Book,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "https://files.selar.co/product-images/2026/products/zeki-faith1/house-of-choice-selar.com-69f0b5db3bbb2.jpg",
    description: "Reshape Your Decision, Reshaping Your Essence. Complete 88-page original manuscript on decision architecture by Zeki Faith.",
    pdfUrl: "/documents/house-of-choice.pdf",
    rawDescription: `<h1>HOUSE OF CHOICE</h1><p><strong>Reshape Your Decision, Reshaping Your Essence</strong></p><p><em>By Zeki Faith • Published by Mindvest Publishing House (© 2025)</em></p><br><h3>About the Complete Original Manuscript (88 Pages)</h3><p>From the beginning, when time became resident, direction became more powerful than decisions. Even though you need both, direction shapes the course while decisions provide the fuel. In <strong>House of Choice</strong>, transformational trainer and systems architect Zeki Faith dissects the pillars that hold decisions upright: values, emotions, reasoning, and environment.</p><br><h3>Inside the 12 Chapters:</h3><ul><li><strong>Chapter 1: The Foundation of Choice —</strong> Understanding the birth of a choice, anatomy of decision, and psychological biases.</li><li><strong>Chapter 2: The Mechanism of Decision-Making —</strong> Fast vs. slow thinking, systems of intuition, and emotional filters.</li><li><strong>Chapter 3: Values and Emotions —</strong> Defining your compass, emotional lenses, and alignment frameworks.</li><li><strong>Chapter 4: Direction and Its Power —</strong> Finding your True North, power of intentionality, and avoiding drift.</li><li><strong>Chapter 5: The Role of Environment —</strong> Social circles, digital landscapes, and physical spaces for productivity.</li><li><strong>Chapter 6: Short-Term vs. Long-Term Thinking —</strong> Delaying gratification and balancing time horizons.</li><li><strong>Chapter 7: The Decision Checklist —</strong> The 7-step structured approach to zero-regret choices.</li><li><strong>Chapter 8: Coaching vs. Training —</strong> Skill-building vs. mindset transformation frameworks.</li><li><strong>Chapter 9: Case Studies of Success —</strong> Real-world decision breakdowns (Steve Jobs, Oprah, Wright Brothers, Toyota).</li><li><strong>Chapter 10: Overcoming Decision Paralysis —</strong> Releasing indecision, two-minute rule, and experimental thinking.</li><li><strong>Chapter 11: Building Decision-Making Habits —</strong> Cues, routines, rewards, and habit stacking for clarity.</li><li><strong>Chapter 12: Creating a Legacy Through Choices —</strong> Aligning daily actions with enduring impact.</li></ul><br><blockquote><strong>"No one is bigger than their choices. Growth is directly tied to the decisions you make." — Zeki Faith</strong></blockquote><br><h3>Full Download Includes:</h3><ul><li><strong>Full 88-Page Unabridged PDF eBook:</strong> Instant access to the complete original publication.</li><li><strong>Built-in In-Browser E-Book Reader:</strong> Read sample chapters with dark/light themes directly in the app.</li></ul>`
  },
  {
    id: 10,
    name: "Deep-Remake",
    category: "ebooks",
    price: 4.50,
    originalPrice: 12.00,
    rating: 4.8,
    reviews: 86,
    icon: Book,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "https://files.selar.co/product-images/2026/products/zeki-faith1/deep-remake-selar.com-69f0b0c556158.jpg",
    description: "Redefining Yourself and Reclaiming Your Power. Complete 104-page original manuscript on human architecture by Zeki Faith.",
    pdfUrl: "/documents/deep-remake.pdf",
    rawDescription: `<h1>DEEP RE-MAKE</h1><p><strong>Redefining Yourself and Reclaiming Your Power</strong></p><p><em>By Zeki Faith • Published by Mindvest Publishing House (© 2025)</em></p><br><h3>About the Complete Original Manuscript (104 Pages)</h3><p>Who you are today is a result of the thoughts you’ve cultivated over time, and who you become tomorrow depends on the quality of your thoughts today. <strong>Deep Re-Make</strong> is the definitive 104-page guide to dismantling personal tokenism, uprooting limiting beliefs, and engineering an undeniable life of purpose, discipline, and significance.</p><br><h3>Inside the 15 Chapters:</h3><ul><li><strong>Chapter 1: The Seeds of Thought —</strong> Understanding personal tokenism and breaking self-imposed limits.</li><li><strong>Chapter 2: Weeding Out the Negatives —</strong> Identifying and rewriting limiting beliefs.</li><li><strong>Chapter 3: Cultivating the Garden —</strong> Building a growth-oriented mindset and embracing the power of 'yet'.</li><li><strong>Chapter 4: The Law of Design —</strong> Becoming the architect of your destiny through SMART execution.</li><li><strong>Chapter 5: Harnessing Discipline —</strong> Micro-habits, morning rituals, and the compound effect.</li><li><strong>Chapter 6: Expanding Your Horizons —</strong> Crafting a vision statement and discovering core purpose.</li><li><strong>Chapter 7: Overcoming Fear —</strong> Breaking comfort zones using the 5-second rule and action steps.</li><li><strong>Chapter 8: Rising Stronger —</strong> Emotional regulation, problem-solving, and building resilience.</li><li><strong>Chapter 9: Sowing and Reaping —</strong> Aligning daily actions with 6-month and multi-year goals.</li><li><strong>Chapter 10: Mastering Relationships —</strong> The 5 pillars of emotional intelligence (EQ) and influence.</li><li><strong>Chapter 11: Mentorship and Community —</strong> Building an empowering growth network and mastermind circle.</li><li><strong>Chapter 12: Success and Failure —</strong> Two sides of the same coin: conducting failure audits.</li><li><strong>Chapter 13: Framing Your Legacy —</strong> Becoming a builder of others and leaving a lasting mark.</li><li><strong>Chapter 14: Sustaining Growth —</strong> Navigating a lifelong journey of continuous self-education.</li><li><strong>Chapter 15: Becoming a Framer —</strong> Shaping your world, creating systems, and inspiring others.</li></ul><br><blockquote><strong>"Your life changes when you change your thinking. You are the architect of your own life." — Zeki Faith</strong></blockquote><br><h3>Full Download Includes:</h3><ul><li><strong>Full 104-Page Unabridged PDF eBook:</strong> Instant access to the complete original publication.</li><li><strong>Built-in In-Browser E-Book Reader:</strong> Read sample chapters with dark/light themes directly in the app.</li></ul>`
  },
  {
    id: 11,
    name: "The Ezra Rebuild Mindset: Becoming the Ezra of Your Generation",
    category: "ebooks",
    price: 0.00,
    originalPrice: 10.00,
    rating: 4.9,
    reviews: 215,
    icon: Book,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "https://files.selar.co/product-images/2025/products/zeki-faith1/a-free-guide-to-rebuildin-selar.com-68f80c4215991.png",
    description: "Rebuilding Life, Business, and Community from the Inside Out. Discover 5 timeless principles to rebuild your inner blueprint.",
    pdfUrl: "/documents/a-free-guide-to-rebuilding.pdf",
    rawDescription: `<h1>The Ezra Rebuild Mindset: Becoming the Ezra of Your Generation</h1><p><strong>Rebuilding Life, Business, and Community from the Inside Out</strong></p><br><p><em>"Listen — Rebuilding is never easy. You’ll question your strength, your timing, and your worth. But hear me — rebuilding is not punishment. It’s an invitation. It’s God whispering, 'Let Me build it again, this time with you fully awake.'"</em></p><br><p>Ezra didn’t rebuild Jerusalem’s walls — he rebuilt its mindset. He transformed a culture that had forgotten truth into a generation that walked in conviction. He was not a king or soldier — he was a teacher, a reformer, a restorer of inner order.</p><br><h3>The 5 Core Rebuild Pillars Inside:</h3><ul><li><strong>1. From Collapse to Clarity — "Rebuild Your Inner Blueprint"</strong><br><em>Key Thought:</em> You can’t build a new life with an old mindset.</li><li><strong>2. From Pollution to Purity — "Clean the Mental Altars"</strong><br><em>Key Thought:</em> The first wealth is a clean mind.</li><li><strong>3. From Emotion to Intention — "Recommit to Your Purpose"</strong><br><em>Key Thought:</em> Purpose without commitment is just potential on pause.</li><li><strong>4. From Noise to Order — "Reform Your Environment"</strong><br><em>Key Thought:</em> Rebuilding demands order — not noise.</li><li><strong>5. From Pressure to Power — "Reignite Your Faith and Fire"</strong><br><em>Key Thought:</em> Rebuilding isn’t about recovering what you lost — it’s about discovering what was always inside you.</li></ul><br><blockquote><strong>"If your world has fallen apart, it’s not over — it’s under construction. You are not behind time; you are being rebuilt for your appointed time."</strong></blockquote>`
  },
  {
    id: 12,
    name: "MASTERCLASS: Becoming a Person of Interest(POI) - Money Farmer",
    category: "courses",
    price: 11.06,
    rating: 4.9,
    reviews: 340,
    icon: Award,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/masterclass_flier.png",
    description: "Stop Blending In. Start Architecting Your Influence. GoogleMeet LIVE 3-hour masterclass on Saturday, September 12, 2026 by Zeki Ubor.",
    pdfUrl: "/documents/Architecture_of_Human_Intent_Framework.pdf",
    bonusPdfs: [
      { name: "Architecture of Human Intent Framework (PDF)", url: "/documents/Architecture_of_Human_Intent_Framework.pdf", size: "PDF Framework" },
      { name: "The Human Broadcast (Complete E-Book)", url: "/documents/The_Human_Broadcast_Complete_Ebook.pdf", size: "Full PDF E-Book" },
      { name: "Influence Psychology — Course Resource Guide (PDF)", url: "/documents/influence-psychology.pdf", size: "10-Page PDF Guide" },
      { name: "Persuasion Techniques — Course Resource Guide (PDF)", url: "/documents/persuasion-techniques.pdf", size: "10-Page PDF Guide" },
      { name: "Communication Mastery — Course Resource Guide (PDF)", url: "/documents/communication-mastery.pdf", size: "10-Page PDF Guide" }
    ],
    rawDescription: `<h1>Stop Blending In. Start Architecting Your Influence.</h1><p>If your brand could speak right now... <em>what would it be saying?</em></p><p>Is it <strong>clear or confusing</strong>? Is it <strong>intentional or random</strong>? Is it <strong>premium or basic</strong>?</p><p>In a crowded professional landscape, talent alone is no longer enough. You can be the most skilled architect, engineer, or professional in your field, but if your structural design—your personal brand and professional strategy—is flawed, your career will inevitably stall.</p><p>You don’t have a lack of skill. You have a lack of strategic architecture.</p><p><strong>Secure Your Seat for the Upcoming Live Cohort: Saturday, September 12, 2026 (5:00 PM – 8:00 PM WAT)</strong></p><br><h2>Introducing the Concept of Human Architecture</h2><p>This is not a motivational talk filled with generic cliches. This is a <strong>structural audit</strong> for your professional life.</p><p>As an architect and frontend engineer with over a decade of experience optimizing systems and designing spaces that stand the test of time, I am bringing those exact blueprint principles to your personal capital development.</p><p>We are going to treat your reputation, your visibility, and your income potential like a high-end monument: built with precision, engineered for scale, and designed to last.</p><br><h2>What You Will Master in This 3-Hour Live Intensive</h2><p>Inside this systematic masterclass, we will deep-dive into three critical phases:</p><ul><li><strong>Phase 1: Audit Your Foundation:</strong> Identify the hidden structural flaws in your current positioning that are actively preventing you from being recognized as a premium authority.</li><li><strong>Phase 2: Refactor Your Professional 'UI/UX':</strong> Optimize how you package your skills, communicate your high ticket value, and organically attract premium clients and global networks.</li><li><strong>Phase 3: Launch Your Growth Sprint:</strong> Walk away with an actionable execution blueprint for your first 21-day "Refactor" and 21-day "Optimization" cycles so you can maintain long-term momentum.</li></ul><br><h2>Included Special Bonus PDF Guides</h2><ul><li><strong>Architecture of Human Intent Framework (PDF):</strong> Master framework on alignment, internal clarity, and strategic intent.</li><li><strong>The Human Broadcast Complete E-Book (PDF):</strong> The complete manual on presence, energy broadcasting, and strategic influence.</li></ul><br><h2>Who This Is For</h2><ul><li><strong>Professionals, Architects, and Engineers</strong> who know they are under-leveraging their potential and leaving money on the table.</li><li><strong>Corporate & Creative Experts</strong> ready to transition from being invisible, hard-working employees to highly sought-after industry assets.</li><li><strong>Anyone Tired of Guessing</strong> how to grow and ready for a predictable, engineering-based framework for personal transformation.</li></ul><br><h2>Your Limited-Time Investment</h2><p>We are opening the doors for our upcoming cohort with exclusive tiered pricing. Once slots are full, registration closes automatically to ensure a high-quality workshop experience.</p><ul><li><strong>Standard Pass:</strong> ~~₦65,000~~</li><li><strong>Live Stream Discount:</strong> <strong>₦25,000</strong></li><li><strong>Early-Bird Special:</strong> <strong>₦15,000</strong> <em>(Available for a limited time only)</em></li></ul><br><h3><strong>Event Details</strong></h3><ul><li><strong>Platform:</strong> GoogleMeet LIVE</li><li><strong>Date:</strong> Saturday, <strong>September 12, 2026</strong> (5:00 PM – 8:00 PM WAT)</li><li><strong>Host:</strong> Zeki Ubor (<em>Founder, The Becoming Institute</em>)</li></ul><br><h3><strong>The Blueprint Is Ready. Are You?</strong></h3><p>Stop leaving your professional success to chance. Start building with intention.</p><p><strong>REGISTER NOW FOR THE UPCOMING MASTERCLASS</strong>`
  },
  {
    id: 13,
    name: "Origin Classic Tee",
    category: "merch",
    price: 24.99,
    rating: 4.8,
    reviews: 95,
    icon: Shirt,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/origin_tee_mockup.png",
    description: "Premium cotton t-shirt with minimalist Origin branding",
    rawDescription: "<h3>Premium cotton t-shirt with minimalist Origin branding</h3><p>Crafted from 100% organic cotton, this classic tee combines everyday comfort with professional styling. Features a clean, embroidered Origin logo on the chest.</p>"
  },
  {
    id: 14,
    name: "Origin Ceramic Mug",
    category: "merch",
    price: 14.99,
    rating: 4.9,
    reviews: 64,
    icon: Shirt,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/origin_mug_mockup.png",
    description: "Matte black ceramic mug with engraved Origin logo",
    rawDescription: "<h3>Matte black ceramic mug with engraved Origin logo</h3><p>Start your mornings with purpose. This premium double-walled ceramic mug keeps your favorite beverage hot while maintaining a cool exterior touch.</p>"
  },
  {
    id: 15,
    name: "Origin Tote Bag",
    category: "merch",
    price: 19.99,
    rating: 4.7,
    reviews: 78,
    icon: Shirt,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/origin_tote_mockup.png",
    description: "Heavy-duty canvas tote bag for your everyday essentials",
    rawDescription: "<h3>Heavy-duty canvas tote bag for your everyday essentials</h3><p>Designed for builders and creators on the move. Crafted from premium 12oz cotton canvas, with internal pockets and reinforced stitching to securely carry your laptop, books, and journals.</p>"
  },
  {
    id: 16,
    name: "Fit-For-Profit Workshop",
    category: "courses",
    price: 8.00,
    originalPrice: 39.248,
    rating: 4.9,
    reviews: 215,
    icon: Award,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/fit_for_profit.jpg",
    description: "Prepare for profit in your career, work, ministry, and significance. Staged monthly in different states, featuring a volunteer community service arm for schools, education platforms, and local communities.",
    rawDescription: "<h1>Fit-For-Profit Workshop</h1><p><strong>Prepare for profit in your career, work, ministry, and significance.</strong></p><p>Fit-For-Profit is a monthly regional workshop designed to structurally audit and build personal and professional capacity. In a changing economy, outstanding contribution requires both commercial proficiency and deep value alignment.</p><br><h2>What You Stand to Gain After Registration</h2><ul><li><strong>Commercial & Career Capacity Audit:</strong> Position your professional assets for elite demand, eliminate structural career flaws, and command premium scale.</li><li><strong>Purpose, Ministry & Significance Alignment:</strong> Align your unique calling with highly impactful, sustainable execution structures that create lasting value.</li><li><strong>Localized Founder & Intrapreneur Network:</strong> Connect directly with regional founders, business owners, and corporate leaders across multi-state monthly sessions.</li><li><strong>Fit-For-Profit Volunteer Corps Access:</strong> Gain direct eligibility to step up and lead community service drives for schools, education platforms, and local youth initiatives.</li><li><strong>21-Day Execution Blueprint & Resources:</strong> Receive practical action guides, reflection workbooks, and follow-up tools to implement your learnings immediately.</li></ul><br><h3>Key Workshop Focus Areas</h3><ul><li><strong>Career & Work:</strong> Positioning your professional assets for elite demand and command premium scale.</li><li><strong>Ministry & Significance:</strong> Aligning your unique calling with highly impactful execution structures.</li><li><strong>Monthly Regional Targets:</strong> Staged in different states every month to build localized networks of founders and intrapreneurs.</li><li><strong>Volunteering Service Arm:</strong> Join our community service programs and volunteer for schools, education platforms, and local communities.</li></ul><br><h3>Early-Founders & Intrapreneurs Discount</h3><p>Standard Ticket: <del>₦58,872</del></p><p>Early-Founder / Early-Business Owner / Intrapreneur Ticket: <strong>₦12,000</strong></p>"
  },
  {
    id: 17,
    name: "JUMPSTART: 2-Day Live Intensive Accelerator",
    category: "courses",
    price: 10.00,
    originalPrice: 45.00,
    priceNGN: 15000,
    rating: 4.9,
    reviews: 184,
    icon: Award,
    gradient: "from-[#60a5fa]/10 to-[#60a5fa]/5",
    imageUrl: "/jumpstart_cover.png",
    description: "An intensive 2-Day Live Transformational Accelerator combining cognitive psychology, value alignment, and strategic execution blueprints to jumpstart your career, influence, and significance.",
    pdfUrl: "/documents/The_Human_Broadcast_Environment_Matrix.pdf",
    bonusPdfs: [
      { name: "The Human Broadcast: Environment Matrix (PDF)", url: "/documents/The_Human_Broadcast_Environment_Matrix.pdf", size: "PDF Matrix Guide" },
      { name: "Architecture of Intention Blueprint (PDF)", url: "/documents/architecture_of_intention.pdf", size: "PDF Blueprint" },
      { name: "Habit Building Guide — Course Resource Guide (PDF)", url: "/documents/habit-building-guide.pdf", size: "10-Page PDF Guide" },
      { name: "Communication Mastery — Course Resource Guide (PDF)", url: "/documents/communication-mastery.pdf", size: "10-Page PDF Guide" }
    ],
    rawDescription: `<h1>JUMPSTART: 2-Day Live Intensive Accelerator</h1><p><strong>Rising From Survival to the Realm of Succession</strong></p><p>Jumpstart is not just a course; it is an intensive 2-day psychological and strategic migration. It is engineered for those ready to transition from a restrictive, survival-based environment into a high-leverage realm of undeniable impact and personal mastery.</p><br><div style="background-color: rgba(96, 165, 250, 0.1); border: 1px solid rgba(96, 165, 250, 0.3); border-radius: 12px; padding: 16px; margin: 16px 0;"><h3 style="color: #60a5fa; margin-top: 0;">⚡ Early Bird Launch Special — Limited Cohort Seats</h3><p style="margin-bottom: 0;">Standard Registration: <del>₦67,500 ($45)</del> · <strong>Early Bird Access: ₦15,000 ($10)</strong></p></div><br><h3>2-Day Live Accelerator Schedule</h3><ul><li><strong>Day 1 — The Cognitive Migration (Saturday @ 5:00 PM WAT):</strong> Deep-dive into Units 1 & 2 (Perception & Usefulness). Dismantling default programming of lack and fear, re-engineering your cognitive lens to spot leverage, and converting raw potential into high-impact market utility.</li><li><strong>Day 2 — The Architecture of Execution (Sunday @ 5:00 PM WAT):</strong> Mastering Units 3, 4, 5 & 6 (Boundaries, Consent, Value, Self-Mastery). Erecting impenetrable focus perimeters, mastering high-leverage agreements, positioning your intrinsic worth for premium scale, and achieving ultimate emotional and behavioral governance.</li><li><strong>Post-Accelerator Integration:</strong> Direct access to <strong>The Becoming Institute Inner Circle Community Group</strong> for ongoing follow-up sessions, accountability check-ins, and exclusive growth blueprints.</li></ul><br><h3>The 6 Core Units of Transformation</h3><ul><li><strong>1. Perception (The Lens of Reality):</strong> Rewire your baseline to identify leverage and opportunity where others see obstacles.</li><li><strong>2. Usefulness (The Engine of Impact):</strong> Transform raw talent into deployed, high-impact utility that the marketplace cannot ignore.</li><li><strong>3. Boundaries (The Architecture of Preservation):</strong> Protect your internal ecosystem, time, and focus from external chaos.</li><li><strong>4. Consent (The Mastery of Agreement):</strong> Absolute ownership of your 'yes' and 'no' to eliminate misaligned commitments.</li><li><strong>5. Value (The Currency of Significance):</strong> Align personal standards to command premium positioning and high-yield results.</li><li><strong>6. Self-Mastery (The Ultimate Governance):</strong> Master your internal state to dictate the terms of your external reality.</li></ul><br><h3>Program Deliverables & Included Core Resources</h3><ul><li>Live Virtual Interactive Access to both Day 1 & Day 2 Accelerator Sessions.</li><li>The Human Broadcast Environment Matrix (PDF).</li><li>Architecture of Intention Blueprint (PDF).</li><li>Complete Course Resource Guides & Habit Building Blueprints (PDF).</li><li>Exclusive Invite to The Becoming Institute WhatsApp/Telegram Community Group.</li></ul>`
  },
];

export function getProductById(id: string | number): StoreProduct | null {
  const numericId = typeof id === "string" ? parseInt(id.replace("store-", "")) : id;
  return STORE_PRODUCTS.find((p) => p.id === numericId) || null;
}
