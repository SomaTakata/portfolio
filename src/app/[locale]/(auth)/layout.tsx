export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between h-screen">
      <div className="hidden lg:block lg:w-1/2 h-full bg-black">
        <Circle />
      </div>
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-2 md:px-0">
        {children}
      </div>
    </div>
  );
}

const Circle = () => {
  return (
    <svg
      className="w-full h-full aspect-square"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="200" cy="200" r="100" fill="CurrentColor" />
    </svg>
  );
};
