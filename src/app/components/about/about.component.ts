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
    // Skip GSAP entirely on touch devices — CSS handles reveals natively
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Scroll-scrub text color reveal (desktop only)
      document.querySelectorAll('.reveal-text').forEach((el) => {
        gsap.to(el, {
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 60%', scrub: 1 },
          color: 'var(--text-color)',
          ease: 'none'
        });
      });

      // Manifesto stagger entrance (desktop only)
      gsap.fromTo(document.querySelectorAll('.mani-line'),
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: '.abt-manifesto', start: 'top 80%' },
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out'
        }
      );

      // Portrait parallax (desktop only)
      if (this.portraitWrap?.nativeElement) {
        gsap.fromTo(this.portraitWrap.nativeElement,
          { y: -30 },
          {
            scrollTrigger: {
              trigger: this.portraitWrap.nativeElement,
              start: 'top bottom', end: 'bottom top', scrub: true
            },
            y: 30, ease: 'none'
          }
        );
      }
    });
  }
}
