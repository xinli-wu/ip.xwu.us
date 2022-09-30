import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';
import * as L from 'leaflet';
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { MapContainer } from 'react-leaflet';
import { useParams, useSearchParams } from 'react-router-dom';
import { SvgIconTpl } from '../assets/icons/Icons';
import { IpInfo } from '../components/IpInfo';
import { Map } from '../components/Map';
import { getIpInfo } from '../utils/getIpInfo';
import './MainMapContainer.css';

const DEFAULT_ZOOM = 10;
const DefaultIcon = L.divIcon({
  className: '',
  html: SvgIconTpl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
L.Marker.prototype.options.icon = DefaultIcon;

// const isLatlng = (latlng: any[] | undefined) => {
//   if (!latlng) return false;
//   return typeof latlng[0] === 'number' && typeof latlng[1] === 'number' && isFinite(latlng[0]) && Math.abs(latlng[0]) <= 90 && isFinite(latlng[1]) && Math.abs(latlng[1]) <= 180;
// };

export const MainMapContainer = () => {
  const { ipDomain } = useParams();
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchParams] = useSearchParams();
  const [ipInfo, setIpInfo] = useState<any>({ data: undefined, loading: false });
  const [error, setError] = useState<string | undefined>(undefined);

  const hasLatlng = searchParams.get('lat') && searchParams.get('lng') ? true : false;
  const [center, setCenter] = useState<number[] | undefined>(hasLatlng ? [Number(searchParams.get('lat')), Number(searchParams.get('lng'))] : undefined);

  useEffect(() => {
    if (ipInfo.data && center === undefined) {
      setCenter([ipInfo.data?.full?.latitude, ipInfo.data?.full?.longitude]);
    }
  }, [ipInfo.data, center]);

  useEffect(() => {
    (async () => {
      setIpInfo({ data: undefined, loading: true });
      const { data } = await getIpInfo(ipDomain).catch(e => ({ data: null, status: e.response.status, statusText: e.response.statusText }));
      setIpInfo({ data, loading: false }); setError(undefined);
    })();
  }, [ipDomain]);

  return (
    <>
      {center && ipInfo.data?.ip &&
        <>
          <MapContainer
            style={{ height: isBrowser ? '100vh' : '50vh' }}
            center={center}
            zoom={DEFAULT_ZOOM}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            touchZoom={true}
            gestureHandling={true}
          >
            <Map ipInfo={ipInfo} error={error} />
            <div className='leaflet-top leaflet-right'>
              <div className="leaflet-control leaflet-bar">
                <IconButton
                  onClick={toggleColorMode}
                  isRound
                  aria-label='Switch Mode'
                  icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                />
              </div>
            </div>
          </MapContainer>
          {!isBrowser &&
            <Box
              style={{
                margin: 2,
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <IpInfo ipInfo={ipInfo} error={error} />
            </Box>
          }
        </>
      }
    </>
  );
};
