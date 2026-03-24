import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
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

  ngAfterViewInit() {
    this.initAnimations();
    this.initMarquee();
  }

  initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });
    
    // Select the split lines manually since query children grabs the h1, not the spans
    const h1Lines = document.querySelectorAll('.line-reveal');

    // Title reveal
    tl.to(h1Lines, {
      y: 0,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      stagger: 0.15,
      delay: 0.2
    })
    
    // Fade in other elements
    .to([this.preTitle.nativeElement, this.description.nativeElement, this.scrollIndicator.nativeElement], {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 1
    }, "-=1");

    // Scroll indicator infinite bounce
    gsap.to(this.scrollIndicator.nativeElement.querySelector('.scroll-dot'), {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 1
    });
  }

  initMarquee() {
    const marquee = this.marqueeWrapper.nativeElement.querySelector('.marquee-content');
    
    // Clone marquee content for seamless loop
    const clone = marquee.cloneNode(true);
    this.marqueeWrapper.nativeElement.appendChild(clone);

    // Animate Marquee
    gsap.to('.marquee-content', {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: 'linear'
    });
  }
}
