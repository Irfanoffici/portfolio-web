import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChildren('text') textBlocks!: QueryList<ElementRef>;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initScrollReveal();
    });
  }

  initScrollReveal() {
    // Parallax or color reveal on scroll
    const textElements = document.querySelectorAll('.reveal-text');
    
    textElements.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 1,
        },
        color: '#f1f1f1',
        opacity: 1,
        ease: 'none'
      });
    });
  }
}
