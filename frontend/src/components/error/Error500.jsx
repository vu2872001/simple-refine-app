import { Button, Result, useNavigation } from '@pankod/refine';

export function Error500() {
  const { push } = useNavigation();
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button onClick={() => push('')} type="primary">
          Back Home
        </Button>
      }
    />
  );
}
