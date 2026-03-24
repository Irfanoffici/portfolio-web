import { Component, signal, OnInit, AfterViewInit, OnDestroy, isDevMode, NgZone, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TooltipService } from './services/tooltip.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  protected readonly title = signal('angular-portfolio');
  
  lenis!: Lenis;
  isNavOpen = false;
  isDevMode = isDevMode();

  @ViewChild('customCursor') customCursor!: ElementRef;
  @ViewChild('globalTooltip') globalTooltip?: ElementRef;

  constructor(
    private ngZone: NgZone,
    public tooltipService: TooltipService
  ) {}

  ngOnInit() {
    this.initLenis();
  }

  ngAfterViewInit() {
    this.initCustomCursor();
  }

  initCustomCursor() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return;

    this.ngZone.runOutsideAngular(() => {
      const cursor = this.customCursor.nativeElement;
      
      window.addEventListener('mousemove', (e) => {
        // Move cursor
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });

        // Move global tooltip if it exists and is active
        if (this.globalTooltip) {
          gsap.to(this.globalTooltip.nativeElement, {
            x: e.clientX + 10,
            y: e.clientY + 10,
            duration: 0.1,
            ease: 'power2.out'
          });
        }
      });

      // Hover effects
      document.addEventListener('mouseover', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.interactive') || target.closest('a') || target.closest('button')) {
          gsap.to(cursor, { scale: 4, opacity: 0.15, duration: 0.3 });
        }
      });

      document.addEventListener('mouseout', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.interactive') || target.closest('a') || target.closest('button')) {
          gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
        }
      });
    });
  }

  initLenis() {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
      this.ngZone.runOutsideAngular(() => {
        this.lenis = new Lenis({
          lerp: 0.08,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1, 
          touchMultiplier: 1.2,
        });

        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      });
    }

    if (!isTouchDevice) {
      this.ngZone.runOutsideAngular(() => {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).style.opacity = '1';
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              io.unobserve(e.target);
            }
          });
        }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('.philosophy-para, .reveal-text').forEach(el => {
          (el as HTMLElement).style.transition = `opacity 1.2s var(--ease-honey), transform 1.2s var(--ease-honey)`;
          (el as HTMLElement).style.transform = 'translateY(40px)';
          (el as HTMLElement).style.opacity = '0.08';
          io.observe(el);
        });
      });
    }
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    if (this.isNavOpen) {
      this.lenis?.stop();
      document.body.style.overflow = 'hidden'; // Ensure body doesn't scroll behind nav
    } else {
      this.lenis?.start();
      document.body.style.overflow = '';
    }
  }

  scrollTo(selector: string) {
    this.toggleNav();
    setTimeout(() => {
      if (this.lenis) {
        // Desktop: Lenis smooth scroll
        this.lenis.scrollTo(selector, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        // Mobile: native scroll
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400); // reduced timeout for snappier feeling
  }

  ngOnDestroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
  }
}
