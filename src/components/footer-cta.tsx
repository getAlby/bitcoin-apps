import { Button } from "./ui/button";

export function FooterCta() {
  return (
    <section className="mb-0 mt-10">
      <div className="relative overflow-hidden rounded-[32px]">
        <img src="/images/discover/footer-background.png" alt="Footer background" className="block h-auto w-full" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="font-['Figtree'] text-5xl font-bold leading-[110%] tracking-[-0.01em] text-secondary sm:text-7xl">
            Enjoy
            <br />
            your
            <br />
            bitcoin!
          </h2>
          <div className="mt-16 flex flex-col items-center gap-3">
            <a href="https://form.jotform.com/232284367043051" target="_blank" rel="noopener noreferrer">
              <Button size="filter" className="!border-0 !bg-white/80 hover:!border-0 hover:!bg-white/80">
                Suggest an App
              </Button>
            </a>
            <a href="https://getalby.com/developers" target="_blank" rel="noopener noreferrer">
              <Button size="filter" className="!border-0 !bg-white/80 hover:!border-0 hover:!bg-white/80">
                Integrate Bitcoin in Your App
              </Button>
            </a>
            <a href="https://form.jotform.com/232284367043051" target="_blank" rel="noopener noreferrer">
              <Button size="filter" className="!border-0 !bg-white/80 hover:!border-0 hover:!bg-white/80">
                Feature Your App
              </Button>
            </a>
          </div>
        </div>
        <p className="absolute inset-x-0 bottom-6 z-20 text-center text-[10px] text-secondary/70 sm:text-xs">
          Made with 💛 by Alby
        </p>
      </div>
    </section>
  );
}

