import { AntdLayout, Image } from '@pankod/refine';
import PrimasLogo from "assets/images/PrimasLogo.png"

export default function HomePage() {
  return (
    <AntdLayout
      style={{
        minHeight: '94vh',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        src={PrimasLogo}
        preview={false}
      />
    </AntdLayout>
  );
}
