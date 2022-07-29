import {
  AntdLayout,
  Button,
  Result,
  useNavigation,
} from '@pankod/refine';
import { CustomSider } from 'components/custom';

export function Error403() {
  const { push } = useNavigation();
  return (
    <AntdLayout style={{ background: 'white', minHeight: '100vh' }}>
      <CustomSider />
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
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
