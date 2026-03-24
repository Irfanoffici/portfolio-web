import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import gsap from 'gsap';

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

  ngAfterViewInit() {
    this.initMarquee();
    this.initClock();
    this.initReveal();
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
    const marquee = this.marqueeWrapper.nativeElement.querySelector('.marquee-content');
    const clone = marquee.cloneNode(true);
    this.marqueeWrapper.nativeElement.appendChild(clone);

    gsap.to('.footer-marquee .marquee-content', {
      xPercent: -100,
      repeat: -1,
      duration: 18,
      ease: 'linear'
    });
  }

  initReveal() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.footer-reveal');
      elements.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out'
          }
        );
      });
    }, 200);
  }

  ngOnDestroy() {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }
}
