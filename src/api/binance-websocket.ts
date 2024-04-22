export const socket: WebSocket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@depth@1000ms');

export const getSocketByCurrency: (currency: string) => WebSocket = (currency: string) => {
  return currency ? new WebSocket(`wss://stream.binance.com:9443/ws/${currency}@depth@1000ms`) : socket
}