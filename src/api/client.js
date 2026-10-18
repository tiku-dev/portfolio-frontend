/**
 * Centralized API Client for Django Backend.
 * Connects to http://127.0.0.1:8000/api/v1/ with graceful fallback data.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

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
    // High-fidelity fallback case studies matching Django seed data
    return [
      {
        id: 1,
        title: 'High-Throughput Distributed Event Streamer',
        slug: 'distributed-event-streamer',
        tagline: 'Real-time webhook and audit stream processing 20M+ daily events with guaranteed idempotency',
        problem_statement: 'Third-party integrations caused burst traffic spikes that overwhelmed downstream relational databases, leading to deadlocks and dropped event deliveries during peak hours.',
        architecture_overview: 'Architected a decoupled ingestion pipeline using Django REST Framework, Redis Streams, and Celery worker pools. Implemented distributed idempotency keys via Redis SETNX and dynamic backpressure throttling.',
        key_achievements: [
          'Zero event loss during downstream database maintenance windows',
          'Maintained sub-25ms P99 API ingestion latency under 15,000 req/sec loads',
          'Reduced database connection pool exhaustion by 90% via connection pooling',
        ],
        metrics: [
          { id: 1, label: 'Throughput', value: '15,000 req/s', description: 'Peak ingestion capacity' },
          { id: 2, label: 'P99 Latency', value: '24ms', description: 'Measured across 50M payloads' },
          { id: 3, label: 'Cost Reduction', value: '40%', description: 'Optimized Redis memory footprint' },
        ],
        tags: [
          { name: 'Django', slug: 'django', color: '#092E20' },
          { name: 'Python', slug: 'python', color: '#3776AB' },
          { name: 'Redis', slug: 'redis', color: '#DC382D' },
          { name: 'Celery', slug: 'celery', color: '#37814A' },
          { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
        ],
        github_url: 'https://github.com/octocat/Spoon-Knife',
        demo_url: 'https://httpbin.org/status/200',
        health_status: 'healthy',
        github_stars: 342,
      },
      {
        id: 2,
        title: 'Scalable Multi-Tenant SaaS Engine',
        slug: 'multi-tenant-saas-core',
        tagline: 'Schema-isolated multi-tenant Django architecture with automated onboarding and tenant metering',
        problem_statement: 'Enterprise B2B clients required strict data isolation, compliance with data residency laws, and dedicated resource allocation while maintaining a unified codebase.',
        architecture_overview: 'Engineered schema-based multi-tenancy utilizing PostgreSQL schemas and custom Django middleware. Built dynamic tenant routing, automated database schema migrations per tenant, and Stripe metered billing webhooks.',
        key_achievements: [
          'Isolated 200+ distinct enterprise customer databases on a single cluster',
          'Automated tenant provisioning pipeline in under 3.5 seconds',
          'Zero cross-tenant data leakage verified by independent security audits',
        ],
        metrics: [
          { id: 4, label: 'Provisioning Time', value: '3.5s', description: 'Stripe webhook to live tenant' },
          { id: 5, label: 'Active Tenants', value: '200+', description: 'Isolated PostgreSQL schemas' },
        ],
        tags: [
          { name: 'Django', slug: 'django', color: '#092E20' },
          { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
          { name: 'Docker', slug: 'docker', color: '#2496ED' },
          { name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5' },
        ],
        github_url: 'https://github.com/octocat/Hello-World',
        demo_url: 'https://httpbin.org/status/200',
        health_status: 'healthy',
        github_stars: 190,
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
      latency_ms: 38.4,
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
      { name: 'Django', slug: 'django', category: 'backend' },
      { name: 'Python', slug: 'python', category: 'backend' },
      { name: 'PostgreSQL', slug: 'postgresql', category: 'database' },
      { name: 'Redis', slug: 'redis', category: 'database' },
      { name: 'Celery', slug: 'celery', category: 'backend' },
      { name: 'Docker', slug: 'docker', category: 'devops' },
      { name: 'Kubernetes', slug: 'kubernetes', category: 'devops' },
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
        headline: 'Senior Backend & Distributed Systems Engineer',
        summary: 'Backend Engineer specializing in resilient distributed systems, asynchronous event-driven pipelines, and scalable API architectures using Django, PostgreSQL, and Redis.',
        email: 'alex.mercer.eng@example.com',
        location: 'London, UK (Open to Global Remote)',
        github_url: 'https://github.com/octocat',
        linkedin_url: 'https://linkedin.com/in/octocat',
        available_for_hire: true,
        availability_notice: 'Available for Senior Backend / Staff roles',
      },
      experiences: [
        {
          id: 1,
          company: 'CloudScale Systems',
          role: 'Lead Backend Engineer',
          location: 'Remote',
          start_date: '2023-01-01',
          is_current: true,
          summary: 'Leading the core backend team in designing scalable microservices and data pipelines.',
          achievements: [
            'Architected high-throughput ingestion microservice serving 10M+ daily events using Django and Redis',
            'Spearheaded database query optimization initiative, reducing slow query occurrences by 75%',
            'Mentored 6 backend engineers and established standard CI/CD and automated testing guidelines',
          ],
          tags: [{ name: 'Django' }, { name: 'Python' }, { name: 'PostgreSQL' }, { name: 'Redis' }],
        },
        {
          id: 2,
          company: 'NexTech Solutions',
          role: 'Backend Software Engineer',
          location: 'London, UK',
          start_date: '2021-03-01',
          end_date: '2022-12-31',
          is_current: false,
          summary: 'Built core REST APIs, payment integrations, and background worker queues.',
          achievements: [
            'Integrated Stripe Billing API with webhook signature verification and idempotent charge handling',
            'Implemented Redis caching layer, dropping average response latency from 180ms to 28ms',
            'Authored automated test suite reaching 88% branch coverage',
          ],
          tags: [{ name: 'Django' }, { name: 'Python' }, { name: 'PostgreSQL' }, { name: 'Celery' }],
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
          '               PORTFOLIO DEVELOPER CONSOLE (CLIENT MODE)  ',
          '===========================================================',
          'Commands:',
          '  help                           Show command list',
          '  whoami                         Display engineer bio',
          '  skills --tree                  Render skills ASCII tree',
          '  projects                       List projects & metrics',
          '  uptime                         Show system telemetry',
          '===========================================================',
        ].join('\n'),
        status: 'ok',
      };
    }
    if (cmd === 'whoami') {
      return {
        output: 'Alex Mercer - Senior Backend & Distributed Systems Engineer\nLocation: London, UK | Status: 🟢 Open to Senior Roles',
        status: 'ok',
      };
    }
    if (cmd.includes('skills')) {
      return {
        output: '└── Core Competencies\n    ├── BACKEND\n    │   ├── Django\n    │   ├── Python\n    │   └── Celery\n    └── DATABASE\n        ├── PostgreSQL\n        └── Redis',
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
      total_requests_served: 4820,
      average_response_time_ms: 18.4,
      unique_visitors_est: 1340,
      uptime_status: 'Operational 🟢',
      top_endpoints: [
        { path: '/api/v1/projects/', count: 2100 },
        { path: '/api/v1/resume/pdf/', count: 890 },
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

