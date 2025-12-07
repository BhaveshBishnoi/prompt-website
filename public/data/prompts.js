// scripts/generate-2000-prompts.js

const fs = require('fs');
const path = require('path');

// Comprehensive data for generating 2000+ prompts
const categories = [
  { id: 'marketing', name: 'Marketing', icon: '📈', weight: 0.18 },
  { id: 'development', name: 'Development', icon: '💻', weight: 0.16 },
  { id: 'business', name: 'Business', icon: '💼', weight: 0.14 },
  { id: 'writing', name: 'Content Writing', icon: '✍️', weight: 0.12 },
  { id: 'social', name: 'Social Media', icon: '📱', weight: 0.11 },
  { id: 'education', name: 'Education', icon: '🎓', weight: 0.09 },
  { id: 'design', name: 'Design', icon: '🎨', weight: 0.08 },
  { id: 'finance', name: 'Finance', icon: '💰', weight: 0.07 },
  { id: 'productivity', name: 'Productivity', icon: '⚡', weight: 0.05 },
];

const subcategories = {
  marketing: ['SEO', 'Email Marketing', 'Content Marketing', 'PPC', 'Social Media Ads', 'Conversion Optimization', 'Analytics', 'Brand Strategy'],
  development: ['Frontend', 'Backend', 'Mobile', 'DevOps', 'AI/ML', 'Security', 'Testing', 'APIs', 'Database'],
  business: ['Startup', 'Strategy', 'Operations', 'Sales', 'Management', 'Consulting', 'Entrepreneurship', 'Innovation'],
  writing: ['Blog Writing', 'Copywriting', 'Technical Writing', 'Creative Writing', 'Academic Writing', 'Editing', 'SEO Writing'],
  social: ['Content Strategy', 'Community Management', 'Advertising', 'Analytics', 'Influencer Marketing', 'Video Content'],
  education: ['Teaching', 'Curriculum Design', 'E-learning', 'Research', 'Assessment', 'Tutoring', 'Academic Writing'],
  design: ['UI/UX', 'Graphic Design', 'Product Design', 'Web Design', 'Brand Design', 'Motion Design', 'Illustration'],
  finance: ['Personal Finance', 'Investing', 'Accounting', 'Budgeting', 'Financial Planning', 'Tax', 'Cryptocurrency'],
  productivity: ['Time Management', 'Project Management', 'Goal Setting', 'Habit Building', 'Workflow Optimization', 'Tools'],
};

const aiModels = [
  { id: 'chatgpt-4', name: 'ChatGPT-4', weight: 0.35 },
  { id: 'gpt-3.5', name: 'GPT-3.5', weight: 0.25 },
  { id: 'claude-3', name: 'Claude-3', weight: 0.20 },
  { id: 'gemini', name: 'Gemini Pro', weight: 0.15 },
  { id: 'midjourney', name: 'Midjourney', weight: 0.03 },
  { id: 'dall-e', name: 'DALL-E 3', weight: 0.02 },
];

const difficulties = [
  { id: 'beginner', name: 'Beginner', weight: 0.40 },
  { id: 'intermediate', name: 'Intermediate', weight: 0.45 },
  { id: 'advanced', name: 'Advanced', weight: 0.15 },
];

const timeOptions = ['2 minutes', '3 minutes', '5 minutes', '8 minutes', '10 minutes', '12 minutes', '15 minutes'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean'];

const authors = [
  { id: 'creator_101', name: 'Sarah Johnson', expertise: ['marketing', 'writing'] },
  { id: 'creator_205', name: 'Michael Chen', expertise: ['development', 'productivity'] },
  { id: 'creator_312', name: 'David Kumar', expertise: ['business', 'finance'] },
  { id: 'creator_118', name: 'Emma Wilson', expertise: ['marketing', 'social'] },
  { id: 'creator_229', name: 'Alex Rivera', expertise: ['development', 'education'] },
  { id: 'creator_154', name: 'Lisa Thompson', expertise: ['social', 'writing'] },
  { id: 'creator_267', name: 'Dr. James Wilson', expertise: ['education', 'writing'] },
  { id: 'creator_333', name: 'Maria Garcia', expertise: ['marketing', 'business'] },
  { id: 'creator_421', name: 'Robert Kim', expertise: ['design', 'development'] },
  { id: 'creator_188', name: 'Sophie Williams', expertise: ['finance', 'productivity'] },
  { id: 'creator_456', name: 'Thomas Brown', expertise: ['business', 'development'] },
  { id: 'creator_512', name: 'Jennifer Lee', expertise: ['design', 'writing'] },
  { id: 'creator_623', name: 'William Davis', expertise: ['education', 'productivity'] },
  { id: 'creator_734', name: 'Amanda Clark', expertise: ['social', 'marketing'] },
  { id: 'creator_845', name: 'Christopher Hall', expertise: ['development', 'finance'] },
];

// Prompt templates for each category
const promptTemplates = {
  marketing: [
    "Create a comprehensive {subcategory} strategy for {business_type} targeting {audience} with {goal}",
    "Write {number} {content_type} for {platform} about {topic} focusing on {metric} improvement",
    "Develop a {timeframe} marketing campaign for {product} with {budget} budget and {kpi} targets",
    "Analyze competitor strategies in {industry} and provide {number} actionable recommendations",
    "Generate {type} marketing copy for {product} that addresses {pain_point} and highlights {benefit}",
  ],
  development: [
    "Write a {language} function to {task} with {feature} support and {error_handling}",
    "Create a {framework} application for {purpose} with {database} and {api} integration",
    "Review this {language} code for {issue} and suggest {number} optimization improvements",
    "Design a {system_type} architecture for {application} with {scale} scalability requirements",
    "Implement {feature} using {technology} with {security} considerations and {testing} coverage",
  ],
  business: [
    "Develop a business model canvas for {business_idea} in {industry} targeting {market}",
    "Create a financial projection model for {company} with {timeframe} outlook and {scenario} analysis",
    "Write an investor pitch deck for {product} seeking {amount} funding for {use_case}",
    "Analyze market opportunities in {region} for {industry} and identify {number} key segments",
    "Develop a SWOT analysis for {company} with {number} strategic recommendations for {goal}",
  ],
  writing: [
    "Write a {length} {type} article about {topic} for {audience} with {tone} tone",
    "Create {number} {content_type} pieces for {platform} focusing on {keyword} optimization",
    "Develop a content strategy for {brand} with {frequency} posting schedule and {theme} themes",
    "Edit this {type} content for {purpose} improving {aspect} and fixing {issue}",
    "Generate {number} headline variations for {topic} with {style} style and {goal} focus",
  ],
  social: [
    "Create a {platform} content calendar for {brand} with {frequency} posts and {theme} focus",
    "Develop a social media strategy for {product} targeting {audience} with {budget} budget",
    "Write {number} {post_type} for {platform} about {topic} with {hashtag} strategy",
    "Analyze {brand} social media performance and provide {number} improvement recommendations",
    "Create a community management plan for {platform} with {engagement} goals and {moderation} rules",
  ],
  education: [
    "Design a {subject} curriculum for {grade_level} with {duration} duration and {assessment} methods",
    "Create {number} lesson plans for {topic} with {activities} and {materials} requirements",
    "Develop an e-learning course for {skill} with {modules} modules and {interaction} elements",
    "Write a research paper about {topic} with {methodology} and {analysis} framework",
    "Create assessment tools for {subject} with {question_types} and {scoring} rubric",
  ],
  design: [
    "Design a {type} interface for {application} with {user} needs and {brand} guidelines",
    "Create {number} {design_type} concepts for {brand} with {style} style and {purpose}",
    "Develop a design system for {product} with {components} and {documentation}",
    "Review this {design_type} for {issues} and provide {number} improvement suggestions",
    "Create user flows for {feature} with {steps} steps and {decision_points}",
  ],
  finance: [
    "Create a personal finance plan for {income_level} income with {goals} and {timeline}",
    "Develop investment strategy for {risk_profile} risk tolerance with {amount} capital",
    "Analyze {company} financial statements and provide {number} investment recommendations",
    "Create budget template for {situation} with {categories} and {tracking} system",
    "Develop retirement plan for {age} with {income_needs} and {savings_rate}",
  ],
  productivity: [
    "Create a time management system for {role} with {tasks} and {priorities}",
    "Develop project management plan for {project_type} with {team_size} team",
    "Design workflow for {process} with {automation} and {efficiency} improvements",
    "Create goal setting framework for {timeframe} with {metrics} and {accountability}",
    "Develop habit building system for {habit} with {duration} and {tracking}",
  ],
};

const businessTypes = ['SaaS', 'E-commerce', 'Agency', 'Consulting', 'Product', 'Service', 'Marketplace'];
const audiences = ['B2B', 'B2C', 'Enterprise', 'SMB', 'Startups', 'Consumers', 'Developers', 'Marketers'];
const platforms = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest'];
const industries = ['Tech', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Real Estate'];

function getWeightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item;
  }
  
  return items[items.length - 1];
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

function generateTags(category, subcategory) {
  const baseTags = [category, subcategory];
  const additionalTags = [];
  
  // Add 2-4 additional relevant tags
  const tagCount = getRandomInt(2, 4);
  const allTags = [...subcategories[category]];
  
  for (let i = 0; i < tagCount; i++) {
    const tag = getRandomElement(allTags.filter(t => t !== subcategory));
    if (tag && !additionalTags.includes(tag)) {
      additionalTags.push(tag);
    }
  }
  
  return [...baseTags, ...additionalTags];
}

function generatePromptContent(category, subcategory) {
  const template = getRandomElement(promptTemplates[category]);
  
  const variables = {
    subcategory: subcategory.toLowerCase(),
    business_type: getRandomElement(businessTypes),
    audience: getRandomElement(audiences),
    goal: getRandomElement(['conversion', 'awareness', 'engagement', 'retention']),
    number: getRandomInt(3, 10),
    content_type: getRandomElement(['posts', 'emails', 'articles', 'ads']),
    platform: getRandomElement(platforms),
    topic: getRandomElement(['AI', 'technology', 'business', 'marketing', 'development']),
    metric: getRandomElement(['CTR', 'conversion rate', 'engagement', 'ROI']),
    timeframe: getRandomElement(['30-day', '90-day', 'quarterly', 'annual']),
    product: getRandomElement(['product', 'service', 'software', 'app']),
    budget: `$${getRandomInt(1000, 50000)}`,
    kpi: getRandomElement(['KPIs', 'metrics', 'targets', 'goals']),
    industry: getRandomElement(industries),
    type: getRandomElement(['persuasive', 'descriptive', 'technical', 'creative']),
    pain_point: getRandomElement(['problem', 'challenge', 'issue', 'need']),
    benefit: getRandomElement(['benefit', 'advantage', 'feature', 'value']),
    language: getRandomElement(['JavaScript', 'Python', 'TypeScript', 'Java', 'Go']),
    task: getRandomElement(['process data', 'handle requests', 'validate input', 'generate output']),
    feature: getRandomElement(['error handling', 'logging', 'caching', 'validation']),
    error_handling: getRandomElement(['try-catch blocks', 'error boundaries', 'fallback mechanisms']),
    framework: getRandomElement(['React', 'Vue', 'Angular', 'Next.js', 'Express']),
    purpose: getRandomElement(['management', 'tracking', 'analysis', 'automation']),
    database: getRandomElement(['MongoDB', 'PostgreSQL', 'MySQL', 'Redis']),
    api: getRandomElement(['REST', 'GraphQL', 'WebSocket', 'gRPC']),
    issue: getRandomElement(['performance', 'security', 'readability', 'maintainability']),
    system_type: getRandomElement(['microservices', 'monolithic', 'serverless', 'event-driven']),
    application: getRandomElement(['e-commerce', 'social media', 'analytics', 'dashboard']),
    scale: getRandomElement(['high', 'medium', 'low']),
    technology: getRandomElement(['blockchain', 'AI', 'IoT', 'cloud']),
    security: getRandomElement(['encryption', 'authentication', 'authorization']),
    testing: getRandomElement(['unit tests', 'integration tests', 'E2E tests']),
    business_idea: getRandomElement(['AI tool', 'marketplace', 'SaaS product', 'mobile app']),
    market: getRandomElement(['global', 'local', 'niche', 'enterprise']),
    company: getRandomElement(['startup', 'SMB', 'enterprise', 'agency']),
    scenario: getRandomElement(['best case', 'worst case', 'base case']),
    amount: `$${getRandomInt(50000, 5000000)}`,
    use_case: getRandomElement(['development', 'marketing', 'expansion', 'research']),
    region: getRandomElement(['North America', 'Europe', 'Asia', 'Global']),
    length: getRandomElement(['1000-word', '2000-word', 'comprehensive', 'brief']),
    tone: getRandomElement(['professional', 'casual', 'authoritative', 'conversational']),
    brand: getRandomElement(['tech brand', 'lifestyle brand', 'B2B company']),
    frequency: getRandomElement(['daily', 'weekly', 'bi-weekly', 'monthly']),
    theme: getRandomElement(['innovation', 'sustainability', 'growth', 'community']),
    post_type: getRandomElement(['carousel', 'video', 'story', 'reel']),
    hashtag: getRandomElement(['branded', 'industry', 'trending', 'community']),
    engagement: getRandomElement(['comments', 'shares', 'likes', 'saves']),
    moderation: getRandomElement(['automated', 'manual', 'community-led']),
    subject: getRandomElement(['mathematics', 'science', 'history', 'literature']),
    grade_level: getRandomElement(['elementary', 'middle school', 'high school', 'college']),
    duration: getRandomElement(['semester', 'year', '6-week', '8-week']),
    assessment: getRandomElement(['quizzes', 'projects', 'exams', 'presentations']),
    skill: getRandomElement(['programming', 'design', 'writing', 'marketing']),
    modules: getRandomInt(4, 12),
    interaction: getRandomElement(['quizzes', 'discussions', 'assignments', 'projects']),
    methodology: getRandomElement(['qualitative', 'quantitative', 'mixed methods']),
    analysis: getRandomElement(['statistical', 'thematic', 'content', 'discourse']),
    question_types: getRandomElement(['multiple choice', 'essay', 'short answer', 'practical']),
    scoring: getRandomElement(['analytic', 'holistic', 'rubric-based']),
    user: getRandomElement(['beginner', 'intermediate', 'expert', 'general']),
    style: getRandomElement(['minimalist', 'bold', 'elegant', 'playful']),
    components: getRandomInt(10, 50),
    documentation: getRandomElement(['comprehensive', 'basic', 'interactive']),
    steps: getRandomInt(3, 10),
    decision_points: getRandomInt(1, 5),
    income_level: getRandomElement(['low', 'medium', 'high', 'various']),
    risk_profile: getRandomElement(['conservative', 'moderate', 'aggressive']),
    capital: `$${getRandomInt(1000, 100000)}`,
    situation: getRandomElement(['single', 'married', 'family', 'student']),
    categories: getRandomInt(5, 15),
    tracking: getRandomElement(['manual', 'automatic', 'app-based']),
    age: getRandomInt(25, 65),
    income_needs: `$${getRandomInt(3000, 10000)}/month`,
    savings_rate: `${getRandomInt(10, 50)}%`,
    role: getRandomElement(['manager', 'developer', 'freelancer', 'student']),
    tasks: getRandomInt(5, 20),
    priorities: getRandomElement(['urgent', 'important', 'long-term']),
    project_type: getRandomElement(['software', 'marketing', 'research', 'event']),
    team_size: getRandomInt(2, 20),
    process: getRandomElement(['content creation', 'development', 'customer support']),
    automation: getRandomElement(['partial', 'full', 'none']),
    efficiency: getRandomElement(['time', 'cost', 'quality']),
    timeframe: getRandomElement(['weekly', 'monthly', 'quarterly', 'annual']),
    metrics: getRandomElement(['SMART', 'OKR', 'KPI']),
    accountability: getRandomElement(['self', 'partner', 'team', 'coach']),
    habit: getRandomElement(['exercise', 'reading', 'coding', 'meditation']),
  };

  // Fill template with variables
  let content = template;
  for (const [key, value] of Object.entries(variables)) {
    content = content.replace(new RegExp(`{${key}}`, 'g'), value);
  }

  // Generate detailed content structure
  const sections = [
    "## Overview",
    "## Requirements",
    "## Step-by-Step Instructions",
    "## Examples",
    "## Best Practices",
    "## Common Mistakes to Avoid",
    "## Additional Resources",
    "## FAQ",
  ];

  const detailedContent = sections.map(section => {
    return `${section}\n\n[Provide detailed content for this section based on the prompt requirements]`;
  }).join('\n\n');

  return `${content}\n\n${detailedContent}`;
}

function generatePrompt(id) {
  const category = getWeightedRandom(categories);
  const subcategory = getRandomElement(subcategories[category.id]);
  const aiModel = getWeightedRandom(aiModels);
  const difficulty = getWeightedRandom(difficulties);
  const author = getRandomElement(authors.filter(a => a.expertise.includes(category.id)));
  
  const isFree = Math.random() > 0.6; // 40% premium
  const isFeatured = Math.random() > 0.85; // 15% featured
  const isVerified = Math.random() > 0.3; // 70% verified
  
  const rating = 4 + Math.random() * 0.9; // 4.0 - 4.9
  const downloads = getRandomInt(100, 25000);
  const views = downloads * getRandomInt(2, 4);
  const price = isFree ? 0 : getRandomInt(5, 50);
  const reviews = Math.floor(downloads * 0.03); // 3% leave reviews
  
  const titleWords = [
    'Complete', 'Advanced', 'Professional', 'Ultimate', 'Comprehensive',
    'Expert', 'Master', 'Pro', 'Essential', 'Complete Guide to',
    'Step-by-Step', 'Practical', 'Effective', 'Powerful', 'Innovative'
  ];
  
  const actionWords = {
    marketing: ['Strategy', 'Plan', 'Campaign', 'Framework', 'Guide', 'System', 'Template'],
    development: ['Code', 'Script', 'Application', 'System', 'Architecture', 'Solution', 'Tool'],
    business: ['Plan', 'Strategy', 'Model', 'Framework', 'Analysis', 'Report', 'Proposal'],
    writing: ['Guide', 'Template', 'Framework', 'System', 'Strategy', 'Workflow'],
    social: ['Strategy', 'Calendar', 'Plan', 'Campaign', 'Framework', 'Guide'],
    education: ['Curriculum', 'Lesson Plan', 'Course', 'Guide', 'Framework', 'System'],
    design: ['Design', 'System', 'Template', 'Guide', 'Framework', 'Mockup'],
    finance: ['Plan', 'Strategy', 'Model', 'Template', 'Guide', 'Framework'],
    productivity: ['System', 'Framework', 'Plan', 'Template', 'Guide', 'Workflow'],
  };
  
  const titlePrefix = getRandomElement(titleWords);
  const titleAction = getRandomElement(actionWords[category.id]);
  const title = `${titlePrefix} ${subcategory} ${titleAction}`;
  
  const descriptionAdjectives = ['comprehensive', 'powerful', 'effective', 'innovative', 'professional'];
  const descriptionVerbs = ['create', 'generate', 'develop', 'build', 'design', 'write'];
  const descriptionNouns = ['solution', 'template', 'guide', 'system', 'framework', 'strategy'];
  
  const description = `${
    getRandomElement(descriptionAdjectives)
  } ${subcategory.toLowerCase()} prompt to ${
    getRandomElement(descriptionVerbs)
  } ${getRandomElement(descriptionNouns)} for ${
    getRandomElement(['businesses', 'developers', 'creators', 'professionals', 'teams'])
  }. ${getRandomInt(20, 40)}% more effective than standard prompts.`;
  
  const createdAt = getRandomDate(new Date(2023, 0, 1), new Date(2024, 2, 31));
  const updatedAt = getRandomDate(new Date(createdAt), new Date(2024, 2, 31));
  
  return {
    id: id.toString(),
    title,
    description,
    category: category.id,
    content: generatePromptContent(category.id, subcategory),
    previewContent: generatePromptContent(category.id, subcategory).substring(0, 200) + '...',
    author: author.name,
    authorId: author.id,
    rating: parseFloat(rating.toFixed(1)),
    downloads,
    views,
    price,
    isFree,
    tags: generateTags(category.id, subcategory),
    verified: isVerified,
    createdAt,
    updatedAt,
    aiModel: aiModel.name,
    language: getRandomElement(languages),
    difficulty: difficulty.name,
    timeToComplete: getRandomElement(timeOptions),
    featured: isFeatured,
    premium: !isFree,
    reviews,
    revenue: price * downloads,
    salesCount: isFree ? 0 : downloads,
    status: 'published',
    categorySlug: category.id,
    slug: generateSlug(title),
    thumbnail: `https://picsum.photos/seed/prompt${id}/400/300`,
    images: Array.from({ length: getRandomInt(1, 4) }, (_, i) => 
      `https://picsum.photos/seed/prompt${id}-${i}/800/600`
    ),
    demoUrl: Math.random() > 0.7 ? `https://demo.example.com/prompt${id}` : undefined,
  };
}

// Generate 2000 prompts
console.log('Generating 2000 prompts...');
const prompts = [];

for (let i = 1; i <= 2000; i++) {
  prompts.push(generatePrompt(i));
  
  if (i % 100 === 0) {
    console.log(`Generated ${i} prompts...`);
  }
}

// Write to file
const outputPath = path.join(__dirname, '../data/prompts.json');
fs.writeFileSync(outputPath, JSON.stringify(prompts, null, 2));

console.log(`✅ Successfully generated ${prompts.length} prompts!`);
console.log(`📁 Saved to: ${outputPath}`);

// Generate statistics
const stats = {
  totalPrompts: prompts.length,
  byCategory: {},
  byPrice: {
    free: prompts.filter(p => p.isFree).length,
    premium: prompts.filter(p => !p.isFree).length,
  },
  byDifficulty: {},
  byModel: {},
  totalDownloads: prompts.reduce((sum, p) => sum + p.downloads, 0),
  totalRevenue: prompts.reduce((sum, p) => sum + p.revenue, 0),
  featuredCount: prompts.filter(p => p.featured).length,
  verifiedCount: prompts.filter(p => p.verified).length,
};

prompts.forEach(prompt => {
  stats.byCategory[prompt.category] = (stats.byCategory[prompt.category] || 0) + 1;
  stats.byDifficulty[prompt.difficulty] = (stats.byDifficulty[prompt.difficulty] || 0) + 1;
  stats.byModel[prompt.aiModel] = (stats.byModel[prompt.aiModel] || 0) + 1;
});

console.log('\n📊 Generation Statistics:');
console.log(JSON.stringify(stats, null, 2));
