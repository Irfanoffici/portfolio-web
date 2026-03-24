import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, NgZone } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('footerMarquee') marqueeWrapper!: ElementRef;

  currentTime: string = '';
  private clockInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.initClock();
      this.initMarquee();
      this.initReveal();
    });
  }

  initClock() {
    const update = () => {
      const now = new Date();
      const chennaiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const h = chennaiTime.getHours().toString().padStart(2, '0');
      const m = chennaiTime.getMinutes().toString().padStart(2, '0');
      const s = chennaiTime.getSeconds().toString().padStart(2, '0');
      const el = document.querySelector('.live-clock') as HTMLElement;
      if (el) el.textContent = `${h}:${m}:${s}`;
    };
    update();
    this.clockInterval = setInterval(update, 1000);
  }

  initMarquee() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const marquee = this.marqueeWrapper?.nativeElement?.querySelector('.marquee-content');
    if (!marquee) return;

    if (isTouch) {
      // CSS animation on mobile — GPU native
      const track = this.marqueeWrapper.nativeElement;
      track.style.animation = 'marquee-fwd 20s linear infinite';
      return;
    }

    // Desktop: GSAP marquee
    const clone = marquee.cloneNode(true);
    this.marqueeWrapper.nativeElement.appendChild(clone);
    gsap.to('.footer-marquee .marquee-content', {
      xPercent: -100, repeat: -1, duration: 18, ease: 'linear'
    });
  }

  initReveal() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) {
      // On mobile: make all footer-reveal elements visible immediately
      document.querySelectorAll('.footer-reveal').forEach(el => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      document.querySelectorAll('.footer-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            y: 0, opacity: 1, duration: 0.9,
            delay: i * 0.12, ease: 'power3.out'
          }
        );
      });
    }, 100);
  }

  ngOnDestroy() {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }
}
