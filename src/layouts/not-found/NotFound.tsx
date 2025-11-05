import { Link } from 'react-router-dom';

import { Alert, Button } from '@components/ui';

import { ROUTES_PATH } from '@routes';

import { Terminal } from 'lucide-react';

function NotFound() {
  return (
    <div className="flex h-dvh items-center justify-center px-2 md:px-10">
      <Alert className="text-primary shadow-accent flex min-h-[35vh] w-fit min-w-[35vw] flex-col items-center justify-evenly gap-y-4 border-none shadow-lg">
        <Alert.Title className="flex items-center gap-x-4 text-2xl md:text-6xl">
          <Terminal size="1em" />
          Error 404
        </Alert.Title>

        <Alert.Description className="text-md text-center">
          You can't access this page either you don't have the permission or there is no page in this url.
        </Alert.Description>

        <Button asChild className="w-52 rounded-[5px]" variant="outline">
          <Link to={ROUTES_PATH.HOME.INDEX}>Home</Link>
        </Button>
      </Alert>
    </div>
  );
}

export default NotFound;
