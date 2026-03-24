import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
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
  @ViewChild('fwContainer') fwContainer!: ElementRef;

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

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const items = this.fwContainer.nativeElement.querySelectorAll('.fw-monolithic-item');
      
      gsap.fromTo(items, 
        { scale: 0.98, opacity: 0, y: 70 },
        {
          scrollTrigger: {
            trigger: this.fwContainer.nativeElement,
            start: 'top 85%',
          },
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power4.out'
        }
      );
    });
  }
}
