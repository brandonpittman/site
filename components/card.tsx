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
      } flex flex-col overflow-hidden bg-white rounded-lg shadow-lg`}
    >
      {children}
    </div>
  );
}
