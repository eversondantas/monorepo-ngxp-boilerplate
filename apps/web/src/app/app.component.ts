import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'web';
  userName = '';
  apiResponse: unknown = null;
  errorMessage = '';
  isLoading = false;

  constructor(private http: HttpClient) {}

  callHelloAPI() {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiResponse = null;

    const baseUrl = environment.apiUrl;
    const url = this.userName
      ? `${baseUrl}/hello/${encodeURIComponent(this.userName)}`
      : `${baseUrl}/hello`;

    this.http.get(url).subscribe({
      next: response => {
        this.apiResponse = response;
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = `Erro ao chamar a API: ${error.message}`;
        this.isLoading = false;
      },
    });
  }
}
