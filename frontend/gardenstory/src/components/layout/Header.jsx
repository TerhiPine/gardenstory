import Container from "./Container";

export default function Header() {
  return (
    <header className="w-full border-b border-green-200 bg-green-50">
      <Container>
        <div className="flex items-center justify-between h-14">
          {/* Logo / nimi */}
          <h1 className="text-lg font-semibold text-green-900">
            Garden Story
          </h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-green-800">
            <a href="#" className="hover:text-green-900">Kalenteri</a>
            <a href="#" className="hover:text-green-900">Merkinnät</a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
