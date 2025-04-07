"use client";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-3">
      <h1 className="text-5xl text-app-primary">GitTogether</h1>
      <h2 className="text-2xl">Swipe. Match. Build.</h2>
      
      <Button>Click Me!</Button>

      <div className="flex flex-row items-center justify-center gap-4 mt-4">
        <p>This is how to use Lucide Icons</p>
        <PlusCircleIcon />
      </div>
    </main>
  );
}
