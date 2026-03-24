import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-featured-work',
  standalone: true,
  imports: [],
  templateUrl: './featured-work.component.html',
  styleUrl: './featured-work.component.css'
})
export class FeaturedWorkComponent implements AfterViewInit {
  @ViewChild('workContainer') workContainer!: ElementRef;

  projects = [
    {
      name: 'CampusOne App',
      type: 'Mobile Application',
      link: 'https://play.google.com/store/apps/details?id=com.mec.campusone&hl=en_US',
      desc: 'A comprehensive campus management app. I served as a Technical Intern handling extensive QA, debugging, and ensuring stability for end-users.',
      tags: ['QA & Debugging', 'Mobile App', 'Systems Management']
    },
    {
      name: 'Madras Engineering College Website',
      type: 'Web Platform',
      link: 'https://madrascollege.ac.in',
      desc: 'The official college portal. Contributed to its web infrastructure to shape an engaging and responsive experience.',
      tags: ['Web Development', 'Architecture']
    }
  ];

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    const cards = this.workContainer.nativeElement.querySelectorAll('.fw-row');
    
    gsap.fromTo(cards, 
      { scale: 0.9, opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: this.workContainer.nativeElement,
          start: 'top 80%',
        },
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );
  }
}
