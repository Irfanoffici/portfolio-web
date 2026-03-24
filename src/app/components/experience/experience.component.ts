import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('expContainer') expContainer!: ElementRef;

  experiences = [
    {
      company: 'Localhost IT Services & Solutions',
      role: 'Technical Intern',
      date: 'Mar 2026 - Present',
      desc: 'Debugging and testing the CampusOne app. Edutou portal admin and developer. Managed QA and systems, ensuring real products survive chaos.'
    },
    {
      company: 'Zyosys Technologist',
      role: 'Business Analyst',
      date: '2025 - 2026',
      desc: 'Bridging the gap between business needs and technological execution. Analyzing requirements and shaping products.'
    }
  ];

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => {
      const items = this.expContainer.nativeElement.querySelectorAll('.exp-row');
      
      gsap.fromTo(items, 
        { scale: 0.95, y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: this.expContainer.nativeElement,
            start: 'top 80%'
          },
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
      ScrollTrigger.refresh();
    }, 150);
  }
}
