import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

type SubmitButtonProps = {
  text?: string;
  className?: string;
};

const SubmitButton = ({ text = 'Save', className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={cn(className)}>
      {pending ? <Loader2 className="size-4" /> : text}
    </Button>
  );
};

export default SubmitButton;
