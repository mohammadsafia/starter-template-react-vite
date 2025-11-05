import { useNavigate } from 'react-router-dom';

import { Alert, Button } from '@components/ui';

import { XCircle } from 'lucide-react';

function ErrorBoundary() {
  const navigate = useNavigate();

  return (
    <div className="flex h-dvh items-center justify-center px-2 md:px-10">
      <Alert className="text-primary shadow-accent flex min-h-[35vh] w-fit min-w-[35vw] flex-col items-center justify-evenly gap-y-8 border-none shadow-lg">
        <Alert.Title className="flex items-center justify-center gap-x-4 text-2xl md:text-5xl">
          <XCircle size="1em" className="text-destructive" />
          Something went wrong
        </Alert.Title>

        <Alert.Description className="text-primary text-center capitalize md:text-2xl">
          Something went wrong, please try again later.
        </Alert.Description>

        <Button variant="outline" onClick={() => navigate(-1)} className="w-52 rounded-[5px]">
          Go Back
        </Button>
      </Alert>
    </div>
  );
}

export default ErrorBoundary;
