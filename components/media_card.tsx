import Card from "./card";

export default function MediaCard({ children, title }) {
  return (
    <Card className="group relative w-full transform transition-all duration-200 ease-in-out hover:translate-y-px hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        {title}
        {children}
      </div>
    </Card>
  );
}
