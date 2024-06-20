import { Video } from "@/app/components/Atoms/Video";

type LoadingType = "circleLoading" | "movieLoading";

interface Props {
  loadingType: LoadingType;
  source: string | undefined;
}

export const Loading = (props: Props) => {
  const { loadingType, source } = props;

  switch (loadingType) {
    case "movieLoading":
      if (!source) return <div>Loading...</div>;
      return <Video source={source} playType="autoLoop" />;
    case "circleLoading":
      return <div>Loading...</div>;
    default:
      return <div>Loading...</div>;
  }
};
