import { useNavigate } from 'react-router-dom';

import { Avatar, Button, DropdownMenu } from '@components/ui';
import { ThemeSwitcher } from '@components/shared';

import { useAuth } from '@hooks/shared';

import { ROUTES_PATH } from '@routes';

import { User } from 'lucide-react';

function DashboardHeader() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const onNavigateToProfile = () => {
    navigate(`${ROUTES_PATH.USERS.INDEX}/${ROUTES_PATH.USERS.PERSONAL_PROFILE}/me`);
  };

  return (
    <header className="flex h-auto w-full items-center justify-between p-2 md:px-8 md:py-4">
      <div />

      <div className="flex items-center space-x-5">
        <ThemeSwitcher />

        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="border-accent h-8 w-8 border-2">
                <Avatar.Image src="" alt="user avatar" />

                <Avatar.Fallback className="text-primary">
                  <User />
                </Avatar.Fallback>
              </Avatar>
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="w-56" align="end" forceMount>
            <DropdownMenu.Label className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">{currentUser?.name}</p>

                <p className="text-xs leading-none">{currentUser?.email}</p>
              </div>
            </DropdownMenu.Label>

            <DropdownMenu.Separator />

            <DropdownMenu.Group>
              <DropdownMenu.Item onClick={onNavigateToProfile}>
                My profile
                <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
              </DropdownMenu.Item>

              <DropdownMenu.Item>
                My time report
                <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
              </DropdownMenu.Item>

              <DropdownMenu.Item>
                Notifications
                <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
            </DropdownMenu.Group>

            <DropdownMenu.Separator />

            <DropdownMenu.Item>
              Log out
              <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default DashboardHeader;
