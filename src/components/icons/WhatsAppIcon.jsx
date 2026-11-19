export default function WhatsAppIcon({ size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20l1.1-4.8A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="m8.1 7.3 1.5 2.5-1 1.1a8.4 8.4 0 0 0 4.4 4.1l1-1.2 2.6 1.3c-.4 1.7-1.5 2.2-3.1 1.6-3.5-1.3-6-3.8-7-6.7-.4-1.3.2-2.4 1.6-2.7Z" />
    </svg>
  );
}
