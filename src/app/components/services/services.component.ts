import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements AfterViewInit {
  @ViewChild('servicesList') servicesList!: ElementRef;

  services = [
    {
      name: 'Custom Software Architecture',
      desc: 'Architecting resilient, scalable platforms from the ground up using strictly typed, hand-crafted codebases.',
      extendedDesc: 'I prioritize foundational software engineering over automated generation. By writing robust, maintainable logic manually, I ensure complete control over the architecture. This guarantees that the final product scales seamlessly without the unpredictable overhead or rigid constraints of AI-generated scaffolding.'
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
      name: 'Complex API & System Design',
      desc: 'Engineering sophisticated backend networks and integrating dynamic third-party ecosystems with absolute precision.',
      extendedDesc: 'Instead of blindly relying on automated tools, I meticulously structure database relationships, secure endpoints, and optimize continuous data flow. This manual precision allows for enterprise-grade reliability and creates flexible ecosystems tailored exactly to complex business logic.'
    },
    {
      name: 'Business Analysis & Strategy',
      desc: 'Analyzing requirements to bridge the gap between abstract business strategy and concrete technological execution.',
      extendedDesc: 'I act as the translator between visionary stakeholders and hardline engineering teams. By breaking down high-level business requirements into sprint-ready technical blueprints, I ensure that the software being developed perfectly aligns with market goals and user needs.'
    },
  ];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return; // CSS handles layout on mobile — skip GSAP

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      setTimeout(() => {
        gsap.fromTo(this.servicesList.nativeElement.children,
          { x: 40, opacity: 0 },
          {
            scrollTrigger: { trigger: this.servicesList.nativeElement, start: 'top 85%' },
            x: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out'
          }
        );
        ScrollTrigger.refresh();
      }, 100);
    });
  }
}
