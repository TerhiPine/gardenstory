import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header />

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
