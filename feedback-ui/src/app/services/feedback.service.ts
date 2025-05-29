// src/services/feedback.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback, ApiResponse } from '../../models/feedback.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private apiUrl = 'http://localhost:3001/api/feedback';

  constructor(private http: HttpClient) {}

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<ApiResponse<Feedback[]>>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error loading feedbacks:', error);
        return of([]);
      })
    );
  }

  createFeedback(feedback: Omit<Feedback, '_id' | 'createdAt' | '__v'>): Observable<Feedback> {
    return this.http.post<ApiResponse<Feedback>>(this.apiUrl, feedback).pipe(
      map(response => response.data)
    );
  }

  updateFeedback(id: string, feedback: Partial<Feedback>): Observable<Feedback> {
    return this.http.put<ApiResponse<Feedback>>(`${this.apiUrl}/${id}`, feedback).pipe(
      map(response => response.data)
    );
  }

  deleteFeedback(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFeedback(id: string): Observable<Feedback> {
    return this.http.get<ApiResponse<Feedback>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
