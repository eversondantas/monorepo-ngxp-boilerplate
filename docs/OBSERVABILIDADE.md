# Monitoramento e Observabilidade

Este projeto inclui uma stack completa de monitoramento via **Grafana**, **Loki**, **Prometheus** e **Jaeger**.

## Serviços

- **Prometheus** coleta métricas da API.
- **Grafana** exibe dashboards e consome dados do Prometheus e Loki.
- **Loki** centraliza logs de aplicações.
- **Jaeger** registra traces distribuídos.
- **Redis** fornece cache rápido.
- **RabbitMQ** gerencia filas de mensagens.

Todos os serviços são iniciados automaticamente pelo `docker-compose`.

## Acessos Rápidos

| Serviço | URL |
|---------|-----|
| Prometheus | <http://localhost:9090> |
| Grafana | <http://localhost:3001> |
| Loki | <http://localhost:3100> |
| Jaeger | <http://localhost:16686> |
| Redis | `localhost:6379` |
| RabbitMQ | `localhost:5672` (UI <http://localhost:15672>) |

Essas ferramentas permitem análise de performance, coleta de métricas e rastreamento de requisições de maneira integrada.
