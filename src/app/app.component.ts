import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'angular-portfolio';
  lenis!: Lenis;
  isNavOpen = false;

  @ViewChild('customCursor') customCursor!: ElementRef;

  ngOnInit() {
    this.initLenis();
  }

  ngAfterViewInit() {
    this.initCursor();
  }

  initLenis() {
    // Disable Lenis on touch devices — native scroll is faster and smoother on mobile
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
      this.lenis = new Lenis({
        lerp: 0.07,
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
    }

    // Only run IntersectionObserver reveal on desktop (mobile has no hover anyway)
    if (!isTouchDevice) {
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
    }
  }

  initCursor() {
    const cursor = this.customCursor.nativeElement;
    
    // Smooth trailing cursor — cinematic feel
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power2.out' });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    // Handle hover states on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .interactive');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    if (this.isNavOpen) {
      this.lenis?.stop();
      document.body.style.overflow = 'hidden'; // ensure body doesn't scroll behind nav
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
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        // Mobile: native scroll
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  }

  ngOnDestroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
  }
}
