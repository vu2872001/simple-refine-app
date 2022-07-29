import { Button, Result, useNavigation } from '@pankod/refine';
import { useEffect } from 'react';

export function Error404() {
  const { push } = useNavigation();
  useEffect(() => {
    push('/404');
  }, []);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => push('')} type="primary">
          Back Home
        </Button>
      }
    />
  );
}
