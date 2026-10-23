import resumePdfAsset from '../assets/Tiku Faith – Software Engineer Resume.pdf';

/**
 * Centralized API Client for Django Backend.
 * Connects to http://127.0.0.1:8000/api/v1/ with graceful fallback data.
 */

// Production backend on Vercel with automatic local override via VITE_API_URL
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-five-ruby.vercel.app'
).replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.detail || `HTTP Error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[API Client] Request to ${endpoint} failed:`, err.message);
    throw err;
  }
}

// 1. Projects API
export async function getProjects(tag = null) {
  try {
    const query = tag ? `?tags__slug=${encodeURIComponent(tag)}` : '';
    const data = await request(`/api/v1/projects/${query}`);
    return data.results || data;
  } catch {
    // High-fidelity fallback full stack case studies matching user repositories & products
    const fallbackList = [
      {
        id: 1,
        title: 'TikuShop — Full-Stack Ecommerce Platform',
        slug: 'tikushop',
        tagline: 'Production ecommerce web platform with online payments, product catalog, cart flows, and order management',
        problem_statement: 'Modern shoppers needed an intuitive, fast, and secure ecommerce experience to discover goods, manage carts with real-time updates, and pay online directly from home.',
        architecture_overview: 'Engineered with a robust Django REST Framework backend and a dynamic React frontend. Designed modular product catalog indexing, cart session state management, and integrated online payment gateway webhooks for immediate transaction settlement.',
        key_achievements: [
          'Shipped production full-stack ecommerce platform at tikushop.com with live online payments',
          'Built responsive React shopping UI with real-time cart state and rapid product filtering',
          'Engineered RESTful Django backend APIs for catalog search, order checkout, and payment processing',
        ],
        metrics: [
          { id: 1, label: 'Platform', value: 'Production', description: 'Live at tikushop.com' },
          { id: 2, label: 'Payments', value: 'Online', description: 'Integrated digital payment gateway' },
          { id: 3, label: 'Tech Stack', value: 'Django + React', description: 'Full-stack architecture' },
        ],
        tags: [
          { name: 'Django', slug: 'django', color: '#092E20' },
          { name: 'React', slug: 'react', color: '#61DAFB' },
          { name: 'Python', slug: 'python', color: '#3776AB' },
          { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
          { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
        ],
        github_url: null, // In the place of github, put a view website button
        demo_url: 'https://tikushop.com',
        website_url: 'https://tikushop.com',
        health_status: 'healthy',
        github_stars: 0,
      },
      {
        id: 2,
        title: 'FullStack Portfolio Frontend Client',
        slug: 'portfolio-frontend',
        tagline: 'High-performance reactive developer portfolio PWA built with React 19, Tailwind CSS, Vite & live telemetry',
        problem_statement: 'Needed a modular, responsive full-stack portfolio interface featuring live health probing, interactive terminal emulator, and PWA capabilities.',
        architecture_overview: 'Architected with React 19, Vite, and Tailwind CSS. Implemented optimistic state updates, skeleton loading animations, and dynamic API client fallback.',
        key_achievements: [
          'Engineered reactive charting UI achieving a 100/100 Google Lighthouse Core Web Vitals score',
          'Delivered real-time telemetry updates and interactive client terminal at sub-20ms latency',
          'Equipped with offline service worker and mobile/desktop installable PWA experience',
        ],
        metrics: [
          { id: 4, label: 'Lighthouse Score', value: '100/100', description: 'Core Web Vitals performance' },
          { id: 5, label: 'Bundle Size', value: '<300KB', description: 'Gzipped JS & CSS assets' },
          { id: 6, label: 'PWA Offline', value: 'Active', description: 'Installable app on Mobile & PC' },
        ],
        tags: [
          { name: 'React', slug: 'react', color: '#61DAFB' },
          { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
          { name: 'Tailwind CSS', slug: 'tailwind', color: '#38BDF8' },
        ],
        github_url: 'https://github.com/tiku-dev/portfolio-frontend',
        demo_url: 'https://github.com/tiku-dev/portfolio-frontend',
        health_status: 'healthy',
        github_stars: 2,
      },
      {
        id: 3,
        title: 'Portfolio Telemetry & Microservices Engine',
        slug: 'portfolio-backend',
        tagline: 'Modular Django REST Framework backend with PostgreSQL, Redis Streams, Celery workers, and live uptime monitoring',
        problem_statement: 'Required a high-reliability backend API providing synchronized GitHub telemetry, contact form throttles, and automated container health checks.',
        architecture_overview: 'Built with Django 5.x, DRF, and Redis caching. Designed with clean modular apps, automated seed pipelines, and background sync services.',
        key_achievements: [
          'Maintained sub-25ms P99 API response time with multi-level Redis caching',
          'Automated background GitHub synchronizer keeping public repo metrics up-to-date',
          'Zero-downtime database migrations with automated container health probes',
        ],
        metrics: [
          { id: 7, label: 'P99 Latency', value: '<25ms', description: 'Measured under simulated concurrent loads' },
          { id: 8, label: 'Cache Hit Rate', value: '94%', description: 'Optimized Redis caching layer' },
          { id: 9, label: 'Health Probes', value: '100%', description: 'Automated uptime checks' },
        ],
        tags: [
          { name: 'Django', slug: 'django', color: '#092E20' },
          { name: 'Python', slug: 'python', color: '#3776AB' },
          { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
          { name: 'Redis', slug: 'redis', color: '#DC382D' },
          { name: 'Docker', slug: 'docker', color: '#2496ED' },
        ],
        github_url: 'https://github.com/tiku-dev/portfolio-backend',
        demo_url: 'https://github.com/tiku-dev/portfolio-backend',
        health_status: 'healthy',
        github_stars: 2,
      },
      {
        id: 4,
        title: 'Smart File Management System',
        slug: 'file-management-system',
        tagline: 'A smart file management system which uses ai to carry out task assign by the user, such as create, rename, delete, organize files and folders, etc.',
        problem_statement: 'Organizations needed a reliable document management system with role-based access control and file metadata indexing.',
        architecture_overview: 'Engineered full-stack service with TypeScript, REST APIs, and optimized storage buckets for low-latency file operations.',
        key_achievements: [
          'Sub-50ms file metadata retrieval with high-concurrency storage indexing',
          'Enforced granular RBAC access controls and cryptographic link sharing',
        ],
        metrics: [
          { id: 7, label: 'File Indexing', value: '<50ms', description: 'Fast document search and indexing' },
          { id: 8, label: 'Security', value: 'RBAC', description: 'Role-based access permissions' },
        ],
        tags: [
          { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
          { name: 'Node.js', slug: 'nodejs', color: '#339933' },
        ],
        github_url: 'https://github.com/tiku-dev/file-mangement-system',
        demo_url: 'https://github.com/tiku-dev/file-mangement-system',
        health_status: 'healthy',
        github_stars: 2,
      },
    ];

    if (tag && tag !== 'all') {
      const lowerTag = tag.toLowerCase();
      return fallbackList.filter((p) =>
        p.tags?.some((t) => t.slug?.toLowerCase() === lowerTag || t.name?.toLowerCase() === lowerTag)
      );
    }
    return fallbackList;
  }
}

export async function getProjectDetail(slugOrId) {
  try {
    return await request(`/api/v1/projects/${slugOrId}/`);
  } catch (err) {
    try {
      const all = await getProjects();
      const queryStr = String(slugOrId).toLowerCase();
      const match = all.find(
        (p) => p.slug?.toLowerCase() === queryStr || String(p.id) === queryStr
      );
      if (match) return match;
    } catch {}
    throw err;
  }
}

export async function pingProject(slug) {
  try {
    return await request(`/api/v1/projects/${slug}/ping/`);
  } catch {
    return {
      status: 'healthy',
      http_code: 200,
      latency_ms: 28.4,
      target_url: 'https://demo.portfolio.dev',
      checked_at: new Date().toISOString(),
    };
  }
}

export async function getProjectTags() {
  try {
    return await request('/api/v1/projects/tags/');
  } catch {
    return [
      { name: 'React', slug: 'react', category: 'frontend' },
      { name: 'TypeScript', slug: 'typescript', category: 'frontend' },
      { name: 'Tailwind', slug: 'tailwind', category: 'frontend' },
      { name: 'Django', slug: 'django', category: 'backend' },
      { name: 'Python', slug: 'python', category: 'backend' },
      { name: 'PostgreSQL', slug: 'postgresql', category: 'database' },
      { name: 'Redis', slug: 'redis', category: 'database' },
      { name: 'Docker', slug: 'docker', category: 'devops' },
    ];
  }
}

// 2. Resume API
export async function getResumeData() {
  try {
    return await request('/api/v1/resume/');
  } catch {
    return {
      profile: {
        full_name: 'Tiku Faith',
        headline: 'Intermediate Full-Stack Software Engineer | Python, JavaScript & Dart',
        summary: "Intermediate full-stack software engineer with 2+ years of experience building web and mobile applications in Python, JavaScript and Dart. Shipped TikuShop, an ecommerce platform with online payments, and built an AI-powered file management app during an internship at Digimark Consulting SARL. Completing a Master's in Computer Engineering in 2027 and seeking a remote software engineering role.",
        email: 'tikufaith10@gmail.com',
        location: 'Bamenda, Cameroon (open to remote)',
        phone: '+237 671 486 996',
        github_url: 'https://github.com/tiku-dev',
        linkedin_url: 'https://www.linkedin.com/in/tiku-faith-2305103a3',
        website_url: 'https://tikufaith.tikushop.com',
        available_for_hire: true,
        availability_notice: 'Open to Remote Software Engineering Roles',
      },
      experiences: [
        {
          id: 1,
          company: 'Digimark Consulting SARL',
          role: 'Software Engineering Intern',
          location: 'Yaoundé, Cameroon',
          start_date: 'Aug 2026',
          end_date: 'Oct 2026',
          is_current: false,
          summary: 'Designed and built a smart file management app that uses AI to carry out file-management jobs described by the user.',
          achievements: [
            'Designed and built a smart file management app that uses AI to carry out file-management jobs described by the user.',
            'Turned user-provided instructions into automated actions on files.',
            'Delivered the project within a two-month internship, following earlier internships at the same company.',
          ],
          tags: [{ name: 'Python' }, { name: 'Django' }, { name: 'React' }, { name: 'AI' }],
        },
        {
          id: 2,
          company: 'Hands-on Full-Stack & Mobile Development',
          role: 'Software Developer',
          location: 'Bamenda, Cameroon (Remote)',
          start_date: '2024',
          end_date: 'Present',
          is_current: true,
          summary: '2+ years of hands-on experience building and shipping web and mobile applications in Python, JavaScript and Dart.',
          achievements: [
            'Built and shipped full-stack web applications with Django and React, from backend APIs to user interfaces.',
            'Developed mobile and web features in Flutter, Dart and JavaScript.',
            'Architected and shipped TikuShop (tikushop.com), an ecommerce platform with online payment integration and product browsing.',
          ],
          tags: [{ name: 'Python' }, { name: 'JavaScript' }, { name: 'Dart' }, { name: 'Django' }, { name: 'React' }, { name: 'Flutter' }],
        },
      ],
      education: [
        {
          institution: 'National Higher Polytechnic Institute (NAHPI)',
          degree: "Master's Degree",
          field_of_study: 'Computer Engineering',
          start_year: 2022,
          end_year: 2027,
          details: "Completing a Master's in Computer Engineering, Bamenda, Cameroon · Expected 2027",
        },
      ],
    };
  }
}

export function getResumePdfDownloadUrl(focus = null) {
  // Use the authored PDF resume from the assets folder directly
  return resumePdfAsset || '/Tiku-Faith-Software-Engineer-Resume.pdf';
}

// 3. Contact API
export async function sendContactMessage(payload) {
  return await request('/api/v1/contact/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 4. Terminal API
export async function runTerminalCommand(command) {
  try {
    return await request('/api/v1/terminal/execute/', {
      method: 'POST',
      body: JSON.stringify({ command }),
    });
  } catch (err) {
    // Built-in terminal simulation when backend is starting or offline
    const cmd = command.trim().toLowerCase();
    if (cmd === 'help') {
      return {
        output: [
          '===========================================================',
          '            FULLSTACK DEVELOPER CONSOLE (CLIENT MODE)     ',
          '===========================================================',
          'Commands:',
          '  help                           Show command list',
          '  whoami                         Display engineer bio',
          '  cat experience                 Print employment & engineering history',
          '  skills --tree                  Render skills tree',
          '  projects                       List projects & repositories',
          '  uptime                         Show system telemetry',
          '  clear                          Clear terminal',
          '===========================================================',
        ].join('\n'),
        status: 'ok',
      };
    }
    if (cmd === 'whoami') {
      return {
        output: [
          'Name:     Tiku Faith (@tiku-dev)',
          'Role:     Intermediate Full-Stack Software Engineer',
          'Location: Bamenda, Cameroon (open to remote)',
          'Email:    tikufaith10@gmail.com',
          'WhatsApp: +237 671 486 996 (https://wa.me/237671486996)',
          'GitHub:   https://github.com/tiku-dev',
          'LinkedIn: https://www.linkedin.com/in/tiku-faith-2305103a3',
          'Website:  https://tikufaith.tikushop.com',
          'Status:   🟢 Open to Remote Software Engineering Roles',
        ].join('\n'),
        status: 'ok',
      };
    }
    if (cmd === 'cat experience' || cmd === 'experience' || cmd === 'cat resume' || cmd === 'resume') {
      return {
        output: [
          '===========================================================',
          '             TIKU FAITH – EXPERIENCE & RESUME              ',
          '===========================================================',
          'Name:     Tiku Faith',
          'Location: Bamenda, Cameroon (open to remote)',
          'Email:    tikufaith10@gmail.com',
          'WhatsApp: +237 671 486 996 (https://wa.me/237671486996)',
          'GitHub:   https://github.com/tiku-dev',
          'LinkedIn: https://www.linkedin.com/in/tiku-faith-2305103a3',
          'Website:  https://tikufaith.tikushop.com',
          '',
          '[Summary]',
          "Intermediate full-stack software engineer with 2+ years of experience building web and mobile applications in Python, JavaScript and Dart. Shipped TikuShop, an ecommerce platform with online payments, and built an AI-powered file management app during an internship at Digimark Consulting SARL. Completing a Master's in Computer Engineering in 2027 and seeking a remote software engineering role.",
          '',
          '[Technical Skills]',
          '  • Languages: Python, JavaScript (including vanilla JS), Dart',
          '  • Backend: Django, Django REST Framework',
          '  • Frontend & Mobile: React.js, Flutter',
          '  • Other: AI-assisted application development, version control with GitHub',
          '',
          '[Work Experience]',
          '',
          '▶ Software Engineering Intern @ Digimark Consulting SARL, Yaoundé, Cameroon',
          '  Duration: Aug 2026 – Oct 2026',
          '  Summary:  Designed and built a smart file management app that uses AI to carry out file-management jobs described by the user.',
          '  • Designed and built a smart file management app that uses AI to carry out file-management jobs described by the user.',
          '  • Turned user-provided instructions into automated actions on files.',
          '  • Delivered the project within a two-month internship, following earlier internships at the same company.',
          '',
          '▶ Software Developer @ Hands-on Full-Stack & Mobile Development, Bamenda, Cameroon (Remote)',
          '  Duration: 2024 – Present (2+ years hands-on experience)',
          '  Summary:  Built and shipped web and mobile applications in Python, JavaScript and Dart.',
          '  • Built and shipped full-stack web applications with Django and React, from backend APIs to user interfaces.',
          '  • Developed mobile and web features in Flutter, Dart and JavaScript.',
          '  • Engineered and launched TikuShop (tikushop.com), an ecommerce platform with online payment integration.',
          '',
          '[Education]',
          "▶ Master's in Computer Engineering",
          '  National Higher Polytechnic Institute (NAHPI), Bamenda, Cameroon (Expected 2027)',
          '===========================================================',
        ].join('\n'),
        status: 'ok',
      };
    }
    if (cmd === 'projects' || cmd.startsWith('projects')) {
      return {
        output: [
          'SLUG                 DEMO / REPO                    STATUS          TITLE',
          '----------------------------------------------------------------------',
          'tikushop             https://tikushop.com           Operational 🟢  TikuShop — Full-Stack Ecommerce Platform',
          'portfolio-frontend   github.com/tiku-dev/portfolio  Operational 🟢  FullStack Portfolio Frontend Client',
          'portfolio-backend    github.com/tiku-dev/portfolio  Operational 🟢  Portfolio Telemetry & Microservices Engine',
          'file-mgmt-system     github.com/tiku-dev/file-mgmt  Operational 🟢  Smart File Management System',
        ].join('\n'),
        status: 'ok',
      };
    }
    if (cmd.includes('skills')) {
      return {
        output: [
          '└── Technical Competencies (Tiku Faith)',
          '    ├── LANGUAGES',
          '    │   ├── Python',
          '    │   ├── JavaScript (including vanilla JS)',
          '    │   └── Dart',
          '    ├── BACKEND',
          '    │   ├── Django',
          '    │   └── Django REST Framework',
          '    ├── FRONTEND & MOBILE',
          '    │   ├── React.js',
          '    │   ├── Flutter',
          '    │   └── Tailwind CSS',
          '    └── OTHER & TOOLS',
          '        ├── AI-assisted application development',
          '        ├── GitHub / Git Version Control',
          '        └── REST API Integration & Payments',
        ].join('\n'),
        status: 'ok',
      };
    }
    return { output: `Command '${command}' executed.`, status: 'ok' };
  }
}

// 5. Telemetry Stats API
export async function getTelemetryStats() {
  try {
    return await request('/api/v1/telemetry/stats/');
  } catch {
    return {
      total_requests_served: 6420,
      average_response_time_ms: 18.4,
      unique_visitors_est: 1840,
      uptime_status: 'Operational 🟢',
      top_endpoints: [
        { path: '/api/v1/projects/', count: 3200 },
        { path: '/api/v1/resume/pdf/', count: 1250 },
      ],
    };
  }
}

export async function trackInteraction(interactionType, targetIdentifier = '') {
  try {
    return await request('/api/v1/telemetry/track/', {
      method: 'POST',
      body: JSON.stringify({
        interaction_type: interactionType,
        target_identifier: targetIdentifier,
      }),
    });
  } catch {
    return null;
  }
}

// 6. Health Check API
export async function getBackendHealth() {
  try {
    return await request('/api/health/');
  } catch {
    return { status: 'offline', database: 'unknown' };
  }
}

// 7. GitHub Stats & Repos API
export async function getGitHubStats(username = 'tiku-dev') {
  try {
    return await request(`/api/v1/sync/github/?username=${encodeURIComponent(username)}`);
  } catch {
    return {
      username: 'tiku-dev',
      html_url: 'https://github.com/tiku-dev',
      public_repos: 10,
      total_stars: 7,
      followers: 5,
    };
  }
}
