import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('portraitWrap') portraitWrap!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Paragraph GSAP Scrub Reveal
      const textElements = document.querySelectorAll('.reveal-text');
      textElements.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 1,
          },
          color: 'var(--text-color)',
          ease: 'none'
        });
      });

      // Manifest staggering entrance
      const manifestLines = document.querySelectorAll('.mani-line');
      gsap.fromTo(manifestLines, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.abt-manifesto',
            start: 'top 80%'
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );

      // Portrait Image Parallax
      if (this.portraitWrap) {
        gsap.fromTo(this.portraitWrap.nativeElement,
          { y: -30 },
          {
            scrollTrigger: {
              trigger: this.portraitWrap.nativeElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            },
            y: 30,
            ease: 'none'
          }
        );
      }
    });
  }
}
