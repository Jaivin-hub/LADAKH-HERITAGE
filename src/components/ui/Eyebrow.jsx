const Eyebrow = ({ children, center = false }) => (
  <div
    className={`flex items-center gap-3 text-[9px] font-bold tracking-[.19em] text-[#79745f] ${center ? 'justify-center' : ''}`}
  >
    <span className="inline-block h-px w-[26px] bg-rust" />
    {children}
  </div>
);

export default Eyebrow;
