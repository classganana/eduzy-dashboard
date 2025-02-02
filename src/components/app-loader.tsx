import { Spinner } from "@heroui/react";

import { AppTexts } from "@/lib/utils/texts";

type Props = {
  loading: boolean;
  loadingText?: string;
};

const AppLoader = ({ loading, loadingText }: Props) => {
  return (
    loading && (
      <Spinner
        className="w-full m-2 mt-auto mb-auto"
        color="primary"
        label={loadingText || AppTexts.loadingText}
        labelColor="primary"
        size="lg"
      />
    )
  );
};

export default AppLoader;
