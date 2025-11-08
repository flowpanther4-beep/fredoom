
export default function TopBanner() {
  return (
    <header className="w-full border-b border-black bg-brandYellow">
      <div className="mx-auto max-w-7xl px-3 py-2">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          Brand Space™ – 1,000,000 pixels – $1 per pixel – Reserve your name worldwide!
        </h1>
        <nav className="retro-menu mt-2 text-center text-sm md:text-base">
          <a className="mx-2" href="/">Homepage</a>|
          <a className="mx-2" href="#buy">Buy Space</a>|
          <a className="mx-2" href="#faq">FAQ</a>|
          <a className="mx-2" href="#blog">Blog</a>|
          <a className="mx-2" href="#contact">Contact</a>|
          <a className="mx-2" href="#directory">Directory</a>|
          <a className="mx-2" href="#press">Press</a>
        </nav>
      </div>
    </header>
  );
}
