export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-wider text-[#c49a2b] drop-shadow-[0_0_10px_rgba(196,154,43,0.5)]">
          Batele Jack
        </h1>
        <p className="mt-4 text-2xl text-gray-400 font-light">
          Narrative Completionist &amp; Hardware Enthusiast
        </p>
        <div className="mt-12 flex gap-6 justify-center">
          <a
            href="https://steamcommunity.com/id/batelejack/"
            className="rounded border border-[#c49a2b] px-6 py-3 text-[#c49a2b] hover:bg-[#c49a2b] hover:text-black transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Steam Profile
          </a>
          <a
            href="/battlestation"
            className="rounded border border-gray-600 px-6 py-3 text-gray-400 hover:border-[#c49a2b] hover:text-[#c49a2b] transition-all duration-300"
          >
            Battle Station
          </a>
          <a
            href="/games"
            className="rounded border border-gray-600 px-6 py-3 text-gray-400 hover:border-[#c49a2b] hover:text-[#c49a2b] transition-all duration-300"
          >
            Games
          </a>
        </div>
      </div>
    </main>
  );
}