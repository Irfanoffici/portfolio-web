import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements AfterViewInit {
  @ViewChild('eduList') eduList!: ElementRef;

  educations = [
    {
      school: 'Madras Engineering College',
      degree: 'B.E Computer Science Engineering (Artificial Intelligence and Machine Learning)',
      date: 'Sep 2025 - 2029',
      details: 'Class Representative (AI & ML), Student Coordinator, Event Coordinator. Managed logistics, team coordination, and smooth execution of tech & cultural events.'
    },
    {
      school: 'Bharathi Matric Higher Secondary School, Kallakurichi',
      degree: 'High School Diploma (Grade: 12)',
      date: 'Jun 2024 - May 2025',
      details: 'Event Management, Written Communication, and Problem Solving focus.'
    }
  ];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);
      
      setTimeout(() => {
        const items = this.eduList.nativeElement.children;
        gsap.fromTo(items, 
          { x: -50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: this.eduList.nativeElement,
              start: 'top 85%',
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
          }
        );
        ScrollTrigger.refresh();
      }, 150);
    });
  }
}
