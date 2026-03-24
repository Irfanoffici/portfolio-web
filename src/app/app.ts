import { Component, signal, OnInit, OnDestroy, isDevMode, NgZone } from '@angular/core';
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
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('angular-portfolio');
  
  lenis!: Lenis;
  isNavOpen = false;
  isLightMode = false;
  isDevMode = isDevMode();

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.initLenis();
  }

  initLenis() {
    this.ngZone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        lerp: 0.07,           // Honey-smooth
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.85, 
        touchMultiplier: 2,
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Section reveal
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

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    if (this.isNavOpen) {
      this.lenis?.stop();
      gsap.to('.nav-bg', { opacity: 1, duration: 0.6, ease: 'power2.out' });
      gsap.to('.nav-overlay', { autoAlpha: 1, duration: 0.1 });
      gsap.to('.nav-text', { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
      gsap.to('.nav-socials', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 });
      gsap.to('.nav-footer', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 });
    } else {
      this.lenis?.start();
      gsap.to('.nav-text', { y: '110%', opacity: 0, duration: 0.4, ease: 'power2.in' });
      gsap.to('.nav-socials', { opacity: 0, y: 20, duration: 0.4, ease: 'power2.in' });
      gsap.to('.nav-footer', { opacity: 0, y: 20, duration: 0.4, ease: 'power2.in' });
      gsap.to('.nav-bg', { opacity: 0, duration: 0.6, ease: 'power2.in', delay: 0.2 });
      gsap.to('.nav-overlay', { autoAlpha: 0, duration: 0.1, delay: 0.8 });
    }
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    if (this.isLightMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  scrollTo(selector: string) {
    this.toggleNav();
    setTimeout(() => {
      this.lenis?.scrollTo(selector, { 
        duration: 1.5, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
      });
    }, 500);
  }

  ngOnDestroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
  }
}
