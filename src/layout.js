import "./globals.css";

export const metadata = {
  title: "New Life Academy",
  description: "New Life Academy",
  icons: {
    icon: "/new1.ico",
    shortcut: "/new1.ico",
    apple: "/new1.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}