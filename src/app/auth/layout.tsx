// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-gray-100">
      {/* Di sini TIDAK ADA Navbar */}
      {children}
    </section>
  );
}