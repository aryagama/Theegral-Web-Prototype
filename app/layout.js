export const metadata = {
  title: 'Theegral Website',
  description: 'Theegral Web Prototype migrated to Next.js',
  icons: {
    icon: ['/Logo Theegral (WHITE).svg', '/favicon.ico']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        {children}
        <script src="/mobile-nav.js" />
      </body>
    </html>
  );
}
