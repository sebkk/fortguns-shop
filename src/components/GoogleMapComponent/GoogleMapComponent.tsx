'use client';

import { CSSProperties } from 'react';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface IGoogleMapComponentProps {
  location: string;
  styles: CSSProperties;
  zoom?: number;
}

export const GoogleMapComponent = ({
  location,
  styles = {},
  zoom = 12,
}: IGoogleMapComponentProps) => {
  return (
    <div className='overflow-hidden rounded-[20px] border-2 border-accent-dark'>
      <iframe
        width='600'
        height='450'
        style={styles}
        loading='lazy'
        allowFullScreen
        referrerPolicy='no-referrer-when-downgrade'
        src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${location}&zoom=${zoom}`}
      ></iframe>
    </div>
  );
};
