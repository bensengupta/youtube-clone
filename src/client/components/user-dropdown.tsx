import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/client/components/ui/dropdown-menu";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

export const UserDropdownMenu = DropdownMenu;

export const UserDropdownMenuTrigger = DropdownMenuTrigger;

interface UserDropdownMenuContentProps {
  session: Session;
}

export function UserDropdownMenuContent({
  session,
}: UserDropdownMenuContentProps) {
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => void signOut()}>
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
