import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu-special";
import {
  AlignJustify,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  BarChart3,
  LogIn,
  LogOut,
  User,
  Home,
  Earth,
  FilePlus2,
  BookPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import * as React from "react";
import { cn } from "@/lib/utils";
import logo from "../assets/images/logo-studynow.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getColorClass } from "@/utils/tagscolor";

const Navbar = () => {
  const { accessToken, logout } = useAuth();

  // handle click for navigation btn
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex justify-between p-2 items-center z-50">
      <div
        onClick={() => handleNavigate("/")}
        className="flex gap-2 first:items-center cursor-pointer"
      >
        <div>
          <img src={logo} alt={"Logo du site StudyNow"} className={`w-10`} />
        </div>
        <div>
          <h3 className="font-bold text-xl">StudyNow</h3>
        </div>
      </div>
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "hover:bg-transparent hover:text-blue-500",
                  isActive("/") && getColorClass("navbar")
                )}
                onClick={() => handleNavigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "hover:bg-transparent hover:text-blue-500",
                  isActive("/explore") && getColorClass("navbar")
                )}
                onClick={() => handleNavigate("/explore")}
              >
                <Earth className="mr-2 h-4 w-4" />
                Explore
              </NavigationMenuLink>
            </NavigationMenuItem>

            {accessToken ? (
              <>
                <NavigationMenuItem className="cursor-pointer">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:bg-transparent hover:text-blue-500",
                      isActive("/board") && getColorClass("navbar")
                    )}
                    onClick={() => handleNavigate("/board")}
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    My Board
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="cursor-pointer">
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:bg-transparent hover:text-blue-500",
                      isActive("/organizations") && getColorClass("navbar")
                    )}
                    onClick={() => handleNavigate("/organizations")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    My Organizations
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "hover:bg-transparent hover:text-blue-500",
                      (isActive("/create-deck") || isActive("/create-quizz")) &&
                        getColorClass("navbar")
                    )}
                  >
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    Create Card
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-3 p-4 w-[300px]">
                      <ListItem
                        className={cn("cursor-pointer")}
                        key="createDeck"
                        title="Deck"
                        onClick={() => handleNavigate("/create-deck")}
                      >
                        Create a new Deck
                      </ListItem>
                      <ListItem
                        className={cn("cursor-pointer")}
                        key="createQuizz"
                        title="Quizz"
                        onClick={() => handleNavigate("/create-quizz")}
                      >
                        Create a new Quizz
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            ) : (
              <></>
            )}

            <NavigationMenuItem>
              {!accessToken ? (
                <NavigationMenuLink
                  className="flex items-center bg-black p-3 text-white rounded-md hover:bg-slate-800 cursor-pointer"
                  onClick={() => handleNavigate("/login")}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Connexion
                </NavigationMenuLink>
              ) : (
                <>
                  <NavigationMenuTrigger
                    className={cn(
                      "hover:bg-transparent hover:text-blue-500",
                      (isActive("/profile") ||
                        isActive("/premium" || isActive("/statistics")) ||
                        isActive("/profile/statistics")) &&
                        getColorClass("navbar")
                    )}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-3 p-4 w-[300px]">
                      <ListItem
                        className={cn(
                          "cursor-pointer",
                          isActive("/profile") && getColorClass("profile")
                        )}
                        key="profile"
                        title="Profile"
                        onClick={() => handleNavigate("/profile")}
                      >
                        Consult your profile
                      </ListItem>
                      <ListItem
                        className={cn(
                          "cursor-pointer",
                          isActive("/profile/statistics") &&
                            getColorClass("statistics")
                        )}
                        key="stats"
                        title="Stats"
                        onClick={() => handleNavigate("/profile/statistics")}
                      >
                        Check your statistics
                      </ListItem>
                      <ListItem
                        className={cn(
                          "cursor-pointer",
                          isActive("/premium") && getColorClass("premium")
                        )}
                        key="premium"
                        title="Premium"
                        onClick={() => handleNavigate("/premium")}
                      >
                        Get access to premium content
                      </ListItem>
                      <ListItem
                        key="Logout"
                        title="Logout"
                        onClick={() => {
                          handleNavigate("/");
                          logout();
                        }}
                        className="cursor-pointer bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-500"
                      >
                        Disconnect to your account
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="md:hidden">
        {!accessToken ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <AlignJustify />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleNavigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  <p>Home</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate("/explore")}>
                  <Earth className="mr-2 h-4 w-4" />
                  <p>Explore</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="bg-green-100 text-green-400"
                  onClick={() => handleNavigate("/login")}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  <p>Login</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <AlignJustify />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleNavigate("/")}>
                  <Home className="mr-2 h-4 w-4" />
                  <p>Home</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("/explore")}>
                  <Earth className="mr-2 h-4 w-4" />
                  <p>Explore</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("/board")}>
                  <ClipboardList className="mr-2 h-4 w-4" />
                  <p>My Boards</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigate("/organizations")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <p>My Organizations</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => handleNavigate("/create-deck")}
                >
                  <BookPlus className="mr-2 h-4 w-4" />
                  <p>Create deck</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigate("/create-quizz")}
                >
                  <BookPlus className="mr-2 h-4 w-4" />
                  <p>Create Quizz</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleNavigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <p>Profile</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleNavigate("/profile/statistics")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <p>Statistics</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("/premium")}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <p>Premium</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="bg-red-100 text-red-400"
                onClick={() => {
                  handleNavigate("/");
                  logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <p>Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
