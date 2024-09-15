import { BounceLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <BounceLoader
      color={'#12baaf'}
      loading={true}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
