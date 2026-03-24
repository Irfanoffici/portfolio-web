import { Component, signal, OnInit, AfterViewInit, OnDestroy, isDevMode, NgZone, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.initLenis();
  }

  ngAfterViewInit() {}


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
