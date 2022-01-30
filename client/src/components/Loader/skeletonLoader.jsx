import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonLoader = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={560}
    viewBox="0 0 300 560"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="512" y="686" rx="3" ry="3" width="88" height="6" />
    <rect x="512" y="704" rx="3" ry="3" width="52" height="6" />
    <rect x="487" y="692" rx="3" ry="3" width="410" height="6" />
    <rect x="492" y="692" rx="3" ry="3" width="380" height="6" />
    <rect x="453" y="693" rx="3" ry="3" width="178" height="6" />
    <circle cx="567" cy="683" r="20" />
    <rect x="537" y="675" rx="0" ry="0" width="203" height="18" />
    <rect x="16" y="1" rx="12" ry="12" width="260" height="325" />
    <rect x="534" y="661" rx="0" ry="0" width="73" height="37" />
    <rect x="538" y="667" rx="0" ry="0" width="85" height="46" />
    <rect x="65" y="340" rx="12" ry="12" width="160" height="24" />
    <rect x="0" y="380" rx="12" ry="12" width="300" height="88" />
    <rect x="0" y="490" rx="12" ry="12" width="100" height="30" />
    <rect x="179" y="490" rx="12" ry="12" width="115" height="42" />
  </ContentLoader>
);

export default SkeletonLoader;
