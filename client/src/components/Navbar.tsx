"use client";
import { NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,} from './ui/navigation-menu'

export default function Navbar() {
  return (
    <>
      <NavigationMenu>

        <NavigationMenuList className="flex justify-between bg-yellow-400 px-5 py-2 ml-0 w-screen">
        <div className="flex gap-2">

        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref> */}
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} bg-white text-black hover:bg-black hover:text-white`}>
              Home
            </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>

        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref> */}
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} bg-white text-black hover:bg-black hover:text-white`}>
              Projects
            </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>

        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref> */}
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} bg-white text-black hover:bg-black hover:text-white`}>
              Profiles
            </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>

        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref> */}
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} bg-white text-black hover:bg-black hover:text-white`}>
              Chat
            </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>
        </div>

        <div className="flex gap-2">
          <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref> */}
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} hover:bg-white hover:text-black`}>
              Register
            </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>

        <NavigationMenuItem>
          {/* <Link href="/docs" legacyBehavior passHref> */}
            <NavigationMenuLink className={ `${navigationMenuTriggerStyle()} hover:bg-white hover:text-black`}>
              Login
            </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>
        </div>

        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
