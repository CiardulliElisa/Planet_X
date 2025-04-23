export default function Layout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        {children}
      </body>
    </html>
  );
}