import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FeedbackService } from '../../services/feedback.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RatingModule
  ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss'
})
export class FeedbackFormComponent {
  private fb = inject(FormBuilder);
  private feedbackService = inject(FeedbackService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  loading = signal(false);
  
  feedbackForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    feedback: ['', [Validators.required, Validators.minLength(10)]],
    rating: [0, [Validators.required, Validators.min(1)]]
  });

  async onSubmit() {
    if (this.feedbackForm.invalid) {
      this.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill all required fields correctly'
      });
      return;
    }

    this.loading.set(true);
    try {
      const formData = this.feedbackForm.value;
      await firstValueFrom(this.feedbackService.createFeedback({
        name: formData.name!,
        email: formData.email!,
        feedback: formData.feedback!,
        rating: formData.rating!
      }));

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Feedback submitted successfully'
      });
      
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to submit feedback. Please try again.'
      });
    } finally {
      this.loading.set(false);
    }
  }

  private markAllAsTouched() {
    this.feedbackForm.markAllAsTouched();
    Object.values(this.feedbackForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
