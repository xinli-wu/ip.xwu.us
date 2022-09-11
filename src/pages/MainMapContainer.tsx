import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';
import * as L from 'leaflet';
import { LatLng } from 'leaflet';
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SvgIconTpl } from '../assets/icons/Icons';
import { IpInfo } from '../components/IpInfo';
import { getIpInfo } from '../utils/getIpInfo';
import './MainMapContainer.css';

const DEFAULT_ZOOM = 10;
const DefaultIcon = L.divIcon({
  className: "",
  html: SvgIconTpl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
L.Marker.prototype.options.icon = DefaultIcon;

// const isLatlng = (latlng: any[] | undefined) => {
//   if (!latlng) return false;
//   return typeof latlng[0] === 'number' && typeof latlng[1] === 'number' && isFinite(latlng[0]) && Math.abs(latlng[0]) <= 90 && isFinite(latlng[1]) && Math.abs(latlng[1]) <= 180;
// };

export const Map = ({ ipInfo, error, onSearchBtnClick }: any) => {
  const { ipDomain } = useParams();
  const navigate = useNavigate();

  const map = useMap();
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


  useEffect(() => {
    if (!map.getBounds().contains(new LatLng(ipInfo.data.full.latitude, ipInfo.data.full.longitude))) {
      map.flyTo(new LatLng(ipInfo.data.full.latitude, ipInfo.data.full.longitude), DEFAULT_ZOOM, { duration: 0.75 });
    }
  }, [ipInfo.data, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={new LatLng(ipInfo.data.full.latitude, ipInfo.data.full.longitude)}>
        {isBrowser &&
          <Tooltip direction="bottom" offset={[0, 5]} opacity={1} permanent interactive>
            <Box style={{ minWidth: 480 }}>
              <IpInfo ipInfo={ipInfo} error={error} onSearchBtnClick={onSearchBtnClick} />
            </Box>
          </Tooltip>
        }
      </Marker>
    </>
  );
};

export const MainMapContainer = () => {
  const { ipDomain } = useParams();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [ipInfo, setIpInfo] = useState<any>({ data: undefined, loading: false });
  const [error, setError] = useState<string | undefined>(undefined);

  const hasLatlng = searchParams.get('lat') && searchParams.get('lng') ? true : false;
  const [center, setCenter] = useState<number[] | undefined>(hasLatlng ? [Number(searchParams.get('lat')), Number(searchParams.get('lng'))] : undefined);

  const onSearchBtnClick = async (newIpDomain: string) => {
    const { data, status } = await getIpInfo(newIpDomain).catch(e => ({ data: e.response.data, status: e.response.status }));
    if (status === 404) { setError(data.message); return; }

    setError(undefined);
    navigate(`/${newIpDomain}`, { replace: true });
  };

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
            touchZoom={false}
            gestureHandling={true}
          >
            <Map ipInfo={ipInfo} error={error} onSearchBtnClick={onSearchBtnClick} />
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
              <IpInfo ipInfo={ipInfo} error={error} onSearchBtnClick={onSearchBtnClick} />
            </Box>}
        </>
      }
    </>
  );
};
