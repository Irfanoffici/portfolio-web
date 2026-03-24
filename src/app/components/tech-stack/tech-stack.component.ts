import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.css'
})
export class TechStackComponent implements AfterViewInit {
  @ViewChildren('marqueeWrapper') marqueeWrappers!: QueryList<ElementRef>;
  @ViewChild('tooltipElement') tooltipElement!: ElementRef;

  techCategories = [
    {
      category: 'Frontend Engineering',
      tools: [
        { name: 'Angular Framework', extendedDesc: 'A powerful structural framework for dynamic web apps. I use Angular to rapidly build highly interactive, component-style platforms, managing complex state and routing for seamlessly polished user experiences.' },
        { name: 'React Ecosystem', extendedDesc: 'My go-to for declarative UI development. React enables me to implement sophisticated frontends with high reusability, leveraging Hooks for concise state management and dynamic DOM updates.' },
        { name: 'React Native', extendedDesc: 'Bringing React to mobile environments, I establish cross-platform applications that retain native aesthetics and performant gesture handling.' },
        { name: 'Modern Web (HTML5/CSS3/JS)', extendedDesc: 'The backbone of frontend engagement. Employing modern ES6+ structures, asynchronous patterns, and deep layout paradigms like Grid/Flexbox along with advanced transitions to breathe life into interfaces.' }
      ]
    },
    {
      category: 'Backend & Cloud',
      tools: [
        { name: 'Node.js Architectures', extendedDesc: 'Utilizing non-blocking I/O models to construct extremely rapid, lightweight, and efficient backend architectures handling intense data-throughput operations.' },
        { name: 'AWS & Firebase', extendedDesc: 'Deploying robust cloud ecosystems. Orchestrating scalable data storage and serverless computing functions to manage unpredictable traffic securely while expediting product iterations in real-time.' },
        { name: 'Database Optimization', extendedDesc: 'Orchestrating normalized relational data and flexible NoSQL documents depending on business requirements. Focusing on strict ACID compliance and optimized indexing.' },
        { name: 'Vercel Edge & CI/CD', extendedDesc: 'Embracing next-generation CI/CD pipelines to guarantee atomic deployments and instant rollback capabilities via an extensive global edge network.' }
      ]
    },
    {
      category: 'Advanced Engineering',
      tools: [
        { name: 'Manual Code Execution', extendedDesc: 'Writing explicit, optimized logic rather than relying on AI scaffolding. Prioritizing predictable, high-performance execution over rapid generation.' },
        { name: 'System Security', extendedDesc: 'Implementing robust cryptographic standards, rigorous data validation, and inherently preventing advanced web vulnerabilities at the architectural level.' },
        { name: 'Memory Management', extendedDesc: 'Optimizing client-side bundles and minimizing render cycles strictly through careful, hand-tuned application state observation.' }
      ]
    },
    {
      category: 'Core Fundamentals',
      tools: [
        { name: 'Software Architecture', extendedDesc: 'Architecting holistic structural blueprints. Encompassing meticulous planning, test-driven protocols, version history, and resilient cloud integration.' },
        { name: 'OS Environments (Linux/Windows)', extendedDesc: 'Fluent terminal mastery. Using secure shell interactions and bash scripting to manage server health, container routing, and local ecosystem optimization natively.' },
        { name: 'Algorithmic Problem Solving', extendedDesc: 'The bedrock of everything. I approach software not just to build features but to dismantle barriers, finding the simplest, most elegant path through dense constraints.' }
      ]
    }
  ];

  hoveredTool: any = null;
  marquees: gsap.core.Tween[] = [];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      if (isTouch) {
        // On mobile: use CSS animation class (GPU-native, no JS overhead)
        this.marqueeWrappers.forEach((wrapper, index) => {
          const track = wrapper.nativeElement.querySelector('.ars-marquee-track');
          if (track) {
            track.classList.add(index % 2 === 0 ? 'css-marquee-fwd' : 'css-marquee-rev');
          }
        });
        return;
      }

      // Desktop: GSAP with alternating directions
      setTimeout(() => {
        this.marqueeWrappers.forEach((wrapper, index) => {
          const track = wrapper.nativeElement.querySelector('.ars-marquee-track');
          if (index % 2 === 0) {
            const tween = gsap.fromTo(track,
              { xPercent: 0 },
              { xPercent: -50, duration: 40, ease: 'none', repeat: -1 }
            );
            this.marquees.push(tween);
          } else {
            const tween = gsap.fromTo(track,
              { xPercent: -50 },
              { xPercent: 0, duration: 35, ease: 'none', repeat: -1 }
            );
            this.marquees.push(tween);
          }
        });
      }, 100);
    });
  }

  onHoverTool(tool: any, event: MouseEvent) {
    this.hoveredTool = tool;
    this.marquees.forEach(m => m.pause());
    this.onMoveTool(event);
  }

  onMoveTool(event: MouseEvent) {
    if (!this.hoveredTool || !this.tooltipElement) return;
    
    // Smoothly track cursor
    gsap.to(this.tooltipElement.nativeElement, {
      x: event.clientX + 30,
      y: event.clientY + 30,
      duration: 0.3,
      ease: 'power3.out'
    });
  }

  onLeaveTool() {
    this.hoveredTool = null;
    this.marquees.forEach(m => m.play());
  }
}
