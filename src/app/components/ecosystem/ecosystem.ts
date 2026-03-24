import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ecosystem.html',
  styleUrl: './ecosystem.css',
})
export class Ecosystem implements AfterViewInit {
  @ViewChildren('toolNode') toolNodes!: QueryList<ElementRef>;

  activeTool: any = null;

  toolCategories = [
    {
      name: 'STRATEGY & IDEATION',
      tools: [
        { name: 'ChatGPT', desc: 'idea generation, validation, problem framing', size: 'large', x: 8, y: 12 },
        { name: 'Notion AI', desc: 'structured thinking, notes, PRDs', size: 'medium', x: 42, y: 8 },
        { name: 'Miro', desc: 'collaborative brainstorming', size: 'large', x: 72, y: 18 },
        { name: 'Whimsical', desc: 'mind maps, flows', size: 'small', x: 22, y: 32 },
        { name: 'Perplexity AI', desc: 'research + insights', size: 'medium', x: 58, y: 38 },
        { name: 'Tome', desc: 'strategy decks', size: 'small', x: 82, y: 52 }
      ]
    },
    {
      name: 'PRODUCT & PLANNING',
      tools: [
        { name: 'ClickUp', desc: 'task + sprint planning', size: 'large', x: 12, y: 48 },
        { name: 'Jira', desc: 'dev workflow + backlog', size: 'medium', x: 38, y: 62 },
        { name: 'Notion', desc: 'PRDs, docs, roadmap', size: 'large', x: 68, y: 48 },
        { name: 'Productboard', desc: 'feature prioritization', size: 'medium', x: 12, y: 78 }
      ]
    },
    {
      name: 'DESIGN & PROTOTYPE',
      tools: [
        { name: 'Figma', desc: 'UI/UX design', size: 'xlarge', x: 48, y: 28 },
        { name: 'Framer', desc: 'AI website design', size: 'large', x: 82, y: 8 },
        { name: 'Uizard', desc: 'rapid prototyping', size: 'medium', x: 28, y: 72 },
        { name: 'Galileo AI', desc: 'text → UI', size: 'small', x: 3, y: 38 },
        { name: 'Adobe Firefly', desc: 'visuals & assets', size: 'medium', x: 75, y: 82 }
      ]
    },
    {
      name: 'ENGINEERING & DEPLOY',
      tools: [
        { name: 'Claude Code', desc: 'AI-native coding', size: 'xlarge', x: 52, y: 68 },
        { name: 'GitHub Copilot', desc: 'code suggestions', size: 'large', x: 18, y: 22 },
        { name: 'Cursor', desc: 'AI-native IDE', size: 'xlarge', x: 78, y: 38 },
        { name: 'Replit', desc: 'build + deploy', size: 'medium', x: 38, y: 82 },
        { name: 'Vercel', desc: 'deploy apps', size: 'large', x: 88, y: 72 }
      ]
    },
    {
      name: 'QA & RELIABILITY',
      tools: [
        { name: 'Testim', desc: 'automated testing', size: 'small', x: 3, y: 58 },
        { name: 'Selenium', desc: 'legacy automation', size: 'small', x: 25, y: 88 },
        { name: 'Postman', desc: 'API testing', size: 'medium', x: 62, y: 88 },
        { name: 'Sentry', desc: 'bug tracking', size: 'medium', x: 85, y: 22 },
        { name: 'QA Wolf', desc: 'test automation', size: 'small', x: 10, y: 8 }
      ]
    },
    {
      name: 'SECURITY & INFRA',
      tools: [
        { name: 'Cloudflare', desc: 'DDoS + protection', size: 'large', x: 32, y: 42 },
        { name: 'Snyk', desc: 'vulnerability scanning', size: 'medium', x: 70, y: 62 },
        { name: 'Burp Suite', desc: 'penetration testing', size: 'medium', x: 48, y: 52 },
        { name: 'Auth0', desc: 'login security', size: 'medium', x: 3, y: 18 },
        { name: 'Okta', desc: 'identity + access', size: 'small', x: 20, y: 4 }
      ]
    },
    {
      name: 'GROWTH & INSIGHTS',
      tools: [
        { name: 'Google Analytics', desc: 'traffic insights', size: 'large', x: 90, y: 58 },
        { name: 'Mixpanel', desc: 'user behavior', size: 'medium', x: 30, y: 18 },
        { name: 'Hotjar', desc: 'heatmaps', size: 'small', x: 45, y: 4 },
        { name: 'Optimizely', desc: 'A/B testing', size: 'medium', x: 65, y: 12 },
        { name: 'Amplitude', desc: 'product insights', size: 'medium', x: 80, y: 88 }
      ]
    },
    {
      name: 'PAYMENTS & SALES',
      tools: [
        { name: 'Stripe', desc: 'global payments', size: 'xlarge', x: 38, y: 32 },
        { name: 'Razorpay', desc: 'India payments', size: 'large', x: 8, y: 88 },
        { name: 'HubSpot', desc: 'CRM + marketing', size: 'large', x: 50, y: 92 },
        { name: 'Zoho CRM', desc: 'sales pipeline', size: 'medium', x: 72, y: 4 },
        { name: 'Mailchimp', desc: 'email campaigns', size: 'medium', x: 1, y: 72 }
      ]
    }
  ];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      this.toolNodes.forEach((node, index) => {
        const el = node.nativeElement;
        const depth = parseFloat(el.getAttribute('data-depth') || '1');
        
        // Random drift based on scroll
        gsap.to(el, {
          y: -200 * depth,
          x: (Math.random() - 0.5) * 50,
          rotate: (Math.random() - 0.5) * 10,
          scrollTrigger: {
            trigger: '.eco-canvas',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });

        // Hover effect for premium feel
        el.addEventListener('mouseenter', () => {
          el.closest('.eco-canvas')?.classList.add('is-focus-mode');
          gsap.to(el, { scale: 1.15, zIndex: 100, duration: 0.4, ease: 'power2.out' });
          gsap.to(el.querySelector('.tool-desc'), { opacity: 1, y: 0, duration: 0.4 });
        });
        el.addEventListener('mouseleave', () => {
          el.closest('.eco-canvas')?.classList.remove('is-focus-mode');
          gsap.to(el, { scale: 1, zIndex: 1, duration: 0.4, ease: 'power2.in' });
          gsap.to(el.querySelector('.tool-desc'), { opacity: 0, y: 10, duration: 0.4 });
        });
      });
    });
  }

  toggleTool(tool: any) {
    if (this.activeTool === tool) {
      this.activeTool = null;
    } else {
      this.activeTool = tool;
    }
  }
}
