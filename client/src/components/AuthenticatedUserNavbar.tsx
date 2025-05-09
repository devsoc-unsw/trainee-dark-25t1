"use client";
import { NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,} from './ui/navigation-menu'
import { Laptop } from 'lucide-react';
import { useRouter } from 'next/navigation'

export default function AuthenticatedUserNavbar() {
  const router = useRouter()
  return (
    <>
      <NavigationMenu>

        <NavigationMenuList className="flex justify-between bg-yellow-400 px-5 py-2 ml-0 w-screen">
        <div className="flex gap-7">

        <NavigationMenuItem onClick={() => router.push('/')}>
            <Laptop size={38} color="#000000"/>
        </NavigationMenuItem>

        <NavigationMenuItem onClick={() => router.push('/projects')}>
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} bg-yellow text-black hover:bg-black hover:text-white cursor-pointer`}>
              Projects
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem onClick={() => router.push('/profiles')}>
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} bg-yellow text-black hover:bg-black hover:text-white cursor-pointer`}>
              Profiles
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem onClick={() => router.push('/chat')}>
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} bg-yellow text-black hover:bg-black hover:text-white cursor-pointer`}>
              Chat
            </NavigationMenuLink>
        </NavigationMenuItem>
        </div>

        {/* <div className="flex gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} hover:bg-white hover:text-black cursor-pointer`}
                                onClick={() => router.push('/register')}>
              Register
            </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} hover:bg-white hover:text-black cursor-pointer`}
                                onClick={() => router.push('/login')}>
              Login
            </NavigationMenuLink>
        </NavigationMenuItem>
        </div> */}

        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
