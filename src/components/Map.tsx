import { Box } from '@chakra-ui/react';
import { LatLng } from 'leaflet';
import GestureHandling from 'leaflet-gesture-handling';
import { useEffect, useMemo } from 'react';
import { isBrowser } from 'react-device-detect';
import { Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { IpInfo } from './IpInfo';

const DEFAULT_ZOOM = 10;

export const Map = ({ ipInfo, error }: any) => {
  const { ipDomain } = useParams();
  const navigate = useNavigate();

  const map = useMap();
  console.log({ map });
  if (!('gestureHandling' in map)) {
    map.addHandler("gestureHandling", GestureHandling);
  }

  if (map.hasEventListeners('dragend')) {
    map.off('dragend');
  }
  map.on('dragend', (e: any) => {
    const center = e.target.getCenter();
    navigate({ pathname: `/${ipDomain || ''}`, search: `?lat=${center.lat}&lng=${center.lng}` }, { replace: false });
  });

  const position = useMemo(() => new LatLng(ipInfo.data.full.latitude, ipInfo.data.full.longitude), [ipInfo]);

  useEffect(() => {
    if (!map.getBounds().contains(position)) {
      map.flyTo(position, DEFAULT_ZOOM, { duration: 0.75 });
    }
  }, [position, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        {isBrowser &&
          <Tooltip direction="bottom" offset={[0, 5]} opacity={1} permanent interactive>
            <Box style={{ minWidth: 480 }}>
              <IpInfo ipInfo={ipInfo} error={error} />
            </Box>
          </Tooltip>
        }
      </Marker>
    </>
  );
};