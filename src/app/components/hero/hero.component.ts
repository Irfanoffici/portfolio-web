import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, NgZone } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('preTitle') preTitle!: ElementRef;
  @ViewChildren('mainTitle') mainTitleList!: QueryList<ElementRef>;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('scrollIndicator') scrollIndicator!: ElementRef;
  @ViewChild('marqueeWrapper') marqueeWrapper!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (isTouch) {
      // On mobile: show everything immediately — no GSAP, no hidden states
      this.makeMobileVisible();
      this.initMobileMarquee();
      return;
    }

    // Desktop: Full GSAP intro animation
    this.ngZone.runOutsideAngular(() => {
      this.initDesktopAnimations();
      this.initDesktopMarquee();
    });
  }

  /** Mobile: ensure all hero elements are visible without GSAP */
  makeMobileVisible() {
    const els = [
      this.preTitle?.nativeElement,
      this.description?.nativeElement,
      this.scrollIndicator?.nativeElement
    ].filter(Boolean);

    els.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // line-reveal spans — remove any hidden transform that CSS or GSAP may set
    document.querySelectorAll('.line-reveal').forEach(el => {
      (el as HTMLElement).style.transform = 'none';
      (el as HTMLElement).style.clipPath = 'none';
      (el as HTMLElement).style.opacity = '1';
    });
  }

  /** Mobile: CSS-class marquee (GPU-native, zero JS scroll) */
  initMobileMarquee() {
    if (!this.marqueeWrapper?.nativeElement) return;
    const track = this.marqueeWrapper.nativeElement;
    track.classList.add('css-marquee-fwd');
  }

  /** Desktop: GSAP intro timeline + infinite marquee via GSAP */
  initDesktopAnimations() {
    const h1Lines = document.querySelectorAll('.line-reveal');

    // Set initial hidden states ONLY on desktop (not blocking LCP on mobile)
    gsap.set(h1Lines, {
      y: 100,
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'
    });
    gsap.set(
      [this.preTitle.nativeElement, this.description.nativeElement, this.scrollIndicator.nativeElement],
      { opacity: 0, y: 20 }
    );

    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

    tl.to(h1Lines, {
      y: 0,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      stagger: 0.14,
      delay: 0.08
    })
    .to(
      [this.preTitle.nativeElement, this.description.nativeElement, this.scrollIndicator.nativeElement],
      { opacity: 1, y: 0, stagger: 0.1, duration: 1 },
      '-=1'
    );
  }

  initDesktopMarquee() {
    if (!this.marqueeWrapper?.nativeElement) return;
    const marquee = this.marqueeWrapper.nativeElement.querySelector('.marquee-content');
    if (!marquee) return;
    const clone = marquee.cloneNode(true);
    this.marqueeWrapper.nativeElement.appendChild(clone);
    gsap.to('.hero-section .marquee-content', {
      xPercent: -100, repeat: -1, duration: 20, ease: 'linear'
    });
  }
}
