import NavBar from '@/app/components/navbar'

export default function Layout({ children, params }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <NavBar room={params.room}></NavBar>
        {children}
      </body>
    </html>
  );
}