import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, Plus, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search contacts, conversations..."
            className="w-80 pl-10"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Quick Actions */}
        <Button size="sm" className="bg-gradient-primary border-0">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 text-xs">
            3
          </Badge>
        </Button>

        {/* Account Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-3">
              <div className="flex items-center space-x-2">
                <div className="text-left">
                  <p className="text-sm font-medium">Digital Marketing Pro</p>
                  <p className="text-xs text-muted-foreground">Agency Account</p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Switch Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-gradient-primary" />
                <div>
                  <p className="text-sm font-medium">Digital Marketing Pro</p>
                  <p className="text-xs text-muted-foreground">Agency</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-gradient-success" />
                <div>
                  <p className="text-sm font-medium">Local Restaurant</p>
                  <p className="text-xs text-muted-foreground">Client Location</p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>John Doe</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}