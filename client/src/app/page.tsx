// "use client";
// import { Button } from "@/components/ui/button";
// import { PlusCircleIcon } from "lucide-react";

// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen gap-3">
//       <h1 className="text-5xl text-app-primary">GitTogether</h1>
//       <h2 className="text-2xl">Swipe. Match. Build.</h2>
//       <Button>Click Me!</Button>

//       <div className="flex flex-row items-center justify-center gap-4 mt-4">
//         <p>This is how to use Lucide Icons</p>
//         <PlusCircleIcon />
//       </div>
//     </main>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import homeImg from "./assets/homepage_pic.jpg"
export default function Home() {
  return (
    <main className= "flex flex-col items-center">
      <Navbar />
      <img src={homeImg.src} alt="picture-of-people-working-together" className="h-140 mt-15 opacity-30 w-screen"/>
      <div className="bg-yellow-400 text-black w-120 text-center p-10 relative bottom-90 rounded-xl">
        <h1 className = "text-3xl font-bold">Welcome to WorkBuddy!</h1>
        <br />
        <p className="font-semibold">The perfect place to find someone to work with</p>
      </div>
    </main>
  );
}
