import { Button } from "../ui/button";

interface IProps {
  isRuler?: boolean;
}

export default function Countdown({ isRuler }: IProps) {
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <time className="font-semibold text-4xl">02:00:00</time>
      {isRuler && (
        <div className="flex flex-row gap-3">
          <Button className="w-full max-w-16">Start</Button>
          <Button variant="outline" className="w-full max-w-16">
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
