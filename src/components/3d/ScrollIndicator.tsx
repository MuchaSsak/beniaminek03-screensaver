function ScrollIndicator({ progress }: { progress: number }) {
  const progressPercantage = progress * 100;

  return (
    <div
      className={`border-2 mx-6 max-sm:hidden border-foreground rounded-full w-5 h-8 pointer-events-none relative ${
        progressPercantage < 100 ? "animate-pulse" : ""
      }`}
    >
      <div className="relative top-1/2 -translate-y-1/2 h-2.5">
        <div
          className="size-1 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2"
          style={{
            top: `${progressPercantage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ScrollIndicator;
