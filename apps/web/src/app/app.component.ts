import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🚀 Monorepo NgXp Boilerplate</h1>
        <p>Angular 20 + Node.js/Express + TypeScript</p>
      </header>

      <main class="app-main">
        <section class="welcome-section">
          <h2>Bem-vindo ao Projeto!</h2>
          <p>Esta é uma aplicação Angular moderna conectada a uma API Node.js.</p>

          <div class="api-section">
            <h3>Teste da API</h3>
            <div class="input-group">
              <input
                type="text"
                [(ngModel)]="userName"
                placeholder="Digite seu nome"
                class="name-input"
              />
              <button (click)="callHelloAPI()" [disabled]="isLoading" class="call-api-btn">
                {{ isLoading ? 'Carregando...' : 'Chamar API' }}
              </button>
            </div>

            <div class="api-response" *ngIf="apiResponse">
              <h4>Resposta da API:</h4>
              <pre>{{ apiResponse | json }}</pre>
            </div>

            <div class="error-message" *ngIf="errorMessage">
              <h4>Erro:</h4>
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </section>

        <section class="info-section">
          <h3>Funcionalidades</h3>
          <div class="features-grid">
            <div class="feature-card">
              <h4>🎯 TypeScript</h4>
              <p>Desenvolvimento type-safe em toda a aplicação</p>
            </div>
            <div class="feature-card">
              <h4>🔄 Hot Reload</h4>
              <p>Atualizações automáticas durante desenvolvimento</p>
            </div>
            <div class="feature-card">
              <h4>📚 Swagger</h4>
              <p>Documentação automática da API</p>
            </div>
            <div class="feature-card">
              <h4>🧪 Testes</h4>
              <p>Suite de testes configurada para API e frontend</p>
            </div>
          </div>
        </section>
      </main>

      <footer class="app-footer">
        <p>Desenvolvido com ❤️ usando Angular {{ angularVersion }} + Node.js</p>
      </footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        color: #333;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .app-header {
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .app-header h1 {
        margin: 0;
        color: #2c3e50;
        font-size: 2.5rem;
        font-weight: 300;
      }

      .app-header p {
        margin: 0.5rem 0 0 0;
        color: #7f8c8d;
        font-size: 1.1rem;
      }

      .app-main {
        padding: 3rem 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .welcome-section,
      .info-section {
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        margin-bottom: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      .api-section {
        margin-top: 2rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e9ecef;
      }

      .input-group {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .name-input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
      }

      .call-api-btn {
        padding: 0.75rem 1.5rem;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.3s;
      }

      .call-api-btn:hover:not(:disabled) {
        background: #0056b3;
      }

      .call-api-btn:disabled {
        background: #6c757d;
        cursor: not-allowed;
      }

      .api-response {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
      }

      .error-message {
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        color: #721c24;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }

      .feature-card {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        border: 1px solid #e9ecef;
        text-align: center;
      }

      .feature-card h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
        color: #495057;
      }

      .feature-card p {
        margin: 0;
        color: #6c757d;
        font-size: 0.9rem;
      }

      .app-footer {
        background: rgba(255, 255, 255, 0.95);
        padding: 1.5rem;
        text-align: center;
        color: #6c757d;
      }

      h2,
      h3 {
        color: #2c3e50;
        margin-top: 0;
      }

      pre {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 5px;
        border: 1px solid #e9ecef;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    `,
  ],
  standalone: false,
})
export class AppComponent {
  title = 'Monorepo NgXp Boilerplate';
  angularVersion = '20';
  userName = '';
  apiResponse: { message: string; timestamp: string } | null = null;
  errorMessage = '';
  isLoading = false;

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  callHelloAPI() {
    if (!this.userName.trim()) {
      this.errorMessage = 'Por favor, digite um nome antes de chamar a API';
      this.apiResponse = null;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.apiResponse = null;

    const url = `${this.apiUrl}/hello/${encodeURIComponent(this.userName.trim())}`;

    this.http.get<{ message: string; timestamp: string }>(url).subscribe({
      next: response => {
        this.apiResponse = response;
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage = `Erro ao chamar a API: ${error.message || error.statusText || 'Erro desconhecido'}`;
        this.isLoading = false;
        console.error('Erro da API:', error);
      },
    });
  }
}
