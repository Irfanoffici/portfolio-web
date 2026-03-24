import { Component, AfterViewInit } from '@angular/core';
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
  activeCategory: number = -1;

  techCategories = [
    {
      category: 'Frontend Engineering',
      theme: 'frontend',
      tagline: 'Where logic becomes experience.',
      decorator: '⬡',
      tools: [
        { name: 'Angular Framework', extendedDesc: 'A powerful structural framework for dynamic web apps. I use Angular to rapidly build highly interactive, component-style platforms, managing complex state and routing for seamlessly polished user experiences.' },
        { name: 'React Ecosystem', extendedDesc: 'My go-to for declarative UI development. React enables me to implement sophisticated frontends with high reusability, leveraging Hooks for concise state management and dynamic DOM updates.' },
        { name: 'React Native', extendedDesc: 'Bringing React to mobile environments, I establish cross-platform applications that retain native aesthetics and performant gesture handling.' },
        { name: 'Modern Web (HTML5/CSS3/JS)', extendedDesc: 'The backbone of frontend engagement. Employing modern ES6+ structures, asynchronous patterns, and deep layout paradigms like Grid/Flexbox along with advanced transitions to breathe life into interfaces.' }
      ]
    },
    {
      category: 'Backend & Cloud',
      theme: 'backend',
      tagline: 'The invisible architecture that scales.',
      decorator: '◈',
      tools: [
        { name: 'Node.js Architectures', extendedDesc: 'Utilizing non-blocking I/O models to construct extremely rapid, lightweight, and efficient backend architectures handling intense data-throughput operations.' },
        { name: 'AWS & Firebase', extendedDesc: 'Deploying robust cloud ecosystems. Orchestrating scalable data storage and serverless computing functions to manage unpredictable traffic securely while expediting product iterations in real-time.' },
        { name: 'Database Optimization', extendedDesc: 'Orchestrating normalized relational data and flexible NoSQL documents depending on business requirements. Focusing on strict ACID compliance and optimized indexing.' },
        { name: 'Vercel Edge & CI/CD', extendedDesc: 'Embracing next-generation CI/CD pipelines to guarantee atomic deployments and instant rollback capabilities via an extensive global edge network.' }
      ]
    },
    {
      category: 'AI & Intelligence',
      theme: 'ai',
      tagline: 'When code learns to think.',
      decorator: '◉',
      tools: [
        { name: 'Language Models & Gen-AI', extendedDesc: 'Pushing boundaries by embedding sophisticated AI models through APIs. Enabling generative capabilities, automated reasoning, and creative integrations inside SPAs.' },
        { name: 'Prompt Engineering', extendedDesc: 'Manipulating context windows and carefully structuring zero/few-shot prompts. Directing AI logic to return extremely specific, tailored constraints without hallucinations.' },
        { name: 'Vibe Coding', extendedDesc: 'The vanguard of modern dev. Leaning intensely into AI-assisted programming to construct immense logic architectures rapidly—coding at the speed of thought.' }
      ]
    },
    {
      category: 'Core Fundamentals',
      theme: 'core',
      tagline: 'The bedrock of everything I build.',
      decorator: '▣',
      tools: [
        { name: 'Software Architecture', extendedDesc: 'Architecting holistic structural blueprints. Encompassing meticulous planning, test-driven protocols, version history, and resilient cloud integration.' },
        { name: 'OS Environments (Linux/Windows)', extendedDesc: 'Fluent terminal mastery. Using secure shell interactions and bash scripting to manage server health, container routing, and local ecosystem optimization natively.' },
        { name: 'Algorithmic Problem Solving', extendedDesc: 'The bedrock of everything. I approach software not just to build features but to dismantle barriers, finding the simplest, most elegant path through dense constraints.' }
      ]
    }
  ];

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => {
      const sections = document.querySelectorAll('.luxury-category-section');
      
      sections.forEach((sec) => {
        const anchor = sec.querySelector('.sticky-category-header');
        const rows = sec.querySelectorAll('.luxury-tool-row');
        
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sec, start: 'top 85%' }
        });
        
        if (anchor) {
          tl.fromTo(anchor, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
        }
        
        tl.fromTo(rows,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          '-=0.5'
        );
      });
      
      ScrollTrigger.refresh();
    }, 150);
  }
}
