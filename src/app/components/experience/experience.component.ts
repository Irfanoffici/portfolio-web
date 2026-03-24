import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
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
      date: 'Mar 2026 - Present',
      desc: 'Bridging the gap between business needs and technological execution. Analyzing requirements and shaping products.'
    }
  ];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      setTimeout(() => {
        gsap.fromTo(
          this.expContainer.nativeElement.querySelectorAll('.exp2-block'),
          { x: -50, opacity: 0 },
          {
            scrollTrigger: { trigger: this.expContainer.nativeElement, start: 'top 85%' },
            x: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power3.out'
          }
        );
        ScrollTrigger.refresh();
      }, 100);
    });
  }
}
