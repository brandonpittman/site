import Card from "./card";

export default function MediaCard({ children, title }) {
  return (
    <Card className="relative w-full transition-all ease-in-out duration-200 group transform hover:translate-y-px hover:shadow-md">
      <div className="flex flex-col flex-1 p-6">
        {title}
        {children}
      </div>
    </Card>
  );
}
