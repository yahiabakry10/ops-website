import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Message } from 'primeng/message';

// PrimeNG Imports
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';
import { InfoCardComponent } from '../../shared/components/info-card/info-card.component';
import { MainHeaderComponent } from '../../shared/components/main-header/main-header.component';
import { ContactInfo } from './models/contact-info.interface';
import { SocialMedia } from './models/social-media.interface';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ToastModule,
    TranslatePipe,
    InfoCardComponent,
    Message,
    MainHeaderComponent,
    ScrollRevealDirective,
  ],
  providers: [MessageService], // Required for Toast
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  // --- Dependencies ---
  private readonly fb = inject(FormBuilder);
  private readonly httpClient = inject(HttpClient);
  private readonly messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  // --- State ---
  contactForm!: FormGroup;
  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  readonly contactInfo: WritableSignal<ContactInfo[]> = signal<ContactInfo[]>([
    {
      icon: 'pi-map-marker',
      title: 'CONTACT.INFO.ADDRESS.TITLE',
      details: '52 Building Shamal Sinai, Khamsen St, Zahraa Maadi, Cairo',
      color: 'text-red-600',
    },
    {
      icon: 'pi-phone',
      title: 'CONTACT.INFO.PHONE.TITLE',
      details: '+202 27313051',
      color: 'text-green-600',
    },
    {
      icon: 'pi-mobile',
      title: 'CONTACT.INFO.MOBILE.TITLE',
      details: '+20 1151175657',
      color: 'text-blue-600',
    },
    {
      icon: 'pi-envelope',
      title: 'CONTACT.INFO.EMAIL.TITLE',
      details: 'h.leithy@ops-premium.com',
      color: 'text-purple-600',
    },
  ]);

  readonly socialMedia: WritableSignal<SocialMedia[]> = signal<SocialMedia[]>([
    {
      url: 'https://www.facebook.com/OPSPremium',
      icon: 'pi-facebook',
      name: 'Facebook',
      handle: '/OPSPremium',
      color: 'bg-blue-600',
    },
    {
      url: 'https://x.com/OPSPremium',
      icon: 'pi-twitter',
      name: 'Twitter',
      handle: '/OPSPremium',
      color: 'bg-sky-500',
    },
    {
      url: 'https://www.linkedin.com/company/ops-premium',
      icon: 'pi-linkedin',
      name: 'LinkedIn',
      handle: '/OPSPremium',
      color: 'bg-blue-700',
    },
    {
      url: 'https://www.instagram.com/opspremium',
      icon: 'pi-instagram',
      name: 'Instagram',
      handle: '/OPSPremium',
      color: 'bg-pink-600',
    },
  ]);

  // --- Lifecycle ---
  ngOnInit(): void {
    this.initForm();
  }

  // --- Methods ---
  initForm() {
    this.contactForm = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      subject: [null],
      message: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    } else {
      this.isLoading.set(true);
      const formData = {
        access_key: 'afa44d9c-55c9-490c-b724-13eeb62453a7',
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        from_name: 'Company Website Contact Form',
      };
      this.httpClient
        .post('https://api.web3forms.com/submit', formData)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.isLoading.set(false)),
        )
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Message sent successfully',
              life: 3000,
            });
            this.contactForm.reset();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to send message',
              life: 3000,
            });
          },
        });
    }
  }
}
