# thejuniordev

[thejunior.dev](https://thejunior.dev/) is my portfolio page. There was no domain available for my given name, Snorre. My friends call me Junior, so thats the story of the domain name.

The purpose of the page is to showcase some of my experience, and in addition it is a project I created for starting to aquire experience with hosting web applications.
It is also an outlet for me to experience with fun frontend UX.

## hosting and tech

The backend and frontend is hosted on a [DigitalOcean Droplet](https://www.digitalocean.com/products/droplets).

The project is a React single page application. There is no frontend routing, which I know is unortodocs. It's a deliberate choice to keep with the smartphone theme of the page. At early stages of development I disliked the decision, but it has grown on me due to the fact that I have to solve weird frontend problems to achive the wanted UX behaviour. I leverage the barebones state management library [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) to conditionaly render UI as the user navigates the page.

The backend is a Supabase instance hosted in Docker on the Droplet. The original plan for hosting was to make the page available on a Raspberry Pi, therefor a [self-hosted Supabase instance](https://supabase.com/docs/guides/self-hosting/docker) was attractive, but I am not free to configure my LAN router for a DNS to reach the page.


## Some of what I have learned

- configuring a simple nginx webserver
- deploying a webapplication to a remote server
  - workflow related to this
  - troubleshooting related to this
- troubleshoot problems related to buildinga React webapp with Vite

## deployment

### nginx

`/etc/nginx/sites-available# cat thejuniordev`

``` bash
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name thejunior.dev www.thejunior.dev;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name thejunior.dev www.thejunior.dev;

    ssl_certificate /etc/letsencrypt/live/thejunior.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/thejunior.dev/privkey.pem;

    # Your existing locations
    location /rest/v1/ {
        proxy_pass http://127.0.0.1:8000/rest/v1/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,apikey,x-client-info' always;
    }

    # Your other existing locations...
    location /graphql/v1/ {
        proxy_pass http://127.0.0.1:8000/graphql/v1/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /storage/v1/ {
        proxy_pass http://127.0.0.1:8000/storage/v1/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    root /var/www/thejuniordev/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

### Build location

`/var/www/thejuniordev/dist`
