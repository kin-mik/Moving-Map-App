import React from 'react';
import { Marker, Circle } from '@react-google-maps/api';

const MemoizedGoogleMap = React.memo(({ locations }) => {


  const memoizedLocations = React.useMemo(
    () => locations.filter(Boolean),
    [locations]
  );

  return memoizedLocations.map((item, index) => {
    return (
      <div key={index}>
        <Marker position={item.location} />
        <Circle center={item.location} radius={item.radius} options={item.circleOptions} />
      </div>
    );
  });
});

export { MemoizedGoogleMap };