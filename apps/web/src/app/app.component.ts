import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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

    const url = this.userName
      ? `http://localhost:3000/hello/${encodeURIComponent(this.userName)}`
      : 'http://localhost:3000/hello';

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
