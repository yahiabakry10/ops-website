import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  signal,
  viewChild,
  afterNextRender,
  effect,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperContainer } from 'swiper/element';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

register();

export interface ShowcaseImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css',
})
export class ShowcaseComponent {
  swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperRef');

  readonly showCaseView = signal<'mobile' | 'web'>('mobile');
  readonly isReady = signal(false);

  // MUST be signals for the template to call them as functions ()
  readonly mobileImages = signal<ShowcaseImage[]>([
    { src: '/images/Appointments.png', alt: 'App Screen 1' },
    { src: '/images/ClinicsDoctors.png', alt: 'App Screen 2' },
    { src: '/images/Consultation.png', alt: 'App Screen 3' },
    { src: '/images/Follow-up.png', alt: 'App Screen 4' },
    { src: '/images/InsuranceData.png', alt: 'App Screen 5' },
    { src: '/images/NextVisits.png', alt: 'App Screen 6' },
    { src: '/images/Payments.png', alt: 'App Screen 7' },
    { src: '/images/ReservationConfirmation1.png', alt: 'App Screen 8' },
    { src: '/images/ResrvationConfirmation.png', alt: 'App Screen 9' },
    { src: '/images/Notification.png', alt: 'App Screen 10' },
    { src: '/images/Registration.png', alt: 'App Screen 11' },
    { src: '/images/Visits.png', alt: 'App Screen 12' },
    { src: '/images/Settings.png', alt: 'App Screen 13' },
    { src: '/images/ReservationSteps.png', alt: 'App Screen 14' },
  ]);

  readonly webImages = signal<ShowcaseImage[]>([
    { src: '/images/Premiumcare-1.png', alt: 'Web Screen 1' },
    { src: '/images/Premiumcare-2.png', alt: 'Web Screen 2' },
    { src: '/images/Premiumcare-3.png', alt: 'Web Screen 3' },
    { src: '/images/Premiumcare-4.png', alt: 'Web Screen 4' },
    { src: '/images/Premiumcare-5.png', alt: 'Web Screen 5' },
    { src: '/images/Premiumcare-6.png', alt: 'Web Screen 6' },
    { src: '/images/Premiumcare-7.png', alt: 'Web Screen 7' },
    { src: '/images/Premiumcare-8.png', alt: 'Web Screen 8' },
    { src: '/images/Premiumcare-9.png', alt: 'Web Screen 9' },
    { src: '/images/Premiumcare-10.png', alt: 'Web Screen 10' },
    { src: '/images/Premiumcare-11.png', alt: 'Web Screen 11' },
  ]);

  constructor() {
    afterNextRender(() => this.isReady.set(true));

    effect(() => {
      if (this.isReady() && this.swiperRef()) {
        this.initSwiper();
      }
    });
  }

  private initSwiper() {
    const swiperEl = this.swiperRef()?.nativeElement;
    if (!swiperEl) return;

    const isMobile = window.innerWidth < 768;
    const params = {
      effect: 'coverflow',
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: isMobile ? 40 : 120, // Adjust this for overlap
        depth: isMobile ? 100 : 150,
        modifier: 1,
        slideShadows: false,
      },
      navigation: { prevEl: '.prev-btn', nextEl: '.next-btn' },
      breakpoints: {
        320: {
          coverflowEffect: { stretch: 20, depth: 50 },
        },
        768: {
          coverflowEffect: { stretch: 80, depth: 100 },
        },
        1024: {
          coverflowEffect: { stretch: 120, depth: 150 },
        },
      },
    };

    Object.assign(swiperEl, params);
    swiperEl.initialize();
  }

  toggleView(type: 'mobile' | 'web') {
    if (this.showCaseView() === type) return;
    this.showCaseView.set(type);

    setTimeout(() => {
      const swiper = this.swiperRef()?.nativeElement?.swiper;
      if (swiper) {
        swiper.destroy(true, true);
        this.initSwiper();
      }
    }, 50);
  }
}
