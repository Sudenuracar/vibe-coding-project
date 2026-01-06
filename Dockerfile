# Temel imaj olarak Node.js kullanıyoruz
FROM node:18-alpine

# Çalışma dizinini oluştur
WORKDIR /app

# Tüm proje dosyalarını konteynıra kopyala
COPY . .

# Portu belirt
EXPOSE 8080

# Basit HTTP server kur (serve ile)
RUN npm install -g serve

# Konteynır çalıştırıldığında çalışacak komut
CMD ["serve", "-s", ".", "-l", "8080"]
