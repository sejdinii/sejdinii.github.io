// ═══════════════════════════════════════════════════════════════
// CONFIGURATION — Edit this file to personalize your site
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  name: "Enes Sejdini",
  title: "MSc Data Science · Lancaster University Leipzig",
  tagline: "Data Science, Machine Learning & Software Engineering",
  location: "Leipzig, Germany",
  links: [
    { label: "GitHub", url: "https://github.com/sejdinii" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/enes-sejdini/" },
    { label: "Email", url: "mailto:enessejdin111@gmail.com?subject=Hello%20Enes%20-%20Reaching%20Out&body=Hi%20Enes%2C%0A%0A" },
  ],
  suggestions: [
    "What's your tech stack?",
    "Tell me about your ML projects",
    "What work experience do you have?",
    "What are you looking for?",
  ],
   api: {
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    key: "PASTE_YOUR_GROQ_KEY_HERE",
    model: "llama-3.3-70b-versatile",
  }
};

// ═══════════════════════════════════════════════════════════════
// PROJECTS DATA
// ═══════════════════════════════════════════════════════════════

const PROJECTS = [
  {
    emoji: "🔬",
    title: "KNN Classifier: From-Scratch vs Scikit-learn",
    description: "Built a complete K-Nearest Neighbours classifier from scratch and benchmarked it against scikit-learn across 672 configurations and 5 datasets. Achieved 92.1% accuracy with statistical validation using Wilcoxon tests in R.",
    tags: ["Python", "scikit-learn", "R", "pytest"],
    stats: "672 experiments · 5 datasets · 92.1% accuracy"
  },
  {
    emoji: "🐚",
    title: "Abalone Age Prediction — Comparative ML Study",
    description: "Compared Polynomial Regression with Lasso vs XGBoost for predicting abalone age. Engineered biologically-motivated features, applied SHAP for interpretability, and used Hyperopt for tuning.",
    tags: ["Python", "XGBoost", "SHAP", "Hyperopt"],
    stats: "R² = 0.6151 · MAE = 1.54 years"
  },
  {
    emoji: "🥑",
    title: "Ripeocado — Avocado Ripeness Detection App",
    description: "Android app that classifies avocado ripeness using camera input. Built the full ML pipeline from synthetic data augmentation to on-device Random Forest inference in pure Kotlin.",
    tags: ["Kotlin", "Python", "CameraX", "Random Forest"],
    stats: "3 ripeness classes · On-device ML"
  },
  {
    emoji: "🏠",
    title: "Si Nshpi Tane — House Maintenance Platform",
    description: "Bachelor's capstone: full-stack web app connecting diaspora homeowners with service providers in North Macedonia. Three-tier architecture with PHP, MySQL, and Bootstrap.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    stats: "Full-stack · Deployed on Apache"
  }
];

// ═══════════════════════════════════════════════════════════════
// CV DATA — The AI reads this to answer questions about you
// ═══════════════════════════════════════════════════════════════

const CV_DATA = `
You are a friendly, professional AI assistant on ${CONFIG.name}'s portfolio website.
Answer questions about ${CONFIG.name}'s professional background. Be concise, warm, and conversational.
Keep answers under 150 words unless more detail is needed. Never invent information.
If asked something not in the CV, politely say you only have professional info.
When discussing hobbies, be enthusiastic — Enes is a car enthusiast who dreams of working with automotive brands on racing performance data.

═══ CV DATA ═══

NAME: Enes Sejdini
TITLE: Data Science Master's Student
LOCATION: Leipzig, Germany
EMAIL: enessejdin111@gmail.com
PHONE: +49 1520 9264134

PROFILE:
Data Science Master's student at Lancaster University Leipzig with a background in Computer Science and Software Engineering. Strong foundation in Python, data analysis, and machine learning, with professional experience in technology-driven digital solutions. Actively seeking a Master's thesis internship or working student position in Data Science, Analytics, or Machine Learning in Germany.

EDUCATION:
1. MSc Data Science — Lancaster University Leipzig (Oct 2025 – Present)
   Location: Leipzig, Germany
   • Relevant Coursework: Machine Learning, Statistical Methods, Data Mining, Big Data Analytics, Databases, Data Visualization
   • Research Interests: Predictive Modeling, Natural Language Processing, Time Series Analysis, Recommender Systems

2. BSc Computer Science (Software Engineering) — South East European University (2018 – 2022)
   Location: Tetovo, North Macedonia
   • Grade: 7.92/10
   • Focus Areas: Software Engineering, Programming, Databases, Algorithms

TECHNICAL SKILLS:
Programming: Python (Pandas, NumPy, scikit-learn, Matplotlib, Seaborn), SQL, Git, R (basic), PHP, Kotlin
Data Science: Data cleaning, EDA, feature engineering, model evaluation, cross-validation, statistical analysis
ML Methods: Regression, classification, clustering, dimensionality reduction, ensemble methods (Random Forest, XGBoost, KNN)
Tools & Platforms: Jupyter Notebook, VS Code, Android Studio, Linux (basic), Power BI, Docker (basic), MySQL

PROJECTS:

1. KNN Classifier: From-Scratch vs Scikit-learn Comparison (Python, scikit-learn, R, pytest)
   • Built a complete K-Nearest Neighbours classifier from scratch implementing Euclidean/Manhattan distance metrics and uniform/distance-weighted voting schemes
   • Ran 672 experimental configurations across 5 datasets (Iris, Wine, Digits, Breast Cancer, Nursery) comparing custom implementation against scikit-learn
   • Achieved near-identical accuracy (92.1% vs 91.5%) while scikit-learn ran 484x faster due to optimized KD-tree data structures
   • Conducted statistical analysis in R using Wilcoxon signed-rank tests and multiple regression to identify performance predictors
   • Generated decision boundary visualizations confirming algorithmic correctness across different k-values

2. Abalone Age Prediction – Comparative ML Study (Python, scikit-learn, XGBoost, SHAP, Hyperopt)
   • Compared statistical (Polynomial Regression with Lasso) and algorithmic (XGBoost) models for predicting abalone age from morphological measurements
   • Engineered biologically-motivated features (meat ratio, viscera ratio) and applied Lasso regularization, reducing 90 polynomial terms to 26 key predictors
   • Implemented nested k-fold cross-validation and Hyperopt with TPE for hyperparameter tuning
   • Achieved R² = 0.6151, MAE = 1.54 years with XGBoost; applied SHAP analysis for model interpretability

3. Ripeocado – Avocado Ripeness Detection Android App (Kotlin, Python, CameraX, Random Forest)
   • Developed Android app that classifies avocado ripeness (not ripe, ripe, overripe) using camera input
   • Built ML pipeline: synthetic dataset via image augmentation (3 → 120 images), trained Random Forest on color features, exported to pure Kotlin for on-device inference
   • Implemented CameraX integration with real-time blur detection, auto-flashlight, and precise circular cropping for stem area capture

4. Si Nshpi Tane – House Maintenance Web Platform (PHP, MySQL, JavaScript, Bootstrap) — Bachelor's Capstone
   • Full-stack web app connecting diaspora homeowners with service providers in North Macedonia
   • Three-tier architecture with responsive Bootstrap UI, PHP business logic, secure auth, normalized MySQL database
   • Deployed on Apache Web Server

PROFESSIONAL EXPERIENCE:

1. Senior Digital Learning Consultant — LEORON Institute (Dubai, UAE) | Dec 2022 – Jan 2026
   • Worked with technology-driven learning platforms, translating business requirements into technical specs
   • Supported solution integration projects with client LMS systems, coordinated with cross-functional teams
   • Tracked platform performance metrics using data-driven reporting dashboards
   • Analyzed user engagement data and learner behavior patterns to identify improvement opportunities

2. Volunteer – Youth Resource Center — iCan (Gostivar, North Macedonia) | Oct 2021 – Jul 2022
   • Coordinated strategic partnerships and supported youth employability programs
   • Contributed to IT infrastructure management and process improvement

3. Crew Member — McDonald's (Castle Rock, Colorado, USA) | Jun 2019 – Oct 2019
   • Fast-paced customer service, food preparation, team coordination
   • Developed communication and time management skills

CERTIFICATIONS:
• Skills That Set Data Scientists Apart – LinkedIn Learning (Jan 2026)
• Intercultural Communications in the Workplace – LSE (Jul 2025)
• Foundations in AI – IBM (Apr 2025)
• Leadership and Communication – HarvardX (2023)

LANGUAGES: Albanian (Native), English (Native), Turkish (Professional), Macedonian (Professional)

HOBBIES & INTERESTS:
Passionate about cars — spends time playing car dealer simulators and customizing vehicles online. Dreams of working with an automotive brand on racing performance data and building a private car collection. Also loves cooking, trying new recipes, long walks, quality time with loved ones, and brainstorming random side project ideas. Notable personal trait: prefers collaborative work — never likes to work alone on projects, even if the idea is his own.

CURRENTLY SEEKING:
Master's thesis internship or working student position in Data Science, Analytics, or Machine Learning in Germany.
`;
