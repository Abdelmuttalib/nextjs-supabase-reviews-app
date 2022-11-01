import ContentLoader from "react-content-loader";

type SkeletonLoaderProps = {
  styles?: object;
};

const SkeletonLoader = ({ styles }: SkeletonLoaderProps) => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "overflow-hidden",
        borderRadius: "10px",
        ...styles,
      }}
    >
      <ContentLoader preserveAspectRatio="none" speed={2} viewBox="0 0 100 100">
        <rect width="100%" height="100%" />
      </ContentLoader>
    </div>
  );
};

export default SkeletonLoader;
