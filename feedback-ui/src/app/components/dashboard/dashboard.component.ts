
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Feedback } from '../../../models/feedback.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DatePipe, ProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);

  feedbacks = signal<Feedback[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.loadFeedbacks();
  }

  async loadFeedbacks() {
    this.loading.set(true);
    try {
      const data = await firstValueFrom(this.feedbackService.getFeedbacks());
      this.feedbacks.set(data);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    }finally {
      this.loading.set(false);
    }
  }

  editFeedback(id: string) {
    this.router.navigate(['/form'], { 
      queryParams: { id },
      state: { feedback: this.feedbacks().find(f => f._id === id) }
    });
  }

  async deleteFeedback(id: string) {
    if (confirm('Are you sure you want to delete this feedback?')) {
      try {
        await firstValueFrom(this.feedbackService.deleteFeedback(id));
        this.loadFeedbacks();
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  }
}
