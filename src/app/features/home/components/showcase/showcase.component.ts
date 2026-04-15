import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';

register();

export interface ShowcaseImage {
  src: string;
  alt: string;
}

type ShowCaseType = 'mobile' | 'web';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.css',
})
export class ShowcaseComponent {
  swiperRef = viewChild<ElementRef<SwiperContainer>>('swiperRef');

  readonly showCaseView = signal<ShowCaseType>('mobile');
  readonly isReady = signal<boolean>(false);

  readonly mobileImages = signal<ShowcaseImage[]>([
    { src: '/images/Appointments.webp', alt: 'App Screen 1' },
    { src: '/images/ClinicsDoctors.webp', alt: 'App Screen 2' },
    { src: '/images/Consultation.webp', alt: 'App Screen 3' },
    { src: '/images/Follow-up.webp', alt: 'App Screen 4' },
    { src: '/images/InsuranceData.webp', alt: 'App Screen 5' },
    { src: '/images/NextVisits.webp', alt: 'App Screen 6' },
    { src: '/images/Payments.webp', alt: 'App Screen 7' },
    { src: '/images/ReservationConfirmation1.webp', alt: 'App Screen 8' },
    { src: '/images/ResrvationConfirmation.webp', alt: 'App Screen 9' },
    { src: '/images/Notification.webp', alt: 'App Screen 10' },
    { src: '/images/Registration.webp', alt: 'App Screen 11' },
    { src: '/images/Visits.webp', alt: 'App Screen 12' },
    { src: '/images/Settings.webp', alt: 'App Screen 13' },
    { src: '/images/ReservationSteps.webp', alt: 'App Screen 14' },
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
    afterNextRender(() => {
      this.isReady.set(true);
    });

    // Use an effect to wait for the swiperRef to be available in the DOM
    effect(() => {
      const isReady = this.isReady();
      const swiperEl = this.swiperRef()?.nativeElement;

      if (isReady && swiperEl) {
        // Ensure initialize is only called once
        if (!swiperEl.classList.contains('swiper-initialized')) {
          this.initSwiper();
        }
      }
    });
  }

  private initSwiper() {
    console.log('🔄 Initializing Swiper...');
    const swiperEl = this.swiperRef()?.nativeElement;
    if (!swiperEl) {
      console.error('❌ Swiper element not found!');
      return;
    }

    const swiperParams = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      speed: 800,
      lazy: true,
      watchSlidesProgress: true,
      preloadImages: false,
      coverflowEffect: {
        rotate: 35,
        stretch: 0,
        depth: 160, // Reduced from 250 to lower GPU strain
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        clickable: true,
        dynamicBullets: false,
      },
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    };

    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
    console.log('✅ Swiper initialized successfully');
  }

  toggleView(type: ShowCaseType): void {
    console.log('🔄 Toggling view to:', type);
    this.showCaseView.set(type);

    // Use requestAnimationFrame for smoother updates after DOM changes
    requestAnimationFrame(() => {
      const swiperEl = this.swiperRef()?.nativeElement;
      if (swiperEl?.swiper) {
        swiperEl.swiper.slideTo(0, 0);
        swiperEl.swiper.update();
      }
    });
  }
}
