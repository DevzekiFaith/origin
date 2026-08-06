export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="text-sm text-[#9aa4b2] font-medium">
      © {currentYear} Origin. Powered by <span className="text-white font-semibold">The Becoming Institute</span> • Mindvest Global Resources. All rights reserved.
    </p>
  );
}
