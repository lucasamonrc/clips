import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ClipPros {
  clip: {
    id: number;
    url: string;
    title: string;
    description: string;
    tags: string | null;
    createdAt: number;
  };
}

export function Clip({ clip }: ClipPros) {
  return (
    <a href={clip.url} target="_blank" className="group">
      <Card className="group-hover:bg-gray-50 transition-colors duration-200 h-full">
        <CardHeader>
          <CardTitle>{clip.title}</CardTitle>
          <CardDescription>{clip.tags?.split(",").join(", ")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{clip.description}</p>
        </CardContent>
      </Card>
    </a>
  );
}
