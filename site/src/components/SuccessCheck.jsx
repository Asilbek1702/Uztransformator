export default function SuccessCheck({ size = 56 }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
      <svg width={size} height={size} viewBox="0 0 52 52">
        <circle
          cx="26" cy="26" r="24" fill="none" stroke="#4f8fe0" strokeWidth="2.5"
          strokeDasharray="151" strokeDashoffset="151"
          style={{ animation: "success-circle 0.5s ease forwards" }}
        />
        <path
          fill="none" stroke="#4f8fe0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          d="M14 27l7 7 17-17" strokeDasharray="40" strokeDashoffset="40"
          style={{ animation: "success-check 0.35s ease 0.4s forwards" }}
        />
      </svg>
      <style>{`
        @keyframes success-circle { to { stroke-dashoffset: 0; } }
        @keyframes success-check { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}