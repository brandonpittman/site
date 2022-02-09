export default function Card({
  className,
  children,
  style,
}: {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`${
        className || ""
      } flex flex-col overflow-hidden rounded-lg bg-white shadow-lg`}
    >
      {children}
    </div>
  );
}
