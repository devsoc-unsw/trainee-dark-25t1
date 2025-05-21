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
import AuthenticatedUserNavbar from "@/components/AuthenticatedUserNavbar";
import homeImg from "./assets/homepage_pic.jpg"
import GuestUserNavbar from "@/components/GuestUserNavbar";
import Image from 'next/image'
import './globals.css'
export default function Home() {
  return (
    <main className= "flex flex-col items-center">
      <AuthenticatedUserNavbar />
      <Image
      src={homeImg}
      alt="picture-of-people-working-together"
      height={140}
      width={200}
      className="h-140 mt-15 opacity-30 w-screen"
      />
      <div className="bg-yellow-400 text-black w-150 text-center p-10 relative bottom-90 rounded-xl">
        <h1 className = "text-4xl font-bold font-homepage">Welcome to WorkBuddy!</h1>
        <br />
        <p className="font-homepage text-l">The perfect place to find someone to work with</p>
      </div>
      <Button className="yellow-button cursor-pointer text-xl text-black px-15 py-9 relative bottom-20 font-homepage hover:bg-white">Click here to get started</Button>
    </main>
  );
}
