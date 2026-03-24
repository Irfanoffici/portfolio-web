import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('servicesList') servicesList!: ElementRef;

  services = [
    { 
      name: 'Vibe Coding & Rapid Prototyping', 
      desc: 'Turning complex ideas into functional products at lightning speed using an intuitive, AI-accelerated approach.',
      extendedDesc: 'By heavily utilizing AI agents and zero-shot generative models during the initial conception phase, I drastically reduce the boilerplate setup time. This allows me to immediately focus on complex business logic, architectural resilience, and user experience—transforming raw concepts into fully iterative prototypes within days.'
    },
    { 
      name: 'Full-Stack Architecture', 
      desc: 'Building scalable, responsive platforms with cutting-edge frameworks like Angular, React, and robust cloud backends.',
      extendedDesc: 'From establishing secure Node.js APIs and designing optimized PostgreSQL databases to creating completely decoupled, lightning-fast Single Page Applications in Angular/React. I ensure every layer of the technology stack is tightly integrated, fully typed, and inherently secure against modern web vulnerabilities.'
    },
    { 
      name: 'Mobile App Management & QA', 
      desc: 'Ensuring absolute stability, seamless user experiences, and rigorous debugging for high-traffic applications like CampusOne.',
      extendedDesc: 'I orchestrate systematic quality assurance pipelines that simulate edge-case network constraints and extreme user loads. This involves meticulously tracking runtime exceptions, optimizing render cycles in frameworks like React Native, and ensuring end-users never experience a crash during critical tasks.'
    },
    { 
      name: 'Gen-AI & Prompt Engineering', 
      desc: 'Crafting advanced conversational logic and integrating state-of-the-art language models directly into ecosystems.',
      extendedDesc: 'I do not just call APIs; I engineer context. By designing sophisticated prompt chains, dynamically adjusting system instructions, and utilizing function calling, I forcefully constrain AI behavior to guarantee predictable, context-aware, and highly creative features within native applications.'
    },
    { 
      name: 'Business Analysis & Strategy', 
      desc: 'Analyzing requirements to bridge the gap between abstract business strategy and concrete technological execution.',
      extendedDesc: 'I act as the translator between visionary stakeholders and hardline engineering teams. By breaking down high-level business requirements into sprint-ready technical blueprints, I ensure that the software being developed perfectly aligns with market goals and user needs.'
    },
  ];

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => {
      const items = this.servicesList.nativeElement.children;
      gsap.fromTo(items, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: this.servicesList.nativeElement,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
      ScrollTrigger.refresh();
    }, 150);
  }
}
