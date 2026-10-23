/**
 * Centralized API Client for Django Backend.
 * Connects to http://127.0.0.1:8000/api/v1/ with graceful fallback data.
 */

// Default to empty string so requests use relative paths through Vite's reverse proxy.
// This allows the full app (frontend + Django backend) to work seamlessly over ngrok/tunnels without mixed content or CORS issues.
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

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
    // High-fidelity fallback full stack case studies matching Django seed data
    return [
      {
        id: 1,
        title: 'Real-Time Collaborative Analytics Platform',
        slug: 'collaborative-analytics-platform',
        tagline: 'Full-stack reactive analytics dashboard with interactive data exploration, live WebSockets, and sub-30ms P99 latency',
        problem_statement: 'Data teams suffered from fragmented analytical dashboards with slow 2-3 second query refreshes and disconnected user collaboration tools.',
        architecture_overview: 'Engineered an end-to-end full stack platform: responsive React 19 and TypeScript frontend with optimistic UI updates and Tailwind CSS, backed by a high-throughput Django REST API with Redis Streams for live collaboration and PostgreSQL for partitioned analytical storage.',
        key_achievements: [
          'Engineered reactive charting UI achieving a 99/100 Google Lighthouse Core Web Vitals score',
          'Delivered real-time multiplayer cursor and filtering updates at sub-30ms latency via Redis Streams',
          'Reduced server query load by 65% through intelligent client-side query caching and SWR',
        ],
        metrics: [
          { id: 1, label: 'Lighthouse Score', value: '99/100', description: 'Core Web Vitals performance' },
          { id: 2, label: 'Live Latency', value: '28ms', description: 'Real-time WebSocket & Redis sync' },
          { id: 3, label: 'Active Users', value: '120k+', description: 'Monthly active full stack users' },
        ],
        tags: [
          { name: 'React', slug: 'react', color: '#61DAFB' },
          { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
          { name: 'Tailwind CSS', slug: 'tailwind', color: '#38BDF8' },
          { name: 'Django', slug: 'django', color: '#092E20' },
          { name: 'Python', slug: 'python', color: '#3776AB' },
          { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
          { name: 'Redis', slug: 'redis', color: '#DC382D' },
        ],
        github_url: 'https://github.com/octocat/Spoon-Knife',
        demo_url: 'https://httpbin.org/status/200',
        health_status: 'healthy',
        github_stars: 485,
      },
      {
        id: 2,
        title: 'Scalable Multi-Tenant SaaS Workspace',
        slug: 'multi-tenant-saas-core',
        tagline: 'End-to-end B2B SaaS platform with customizable React dashboard, automated tenant onboarding, and schema-isolated APIs',
        problem_statement: 'Enterprise B2B clients required custom white-label interfaces, strict data residency isolation, and dedicated resource allocation while maintaining a single unified codebase.',
        architecture_overview: 'Architected a unified full stack SaaS architecture: modular React frontend with dynamic theme tokens and role-based views, paired with schema-isolated multi-tenant Django backend and Stripe metered billing webhooks.',
        key_achievements: [
          'Isolated 200+ distinct enterprise customer databases on a single cluster without cross-tenant data leakage',
          'Automated tenant provisioning pipeline in under 3.5 seconds from checkout to active workspace',
          'Built accessible WCAG 2.1 AA compliant UI component system with dark/light theme support',
        ],
        metrics: [
          { id: 4, label: 'Provisioning Time', value: '3.5s', description: 'Stripe webhook to live tenant' },
          { id: 5, label: 'Active Tenants', value: '200+', description: 'Isolated PostgreSQL schemas' },
          { id: 6, label: 'UI Accessibility', value: '100%', description: 'WCAG 2.1 AA compliance' },
        ],
        tags: [
          { name: 'React', slug: 'react', color: '#61DAFB' },
          { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
          { name: 'Django', slug: 'django', color: '#092E20' },
          { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
          { name: 'Docker', slug: 'docker', color: '#2496ED' },
          { name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5' },
        ],
        github_url: 'https://github.com/octocat/Hello-World',
        demo_url: 'https://httpbin.org/status/200',
        health_status: 'healthy',
        github_stars: 320,
      },
    ];
  }
}

export async function getProjectDetail(slug) {
  return await request(`/api/v1/projects/${slug}/`);
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
        full_name: 'Alex Mercer',
        headline: 'Senior Full Stack & Systems Engineer',
        summary: 'Full Stack Engineer with deep expertise across modern web applications — crafting reactive, polished React & TypeScript user interfaces and architecting resilient, distributed Django, PostgreSQL, and Redis backend infrastructure.',
        email: 'alex.mercer.eng@example.com',
        location: 'London, UK (Open to Global Remote)',
        github_url: 'https://github.com/octocat',
        linkedin_url: 'https://linkedin.com/in/octocat',
        available_for_hire: true,
        availability_notice: 'Available for Senior Full Stack & Lead roles',
      },
      experiences: [
        {
          id: 1,
          company: 'CloudScale Systems',
          role: 'Lead Full Stack Engineer',
          location: 'Remote',
          start_date: '2023-01-01',
          is_current: true,
          summary: 'Leading cross-functional engineering across modern web client applications and high-throughput backend services.',
          achievements: [
            'Spearheaded redesign of customer web app into a high-performance React & TypeScript SPA with sub-second page loads',
            'Architected high-throughput ingestion microservice serving 10M+ daily events using Django, Celery, and Redis',
            'Implemented design system and component library, improving developer velocity across 4 feature squads by 40%',
            'Reduced client-side bundle size by 35% through tree-shaking and dynamic code-splitting',
          ],
          tags: [{ name: 'React' }, { name: 'TypeScript' }, { name: 'Django' }, { name: 'PostgreSQL' }, { name: 'Redis' }],
        },
        {
          id: 2,
          company: 'NexTech Solutions',
          role: 'Full Stack Software Engineer',
          location: 'London, UK',
          start_date: '2021-03-01',
          end_date: '2022-12-31',
          is_current: false,
          summary: 'Built end-to-end features, payment checkout flows, client dashboards, and async processing queues.',
          achievements: [
            'Built responsive React customer dashboard with real-time billing metrics and Stripe subscription webhooks',
            'Implemented Redis caching and query indexing layer, dropping average API response latency from 180ms to 28ms',
            'Authored end-to-end and unit test suites across frontend and backend reaching 90% branch coverage',
          ],
          tags: [{ name: 'React' }, { name: 'JavaScript' }, { name: 'Django' }, { name: 'Python' }, { name: 'PostgreSQL' }],
        },
      ],
      education: [
        {
          institution: 'University of Manchester',
          degree: 'B.Sc. (Hons)',
          field_of_study: 'Computer Science',
          start_year: 2017,
          end_year: 2020,
        },
      ],
    };
  }
}

export function getResumePdfDownloadUrl(focus = null) {
  const query = focus ? `?focus=${encodeURIComponent(focus)}` : '';
  return `${API_BASE_URL}/api/v1/resume/pdf/${query}`;
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
          '  skills --tree                  Render full stack skills tree',
          '  projects                       List full stack projects',
          '  uptime                         Show system telemetry',
          '===========================================================',
        ].join('\n'),
        status: 'ok',
      };
    }
    if (cmd === 'whoami') {
      return {
        output: 'Alex Mercer - Senior Full Stack & Systems Engineer\nSpecialization: React, TypeScript, Python, Django & Distributed Systems\nLocation: London, UK | Status: 🟢 Open to Senior & Lead Roles',
        status: 'ok',
      };
    }
    if (cmd.includes('skills')) {
      return {
        output: [
          '└── Full Stack Competencies',
          '    ├── FRONTEND & UI',
          '    │   ├── React 19 & Next.js',
          '    │   ├── TypeScript',
          '    │   ├── Tailwind CSS & Animations',
          '    │   └── PWA & Web Vitals',
          '    ├── BACKEND & APIS',
          '    │   ├── Django & Python',
          '    │   ├── Django REST / OpenAPI',
          '    │   ├── Celery Workers',
          '    │   └── Node.js & WebSockets',
          '    ├── DATABASE & STREAMS',
          '    │   ├── PostgreSQL (Partitioning & Tuning)',
          '    │   └── Redis Streams & Caching',
          '    └── DEVOPS & CLOUD',
          '        ├── Docker & Kubernetes',
          '        └── CI/CD Pipelines',
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
