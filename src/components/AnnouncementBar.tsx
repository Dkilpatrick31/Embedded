"use client";

export default function AnnouncementBar() {
  return (
    <div
      className="w-full py-2.5 px-4 text-center text-xs tracking-widest uppercase"
      style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
    >
      <span style={{ fontFamily: "var(--font-dm-sans)" }}>
        Complimentary shipping on orders over $250 &nbsp;·&nbsp; New arrivals
        every Tuesday
      </span>
    </div>
  );
}
