
import {
  AntdLayout,
  Button,
  Result,
  useNavigation,
} from '@pankod/refine';
import { CustomSider } from 'components/custom';

export function Error500() {
  const { push } = useNavigation();
  return (
    <AntdLayout style={{ background: 'white', minHeight: '100vh' }}>
      <CustomSider />
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button onClick={() => push('')} type="primary">
            Back Home
          </Button>
        }
        style={{ width: '100vw' }}
      />
    </AntdLayout>
  );
}
